# Demo 05 — Agent Mode, @workspace & Copilot CLI

> **Duration:** ~10 min | **Slide:** 32 | **Mode:** VS Code Agent Mode + Terminal
> **Demo App:** `day3-context-and-prompting/demo-app` (2-file Task Tracker)

---

## Objective

Show agentic workflows, @workspace codebase-wide queries, and Copilot CLI — all using the simple task tracker so the audience can follow every step.

---

## Pre-Requisites

- VS Code with GitHub Copilot Chat (Agent mode)
- Open the `demo-app` folder
- Terminal / PowerShell ready
- Copilot CLI installed (`copilot version` to verify) — see [Installing GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/set-up/install-copilot-cli)

---

## Part A — Agent Mode

### Step 1 — Feature Implementation from a Goal

1. Switch to **Agent mode** in Copilot Chat
2. Give a high-level goal:
   ```
   Add a task notification feature to the demo-app:
   - Create a new file demo-app/task-notifications.ts
   - A function scheduleReminder(taskId, reminderDate) that stores a reminder
   - A function getDueReminders() that returns reminders where reminderDate <= now
   - A function dismissReminder(taskId) to remove a reminder
   - Use the Task type from task-types.ts
   - Keep it simple — in-memory storage, no external dependencies
   ```
3. Watch the agent execute:
   - Read existing files to understand types and patterns
   - Create `task-notifications.ts`
   - May reference `getTaskById` from `task-service.ts`
4. Review the output — should follow the same coding style as `task-service.ts`

**Talking Point:** _"You gave a goal, not step-by-step instructions. The agent figured out the how."_

---

### Step 2 — Ask vs Agent Mode Comparison

**Goal:** Show the difference between Ask mode and Agent mode on the same prompt.

1. **Ask mode** — ask:
   ```
   How would I add recurring tasks to this task tracker?
   ```
   → Get an **explanation**: add recurrence fields, create a scheduler, etc.

2. **Agent mode** — same question:
   ```
   Add recurring tasks to this task tracker. A task can have a recurrence
   rule (daily, weekly, monthly). Add a function generateNextOccurrence
   that creates a new task based on the recurrence. Keep it simple.
   ```
   → Agent **actually implements it**: modifies `task-types.ts` to add recurrence fields, adds functions to `task-service.ts` or creates a new file

**Talking Point:** _"Ask to learn, Agent to execute. Escalate when you're ready to commit."_

---

## Part B — @workspace Queries

### Step 3 — Codebase-Wide Questions

1. In Copilot Chat (any mode), type:
   ```
   @workspace What types and functions are available in this task tracker?
   List them all.
   ```
2. Show how Copilot finds and lists:
   - All types from `task-types.ts` (`Task`, `Priority`, `Status`, `CreateTaskInput`, etc.)
   - All functions from `task-service.ts` (`createTask`, `getTaskById`, `listTasks`, etc.)

3. Ask a refactoring impact question:
   ```
   @workspace If I rename the 'assignee' field to 'owner', what needs to change?
   ```
4. Show the impact analysis — Copilot identifies every reference across both files

---

### Step 4 — Architecture Question

1. Ask:
   ```
   @workspace How is data stored and queried in this app?
   What are the limitations of the current approach?
   ```
2. Copilot should identify the in-memory array pattern and list limitations (no persistence, no indexing, linear search, lost on restart, etc.)

**Talking Point:** _"@workspace turns Copilot into a codebase expert — even for unfamiliar projects."_

---

## Part C — Copilot CLI (Standalone `copilot` Binary)

> **Note:** The old `gh copilot suggest` / `gh copilot explain` extension is **retired**. The new standalone `copilot` binary replaces it entirely.

### Step 5 — Interactive Session

1. Open terminal and launch an interactive session:
   ```bash
   copilot
   ```
   → The CLI opens with a welcome banner. It's a full agentic session in your terminal.

2. Ask a codebase question (no file changes):
   ```
   What types and functions are exported from the demo-app folder?
   ```
   → Copilot reads files, lists all exports — works like Ask mode in VS Code.

3. Press **Shift+Tab** to cycle modes. Show the mode indicator toggling:
   - **Ask/Execute** (default) → **Plan** → **Autopilot** → back to Ask/Execute
   
4. In **Plan mode**, give a task:
   ```
   Add input validation to the createTask function in task-service.ts
   ```
   → Copilot builds a structured plan first, then asks for confirmation before coding.

**Talking Point:** _"Shift+Tab toggles modes — just like switching between Ask, Plan, and Agent in VS Code, but right in your terminal."_

---

### Step 6 — Programmatic Mode (One-Shot)

1. Exit the interactive session (`Ctrl+C` twice or `/exit`), then run a one-shot command:
   ```bash
   copilot -p "List all exported functions in demo-app/task-service.ts" --allow-tool='read'
   ```
   → Executes the prompt, prints the result, and exits. Great for scripting.

2. Show a practical file-editing example with tool permissions:
   ```bash
   copilot -p "Add JSDoc comments to all functions in demo-app/task-service.ts" \
     --allow-tool='read' --allow-tool='write'
   ```
   → Copilot reads the file, adds comments, and writes back — all non-interactive.

3. Show a git-aware example:
   ```bash
   copilot -p "Show this week's commits and summarize them" --allow-tool='shell(git)'
   ```

**Talking Point:** _"Programmatic mode with `-p` is perfect for CI scripts, git hooks, and automation. Control exactly which tools Copilot can use."_

---

### Step 7 — Slash Commands & Built-in Features

1. Start a new interactive session:
   ```bash
   copilot
   ```

2. Show useful slash commands:
   ```
   /model
   ```
   → Lists available models (Claude Sonnet 4.5, GPT-5.5, etc.) — pick one.

   ```
   /context
   ```
   → Shows token usage breakdown — how much context window is consumed.

   ```
   /diff
   ```
   → Reviews all changes made in the current directory during this session.

   ```
   /undo
   ```
   → Reverts the last change. Safe experimentation!

3. Show the `/init` command (if no `copilot-instructions.md` exists):
   ```
   /init
   ```
   → Copilot analyzes the codebase and generates a `.github/copilot-instructions.md` with project-specific guidance.

**Talking Point:** _"The CLI has 40+ slash commands — `/init` bootstraps custom instructions, `/diff` reviews changes, `/undo` rolls back safely, `/context` monitors token usage._"

---

## Key Takeaways

| Feature | What It Does | When to Use |
|---|---|---|
| Agent mode | Autonomous multi-step execution | Building features, refactoring |
| @workspace | Semantic search across all files | Understanding unfamiliar code |
| Copilot CLI (interactive) | Full agentic sessions in terminal | Headless environments, SSH, quick tasks |
| Copilot CLI (`-p`) | One-shot programmatic execution | CI/CD scripts, git hooks, automation |
| Copilot CLI slash commands | `/init`, `/diff`, `/undo`, `/model`, `/delegate` | Session control, project setup, PR creation |
