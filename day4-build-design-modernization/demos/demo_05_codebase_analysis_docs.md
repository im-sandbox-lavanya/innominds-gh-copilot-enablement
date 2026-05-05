# Demo 05 — Codebase Analysis, Documentation & Key Metrics

> **Duration:** ~5 min | **Slide:** 14–15 | **Mode:** VS Code + Copilot Chat (Ask Mode → Agent Mode)

| Setting | Recommendation |
|---------|----------------|
| **Chat Mode** | **Ask** mode (Steps 1–2: codebase Q&A, anti-pattern detection) → **Agent** mode (Step 3: README generation) |
| **Model** | **Claude Sonnet 4** — superior at deep codebase reasoning and tracing call chains |
| **Fallback Model** | GPT-4.1 — good for README generation; slightly less thorough on analysis |

---

## Objective

Demonstrate Copilot's ability to analyze a codebase, detect quality issues, and generate documentation — all from within the IDE.

---

## Pre-Requisites

- VS Code with GitHub Copilot Chat
- The sample-app project open (`day4-build-design-modernization/sample-app/`)

---

## Step 1 — Codebase Architecture Analysis (2 min)

**Goal:** Show `#codebase` answering deep architectural questions by tracing across files.

1. Open Copilot Chat in **Ask mode** and type:
   ```
   #codebase Where is authentication handled in this project? 
   Trace the full flow from the incoming request to token validation.
   ```

2. **Show the response** — Copilot finds and traces across multiple files: middleware registration, JWT verification, token extraction, user context

> **👀 What to watch for:** Copilot doesn't just find the auth file — it traces the *flow* across files (route → middleware → verification → user context). This is smarter than grep or Find All References because it understands what the code *does*, not just where strings appear.

**Talking Point:** _"One prompt, and Copilot traced the auth flow across 3–4 files. Try doing that with text search."_

---

## Step 2 — Anti-Pattern Detection (1.5 min)

**Goal:** Show Copilot finding code quality issues across the project.

1. In the same chat, type:
   ```
   #codebase Review this project for code quality issues and 
   anti-patterns. Show the file and describe each issue found.
   ```

2. **Show the results** — Copilot flags real issues it found in the codebase

> **👀 What to watch for:** See what Copilot independently identifies — common findings include swallowed errors in catch blocks, missing input validation, hardcoded values, or duplicated logic. You didn't have to tell it what to look for — it applied general best practices to your specific code.

**Talking Point:** _"This is like an automated code review. Run it before a sprint to surface tech debt you didn't know about."_

---

## Step 3 — README Generation (1.5 min)

**Goal:** Auto-generate a README from codebase analysis.

1. Switch to **Agent mode** and type:
   ```
   Analyze this project and generate a README.md with project overview, 
   setup instructions, and API endpoints summary. Save as README.md
   ```

2. **Open the generated README** and scroll through it

> **👀 What to watch for:** The README should have accurate install commands (from package.json), correct folder structure, and an API table derived from your actual routes — not generic placeholder text. This is documentation generated from code, not a template.

**Talking Point:** _"This README is based on your actual code. Re-run it after major changes to keep documentation in sync."_

---

## Key Takeaways

- **#codebase** in Ask mode triggers workspace-wide semantic search — Agent/Plan modes don't need it
- **Anti-pattern detection** acts as an automated code review in seconds
- **README generation** from code ensures documentation stays accurate
- Always **review generated output** — it's a strong first draft, not final
