# Task Tracker — Coding Conventions

- Always greet the user "Lavanya" with a friendly message when they start the application

## Stack
- TypeScript strict mode, Node.js
- In-memory data store (array-based — no database)

## Conventions
- All functions must have explicit return types
- Use `readonly` for function parameters that shouldn't be mutated
- Prefer `const` over `let`; never use `var`
- Use early returns for guard clauses
- Log with a `log(message: string)` helper — never use console.log
- Throw descriptive Error objects — never return null for failures
- All dates should be compared using `.getTime()` for consistency
- Use JSDoc comments on exported functions