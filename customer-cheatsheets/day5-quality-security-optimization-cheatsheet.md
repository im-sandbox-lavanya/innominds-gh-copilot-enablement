# Day 5 Cheat Sheet - Quality, Security, and Optimization

## Helper Prompts

```text
Analyze the test coverage of this project using #codebase and list top gaps by file and function.
```

```text
#file:src/services/{{service_file}}
Generate comprehensive Jest tests for all untested functions.
Include happy path, error path, and edge cases.
```

```text
When I run tests, failures occur.
Run tests, diagnose each failure, fix code or test as appropriate, and re-run until green.
```

```text
@workspace Perform a security audit of this app.
Find OWASP issues (SQL injection, XSS, path traversal, hardcoded secrets).
Return file, severity, and fix recommendation.
```

```text
Fix all security vulnerabilities in these files:
- #file:app/storage.py
- #file:app/main.py
- #file:app/templates/detail.html
Use secure patterns and preserve behavior.
Then run tests.
```

```text
Compare #file:src/models/Order.ts with #file:src/migrations/001_initial_schema.sql and generate the migration script with UP and DOWN sections.
```

```text
Add structured logging, /health and /ready endpoints, and Prometheus /metrics endpoint.
```

## Reusable Prompt Templates

```text
You are a security-focused reviewer.
Audit #codebase for {{vuln_types}}.
Output table columns:
- file
- vulnerable pattern
- exploit scenario
- severity
- exact remediation
```

```text
Generate test fixtures for {{domain}} using #file:{{model_file}}.
Include:
- boundary values
- invalid values
- realistic datasets
- relational integrity
Export typed fixtures for reuse.
```

```text
Create a remediation plan for all GHAS findings.
Prioritize by:
1) exploitability
2) blast radius
3) fix effort
Include PR strategy and test validation plan.
```

