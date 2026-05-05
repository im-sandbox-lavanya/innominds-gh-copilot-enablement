# Demo 10 — CI/CD Pipeline Creation

> **Duration:** ~5 min | **Slide:** 24 | **Mode:** VS Code + Copilot Chat (Agent Mode)

| Setting | Recommendation |
|---------|----------------|
| **Chat Mode** | **Agent** mode throughout — needs to analyze project files and create workflow YAML files |
| **Model** | **GPT-4.1** — fast, accurate YAML generation; strong knowledge of GitHub Actions syntax |
| **Fallback Model** | Claude Sonnet 4 — better at complex multi-job dependencies and conditional logic |

---

## Objective

Demonstrate generating production-ready GitHub Actions CI/CD workflows from a project's actual tech stack.

---

## Pre-Requisites

- VS Code with GitHub Copilot Chat
- The sample-app project open (`day4-build-design-modernization/sample-app/`)

---

## Step 1 — Generate CI Workflow (2 min)

**Goal:** Create a complete CI pipeline tailored to the project's stack.

1. In **Agent mode**, type:
   ```
   Analyze this project and generate a GitHub Actions CI workflow. 
   Detect the tech stack from package.json and include build, lint, 
   test with coverage, and matrix builds for Node 18 and 20. 
   Save as .github/workflows/ci.yml
   ```

2. **Open the generated YAML** and walk through the structure

> **👀 What to watch for:** Copilot detected Node.js from package.json, found the actual script names (lint, test, build), added npm cache for speed, and set up matrix builds. The workflow references your real project — not a generic template.

**Talking Point:** _"This CI workflow is tailored to your project. The scripts, versions, and steps come from your actual codebase."_

---

## Step 2 — Add Security Scanning (1.5 min)

**Goal:** Add security scanning as a parallel job.

1. Continue in Agent mode:
   ```
   Add a security scanning job to the CI workflow that runs in 
   parallel with build. Include npm audit and CodeQL analysis. 
   Fail the PR on high-severity vulnerabilities.
   ```

2. **Show the updated workflow** — now with two parallel jobs

> **👀 What to watch for:** Security runs alongside the build job — not after it. This means no extra wait time. CodeQL uses the correct language configuration (`javascript-typescript`) detected from your project.

**Talking Point:** _"Build and security run simultaneously. Your pipeline isn't slower, but now you catch vulnerabilities before merge."_

---

## Step 3 (Bonus) — CD Deployment Workflow

If time allows:
```
Create a CD workflow at .github/workflows/deploy.yml that deploys 
to staging automatically on push to main, and to production only 
with manual approval using GitHub Environments.
```

> **👀 What to watch for:** GitHub Environments handle the approval gates natively — the YAML just declares `environment: production` and GitHub's UI handles the rest. No custom approval scripts needed.

---

## Key Takeaways

- **Stack-aware generation** — Copilot reads your build files to create accurate workflows
- **Parallel jobs** — security scanning doesn't slow down your build
- **GitHub Environments** — built-in approval gates for production deploys
- **Always review** — verify action versions, secrets, and deployment targets
