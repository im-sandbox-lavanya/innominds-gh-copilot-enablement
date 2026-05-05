import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

/**
 * Middleware: Check express-validator results.
 * Returns 400 with RFC 7807 problem details if validation fails.
 */
export function validateRequest(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      type: "https://httpstatuses.com/400",
      title: "Validation Error",
      status: 400,
      detail: "One or more request fields are invalid",
      errors: errors.array().map((err) => ({
        field: (err as any).path,
        message: err.msg,
        value: (err as any).value,
      })),
    });
  }

  next();
}
