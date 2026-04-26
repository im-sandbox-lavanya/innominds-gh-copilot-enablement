# Demo 02 — Requirements → User Stories

> **Duration:** ~5 min | **Slide:** 8 | **Mode:** VS Code + Copilot Chat (Plan Mode → Agent Mode)

| Setting | Recommendation |
|---------|----------------|
| **Chat Mode** | **Plan** mode (Step 1: requirement breakdown) → **Agent** mode (Step 3: prompt file creation) |
| **Model** | **Claude Sonnet 4** — excels at structured reasoning; produces well-organized stories with consistent Given/When/Then format |
| **Fallback Model** | GPT-4.1 — good alternative with faster response times |

---

## Objective

Demonstrate how Copilot can take a raw business requirement and systematically generate user stories with acceptance criteria, test scenarios, and a traceability matrix — all within the IDE.

---

## Pre-Requisites

- VS Code with GitHub Copilot Chat
- A blank or existing project workspace
- Optionally: a `.github/prompts/` folder for reusable prompt files

---

## Step 1 — Raw Requirement → User Stories (2 min)

**Goal:** Transform a business requirement into structured user stories.

1. Switch to **Plan mode** in Copilot Chat
2. Paste a realistic business requirement:
   ```
   Business Requirement: Our e-commerce platform needs a discount code 
   system. Customers should be able to enter discount codes at checkout. 
   Codes can be percentage-based or fixed-amount. Codes have expiry dates 
   and usage limits. Admin users need to create, edit, and deactivate codes.
   ```
3. Ask Copilot to break this down:
   ```
   Break this business requirement into user stories using the format:
   - As a [role], I want [capability], so that [benefit]
   - Include acceptance criteria in Given/When/Then format
   - Include edge cases and error scenarios
   - Prioritize as Must Have, Should Have, or Nice to Have
   ```
4. **Show the output** — typically 5–8 user stories with:
   - Customer-facing stories (apply code, see discount, error messages)
   - Admin stories (CRUD operations on codes)
   - System stories (expiry enforcement, usage tracking)

**Talking Point:** _"In 30 seconds, Copilot produced what would typically take a BA 30 minutes — and it caught edge cases like concurrent usage limits."_

---

## Step 2 — Generate Test Scenarios (1.5 min)

**Goal:** Auto-generate test scenarios from acceptance criteria.

1. Reference the stories just generated:
   ```
   From the user stories above, generate test scenarios for each 
   acceptance criterion. Include:
   - Happy path tests
   - Boundary value tests (codes at exactly limit, expired at midnight)
   - Error handling tests (invalid code, expired code, exceeded usage)
   - Security tests (SQL injection in code field, brute-force attempts)
   Format as a test plan table with: Test ID | Scenario | Steps | Expected Result
   ```
2. **Show the structured output** — Copilot generates a comprehensive test matrix
3. Point out how it identified edge cases you might have missed:
   - Timezone handling for expiry
   - Race condition on usage count
   - Case sensitivity of codes

**Talking Point:** _"Notice it found the race condition on concurrent code usage — that's a bug that would cost days to debug in production."_

---

## Step 3 — Reusable Prompt File (1.5 min)

**Goal:** Save this workflow as a reusable prompt file for the team.

1. Create `.github/prompts/requirement-to-stories.prompt.md`:
   ```markdown
   ---
   agent: plan
   description: Convert a business requirement into user stories
   ---
   
   Analyze the following business requirement and produce:
   
   1. **User Stories** — As a [role], I want [feature], so that [benefit]
      - Tag each as Must Have / Should Have / Nice to Have
   2. **Acceptance Criteria** — Given/When/Then for each story
   3. **Test Scenarios** — Happy path, boundary, error, security
   4. **Technical Notes** — Database changes, API endpoints, dependencies
   
   Business Requirement:
   {{input}}
   ```

2. Show how any team member can now type:
   ```
   /requirement-to-stories Our platform needs a loyalty points system...
   ```
   And get the same structured output

**Talking Point:** _"Prompt files turn tribal knowledge into team standards. Write once, everyone benefits."_

---

## Key Takeaways to Reinforce

- **Plan mode** is ideal for analysis and breakdown tasks
- Copilot catches **edge cases** humans often miss (timezone, concurrency, security)
- **Prompt files** standardize workflows across your team
- Always **review AI-generated stories** — they're a strong starting point, not a final product
