import request from "supertest";
import app from "../../src/app";

// Mock auth middleware for testing
jest.mock("../../src/middleware/auth", () => ({
  authenticate: (req: any, _res: any, next: any) => {
    req.user = { userId: 1, email: "test@example.com", role: "customer" };
    next();
  },
  authorizeAdmin: (_req: any, _res: any, next: any) => next(),
}));

jest.mock("../../src/config/database", () => ({
  sequelize: {},
}));

jest.mock("../../src/config/redis", () => ({
  redisClient: {
    get: jest.fn().mockResolvedValue(null),
    setex: jest.fn().mockResolvedValue("OK"),
    del: jest.fn().mockResolvedValue(1),
  },
}));

jest.mock("../../src/models", () => ({
  User: { findOne: jest.fn(), findByPk: jest.fn(), findAndCountAll: jest.fn(), create: jest.fn() },
  Product: { findByPk: jest.fn(), findAndCountAll: jest.fn(), create: jest.fn(), decrement: jest.fn(), increment: jest.fn() },
  Order: { create: jest.fn(), findByPk: jest.fn(), findAndCountAll: jest.fn() },
  LineItem: { create: jest.fn(), findAll: jest.fn() },
}));

describe("App", () => {
  describe("GET /health", () => {
    it("should return health check response", async () => {
      const res = await request(app).get("/health");

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("status", "ok");
      expect(res.body).toHaveProperty("timestamp");
      expect(res.body).toHaveProperty("uptime");
    });
  });

  describe("GET /nonexistent", () => {
    it("should return 404 for unknown routes", async () => {
      const res = await request(app).get("/nonexistent");

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty("title", "Not Found");
    });
  });
});
