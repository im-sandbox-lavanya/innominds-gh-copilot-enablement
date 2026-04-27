import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../services/authService";
import logger from "../utils/logger";

/**
 * Middleware: Validate JWT Bearer token from Authorization header.
 * Attaches decoded user payload to req.user on success.
 */
export function authenticate(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      type: "https://httpstatuses.com/401",
      title: "Unauthorized",
      status: 401,
      detail: "Missing or invalid Authorization header. Expected: Bearer <token>",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = verifyToken(token);
    (req as any).user = payload;
    next();
  } catch (error) {
    logger.warn("JWT verification failed", { error });
    return res.status(401).json({
      type: "https://httpstatuses.com/401",
      title: "Unauthorized",
      status: 401,
      detail: "Invalid or expired token",
    });
  }
}

/**
 * Middleware: Require the authenticated user to have "admin" role.
 * Must be used after authenticate().
 */
export function authorizeAdmin(req: Request, res: Response, next: NextFunction) {
  const user = (req as any).user;

  if (!user || user.role !== "admin") {
    return res.status(403).json({
      type: "https://httpstatuses.com/403",
      title: "Forbidden",
      status: 403,
      detail: "Admin access required",
    });
  }

  next();
}
