# Demo 03 — Design & Architectural Artifacts

> **Duration:** ~5 min | **Slide:** 10 | **Mode:** VS Code + Copilot Chat (Plan Mode → Agent Mode)

| Setting | Recommendation |
|---------|----------------|
| **Chat Mode** | **Plan** mode (Step 1: ADR analysis) → **Agent** mode (Step 2: system design document) |
| **Model** | **Claude Sonnet 4** — strongest at architectural reasoning and Mermaid diagram syntax generation |
| **Fallback Model** | GPT-4.1 — reliable Mermaid output with faster generation speed |

---

## Objective

Demonstrate generating design documentation from an existing codebase — an ADR using Plan mode, then a system design document with diagrams using Agent mode.

---

## Pre-Requisites

- VS Code with GitHub Copilot Chat
- The sample-app project open (`day4-build-design-modernization/sample-app/`)
- Mermaid preview extension installed (optional, for diagram rendering)

---

## Step 1 — Generate an ADR (2.5 min)

**Goal:** Create an Architecture Decision Record by letting Copilot analyze the codebase.

1. Switch to **Plan mode** and type:
   ```
   Analyze this project and generate an Architecture Decision Record (ADR) 
   for the database choice. Use standard ADR format. 
   Include alternatives considered with pros and cons.
   ```

2. **Show the output** — Copilot analyzes package.json, config files, and data access patterns to infer the database choice and produce a full ADR

> **👀 What to watch for:** Notice that you didn't specify every section of the ADR — Copilot knows the standard format (Title, Status, Context, Decision, Alternatives, Consequences). It also fills in *real* context from your code, not generic placeholders. Check whether it correctly identified the database from your connection strings.

**Talking Point:** _"Copilot doesn't just template an ADR — it reads your codebase and fills in real context. You get a meaningful first draft, not a blank form."_

---

## Step 2 — Generate a System Design Document (2.5 min)

**Goal:** Create an architectural overview with a component diagram, saved as a file.

1. Switch to **Agent mode** and type:
   ```
   Analyze this project and create a system design document with:
   - Architecture overview
   - Component diagram in Mermaid syntax
   - Data flow for the main user journey
   
   Save as docs/system-design.md
   ```

2. Watch the agent scan the project, identify components, generate a Mermaid diagram, and create the file

3. **Open the generated file** and show the Mermaid diagram preview

> **👀 What to watch for:** This is **Agent mode in action** — it reads multiple files, generates the document, and saves it for you. Compare that with Step 1 (Plan mode) which only analyzed and displayed output. Also notice how the Mermaid diagram reflects your actual project structure, not a generic template.

**Talking Point:** _"From code to architecture doc in 60 seconds. Plan mode to understand, Agent mode to create."_

---

## Key Takeaways

- **Plan mode for analysis** — understand the codebase before generating artifacts
- **Agent mode for creation** — let it read files, generate docs, and save them
- **ADRs** capture the "why" behind decisions — Copilot infers context from code
- **Mermaid diagrams** render natively in GitHub, VS Code, and most doc tools
- Always **review generated docs** — they're a rapid first draft, not a final product
