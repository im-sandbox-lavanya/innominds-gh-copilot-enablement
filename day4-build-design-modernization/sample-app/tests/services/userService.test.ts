import { parseUser } from "../../src/services/userService";

describe("userService", () => {
  describe("parseUser", () => {
    it("should parse a valid external user payload", () => {
      const payload = {
        id: 1,
        full_name: "John Doe",
        email_address: "john@example.com",
        role: "customer",
      };

      const result = parseUser(payload);

      expect(result).toEqual({
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        domain: "example.com",
        role: "customer",
      });
    });

    it("should default role to customer when not provided", () => {
      const payload = {
        id: 2,
        full_name: "Jane Doe",
        email_address: "jane@company.org",
      };

      const result = parseUser(payload);

      expect(result.role).toBe("customer");
    });

    // This test documents the known bug — parseUser crashes on missing email
    it("should handle missing email address gracefully", () => {
      const payload = {
        id: 3,
        full_name: "No Email User",
      };

      // BUG: This currently throws — the fix should make it return null or a default
      expect(() => parseUser(payload)).toThrow();
    });
  });
});
