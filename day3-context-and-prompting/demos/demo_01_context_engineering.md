# Demo 01 — Context Engineering (No Context vs Relevant Context)

> **Duration:** ~10 min | **Slide:** 10 | **Mode:** VS Code + Copilot Inline & Chat
> **Demo App:** `day3-context-and-prompting/demo-app` (2-file Task Tracker)

---

## Objective

Clearly demonstrate how Copilot's suggestion quality **changes dramatically** when you provide relevant context vs none. Uses a tiny 2-file app so the difference is unmissable.

---

## Pre-Requisites

- VS Code with GitHub Copilot & Copilot Chat
- Open **only** the `demo-app` folder (just 2 files: `task-types.ts` and `task-service.ts`)

---

## Part A — Inline Completions: No Context vs With Context

### Step 1 — No Context (Cold Start)

1. **Close ALL open tabs** — nothing should be open
2. Create a **new empty file** `demo-app/demo-scratch.ts` (this is a throwaway file)
3. Type the following and pause after the opening paren:
   ```typescript
   function getOverdueTasks(
   ```
4. **Observe** — Copilot's suggestion will be generic:
   - Likely suggests `tasks: any[]` or vague parameter names
   - May guess random field names like `deadline`, `completed`, `dueBy`
   - No knowledge of `Priority`, `Status`, `Task`, or your specific field names

5. Accept or dismiss. Now type:
   ```typescript
   function filterByPriority(
   ```
6. **Observe** — again generic: might suggest `items: any[], priority: string`
   - No awareness of your `Priority` type (`"low" | "medium" | "high" | "critical"`)
   - No awareness of `Task` interface fields

**Talking Point:** _"Copilot is guessing blindly. It has zero knowledge of our app."_

---

### Step 2 — With Relevant Context (Open the Types File)

1. **Open `task-types.ts`** in a tab (just click to open — don't even need to look at it)
2. Go back to `demo-scratch.ts` and **delete** what you typed
3. Type the **exact same thing**:
   ```typescript
   function getOverdueTasks(
   ```
4. **Observe the difference** — Copilot now suggests:
   - `tasks: Task[]` as the parameter type
   - References `task.dueDate` (the actual field name from `Task` interface)
   - Returns `Task[]`
   - Compares against `new Date()`

5. Delete and type the second function again:
   ```typescript
   function filterByPriority(
   ```
6. **Observe** — now suggests:
   - `tasks: Task[], priority: Priority` (uses your exact types)
   - Filters using `task.priority === priority`
   - Returns `Task[]`

**Talking Point:** _"Just by opening ONE file, Copilot went from guessing to knowing. That's context engineering."_

---

### Step 3 — Even More Context (Open Both Files)

1. **Also open `task-service.ts`** in a tab (now both files are open)
2. Go back to `demo-scratch.ts`, delete what you typed, and type:
   ```typescript
   function reassignTasks(
   ```
3. **Observe** — Copilot now suggests:
   - Uses `Task` type, `assignee` field name (from the interface)
   - May follow the same patterns as `task-service.ts` (e.g., `tasks.find()`, `task.updatedAt = new Date()`)
   - Knows about `Status`, `Priority`, all the field names

4. Type a new function:
   ```typescript
   function getTaskSummary(
   ```
5. **Observe** — suggestions reference `task.status`, `task.priority`, `task.tags`, etc.

**Talking Point:** _"Two open tabs. That's all it took. The more relevant context Copilot sees, the better the output."_

---

## Part B — Chat: Vague vs Precise Context

### Step 4 — Vague Chat Question (No File References)

1. **Close all tabs** again
2. Open Copilot Chat and type:
   ```
   Write a function to get task statistics
   ```
3. **Observe** — response is generic:
   - Invents its own task structure
   - May use `completed`, `pending` instead of your actual statuses
   - Doesn't know about `Priority`, `tags`, `assignee`

---

### Step 5 — Precise Chat with `#file` References

1. In Copilot Chat, type:
   ```
   #file:demo-app/task-types.ts #file:demo-app/task-service.ts
   Write a function to get task statistics — count by status and priority
   ```
2. **Observe the difference**:
   - Uses your exact `Status` and `Priority` types
   - References `task.status`, `task.priority` (correct field names)
   - Groups by `"todo" | "in-progress" | "done" | "cancelled"` (your actual values)
   - Groups by `"low" | "medium" | "high" | "critical"` (your actual values)
   - May even use the `listTasks()` function from your service

**Talking Point:** _"Same question, completely different output — all because we pointed Copilot to the right files."_

---

### Step 6 — `#selection` for Laser Precision

1. Open `task-service.ts`
2. **Select** just the `listTasks` function (lines with the filter logic)
3. Press `Ctrl+I` (inline chat) and type:
   ```
   Add sorting by dueDate and priority
   ```
4. **Observe** — Copilot's edit is scoped to exactly the selected function, uses `task.dueDate` and `task.priority` correctly

**Talking Point:** _"Select before you ask. It's the fastest way to get precise results."_

---

## Cleanup

- Delete `demo-scratch.ts` — it was just for the demo

---

## Key Takeaways (for audience)

| Context Level | What Copilot Knows | Suggestion Quality |
|---|---|---|
| No files open | Nothing about your code | Generic, guesses field names |
| Types file open | Your interfaces & types | Uses correct types and fields |
| Both files open | Types + existing patterns | Matches your coding style |
| `#file` in Chat | Exactly what you point to | Precise, project-aware |
| `#selection` | Just the highlighted code | Laser-focused edits |
