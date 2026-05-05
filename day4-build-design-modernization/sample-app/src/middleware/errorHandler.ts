import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";

/**
 * Global error handler middleware.
 * Catches unhandled errors and returns RFC 7807 problem details.
 */
export function errorHandler(err: Error, req: Request, res: Response, _next: NextFunction) {
  logger.error("Unhandled error", {
    message: err.message,
    stack: err.stack,
    method: req.method,
    path: req.path,
  });

  // Known business errors
  if (err.message.includes("not found") || err.message.includes("does not exist")) {
    return res.status(404).json({
      type: "https://httpstatuses.com/404",
      title: "Not Found",
      status: 404,
      detail: err.message,
    });
  }

  if (err.message.includes("already exists") || err.message.includes("Insufficient stock")) {
    return res.status(409).json({
      type: "https://httpstatuses.com/409",
      title: "Conflict",
      status: 409,
      detail: err.message,
    });
  }

  if (err.message.includes("Cannot cancel") || err.message.includes("Only pending")) {
    return res.status(422).json({
      type: "https://httpstatuses.com/422",
      title: "Unprocessable Entity",
      status: 422,
      detail: err.message,
    });
  }

  if (err.message.includes("Invalid email or password") || err.message.includes("Invalid refresh token")) {
    return res.status(401).json({
      type: "https://httpstatuses.com/401",
      title: "Unauthorized",
      status: 401,
      detail: err.message,
    });
  }

  // Fallback: Internal Server Error
  res.status(500).json({
    type: "https://httpstatuses.com/500",
    title: "Internal Server Error",
    status: 500,
    detail: "An unexpected error occurred",
  });
}
