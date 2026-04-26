# Demo 10 — CI/CD Pipeline Creation

> **Duration:** ~5 min | **Slide:** 24 | **Mode:** VS Code + Copilot Chat (Agent Mode)

| Setting | Recommendation |
|---------|----------------|
| **Chat Mode** | **Agent** mode throughout — needs to analyze project files and create workflow YAML files in `.github/workflows/` |
| **Model** | **GPT-4.1** — fast, accurate YAML generation; strong knowledge of GitHub Actions syntax, marketplace actions, and matrix strategies |
| **Fallback Model** | Claude Sonnet 4 — better at complex multi-job dependencies and conditional logic |

---

## Objective

Demonstrate generating production-ready GitHub Actions CI/CD workflows from a project's actual tech stack — including build, test, security scanning, and multi-environment deployment.

---

## Pre-Requisites

- VS Code with GitHub Copilot Chat
- A project with `package.json` (Node.js) or `pom.xml` (Java) or similar build file
- `.github/workflows/` folder (create if needed)
- Basic understanding of GitHub Actions concepts

---

## Step 1 — Generate CI Workflow (2 min)

**Goal:** Create a complete CI pipeline tailored to the project's actual stack.

1. In **Agent mode**, ask:
   ```
   Analyze #codebase and generate a GitHub Actions CI workflow.
   
   Detect the tech stack from package.json / build files and create:
   - Trigger on push to main and all pull requests
   - Node.js setup with the correct version from .nvmrc or engines
   - Dependency install with npm ci and cache
   - Lint check
   - Type check (if TypeScript)
   - Unit tests with coverage report
   - Upload coverage artifact
   - Matrix build for Node 18 and 20
   
   Save as .github/workflows/ci.yml
   ```

2. **Show the generated workflow:**
   ```yaml
   name: CI
   on:
     push:
       branches: [main]
     pull_request:
       branches: [main]
   
   jobs:
     build:
       runs-on: ubuntu-latest
       strategy:
         matrix:
           node-version: [18, 20]
       steps:
         - uses: actions/checkout@v4
         - uses: actions/setup-node@v4
           with:
             node-version: ${{ matrix.node-version }}
             cache: 'npm'
         - run: npm ci
         - run: npm run lint
         - run: npm run typecheck
         - run: npm test -- --coverage
         - uses: actions/upload-artifact@v4
           with:
             name: coverage-${{ matrix.node-version }}
             path: coverage/
   ```

3. Point out: _"Copilot detected Node.js from package.json, found the lint and typecheck scripts, and set up matrix builds for both supported versions. It even added npm cache for faster runs."_

**Talking Point:** _"This CI workflow is tailored to your project — not a generic template. The scripts, versions, and steps come from your actual codebase."_

---

## Step 2 — Add Security Scanning (1.5 min)

**Goal:** Add security scanning as a separate job in the pipeline.

1. Continue in Agent mode:
   ```
   Add a security scanning job to #file:.github/workflows/ci.yml:
   
   - Run npm audit for dependency vulnerabilities
   - Add CodeQL analysis for code scanning
   - Add a secret scanning step
   - Make the security job run in parallel with the build job
   - Fail the PR if Critical or High vulnerabilities are found
   ```

2. **Show the updated workflow** — now with two parallel jobs:
   ```yaml
   jobs:
     build:
       # ... existing build job
     
     security:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - uses: github/codeql-action/init@v3
           with:
             languages: javascript-typescript
         - uses: github/codeql-action/analyze@v3
         - run: npm audit --audit-level=high
   ```

3. Explain the parallel execution: _"Build and security run simultaneously — your pipeline isn't slower, but now you catch vulnerabilities before merge."_

---

## Step 3 — CD Workflow with Environments (1.5 min)

**Goal:** Generate a deployment workflow with staging and production environments.

1. Ask Copilot:
   ```
   Create a separate CD workflow (.github/workflows/deploy.yml):
   
   - Trigger on push to main (after CI passes)
   - Deploy to staging environment automatically
   - Deploy to production only with manual approval
   - Use GitHub Environments with protection rules
   - Include Slack notification on deploy success/failure
   - Rollback step if health check fails
   ```

2. **Show the key sections** of the CD workflow:
   ```yaml
   jobs:
     deploy-staging:
       environment: staging
       steps:
         - name: Deploy to staging
           run: ./scripts/deploy.sh staging
         - name: Health check
           run: curl --fail https://staging.example.com/health
   
     deploy-production:
       needs: deploy-staging
       environment:
         name: production
         url: https://example.com
       steps:
         - name: Deploy to production
           run: ./scripts/deploy.sh production
   ```

3. Point out the environment protection: _"GitHub Environments handle approval gates — no manual YAML hacks needed."_

**Talking Point:** _"Two workflows, complete CI/CD pipeline: build, test, scan, deploy to staging, manual approval for production. Generated in under 2 minutes from your actual project."_

---

## Key Takeaways to Reinforce

- **Stack-aware generation** — Copilot reads your build files to create accurate workflows
- **Parallel jobs** — security scanning doesn't slow down your build
- **GitHub Environments** — built-in approval gates and protection rules
- **Matrix builds** — test across multiple versions with one config
- **Always review** — verify action versions, secrets, and deployment targets
