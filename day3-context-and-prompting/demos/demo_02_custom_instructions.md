# Demo 02 — Custom Instructions

> **Duration:** ~8 min | **Slide:** 14 | **Mode:** VS Code + File Editor
> **Demo App:** `day3-context-and-prompting/demo-app` (2-file Task Tracker)

---

## Objective

Show how `copilot-instructions.md` and path-specific instruction files change Copilot's output — before/after comparison using the simple task tracker app.

---

## Pre-Requisites

- VS Code with GitHub Copilot & Copilot Chat
- Open the `demo-app` folder
- No `.github/` folder yet (we'll create it live)

---

## Step 1 — Before Instructions: Generic Output

1. Open `task-types.ts` and `task-service.ts` in tabs
2. In Copilot Chat, ask:
   ```
   #file:demo-app/task-types.ts #file:demo-app/task-service.ts
   Add a function to archive completed tasks older than 30 days
   ```
3. **Note the output** — likely works but may:
   - Use `console.log` for logging
   - Use `any` types or skip error handling
   - Not follow any particular coding convention
   - Mix naming styles

---

## Step 2 — Create `copilot-instructions.md`

1. Create the file `.github/copilot-instructions.md` in the demo-app folder:
   ```markdown
   # Task Tracker — Coding Conventions

   ## Stack
   - TypeScript strict mode, Node.js
   - In-memory data store (array-based — no database)

   ## Conventions
   - All functions must have explicit return types
   - Use `readonly` for function parameters that shouldn't be mutated
   - Prefer `const` over `let`; never use `var`
   - Use early returns for guard clauses
   - Log with a `log(message: string)` helper — never use console.log
   - Throw descriptive Error objects — never return null for failures
   - All dates should be compared using `.getTime()` for consistency
   - Use JSDoc comments on exported functions
   ```

2. **Re-ask the exact same question** in a new chat thread:
   ```
   #file:demo-app/task-types.ts #file:demo-app/task-service.ts
   Add a function to archive completed tasks older than 30 days
   ```
3. **Compare** — the new response should:
   - Have explicit return types
   - Use early returns
   - Use `.getTime()` for date comparison
   - Include JSDoc comments
   - Avoid `console.log`

**Talking Point:** _"Same prompt. Same files. Completely different code quality — just from a 10-line instructions file."_

---

## Step 3 — Path-Specific Instructions

1. Create `.github/instructions/tests.instructions.md`:
   ```markdown
   ---
   applyTo: "**/*.test.ts"
   ---
   # Testing Standards for Task Tracker
   - Use descriptive test names: "should [action] when [condition]"
   - Follow AAA pattern: Arrange, Act, Assert
   - One assertion concept per test
   - Always test both happy path and error cases
   - Inline test data — no separate fixtures
   ```

2. Now ask Copilot Chat:
   ```
   #file:demo-app/task-service.ts
   Generate tests for createTask and deleteTask functions
   ```
3. **Observe** that tests follow the AAA pattern, use descriptive names, and cover error cases

**Talking Point:** _"Path-specific instructions activate only for matching files — tests get test rules, services get service rules."_

---

## Step 4 — Quick Show: `.github/copilot-instructions.md` in Real Projects

1. Briefly show that in a real project this file lives at the repo root under `.github/`
2. Mention that the entire team benefits — it's committed to source control
3. It auto-injects into **every** Copilot request — no need to reference it manually

---

## Cleanup

- Optionally keep the `.github/` folder for later demos, or delete it
