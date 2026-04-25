# Speaker Notes — GitHub Platform Overview

**Presentation:** `gh-platform.html`
**Duration:** 90 min content + 25 min demos
**Audience:** Up to 30 participants (developers, team leads, engineering managers)

---

## Slide 1 — Title Slide

**Talking Points:**
- Welcome everyone to the GitHub Platform Overview session
- This session covers three pillars: the GitHub platform itself, GitHub Advanced Security (GHAS), and GitHub Copilot
- We'll mix conceptual content with live demos — ask questions any time
- Session is ~90 min of content plus 25 min of demos spread across the session

---

## Slide 2 — Trainer Introduction

**Talking Points:**
- Introduce yourself and co-trainer: names, roles, GitHub certifications
- Briefly share your experience with GitHub platform and Copilot
- Mention InfoMagnus as a GitHub certified training partner
- Icebreaker: ask participants about their current GitHub usage and familiarity level

---

## Slide 3 — Course Agenda

**Talking Points:**
- Walk through the 8 sections — we start from GitHub basics and build up to Copilot admin controls
- Sections 1-2: GitHub fundamentals and deployment models
- Sections 3-4: Security (GHAS) and licensing
- Sections 5-7: Copilot — what it is, plans, admin controls
- Section 8: Open Q&A and wrap-up
- Each section ends with a quick quiz to reinforce key concepts
- Four live demos are embedded throughout

---

## SECTION 01: Introduction to GitHub

### Slide 4 — Section Divider

**Talking Points:**
- Start with the fundamentals — even experienced teams benefit from aligning on terminology
- This section covers repos, branches, pull requests, and GitHub Flow

---

### Slide 5 — What is GitHub?

**Talking Points:**
- GitHub is the world's largest developer platform: 100M+ developers, 420M+ repositories
- 90% of Fortune 100 companies use GitHub — it's not just for open source
- Built on Git (distributed version control), but adds collaboration, CI/CD, security, and project management on top
- Full DevOps platform: plan (Issues, Projects) → code (Repos) → build (Actions) → test → deploy → monitor → secure (GHAS)
- Key differentiator: everything in one place — no context switching between 5 different tools

**Key Stats to Emphasize:**
| Metric | Value |
|--------|-------|
| Developers | 100M+ |
| Repositories | 420M+ |
| Fortune 100 adoption | 90% |
| Organizations | 4M+ |

**Link:** https://github.com/about

---

### Slide 6 — Repositories, Branches & Commits

**Talking Points:**
- **Repository:** The project container. Contains code, history, issues, settings. Can be public or private. Forking enables open source contribution
- **Branches:** Isolated development lines. `main` is the default production branch. Feature branches are short-lived. Branch protection rules enforce quality
- **Commits:** Atomic snapshots with author, message, and SHA. Emphasis on small, purposeful commits
- **Best Practice:** Commit early, commit often. Use conventional commits (`feat:`, `fix:`, `chore:`) for automated changelogs and clear history

**Links:**
- Creating a repo: https://docs.github.com/en/repositories/creating-and-managing-repositories
- Branch protection: https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-a-branch-protection-rule
- Conventional commits: https://www.conventionalcommits.org/

---

### Slide 7 — Pull Requests & Code Review

**Talking Points:**
- **Pull Requests (PRs):** The core collaboration mechanism. Propose changes, trigger discussion, run CI, get approval
- **Code Review:** Reviewers comment on specific lines, request changes, or approve. Branch rules can enforce required reviewers
- **Status Checks:** CI/CD must pass before merge — automated quality gates
- **Copilot PR Summaries:** AI-generated descriptions and review suggestions (Enterprise plan)
- Walk through the Branch Protection Rules checklist: required reviews, status checks, signed commits, push restrictions, linear history

**Links:**
- Pull requests: https://docs.github.com/en/pull-requests
- Code review: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests
- CODEOWNERS: https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners

---

### Slide 8 — GitHub Flow

**Talking Points:**
- Walk through the 6 steps: Branch → Commit → Pull Request → Review → Deploy → Merge
- GitHub Flow is deliberately simple: one main branch, short-lived feature branches
- Compare with Git Flow: Git Flow adds `develop`, `release/*`, `hotfix/*` branches — more complexity for scheduled releases
- GitHub Flow suits continuous deployment teams; Git Flow suits teams with release cycles
- Emphasize: delete the branch after merge — keep the repo clean

