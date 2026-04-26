# Demo 01 — Prompt Engineering & Practical Use Cases

> **Duration:** ~5 min | **Slide:** 5–6 | **Mode:** VS Code + Copilot Chat

| Setting | Recommendation |
|---------|----------------|
| **Chat Mode** | **Ask** mode (Steps 1–2: prompt comparison) → **Agent** mode (Step 3: custom instructions file creation) |
| **Model** | **Claude Sonnet 4** — best reasoning for showing prompt quality contrast; strong structured output |
| **Fallback Model** | GPT-4.1 — faster responses if demo pacing is tight |

---

## Objective

Show how prompt quality directly impacts Copilot output — demonstrate the six core strategies (general→specific, examples, decomposition, eliminating ambiguity, referencing code, iterating) with live before/after comparisons.

---

## Pre-Requisites

- VS Code with GitHub Copilot Chat (Agent mode available)
- A sample project with at least 3–4 related files (e.g., a Node.js/Express or Spring Boot API)
- A file with a function that has a known bug or improvement opportunity

---

## Step 1 — Weak vs Strong Prompts (1.5 min)

**Goal:** Side-by-side comparison of vague vs precise prompts.

1. Open Copilot Chat and type a **weak prompt**:
   ```
   Fix this code
   ```
   → Note: Copilot asks for clarification or gives generic advice

2. Now type a **strong prompt** referencing a specific file:
   ```
   Fix the null pointer exception in #file:src/services/userService.ts 
   in the parseUser() function — it crashes when the email field is 
   missing from the API response
   ```
   → Note: Copilot immediately identifies the issue and provides a targeted fix

3. **Show the difference** — specific context, function name, root cause description

**Talking Point:** _"The more context you give, the better the output. A 10-second investment in prompt quality saves minutes of back-and-forth."_

---

## Step 2 — Decomposition Pattern (1.5 min)

**Goal:** Show breaking a complex task into sequential prompts.

1. Start with an overly ambitious prompt:
   ```
   Build a complete user authentication system with JWT, refresh tokens,
   password reset, email verification, rate limiting, and audit logging
   ```
   → Note: Output is sprawling, incomplete, or makes assumptions

2. Now **decompose** into focused steps:
   ```
   Step 1: Create a JWT token generation utility in #file:src/utils/
   that issues access tokens (15min expiry) and refresh tokens (7d expiry) 
   using the jsonwebtoken library. Include TypeScript types for the payload.
   ```
   → Note: Output is focused, complete, and high quality

3. Show how you'd continue with Step 2 (middleware), Step 3 (refresh flow), etc.

**Talking Point:** _"Don't ask Copilot to build Rome in one prompt. Break it down — each piece will be much better."_

---

## Step 3 — Custom Instructions Demo (2 min)

**Goal:** Show how project-level instructions shape every response.

1. Open or create `.github/copilot-instructions.md`:
   ```markdown
   ## Coding Standards
   - Use TypeScript strict mode
   - Use Zod for all input validation
   - Use date-fns instead of moment.js (smaller bundle)
   - Error responses must follow RFC 7807 (Problem Details)
   - All service functions must be async and return Result<T, Error> types
   - Use pino for structured logging, never console.log
   ```

2. Ask Copilot to generate a service function:
   ```
   Create a function to validate and process a new order 
   in #file:src/services/orderService.ts
   ```

3. **Show** that the generated code:
   - Uses Zod schemas (not manual validation)
   - Returns `Result<T, Error>` types
   - Uses `pino` logger
   - Follows RFC 7807 for errors

4. **Remove** the instructions file temporarily and re-run the same prompt — show the difference

**Talking Point:** _"Set your conventions once in copilot-instructions.md, and every developer on the team gets consistent suggestions — no copy-pasting prompts."_

---

## Key Takeaways to Reinforce

- **Specific beats vague** — name the function, file, library, and expected behavior
- **Decompose complex tasks** — sequential smaller prompts produce better results than one mega-prompt
- **Custom instructions** are your team's secret weapon — set once, benefit everywhere
- **Iterate, don't start over** — reference previous responses and refine
