# Demo 07 — New Feature Implementation

> **Duration:** ~5 min | **Slide:** 17–18 | **Mode:** VS Code + Copilot Chat (Plan Mode → Agent Mode → Ask Mode)

| Setting | Recommendation |
|---------|----------------|
| **Chat Mode** | **Plan** mode (Step 1: feature strategy) → **Agent** mode (Step 2: implementation) → **Ask** mode (Step 3: verify) |
| **Model** | **Claude Sonnet 4** — best for multi-step planning and cross-file implementation |
| **Fallback Model** | GPT-4.1 — faster code generation for smaller features |

---

## Objective

Demonstrate the end-to-end feature workflow: Plan mode for strategy, Agent mode for execution, and Ask mode for verification.

---

## Pre-Requisites

- VS Code with GitHub Copilot Chat
- The sample-app project open (`day4-build-design-modernization/sample-app/`)
- Terminal accessible for the agent to run commands

---

## Step 1 — Plan Mode: Feature Strategy (2 min)

**Goal:** Show Plan mode breaking down a feature request into an actionable plan.

1. Switch to **Plan mode** and type:
   ```
   I need to add a product search feature to this e-commerce API. 
   Users should be able to search by name, filter by category and 
   price range, and get paginated results. Analyze the project and 
   create an implementation plan.
   ```

2. **Show the generated plan** — Copilot produces step-by-step tasks with file names and verification steps

> **👀 What to watch for:** The plan references your actual project files (productRoutes.ts, productService.ts) — not generic placeholders. It proposes changes that fit your existing architecture. You can ask follow-up questions to refine the plan before any code is written.

**Talking Point:** _"Plan mode doesn't write code yet — it thinks first. Review and adjust the strategy before committing to implementation."_

---

## Step 2 — Agent Mode: Execute the Plan (2 min)

**Goal:** Hand the plan to Agent mode and watch it implement across files.

1. Switch to **Agent mode** and type:
   ```
   Implement the search feature plan. Create the search service, 
   add the search route, and run the build to verify.
   ```

2. **Watch the agent** create/modify files and run build commands

> **👀 What to watch for:** The agent creates new files *and* modifies existing ones to wire things together. If it hits a build error, notice how it reads the error and auto-fixes — that's the self-correction loop. It doesn't stop at the first failure.

**Talking Point:** _"You described what you wanted. The agent figured out which files to create, which to modify, and verified the build passes."_

---

## Step 3 — Ask Mode: Verify Understanding (1 min)

**Goal:** Close the loop — show all three modes on one workflow.

1. Switch to **Ask mode** and type:
   ```
   Explain how the new search feature works. 
   What query parameters does it accept?
   ```

2. **Show the response** — Copilot explains without changing anything

> **👀 What to watch for:** Ask mode reads the code you just created and gives an accurate summary. This is useful for onboarding teammates or generating internal docs from freshly written code.

**Summary of the three-mode workflow:**
- **Plan** → _"Here's how I'd build it"_ (strategy)
- **Agent** → _"I'll build it now"_ (execution)
- **Ask** → _"Here's how it works"_ (verification)

**Talking Point:** _"Plan to strategize, Agent to execute, Ask to verify. Three modes, one complete workflow."_

---

## Key Takeaways

- **Plan first, then implement** — review the strategy before writing code
- **Agent mode handles multi-file changes** and self-corrects on build errors
- **Ask mode** verifies the result without modifying anything
- **Review every change** — Agent opens diffs for you to accept or reject