**Links:**
- GitHub Flow guide: https://docs.github.com/en/get-started/using-github/github-flow
- Understanding Git Flow: https://nvie.com/posts/a-successful-git-branching-model/

---

### Slide 9 — Demo: Introduction to GitHub

**Duration:** ~5 minutes

**Demo Script:**

1. **Create a Repository**
   - Go to https://github.com/new
   - Name: `demo-github-flow`
   - Add README, .gitignore (Node), MIT License
   - Click "Create repository"

2. **Create a Branch**
   - Click branch dropdown → type `feature/add-hello`
   - Click "Create branch: feature/add-hello from main"
   - Edit README.md on the new branch — add a "Hello World" section
   - Commit with message: `feat: add hello world section`

3. **Open a Pull Request**
   - Click "Compare & pull request" banner
   - Fill in title and description
   - Show the diff view, files changed tab
   - Point out: this is where CI checks would run, reviewers would comment
   - (Optional) Merge the PR, show branch deletion prompt

**Fallback:** If network issues, use pre-recorded screenshots or a local repo with `git log --oneline --graph`

---

### Slide Q1 — Quiz: GitHub Flow

**Question:** In GitHub Flow, what happens immediately after opening a Pull Request?

**Answer:** ✅ The team reviews, discusses, and CI checks run before merging

**Explanation:** A PR is a discussion + review mechanism, not an auto-merge trigger. The branch is not deleted until after merge, and code is never immediately merged without review in a proper GitHub Flow setup.

---

## SECTION 02: GitHub Deployment Options

### Slide 10 — Section Divider

**Talking Points:**
- Now that we understand GitHub basics, let's talk about how enterprises deploy GitHub
- Three main options: GitHub.com (Free/Team), GHEC/EMU, and GHES

---

### Slide 11 — GitHub.com Free & Team Plans

**Talking Points:**
- **GitHub Free:** Unlimited public & private repos, 2,000 Actions minutes/month, 500 MB Packages. For individuals and open source
- **GitHub Team ($4/user/month):** 3,000 Actions minutes, 2 GB Packages, required reviewers, CODEOWNERS, draft PRs. For small-medium businesses
- **Limitation:** Both share GitHub.com multi-tenant infra. No SAML SSO, no data residency, no advanced audit logs

**Links:**
- GitHub pricing: https://github.com/pricing
- Comparing plans: https://docs.github.com/en/get-started/learning-about-github/githubs-plans

---

### Slide 12 — GitHub Enterprise Cloud (GHEC)

**Talking Points:**
- GHEC = GitHub.com with enterprise features bolted on
- Enterprise account manages multiple organizations with unified billing and policies
- SAML SSO + SCIM for identity (Okta, Azure AD, OneLogin, etc.)
- Audit log streaming to SIEM (Splunk, Datadog, etc.), IP allow lists
- 50,000 Actions minutes/month, larger hosted runners (up to 64 cores)
- SOC 2 Type II and ISO 27001 certified
- Walk through the use cases checklist

**Links:**
- GHEC overview: https://docs.github.com/en/enterprise-cloud@latest/admin/overview/about-github-enterprise-cloud
- SAML SSO: https://docs.github.com/en/enterprise-cloud@latest/authentication/authenticating-with-saml-single-sign-on
- Audit log streaming: https://docs.github.com/en/enterprise-cloud@latest/admin/monitoring-activity-in-your-enterprise/reviewing-audit-logs-for-your-enterprise/streaming-the-audit-log-for-your-enterprise

---

### Slide 13 — Enterprise Managed Users (EMU)

**Talking Points:**
- EMU is a variant of GHEC where ALL user accounts are provisioned and managed by your IdP
- Users cannot create personal GitHub accounts — corporate identity controls everything
- **When to choose EMU:** strict identity governance, regulated industries (finance, govt, healthcare), full offboarding control
- **Critical trade-off:** EMU users CANNOT contribute to public repos or interact with GitHub.com outside the enterprise
- Choose EMU when isolation > ecosystem openness

