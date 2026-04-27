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
