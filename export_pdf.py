#!/usr/bin/env python3
"""
export_pdf.py — Local PDF export server for HTML slide presentations.

Setup (one-time):
    pip install playwright img2pdf
    playwright install chromium

Usage:
    python export_pdf.py
    python export_pdf.py --file day2-copilot-for-developers/copilot-for-dev.html --port 8765
    python export_pdf.py --file day1-github-platform/gh-platform.html --port 8765

The server opens the presentation in your browser automatically.
Click the PDF button in the slide viewer to generate and download the PDF.
"""

import argparse
import json
import os
import sys
import tempfile
import threading
import webbrowser
from http.server import HTTPServer, SimpleHTTPRequestHandler
from urllib.parse import urlparse

# ── Global state ──────────────────────────────────────────────────────────
export_state: dict = {"status": "idle", "current": 0, "total": 0, "pdf_path": None}
PORT = 8765
HTML_FILE = "day1-github-platform/gh-platform.html"


class Handler(SimpleHTTPRequestHandler):
    """Serves project static files and handles /api/* routes for PDF export."""

    def do_GET(self):
        path = urlparse(self.path).path

        if path == "/api/export-pdf":
            if export_state["status"] not in ("idle", "done", "error"):
                self._json({"ok": False, "error": "Export already in progress"})
                return
            threading.Thread(target=_run_export, daemon=True).start()
            self._json({"ok": True})

        elif path == "/api/export-status":
            self._json(export_state)

        elif path == "/api/download-pdf":
            pdf_path = export_state.get("pdf_path")
            if pdf_path and os.path.exists(pdf_path):
                with open(pdf_path, "rb") as f:
                    data = f.read()
                self.send_response(200)
                self.send_header("Content-Type", "application/pdf")
                self.send_header("Content-Length", str(len(data)))
                self.send_header("Access-Control-Allow-Origin", "*")
                self.end_headers()
                self.wfile.write(data)
            else:
                self.send_response(404)
                self.end_headers()

        else:
            super().do_GET()

    def _json(self, data: dict):
        body = json.dumps(data).encode()
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(body)

    def log_message(self, fmt, *args):  # silence per-request logs
        pass


def _run_export():
    global export_state
    export_state = {"status": "starting", "current": 0, "total": 0, "pdf_path": None}

    try:
        from playwright.sync_api import sync_playwright  # type: ignore
    except ImportError:
        export_state = {
            "status": "error",
            "current": 0,
            "total": 0,
            "pdf_path": None,
            "error": "Playwright not installed. Run: pip install playwright && playwright install chromium",
        }
        print("\n[export_pdf] ERROR: Playwright not installed.", file=sys.stderr)
        print("  Run: pip install playwright && playwright install chromium\n", file=sys.stderr)
        return

    try:
        with sync_playwright() as p:
            print("[export_pdf] Launching headless browser…")
            browser = p.chromium.launch()
            # Use a larger viewport so slides render with breathing room,
            # then scale content down 80% to avoid top/bottom clipping.
            page = browser.new_page(viewport={"width": 1600, "height": 900})

            url = f"http://localhost:{PORT}/{HTML_FILE}"
            page.goto(url)
            page.wait_for_load_state("networkidle")

            # Hide nav controls, progress bar, and slide header during capture;
            # scale all slide content to 80% so nothing is clipped.
            page.evaluate("""() => {
                const style = document.createElement('style');
                style.textContent = `
                    .nav-controls, .progress-bar, .slide-header { display: none !important; }
                    .slide {
                        transform: scale(0.8) !important;
                        transform-origin: center center !important;
                    }
                    .slide.active {
                        transform: scale(0.8) !important;
                    }
                `;
                document.head.appendChild(style);
            }""")

            # Count all slides in the presentation
            total: int = page.evaluate(
                "() => document.querySelectorAll('.slide').length"
            )
            print(f"[export_pdf] Found {total} slides.")
            export_state["status"] = "capturing"
            export_state["total"] = total

            screenshots: list[bytes] = []
            for i in range(total):
                page.evaluate(f"() => goToSlide({i + 1})")
                page.wait_for_timeout(450)  # let CSS transitions settle
                img_bytes = page.screenshot(full_page=False)
                screenshots.append(img_bytes)
                export_state["current"] = i + 1
                print(f"[export_pdf]   Captured slide {i + 1}/{total}")

            browser.close()

        # ── Assemble PDF ──────────────────────────────────────────
        export_state["status"] = "assembling"
        print("[export_pdf] Assembling PDF…")

        tmp = tempfile.NamedTemporaryFile(suffix=".pdf", delete=False)

        try:
            import img2pdf  # type: ignore
            tmp.write(img2pdf.convert(screenshots))
            tmp.close()
        except ImportError:
            # Fallback: Pillow (already bundled with many envs)
            try:
                from PIL import Image  # type: ignore
                import io

                pil_images = [
                    Image.open(io.BytesIO(b)).convert("RGB") for b in screenshots
                ]
                pil_images[0].save(
                    tmp.name,
                    save_all=True,
                    append_images=pil_images[1:],
                    resolution=150,
                )
                tmp.close()
            except ImportError:
                tmp.close()
                export_state = {
                    "status": "error",
                    "current": 0,
                    "total": 0,
                    "pdf_path": None,
                    "error": "No PDF library found. Run: pip install img2pdf",
                }
                print("\n[export_pdf] ERROR: no PDF library. Run: pip install img2pdf\n", file=sys.stderr)
                return

        export_state["pdf_path"] = tmp.name
        export_state["status"] = "done"
        print(f"[export_pdf] Done! PDF ready at: {tmp.name}")

    except Exception as exc:
        export_state = {
            "status": "error",
            "current": 0,
            "total": 0,
            "pdf_path": None,
            "error": str(exc),
        }
        print(f"\n[export_pdf] ERROR: {exc}\n", file=sys.stderr)


def main():
    global PORT, HTML_FILE

    parser = argparse.ArgumentParser(
        description="PDF export server for HTML slide presentations"
    )
    parser.add_argument(
        "--file",
        default=HTML_FILE,
        help="Path to the HTML presentation (relative to project root). "
             "Default: day1-github-platform/gh-platform.html",
    )
    parser.add_argument(
        "--port",
        type=int,
        default=8765,
        help="Port for the local server (default: 8765)",
    )
    args = parser.parse_args()

    PORT = args.port
    HTML_FILE = args.file

    # Serve from the project root so all relative assets resolve correctly
    project_root = os.path.dirname(os.path.abspath(__file__))
    os.chdir(project_root)

    if not os.path.exists(HTML_FILE):
        print(f"[export_pdf] ERROR: File not found: {HTML_FILE}", file=sys.stderr)
        sys.exit(1)

    server = HTTPServer(("127.0.0.1", PORT), Handler)
    url = f"http://localhost:{PORT}/{HTML_FILE}"

    print("=" * 60)
    print(" export_pdf.py — HTML Slides → PDF")
    print("=" * 60)
    print(f"  Serving : http://localhost:{PORT}/")
    print(f"  File    : {HTML_FILE}")
    print(f"  Opening : {url}")
    print("  Press Ctrl+C to stop.\n")

    threading.Timer(1.2, lambda: webbrowser.open(url)).start()

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\n[export_pdf] Server stopped.")


if __name__ == "__main__":
    main()