**Links:**
- EMU overview: https://docs.github.com/en/enterprise-cloud@latest/admin/identity-and-access-management/using-enterprise-managed-users-for-iam/about-enterprise-managed-users

---

### Slide 14 — GitHub Enterprise Server (GHES)

**Talking Points:**
- GHES = self-hosted GitHub on your own infrastructure (on-prem or private cloud)
- Air-gapped support — fully disconnected from internet for classified/regulated environments
- Full data residency control — you own backups, HA, disaster recovery
- Full admin control — custom auth, hooks, integrations
- **Trade-offs:** You own the infra (patching, upgrades, HA, monitoring). GHES trails github.com by 3-6 months on features
- **GitHub Connect:** Bridge GHES to GitHub.com for hybrid benefits — hosted runners, Marketplace, Dependabot updates across the air gap

**Links:**
- GHES overview: https://docs.github.com/en/enterprise-server/admin/overview/about-github-enterprise-server
- GitHub Connect: https://docs.github.com/en/enterprise-server/admin/configuration/configuring-github-connect/about-github-connect
- GHES releases: https://docs.github.com/en/enterprise-server/admin/all-releases

---

### Slide 15 — Choosing the Right Deployment

**Talking Points:**
- Decision framework:
  - **Free/Team:** Startups, SMBs, open source, no compliance needs
  - **GHEC/EMU:** Large enterprises, SSO/SCIM needed, compliance + audit logs, no infra to manage
  - **GHES:** Air-gapped, strict data residency, full infra control, govt/defence/finance
- **Hybrid approach:** Many enterprises run GHEC for most teams + GHES for classified workloads, connected via GitHub Connect
- Ask participants: "Which model fits your organization?"

---

### Slide Q2 — Quiz: Deployment Options

**Question:** Which deployment option is best suited for a government agency needing air-gapped, on-premises GitHub?

**Answer:** ✅ GitHub Enterprise Server (GHES) — self-hosted, air-gap capable

**Explanation:** GHES is the only option that supports fully disconnected, air-gapped deployments. GHEC is cloud-hosted. GitHub Free lacks enterprise controls.

---

## SECTION 03: GitHub Advanced Security (GHAS)

### Slide 16 — Section Divider

**Talking Points:**
- Security is not an afterthought — GHAS embeds it directly into the developer workflow
- We'll cover the four core capabilities: Code Scanning, Secret Scanning, Dependabot, and Security Overview

---

### Slide 17 — What is GHAS?

**Talking Points:**
- GHAS = shift-left security. Find vulnerabilities at code review time, not post-deployment
- Four pillars: Code Scanning (SAST via CodeQL), Secret Scanning (200+ patterns), Dependabot (dependency alerts + auto-fix PRs), Security Overview (org-wide dashboard)
- Scanning happens automatically on every push and PR — developers don't have to remember to run security tools
- For participants from a compliance background: GHAS helps you meet SOC 2, ISO 27001, NIST, and PCI-DSS requirements

**Links:**
- GHAS overview: https://docs.github.com/en/code-security/getting-started/github-security-features
- GHAS for enterprises: https://docs.github.com/en/enterprise-cloud@latest/code-security

---

### Slide 18 — Code Scanning

**Talking Points:**
- SAST (Static Application Security Testing) — analyzes source code without executing it
- Powered by **CodeQL** — treats code as a queryable database. GitHub maintains the query library
- Detects: SQL injection, XSS, buffer overflows, path traversal, insecure deserialization, and more
- Supports: C/C++, C#, Go, Java, JavaScript, TypeScript, Python, Ruby, Swift, Kotlin
- **Third-party integration:** Any SARIF-compatible scanner (Semgrep, Snyk, Checkmarx, SonarQube) can push results to GitHub's unified alerts UI
- **PR Blocking:** Configure to block merges when high/critical severity vulnerabilities are found

**Links:**
- Code scanning docs: https://docs.github.com/en/code-security/code-scanning
- CodeQL docs: https://codeql.github.com/docs/
- SARIF format: https://docs.github.com/en/code-security/code-scanning/integrating-with-code-scanning/uploading-a-sarif-file-to-github

---

### Slide 19 — Secret Scanning

