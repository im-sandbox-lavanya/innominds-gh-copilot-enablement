import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../models";
import { redisClient } from "../config/redis";

// ──────────────────────────────────────────────────────────────
// CODE SMELL (intentional): Hardcoded secret as fallback
// Should only come from environment variable
// Used in Demo 05 for anti-pattern detection
// ──────────────────────────────────────────────────────────────
const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-not-safe";
const JWT_EXPIRY = process.env.JWT_EXPIRY || "15m";
const JWT_REFRESH_EXPIRY = process.env.JWT_REFRESH_EXPIRY || "7d";

interface TokenPayload {
  userId: number;
  email: string;
  role: string;
}

export function generateAccessToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRY });
}

export function generateRefreshToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_REFRESH_EXPIRY });
}

export function verifyToken(token: string): TokenPayload {
  return jwt.verify(token, JWT_SECRET) as TokenPayload;
}

export async function login(email: string, password: string) {
  const user = await User.findOne({ where: { email, isActive: true } });
  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) {
    throw new Error("Invalid email or password");
  }

  const payload: TokenPayload = {
    userId: user.id,
    email: user.email,
    role: user.role,
  };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  // Store refresh token in Redis
  await redisClient.setex(`refresh:${user.id}`, 7 * 24 * 60 * 60, refreshToken);

  // Update last login
  await user.update({ lastLoginAt: new Date() });

  return {
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
  };
}

export async function refreshAccessToken(refreshToken: string) {
  const payload = verifyToken(refreshToken);

  const storedToken = await redisClient.get(`refresh:${payload.userId}`);
  if (storedToken !== refreshToken) {
    throw new Error("Invalid refresh token");
  }

  const newAccessToken = generateAccessToken({
    userId: payload.userId,
    email: payload.email,
    role: payload.role,
  });

  return { accessToken: newAccessToken };
}

export async function logout(userId: number) {
  await redisClient.del(`refresh:${userId}`);
}
