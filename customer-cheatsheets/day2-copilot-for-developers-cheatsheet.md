# Day 2 Cheat Sheet - Copilot for Developers

## Helper Prompts

```text
#file:src/{{file_name}}
Explain this code in simple terms and call out risks or edge cases.
```

```text
#file:src/{{file_name}}
Generate unit tests for this function using Jest. Include happy path, edge cases, and failure cases.
```

```text
#file:src/{{file_name}}
Refactor this function for readability and performance without changing behavior.
```

```text
#file:src/{{file_name}}
Write JSDoc comments for all exported functions in this file.
```

```text
@workspace Where is authentication handled in this project? Trace request to token validation.
```

## Reusable Prompt Templates

```text
You are a senior {{language}} reviewer.
Review #file:{{file_path}} for:
- correctness
- performance
- security
- maintainability
Return:
1) top issues by severity
2) concrete code fixes
3) tests to add
```

```text
Create implementation for {{feature_name}} in #file:{{target_file}}.
Constraints:
- keep existing style
- avoid new dependencies
- include tests
- include error handling
Then explain all changes.
```

```text
Generate a pull request description from recent changes:
- what changed
- why it changed
- risk level
- test evidence
- rollback plan
```