**Talking Points:**
- Scans every commit for 200+ secret patterns: API keys, tokens, passwords, certificates
- **Partner notifications:** GitHub auto-notifies providers (AWS, Azure, Slack, Stripe, Google) when their tokens are detected — even in public repos
- **Push Protection:** Blocks pushes containing secrets BEFORE they reach the repo — the strongest defense
- Key message: Any secret committed to a public repo should be treated as **compromised** — rotate immediately, even after removal from history (git history retains it)
- Push Protection gives developers an actionable error with remediation guidance

**Links:**
- Secret scanning docs: https://docs.github.com/en/code-security/secret-scanning
- Push protection: https://docs.github.com/en/code-security/secret-scanning/push-protection-for-repositories-and-organizations
- Supported patterns: https://docs.github.com/en/code-security/secret-scanning/secret-scanning-patterns

---

### Slide 20 — Dependabot

**Talking Points:**
- Three capabilities:
  1. **Dependabot Alerts:** Notifies when a dependency has a known CVE. Sources: GitHub Advisory Database
  2. **Security Updates:** Auto-opens PRs to bump vulnerable deps to the minimum patched version
  3. **Version Updates:** Keeps ALL deps up-to-date on a schedule (not just vulnerable ones)
- Supports: npm, pip, Maven, Gradle, NuGet, RubyGems, Cargo, Go modules, Docker, GitHub Actions, and more
- **Important:** Alerts and security updates are available on ALL plans (including Free). GHAS extends depth of detection in private repos
- Configure via `dependabot.yml` in `.github/` directory

**Links:**
- Dependabot docs: https://docs.github.com/en/code-security/dependabot
- dependabot.yml config: https://docs.github.com/en/code-security/dependabot/dependabot-version-updates/configuration-options-for-the-dependabot.yml-file
- GitHub Advisory Database: https://github.com/advisories

---

### Slide 21 — Security Overview Dashboard

**Talking Points:**
- Single pane of glass for ALL GHAS findings across every repo in an org
- Filter by severity, alert type, team, or repository — prioritize remediation
- Trend reporting: mean time to remediate, alert volume over time, security posture improvements
- What you can see: total open alerts by type & severity, repos with most critical alerts, GHAS coverage (enabled vs not), alert age and fix rate
- Enterprise-level roll-up view available for multi-org enterprises
- This is the dashboard security teams and CISOs love

**Links:**
- Security overview: https://docs.github.com/en/code-security/security-overview/about-security-overview

---

### Slide 22 — Demo: GHAS in Action

**Duration:** ~8 minutes

**Demo Script:**

1. **Enable Code Scanning**
   - Navigate to a demo repo → Settings → Code security and analysis
   - Click "Set up" next to Code Scanning → choose "Default" (CodeQL)
   - Show the Actions workflow that gets created
   - If alerts exist: navigate to Security tab → Code scanning alerts → click into one
   - Show: severity, description, affected file/line, remediation guidance

2. **Secret Scanning Alert**
   - Navigate to Security tab → Secret scanning
   - Show an example alert (or pre-plant a test secret like a revoked API key)
   - Walk through: what was found, where, when, and the remediation workflow
   - Show Push Protection settings: Settings → Code security → Push protection → Enable
   - (Optional) Demonstrate a blocked push with a dummy token

3. **Security Overview Dashboard**
   - Navigate to the org level → Security tab → Overview
   - Show the dashboard: alert counts by type, coverage metrics
   - Filter by severity (Critical/High) to show prioritization
   - Show trend graphs if available
   - Point out repos with GHAS disabled — opportunity to expand coverage

**Fallback:** Use GitHub's public demo org or pre-captured screenshots

**Links for Demo:**
- Demo repo for code scanning: https://github.com/github/codeql-action
- Public security advisories: https://github.com/advisories

---

### Slide Q3 — Quiz: GHAS

**Question:** What does Dependabot Security Updates do automatically?

**Answer:** ✅ Opens PRs to upgrade vulnerable dependencies to a patched version

**Explanation:** Code scanning does SAST (not Dependabot). Push Protection blocks secrets (not Dependabot). Dependabot specifically handles dependency vulnerabilities by auto-creating PRs with the minimum patched version.

---

## SECTION 04: GHAS Subscription & Plans

### Slide 23 — Section Divider

