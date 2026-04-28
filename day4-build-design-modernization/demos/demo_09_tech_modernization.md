# Demo 09 — Tech Modernization

> **Duration:** ~5 min | **Slide:** 22 | **Mode:** VS Code + Copilot Chat (Plan Mode → Agent Mode)

| Setting | Recommendation |
|---------|----------------|
| **Chat Mode** | **Plan** mode (Step 1: migration analysis) → **Agent** mode (Step 2: execute migration) |
| **Model** | **Claude Sonnet 4** — excels at cross-framework translation and understanding architectural patterns |
| **Fallback Model** | GPT-4.1 — faster for individual component translations |

---

## Objective

Demonstrate using Copilot to plan and execute a technology modernization — mapping old patterns to modern equivalents, migrating component by component, and verifying the build.

---

## Pre-Requisites

- VS Code with GitHub Copilot Chat
- The sample-app project open (`day4-build-design-modernization/sample-app/`)
- Terminal accessible for the agent to run build/test commands

---

## Step 1 — Migration Analysis & Strategy (2 min)

**Goal:** Use Plan mode to analyze the codebase and create a migration strategy.

1. Switch to **Plan mode** and type:
   ```
   Analyze this project and identify modernization opportunities — 
   outdated patterns, callback-style code, raw SQL, or tightly coupled 
   modules. Create a migration plan with changes ordered from safest 
   (leaf modules) to riskiest (core modules).
   ```

2. **Show the plan** — Copilot produces an ordered list with dependency analysis

> **👀 What to watch for:** Copilot analyzes actual component dependencies and gives a bottom-up migration order — leaf nodes first so each migrated piece can be tested independently. It identifies *specific* patterns in your code, not generic advice.

**Talking Point:** _"A migration plan based on actual dependency analysis, not guesswork. This prevents the 'everything breaks at once' problem."_

---

## Step 2 — Execute the Migration (2.5 min)

**Goal:** Agent mode migrates one module as a live example.

1. Switch to **Agent mode** and pick the first item from the plan:
   ```
   Execute the first migration step from the plan. Modernize the 
   code, preserve all existing behavior, and run the build to verify 
   nothing broke.
   ```

2. **Watch the agent** refactor, create/modify files, and run verification

> **👀 What to watch for:** The business logic stays the same — only the framework plumbing changes. Copilot maps old patterns to modern equivalents (e.g., callbacks → async/await, manual SQL → ORM, class components → functions). If the build breaks, the agent auto-fixes.

**Talking Point:** _"The behavior is identical — only the implementation pattern changed. Copilot preserved all business logic while modernizing the plumbing."_

---

## Step 3 (Bonus) — Migrate Tests

If time allows:
```
Migrate the corresponding tests to match the modernized code. 
Update assertions and run the test suite to verify.
```

> **👀 What to watch for:** Test migration is often the most tedious part. Copilot handles the mechanical translation — you just verify the assertions still make sense.

---

## This Pattern Works for Any Migration

| Scenario | Key Changes |
|----------|-------------|
| Angular → React | Decorators → hooks, templates → JSX, DI → Context |
| Express → Fastify | Middleware → plugins, route registration |
| jQuery → Vue/React | DOM manipulation → reactive state |
| Callbacks → async/await | Error handling, flow control |
| Raw SQL → ORM | Query builders, model definitions |

The workflow is identical: **Plan** (analyze & order) → **Agent** (migrate & verify) → **Test** (validate behavior)

---

## Key Takeaways

- **Analyze dependencies first** — migration order matters (leaf → root)
- **One module at a time** — incremental migration reduces risk
- **Behavior stays the same** — only the framework plumbing changes
- **Agent verifies builds** — catches translation errors immediately
