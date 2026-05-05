# Demo 08 — DB Migration & Monitoring Setup

> **Duration:** ~10 min | **Slide:** 21–24 | **Mode:** VS Code + Copilot Agent

| Setting | Recommendation |
|---------|----------------|
| **Chat Mode** | **Agent** mode (migration + observability scaffolding) |
| **Model** | **Claude Sonnet 4** — best for schema diff analysis and multi-file generation |
| **Fallback Model** | GPT-4.1 — good alternative for SQL and config generation |

---

## Objective

Demonstrate two production-readiness topics: (1) generating database migration scripts by comparing models against the baseline schema, and (2) adding monitoring/observability instrumentation with Copilot Agent.

---

## Pre-Requisites

- VS Code with GitHub Copilot Chat (Agent mode)
- The sample-app project open
- Familiarity with the Order model changes (4 new fields added in Phase 1)
- `src/migrations/001_initial_schema.sql` present as the baseline

---

## Part A — Database Migration Scripts (~5 min)

### Step 1 — Detect Schema Drift (~2 min)

**Goal:** Show Copilot comparing models against the last migration to identify changes.

1. In **Agent** mode, prompt:
   ```
   Compare #file:src/models/Order.ts with #file:src/migrations/001_initial_schema.sql.
   
   The Order model was recently updated with new fields that aren't in the migration.
   List all the differences and tell me what migration I need.
   ```

2. Copilot identifies:
   - `discount_code` (VARCHAR) — new
   - `shipping_method` (VARCHAR / ENUM) — new
   - `tracking_number` (VARCHAR) — new
   - `estimated_delivery` (TIMESTAMP) — new

3. **Key point:** _"Copilot diffs the source of truth (your model) against the deployed schema (your migration) to find exactly what changed."_

> **👀 What to watch for:** Copilot reads both files and produces a precise diff — it doesn't guess. It matches Sequelize types to PostgreSQL types.

---

### Step 2 — Generate Migration Script (~2 min)

**Goal:** Show Agent generating a complete migration with rollback.

1. Prompt Agent:
   ```
   Generate migration file src/migrations/002_add_order_shipping_fields.sql with:
   
   -- UP section: ALTER TABLE to add the 4 new columns
   -- DOWN section: ALTER TABLE to drop them (rollback)
   
   Match the column types to the Sequelize definitions in Order.ts.
   Add appropriate indexes on shipping_method and tracking_number.
   Add a comment header with the date and description.
   ```

2. Watch Agent generate:
   ```sql
   -- Migration: 002_add_order_shipping_fields
   -- Date: 2024-XX-XX
   -- Description: Add discount, shipping, and tracking fields to orders table
   
   -- UP
   ALTER TABLE orders
     ADD COLUMN discount_code VARCHAR(50),
     ADD COLUMN shipping_method VARCHAR(20) DEFAULT 'standard',
     ADD COLUMN tracking_number VARCHAR(100),
     ADD COLUMN estimated_delivery TIMESTAMP;
   
   CREATE INDEX idx_orders_shipping_method ON orders(shipping_method);
   CREATE INDEX idx_orders_tracking_number ON orders(tracking_number);
   
   -- DOWN
   DROP INDEX IF EXISTS idx_orders_tracking_number;
   DROP INDEX IF EXISTS idx_orders_shipping_method;
   ALTER TABLE orders
     DROP COLUMN estimated_delivery,
     DROP COLUMN tracking_number,
     DROP COLUMN shipping_method,
     DROP COLUMN discount_code;
   ```

> **👀 What to watch for:** Agent includes indexes, default values, and the rollback script. The column types match the Sequelize definitions exactly.

---

### Step 3 — Data Migration (~1 min)

**Goal:** Show generating a data migration for backfilling.

1. Prompt:
   ```
   Generate a data migration that backfills the shipping_method column:
   - Set shipping_method = 'standard' for all existing orders where it's NULL
   - Log how many rows were updated
   ```

2. Agent generates:
   ```sql
   -- Data migration: backfill shipping_method
   UPDATE orders SET shipping_method = 'standard' WHERE shipping_method IS NULL;
   -- Log: SELECT COUNT(*) FROM orders WHERE shipping_method = 'standard';
   ```

**Talking Point:** _"Schema migrations are the easy part. Data migrations are where bugs hide. Copilot generates both."_

---

## Part B — Monitoring & Observability (~5 min)

### Step 4 — Structured Logging (~2 min)

**Goal:** Show Agent adding structured logging across the application.

1. Prompt Agent:
   ```
   Add structured logging to the sample-app using Winston:
   
   1. Create src/utils/logger.ts (or update existing) with Winston configured for:
      - JSON format in production, pretty-print in development
      - Log levels: error, warn, info, debug
      - Include timestamp, request ID, and service name
   
   2. Add request logging middleware that logs:
      - Method, URL, status code, response time
      - Request ID (generate UUID)
   
   3. Add error logging to the error handler middleware
   ```

2. Watch Agent:
   - Check if Winston is in `package.json` (install if needed)
   - Create/update the logger utility
   - Add request logging middleware
   - Instrument the error handler

> **👀 What to watch for:** Agent checks your existing logger.ts and enhances it rather than replacing it. It adds logging consistently across middleware.

---

### Step 5 — Health Endpoints (~1.5 min)

**Goal:** Show generating health check endpoints.

1. Prompt:
   ```
   Add health check endpoints to the Express app:
   
   - GET /health — basic liveness check (returns 200 + uptime)
   - GET /ready — readiness check (verifies DB and Redis connections)
   
   Return JSON with status, uptime, timestamp, and dependency health.
   ```

2. Agent generates endpoints that:
   - Check database connectivity with a simple query
   - Check Redis with a ping
   - Return structured JSON:
     ```json
     {
       "status": "healthy",
       "uptime": 12345,
       "timestamp": "2024-...",
       "dependencies": {
         "database": "connected",
         "redis": "connected"
       }
     }
     ```

---

### Step 6 — Prometheus Metrics (~1.5 min)

**Goal:** Show generating a metrics endpoint.

1. Prompt:
   ```
   Add Prometheus metrics to the sample-app:
   - Install prom-client
   - Track: HTTP request duration, request count by route/method/status, active connections
   - Expose at GET /metrics
   ```

2. Show the generated metrics middleware and endpoint

3. Test it:
   ```bash
   curl http://localhost:3000/metrics
   ```

**Talking Point:** _"From zero observability to production-grade monitoring in three prompts. Copilot handles Winston, health checks, and Prometheus — all wired into your Express app."_

---

## Key Takeaways

| What | Why It Matters |
|------|---------------|
| Model → migration diff | Copilot detects schema drift automatically |
| UP + DOWN scripts | Always generate rollback scripts |
| Data migrations | Backfill and transform existing data safely |
| Structured logging | Winston/Pino with request IDs and JSON format |
| Health endpoints | Kubernetes-ready liveness and readiness probes |
| Prometheus metrics | Production monitoring from natural language prompts |
