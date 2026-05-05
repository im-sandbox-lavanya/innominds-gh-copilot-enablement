import path from "path";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import productRoutes from "./routes/productRoutes";
import orderRoutes from "./routes/orderRoutes";
import searchRoutes from "./routes/searchRoutes";
import fileRoutes from "./routes/fileRoutes";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

// ── Security middleware ──────────────────────────────────────
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));

// ── Rate limiting ────────────────────────────────────────────
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per window
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    type: "https://httpstatuses.com/429",
    title: "Too Many Requests",
    status: 429,
    detail: "Rate limit exceeded — try again in 15 minutes",
  },
});
app.use(limiter);

// ── Static files (order dashboard UI) ─────────────────────────
app.use(express.static(path.join(__dirname, "public")));

// ── Body parsing ─────────────────────────────────────────────
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

// ── Logging ──────────────────────────────────────────────────
app.use(morgan("combined"));

// ── Health check ─────────────────────────────────────────────
app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// ── API Routes ───────────────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/files", fileRoutes);

// ── 404 handler ──────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({
    type: "https://httpstatuses.com/404",
    title: "Not Found",
    status: 404,
    detail: "The requested resource does not exist",
  });
});

// ── Error handler ────────────────────────────────────────────
app.use(errorHandler);

export default app;
