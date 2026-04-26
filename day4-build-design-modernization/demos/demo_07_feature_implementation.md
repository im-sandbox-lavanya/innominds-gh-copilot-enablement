# Demo 07 — New Feature Implementation

> **Duration:** ~5 min | **Slide:** 17–18 | **Mode:** VS Code + Copilot Chat (Plan Mode → Agent Mode)

| Setting | Recommendation |
|---------|----------------|
| **Chat Mode** | **Plan** mode (Step 1: feature strategy & trade-off analysis) → **Agent** mode (Step 2: multi-file implementation with build verification) |
| **Model** | **Claude Sonnet 4** — best for multi-step planning and cross-file implementation; auto-corrects build errors effectively |
| **Fallback Model** | GPT-4.1 — faster code generation; prefer if the feature scope is smaller |

---

## Objective

Demonstrate the end-to-end feature implementation workflow — starting with Plan mode for strategy, then handing off to Agent mode for execution across multiple files, with automatic build verification.

---

## Pre-Requisites

- VS Code with GitHub Copilot Chat (Plan + Agent modes)
- A working project that builds and has existing tests (e.g., Express API or Spring Boot app)
- Terminal accessible for agent to run commands

---

## Step 1 — Plan Mode: Feature Strategy (2 min)

**Goal:** Show Plan mode breaking down a feature request into an actionable plan.

1. Switch to **Plan mode** in Copilot Chat
2. Describe a realistic feature:
   ```
   I need to add a product search feature to this e-commerce API:
   - Full-text search across product name and description
   - Filter by category, price range, and availability
   - Sort by relevance, price, or newest
   - Paginated results (default 20 per page)
   - Search suggestions/autocomplete endpoint
   
   Analyze #codebase and create an implementation plan.
   ```

3. **Show the generated plan** — typically includes:
   - Summary of what needs to change
   - Step-by-step implementation tasks:
     1. Add search query builder in service layer
     2. Create search route with query parameters
     3. Add database indexes for full-text search
     4. Implement pagination utility
     5. Add autocomplete endpoint
     6. Write integration tests
   - Verification steps (build, test, manual check)

4. **Iterate on the plan** — ask a follow-up:
   ```
   Should we use database full-text search or Elasticsearch? 
   This project uses PostgreSQL. What are the trade-offs?
   ```
   → Copilot updates the plan with a recommendation

**Talking Point:** _"Plan mode doesn't write code yet — it thinks first. You can review and adjust the strategy before committing to implementation."_

---

## Step 2 — Agent Mode: Execute the Plan (2 min)

**Goal:** Hand the plan off to Agent mode and watch it implement across files.

1. **Hand off to Agent mode** — click the "implement" action or switch modes:
   ```
   Implement the search feature plan. Start with steps 1-3:
   - Create the search service with query builder
   - Create the search route with all filter parameters
   - Add the necessary database index migration
   
   Run the build and tests after each file change.
   ```

2. **Watch the agent work** — narrate what's happening:
   - _"It's creating searchService.ts with the query builder…"_
   - _"Now it's adding the search route in routes/productRoutes.ts…"_
   - _"It's running npm run build — checking for compile errors…"_
   - _"Build error — a type mismatch. It's auto-fixing…"_
   - _"Running tests… all passing."_

3. **Show the diff view** — review changes across created/modified files

4. Point out the **self-correction**: _"Notice it hit a build error and fixed it automatically. That's the agent loop — it doesn't stop at the first error."_

**Talking Point:** _"You described what you wanted. The agent figured out which files to create, which to modify, and verified the build passes. That's the power of agentic development."_

---

## Step 3 — Ask Mode: Verify Understanding (1 min)

**Goal:** Quick comparison showing all three modes on one workflow.

1. Switch to **Ask mode** and ask:
   ```
   Explain how the new search feature works. 
   What query parameters does it accept?
   ```
   → Copilot explains the feature without changing anything

2. **Summarize the three-mode workflow:**
   - **Plan** → _"Here's how I'd build it"_ (strategy)
   - **Agent** → _"I'll build it now"_ (execution)
   - **Ask** → _"Here's how it works"_ (documentation)

**Talking Point:** _"Plan to strategize, Agent to execute, Ask to verify. This three-step workflow keeps you in control while Copilot does the heavy lifting."_

---

## Key Takeaways to Reinforce

- **Plan first, then implement** — review the strategy before writing code
- **Agent mode handles multi-file changes** — services, routes, tests, migrations
- **Self-correction loop** — Agent fixes build/test failures automatically
- **Iterate on plans** — ask follow-up questions to refine before execution
- **Review every change** — Agent opens diffs for you to accept or reject
