---
marp: true
theme: default
paginate: true
header: "**GitHub Platform Overview – GHAS, Copilot & Subscriptions**"
footer: "Innominds | GitHub Copilot Enablement – Day 1"
---

<!-- Slide 1 -->
# GitHub Platform Overview
## GHAS, Copilot & Subscriptions

**Day 1 – 2-Hour Session**

> *"The world's most widely adopted AI developer platform."*

- GitHub Platform & Deployment Options
- GitHub Advanced Security (GHAS)
- GitHub Copilot – Features, Plans & Admin Controls
- Q & A

---

<!-- Slide 2 -->
# Agenda

| # | Topic | Duration |
|---|-------|----------|
| 1 | Introduction to GitHub – Repos, Branches, PRs, GitHub Flow | 15 min |
| 2 | GitHub Deployment Options – GHEC, EMU, GHES | 10 min |
| 3 | GitHub Advanced Security (GHAS) – Overview | 15 min |
| 4 | GHAS – Code Security & Secret Protection Deep-Dive | 15 min |
| 5 | GHAS Subscriptions & Plans | 5 min |
| 6 | **Break** | **5 min** |
| 7 | GitHub Copilot – Overview & Features | 15 min |
| 8 | Copilot Plans – Free → Pro → Pro+ → Business → Enterprise | 10 min |
| 9 | Copilot Admin & Policy Controls | 10 min |
| 10 | Q & A | 20 min |

---

<!-- Slide 3 -->
# Introduction to GitHub

GitHub is the world's largest developer platform — **100M+ developers**, **420M+ repositories**.

### Core Concepts

| Concept | What it is |
|---------|-----------|
| **Repository** | A project container holding code, history, issues, and CI/CD config |
| **Branch** | An isolated line of development (`main`, `feature/*`, `hotfix/*`) |
| **Pull Request** | A proposal to merge changes — enables code review and discussion |
| **GitHub Flow** | A lightweight branching model: `main` → feature branch → PR → review → merge |

---

<!-- Slide 4 -->
# GitHub Flow – Visual

```text
  main ──────●──────────────────●──────────── (always deployable)
              \                /
  feature/x   ●───●───●───●──●   ← Pull Request + Review
```

### Steps
1. **Create a branch** from `main`
2. **Add commits** — small, focused changes
3. **Open a Pull Request** — describe *what* and *why*
4. **Discuss & review** — request reviewers, address feedback
5. **Merge** — squash / merge / rebase into `main`
6. **Deploy** — CI/CD triggers automatically

---

<!-- Slide 5 -->
# GitHub Deployment Options

| Option | Hosting | Best For |
|--------|---------|----------|
| **GitHub.com (Free / Team)** | GitHub-hosted cloud | Small teams, OSS, startups |
| **GitHub Enterprise Cloud (GHEC)** | GitHub-hosted cloud | Enterprises needing SAML SSO, SCIM, audit log streaming, IP allow lists |
| **Enterprise Managed Users (EMU)** | GitHub-hosted cloud | Enterprises requiring full IdP-managed lifecycle — accounts provisioned & controlled by the company |
| **GitHub Enterprise Server (GHES)** | Self-hosted (on-prem / private cloud) | Regulated industries with data-residency or air-gapped requirements |

> **GHEC** includes an *enterprise account* to centrally manage policy & billing for multiple organizations.

---

<!-- Slide 6 -->
# GitHub Enterprise Cloud – Key Differentiators

- **50,000 GitHub Actions minutes / month** (standard runners)
- **50 GB GitHub Packages storage**
- **99.9 % monthly uptime SLA**
- **SAML SSO & SCIM** provisioning
- **Audit log streaming** (Splunk, Datadog, S3, Azure Blob, etc.)
- **IP allow lists** – restrict access by network
- **Repository rules & internal repositories**
- **Data residency** – host data in a specific region on a unique subdomain
- **Enterprise Managed Users** option for full account lifecycle control

---

<!-- Slide 7 -->
# GitHub Advanced Security (GHAS) – Overview

GHAS is now split into **two purchasable products**:

| Product | Focus |
|---------|-------|
| **GitHub Code Security** | Find & fix vulnerabilities in code and dependencies |
| **GitHub Secret Protection** | Detect & prevent secret leaks |

### Availability
- **Public repos** – many features enabled **free by default**
- **Private / internal repos** – requires **GitHub Team** or **GitHub Enterprise** plan + GHAS license
- **Licensing** – per active committer billing model

