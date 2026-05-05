import { Order, LineItem, Product } from "../models";
import { redisClient } from "../config/redis";

// ──────────────────────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────────────────────

interface OrderItemInput {
  productId: number;
  quantity: number;
}

interface CreateOrderInput {
  userId: number;
  items: OrderItemInput[];
  shippingAddress: string;
  couponCode?: string;
}

// ──────────────────────────────────────────────────────────────
// Service functions
// ──────────────────────────────────────────────────────────────

export async function createOrder(input: CreateOrderInput) {
  // Validate stock and calculate totals
  let subtotal = 0;
  const lineItems: { productId: number; quantity: number; unitPrice: number; subtotal: number }[] = [];

  for (const item of input.items) {
    const product = await Product.findByPk(item.productId);
    if (!product) {
      throw new Error(`Product ${item.productId} not found`);
    }
    if (product.stock < item.quantity) {
      throw new Error(`Insufficient stock for product ${product.name}. Available: ${product.stock}`);
    }

    const itemSubtotal = Number(product.price) * item.quantity;
    subtotal += itemSubtotal;
    lineItems.push({
      productId: item.productId,
      quantity: item.quantity,
      unitPrice: Number(product.price),
      subtotal: itemSubtotal,
    });
  }

  // Apply coupon discount
  let discountAmount = 0;
  if (input.couponCode) {
    discountAmount = await applyCoupon(input.couponCode, subtotal);
  }

  const total = subtotal - discountAmount;

  // Create order
  const order = await Order.create({
    userId: input.userId,
    total,
    shippingAddress: input.shippingAddress,
    couponCode: input.couponCode || null,
    discountAmount,
  });

  // Create line items and update stock
  for (const item of lineItems) {
    await LineItem.create({
      orderId: order.id,
      productId: item.productId,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      subtotal: item.subtotal,
    });

    // Decrement stock
    await Product.decrement("stock", {
      by: item.quantity,
      where: { id: item.productId },
    });
  }

  // Invalidate caches
  await redisClient.del(`orders:user:${input.userId}`);

  return getOrderById(order.id);
}

export async function getOrderById(id: number) {
  const order = await Order.findByPk(id, {
    include: [
      {
        model: LineItem,
        as: "lineItems",
        include: [{ model: Product, as: "product" }],
      },
    ],
  });

  return order;
}

export async function getOrdersByUser(userId: number, page: number = 1, limit: number = 20) {
  const cacheKey = `orders:user:${userId}:page:${page}`;
  const cached = await redisClient.get(cacheKey);
  if (cached) {
    return JSON.parse(cached);
  }

  const offset = (page - 1) * limit;
  const { rows, count } = await Order.findAndCountAll({
    where: { userId },
    include: [{ model: LineItem, as: "lineItems" }],
    limit,
    offset,
    order: [["createdAt", "DESC"]],
  });

  const result = {
    orders: rows,
    total: count,
    page,
    totalPages: Math.ceil(count / limit),
  };

  await redisClient.setex(cacheKey, 300, JSON.stringify(result));
  return result;
}

export async function updateOrderStatus(
  orderId: number,
  status: "confirmed" | "processing" | "shipped" | "delivered" | "cancelled"
) {
  const order = await Order.findByPk(orderId);
  if (!order) {
    return null;
  }

  // CODE SMELL (intentional): High cyclomatic complexity — deeply nested validation
  // Used in Demo 05 for anti-pattern detection
  if (status === "cancelled") {
    if (order.status === "delivered") {
      throw new Error("Cannot cancel a delivered order");
    }
    if (order.status === "shipped") {
      throw new Error("Cannot cancel a shipped order — initiate a return instead");
    }
    if (order.status === "cancelled") {
      throw new Error("Order is already cancelled");
    }
    // Restore stock on cancellation
    const lineItems = await LineItem.findAll({ where: { orderId } });
    for (const item of lineItems) {
      await Product.increment("stock", {
        by: item.quantity,
        where: { id: item.productId },
      });
    }
  } else if (status === "confirmed") {
    if (order.status !== "pending") {
      throw new Error("Only pending orders can be confirmed");
    }
  } else if (status === "processing") {
    if (order.status !== "confirmed") {
      throw new Error("Only confirmed orders can be set to processing");
    }
  } else if (status === "shipped") {
    if (order.status !== "processing") {
      throw new Error("Only processing orders can be shipped");
    }
  } else if (status === "delivered") {
    if (order.status !== "shipped") {
      throw new Error("Only shipped orders can be marked as delivered");
    }
  }

  await order.update({ status });
  return order;
}

// ──────────────────────────────────────────────────────────────
// CODE SMELL (intentional): Swallows errors silently
// Used in Demo 05 for anti-pattern detection
// ──────────────────────────────────────────────────────────────
async function applyCoupon(code: string, subtotal: number): Promise<number> {
  try {
    // Hardcoded coupon logic — should be in a database
    const coupons: Record<string, { type: "percent" | "fixed"; value: number }> = {
      SAVE10: { type: "percent", value: 10 },
      FLAT20: { type: "fixed", value: 20 },
      WELCOME: { type: "percent", value: 15 },
    };

    const coupon = coupons[code.toUpperCase()];
    if (!coupon) {
      return 0;
    }

    if (coupon.type === "percent") {
      return subtotal * (coupon.value / 100);
    }
    return Math.min(coupon.value, subtotal);
  } catch (error) {
    // BUG: silently swallows error — should log or rethrow
    return 0;
  }
}

// ──────────────────────────────────────────────────────────────
// CODE SMELL (intentional): Duplicate date formatting logic
// Same pattern exists in userService.ts and productService.ts
// ──────────────────────────────────────────────────────────────
export function formatOrderDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}
