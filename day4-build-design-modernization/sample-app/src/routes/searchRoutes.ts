import { Router, Request, Response } from "express";

const router = Router();

/**
 * GET /api/search?q=
 * Product search — DEMO: intentionally vulnerable to XSS (CWE-79)
 */
router.get("/", (req: Request, res: Response) => {
  const q = req.query.q as string;
  // VULNERABLE: user-controlled input reflected directly into HTML response without encoding
  res.setHeader("Content-Type", "text/html");
  res.send(`
    <html>
      <body>
        <h1>Search results for: ${q}</h1>
        <p>Showing products matching your query.</p>
      </body>
    </html>
  `);
});

export default router;
