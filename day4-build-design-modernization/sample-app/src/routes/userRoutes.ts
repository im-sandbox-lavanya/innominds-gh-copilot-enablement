import { Router, Request, Response, NextFunction } from "express";
import { body, param, query } from "express-validator";
import * as userService from "../services/userService";
import { authenticate, authorizeAdmin } from "../middleware/auth";
import { validateRequest } from "../middleware/validate";

const router = Router();

/**
 * GET /api/users
 * List all users (admin only, paginated)
 */
router.get(
  "/",
  authenticate,
  authorizeAdmin,
  [
    query("page").optional().isInt({ min: 1 }).toInt(),
    query("limit").optional().isInt({ min: 1, max: 100 }).toInt(),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 20;
      const result = await userService.getAllUsers(page, limit);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * GET /api/users/:id
 * Get a user by ID
 */
router.get(
  "/:id",
  authenticate,
  [param("id").isInt().toInt()],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await userService.getUserById(Number(req.params.id));
      if (!user) {
        return res.status(404).json({
          type: "https://httpstatuses.com/404",
          title: "User not found",
          status: 404,
          detail: `User with ID ${req.params.id} does not exist`,
        });
      }
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * POST /api/users
 * Create a new user (admin only)
 */
router.post(
  "/",
  authenticate,
  authorizeAdmin,
  [
    body("email").isEmail().normalizeEmail(),
    body("name").isString().trim().isLength({ min: 1, max: 100 }),
    body("password").isString().isLength({ min: 8 }),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await userService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * PUT /api/users/:id
 * Update a user
 */
router.put(
  "/:id",
  authenticate,
  [
    param("id").isInt().toInt(),
    body("email").optional().isEmail().normalizeEmail(),
    body("name").optional().isString().trim().isLength({ min: 1, max: 100 }),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await userService.updateUser(Number(req.params.id), req.body);
      if (!user) {
        return res.status(404).json({
          type: "https://httpstatuses.com/404",
          title: "User not found",
          status: 404,
        });
      }
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * DELETE /api/users/:id
 * Soft-delete a user (admin only)
 */
router.delete(
  "/:id",
  authenticate,
  authorizeAdmin,
  [param("id").isInt().toInt()],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const deleted = await userService.deleteUser(Number(req.params.id));
      if (!deleted) {
        return res.status(404).json({
          type: "https://httpstatuses.com/404",
          title: "User not found",
          status: 404,
        });
      }
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
);

export default router;