**Talking Points:**
- Now that you know what GHAS does, let's talk about availability and licensing
- Key question: what do you get for free vs what requires GHAS add-on?

---

### Slide 24 — GHAS Availability per Plan

**Talking Points:**
- Walk through the table row by row:
  - Dependabot Alerts: ✅ all plans (including Free)
  - Dependabot Security Updates: ✅ all plans
  - Secret Scanning (public repos): ✅ all plans
  - Code Scanning (private repos): ❌ Free/Team, ✅ GHEC/GHES with GHAS add-on
  - Secret Scanning (private repos): ❌ Free/Team, ✅ GHEC/GHES with GHAS
  - Security Overview Dashboard: ❌ Free/Team, ✅ GHEC/GHES with GHAS
- Key takeaway: Dependabot is free everywhere. The premium features (Code Scanning on private repos, Secret Scanning on private repos, Security Overview) require GHAS on Enterprise plans

**Links:**
- GHAS availability: https://docs.github.com/en/get-started/learning-about-github/about-github-advanced-security

---

### Slide 25 — GHAS Per-Committer Licensing

**Talking Points:**
- A "committer" = any unique user who committed to at least one GHAS-enabled private repo in the last 90 days
- Licensing is per unique committer, NOT per repo. One dev in 10 repos = 1 seat
- Billed per active committer per month on GHEC — enables gradual rollout
- **Rollout strategy:** Enable GHAS on high-risk repos first → monitor committer count → expand as the security program matures
- Example: 50 developers commit to GHAS-enabled repos → 50 seats. Bots that commit also count unless they're exempt GitHub Actions machine users
- Use the committer dashboard in enterprise settings to track usage

**Links:**
- GHAS billing: https://docs.github.com/en/billing/managing-billing-for-github-advanced-security/about-billing-for-github-advanced-security
- Viewing committers: https://docs.github.com/en/billing/managing-billing-for-github-advanced-security/viewing-your-github-advanced-security-usage

---

### Slide Q4 — Quiz: GHAS Plans

**Question:** A developer commits to 5 different GHAS-enabled repos in one month. How many GHAS seats does this consume?

**Answer:** ✅ 1 seat — unique committer regardless of repo count

**Explanation:** GHAS uses per-committer licensing. The same developer counts as one seat no matter how many GHAS-enabled repositories they commit to.

---

## SECTION 05: GitHub Copilot Overview

### Slide 26 — Section Divider

**Talking Points:**
- Shifting from security to productivity — GitHub Copilot
- We'll cover what it is, how it works, supported environments, and privacy

---

### Slide 27 — What is GitHub Copilot?

**Talking Points:**
- AI pair programmer built into your IDE — helps write, understand, test, and fix code
- **Inline completions:** Ghost-text appears as you type. Accept with Tab, reject with Esc
- **Copilot Chat:** Conversational AI in the IDE. Ask questions in natural language, get explanations, generate code, fix bugs
- **Agent Mode:** Autonomous multi-file editing — Copilot plans, executes, and validates complex changes
- **Productivity impact:** 55% faster task completion, 46% less mental fatigue (GitHub research)
- Copilot is not a replacement for developers — it's a force multiplier

**Links:**
- Copilot overview: https://github.com/features/copilot
- Copilot docs: https://docs.github.com/en/copilot
- Research on productivity: https://github.blog/news-insights/research/research-quantifying-github-copilots-impact-on-developer-productivity-and-happiness/

---

### Slide 28 — How Copilot Works Under the Hood

**Talking Points:**
- Walk through the 4-step pipeline:
  1. **Context Collection:** Open files, cursor position, recently viewed files, comments, repo structure
  2. **Prompt Construction:** Context assembled into a prompt, intelligently truncated to fit model token limits
  3. **LLM Inference:** Sent to GitHub-hosted models (GPT-4o, Claude, Gemini). Your code NEVER trains the model
  4. **Suggestion Delivery:** Completions filtered, ranked, and displayed as inline ghost text or chat responses
- **Privacy guarantee:** Copilot does NOT use your code to train AI models. With Business/Enterprise, prompts are not retained. Code stays private
- This is the #1 concern from security teams — address it directly