---

<!-- Slide 8 -->
# GitHub Code Security – Features

| Feature | Description |
|---------|-------------|
| **Code Scanning** | Analyze code for vulnerabilities using **CodeQL** or third-party tools |
| **CodeQL CLI** | Run CodeQL locally; upload results to GitHub |
| **Copilot Autofix** | AI-generated fix suggestions for code-scanning alerts |
| **Security Campaigns** | Reduce security debt at scale across repositories |
| **Custom Auto-triage Rules** | Automate Dependabot alert handling (ignore, snooze, auto-update) |
| **Dependency Review** | See full impact of dependency changes before merge |
| **Security Overview** | Org/enterprise-wide risk dashboard |

---

<!-- Slide 9 -->
# GitHub Secret Protection – Features

| Feature | Description |
|---------|-------------|
| **Secret Scanning** | Detect leaked keys, tokens, and credentials in repos |
| **Push Protection** | **Block commits** containing secrets *before* they're pushed |
| **Copilot Secret Scanning** | AI-powered detection of **unstructured credentials** (e.g., passwords) |
| **Custom Patterns** | Define org-specific secret patterns to scan for |
| **Delegated Bypass** | Approval workflow for push-protection overrides — governance at scale |
| **Delegated Alert Dismissal** | Control who can dismiss secret alerts |
| **Security Campaigns** | Remediate exposed secrets at scale |

---

<!-- Slide 10 -->
# GHAS – Free vs. Paid Feature Matrix

| Feature | Public Repos (Free) | Private (No GHAS) | Private (With GHAS) |
|---------|:---:|:---:|:---:|
| Code Scanning | ✅ | ❌ | ✅ |
| CodeQL CLI | ✅ | ❌ | ✅ |
| Copilot Autofix | ✅ | ❌ | ✅ |
| Security Campaigns | ❌ | ❌ | ✅ |
| Custom Auto-triage | ❌ | ❌ | ✅ |
| Dependency Review | ❌ | ❌ | ✅ |
| Secret Scanning | ✅ | ❌ | ✅ |
| Push Protection | ✅ | ❌ | ✅ |
| Copilot Secret Scanning | ❌ | ❌ | ✅ |
| Custom Patterns | ❌ | ❌ | ✅ |

---

<!-- Slide 11 -->
# GHAS – Subscription & Licensing

### Pricing Model
- **Per active committer** – you pay for each unique committer to GHAS-enabled repos
- A committer who contributes to multiple repos counts **once**
- Billed monthly via your GitHub Enterprise agreement

### Plan Requirements

| GitHub Plan | Can Purchase GHAS? |
|-------------|:---:|
| Free (personal / org) | ❌ |
| GitHub Team | ✅ |
| GitHub Enterprise Cloud (GHEC) | ✅ |
| GitHub Enterprise Server (GHES) | ✅ |

> 💡 **Free risk assessment** — Orgs on Team/Enterprise can run a no-cost security risk assessment to evaluate exposure before purchasing.

---

<!-- Slide 12 -->
# ☕ Break (5 min)

---

<!-- Slide 13 -->
# GitHub Copilot – What Is It?

> *An AI coding assistant that helps you write code faster and with less effort.*

- Built on large language models (LLMs) from OpenAI, Anthropic, Google, and more
- Works **in your IDE**, on **GitHub.com**, in **GitHub Mobile**, and the **CLI**
- Research shows **increased developer productivity and satisfaction**

### Where You Can Use Copilot
| Surface | Details |
|---------|---------|
| **IDEs** | VS Code, Visual Studio, JetBrains, Eclipse, Xcode, Vim/Neovim |
| **GitHub.com** | Chat, PR summaries, code review, cloud agent |
| **CLI** | `gh copilot` — explain commands, suggest fixes |
| **Mobile** | GitHub Mobile chat on iOS & Android |

---

<!-- Slide 14 -->
# GitHub Copilot – Feature Map

| Feature | What It Does |
|---------|-------------|
| **Inline Suggestions** | Real-time autocomplete as you type (+ **Next Edit Suggestions**) |
| **Copilot Chat** | Natural-language Q&A about code, docs, errors |
| **Agent Mode** | Autonomous multi-step edits: determines files, runs terminal commands, iterates |
| **Edit Mode** | Granular control — you pick files, Copilot proposes diffs |
| **Copilot Cloud Agent** | Autonomous agent on GitHub — research repo, plan, code, open PRs |
| **Copilot Code Review** | AI-generated review comments on PRs |
| **PR Summaries** | Auto-generated pull request descriptions |
| **Copilot CLI** | Terminal assistance — explain, suggest, interact with GitHub |
| **Copilot Spaces** | Organize context (code, docs, specs) for task-specific answers |
| **GitHub Spark** | Build & deploy full-stack apps via natural language (preview) |

