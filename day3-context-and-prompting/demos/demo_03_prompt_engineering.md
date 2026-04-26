# Demo 03 — Prompt Engineering Techniques

> **Duration:** ~10 min | **Slide:** 18 | **Mode:** VS Code + Copilot Chat
> **Demo App:** `day3-context-and-prompting/demo-app` (2-file Task Tracker)

---

## Objective

Demonstrate four core prompting strategies side-by-side using simple task tracker examples — zero-shot, few-shot, role-based, and chain-of-thought.

---

## Pre-Requisites

- VS Code with GitHub Copilot Chat
- Open `task-types.ts` and `task-service.ts` in tabs

---

## Step 1 — Zero-Shot Prompting

**Goal:** Direct instruction with no examples.

1. In Copilot Chat:
   ```
   #file:demo-app/task-types.ts
   Write a function called getTasksByDateRange that accepts a Task array,
   a start date and end date, and returns tasks whose dueDate falls
   within that range. Use strict TypeScript types.
   ```
2. **Review** — output should be clean because the request is well-defined
3. **Key point:** Zero-shot works well when the task is unambiguous and you describe it completely

**Talking Point:** _"For clear tasks, just describe what you need — no examples required."_

---

## Step 2 — Few-Shot Prompting

**Goal:** Show how examples teach Copilot your desired pattern.

1. In Copilot Chat:
   ```
   #file:demo-app/task-types.ts
   Create a function called parseStatus that converts loose string input
   into a valid Status type. Follow this pattern:

   Input: "todo"       → Output: "todo"
   Input: "TODO"       → Output: "todo"
   Input: "In Progress" → Output: "in-progress"
   Input: "IN-PROGRESS" → Output: "in-progress"
   Input: "Done"       → Output: "done"
   Input: "finished"   → Output: throw Error("Invalid status: finished")
   Input: ""           → Output: throw Error("Status is required")
   ```
2. **Observe** — output precisely matches the pattern: case-insensitive, handles spaces, proper error messages

3. **Compare** with a zero-shot version of the same task:
   ```
   Create a function that validates and parses task status strings
   ```
4. Note the difference — zero-shot output is functional but may not handle the edge cases the way you want

**Talking Point:** _"Few-shot is like showing a finished example. Copilot replicates the exact pattern."_

---

## Step 3 — Role-Based Prompting

**Goal:** Assigning a persona changes response depth and focus.

1. **Without role** — ask:
   ```
   #file:demo-app/task-service.ts
   Review the listTasks function
   ```
   → Response is a general summary

2. **With role** — ask:
   ```
   #file:demo-app/task-service.ts
   You are a senior TypeScript engineer conducting a code review.
   Review the listTasks function for:
   - Type safety issues
   - Performance with large datasets
   - Missing edge cases
   - Suggest concrete improvements with code
   ```
   → Response is deeper: may flag the spread operator copy, suggest early return for empty filter, note the non-null assertion on `filter.tag!`, suggest pagination

**Talking Point:** _"Give Copilot a role and it shifts from surface-level answers to expert-level analysis."_

---

## Step 4 — Chain-of-Thought Prompting

**Goal:** Guide Copilot to reason step by step before coding.

1. In Copilot Chat:
   ```
   #file:demo-app/task-types.ts #file:demo-app/task-service.ts
   I need a function called getTaskReport that produces a summary report.
   Think through this step by step:
   1. First, group tasks by status
   2. Then, within each status group, count by priority
   3. Calculate the percentage of overdue tasks (dueDate < now, status != "done")
   4. Find the assignee with the most tasks
   5. Return a structured report object

   Show your reasoning for each step, then write the final function.
   ```
2. **Observe** — Copilot explains its reasoning step by step, then produces a well-structured function
3. **Compare** with a flat prompt:
   ```
   Write a function that creates a task summary report
   ```
4. The chain-of-thought version produces a more complete, well-organized result

**Talking Point:** _"Break complex problems into steps. Copilot reasons better when you reason with it."_

---

## Key Takeaways

| Technique | When to Use | Example Signal Words |
|---|---|---|
| Zero-shot | Simple, well-defined tasks | "Write a function that..." |
| Few-shot | Pattern-matching, formatting rules | "Follow this pattern: Input → Output" |
| Role-based | Reviews, architecture, deep analysis | "You are a senior engineer..." |
| Chain-of-thought | Complex multi-step logic | "Think step by step..." |