**Links:**
- How Copilot works: https://docs.github.com/en/copilot/about-github-copilot/how-github-copilot-works
- Privacy & data handling: https://docs.github.com/en/copilot/responsible-use-of-github-copilot-features/github-copilot-general-privacy-notice

---

### Slide 29 — Supported IDEs & Environments

**Talking Points:**
- **VS Code:** Full feature set — completions, chat, agent mode, edits, terminal assistance, extensions. The flagship experience
- **JetBrains IDEs:** IntelliJ, PyCharm, WebStorm, Rider, GoLand — completions and chat
- **Visual Studio:** C#, C++, VB.NET, .NET development with completions and chat
- **Neovim:** Inline completions via copilot.vim plugin
- **GitHub.com:** Chat on github.com, PR summaries and review suggestions, Issues
- **Mobile & CLI:** GitHub Mobile for chat, CLI for terminal command suggestions
- Ask: "Which IDEs does your team use?" — make it relevant

**Links:**
- Installing Copilot in VS Code: https://docs.github.com/en/copilot/using-github-copilot/getting-code-suggestions-in-your-ide-with-github-copilot
- JetBrains plugin: https://plugins.jetbrains.com/plugin/17718-github-copilot
- Copilot CLI: https://docs.github.com/en/copilot/using-github-copilot/using-github-copilot-in-the-command-line

---

### Slide 30 — Demo: Copilot Overview

**Duration:** ~7 minutes

**Demo Script:**

