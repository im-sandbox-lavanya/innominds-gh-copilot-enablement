import { v4 as uuidv4 } from "uuid";

/**
 * Generate a unique request ID for tracing.
 */
export function generateRequestId(): string {
  return uuidv4();
}

/**
 * Sanitize user input — strip HTML tags.
 */
export function sanitizeInput(input: string): string {
  return input.replace(/<[^>]*>/g, "").trim();
}

/**
 * Build a pagination metadata object.
 */
export function buildPaginationMeta(total: number, page: number, limit: number) {
  const totalPages = Math.ceil(total / limit);
  return {
    total,
    page,
    limit,
    totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  };
}
