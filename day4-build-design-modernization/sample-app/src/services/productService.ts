import { Op } from "sequelize";
import { Product } from "../models";
import { redisClient } from "../config/redis";

// ──────────────────────────────────────────────────────────────
// Service functions
// ──────────────────────────────────────────────────────────────

export async function getAllProducts(page: number = 1, limit: number = 20) {
  const offset = (page - 1) * limit;

  const cacheKey = `products:page:${page}:limit:${limit}`;
  const cached = await redisClient.get(cacheKey);
  if (cached) {
    return JSON.parse(cached);
  }

  const { rows, count } = await Product.findAndCountAll({
    where: { isAvailable: true },
    limit,
    offset,
    order: [["createdAt", "DESC"]],
  });

  const result = {
    products: rows,
    total: count,
    page,
    totalPages: Math.ceil(count / limit),
  };

  await redisClient.setex(cacheKey, 300, JSON.stringify(result));
  return result;
}

export async function getProductById(id: number) {
  const cacheKey = `product:${id}`;
  const cached = await redisClient.get(cacheKey);
  if (cached) {
    return JSON.parse(cached);
  }

  const product = await Product.findByPk(id);
  if (!product) {
    return null;
  }

  await redisClient.setex(cacheKey, 300, JSON.stringify(product));
  return product;
}

export async function searchProducts(query: string, filters: {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  sortBy?: "price_asc" | "price_desc" | "newest" | "name";
  page?: number;
  limit?: number;
}) {
  const page = filters.page || 1;
  const limit = filters.limit || 20;
  const offset = (page - 1) * limit;

  const where: any = {};

  if (query) {
    where[Op.or] = [
      { name: { [Op.iLike]: `%${query}%` } },
      { description: { [Op.iLike]: `%${query}%` } },
    ];
  }

  if (filters.category) {
    where.category = filters.category;
  }

  if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
    where.price = {};
    if (filters.minPrice !== undefined) {
      where.price[Op.gte] = filters.minPrice;
    }
    if (filters.maxPrice !== undefined) {
      where.price[Op.lte] = filters.maxPrice;
    }
  }

  if (filters.inStock) {
    where.stock = { [Op.gt]: 0 };
    where.isAvailable = true;
  }

  let order: [string, string][] = [["createdAt", "DESC"]];
  switch (filters.sortBy) {
    case "price_asc":
      order = [["price", "ASC"]];
      break;
    case "price_desc":
      order = [["price", "DESC"]];
      break;
    case "name":
      order = [["name", "ASC"]];
      break;
    case "newest":
    default:
      order = [["createdAt", "DESC"]];
  }

  const { rows, count } = await Product.findAndCountAll({
    where,
    limit,
    offset,
    order,
  });

  return {
    products: rows,
    total: count,
    page,
    totalPages: Math.ceil(count / limit),
  };
}

export async function createProduct(data: {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  imageUrl?: string;
}) {
  const product = await Product.create(data);
  return product;
}

export async function updateProduct(id: number, data: Partial<{
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  imageUrl: string;
  isAvailable: boolean;
}>) {
  const product = await Product.findByPk(id);
  if (!product) {
    return null;
  }

  await product.update(data);
  await redisClient.del(`product:${id}`);

  return product;
}

export async function deleteProduct(id: number) {
  const product = await Product.findByPk(id);
  if (!product) {
    return false;
  }

  await product.update({ isAvailable: false });
  await redisClient.del(`product:${id}`);
  return true;
}

// ──────────────────────────────────────────────────────────────
// Discount, Inventory, and Category helpers
// ──────────────────────────────────────────────────────────────

export function calculateDiscount(
  price: number,
  quantity: number,
  discountCode: string
): { discountAmount: number; finalPrice: number } {
  if (price < 0) {
    throw new Error("Price cannot be negative");
  }
  if (quantity < 0) {
    throw new Error("Quantity cannot be negative");
  }

  let discountAmount = 0;

  switch (discountCode) {
    case "SAVE10":
      discountAmount = price * quantity * 0.1;
      break;
    case "SAVE20":
      discountAmount = price * quantity * 0.2;
      break;
    case "FLAT5":
      discountAmount = Math.min(5, price * quantity);
      break;
    case "BOGO":
      // Buy one get one free — every second unit is free
      discountAmount = Math.floor(quantity / 2) * price;
      break;
    case "VIP":
      discountAmount = price * quantity * 0.15;
      break;
    default:
      discountAmount = 0;
  }

  const finalPrice = Math.max(0, price * quantity - discountAmount);
  return { discountAmount, finalPrice };
}

export async function checkInventory(
  productId: number
): Promise<{ productId: number; stock: number; isAvailable: boolean } | null> {
  const product = await Product.findByPk(productId, {
    attributes: ["id", "stock", "isAvailable"],
  });

  if (!product) {
    return null;
  }

  return {
    productId: product.id,
    stock: product.stock,
    isAvailable: product.isAvailable,
  };
}

export async function getCategorySummary(): Promise<
  { category: string; count: number; averagePrice: number }[]
> {
  const { QueryTypes } = await import("sequelize");
  const sequelize = Product.sequelize!;

  const rows = await sequelize.query<{
    category: string;
    count: string;
    averagePrice: string;
  }>(
    `SELECT category,
            COUNT(*)::int          AS count,
            AVG(price)             AS "averagePrice"
     FROM   "Products"
     WHERE  "isAvailable" = true
     GROUP  BY category
     ORDER  BY category`,
    { type: QueryTypes.SELECT }
  );

  return rows.map((r) => ({
    category: r.category,
    count: Number(r.count),
    averagePrice: parseFloat(Number(r.averagePrice).toFixed(2)),
  }));
}

// ──────────────────────────────────────────────────────────────
// CODE SMELL (intentional): Duplicate date formatting logic
// Same pattern exists in userService.ts and orderService.ts
// ──────────────────────────────────────────────────────────────
export function formatProductDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}
