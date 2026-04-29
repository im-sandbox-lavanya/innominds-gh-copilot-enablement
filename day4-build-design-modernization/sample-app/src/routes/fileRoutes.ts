import path from "path";
import fs from "fs";
import { Router, Request, Response, NextFunction } from "express";

const router = Router();

/**
 * GET /api/files/:filename
 * Serve uploaded files — DEMO: intentionally vulnerable to path traversal (CWE-22)
 */
router.get("/:filename", (req: Request, res: Response, next: NextFunction) => {
  try {
    const filename = req.params.filename;
    // VULNERABLE: no path validation allows traversal with ../../etc/passwd
    const filePath = path.join(__dirname, "../../uploads", filename);
    const content = fs.readFileSync(filePath);
    res.send(content);
  } catch (error) {
    next(error);
  }
});

export default router;
