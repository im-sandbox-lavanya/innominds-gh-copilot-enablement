// ──────────────────────────────────────────────────────────────
// Shared TypeScript types for the E-Commerce API
// ──────────────────────────────────────────────────────────────

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface ProblemDetail {
  type: string;
  title: string;
  status: number;
  detail: string;
  instance?: string;
  errors?: ValidationError[];
}

export interface ValidationError {
  field: string;
  message: string;
  value?: unknown;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  user: {
    id: number;
    email: string;
    name: string;
    role: string;
  };
}

export interface OrderItemInput {
  productId: number;
  quantity: number;
}

export interface CreateOrderRequest {
  items: OrderItemInput[];
  shippingAddress: string;
  couponCode?: string;
}

export interface ProductSearchFilters {
  q?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  sortBy?: "price_asc" | "price_desc" | "newest" | "name";
  page?: number;
  limit?: number;
}
