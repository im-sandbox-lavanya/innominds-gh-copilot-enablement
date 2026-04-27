import { Sequelize } from "sequelize";
import logger from "../utils/logger";

const DATABASE_URL =
  process.env.DATABASE_URL ||
  `postgresql://${process.env.DB_USER || "postgres"}:${process.env.DB_PASSWORD || "postgres"}@${process.env.DB_HOST || "localhost"}:${process.env.DB_PORT || 5432}/${process.env.DB_NAME || "ecommerce"}`;

export const sequelize = new Sequelize(DATABASE_URL, {
  dialect: "postgres",
  logging: (msg) => logger.debug(msg),
  pool: {
    max: 10,
    min: 2,
    acquire: 30000,
    idle: 10000,
  },
  define: {
    underscored: true,
    timestamps: true,
  },
});

export async function connectDatabase(): Promise<void> {
  try {
    await sequelize.authenticate();
    logger.info("Database connection established");
  } catch (error) {
    logger.error("Unable to connect to database", { error });
    throw error;
  }
}
