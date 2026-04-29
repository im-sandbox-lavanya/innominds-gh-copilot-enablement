/* ===================================================
   GitHub Copilot Training – Shared Presentation JS
   ===================================================
   Common slide navigation, PDF export, keyboard/touch
   handling, and fullscreen support for all courses.

   Usage in each course's HTML:
     <script src="../shared/presentation.js"></script>
     <script>
       initPresentation({ storageKey: 'copilotSlide', pdfFilename: 'GitHub_Copilot_Fundamentals.pdf' });
     </script>
   =================================================== */

(function () {
    'use strict';

    let currentSlide = 1;
    let totalSlides  = 0;

    // Optional hooks that a course can override before calling initPresentation
    let _changeSlideHook = null;   // fn(direction) → bool  (return true = handled, skip default)

    // ------------------------------------------------------------------
    // Public API
    // ------------------------------------------------------------------

    /**
     * Initialise the presentation engine.
     * @param {Object} opts
     * @param {string} opts.storageKey   – localStorage key for saving position
     * @param {string} opts.pdfFilename  – filename used when downloading PDF
     * @param {Function} [opts.onChangeSlide] – optional hook called before default navigation
     */
    window.initPresentation = function (opts) {
        const storageKey  = opts.storageKey  || 'copilotSlide';
        const pdfFilename = opts.pdfFilename || 'Presentation.pdf';

        if (typeof opts.onChangeSlide === 'function') {
            _changeSlideHook = opts.onChangeSlide;
        }

        totalSlides = document.querySelectorAll('.slide').length;

        // ── Core navigation ───────────────────────────────────────
        window.updateSlide = function () {
            document.querySelectorAll('.slide').forEach(function (slide, index) {
                slide.classList.remove('active', 'prev');
                if (index + 1 === currentSlide) {
                    slide.classList.add('active');
                } else if (index + 1 < currentSlide) {
                    slide.classList.add('prev');
                }
            });

            document.getElementById('currentSlide').textContent = currentSlide;
            var progress = (currentSlide / totalSlides) * 100;
            document.getElementById('progressBar').style.width = progress + '%';
            document.getElementById('prevBtn').disabled  = currentSlide === 1;
            document.getElementById('nextBtn').disabled  = currentSlide === totalSlides;
            localStorage.setItem(storageKey, currentSlide);
        };

        window.changeSlide = function (direction) {
            // Let the course-specific hook handle it first (e.g. flow sub-steps)
            if (_changeSlideHook && _changeSlideHook(direction, currentSlide, totalSlides)) {
                return;
            }
            var newSlide = currentSlide + direction;
            if (newSlide >= 1 && newSlide <= totalSlides) {
                currentSlide = newSlide;
                updateSlide();
            }
        };

        window.goToSlide = function (slideNum) {
            if (slideNum >= 1 && slideNum <= totalSlides) {
                currentSlide = slideNum;
                updateSlide();
            }
        };

        window.getCurrentSlide = function () { return currentSlide; };
        window.setCurrentSlide = function (n) { currentSlide = n; };
        window.getTotalSlides  = function () { return totalSlides; };

        // ── PDF export ────────────────────────────────────────────
        window.exportToPDF = function () {
            var overlay = document.createElement('div');
            overlay.className = 'pdf-overlay';
            overlay.innerHTML =
                '<div class="pdf-spinner"></div>' +
                '<div class="pdf-status">Starting PDF export...</div>' +
                '<div class="pdf-progress-bar"><div class="pdf-progress-fill"></div></div>';
            document.body.appendChild(overlay);
            var statusEl = overlay.querySelector('.pdf-status');
            var fillEl   = overlay.querySelector('.pdf-progress-fill');

            fetch('/api/export-pdf')
                .then(function (res) { return res.json(); })
                .then(function (data) {
                    if (!data.ok) {
                        statusEl.textContent = data.error || 'Export failed';
                        setTimeout(function () { overlay.remove(); }, 2000);
                        return;
                    }
                    pollProgress(statusEl, fillEl, overlay, pdfFilename);
                })
                .catch(function () {
                    showPdfFallback(overlay);
                });
        };

        // ── Keyboard navigation ───────────────────────────────────
        document.addEventListener('keydown', function (e) {
            if (e.key === 'ArrowRight' || e.key === ' ') {
                e.preventDefault(); changeSlide(1);
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault(); changeSlide(-1);
            } else if (e.key === 'Home') {
                e.preventDefault(); goToSlide(1);
            } else if (e.key === 'End') {
                e.preventDefault(); goToSlide(totalSlides);
            } else if (e.key === 'f' || e.key === 'F') {
                toggleFullscreen();
            } else if (e.key === 'p' || e.key === 'P') {
                exportToPDF();
            }
        });

        // ── Fullscreen ────────────────────────────────────────────
        window.toggleFullscreen = function () {
            var icon = document.getElementById('fullscreenIcon');
            if (document.fullscreenElement) {
                document.exitFullscreen();
                icon.classList.remove('fa-compress');
                icon.classList.add('fa-expand');
            } else {
                document.documentElement.requestFullscreen();
                icon.classList.remove('fa-expand');
                icon.classList.add('fa-compress');
            }
        };

        document.addEventListener('fullscreenchange', function () {
            var icon = document.getElementById('fullscreenIcon');
            if (document.fullscreenElement) {
                icon.classList.remove('fa-expand');
                icon.classList.add('fa-compress');
            } else {
                icon.classList.remove('fa-compress');
                icon.classList.add('fa-expand');
            }
        });

        // ── Touch / Swipe ─────────────────────────────────────────
        var touchStartX = 0;
        document.addEventListener('touchstart', function (e) {
            touchStartX = e.changedTouches[0].screenX;
        });
        document.addEventListener('touchend', function (e) {
            var diff = touchStartX - e.changedTouches[0].screenX;
            if (Math.abs(diff) > 50) {
                changeSlide(diff > 0 ? 1 : -1);
            }
        });

        // ── Always start from slide 1 ─────────────────────────────
        currentSlide = 1;

        document.getElementById('totalSlides').textContent = totalSlides;
        updateSlide();
    };

    // ------------------------------------------------------------------
    // Internal helpers
    // ------------------------------------------------------------------

    function pollProgress(statusEl, fillEl, overlay, pdfFilename) {
        setTimeout(function () {
            fetch('/api/export-status')
                .then(function (res) { return res.json(); })
                .then(function (prog) {
                    if (prog.status === 'capturing' && prog.total > 0) {
                        var pct = Math.round((prog.current / prog.total) * 100);
                        statusEl.textContent = 'Capturing slides... ' + prog.current + ' / ' + prog.total;
                        fillEl.style.width = pct + '%';
                    } else if (prog.status === 'assembling') {
                        statusEl.textContent = 'Assembling PDF...';
                        fillEl.style.width = '100%';
                    } else if (prog.status === 'done') {
                        downloadPdf(statusEl, overlay, pdfFilename);
                        return;
                    } else if (prog.status === 'starting') {
                        statusEl.textContent = 'Starting headless browser...';
                    }
                    pollProgress(statusEl, fillEl, overlay, pdfFilename);
                })
                .catch(function () { overlay.remove(); });
        }, 500);
    }

    function downloadPdf(statusEl, overlay, pdfFilename) {
        statusEl.textContent = 'Downloading PDF...';
        fetch('/api/download-pdf')
            .then(function (res) { return res.blob(); })
            .then(function (blob) {
                var url = URL.createObjectURL(blob);
                var a = document.createElement('a');
                a.href = url;
                a.download = pdfFilename;
                document.body.appendChild(a);
                a.click();
                a.remove();
                URL.revokeObjectURL(url);

                statusEl.textContent = '✅ PDF downloaded!';
                var spinner = overlay.querySelector('.pdf-spinner');
                if (spinner) spinner.style.display = 'none';
                setTimeout(function () { overlay.remove(); }, 1500);
            });
    }

    function showPdfFallback(overlay) {
        overlay.innerHTML =
            '<div style="background:var(--surface);border:1px solid var(--surface-light);' +
            'border-radius:16px;padding:40px 50px;max-width:580px;text-align:center;">' +
            '<div style="font-size:2.5rem;margin-bottom:20px;">⚠️</div>' +
            '<h2 style="color:#fff;margin-bottom:12px;font-size:1.4rem;">PDF Server Not Running</h2>' +
            '<p style="color:var(--text-muted);margin-bottom:20px;line-height:1.6;">' +
            'Start the export server first, then use this button:</p>' +
            '<div style="background:#0d1117;border:1px solid var(--surface-light);border-radius:10px;' +
            'padding:16px 24px;font-family:monospace;font-size:1.05rem;color:var(--secondary);' +
            'margin-bottom:15px;user-select:all;">python export_pdf.py</div>' +
            '<p style="color:var(--text-muted);font-size:0.85rem;margin-bottom:20px;">' +
            'This starts the server and opens the presentation automatically.</p>' +
            '<button onclick="this.closest(\'.pdf-overlay\').remove()" ' +
            'style="background:var(--gradient);color:#fff;border:none;padding:10px 30px;' +
            'border-radius:8px;font-size:1rem;cursor:pointer;">OK</button></div>';
        overlay.style.cursor = 'default';
        overlay.addEventListener('click', function (e) {
            if (e.target === overlay) overlay.remove();
        });
    }

})();
