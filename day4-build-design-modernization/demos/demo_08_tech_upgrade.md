# Demo 08 — Tech Upgrade

> **Duration:** ~5 min | **Slide:** 21 | **Mode:** VS Code + Copilot Chat (Plan Mode → Agent Mode)

| Setting | Recommendation |
|---------|----------------|
| **Chat Mode** | **Plan** mode (Step 1: breaking change analysis) → **Agent** mode (Step 2: execute migration) |
| **Model** | **Claude Sonnet 4** — strongest at understanding framework migration patterns and mapping deprecated APIs |
| **Fallback Model** | GPT-4.1 — reliable for mechanical refactors; pair with `#fetch` for migration guide context |

---

## Objective

Demonstrate using Copilot to plan and execute a framework/library upgrade — analyzing breaking changes, executing refactors, and verifying the build.

---

## Pre-Requisites

- VS Code with GitHub Copilot Chat
- The sample-app project open (`day4-build-design-modernization/sample-app/`)
- Terminal accessible for the agent to run build commands

---

## Step 1 — Analyze Breaking Changes (2 min)

**Goal:** Use Plan mode to discover all breaking changes before touching any code.

1. Switch to **Plan mode** and type:
   ```
   Analyze this project for upgrading dependencies to their latest 
   major versions. Identify breaking changes, deprecated APIs, 
   and configuration updates needed. Rank each change by risk and effort.
   ```

   > **Tip:** If targeting a specific framework, add `#fetch` for the official migration guide:
   > `#fetch https://expressjs.com/en/guide/migrating-5.html`

2. **Show the plan** — Copilot produces a risk-ranked table of changes

> **👀 What to watch for:** The plan references your actual files — not generic examples. It distinguishes between safe mechanical changes (import renames, config updates) and high-risk changes (API behavior differences). This is your migration risk assessment before writing any code.

**Talking Point:** _"Before changing a single line of code, you have a complete impact analysis with risk ratings. Share this with your tech lead for sign-off."_

---

## Step 2 — Execute the Migration (2 min)

**Goal:** Agent mode executes the migration step by step, starting safe.

1. Switch to **Agent mode** and type:
   ```
   Execute the upgrade plan starting with the safest changes first. 
   Update dependencies, apply the necessary code changes, and run 
   the build after each step to verify.
   ```

2. **Watch the agent** update config files, refactor code, and run builds

> **👀 What to watch for:** The agent starts with low-risk changes (version bumps, import renames) before tackling API changes. If it hits a build error, it reads the error output and auto-fixes — that's the self-correction loop. Notice the volume of mechanical changes handled in seconds.

**Talking Point:** _"Dozens of files updated in 30 seconds. The agent even caught and fixed compile errors automatically. A manual migration of this scope takes hours."_

---

## Step 3 (Bonus) — Migration Report

If time allows, ask the agent:
```
Generate a MIGRATION.md documenting what was upgraded, breaking 
changes addressed, and files modified. This will be my PR description.
```

> **👀 What to watch for:** The report includes version-from/version-to, a summary of changes by type, and verification status — ready to paste into a pull request.

---

## The Pattern Works for Any Upgrade

| From → To | Key Changes |
|-----------|-------------|
| Express 4 → 5 | Middleware signatures, path route matching |
| React 17 → 18 | `createRoot()`, concurrent features |
| Spring Boot 2 → 3 | javax → jakarta, SecurityFilterChain |
| .NET 6 → 8 | Minimal APIs, AOT compilation |

The workflow is identical: **Plan** (analyze risks) → **Agent** (execute + verify) → **Document** (PR description)

---

## Key Takeaways

- **Analyze before migrating** — Plan mode gives a risk assessment before any code changes
- **Start with safe changes** — low-risk mechanical changes first
- **Agent self-corrects** — it fixes build errors it encounters during migration
- **This pattern works for any upgrade** — the prompts stay the same, only the project changes
