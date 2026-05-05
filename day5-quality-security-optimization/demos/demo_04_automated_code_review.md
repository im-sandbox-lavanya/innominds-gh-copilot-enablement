# Demo 04 — Automated Code Review with Copilot

> **Duration:** ~8 min | **Slide:** 10–11 | **Mode:** GitHub.com + VS Code

| Setting | Recommendation |
|---------|----------------|
| **Chat Mode** | **Ask** mode (review analysis) → **Agent** mode (applying fixes) |
| **Model** | **Claude Sonnet 4** — best for nuanced code review reasoning |
| **Fallback Model** | GPT-4.1 — adequate for PR context queries |

---

## Objective

Demonstrate Copilot Code Review as an automated PR reviewer — show how to request a review, interpret feedback, and apply suggested changes using Agent mode.

---

## Pre-Requisites

- A GitHub repository with the sample-app pushed (or a pre-prepared demo repo)
- GitHub Copilot enabled on the repository
- VS Code with GitHub Pull Requests extension (for in-editor PR experience)
- A branch with intentional issues (the security vulnerabilities from Phase 1 work well)

---

## Step 1 — Create a PR with Issues (~2 min)

**Goal:** Set the stage — create or show a PR that has reviewable problems.

1. If not already done, create a branch and commit the files from the sample-app:
   ```bash
   git checkout -b feature/order-search
   git add src/routes/orderRoutes.ts src/routes/searchRoutes.ts
   git commit -m "Add order search and product search endpoints"
   git push origin feature/order-search
   ```

2. Open a PR on GitHub.com — title: "Add search endpoints"

3. **Key point:** _"This PR contains SQL injection and XSS vulnerabilities — let's see if Copilot catches them."_

> **👀 What to watch for:** The PR contains real code with real vulnerabilities — this isn't a contrived example.

---

## Step 2 — Request Copilot Review (~2 min)

**Goal:** Show how to add Copilot as a reviewer on a PR.

1. On the PR page, click **Reviewers** in the sidebar

2. Select **Copilot** from the reviewer list (or click "Request review from Copilot")

3. Wait for the review to complete (~30–60 seconds)

4. Show the review results:
   - Copilot leaves inline comments on specific lines
   - Each comment explains the issue and suggests a fix
   - Comments include severity indicators

5. Walk through the findings:
   - **SQL injection** in `orderRoutes.ts` — raw string concatenation in query
   - **XSS** in `searchRoutes.ts` — reflected user input in HTML
   - Potential **error handling** gaps

> **👀 What to watch for:** Copilot doesn't just flag the issue — it explains _why_ it's dangerous and provides a concrete fix.

**Talking Point:** _"Copilot Code Review is like having a security-aware senior developer review every PR — instantly, consistently, and without scheduling conflicts."_

---

## Step 3 — Address Review Comments (~2 min)

**Goal:** Show how to act on Copilot's review comments.

1. Open VS Code with the PR checked out

2. Open Copilot Chat in **Agent** mode

3. Prompt:
   ```
   Address the Copilot review comments on the current PR.
   Fix the SQL injection in orderRoutes.ts and the XSS in searchRoutes.ts.
   Use parameterized queries for SQL and HTML escaping for XSS.
   ```

4. Watch Agent:
   - Read the review comments
   - Fix the SQL injection with parameterized queries
   - Fix the XSS with proper escaping
   - Commit the fixes

5. Push the fixes and show the PR update:
   ```bash
   git push
   ```

> **👀 What to watch for:** Agent reads the exact review comments and applies targeted fixes — it doesn't rewrite the entire file.

---

## Step 4 — Copilot Resolves Threads (~2 min)

**Goal:** Show the feedback loop — fixes resolve review comments.

1. Go back to the PR on GitHub.com

2. Request another Copilot review on the updated code

3. Show that the previous issues are resolved

4. **Bonus:** Ask `@github` in VS Code Chat:
   ```
   What's the status of the review on my current PR?
   ```

**Talking Point:** _"The workflow is: push code → Copilot reviews → fix with Agent → push again → clean review. All automated."_

---

## Key Takeaways

| What | Why It Matters |
|------|---------------|
| Copilot as PR reviewer | Instant, consistent reviews on every PR |
| Inline comments with fixes | Not just "this is wrong" — shows you how to fix it |
| Agent applies review fixes | Close the loop: review → fix → push in minutes |
| `@github` for PR context | Query PR status, comments, and checks from Chat |
| Security-aware reviews | Catches injection, XSS, hardcoded secrets, and more |
