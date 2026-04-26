# Demo 08 — Tech Upgrade (Spring Boot 2 → 3)

> **Duration:** ~5 min | **Slide:** 21 | **Mode:** VS Code + Copilot Chat (Plan Mode → Agent Mode)

| Setting | Recommendation |
|---------|----------------|
| **Chat Mode** | **Plan** mode (Step 1: breaking change analysis & risk matrix) → **Agent** mode (Step 2: execute migration with build checks) |
| **Model** | **Claude Sonnet 4** — strongest at understanding framework migration patterns; accurately maps deprecated APIs to replacements |
| **Fallback Model** | GPT-4.1 — reliable for mechanical refactors like import renaming; pair with `#fetch` for migration guide context |

---

## Objective

Demonstrate using Copilot to plan and execute a real framework upgrade — analyzing breaking changes, generating a migration plan, executing refactors, and verifying the build passes after each step.

---

## Pre-Requisites

- VS Code with GitHub Copilot Chat
- A **Spring Boot 2.x project** (or similar upgrade-ready project — the pattern works for any major version upgrade: React 17→18, Angular 15→17, .NET 6→8, etc.)
- Build tool configured (Maven/Gradle)
- If no Spring Boot project available, use a Node.js/Express → Fastify migration or similar

---

## Step 1 — Analyze Current State (1.5 min)

**Goal:** Use Plan mode to discover all breaking changes before touching any code.

1. Switch to **Plan mode** and ask:
   ```
   Analyze #codebase for a Spring Boot 2.x to Spring Boot 3.2 upgrade.
   Identify:
   - Current Spring Boot version and all Spring dependencies
   - javax.* to jakarta.* namespace changes needed
   - Deprecated APIs that will break
   - Configuration property changes (application.yml/properties)
   - Security configuration changes (WebSecurityConfigurerAdapter removal)
   - Test framework changes
   - Third-party library compatibility issues
   
   Rank each change by risk (High/Medium/Low) and effort.
   #fetch https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-3.0-Migration-Guide
   ```

2. **Show the analysis output** — a structured table:
   | Change | Files Affected | Risk | Effort |
   |--------|---------------|------|--------|
   | javax → jakarta imports | 42 files | High | Medium |
   | SecurityConfig refactor | 3 files | High | High |
   | Property renames | 2 files | Medium | Low |
   | Test annotation changes | 15 files | Low | Low |

3. Point out the `#fetch` usage: _"We're pulling the official migration guide directly into Copilot's context — it's working with the latest information, not training data."_

**Talking Point:** _"Before changing a single line of code, you have a complete impact analysis with risk ratings. Share this with your tech lead for sign-off."_

---

## Step 2 — Execute the Migration (2 min)

**Goal:** Agent mode executes the migration step by step.

1. Switch to **Agent mode** and start with the lowest-risk change:
   ```
   Execute the Spring Boot 3 migration starting with the safest changes:
   
   Step 1: Update pom.xml — change Spring Boot parent to 3.2.x, 
   update Java version to 17+
   Step 2: Replace all javax.* imports with jakarta.* 
   Step 3: Run mvn compile — fix any errors
   
   After each step, run the build and report any failures.
   ```

2. **Watch the agent work:**
   - _"Updating pom.xml… changed parent from 2.7.x to 3.2.x"_
   - _"Scanning 42 files for javax imports… replacing with jakarta"_
   - _"Running mvn compile…"_
   - _"3 compile errors found — fixing: removed deprecated method calls"_
   - _"Re-running mvn compile… BUILD SUCCESS"_

3. **Show the diff** — highlight the volume of mechanical changes the agent handled

4. If time allows, continue with the next step:
   ```
   Now refactor the SecurityConfig to remove WebSecurityConfigurerAdapter 
   and use SecurityFilterChain bean instead. Run tests after.
   ```

**Talking Point:** _"42 files of javax→jakarta changes in 30 seconds. The agent even caught and fixed the 3 compile errors automatically. A manual migration of this scope takes days."_

---

## Step 3 — Verify & Document (1.5 min)

**Goal:** Validate the upgrade and generate a migration report.

1. Ask the agent to run full verification:
   ```
   Run the full test suite (mvn test) and report:
   - Total tests passed/failed/skipped
   - Any test failures with root cause analysis
   - Fix any failing tests that are due to the migration
   ```

2. After tests pass, generate documentation:
   ```
   Generate a MIGRATION.md documenting:
   - What was upgraded (from version → to version)
   - Breaking changes addressed
   - Files modified (summary count by type of change)
   - Known issues or manual follow-ups needed
   - Verification status (build + test results)
   ```

3. **Show the generated MIGRATION.md** — this becomes the PR description

**Talking Point:** _"The migration report becomes your PR description. Reviewers can see exactly what changed, why, and that all tests pass. This is auditable, repeatable, and fast."_

---

## Alternative: Non-Spring Boot Demo

If no Spring Boot project is available, substitute with any of these:

| From | To | Key Changes |
|------|----| Demonstrate |
| React 17 → 18 | `createRoot()`, concurrent features, Suspense | Import changes, API migration |
| Angular 15 → 17 | Standalone components, signals, new control flow | Module→standalone, template syntax |
| Express → Fastify | Route registration, plugin system, schema validation | Architecture differences |
| .NET 6 → 8 | Minimal APIs, AOT compilation, new middleware | Config and startup changes |

The Pattern is identical:
1. **Plan** → Analyze breaking changes
2. **Agent** → Execute migration steps
3. **Verify** → Build + test + document

---

## Key Takeaways to Reinforce

- **Analyze before migrating** — Plan mode + #fetch gives a complete risk assessment
- **Start with safe changes** — low-risk mechanical changes first (imports, configs)
- **Agent self-corrects** — it fixes compile errors it encounters during migration
- **Document the migration** — auto-generated reports become PR descriptions
- **This pattern works for any upgrade** — Spring Boot, React, Angular, .NET, etc.
