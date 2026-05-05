// Note: These tests mock the database and Redis layers.
// They test the business logic in the order service.

import * as orderService from "../../src/services/orderService";

// Mock the models and Redis
jest.mock("../../src/models", () => ({
  Order: {
    create: jest.fn(),
    findByPk: jest.fn(),
    findAndCountAll: jest.fn(),
  },
  LineItem: {
    create: jest.fn(),
    findAll: jest.fn(),
  },
  Product: {
    findByPk: jest.fn(),
    increment: jest.fn(),
    decrement: jest.fn(),
  },
}));

jest.mock("../../src/config/redis", () => ({
  redisClient: {
    get: jest.fn().mockResolvedValue(null),
    setex: jest.fn().mockResolvedValue("OK"),
    del: jest.fn().mockResolvedValue(1),
  },
}));

jest.mock("../../src/config/database", () => ({
  sequelize: {},
}));

describe("orderService", () => {
  describe("formatOrderDate", () => {
    it("should format a date as YYYY-MM-DD HH:MM", () => {
      const date = new Date("2024-03-15T09:30:00Z");
      const result = orderService.formatOrderDate(date);
      // Note: output depends on timezone — this tests the format pattern
      expect(result).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/);
    });
  });
});
