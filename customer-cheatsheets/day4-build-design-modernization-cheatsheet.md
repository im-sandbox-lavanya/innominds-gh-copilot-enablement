# Day 4 Cheat Sheet - Build, Design, and Modernization

## Helper Prompts

```text
Break this business requirement into user stories with Given/When/Then acceptance criteria:
{{requirement_text}}
```

```text
From the user stories above, generate test scenarios for happy path, edge cases, and error conditions.
```

```text
Analyze this project and generate an ADR for {{decision_topic}}.
Include alternatives with pros/cons.
```

```text
Analyze #file:src/routes/ and generate an OpenAPI 3.0 YAML with request/response schemas and examples.
Save as docs/openapi.yaml
```

```text
Analyze this project and generate a GitHub Actions CI workflow with build, lint, test, coverage, and Node 18/20 matrix.
Save as .github/workflows/ci.yml
```

```text
Analyze this project and generate an optimized multi-stage Dockerfile with non-root runtime and health check.
Add .dockerignore.
```

```text
Generate Terraform for {{cloud_provider}} with app hosting, database, cache, and observability.
Use modular files and environment-specific tfvars.
```

## Reusable Prompt File Templates

`/.github/prompts/gen-api-endpoint.prompt.md`

```markdown
---
mode: agent
description: Generate a REST endpoint with validation and tests
---
Create a new REST endpoint for {{resource}} in #file:src/routes/

Requirements:
- Use Zod validation
- RFC 7807 errors
- Include Jest unit tests
- Add JSDoc/OpenAPI comments
- Follow #file:src/routes/userRoutes.ts patterns
```

`/.github/prompts/generate-api-docs.prompt.md`

```markdown
---
mode: agent
description: Generate API documentation from route files
---
Analyze #file:src/routes/ and generate docs/api-reference.md with:
- method
- path
- auth
- request/response schema
- curl examples
```

## Custom Agent Samples Used

### 1) Backend Architect Agent (`.github/agents/backend-architect.agent.md`)

```markdown
---
description: Reviews and plans backend features enforcing architectural standards
tools:
  - codebase
  - fetch
  - githubRepo
---
# Backend Architect Agent

You are a senior backend architect reviewing an Express + TypeScript + Sequelize codebase.

## Rules
- Every new feature MUST include a migration in src/migrations/
- All routes MUST use src/middleware/validate.ts
- Services MUST NOT import route files
- New endpoints MUST return RFC 7807 errors
- Use Sequelize model methods only (no raw SQL)

## Review Checklist
1. Migration has UP and DOWN
2. Input validation uses Zod
3. Error handling follows errorHandler.ts
4. No circular dependency across layers
```

### 2) API Reviewer Agent (`.github/agents/api-reviewer.agent.md`)

```markdown
---
description: Reviews API endpoints for consistency, security, and documentation
tools:
  - codebase
---
# API Reviewer Agent

You are an API design reviewer specializing in REST API consistency.

## Standards
- RESTful naming: plural nouns, no verbs in paths
- Response envelope: { data, meta, errors }
- Pagination on list endpoints (limit/offset, max 100)
- Auth middleware required where applicable
- JSDoc/OpenAPI annotations required

## When Reviewing
- Flag raw array responses
- Flag missing pagination
- Flag inconsistent status codes
- Suggest specific fixes
```

## One-Line Invocation Examples

```text
@backend-architect Plan a customer reviews feature with API endpoints, data model, and migration.
```

```text
@api-reviewer Review all route files in src/routes/ and list API standard violations.
```
