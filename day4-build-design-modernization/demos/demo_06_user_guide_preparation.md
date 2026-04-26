# Demo 06 — User Guide Preparation

> **Duration:** ~5 min | **Slide:** 15 | **Mode:** VS Code + Copilot Chat (Agent Mode)

| Setting | Recommendation |
|---------|----------------|
| **Chat Mode** | **Agent** mode throughout — needs to read source files and create documentation files on disk |
| **Model** | **Claude Sonnet 4** — produces the highest-quality technical writing; clear, well-structured prose with accurate API details |
| **Fallback Model** | GPT-4.1 — good output quality with faster generation; prefer for larger documentation sets |

---

## Objective

Demonstrate generating end-user documentation, API reference guides, and tutorial content from code — using prompt files for consistent, repeatable documentation workflows.

---

## Pre-Requisites

- VS Code with GitHub Copilot Chat
- A project with API endpoints and at least one user-facing feature
- `.github/prompts/` folder created

---

## Step 1 — API Documentation from Code (2 min)

**Goal:** Generate developer-facing API docs from actual route implementations.

1. In **Agent mode**, ask:
   ```
   Analyze #file:src/routes/ and generate API documentation in Markdown:
   
   For each endpoint include:
   - HTTP method and path
   - Description of what it does
   - Authentication requirements
   - Request parameters (path, query, body) with types
   - Example request (curl command)
   - Example success response (with realistic data)
   - Example error responses (400, 401, 404, 500)
   
   Group by resource. Save as docs/api-reference.md
   ```

2. **Show the generated file** — highlight the quality:
   ```markdown
   ## Orders API
   
   ### Create Order
   `POST /api/orders`
   
   **Auth:** Bearer token required
   
   **Request Body:**
   | Field     | Type     | Required | Description          |
   |-----------|----------|----------|----------------------|
   | items     | array    | yes      | Array of line items  |
   | couponCode| string   | no       | Discount code        |
   
   **Example Request:**
   ```bash
   curl -X POST https://api.example.com/api/orders \
     -H "Authorization: Bearer <token>" \
     -H "Content-Type: application/json" \
     -d '{"items": [{"productId": 1, "quantity": 2}]}'
   ```
   ```

3. Point out: curl examples use realistic data, error codes match what the code actually returns

**Talking Point:** _"This API reference is generated from your actual route handlers — the fields, types, and error codes are real, not imagined."_

---

## Step 2 — End-User Tutorial Generation (1.5 min)

**Goal:** Create a step-by-step user guide from code logic and tests.

1. Ask Copilot:
   ```
   Based on #file:src/routes/orderRoutes.ts and 
   #file:src/services/orderService.ts, create a user-facing tutorial:
   
   "How to Place an Order — Step-by-Step Guide"
   
   Write it for a non-technical user. Include:
   - Prerequisites (sign in, add items to cart)
   - Step-by-step instructions with numbered steps
   - Screenshots placeholders (describe what the user sees)
   - Common errors and how to resolve them
   - Tips for a smooth experience
   
   Save as docs/tutorials/placing-an-order.md
   ```

2. **Show the output** — a well-structured tutorial with:
   - Clear numbered steps
   - `[Screenshot: ...]` placeholders for the design team to fill
   - A troubleshooting section derived from the code's error handling

**Talking Point:** _"Copilot inferred the user flow from the code's business logic and error handling. The troubleshooting section maps directly to the validation rules in your service layer."_

---

## Step 3 — Reusable Prompt File for Docs (1.5 min)

**Goal:** Create a team-wide documentation prompt template.

1. Create `.github/prompts/generate-api-docs.prompt.md`:
   ```markdown
   ---
   agent: agent
   description: Generate API documentation from route files
   ---
   
   Analyze the route files in this project and generate comprehensive 
   API documentation in Markdown format.
   
   For each endpoint, include:
   - Method, path, description
   - Auth requirements
   - Request/response schemas with types
   - Curl examples with realistic data
   - Error responses
   
   Group endpoints by resource. Follow the documentation style in 
   #file:docs/api-reference.md if it exists.
   
   Save the output as docs/api-reference.md
   ```

2. Show how any team member invokes it:
   ```
   /generate-api-docs
   ```

3. Show a second prompt file for changelogs:
   ```markdown
   ---
   agent: agent
   description: Generate changelog from recent commits
   ---
   
   Analyze the recent git commits and generate a CHANGELOG entry.
   Use Keep a Changelog format (Added, Changed, Fixed, Removed).
   ```

**Talking Point:** _"Prompt files turn documentation into a one-command workflow. Your team runs /generate-api-docs after every release — docs never go stale."_

---

## Key Takeaways to Reinforce

- **API docs from code** ensure accuracy — no manual spec maintenance
- **User guides from business logic** — Copilot understands the user flow from your code
- **Prompt files** standardize doc generation across the team
- **Re-run after changes** to keep documentation current
- **Review the output** — AI generates a strong first draft, humans add nuance
