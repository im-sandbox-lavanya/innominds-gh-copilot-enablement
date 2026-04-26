# Demo 03 — Design & Architectural Artifacts

> **Duration:** ~5 min | **Slide:** 10 | **Mode:** VS Code + Copilot Chat (Plan Mode → Agent Mode)

| Setting | Recommendation |
|---------|----------------|
| **Chat Mode** | **Plan** mode (Step 1: ADR analysis) → **Agent** mode (Step 2: document & diagram generation) |
| **Model** | **Claude Sonnet 4** — strongest at architectural reasoning and Mermaid diagram syntax generation |
| **Fallback Model** | GPT-4.1 — reliable Mermaid output with faster generation speed |

---

## Objective

Demonstrate generating ADRs, system design documents, and component diagrams from an existing codebase using Plan mode for analysis and Agent mode for document creation.

---

## Pre-Requisites

- VS Code with GitHub Copilot Chat
- A multi-file project (at least 8–10 files with services, controllers, models)
- Mermaid preview extension installed (optional, for diagram rendering)

---

## Step 1 — Generate an ADR (2 min)

**Goal:** Create an Architecture Decision Record from a real codebase decision.

1. Switch to **Plan mode** and reference the codebase:
   ```
   Analyze #codebase and generate an Architecture Decision Record (ADR) 
   for the database choice in this project. Use the standard ADR format:
   - Title (ADR-001: [Decision])
   - Status (Proposed/Accepted/Deprecated)
   - Context (why this decision was needed)
   - Decision (what was chosen)
   - Alternatives Considered (at least 2 alternatives with pros/cons)
   - Consequences (positive and negative)
   ```

2. **Show the output** — Copilot analyzes package.json, config files, and data access patterns to infer the database choice

3. Point out how Copilot:
   - Identified the actual database from connection strings and ORM usage
   - Listed realistic alternatives (e.g., PostgreSQL vs MongoDB vs DynamoDB)
   - Named concrete consequences based on the project's patterns

**Talking Point:** _"Copilot doesn't just template an ADR — it reads your codebase and fills in real context. The alternatives and consequences are based on what your project actually does."_

---

## Step 2 — Generate a System Design Document (1.5 min)

**Goal:** Create an architectural overview with a component diagram.

1. Switch to **Agent mode** and ask:
   ```
   Analyze #codebase and create a system-design.md document that includes:
   - High-level architecture overview
   - Component diagram in Mermaid syntax
   - Data flow for the main user journey
   - API boundary definitions
   - External dependencies and integration points
   
   Save it as docs/system-design.md
   ```

2. Watch the agent:
   - Scan the project structure
   - Identify components (API layer, services, data layer, external APIs)
   - Generate a Mermaid diagram
   - Create the file

3. **Open the generated file** and show the Mermaid diagram preview:
   ```mermaid
   graph TB
       Client[Web Client] --> API[API Gateway]
       API --> Auth[Auth Service]
       API --> Orders[Order Service]
       Orders --> DB[(PostgreSQL)]
       Orders --> Queue[Message Queue]
       Queue --> Notify[Notification Service]
   ```

**Talking Point:** _"From code to architecture doc in 60 seconds. This used to take half a day of digging through code and drawing boxes."_

---

## Step 3 — Generate Interface Definitions (1.5 min)

**Goal:** Extract and document API contracts from existing code.

1. Ask Copilot:
   ```
   Analyze #file:src/routes/ and generate TypeScript interface 
   definitions for all request/response types. Include:
   - Input validation constraints as JSDoc comments
   - Error response types following RFC 7807
   - Group by resource (User, Order, Product)
   
   Save as src/types/api-contracts.ts
   ```

2. **Show the generated file** — clean TypeScript interfaces derived from actual route handlers

3. Highlight how Copilot:
   - Inferred types from `req.body` and `res.json()` usage
   - Added validation constraints it found in the code
   - Structured the output by domain resource

**Talking Point:** _"These interface definitions can now be your source of truth — shared between frontend and backend, used to generate OpenAPI specs, and tested against."_

---

## Key Takeaways to Reinforce

- **Plan mode for analysis** — understand the codebase before generating artifacts
- **Agent mode for creation** — let it write and save files for you
- **ADRs** capture the "why" behind decisions — Copilot infers context from code
- **Mermaid diagrams** are generated inline — no Visio or draw.io needed
- Always **review generated architecture docs** — they're a rapid first draft
