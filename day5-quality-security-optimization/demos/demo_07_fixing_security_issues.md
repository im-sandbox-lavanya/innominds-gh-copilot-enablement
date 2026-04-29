# Demo 07 — Fixing Security Vulnerabilities

> **Duration:** ~10 min | **Slide:** 18–20 | **Mode:** GitHub.com + VS Code Agent

| Setting | Recommendation |
|---------|----------------|
| **Chat Mode** | **Agent** mode (multi-file security fixes) |
| **Model** | **Claude Sonnet 4** — best for security-aware code generation |
| **Fallback Model** | GPT-4.1 — adequate for straightforward remediations |

---

## Objective

Demonstrate three remediation paths: Copilot Autofix (one-click from GHAS), `/fix` with security context, and Agent mode for complex multi-file fixes. Fix all the seeded vulnerabilities.

---

## Pre-Requisites

- GHAS alerts from Demo 06 visible on the repository
- VS Code with GitHub Copilot Chat (Agent mode)
- The sample-app project open with the seeded vulnerabilities

---

## Step 1 — Copilot Autofix from GHAS (~3 min)

**Goal:** Show the one-click Autofix experience for GHAS alerts.

1. On GitHub.com, navigate to the **Code scanning alerts**

2. Click the **SQL Injection** alert for `orderRoutes.ts`

3. Look for the **"Generate fix"** button (Copilot Autofix)

4. Click it — Copilot generates a fix PR:
   - Replaces raw string concatenation with parameterized query
   - Shows a diff preview before creating the PR

5. Review the generated diff:
   ```diff
   - const [results] = await sequelize.query(
   -   `SELECT * FROM orders WHERE notes LIKE '%${keyword}%'`
   - );
   + const [results] = await sequelize.query(
   +   `SELECT * FROM orders WHERE notes LIKE :keyword`,
   +   { replacements: { keyword: `%${keyword}%` } }
   + );
   ```

6. **Do NOT merge yet** — we'll fix everything with Agent in Step 3

> **👀 What to watch for:** Autofix generates a correct, minimal diff — it doesn't rewrite the entire file. The fix follows Sequelize's parameterized query pattern.

**Talking Point:** _"One click from GHAS alert to a fix PR. Autofix handles 90% of common vulnerability types."_

---

## Step 2 — /fix with Security Context (~2 min)

**Goal:** Show targeted security fix using /fix in VS Code.

1. Open `src/routes/searchRoutes.ts` in VS Code

2. Select the XSS vulnerability (the line that reflects `req.query.q` into HTML)

3. Use inline Chat (Ctrl+I / Cmd+I):
   ```
   /fix — this has an XSS vulnerability. Sanitize the user input before reflecting it into HTML.
   ```

4. Copilot suggests:
   - Adding an HTML escape function
   - Using the escaped value in the response

5. Accept the fix and show:
   ```typescript
   // Before
   const html = `<h1>Results for: ${q}</h1>`;
   
   // After  
   const escapeHtml = (str: string) => str
     .replace(/&/g, '&amp;').replace(/</g, '&lt;')
     .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
   const html = `<h1>Results for: ${escapeHtml(q as string)}</h1>`;
   ```

> **👀 What to watch for:** /fix with explicit security context ("XSS vulnerability") triggers Copilot's security-aware code generation — the fix follows OWASP patterns.

---

## Step 3 — Agent Mode: Fix All Vulnerabilities (~3 min)

**Goal:** Show Agent fixing multiple security issues across the codebase in one shot.

1. Switch to **Agent** mode in Chat

2. Prompt:
   ```
   Fix all security vulnerabilities in the sample-app:
   
   1. SQL injection in #file:src/routes/orderRoutes.ts — use parameterized queries
   2. XSS in #file:src/routes/searchRoutes.ts — escape HTML output
   3. Path traversal in #file:src/routes/fileRoutes.ts — validate and sanitize the filename
   4. Hardcoded secrets in #file:src/config/database.ts — replace with process.env variables
   
   For each fix:
   - Use the secure pattern (parameterized queries, HTML escape, path validation, env vars)
   - Make sure existing functionality is preserved
   - Run tests after fixing to verify nothing is broken
   ```

3. Watch Agent:
   - Fix each vulnerability one by one
   - For path traversal: add `path.resolve()` + check against base directory
   - For secrets: replace with `process.env.STRIPE_API_KEY || ''` with validation
   - Run tests after each fix

4. Review all the changes Agent made

> **👀 What to watch for:** Agent handles four different vulnerability types across four files — each with the appropriate remediation pattern. This would take a developer 30+ minutes manually.

---

## Step 4 — Verify Fixes (~2 min)

**Goal:** Confirm all vulnerabilities are addressed.

1. Run the test suite:
   ```bash
   npx jest --verbose
   ```

2. **Optional:** Push the fixes and trigger a new CodeQL scan
   ```bash
   git add -A
   git commit -m "fix: remediate all GHAS security alerts"
   git push
   ```

3. After the CodeQL workflow runs, check the Security tab — alerts should be resolved

**Talking Point:** _"The full cycle: GHAS detects → Copilot fixes → tests verify → GHAS confirms. This is shift-left security in practice."_

---

## Key Takeaways

| What | Why It Matters |
|------|---------------|
| Copilot Autofix | One-click fix PR from any GHAS alert |
| /fix with security context | Targeted fix with OWASP-aware patterns |
| Agent for bulk remediation | Fix all vulnerabilities in one conversation |
| Pattern-correct fixes | Parameterized queries, HTML escaping, path validation |
| Verify loop | Fix → test → push → re-scan confirms resolution |
