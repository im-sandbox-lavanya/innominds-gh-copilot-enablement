# Demo 02 — Requirements → User Stories

> **Duration:** ~5 min | **Slide:** 8 | **Mode:** VS Code + Copilot Chat (Plan Mode)

| Setting | Recommendation |
|---------|----------------|
| **Chat Mode** | **Plan** mode throughout — this is an analysis task, not code generation |
| **Model** | **Claude Sonnet 4** — excels at structured reasoning; produces well-organized stories with consistent Given/When/Then format |
| **Fallback Model** | GPT-4.1 — good alternative with faster response times |

---

## Objective

Demonstrate how Copilot can take a raw business requirement and generate structured user stories with acceptance criteria — then chain that output into test scenarios.

---

## Pre-Requisites

- VS Code with GitHub Copilot Chat
- The sample-app project open (`day4-build-design-modernization/sample-app/`)

---

## Step 1 — Requirement → User Stories (2.5 min)

**Goal:** Transform a business requirement into structured user stories in a single prompt.

1. Switch to **Plan mode** in Copilot Chat
2. Paste this combined prompt:
   ```
   Break this business requirement into user stories:

   "Our e-commerce platform needs a discount code system. Customers can 
   enter codes at checkout. Codes can be percentage-based or fixed-amount. 
   Codes have expiry dates and usage limits. Admins can create, edit, 
   and deactivate codes."

   For each story use: As a [role], I want [capability], so that [benefit]
   Include acceptance criteria in Given/When/Then format.
   ```
3. **Show the output** — typically 5–8 user stories covering:
   - Customer-facing stories (apply code, see discount, error messages)
   - Admin stories (create/edit/deactivate codes)
   - System stories (expiry enforcement, usage tracking)

> **👀 What to watch for:** Notice how Copilot inferred edge cases you didn't mention — like what happens when a code is used beyond its limit, or an expired code is entered. It extracts more stories from a requirement than most people would on a first pass.

**Talking Point:** _"One prompt, 30 seconds — Copilot produced what typically takes a BA 30 minutes, and it caught edge cases like usage limits and expiry."_

---

## Step 2 — Chain into Test Scenarios (2.5 min)

**Goal:** Use prompt chaining — feed the stories from Step 1 into a test scenario prompt.

1. In the same chat thread, type:
   ```
   From the user stories above, generate test scenarios for each story.
   Cover happy paths, edge cases, and error conditions.
   Use Given/When/Then format.
   ```
2. **Show the output** — Copilot generates test scenarios that trace back to each story
3. Point out interesting edge cases Copilot identified (these vary per run but often include timezone handling for expiry, case sensitivity of codes, or concurrent usage)

> **👀 What to watch for:** This is **prompt chaining in action** — Step 2 builds directly on Step 1's output. You didn't re-explain the requirement; Copilot carried the context forward. This is how we'll work through the rest of today's topics.

**Talking Point:** _"Each prompt builds on the last. Requirements → stories → test scenarios — three artifacts from two simple prompts."_

---

## Key Takeaways

- **Plan mode** is ideal for analysis and breakdown tasks — no code changes needed
- Copilot catches **edge cases** humans often miss on the first pass
- **Prompt chaining** means each step's output feeds the next — keep it in the same chat thread
- Always **review AI-generated stories** — they're a strong starting point, not a final product
