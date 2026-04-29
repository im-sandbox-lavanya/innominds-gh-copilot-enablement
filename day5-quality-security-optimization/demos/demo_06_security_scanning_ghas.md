# Demo 06 — Security Scanning with GHAS

> **Duration:** ~10 min | **Slide:** 14–17 | **Mode:** GitHub.com + VS Code

| Setting | Recommendation |
|---------|----------------|
| **Chat Mode** | **Ask** mode (alert analysis) |
| **Model** | **Claude Sonnet 4** — best for security reasoning |
| **Fallback Model** | GPT-4.1 — adequate for alert queries |

---

## Objective

Demonstrate GitHub Advanced Security (GHAS) in action — show CodeQL code scanning, secret scanning, and Dependabot alerts on the sample-app repository. Walk through the Security Overview dashboard and triage workflow.

---

## Pre-Requisites

- A GitHub repository with GHAS enabled (requires GitHub Enterprise or public repo)
- The sample-app pushed with the seeded vulnerabilities:
  - SQL injection in `orderRoutes.ts`
  - XSS in `searchRoutes.ts`
  - Path traversal in `fileRoutes.ts`
  - Hardcoded secrets in `database.ts`
- CodeQL workflow (`.github/workflows/codeql.yml`) committed and run at least once
- Dependabot config (`.github/dependabot.yml`) committed

---

## Step 1 — Security Overview Dashboard (~2 min)

**Goal:** Show the org/repo-level Security tab and its capabilities.

1. Navigate to the repository on GitHub.com

2. Click the **Security** tab

3. Walk through the overview:
   - **Code scanning alerts** — vulnerabilities found by CodeQL
   - **Secret scanning alerts** — hardcoded credentials detected
   - **Dependabot alerts** — vulnerable dependencies

4. Show the severity breakdown:
   - 🔴 Critical / High — SQL injection, hardcoded secrets
   - 🟡 Medium — path traversal
   - ⚪ Low / Informational

5. **Key point:** _"This is your single pane of glass for security posture. Every push, every PR is automatically scanned."_

> **👀 What to watch for:** The alerts were created automatically — no manual configuration beyond the workflow file.

---

## Step 2 — CodeQL Code Scanning Alerts (~3 min)

**Goal:** Deep-dive into CodeQL findings for the seeded vulnerabilities.

1. Click into **Code scanning alerts**

2. Walk through each alert:

   **a) SQL Injection (Critical)**
   - Click the alert for `orderRoutes.ts`
   - Show the data flow visualization — user input (`req.query.keyword`) → raw SQL query
   - Show CodeQL path: request parameter → string concatenation → `sequelize.query()`
   - Point out the severity rating and CWE reference (CWE-89)

   **b) Cross-Site Scripting (High)**
   - Click the alert for `searchRoutes.ts`
   - Show data flow: `req.query.q` → HTML response without encoding
   - CWE-79 reference

   **c) Path Traversal (Medium)**
   - Click the alert for `fileRoutes.ts`
   - Show: `req.params.filename` → `path.join()` → `fs.readFile()` without validation

3. **Key point:** _"CodeQL doesn't just pattern-match — it traces data flows. It proves the vulnerability is reachable."_

> **👀 What to watch for:** The data flow visualization is powerful — it shows exactly how user input reaches the dangerous operation. This is proof, not guesswork.

---

## Step 3 — Secret Scanning Alerts (~2 min)

**Goal:** Show hardcoded secrets detected in the codebase.

1. Click into **Secret scanning** alerts

2. Show the detected secrets:
   - `STRIPE_API_KEY` — Stripe live key detected in `database.ts`
   - `INTERNAL_API_SECRET` — GitHub PAT pattern detected

3. Walk through the alert details:
   - Secret type and provider
   - File location and commit
   - Remediation steps: rotate the credential, remove from code, use environment variables

4. **Mention push protection:**
   ```
   "With push protection enabled, this secret would have been BLOCKED 
   before it entered the repo. Push protection prevents the commit."
   ```

> **👀 What to watch for:** Secret scanning identifies the _type_ of secret (Stripe key, GitHub token) — it knows the vendor patterns.

---

## Step 4 — Dependabot Alerts (~1 min)

**Goal:** Show vulnerable dependency detection.

1. Click into **Dependabot alerts**

2. Show any flagged dependencies (if available)

3. Explain the workflow:
   - Dependabot detects CVE in a dependency
   - Automatically creates a PR to update to a safe version
   - CI runs on the PR to validate compatibility

4. Show the `dependabot.yml` config:
   - Weekly npm updates
   - Scoped to the sample-app directory

---

## Step 5 — Triage in VS Code with Copilot (~2 min)

**Goal:** Show using Copilot Chat to assess alert severity.

1. Open VS Code with the sample-app

2. In **Ask** mode, prompt:
   ```
   I have a CodeQL alert for SQL injection in #file:src/routes/orderRoutes.ts on line 28.
   The raw query concatenates req.query.keyword into a SQL string.
   
   Is this exploitable? How severe is it? What's the recommended fix?
   ```

3. Copilot explains:
   - Yes, it's exploitable (user-controlled input reaches raw SQL)
   - Severity: Critical (data exfiltration, deletion possible)
   - Fix: Use parameterized queries (replacements)

**Talking Point:** _"Copilot is your security co-pilot — it explains the risk in plain language and provides the exact fix pattern."_

---

## Key Takeaways

| What | Why It Matters |
|------|---------------|
| Security Overview dashboard | Single view of all security alerts |
| CodeQL data flow analysis | Proves vulnerabilities are reachable |
| Secret scanning | Auto-detects 200+ secret types |
| Push protection | Blocks secrets before they enter the repo |
| Dependabot auto-PRs | Automated dependency updates |
| Copilot for triage | Natural language risk assessment |
