# Demo 01 — Prompting for Real Workflows

> **Duration:** ~5 min | **Slide:** 5–6 | **Mode:** VS Code + Copilot Chat

| Setting | Recommendation |
|---------|----------------|
| **Chat Mode** | **Agent** mode (Step 1: prompt files) → **Ask** mode (Step 2: constraints comparison) |
| **Model** | **Claude Sonnet 4** — best reasoning for showing prompt quality contrast |
| **Fallback Model** | GPT-4.1 — faster responses if demo pacing is tight |

---

## Objective

Demonstrate two practical prompting techniques that participants will use throughout the rest of Day 4: reusable prompt files and constraint-driven prompting with guardrails.

> **Note:** Prompt chaining is demonstrated naturally across topics 2–12 (each topic chains from the previous). No need to demo it separately here.

---

## Pre-Requisites

- VS Code with GitHub Copilot Chat (Agent mode available)
- The sample-app project open (`day4-build-design-modernization/sample-app/`)
- Familiarity with Copilot Chat, `#file` references, and Agent mode (covered in Day 3)

---

## Step 1 — Reusable Prompt Files (2.5 min)

**Goal:** Show `.prompt.md` files as team-shareable, parameterized prompt templates.

1. Create `.github/prompts/gen-api-endpoint.prompt.md`:
   ```markdown
   ---
   mode: agent
   description: Generate a REST endpoint with validation and tests
   ---
   Create a new REST endpoint for {{resource}} in #file:src/routes/

   Requirements:
   - Use Zod for request body validation
   - Error responses must follow RFC 7807 (Problem Details)
   - Include unit tests using Jest
   - Add JSDoc/OpenAPI doc comments on the route handler
   - Follow patterns in existing routes: #file:src/routes/userRoutes.ts
   ```

2. Open the Copilot Chat dropdown (the mode picker) — show that the prompt file now appears as a selectable option

3. Run the prompt with `{{resource}}` = "payments" — watch Agent scaffold the full endpoint

4. **Key point:** Anyone on the team can use this prompt without learning the details. It encodes your conventions.

> **👀 What to watch for:** The participant only typed "payments" — Copilot did the rest using the saved template. That's the power of prompt files: the complexity lives in the file, not in your head.

**Talking Point:** _"Prompt files are like reusable functions for AI — write once, use across the team. Committed to your repo, shared via Git."_

---

## Step 2 — Constraints & Guardrails (2.5 min)

**Goal:** Show how adding constraints (what to do) and exclusions (what not to do) in the same prompt dramatically improves output.

1. Start with an **unconstrained prompt**:
   ```
   Create a user search API endpoint in #file:src/routes/userRoutes.ts
   ```
   → Note: Output is functional but generic — may use `any` types, no error handling strategy, no pagination

2. Now use **constraints + guardrails**:
   ```
   Create a user search API endpoint in #file:src/routes/userRoutes.ts

   Constraints (MUST):
   ✅ Must support pagination (limit/offset) with max 100 per page
   ✅ Must sanitize search input to prevent SQL injection
   ✅ Must follow error format in #file:src/middleware/errorHandler.ts

   Guardrails (MUST NOT):
   ❌ Do NOT use `any` type anywhere
   ❌ Do NOT add new npm dependencies
   ❌ Do NOT use synchronous operations
   ```

3. **Compare the outputs** — the constrained version handles pagination, has proper types, and avoids excluded patterns

> **👀 What to watch for:** Compare the two outputs side by side. Look for: Does the first one use `any`? Does it add pagination? Does it handle errors consistently? The constrained version should be visibly better on all counts.

**Talking Point:** _"Telling Copilot what NOT to do is just as powerful as telling it what to do. This simple pattern prevents the most common AI code issues."_

---

## Key Takeaways

| Technique | When to Use |
|---|---|
| **Prompt Files** | Repeatable team workflows — encode conventions once, share via Git |
| **Constraints & Guardrails** | Any production prompt — embed what to do AND what not to do |
| **Prompt Chaining** | Multi-step workflows — we'll practice this across topics 2–12 today |
