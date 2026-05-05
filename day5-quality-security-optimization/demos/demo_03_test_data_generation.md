# Demo 03 — Test Data Generation

> **Duration:** ~5 min | **Slide:** 8–9 | **Mode:** VS Code + Copilot Chat

| Setting | Recommendation |
|---------|----------------|
| **Chat Mode** | **Ask** mode (analysis) → **Agent** mode (file generation) |
| **Model** | **Claude Sonnet 4** — best for boundary analysis and schema-aware data |
| **Fallback Model** | GPT-4.1 — good alternative for structured data |

---

## Objective

Demonstrate how Copilot generates realistic, schema-aware test data — including edge cases, boundary values, and interconnected fixture datasets.

---

## Pre-Requisites

- VS Code with GitHub Copilot Chat
- The sample-app project open
- Familiarity with the Order and Product models from Day 4

---

## Step 1 — Edge Case Inference (~2 min)

**Goal:** Show Copilot analyzing validation logic to generate boundary test data.

1. In **Ask** mode, prompt:
   ```
   Analyze #file:src/services/productService.ts — specifically the calculateDiscount function.
   List all edge cases and boundary values I should test, organized by discount code type.
   ```

2. Copilot identifies:
   - Each discount code path (SAVE10, SAVE20, FLAT5, BOGO, VIP)
   - Zero price, negative price, max integer price
   - Zero quantity, negative quantity, fractional quantity
   - Unknown discount code → default case
   - Null/undefined inputs

3. **Key point:** _"Copilot reads your switch/case and if/else to figure out every branch — including the ones you might forget."_

> **👀 What to watch for:** Copilot doesn't just list "happy path" — it systematically identifies every branch and generates data that hits each one.

---

## Step 2 — Generate Fixture Files (~2 min)

**Goal:** Show Agent creating structured test data files.

1. Switch to **Agent** mode, prompt:
   ```
   Generate test fixture files for the sample-app using the edge cases from the analysis above:
   
   1. tests/fixtures/orderFixtures.ts — cover all order statuses, shipping methods, and discount codes
   2. tests/fixtures/productFixtures.ts — cover all product categories and boundary values
   
   Use TypeScript interfaces from #file:src/models/Order.ts and #file:src/models/Product.ts.
   ```

2. Watch Agent:
   - Read model definitions for field types and constraints
   - Generate typed fixture objects matching the interfaces
   - Include JSDoc comments explaining each edge case
   - Export named fixtures for use in test files

> **👀 What to watch for:** The fixture data matches your actual Sequelize model fields — including the new fields (discountCode, shippingMethod, trackingNumber, estimatedDelivery) added earlier.

---

## Step 3 — Database Seed Script (~1 min)

**Goal:** Show generating a seed script for development databases.

1. Prompt:
   ```
   Generate a database seed script at src/migrations/seed_data.ts that:
   - Creates 5 sample users with realistic names/emails
   - Creates 10 products across different categories
   - Creates 15 orders with varying statuses and shipping methods
   - Maintains referential integrity (orders reference real user/product IDs)
   - Uses Sequelize bulkCreate for performance
   ```

2. Show the generated file — point out:
   - Realistic names and emails (not "test1", "test2")
   - Foreign keys reference valid IDs
   - Dates are reasonable (not all the same timestamp)

**Talking Point:** _"Seed scripts are the hidden hero of development. Copilot generates interconnected, realistic data that actually makes sense."_

---

## Key Takeaways

| What | Why It Matters |
|------|---------------|
| Boundary analysis | Copilot reads your logic to find every edge case |
| Schema-aware fixtures | Data matches your actual TypeScript interfaces |
| Interconnected seeds | Foreign keys and relationships maintained |
| Typed exports | Fixtures are reusable across test suites |
| Time saved | Hours of manual data crafting → minutes |
