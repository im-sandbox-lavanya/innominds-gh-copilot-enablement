# Demo 02 — E2E Test Automation with Playwright

> **Duration:** ~10 min | **Slide:** 6–7 | **Mode:** VS Code + Copilot Agent

| Setting | Recommendation |
|---------|----------------|
| **Chat Mode** | **Agent** mode (scaffolding + test generation) |
| **Model** | **Claude Sonnet 4** — best for multi-file scaffolding with Playwright |
| **Fallback Model** | GPT-4.1 — faster Playwright config generation |

---

## Objective

Demonstrate Copilot Agent generating a full Playwright E2E test suite — including project setup, page object models, and cross-browser test specs — for the sample-app's order dashboard.

---

## Pre-Requisites

- VS Code with GitHub Copilot Chat (Agent mode available)
- The sample-app project open (with `src/public/index.html` — the order dashboard UI)
- Node.js ≥18 installed
- Playwright can be installed live during the demo (adds to the realism)

---

## Step 1 — Scaffold Playwright Project (~2 min)

**Goal:** Show Agent setting up Playwright from scratch.

1. In **Agent** mode, prompt:
   ```
   Set up Playwright for E2E testing in the sample-app project:
   - Install @playwright/test as a dev dependency
   - Create playwright.config.ts with Chrome, Firefox, and WebKit projects
   - Set baseURL to http://localhost:3000
   - Create a tests/e2e/ directory
   ```

2. Watch Agent:
   - Run `npm install -D @playwright/test`
   - Generate `playwright.config.ts`
   - Create the directory structure
   - Optionally run `npx playwright install` for browsers

> **👀 What to watch for:** Agent reads your existing `package.json` and `tsconfig.json` to ensure Playwright config doesn't conflict with Jest settings.

**Talking Point:** _"From zero to Playwright in one prompt. Agent handles the package install, config, and directory structure."_

---

## Step 2 — Generate Page Object Model (~3 min)

**Goal:** Show Copilot analyzing your HTML to generate typed page objects.

1. Prompt Agent:
   ```
   Analyze #file:src/public/index.html and generate a Page Object Model class
   for the order dashboard at tests/e2e/pages/OrderDashboardPage.ts.
   
   Include methods for:
   - Getting stat card values (total orders, pending, shipped, revenue)
   - Filling and submitting the create order form
   - Reading the orders table rows
   - Filtering orders by status
   ```

2. Watch Agent:
   - Read the HTML structure
   - Generate a TypeScript class with Playwright locators
   - Use semantic selectors (data attributes, roles, text content)
   - Create typed return values

3. Show the generated file — point out:
   - Locators match actual HTML elements
   - Methods return typed data, not raw strings
   - Reusable across multiple test specs

> **👀 What to watch for:** Copilot uses your actual HTML element IDs and class names — not generic selectors. It reads the DOM structure from the file reference.

---

## Step 3 — Generate E2E Test Specs (~3 min)

**Goal:** Show Agent generating complete test scenarios using the page objects.

1. Prompt Agent:
   ```
   Using @workspace context and the page object at #file:tests/e2e/pages/OrderDashboardPage.ts,
   generate E2E test specs at tests/e2e/orders.spec.ts:
   
   Test scenarios:
   1. Dashboard loads with stat cards visible
   2. Create a new order and verify it appears in the table
   3. Verify stat cards update after creating an order
   4. Form validation — submit with empty fields
   5. Orders display correct status badges
   ```

2. Watch Agent generate tests with:
   - `test.describe()` blocks
   - `test.beforeEach()` for navigation
   - Page object method calls
   - Meaningful assertions with `expect()`

3. **Optional — Run the tests:** If the app server is running:
   ```bash
   npx playwright test --headed
   ```
   (Shows browsers launching and running through the flows)

> **👀 What to watch for:** Tests use the page object methods — they don't contain raw selectors. This is clean, maintainable E2E code.

---

## Step 4 — Cross-Browser & Visual (~2 min)

**Goal:** Show the multi-browser config in action.

1. Highlight `playwright.config.ts` — show the three browser projects (Chromium, Firefox, WebKit)

2. Run:
   ```bash
   npx playwright test --project=chromium --project=firefox
   ```

3. Show the HTML report:
   ```bash
   npx playwright show-report
   ```

4. **Bonus prompt:**
   ```
   Add visual regression tests using Playwright's toHaveScreenshot() for the dashboard page.
   ```

**Talking Point:** _"Playwright + Copilot = cross-browser E2E tests from a natural language description of user flows. Page objects keep it maintainable."_

---

## Key Takeaways

| What | Why It Matters |
|------|---------------|
| Agent scaffolds Playwright | Zero-to-configured in one prompt |
| HTML → Page Objects | Copilot reads your DOM and generates typed selectors |
| Scenario → Test Specs | Natural language flows become real test code |
| Cross-browser testing | Config once, test everywhere |
| MCP integration | Playwright MCP server enables browser-agent communication |
