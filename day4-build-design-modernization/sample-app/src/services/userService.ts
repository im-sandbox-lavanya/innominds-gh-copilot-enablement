import bcrypt from "bcrypt";
import { User } from "../models";
import { redisClient } from "../config/redis";

// ──────────────────────────────────────────────────────────────
// BUG (intentional): parseUser() crashes when email is missing
// from the API response — used in Demo 01 to show specific
// prompting: "Fix the null pointer exception in parseUser()"
// ──────────────────────────────────────────────────────────────

interface ExternalUserPayload {
  id: number;
  full_name: string;
  email_address?: string;
  role?: string;
}

export function parseUser(payload: ExternalUserPayload) {
  if (!payload.email_address) {
    throw new Error("email_address is required");
  }

  const emailParts = payload.email_address.split("@");
  const domain = emailParts[1].toLowerCase();

  return {
    id: payload.id,
    name: payload.full_name,
    email: payload.email_address.toLowerCase(),
    domain,
    role: payload.role || "customer",
  };
}

// ──────────────────────────────────────────────────────────────
// Service functions
// ──────────────────────────────────────────────────────────────

export async function getAllUsers(page: number = 1, limit: number = 20) {
  const offset = (page - 1) * limit;

  // Check cache first
  const cacheKey = `users:page:${page}:limit:${limit}`;
  const cached = await redisClient.get(cacheKey);
  if (cached) {
    return JSON.parse(cached);
  }

  const { rows, count } = await User.findAndCountAll({
    attributes: { exclude: ["passwordHash"] },
    limit,
    offset,
    order: [["createdAt", "DESC"]],
  });

  const result = {
    users: rows,
    total: count,
    page,
    totalPages: Math.ceil(count / limit),
  };

  // Cache for 5 minutes
  await redisClient.setex(cacheKey, 300, JSON.stringify(result));

  return result;
}

export async function getUserById(id: number) {
  const cacheKey = `user:${id}`;
  const cached = await redisClient.get(cacheKey);
  if (cached) {
    return JSON.parse(cached);
  }

  const user = await User.findByPk(id, {
    attributes: { exclude: ["passwordHash"] },
  });

  if (!user) {
    return null;
  }

  await redisClient.setex(cacheKey, 300, JSON.stringify(user));
  return user;
}

export async function createUser(data: { email: string; name: string; password: string }) {
  const existing = await User.findOne({ where: { email: data.email } });
  if (existing) {
    throw new Error("User with this email already exists");
  }

  const passwordHash = await bcrypt.hash(data.password, 12);
  const user = await User.create({
    email: data.email,
    name: data.name,
    passwordHash,
  });

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    createdAt: user.createdAt,
  };
}

export async function updateUser(id: number, data: Partial<{ email: string; name: string }>) {
  const user = await User.findByPk(id);
  if (!user) {
    return null;
  }

  await user.update(data);
  await redisClient.del(`user:${id}`);

  return user;
}

export async function deleteUser(id: number) {
  const user = await User.findByPk(id);
  if (!user) {
    return false;
  }

  await user.update({ isActive: false });
  await redisClient.del(`user:${id}`);

  return true;
}

// ──────────────────────────────────────────────────────────────
// CODE SMELL (intentional): Duplicate date formatting logic
// Same pattern exists in orderService.ts and productService.ts
// Used in Demo 05 for anti-pattern / DRY violation detection
// ──────────────────────────────────────────────────────────────
export function formatUserDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}
