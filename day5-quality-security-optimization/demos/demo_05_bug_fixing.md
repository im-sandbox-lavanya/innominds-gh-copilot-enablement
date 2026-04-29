# Demo 05 — Bug Fixing with Copilot

> **Duration:** ~8 min | **Slide:** 12–13 | **Mode:** VS Code + Copilot Chat

| Setting | Recommendation |
|---------|----------------|
| **Chat Mode** | **Ask** mode (Step 1: error analysis) → **Agent** mode (Step 3: multi-file fix) |
| **Model** | **Claude Sonnet 4** — best root-cause analysis and fix generation |
| **Fallback Model** | GPT-4.1 — good for simpler single-file bugs |

---

## Objective

Demonstrate three bug-fixing approaches: `/fix` for quick inline fixes, Chat for error analysis and root cause, and Agent mode for complex multi-file bug resolution.

---

## Pre-Requisites

- VS Code with GitHub Copilot Chat
- The sample-app project open
- Jest tests from Demo 01 available (some may be failing — that's intentional)
- A terminal ready for running tests

---

## Step 1 — /fix for Quick Inline Repair (~2 min)

**Goal:** Show the fastest way to fix a small bug — select and `/fix`.

1. Open `src/services/orderService.ts`

2. Introduce a small bug (or use an existing one):
   - Change a comparison operator: `status === 'pending'` → `status = 'pending'` (assignment instead of comparison)

3. Select the broken line

4. Type `/fix` in the inline Chat (Cmd+I / Ctrl+I)

5. Copilot immediately spots the assignment vs comparison bug and suggests the fix

6. Accept the fix with one click

> **👀 What to watch for:** /fix is instant — no need to explain the problem. Copilot reads the context and infers what's wrong.

**Talking Point:** _"/fix is your first instinct for small bugs. Select the broken code, /fix, done. Under 5 seconds."_

---

## Step 2 — Chat for Error Analysis (~3 min)

**Goal:** Show pasting a stack trace into Chat for root cause identification.

1. Run the tests to get a real failure:
   ```bash
   npx jest orderService --verbose 2>&1
   ```

2. Copy a failing test's error output (stack trace + assertion error)

3. Paste into Copilot Chat (**Ask** mode):
   ```
   This test is failing. Analyze the error and identify the root cause:
   
   [paste the full error output]
   
   The test file is #file:tests/services/orderService.test.ts
   The service file is #file:src/services/orderService.ts
   ```

4. Copilot:
   - Parses the stack trace
   - Identifies the exact line causing the failure
   - Explains the root cause (e.g., mock not returning expected shape, missing field)
   - Suggests a fix with explanation

5. Apply the fix — re-run the test to confirm

> **👀 What to watch for:** Copilot doesn't just say "fix line 42" — it explains _why_ the error occurs and what needs to change. This teaches debugging, not just fixing.

---

## Step 3 — Agent Mode for Complex Multi-File Bugs (~3 min)

**Goal:** Show Agent autonomously diagnosing and fixing a bug across multiple files.

1. Switch to **Agent** mode

2. Prompt:
   ```
   When I run `npx jest --verbose`, several tests are failing.
   Please:
   1. Run the tests to see the current failures
   2. Diagnose the root cause of each failure
   3. Fix the code (not the tests) if the logic is wrong, or fix the tests if the expectations are wrong
   4. Re-run the tests to verify all pass
   ```

3. Watch Agent:
   - Run `npx jest --verbose` in the terminal
   - Read the error output
   - Open the relevant source and test files
   - Determine whether the bug is in the code or the test
   - Apply fixes across multiple files
   - Re-run tests to verify green

4. **If Agent needs iteration:** It will self-correct — running tests again after each fix attempt

> **👀 What to watch for:** Agent makes the judgment call: "Is the test wrong, or is the code wrong?" It looks at intent, not just syntax.

**Talking Point:** _"Agent mode is the power tool — it runs tests, reads errors, edits code, and re-runs tests in a loop until everything passes. You just describe the problem."_

---

## Key Takeaways

| What | Why It Matters |
|------|---------------|
| `/fix` for quick bugs | Under 5 seconds for inline fixes |
| Stack trace → Chat | Root cause analysis with full explanation |
| Agent runs test loops | Autonomous diagnose → fix → verify cycle |
| Code vs test judgment | Agent determines what's actually wrong |
| Multi-file fixes | Agent edits source, tests, and config as needed |
