import { Router, Request, Response, NextFunction } from "express";
import { body } from "express-validator";
import * as authService from "../services/authService";
import * as userService from "../services/userService";
import { authenticate } from "../middleware/auth";
import { validateRequest } from "../middleware/validate";

const router = Router();

/**
 * POST /api/auth/register
 * Register a new user
 */
router.post(
  "/register",
  [
    body("email").isEmail().normalizeEmail(),
    body("name").isString().trim().isLength({ min: 1, max: 100 }),
    body("password")
      .isString()
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters"),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await userService.createUser(req.body);
      const tokens = await authService.login(req.body.email, req.body.password);
      res.status(201).json(tokens);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * POST /api/auth/login
 * Login with email and password
 */
router.post(
  "/login",
  [
    body("email").isEmail().normalizeEmail(),
    body("password").isString().notEmpty(),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await authService.login(req.body.email, req.body.password);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * POST /api/auth/refresh
 * Refresh an access token
 */
router.post(
  "/refresh",
  [body("refreshToken").isString().notEmpty()],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await authService.refreshAccessToken(req.body.refreshToken);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * POST /api/auth/logout
 * Logout (invalidate refresh token)
 */
router.post(
  "/logout",
  authenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user.userId;
      await authService.logout(userId);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
);

export default router;
