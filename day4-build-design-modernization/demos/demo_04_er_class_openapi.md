# Demo 04 — ER Diagrams, Class Diagrams & OpenAPI Specs

> **Duration:** ~5 min | **Slide:** 12 | **Mode:** VS Code + Copilot Chat (Agent Mode)

| Setting | Recommendation |
|---------|----------------|
| **Chat Mode** | **Agent** mode throughout — needs file system access to read models and write output files |
| **Model** | **GPT-4.1** — fast and accurate for code-to-diagram translation; reliably produces valid Mermaid and OpenAPI YAML |
| **Fallback Model** | Claude Sonnet 4 — better at complex relationship inference but slightly slower |

---

## Objective

Generate technical diagrams and API specs directly from existing code — showing Copilot as a reverse-engineering and documentation tool.

---

## Pre-Requisites

- VS Code with GitHub Copilot Chat
- The sample-app project open (`day4-build-design-modernization/sample-app/`)
- Mermaid preview extension (recommended: "Markdown Preview Mermaid Support")

---

## Step 1 — ER Diagram from Models (2.5 min)

**Goal:** Reverse-engineer an ER diagram from existing model files.

1. In Copilot Chat (Agent mode), type:
   ```
   Analyze the models in #file:src/models/ and generate a Mermaid ER 
   diagram showing all entities, their attributes, and relationships 
   with cardinality. Save as docs/er-diagram.md
   ```

2. **Open the generated file** and show the Mermaid diagram preview

> **👀 What to watch for:** Check whether Copilot correctly identified the relationships — User to Orders (one-to-many), Products to LineItems (one-to-many), and the many-to-many relationship between Orders and Products via LineItems. The diagram should reflect your actual model code, not generic guesses.

**Talking Point:** _"This diagram is generated from your actual code. If your schema changes, re-run and get an updated diagram in seconds."_

---

## Step 2 — OpenAPI Spec from Routes (2.5 min)

**Goal:** Generate an OpenAPI specification from route handlers.

1. In the same chat or a new thread, type:
   ```
   Analyze #file:src/routes/ and generate an OpenAPI 3.0 spec in YAML 
   with all endpoints, request/response schemas, and example values. 
   Save as docs/openapi.yaml
   ```

2. **Open the generated file** — scroll through the paths and schemas

> **👀 What to watch for:** Look at whether Copilot inferred the correct HTTP methods, request body shapes, and response types from the route handlers. It should also pick up authentication requirements if your routes use auth middleware. This is a complete API spec generated from code — no manual writing.

**Talking Point:** _"From code to API documentation in 30 seconds. Share this with your frontend team and they can start building immediately."_

---

## Bonus — Sequence Diagram (if time permits)

Try a quick one-liner:
```
Generate a Mermaid sequence diagram showing the order placement flow 
based on #file:src/services/orderService.ts and #file:src/routes/orderRoutes.ts
```

> **👀 What to watch for:** Sequence diagrams show runtime flow that static code doesn't reveal — useful for onboarding new team members.

---

## Key Takeaways

- **ER diagrams from models** — Copilot reads your schema definitions and infers relationships
- **OpenAPI specs from routes** — complete specs generated from actual route handlers
- **Mermaid syntax** renders natively in GitHub, VS Code, and most doc tools
- **Re-generate when code changes** — diagrams stay current with minimal effort
