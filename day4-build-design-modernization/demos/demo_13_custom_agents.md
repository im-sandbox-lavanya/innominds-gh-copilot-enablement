# Demo 13 — Custom Agents

> **Duration:** ~8 min | **Slide:** 17 (capability card reference) | **Mode:** VS Code + File Editor + Copilot Chat (Agent Mode)

| Setting | Recommendation |
|---------|----------------|
| **Chat Mode** | **Agent** mode (Steps 2–4: invoke the custom agents) |
| **Model** | **Claude Sonnet 4** — best at following nuanced agent instructions and enforcing constraints |
| **Fallback Model** | GPT-4.1 — faster execution if demo pacing is tight |

---

## Objective

Show how to create custom agent definitions (`.agent.md` files) that encode team-specific personas, rules, and tool restrictions — then invoke them in Copilot Chat. Participants will see the progression from generic `.prompt.md` files (Demo 01) to persistent, persona-driven agents that enforce architectural standards automatically.

---

## Pre-Requisites

- VS Code with GitHub Copilot Chat (Agent mode)
- The sample-app project open (`day4-build-design-modernization/sample-app/`)
- Familiarity with `.prompt.md` files (covered in Demo 01)

---

## Step 1 — Create a Backend Architect Agent (2 min)

**Goal:** Define a custom agent with a persona, rules, and tool restrictions.

1. Create `.github/agents/backend-architect.agent.md`:
   ```markdown
   ---
   description: Reviews and plans backend features enforcing architectural standards
   tools:
     - codebase
     - fetch
     - githubRepo
   ---
   # Backend Architect Agent

   You are a senior backend architect reviewing an Express + TypeScript + Sequelize codebase.

   ## Rules
   - Every new feature MUST include a database migration file in `src/migrations/`
   - All routes MUST use the validation middleware from `src/middleware/validate.ts`
   - Service functions MUST NOT import from route files — enforce one-way dependency
   - New endpoints MUST return RFC 7807 Problem Details for errors
   - All database queries MUST use Sequelize model methods — no raw SQL

   ## Review Checklist
   When asked to review or plan a feature, always verify:
   1. Migration script exists and has both UP and DOWN
   2. Input validation uses Zod schemas
   3. Error handling follows the existing `errorHandler.ts` pattern
   4. No circular dependencies between layers (routes → services → models)

   ## Tool Usage
   - Use `codebase` to understand existing patterns before suggesting changes
   - Use `fetch` only when referencing external documentation (e.g., Sequelize docs)
   - Never run destructive terminal commands (DROP, DELETE, rm)
   ```

2. **Show the file structure** — `.github/agents/backend-architect.agent.md`

**Talking Point:** _"This agent knows your architecture rules. It will enforce them on every request — not because you remembered to add constraints, but because the persona includes them by default."_

---

## Step 2 — Invoke the Agent: Feature Planning (2 min)

**Goal:** Use the custom agent to plan a feature and see it enforce rules automatically.

1. In **Agent mode**, select the **Backend Architect** agent from the Chat participant dropdown (type `@backend-architect`), then type:
   ```
   Plan a "customer reviews" feature — users can submit star ratings 
   and text reviews for products. Include the API endpoints, data model, 
   and implementation steps.
   ```

2. **Show the output** — the agent should:
   - Include a migration file in the plan (`src/migrations/XXX_add_reviews.sql`)
   - Require Zod validation schemas for review input
   - Enforce the route → service → model dependency direction
   - Propose RFC 7807 error responses
   - Include UP and DOWN in the migration

> **👀 What to watch for:** Compare this mentally to what generic Agent mode would produce. The custom agent's plan includes migration files and validation — things a generic prompt would likely skip unless you explicitly asked.

**Talking Point:** _"You asked for a feature. The agent added migrations, validation, and error handling on its own — because the rules are baked into its persona."_

---

## Step 3 — Create a Second Agent: API Reviewer (2 min)

**Goal:** Show that teams can have multiple agents for different concerns.

1. Create `.github/agents/api-reviewer.agent.md`:
   ```markdown
   ---
   description: Reviews API endpoints for consistency, security, and documentation
   tools:
     - codebase
   ---
   # API Reviewer Agent

   You are an API design reviewer specializing in REST API consistency.

   ## Standards
   - All endpoints MUST follow RESTful naming: plural nouns, no verbs in paths
   - Responses MUST use consistent envelope: `{ data, meta, errors }`
   - All list endpoints MUST support pagination (limit/offset, max 100)
   - Auth-required endpoints MUST use the auth middleware from `src/middleware/auth.ts`
   - Every route file MUST have corresponding JSDoc/OpenAPI annotations

   ## When Reviewing
   - Flag any endpoint that returns raw arrays (should be wrapped in envelope)
   - Flag missing pagination on list endpoints
   - Flag inconsistent HTTP status codes
   - Suggest specific fixes — don't just identify problems
   ```

2. Invoke it on the existing codebase:
   ```
   @api-reviewer Review all route files in src/routes/ and flag 
   any violations of our API standards.
   ```

3. **Show the review output** — specific findings with file names and suggested fixes

> **👀 What to watch for:** The agent checks against *its own standards*, not generic best practices. If your routes already wrap responses in an envelope, it should say so. If they don't, it flags each violation with a fix.

**Talking Point:** _"This is like having a senior reviewer who never forgets the standards. Every PR gets the same thorough review."_

---

## Step 4 — Compare: Generic Agent vs Custom Agent (2 min)

**Goal:** Make the value of custom agents concrete with a side-by-side comparison.

1. In **Agent mode** (default, no custom agent), type:
   ```
   Add a "wishlist" feature where users can save products for later.
   ```
   → Note the output — likely functional but may miss migrations, skip validation, or not follow your error pattern

2. Now switch to the Backend Architect agent:
   ```
   @backend-architect Add a "wishlist" feature where users can save 
   products for later.
   ```
   → The output should include migrations, Zod schemas, one-way dependencies, and RFC 7807 errors

3. **Compare** — same prompt, different quality

> **👀 What to watch for:** The generic version works but cuts corners. The architect version follows every rule. The difference isn't visible until you compare them side by side — that's why this step is important.

**Talking Point:** _"Same prompt. One produces code that passes review on the first try. Custom agents encode your team's standards permanently."_

---

## Key Takeaways

| Concept | What It Does |
|---|---|
| **`.agent.md` files** | Define persistent agent personas with rules, tools, and constraints |
| **`description` frontmatter** | Shows in the Chat participant picker — helps teammates choose the right agent |
| **`tools` frontmatter** | Restricts which tools the agent can use — limits blast radius |
| **Multiple agents** | Different concerns (architecture, API review, security) get dedicated agents |
| **Team sharing** | Committed to `.github/agents/` — the whole team benefits via Git |

---

## Progression Recap

| Day 3 | Day 4 Demo 01 | Day 4 Demo 13 |
|---|---|---|
| `copilot-instructions.md` — project-wide rules | `.prompt.md` — reusable parameterized templates | `.agent.md` — persona-driven agents with tool restrictions |
| Passive (auto-injected) | Active (user selects from dropdown) | Active (user invokes by name) |
| Same rules for everything | Different templates for different tasks | Different agents for different roles |
