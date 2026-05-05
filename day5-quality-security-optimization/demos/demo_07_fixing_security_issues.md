# Demo 07 — Fixing Security Vulnerabilities: IDE + GHAS Autofix

> **Duration:** ~12 min | **Slide:** 18–20 | **Mode:** VS Code → GitHub.com

| Setting | Recommendation |
|---------|----------------|
| **Chat Mode** | **Agent** mode (IDE fixes) → GitHub.com (Autofix) |
| **Model** | **Claude Sonnet 4** — best for security-aware code generation |
| **Fallback Model** | GPT-4.1 — adequate for straightforward remediations |

---

## Objective

Show **two remediation paths** for the vulnerabilities found in Demo 06:

1. **IDE-first** — `/fix` inline for single-file fixes, then Agent mode for bulk multi-file remediation
2. **GHAS Copilot Autofix** — one-click fix PR generated directly from a GitHub code scanning alert

**Repo:** [https://github.com/im-sandbox-lavanya/travel-planner](https://github.com/im-sandbox-lavanya/travel-planner)

---

## Pre-Requisites

- travel-planner open in VS Code with the seeded vulnerabilities
- GHAS code scanning alerts from Demo 06 visible on the repository

---

## PART A — Fixing Vulnerabilities in the IDE (~7 min)

**Goal:** Show developers how to fix security issues without leaving VS Code — using `/fix` for targeted fixes and Agent for bulk remediation.

### Step 1 — /fix with Security Context (~2 min)

**Goal:** Targeted single-file fix for the XSS vulnerability.

1. Open `app/templates/detail.html` in VS Code

2. Select the line with the XSS vulnerability: `{{ plan.notes | safe }}`

3. Use inline Chat (**Ctrl+I** / **Cmd+I**):
   ```
   /fix — this has an XSS vulnerability. The | safe filter bypasses Jinja2's 
   auto-escaping and renders user input as raw HTML.
   ```

4. Copilot suggests removing the `| safe` filter to restore auto-escaping:
   ```html
   <!-- Before — XSS vulnerability -->
   <td>{{ plan.notes | safe }}</td>
   
   <!-- After — Jinja2 auto-escaping restored -->
   <td>{{ plan.notes }}</td>
   ```

5. Accept the fix

> **👀 What to watch for:** Providing the vulnerability type in the prompt ("XSS", "| safe filter") steers Copilot toward a security-aware fix rather than a generic code suggestion.

**Talking Point:** _"Inline /fix is the fastest path for surgical, single-location fixes. It stays in your editor flow."_

---

### Step 2 — Agent Mode: Fix All Vulnerabilities (~5 min)

**Goal:** Fix all remaining vulnerabilities across multiple files in one Agent conversation.

1. Switch to **Agent** mode in Chat

2. Prompt:
   ```
   Fix all security vulnerabilities in the travel-planner app:
   
   1. SQL injection in #file:app/storage.py — replace the f-string query with a 
      parameterized query using ? placeholders (Python DB-API 2.0 pattern)
   2. Path traversal in #file:app/main.py — validate the filename against a safe 
      base directory using Path.resolve() before opening any file
   3. Hardcoded secrets in #file:app/main.py — replace hardcoded API keys with 
      os.environ.get() calls and add startup validation
   
   For each fix:
   - Use the correct secure Python pattern
   - Preserve existing functionality
   - Run pytest -v after all fixes to confirm nothing is broken
   ```

3. Watch Agent work through each fix:
   - **SQL injection** → parameterized query with `?` placeholders:
     ```python
     # Before
     cursor.execute(f"SELECT * FROM plans WHERE destination LIKE '%{keyword}%'")
     
     # After
     cursor.execute(
         "SELECT * FROM plans WHERE destination LIKE ?",
         (f"%{keyword}%",)
     )
     ```
   - **Path traversal** → `Path.resolve()` + base-dir assertion:
     ```python
     # After
     safe_base = Path("data").resolve()
     requested = (safe_base / filename).resolve()
     if not str(requested).startswith(str(safe_base)):
         raise HTTPException(status_code=400, detail="Invalid file path")
     ```
   - **Hardcoded secrets** → environment variable with validation:
     ```python
     # After
     WEATHER_API_KEY = os.environ.get("WEATHER_API_KEY", "")
     if not WEATHER_API_KEY:
         raise RuntimeError("WEATHER_API_KEY environment variable is not set")
     ```
   - Runs `pytest -v` to confirm all tests pass

4. Review the diff — four vulnerability types across three files, all correctly remediated

> **👀 What to watch for:** Agent uses the right secure pattern for each vulnerability type — it doesn't apply a generic fix, it knows DB-API parameterization, Path.resolve() semantics, and env var best practices.

**Talking Point:** _"This would take a developer 30+ minutes manually. Agent did it in one conversation, with correct security patterns each time."_

---

## PART B — GHAS Copilot Autofix (~5 min)

**Goal:** Show the one-click Autofix experience generated directly from a GitHub code scanning alert — the GHAS path.

### Step 3 — Copilot Autofix from a GHAS Alert (~3 min)

1. On GitHub.com, navigate to the **Code scanning alerts** for travel-planner

2. Click the **SQL Injection** alert for `app/storage.py`

3. Look for the **"Generate fix"** button (Copilot Autofix)

4. Click it — Copilot generates a fix PR automatically:
   - Replaces the f-string SQL concatenation with a parameterized query
   - Shows a diff preview before creating the PR

5. Review the generated diff:
   ```diff
   - cursor.execute(
   -     f"SELECT * FROM plans WHERE destination LIKE '%{keyword}%'"
   - )
   + cursor.execute(
   +     "SELECT * FROM plans WHERE destination LIKE ?",
   +     (f"%{keyword}%",)
   + )
   ```

6. Discuss the PR — it includes an explanation of the vulnerability and the fix rationale

> **👀 What to watch for:** The diff is minimal and correct. Autofix doesn't rewrite the file — it applies the smallest possible secure change.

**Talking Point:** _"This is the org-scale path. A security engineer triaging 50 alerts can click 'Generate fix' on every one and get PRs in minutes — not days."_

### Step 4 — Verify All Fixes (~2 min)

1. Run the full test suite locally:
   ```bash
   pytest -v
   ```

2. Push the IDE fixes and trigger a new CodeQL scan:
   ```bash
   git add -A
   git commit -m "fix: remediate all security vulnerabilities"
   git push
   ```

3. After the CodeQL workflow completes, check the Security tab — all alerts should be resolved

**Talking Point:** _"The full shift-left loop: Copilot finds in IDE → developer fixes in IDE → GHAS confirms on push. Security integrated at every stage."_

---

## Key Takeaways

| Approach | Best For | Copilot Feature |
|----------|----------|-----------------|
| `/fix` inline | Surgical single-file fix, developer in flow | Inline Chat |
| Agent mode | Bulk multi-file remediation in one conversation | Agent Mode |
| Copilot Autofix | One-click PR from any GHAS alert, org scale | GHAS Autofix |
| Verify loop | Fix → test → push → re-scan confirms resolution | `pytest`, CodeQL |
