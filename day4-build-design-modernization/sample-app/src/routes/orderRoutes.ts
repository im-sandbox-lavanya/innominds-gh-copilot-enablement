import { Router, Request, Response, NextFunction } from "express";
import { body, param, query } from "express-validator";
import * as orderService from "../services/orderService";
import { authenticate } from "../middleware/auth";
import { validateRequest } from "../middleware/validate";

const router = Router();

/**
 * POST /api/orders
 * Create a new order
 */
router.post(
  "/",
  authenticate,
  [
    body("items").isArray({ min: 1 }),
    body("items.*.productId").isInt({ min: 1 }),
    body("items.*.quantity").isInt({ min: 1 }),
    body("shippingAddress").isString().trim().isLength({ min: 10 }),
    body("couponCode").optional().isString().trim(),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const order = await orderService.createOrder({
        userId: (req as any).user.userId,
        items: req.body.items,
        shippingAddress: req.body.shippingAddress,
        couponCode: req.body.couponCode,
      });
      res.status(201).json(order);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * GET /api/orders
 * List orders for the authenticated user
 */
router.get(
  "/",
  authenticate,
  [
    query("page").optional().isInt({ min: 1 }).toInt(),
    query("limit").optional().isInt({ min: 1, max: 100 }).toInt(),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user.userId;
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 20;
      const result = await orderService.getOrdersByUser(userId, page, limit);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * GET /api/orders/:id
 * Get an order by ID
 */
router.get(
  "/:id",
  authenticate,
  [param("id").isInt().toInt()],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const order = await orderService.getOrderById(Number(req.params.id));
      if (!order) {
        return res.status(404).json({
          type: "https://httpstatuses.com/404",
          title: "Order not found",
          status: 404,
          detail: `Order with ID ${req.params.id} does not exist`,
        });
      }
      res.json(order);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * PATCH /api/orders/:id/status
 * Update order status
 */
router.patch(
  "/:id/status",
  authenticate,
  [
    param("id").isInt().toInt(),
    body("status").isIn(["confirmed", "processing", "shipped", "delivered", "cancelled"]),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const order = await orderService.updateOrderStatus(
        Number(req.params.id),
        req.body.status
      );
      if (!order) {
        return res.status(404).json({
          type: "https://httpstatuses.com/404",
          title: "Order not found",
          status: 404,
        });
      }
      res.json(order);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
