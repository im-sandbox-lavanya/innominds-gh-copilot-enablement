# Demo 06 — User Guide Preparation

> **Duration:** ~5 min | **Slide:** 15 | **Mode:** VS Code + Copilot Chat (Agent Mode)

| Setting | Recommendation |
|---------|----------------|
| **Chat Mode** | **Agent** mode throughout — needs to read source files and create documentation files on disk |
| **Model** | **Claude Sonnet 4** — produces the highest-quality technical writing with accurate API details |
| **Fallback Model** | GPT-4.1 — good output quality with faster generation |

---

## Objective

Demonstrate generating API docs and user guides from code — and packaging the workflow into a reusable prompt file.

---

## Pre-Requisites

- VS Code with GitHub Copilot Chat
- The sample-app project open (`day4-build-design-modernization/sample-app/`)

---

## Step 1 — API Documentation from Code (2 min)

**Goal:** Generate developer-facing API docs from actual route implementations.

1. In **Agent mode**, type:
   ```
   Analyze #file:src/routes/ and generate API documentation grouped 
   by resource. Include method, path, auth, request/response schemas, 
   and curl examples. Save as docs/api-reference.md
   ```

2. **Open the generated file** and scroll through it

> **👀 What to watch for:** The curl examples use realistic data from *your* code, not placeholder text. The request body fields and error codes match what the route handlers actually return. Copilot read your code to produce this — it's not a generic template.

**Talking Point:** _"This API reference is generated from your actual route handlers — the fields, types, and error codes are real, not imagined."_

---

## Step 2 — End-User Tutorial Generation (1.5 min)

**Goal:** Create a step-by-step user guide from code logic.

1. Type:
   ```
   Based on #file:src/routes/orderRoutes.ts and 
   #file:src/services/orderService.ts, create a user-facing tutorial: 
   "How to Place an Order". Write for a non-technical user with 
   numbered steps and a troubleshooting section. Save as docs/tutorials/placing-an-order.md
   ```

2. **Open the output** and show the structure

> **👀 What to watch for:** The troubleshooting section maps directly to the validation rules and error handling in your service layer. Copilot inferred the user flow from code logic — prerequisites, the happy path, and what can go wrong.

**Talking Point:** _"Copilot inferred the user flow from your business logic and error handling — not from a template."_

---

## Step 3 — Reusable Prompt File for Docs (1.5 min)

**Goal:** Turn the API-docs workflow into a one-command team standard.

1. Type:
   ```
   Create a prompt file at .github/prompts/generate-api-docs.prompt.md 
   that generates API documentation from route files. It should use 
   agent mode and save output as docs/api-reference.md
   ```

2. Show how any team member invokes it:
   ```
   /generate-api-docs
   ```

> **👀 What to watch for:** The generated prompt file has YAML frontmatter (`agent: agent`, `description: ...`) and a clear instruction body. Any team member can now run `/generate-api-docs` — documentation becomes a repeatable, one-command workflow.

**Talking Point:** _"Prompt files turn documentation into a team standard. Run /generate-api-docs after every release — docs never go stale."_

---

## Key Takeaways

- **API docs from code** ensure accuracy — no manual spec maintenance
- **User guides from business logic** — Copilot understands user flows from your code
- **Prompt files** standardize doc generation across the team
- Always **review generated output** — it's a strong first draft, not final
