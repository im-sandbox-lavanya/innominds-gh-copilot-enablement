import Redis from "ioredis";
import logger from "../utils/logger";

const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";

export const redisClient = new Redis(REDIS_URL, {
  maxRetriesPerRequest: 3,
  retryStrategy(times) {
    const delay = Math.min(times * 200, 2000);
    return delay;
  },
});

redisClient.on("connect", () => {
  logger.info("Redis client connected");
});

redisClient.on("error", (err) => {
  logger.error("Redis client error", { error: err.message });
});

export async function connectRedis(): Promise<void> {
  // ioredis connects automatically; this verifies the connection
  try {
    await redisClient.ping();
    logger.info("Redis connection verified");
  } catch (error) {
    logger.error("Unable to connect to Redis", { error });
    throw error;
  }
}
