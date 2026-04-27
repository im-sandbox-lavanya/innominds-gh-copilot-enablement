# E-Commerce API — Sample Codebase for Day 4 Training

> **Purpose:** This is a realistic Node.js + Express + TypeScript e-commerce API designed as a demo codebase for the Day 4 "Build, Design & Modernization" training. It covers all 12 demos.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js 20 |
| Language | TypeScript (strict mode) |
| Framework | Express 4 |
| ORM | Sequelize 6 (PostgreSQL) |
| Cache | Redis (via ioredis) |
| Auth | JWT (jsonwebtoken + bcrypt) |
| Validation | express-validator |
| Logging | winston |
| Testing | Jest + supertest |

## Project Structure

```
sample-app/
├── src/
│   ├── app.ts                  # Express app setup (middleware, routes)
│   ├── server.ts               # Entry point (bootstrap DB, Redis, HTTP)
│   ├── config/
│   │   ├── database.ts         # Sequelize / PostgreSQL connection
│   │   └── redis.ts            # ioredis connection
│   ├── models/
│   │   ├── User.ts             # User entity
│   │   ├── Product.ts          # Product entity
│   │   ├── Order.ts            # Order entity (belongs to User)
│   │   ├── LineItem.ts         # LineItem (joins Order ↔ Product)
│   │   └── index.ts            # Re-exports all models
│   ├── services/
│   │   ├── authService.ts      # JWT generation, login, refresh, logout
│   │   ├── userService.ts      # CRUD + parseUser() bug for Demo 01
│   │   ├── orderService.ts     # Order creation, status machine, coupons
│   │   └── productService.ts   # CRUD + search with filters
│   ├── routes/
│   │   ├── authRoutes.ts       # POST login/register/refresh/logout
│   │   ├── userRoutes.ts       # GET/POST/PUT/DELETE /api/users
│   │   ├── orderRoutes.ts      # POST /api/orders, GET, PATCH status
│   │   └── productRoutes.ts    # GET/POST/PUT/DELETE + search endpoint
│   ├── middleware/
│   │   ├── auth.ts             # JWT authenticate + authorizeAdmin
│   │   ├── validate.ts         # express-validator result checker
│   │   └── errorHandler.ts     # Global error → RFC 7807 responses
│   ├── utils/
│   │   ├── logger.ts           # winston structured logger
│   │   └── helpers.ts          # requestId, sanitize, pagination
│   └── types/
│       └── index.ts            # Shared TypeScript interfaces
├── tests/
│   ├── services/
│   │   ├── userService.test.ts # Tests including the parseUser bug
│   │   └── orderService.test.ts
│   └── routes/
│       └── app.test.ts         # Health check + 404 tests
├── .github/
│   └── copilot-instructions.md # Project coding standards for Copilot
├── package.json
├── tsconfig.json
├── jest.config.ts
├── .env.example
└── .nvmrc
```

## Demo Coverage

| Demo | What this codebase provides |
|------|-----------------------------|
| **01 — Prompt Engineering** | `userService.ts` has a `parseUser()` bug (null pointer on missing email) for weak vs strong prompt comparison. `copilot-instructions.md` for custom instructions demo. |
| **02 — Requirements → Stories** | E-commerce domain (discount codes, orders) matches the business requirement prompts |
| **03 — Design Artifacts** | 20+ files with services, controllers, models — perfect for ADR and system design generation |
| **04 — ER / Class / OpenAPI** | 4 Sequelize models with FK relationships for ER diagrams; 4 route files for OpenAPI spec generation |
| **05 — Codebase Analysis** | Intentional code smells: duplicate `formatDate()` in 3 services, empty catch block in `orderService.ts`, hardcoded JWT secret fallback in `authService.ts`, high cyclomatic complexity in `updateOrderStatus()` |
| **06 — User Guide** | `orderRoutes.ts` + `orderService.ts` provide a complete order flow for tutorial generation |
| **07 — Feature Implementation** | Product search already exists — extend with autocomplete, or add wishlist/reviews as new features |
| **08 — Tech Upgrade** | Express 4 → can demonstrate planning an Express 5 or Fastify migration |
| **09 — Tech Modernization** | Can demonstrate the migration planning pattern (concept mapping, dependency ordering) |
| **10 — CI/CD Pipeline** | `package.json` has proper `build`, `lint`, `typecheck`, `test` scripts for workflow generation |
| **11 — Containerization** | Uses PostgreSQL + Redis — ideal for multi-service Docker Compose generation |
| **12 — Infrastructure as Code** | Node.js 20 + PostgreSQL + Redis stack maps directly to Azure/AWS Terraform resources |

## Intentional Issues (for demos)

These are **deliberate** — do not fix them before the training:

1. **`parseUser()` null pointer** — `userService.ts` line ~22 — crashes when `email_address` is undefined
2. **Duplicate date formatting** — identical `formatXxxDate()` in `userService.ts`, `orderService.ts`, `productService.ts`
3. **Silent error swallowing** — `applyCoupon()` in `orderService.ts` has an empty catch block
4. **Hardcoded secret fallback** — `authService.ts` has `|| "fallback-secret-not-safe"` for JWT_SECRET
5. **High cyclomatic complexity** — `updateOrderStatus()` in `orderService.ts` has deeply nested if/else chains

## Quick Start

```bash
# Install dependencies
npm install

# Copy environment config
cp .env.example .env

# Start in development mode (requires PostgreSQL + Redis running)
npm run dev

# Run tests (no external services needed — tests use mocks)
npm test

# Build for production
npm run build
```