1. **Inline Completions (~2 min)**
   - Open VS Code with a Python or JavaScript file
   - Type a comment: `# function to calculate fibonacci sequence`
   - Show ghost-text appearing — accept with Tab
   - Type another comment: `# function to validate email address with regex`
   - Accept completion, show how the entire function is generated
   - Demonstrate: Tab to accept, Esc to reject, Alt+] / Alt+[ to cycle alternatives

2. **Copilot Chat (~3 min)**
   - Open Copilot Chat panel (Ctrl+Shift+I or click chat icon)
   - Ask: "Explain what this function does" with a function selected
   - Ask: "Write unit tests for this function"
   - Ask: "How can I optimize this code?"
   - Show: `/fix` command on a line with a bug
   - Show: `@workspace` to ask questions about the entire project

3. **Agent Mode (~2 min)**
   - Open Copilot Chat → switch to Agent mode
   - Ask: "Add input validation to all API endpoints in this project"
   - Show how Copilot creates a plan, edits multiple files, and explains what it did
   - Point out: agent mode can run terminal commands, install packages, run tests

**Fallback:** Pre-recorded GIF or short video if live demo has issues

---

### Slide Q5 — Quiz: Copilot Data Handling

**Question:** Which statement about Copilot's data handling is true?

**Answer:** ✅ With Business/Enterprise plans, prompts are not retained and code is never used for training

**Explanation:** Copilot never uses your code to train models (any plan). Business/Enterprise add the guarantee that prompts/snippets are not retained by GitHub.

---

## SECTION 06: Copilot Subscription & Plans

### Slide 31 — Section Divider

**Talking Points:**
- Four tiers: Free, Pro, Business, Enterprise
- Key decision factors: limits, admin controls, privacy, and enterprise features

---

### Slide 32 — Copilot Free & Pro

**Talking Points:**
- **Copilot Free:** 2,000 completions/month, 50 chat messages/month, GPT-4o mini. Available to all GitHub Free users — great for exploring
- **Copilot Pro ($10/month):** Unlimited completions + chat, access to GPT-4o/Claude/o3-mini, Copilot Extensions (MCP). For individual professional developers
- **Students & Teachers:** Copilot Pro is FREE via GitHub Education (verified students/educators at accredited institutions)
- **Free plan limits:** Designed for exploration. Teams should evaluate Business/Enterprise for unlimited access + admin controls + privacy

**Links:**
- Copilot pricing: https://github.com/features/copilot#pricing
- GitHub Education: https://education.github.com/
- Copilot Free announcement: https://github.blog/news-insights/product-news/github-copilot-in-vscode-free/

---

### Slide 33 — Copilot Business & Enterprise

**Talking Points:**
- **Business ($19/user/month):** All Pro features + org-managed, no prompt/snippet retention, content exclusions, audit log for usage
- **Enterprise ($39/user/month):** All Business features + Knowledge Bases (RAG over your internal docs), PR summaries & review on github.com, fine-tuned custom models
- When to upgrade Business → Enterprise: need Copilot to understand internal docs/wikis, automated PR summaries at scale, custom fine-tuned models
- Business is the sweet spot for most teams; Enterprise is for large orgs with extensive internal documentation

**Links:**
- Copilot Business: https://docs.github.com/en/copilot/copilot-business
- Copilot Enterprise: https://docs.github.com/en/copilot/github-copilot-enterprise/overview/about-github-copilot-enterprise
- Knowledge Bases: https://docs.github.com/en/copilot/github-copilot-enterprise/copilot-chat-in-github/managing-copilot-knowledge-bases

---

### Slide 34 — Copilot Plan Comparison Table

**Talking Points:**
- Walk through the table feature by feature:
  - Inline completions: 2,000/mo (Free) vs Unlimited (Pro/Business/Enterprise)
  - Chat: 50/mo (Free) vs Unlimited
  - No prompt retention: Business & Enterprise only
  - Org-level policy controls: Business & Enterprise only
  - Content exclusions: Business & Enterprise only
  - Knowledge Bases: Enterprise only
  - PR summaries: Enterprise only
- For most enterprise teams, **Business** is the starting point
- Evaluate Enterprise when you need Knowledge Bases or PR summaries at scale

---

### Slide Q6 — Quiz: Copilot Plans

**Question:** Which Copilot plan is the minimum required to enforce content exclusions across an organization?

**Answer:** ✅ Copilot Business — minimum plan with org-level policy controls

**Explanation:** Content exclusions are an org-level policy feature only available on Business and Enterprise plans. Free and Pro are individual plans without org admin controls.

---

## SECTION 07: Copilot Admin & Policy Controls

### Slide 35 — Section Divider

**Talking Points:**
- This section is especially relevant for org admins, team leads, and security teams
- Covers the controls you have to manage Copilot at scale

---

### Slide 36 — Organization-Level Settings

**Talking Points:**
- **Enable/Disable:** Toggle Copilot for all members or specific teams
- **Duplication Detection:** Block suggestions matching public code to reduce IP risk
- **Chat in IDE:** Control whether Chat is available org-wide or per team
- **Usage Metrics:** Acceptance rates, active users, languages — via API and dashboard
- Settings location: `github.com/organizations/{org}/settings/copilot`
  - Policies tab: duplication, chat, CLI settings
  - Access tab: seat assignments & team access
  - Content exclusions: file/path-level filtering
  - Usage: adoption metrics per user & team

**Links:**
- Copilot org settings: https://docs.github.com/en/copilot/managing-copilot/managing-github-copilot-in-your-organization
- Usage metrics API: https://docs.github.com/en/rest/copilot/copilot-usage
- Copilot metrics dashboard: https://docs.github.com/en/copilot/managing-copilot/managing-github-copilot-in-your-organization/reviewing-usage-data-for-github-copilot-in-your-organization

---

### Slide 37 — Content Exclusions

**Talking Points:**
- Content exclusions tell Copilot to **ignore specific files or paths** — won't use them as context or generate suggestions when editing them
- Use glob pattern syntax: `**/secrets/**`, `**/*.env`, `src/proprietary/**`
- Scoping: set at org level (applies to all repos) or per-repo via `.github/copilot-exclusions.yaml`
- **Use cases:** Exclude proprietary algorithms, secrets management code, PII data, regulated code
- Walk through the example config on screen

**Links:**
- Content exclusions: https://docs.github.com/en/copilot/managing-copilot/managing-github-copilot-in-your-organization/configuring-content-exclusions-for-github-copilot

---

### Slide 38 — Managing Seat Assignments

**Talking Points:**
- **Assigning:** Grant access to individual users or entire teams. Takes effect immediately
- **Revoking:** Remove access when people leave. Seats freed instantly, billing adjusts next cycle
- **Inactive cleanup:** Filter by "Last active" to find unused seats. GitHub flags seats idle 30+ days — reclaim to optimize costs
- **API automation:** Use `POST /orgs/{org}/copilot/billing/seats` to automate provisioning. Integrate with HR/SCIM for zero-touch lifecycle management
- Pro tip: Set up quarterly seat reviews to reclaim unused licenses

**Links:**
- Managing seats: https://docs.github.com/en/copilot/managing-copilot/managing-github-copilot-in-your-organization/managing-access-for-copilot-in-your-organization
- REST API for seats: https://docs.github.com/en/rest/copilot/copilot-business

---

### Slide 39 — Demo: Copilot Admin & Policy Controls

**Duration:** ~5 minutes

**Demo Script:**

1. **Org Settings Walkthrough (~2 min)**
   - Navigate to: `github.com/organizations/{demo-org}/settings/copilot`
   - Show Policies tab: duplication detection toggle, chat settings
   - Show Access tab: who has seats, team-level assignments
   - Show Usage tab: active users, acceptance rate chart, language breakdown

2. **Configure Content Exclusions (~1.5 min)**
   - Go to Content Exclusions section in org settings
   - Add an exclusion: `**/secrets/**`
   - Add another: `**/*.env`
   - Explain: these apply to all repos in the org
   - Show the per-repo option: `.github/copilot-exclusions.yaml`

3. **Seat Management (~1.5 min)**
   - Show the seat list with last active dates
   - Filter to find inactive seats (30+ days)
   - Demonstrate adding a user/team
   - Show the API endpoint for automation:
     ```
     POST /orgs/{org}/copilot/billing/seats
     {"selected_usernames": ["developer1", "developer2"]}
     ```

**Fallback:** Use screenshots if demo org is unavailable

---

### Slide Q7 — Quiz: Admin Controls

**Question:** What is the purpose of Copilot content exclusions?

**Answer:** ✅ To stop Copilot from using or generating suggestions for specified sensitive files or paths

**Explanation:** Content exclusions prevent Copilot from reading or suggesting code in sensitive areas. They don't limit languages or completion counts.

---

## SECTION 08: Q & A

### Slide 40 — Section Divider

**Talking Points:**
- Final section — let's recap what we covered and open the floor for questions

---

### Slide 41 — Key Takeaways

**Talking Points:**
- **GitHub Platform:** World's largest developer platform — full DevOps lifecycle in one place
- **Right Deployment:** Free/Team for SMBs, GHEC for enterprises, EMU for strict identity, GHES for air-gapped
- **GHAS = Shift Left:** Security embedded in the developer workflow — Code Scanning, Secret Scanning, Dependabot
- **Copilot at Every Level:** Free for exploration, Business for teams, Enterprise for org-wide AI with custom knowledge
- **Next Steps:** Evaluate your current plan, identify GHAS gaps in private repos, pilot Copilot Business with a small team, measure and expand

---

### Slide 42 — Resources & Further Reading

**Talking Points:**
- Point participants to the four resource categories on screen
- Highlight certifications: GitHub Foundations, GitHub Actions, GitHub Advanced Security
- Mention: GitHub Skills (skills.github.com) for hands-on exercises

**All Links:**

| Category | Link |
|----------|------|
| Official Docs | https://docs.github.com |
| GHAS Docs | https://docs.github.com/en/code-security |
| Copilot Docs | https://docs.github.com/en/copilot |
| GitHub Learning | https://learn.github.com |
| GitHub Skills | https://skills.github.com |
| Microsoft Learn - GitHub | https://learn.microsoft.com/en-us/training/github/ |
| GitHub Certifications | https://resources.github.com/learn/certifications/ |
| GitHub Pricing Calculator | https://github.com/pricing/calculator |

---

### Slide 43 — Open Discussion

**Talking Points:**
- Seed the conversation with common questions:
  - "Which plan fits your team's size and compliance needs?"
  - "How do you measure Copilot ROI?"
  - "What's the migration path from GHES to GHEC?"
  - "How do you roll out GHAS progressively?"
- Encourage participants to share their specific use cases and challenges
- Remind: InfoMagnus trainers are available for follow-up sessions and customized adoption roadmaps

---

### Slide 44 — Thank You

**Talking Points:**
- Thank everyone for their time and engagement
- Share contact info: training@infomagnus.com, github.com/infomagnus
- Remind about next steps and available resources
- Encourage them to reach out for follow-up demos or planning sessions
