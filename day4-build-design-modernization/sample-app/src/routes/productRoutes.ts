import { Router, Request, Response, NextFunction } from "express";
import { body, param, query } from "express-validator";
import * as productService from "../services/productService";
import { authenticate, authorizeAdmin } from "../middleware/auth";
import { validateRequest } from "../middleware/validate";

const router = Router();

/**
 * GET /api/products
 * List all products (public, paginated)
 */
router.get(
  "/",
  [
    query("page").optional().isInt({ min: 1 }).toInt(),
    query("limit").optional().isInt({ min: 1, max: 100 }).toInt(),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 20;
      const result = await productService.getAllProducts(page, limit);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * GET /api/products/search
 * Search products with filters
 */
router.get(
  "/search",
  [
    query("q").optional().isString().trim(),
    query("category").optional().isString().trim(),
    query("minPrice").optional().isFloat({ min: 0 }).toFloat(),
    query("maxPrice").optional().isFloat({ min: 0 }).toFloat(),
    query("inStock").optional().isBoolean().toBoolean(),
    query("sortBy").optional().isIn(["price_asc", "price_desc", "newest", "name"]),
    query("page").optional().isInt({ min: 1 }).toInt(),
    query("limit").optional().isInt({ min: 1, max: 100 }).toInt(),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await productService.searchProducts(
        (req.query.q as string) || "",
        {
          category: req.query.category as string,
          minPrice: req.query.minPrice ? Number(req.query.minPrice) : undefined,
          maxPrice: req.query.maxPrice ? Number(req.query.maxPrice) : undefined,
          inStock: req.query.inStock === "true",
          sortBy: req.query.sortBy as any,
          page: Number(req.query.page) || 1,
          limit: Number(req.query.limit) || 20,
        }
      );
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * GET /api/products/:id
 * Get a product by ID (public)
 */
router.get(
  "/:id",
  [param("id").isInt().toInt()],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product = await productService.getProductById(Number(req.params.id));
      if (!product) {
        return res.status(404).json({
          type: "https://httpstatuses.com/404",
          title: "Product not found",
          status: 404,
          detail: `Product with ID ${req.params.id} does not exist`,
        });
      }
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * POST /api/products
 * Create a new product (admin only)
 */
router.post(
  "/",
  authenticate,
  authorizeAdmin,
  [
    body("name").isString().trim().isLength({ min: 1, max: 200 }),
    body("description").isString().trim().isLength({ min: 1 }),
    body("price").isFloat({ min: 0.01 }),
    body("stock").isInt({ min: 0 }),
    body("category").isString().trim().isLength({ min: 1, max: 100 }),
    body("imageUrl").optional().isURL(),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product = await productService.createProduct(req.body);
      res.status(201).json(product);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * PUT /api/products/:id
 * Update a product (admin only)
 */
router.put(
  "/:id",
  authenticate,
  authorizeAdmin,
  [
    param("id").isInt().toInt(),
    body("name").optional().isString().trim().isLength({ min: 1, max: 200 }),
    body("description").optional().isString().trim(),
    body("price").optional().isFloat({ min: 0.01 }),
    body("stock").optional().isInt({ min: 0 }),
    body("category").optional().isString().trim(),
    body("imageUrl").optional().isURL(),
    body("isAvailable").optional().isBoolean(),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product = await productService.updateProduct(
        Number(req.params.id),
        req.body
      );
      if (!product) {
        return res.status(404).json({
          type: "https://httpstatuses.com/404",
          title: "Product not found",
          status: 404,
        });
      }
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * DELETE /api/products/:id
 * Soft-delete a product (admin only)
 */
router.delete(
  "/:id",
  authenticate,
  authorizeAdmin,
  [param("id").isInt().toInt()],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const deleted = await productService.deleteProduct(Number(req.params.id));
      if (!deleted) {
        return res.status(404).json({
          type: "https://httpstatuses.com/404",
          title: "Product not found",
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
