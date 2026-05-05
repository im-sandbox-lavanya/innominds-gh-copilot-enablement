# Demo 06 — Security Scanning: IDE + GHAS

> **Duration:** ~12 min | **Slide:** 14–17 | **Mode:** VS Code → GitHub.com

| Setting | Recommendation |
|---------|----------------|
| **Chat Mode** | **Ask** mode (IDE audit) → GitHub.com (GHAS dashboard) |
| **Model** | **Claude Sonnet 4** — best for security reasoning |
| **Fallback Model** | GPT-4.1 — adequate for alert queries |

---

## Objective

Show **two complementary security scanning paths**:

1. **IDE-first** — use Copilot Chat in VS Code to audit the codebase for vulnerabilities right now, without any CI setup
2. **GHAS** — show how CodeQL, secret scanning, and Dependabot provide continuous, automated detection at the repo/org level

**Repo:** [https://github.com/im-sandbox-lavanya/travel-planner](https://github.com/im-sandbox-lavanya/travel-planner)

---

## Pre-Requisites

- travel-planner cloned locally with the seeded vulnerabilities:
  - SQL injection in `app/storage.py` — raw SQLite query with f-string interpolation
  - XSS in `app/templates/detail.html` — `| safe` filter bypassing Jinja2 auto-escaping
  - Path traversal in `app/main.py` — unsanitized filename in an export endpoint
  - Hardcoded secrets in `app/main.py` — API key hardcoded in source
- CodeQL workflow (`.github/workflows/codeql.yml`) committed and run at least once
- Dependabot config (`.github/dependabot.yml`) committed

---

## PART A — Vulnerability Scanning in the IDE (~5 min)

**Goal:** Show how developers can find vulnerabilities _right now_ using Copilot Chat — no CI pipeline, no GHAS setup required.

### Step 1 — Full Codebase Security Audit (~3 min)

1. Open the travel-planner project in VS Code

2. In **Ask** mode, run a broad audit:
   ```
   @workspace Perform a security audit of this Python/FastAPI application.
   Identify any OWASP Top 10 vulnerabilities — SQL injection, XSS, path traversal, 
   hardcoded secrets, insecure direct object references, or injection flaws.
   List each finding with: file, line, vulnerability type, severity, and a brief explanation.
   ```

3. Copilot responds with a prioritized list:
   - 🔴 **Critical** — SQL injection in `app/storage.py` (f-string in `cursor.execute`)
   - 🔴 **High** — Hardcoded API key in `app/main.py`
   - 🟡 **High** — XSS in `app/templates/detail.html` (`| safe` filter)
   - 🟡 **Medium** — Path traversal in `app/main.py` (unsanitized filename)

4. **Key point:** _"This is instant. No workflow files, no waiting for CI. Every developer can run a security audit before pushing."_

> **👀 What to watch for:** Copilot cross-references across files — it spots that user input in `main.py` flows through `storage.py` without sanitization.

### Step 2 — Targeted Deep-Dive (~2 min)

1. Ask about the most critical finding:
   ```
   Look at #file:app/storage.py — is the search function vulnerable to SQL injection?
   Show me exactly how an attacker could exploit it and what data they could access.
   ```

2. Copilot explains the exploit path and impact in plain language

3. Ask for a dependency check:
   ```
   @workspace Are any of the dependencies in requirements.txt known to have CVEs?
   Which versions should be updated?
   ```

**Talking Point:** _"The developer never left VS Code. They found all four vulnerability types before the code was even pushed."_

---

## PART B — GHAS: Continuous Automated Scanning (~7 min)

**Goal:** Show how GHAS provides the same findings automatically on every push, at org scale — the industrialized version of what Copilot just did.

### Step 3 — Security Overview Dashboard (~2 min)

1. Navigate to [https://github.com/im-sandbox-lavanya/travel-planner](https://github.com/im-sandbox-lavanya/travel-planner)

2. Click the **Security** tab

3. Walk through the overview:
   - **Code scanning alerts** — vulnerabilities found by CodeQL
   - **Secret scanning alerts** — hardcoded credentials detected
   - **Dependabot alerts** — vulnerable dependencies

4. Show the severity breakdown:
   - 🔴 Critical / High — SQL injection, hardcoded secrets
   - 🟡 Medium — path traversal
   - ⚪ Low / Informational

5. **Key point:** _"This is your single pane of glass for security posture across every repo in the org. Every push, every PR is automatically scanned."_

> **👀 What to watch for:** The same vulnerabilities Copilot found in the IDE now appear here — detected automatically with zero developer effort.

### Step 4 — CodeQL Code Scanning Alerts (~3 min)

1. Click into **Code scanning alerts**

2. Walk through each alert:

   **a) SQL Injection (Critical)**
   - Click the alert for `app/storage.py`
   - Show the **data flow visualization** — user input (`keyword`) → raw SQLite query string
   - Show CodeQL path: form parameter → f-string interpolation → `cursor.execute()`
   - Point out CWE reference (CWE-89)

   **b) Cross-Site Scripting (High)**
   - Click the alert for `app/templates/detail.html`
   - Show: `{{ plan.notes | safe }}` bypasses Jinja2 auto-escaping
   - CWE-79 reference

   **c) Path Traversal (Medium)**
   - Click the alert for `app/main.py`
   - Show: unsanitized path parameter → `open()` without base-directory validation

3. **Key point:** _"CodeQL doesn't just pattern-match — it traces data flows end to end. This is proof, not guesswork."_

### Step 5 — Secret Scanning & Dependabot (~2 min)

**Secret scanning:**
1. Click into **Secret scanning** alerts
2. Show the detected API key — file location, commit, type
3. Mention **push protection**: _"With push protection on, this commit would have been blocked before it entered the repo."_

**Dependabot:**
1. Click into **Dependabot alerts**
2. Explain the flow: CVE detected → Dependabot auto-creates a PR to a safe version → CI runs to validate
3. Show the `dependabot.yml` config (pip, weekly schedule)

---

## Key Takeaways

| Approach | Best For | Copilot Feature |
|----------|----------|-----------------|
| IDE audit (`@workspace`) | Developer self-service, pre-push | Chat Ask mode |
| CodeQL | Automated, every push, data-flow proof | GHAS Code Scanning |
| Secret scanning | Hardcoded credentials, 200+ patterns | GHAS + Push protection |
| Dependabot | Vulnerable dependencies, auto-PRs | GHAS Dependabot |
| Copilot triage | Risk explanation in plain language | Chat Ask mode |
