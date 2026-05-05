# Day 3 Cheat Sheet - Context Setting and Advanced Prompting

## Helper Prompts

```text
#file:demo-app/task-types.ts #file:demo-app/task-service.ts
Write a function to get task statistics - count by status and priority.
```

```text
#file:demo-app/task-types.ts
Write a function called getTasksByDateRange that accepts a Task array, a start date, and end date, and returns tasks whose dueDate falls within range.
```

```text
#file:demo-app/task-service.ts
You are a senior TypeScript engineer conducting a code review.
Review the listTasks function for type safety, performance, and missing edge cases.
Suggest concrete improvements with code.
```

```text
#file:demo-app/task-types.ts #file:demo-app/task-service.ts
I need getTaskReport. Think step by step:
1) group by status
2) count by priority
3) overdue percentage
4) top assignee
5) return structured object
Show reasoning, then final function.
```

```text
@workspace What types and functions are available in this task tracker? List all.
```

## Reusable Prompt Templates

```text
#file:{{types_file}} #file:{{service_file}}
Implement {{function_name}}.
Requirements:
- input types: {{input_types}}
- output type: {{output_type}}
- edge cases: {{edge_cases}}
- performance expectation: {{performance_requirement}}
Also include tests.
```

```text
#file:{{target_file}}
You are a {{persona}}.
Review this code for:
- correctness
- security
- maintainability
Return findings by severity, exact fixes, and tests to add.
```

```text
#file:{{target_file}}
Refactor for {{goal}}.
Constraints:
- no behavior change
- no new dependencies
- keep public API stable
- update tests if required
```

## Reusable Instruction Snippets Used

Project-wide instructions pattern (`.github/copilot-instructions.md`):

```markdown
# Task Tracker - Coding Conventions
- TypeScript strict mode
- Explicit return types on all functions
- Prefer const over let
- Use early returns
- Compare dates with .getTime()
- Add JSDoc on exported functions
```

Path-specific test instructions pattern (`.github/instructions/tests.instructions.md`):

```markdown
---
applyTo: "**/*.test.ts"
---
- Use AAA pattern
- Descriptive test names
- Cover happy and error paths
```
