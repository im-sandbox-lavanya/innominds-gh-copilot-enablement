# Demo 04 — Advanced Prompting & Multi-File Edits

> **Duration:** ~10 min | **Slide:** 22 | **Mode:** VS Code Agent Mode
> **Demo App:** `day3-context-and-prompting/demo-app` (2-file Task Tracker)

---

## Objective

Demonstrate test-driven prompting, design-pattern generation, and agent mode executing multi-file edits — all using the simple 2-file task tracker.

---

## Pre-Requisites

- VS Code with GitHub Copilot Chat — switch to **Agent mode**
- Open `task-types.ts` and `task-service.ts` in tabs

---

## Step 1 — Test-Driven Prompting

**Goal:** Write tests first, then let Copilot implement the code to pass them.

1. Create a new file `demo-app/task-service.test.ts` and type these tests manually:
   ```typescript
   import { describe, it, expect } from "vitest";
   import { createTask, getTaskById, deleteTask, listTasks } from "./task-service";

   describe("createTask", () => {
     it("should create a task with default status 'todo'", () => {
       const task = createTask({
         title: "Fix bug",
         description: "Fix the login bug",
         priority: "high",
         assignee: "alice",
         dueDate: "2026-05-01",
       });
       expect(task.status).toBe("todo");
       expect(task.title).toBe("Fix bug");
       expect(task.id).toBeDefined();
     });

     it("should default tags to empty array when not provided", () => {
       const task = createTask({
         title: "Test task",
         description: "Desc",
         priority: "low",
         assignee: "bob",
         dueDate: "2026-06-01",
       });
       expect(task.tags).toEqual([]);
     });
   });

   describe("deleteTask", () => {
     it("should return true when task exists", () => {
       const task = createTask({
         title: "To delete",
         description: "Will be deleted",
         priority: "low",
         assignee: "carol",
         dueDate: "2026-07-01",
       });
       expect(deleteTask(task.id)).toBe(true);
     });

     it("should return false when task does not exist", () => {
       expect(deleteTask("nonexistent-id")).toBe(false);
     });
   });
   ```

2. In Agent mode, prompt:
   ```
   #file:demo-app/task-service.test.ts
   These tests define the expected behavior. Verify that task-service.ts
   passes all these tests. If any fail, fix the service. Run the tests.
   ```
3. Watch the agent read both files, run tests, and confirm (or fix) the implementation

**Talking Point:** _"Tests are the ultimate spec. Write them first, let Copilot fill in the blanks."_

---

## Step 2 — Design Pattern Generation

**Goal:** Ask for a specific design pattern applied to the task tracker domain.

1. In Agent mode, prompt:
   ```
   #file:demo-app/task-types.ts
   Create an Observer pattern for task lifecycle events in a new file
   demo-app/task-events.ts:

   - TaskEventEmitter class with on(), off(), emit()
   - Type-safe events: "created", "updated", "deleted", "statusChanged"
   - Event payloads use the Task type from task-types.ts
   - "statusChanged" event includes oldStatus and newStatus
   - Keep it simple — no external dependencies
   ```
2. Review the generated `task-events.ts` — should use TypeScript generics and your exact `Task` and `Status` types

**Talking Point:** _"Copilot can generate well-known patterns tailored to YOUR domain types."_

---

## Step 3 — Multi-File Refactor with Agent

**Goal:** Show Agent mode making coordinated changes across files.

1. In Agent mode, prompt:
   ```
   #file:demo-app/task-types.ts #file:demo-app/task-service.ts
   Refactor the task tracker to add a "subtasks" feature:
   1. Add a parentId field (optional string) to the Task interface
   2. Add a getSubtasks(parentId: string) function to task-service.ts
   3. Update createTask to accept an optional parentId in CreateTaskInput
   4. Add a function getTaskTree(id: string) that returns a task with
      its nested subtasks

   Make changes across both files. Keep it minimal.
   ```
2. Watch the agent edit both `task-types.ts` and `task-service.ts` in a coordinated way
3. Review the diff — accept/reject changes

**Talking Point:** _"One prompt, multiple files changed in sync. The agent handles the coordination."_

---

## Key Takeaways

| Technique | Prompt Style | Best For |
|---|---|---|
| Test-driven | Write tests → ask Copilot to implement | Ensuring correctness from the start |
| Pattern generation | Name the pattern + your domain types | Applying well-known patterns |
| Agent multi-file | Describe the feature holistically | Cross-file refactors and features |
