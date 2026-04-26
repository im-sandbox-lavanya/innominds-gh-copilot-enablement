# Demo 05 — Codebase Analysis, Documentation & Key Metrics

> **Duration:** ~5 min | **Slide:** 14–15 | **Mode:** VS Code + Copilot Chat (Ask Mode → Agent Mode)

| Setting | Recommendation |
|---------|----------------|
| **Chat Mode** | **Ask** mode (Steps 1–2: codebase Q&A, anti-pattern detection) → **Agent** mode (Step 3: README file generation) |
| **Model** | **Claude Sonnet 4** — superior at deep codebase reasoning, tracing call chains, and identifying subtle anti-patterns |
| **Fallback Model** | GPT-4.1 — good for README generation; slightly less thorough on anti-pattern analysis |

---

## Objective

Demonstrate Copilot's ability to deeply analyze a codebase — answering architectural questions, mapping dependencies, detecting anti-patterns, and generating documentation that stays in sync with code.

---

## Pre-Requisites

- VS Code with GitHub Copilot Chat
- A multi-file project (10+ files with services, controllers, models, routes)
- At least one file with known code smells or complexity issues

---

## Step 1 — Codebase Architecture Analysis (2 min)

**Goal:** Show #codebase semantic search answering deep architectural questions.

1. Open Copilot Chat in **Ask mode** and type:
   ```
   #codebase Where is authentication handled in this project? 
   Trace the full flow from the incoming request to the token validation.
   ```

2. **Show the response** — Copilot finds and traces across multiple files:
   - Route middleware registration
   - JWT verification logic
   - Token extraction from headers
   - User context attachment to request

3. Follow up with a dependency question:
   ```
   #codebase What would break if I removed the express-validator 
   package? List all files and functions that depend on it.
   ```

4. **Show the impact analysis** — Copilot identifies every import, every validation call, and the downstream effects

**Talking Point:** _"This is faster than grep and smarter than Find All References — Copilot understands what the code does, not just where strings appear."_

---

## Step 2 — Anti-Pattern Detection (1.5 min)

**Goal:** Show Copilot finding code quality issues across the project.

1. Ask Copilot:
   ```
   #codebase Analyze this project for code quality issues:
   - Functions with cyclomatic complexity > 10
   - Catch blocks that swallow errors without logging
   - API endpoints missing input validation
   - Hardcoded strings that should be environment variables
   - Duplicate logic that should be extracted into shared utilities
   
   For each issue, show the file, line context, and severity.
   ```

2. **Show the results** — a structured list of real issues found in the project

3. Point out specific findings:
   - _"Look — there's an empty catch block in orderService.ts hiding a critical error"_
   - _"These three files all have the same date formatting logic — perfect DRY candidate"_

**Talking Point:** _"This analysis would take a senior developer hours of code review. Copilot surfaces these issues in seconds — run it before every sprint starts."_

---

## Step 3 — README Generation with Agent (1.5 min)

**Goal:** Auto-generate a comprehensive README from codebase analysis.

1. Switch to **Agent mode** and ask:
   ```
   Analyze #codebase and generate a comprehensive README.md. Include:
   - Project overview and purpose
   - Tech stack and dependencies
   - Getting started (prerequisites, install, run, test)
   - Project structure (folder tree with descriptions)
   - API endpoints summary table
   - Environment variables reference
   - Contributing guidelines
   
   Save as README.md
   ```

2. Watch the agent:
   - Scan `package.json` / `pom.xml` for dependencies
   - Analyze folder structure
   - Inspect route files for API endpoints
   - Check `.env.example` or config files for env vars
   - Create and save the README

3. **Open the generated README** — show the quality:
   - API table with methods, paths, descriptions
   - Correct install commands from the project's actual package manager
   - Accurate folder structure tree

**Talking Point:** _"This README is based on your actual code — not a template. The API table, setup commands, and folder structure are all accurate. Keep it in sync by re-running after major changes."_

---

## Key Takeaways to Reinforce

- **#codebase** triggers semantic search — it understands meaning, not just text
- **Dependency analysis** prevents unexpected breakage during refactors
- **Anti-pattern detection** acts as an automated code review pass
- **README generation** from code ensures documentation stays accurate
- Run analysis **before sprints** to prioritize tech debt