---

<!-- Slide 15 -->
# Copilot – Agent Mode vs. Edit Mode vs. Cloud Agent

| Dimension | Edit Mode | Agent Mode | Cloud Agent |
|-----------|-----------|------------|-------------|
| **Where** | VS Code, Visual Studio, JetBrains | VS Code, Visual Studio, JetBrains | GitHub.com |
| **Autonomy** | You pick files & accept edits | Copilot decides files, runs commands, iterates | Fully autonomous — creates branches & PRs |
| **Best For** | Quick, scoped edits | Complex multi-step tasks | Issue → PR without leaving GitHub |
| **MCP Support** | ✅ | ✅ | — |
| **Terminal Access** | ❌ | ✅ | ✅ (sandboxed) |

> **Tip:** Assign a GitHub Issue directly to Copilot → it researches, codes, and opens a PR for your review.

---

<!-- Slide 16 -->
# Copilot Plans – Overview

| Plan | Target | Price |
|------|--------|-------|
| **Copilot Free** | Anyone with a GitHub account | **$0** |
| **Copilot Student** | Verified students | **Free** |
| **Copilot Pro** | Individual developers | **$10 / month** |
| **Copilot Pro+** | Power users wanting all models | **$39 / month** |
| **Copilot Business** | Organizations (GitHub Free/Team/GHEC) | **$19 / seat / month** |
| **Copilot Enterprise** | Enterprises on GHEC | **$39 / seat / month** |

> Copilot is **not** currently available for GitHub Enterprise Server (GHES).

---

<!-- Slide 17 -->
# Copilot Plans – Feature Comparison

| Capability | Free | Pro | Pro+ | Business | Enterprise |
|-----------|:---:|:---:|:---:|:---:|:---:|
| Chat messages (included models) | 50 / mo | Unlimited | Unlimited | Unlimited | Unlimited |
| Code completions | 2,000 / mo | Unlimited | Unlimited | Unlimited | Unlimited |
| **Premium requests** | 50 / mo | 300 / mo | 1,500 / mo | 300 / user / mo | 1,000 / user / mo |
| Buy more premium @ $0.04/req | ❌ | ✅ | ✅ | ✅ | ✅ |
| Agent Mode | ✅ | ✅ | ✅ | ✅ | ✅ |
| Cloud Agent | ❌ | ✅ | ✅ | ✅ | ✅ |
| Code Review (full) | ❌ | ✅ | ✅ | ✅ | ✅ |
| PR Summaries | ❌ | ✅ | ✅ | ✅ | ✅ |
| GitHub Spark | ❌ | ❌ | ✅ | ❌ | ✅ |

---

<!-- Slide 18 -->
# Copilot Plans – Model Access

| Model Family | Free | Pro | Pro+ | Business | Enterprise |
|-------------|:---:|:---:|:---:|:---:|:---:|
| GPT-5 mini | ✅ | ✅ | ✅ | ✅ | ✅ |
| GPT-5.2 / Codex | ❌ | ✅ | ✅ | ✅ | ✅ |
| GPT-5.4 | ❌ | ❌ | ✅ | ✅ | ✅ |
| Claude Haiku 4.5 | ✅ | ✅ | ✅ | ✅ | ✅ |
| Claude Opus 4.6+ | ❌ | ✅ | ✅ | ✅ | ✅ |
| Claude Sonnet 4.5/4.6 | ❌ | ✅ | ✅ | ✅ | ✅ |
| Gemini 2.5 Pro / 3 Flash | ❌ | ✅ | ✅ | ✅ | ✅ |

> **Pro+** unlocks *all* models including Claude Opus 4.6 fast mode and GPT-5.4.

---

<!-- Slide 19 -->
# Copilot – Admin & Policy Controls

### For Organization & Enterprise Admins (Business / Enterprise plans)

| Control | Description |
|---------|-------------|
| **Policy Management** | Enable/disable Copilot features at org or enterprise level |
| **Access Management** | Assign seats to specific users, teams, or orgs |
| **Content Exclusions** | Exclude sensitive files/repos from Copilot's context |
| **Organization Custom Instructions** | Define org-wide coding standards Copilot must follow |
| **Audit Logs** | Review who used Copilot, when, and what actions were taken |
| **Usage Data & Reports** | Monitor adoption, seat utilization, and acceptance rates |

