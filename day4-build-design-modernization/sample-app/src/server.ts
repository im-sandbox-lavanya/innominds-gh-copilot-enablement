import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { connectDatabase } from "./config/database";
import { connectRedis } from "./config/redis";
import logger from "./utils/logger";

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  try {
    // Connect to external services
    await connectDatabase();
    await connectRedis();

    // Start HTTP server
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`, {
        env: process.env.NODE_ENV || "development",
      });
    });
  } catch (error) {
    logger.error("Failed to start server", { error });
    process.exit(1);
  }
}

bootstrap();
