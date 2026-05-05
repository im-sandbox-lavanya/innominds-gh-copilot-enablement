# Demo 01 — Unit & Integration Test Generation

> **Duration:** ~10 min | **Slide:** 4–5 | **Mode:** VS Code + Copilot Chat

| Setting | Recommendation |
|---------|----------------|
| **Chat Mode** | **Agent** mode (bulk test generation) → **Ask** mode (coverage analysis) |
| **Model** | **Claude Sonnet 4** — generates comprehensive mocks and assertions |
| **Fallback Model** | GPT-4.1 — faster if demo pacing is tight |

---

## Objective

Demonstrate how Copilot generates unit and integration tests for the sample-app — starting from low coverage and iterating to comprehensive coverage using `/tests`, Agent mode, and Chat.

---

## Pre-Requisites

- VS Code with GitHub Copilot Chat (Agent mode available)
- The sample-app project open (`day4-build-design-modernization/sample-app/`)
- `npm install` completed in the sample-app directory
- Show current test state: `npx jest --coverage` (should show low coverage)

---

## Step 1 — Discover Coverage Gaps (~2 min)

**Goal:** Show the starting point — low test coverage and missing test files.

1. **Ask Copilot first** — in **Ask** mode, prompt:
   ```
   Analyze the test coverage of the sample-app project using #codebase — what is the current coverage like and what gaps exist across the services?
   ```

   > Copilot will identify untested functions without you reading through the code manually.

2. **Verify with the real coverage report** — run in terminal:
   ```bash
   cd day4-build-design-modernization/sample-app
   npx jest --coverage 2>&1 | head -40
   ```

3. Point out how Copilot's analysis matches the actual report:
   - `orderService.test.ts` has only 1 test (formatOrderDate)
   - `productService.ts` has 3 completely untested functions: `calculateDiscount`, `checkInventory`, `getCategorySummary`
   - No tests for routes, middleware, or auth

> **👀 What to watch for:** Copilot identifies all untested functions (createOrder, getOrdersByUser, updateOrderStatus, cancelOrder) **before you even run the coverage tool** — showing it can do static coverage analysis by comparing source vs. tests.

**Talking Point:** _"Before we even run Jest, Copilot can tell us where the gaps are just by reading the source and test files. Let's confirm with the actual coverage report."_

---

## Step 2 — Generate Tests with /tests (~3 min)

**Goal:** Show the `/tests` slash command for targeted test generation.

1. Open `src/services/productService.ts`

2. Select the `calculateDiscount` function

3. Type `/tests` in Chat — Copilot generates tests with:
   - Happy path for each discount code (SAVE10, SAVE20, FLAT5, BOGO, VIP)
   - Edge case: invalid discount code
   - Edge case: zero price
   - Edge case: negative quantity

4. Accept the generated tests and run them:
   ```bash
   npx jest productService --verbose
   ```

> **👀 What to watch for:** Copilot reads the switch/case logic and generates a test for every branch — including the default case for unknown codes.

**Talking Point:** _"/tests is surgical — select a function, get tests for exactly that function. It reads your implementation and targets every branch."_

---

## Step 3 — Bulk Test Generation with Agent (~3 min)

**Goal:** Show Agent mode generating an entire test suite across multiple files.

1. Switch to **Agent** mode in Chat

2. Prompt:
   ```
   Generate comprehensive Jest tests for all untested functions in:
   - #file:src/services/orderService.ts (createOrder, getOrdersByUser, updateOrderStatus, cancelOrder)
   - #file:src/services/productService.ts (checkInventory, getCategorySummary)
   
   Requirements:
   - Mock Sequelize models and Redis with jest.mock()
   - Test happy paths, error paths, and edge cases
   - Follow the patterns in #file:tests/services/orderService.test.ts
   ```

3. Watch Agent:
   - Read existing test patterns
   - Generate mocks for Sequelize and Redis
   - Create tests for all 6 functions
   - Run `npx jest` to validate they pass

4. If any tests fail, say: _"Fix the failing tests"_ — Agent self-corrects

> **👀 What to watch for:** Agent creates proper mocks for database models by analyzing your import statements and usage patterns. It doesn't just stub — it matches your actual data shapes.

---

## Step 4 — Iterate for Edge Cases (~2 min)

**Goal:** Show iterative coverage improvement.

1. Run coverage again:
   ```bash
   npx jest --coverage
   ```

2. Ask Copilot:
   ```
   The coverage report shows these uncovered lines in productService.ts: [paste uncovered lines]. Generate tests to cover them.
   ```

3. Accept and run — coverage should increase significantly

**Talking Point:** _"This is the test-writing loop with Copilot: generate → run → check coverage → fill gaps. What used to take hours now takes minutes."_

---

## Key Takeaways

| What | Why It Matters |
|------|---------------|
| `/tests` on selection | Targeted, surgical test generation |
| Agent mode for bulk tests | Full test suites across multiple files |
| Smart mocking | Copilot infers mocks from your imports |
| Iterative coverage | Run → check → generate → repeat |
| Self-correction | Agent fixes its own failing tests |