> Enterprise owners can assign **Copilot Enterprise** or **Copilot Business** to individual organizations within the enterprise.

---

<!-- Slide 20 -->
# Copilot – Customization Features

| Feature | Availability |
|---------|-------------|
| **Repository custom instructions** (`.github/copilot-instructions.md`) | All plans |
| **Personal custom instructions** | All plans |
| **Organization custom instructions** | Business & Enterprise |
| **Prompt files** (`.prompt.md`) | All plans |
| **Model Context Protocol (MCP)** | All plans |
| **Block suggestions matching public code** | All plans |
| **Exclude files from Copilot** | Business & Enterprise |

> Custom instructions let you encode coding standards, framework preferences, and security rules that Copilot respects in every response.

---

<!-- Slide 21 -->
# GitHub Plans – Summary Comparison

| Feature Area | Free | Team | Enterprise Cloud | Enterprise Server |
|-------------|:---:|:---:|:---:|:---:|
| Public/Private repos | Unlimited | Unlimited | Unlimited | Unlimited |
| Actions minutes / mo | 2,000 | 3,000 | 50,000 | Self-hosted |
| Packages storage | 500 MB | 2 GB | 50 GB | Self-hosted |
| SAML SSO / SCIM | ❌ | ❌ | ✅ | ✅ |
| Audit log streaming | ❌ | ❌ | ✅ | ✅ |
| GHAS purchasable | ❌ | ✅ | ✅ | ✅ |
| Enterprise account | ❌ | ❌ | ✅ | ✅ |
| Copilot Business/Enterprise | ❌ | ✅ | ✅ | ❌ |

---

<!-- Slide 22 -->
# Putting It All Together – Security + AI

```text
┌─────────────────────────────────────────────────────────┐
│                   Developer Workflow                     │
│                                                         │
│   Code ──► Copilot Inline Suggestions                   │
│     │                                                   │
│   Commit ──► Push Protection (Secret Protection)        │
│     │                                                   │
│   PR ──► Copilot Code Review + Copilot PR Summary       │
│     │     + Code Scanning (CodeQL) + Dependency Review  │
│     │     + Copilot Autofix for alerts                  │
│     │                                                   │
│   Merge ──► Dependabot keeps dependencies updated       │
│     │                                                   │
│   Monitor ──► Security Overview + Audit Logs            │
└─────────────────────────────────────────────────────────┘
```

> GHAS + Copilot = **shift-left security** powered by AI at every stage.

---

<!-- Slide 23 -->
# Key Takeaways

1. **GitHub Platform** — Choose the deployment model (Cloud, EMU, Server) that fits your compliance and collaboration needs

2. **GHAS** is now two products:
   - **Code Security** — CodeQL scanning, Copilot Autofix, dependency review
   - **Secret Protection** — Secret scanning, push protection, AI-powered credential detection

3. **GitHub Copilot** — More than autocomplete:
   - Agent Mode, Cloud Agent, Code Review, Spaces, MCP, and Spark
   - Plans from **Free** to **Enterprise** with model and feature tiers

4. **Admin Controls** — Enterprise-grade policy management, content exclusions, audit logs, and usage reporting

---

<!-- Slide 24 -->
# Useful Links & Resources

| Resource | URL |
|----------|-----|
| GitHub Docs – GHAS | https://docs.github.com/en/code-security |
| GitHub Docs – Copilot | https://docs.github.com/en/copilot |
| Copilot Plans & Pricing | https://github.com/features/copilot/plans |
| GitHub Plans | https://docs.github.com/en/get-started/learning-about-github/githubs-plans |
| Copilot Trust Center | https://copilot.github.trust.page/ |
| GitHub Public Roadmap | https://github.com/github/roadmap |
| GitHub Certifications | https://docs.github.com/en/get-started/showcase-your-expertise-with-github-certifications |
| GHAS Adoption Guide | https://docs.github.com/en/code-security/adopting-github-advanced-security-at-scale |

---

<!-- Slide 25 -->
# Q & A

### Thank you!

Got questions? Let's discuss.

- GitHub Platform & Deployment
- GHAS – Code Security & Secret Protection
- Copilot Features, Plans & Administration
- Licensing & Pricing
- Anything else!

> 📧 Reach out post-session for follow-ups.
