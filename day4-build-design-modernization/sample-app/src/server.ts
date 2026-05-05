import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { connectDatabase } from "./config/database";
import { connectRedis } from "./config/redis";
import logger from "./utils/logger";

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  // Connect to external services (non-fatal — server starts regardless)
  try {
    await connectDatabase();
  } catch (error) {
    logger.warn("Database unavailable — server will start without DB", { error });
  }

  try {
    await connectRedis();
  } catch (error) {
    logger.warn("Redis unavailable — server will start without cache", { error });
  }

  // Start HTTP server
  app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`, {
      env: process.env.NODE_ENV || "development",
    });
  });
}

bootstrap();
