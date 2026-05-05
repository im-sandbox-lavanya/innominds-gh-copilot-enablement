# Day 4 — Build, Design & Modernization: Speaker Notes

**Presentation:** `build-design-modernization.html`
**Duration:** ~2 hrs (slides + live demos)
**Audience:** Innominds developers (completed Days 1–3)

---

## Slide 1 — Title Slide

**Talking Points:**
- Welcome to Day 4 — the most hands-on, applied session of the week
- Today we take everything learned in Days 1–3 and apply it to real software engineering workflows
- We'll move through the **entire development lifecycle** with Copilot: from requirements → design → code → test → deploy → infrastructure
- 12 topics, each with practical demonstrations using the sample Express/TypeScript app
- Encourage participants to follow along in their own VS Code if possible

---

## Slide 2 — Trainer Introduction

**Talking Points:**
- Introduce yourself: name, GitHub certifications, background
- Quick check-in: "Who's already using Copilot in their daily work?" — use this to calibrate energy
- Mention: today is about applying Copilot to real engineering workflows — from requirements through to deployment

---

## Slide 3 — Session Agenda

**Talking Points:**
- Walk through the 12-block agenda grid quickly — this is a dense session
- Highlight the flow: we move from **how to prompt** (advanced) → **what to build** (requirements, design, diagrams) → **how to build** (features, upgrades, modernization) → **how to ship** (CI/CD, containers, IaC)
- Each section has a corresponding demo in the `demos/` folder
- The sample app (`sample-app/`) is a Node.js/Express/TypeScript REST API with users, orders, products — participants should keep it open
- Q&A is at the end, but questions during the session are welcome

---

## Slide 4 — Section: Prompting for Real Workflows

**Talking Points:**
- Transition: "You already know the prompting fundamentals — zero-shot, few-shot, chain-of-thought. Today we apply those skills to real engineering workflows and add team-scalable techniques."
- Keep this brief — this section is a bridge, not a deep-dive. The real learning happens in the demos and remaining topics.
- Three techniques: prompt files, prompt chaining, and constraints with guardrails. Everything else builds on these.

---

## Slide 5 — Three Techniques You'll Use All Day

**Talking Points:**
- Walk through the three cards quickly — participants will see these applied throughout the rest of the session.

1. **Reusable Prompt Files** — `.prompt.md` files in `.github/prompts/`. Parameterized templates with YAML frontmatter and `{{variable}}` placeholders. They appear in the Chat dropdown for any team member. Committed to the repo, shared via Git. Highest-ROI technique — write once, whole team benefits.

2. **Prompt Chaining** — Sequential prompts where each output feeds the next. This is exactly how we'll work through today's topics: requirements → stories → design → code → tests → deploy. No need to overthink it — just feed the output of one step into the next prompt.

3. **Constraints & Guardrails** — Combine what Copilot MUST do (pagination, sanitization, error format) with what it MUST NOT do (no `any` type, no extra dependencies) in the same prompt. This is the single most impactful pattern for improving output quality.

- **Tip box — "Building on the Fundamentals":** The prompting fundamentals (zero-shot, few-shot, chain-of-thought) are the foundation. Today adds the application layer — team-scalable techniques like prompt files and structured guardrails.

---

## Slide 6 — Techniques in Practice

**Talking Points:**
- **Left code block — Prompt File:** Walk through the `.prompt.md` syntax. YAML frontmatter sets `mode: agent` and `description`. The body uses `{{resource}}` as a placeholder. When a team member selects this from the Chat dropdown, they just fill in the variable.

- **Right code block — Constraints & Guardrails:** Show ✅ constraints (what TO do) and ❌ guardrails (what NOT to do) in the same prompt. This is the single most impactful pattern for improving Copilot output quality.

- **Tip box — Prompt Chaining:** Read through the four-step chain. Emphasize that this is exactly how we'll work through the remaining topics today — not a theoretical idea.

- **Quick Tips box:** Mention output format control ("Mermaid not PlantUML") and meta-prompting (asking Copilot to write prompts) as useful tips. They'll come up naturally in later demos.

**Demo Reference:** `demos/demo_01_prompt_engineering.md`

---

## Slide 7 — Section: Requirements → User Stories

**Talking Points:**
- Transition from prompting techniques to the first practical application
- This is where most real projects start — someone hands you a business requirement and you need to turn it into actionable work
- Copilot can accelerate this translation dramatically, but the **prompt quality** determines whether the stories are generic templates or genuinely useful

---

## Slide 8 — From Requirements to Working Code

**Talking Points:**
- Walk through the flow diagram left to right: Business Requirement → User Stories → Acceptance Criteria → Test Scenarios → Implementation. Each arrow represents a Copilot prompt that transforms one artifact into the next.
- This is prompt chaining in action — the technique from Slide 6 applied to the requirements lifecycle.

- Walk through the four capability cards:
  1. **Use Plan Mode** — Plan mode is ideal for the first step. It analyzes the requirement, asks clarifying questions, and produces a structured breakdown without making code changes. Switch to Agent mode only when you're ready to implement.
  2. **Prompt Files (.prompt.md)** — Create a team-standard prompt file for story generation. This ensures every developer on the team produces stories in the same format (user story template, acceptance criteria format, definition of done).
  3. **Auto-generate Test Cases** — Once you have acceptance criteria, Copilot can infer edge cases and generate test scaffolds. This catches scenarios humans often miss (empty inputs, boundary values, concurrent access).
  4. **Iterate with Context** — Reference existing user stories with `#file` to maintain terminology and scope consistency. If your project already has 20 stories, Copilot should match their style.

**Demo Reference:** `demos/demo_02_requirements_to_stories.md`

---

## Slide 9 — Section: Design & Architectural Artifacts

**Talking Points:**
- Transition: "Stories tell us WHAT to build. Design tells us HOW."
- Copilot excels at generating design artifacts because it can analyze your existing codebase and produce documentation that reflects reality — not aspirational architecture
- The key prompt pattern here is: analyze existing code first (Plan mode), then generate the artifact (Agent mode)

---

## Slide 10 — Artifacts Copilot Can Generate

**Talking Points:**
- Walk through the six artifact cards:
  1. **ADRs** — Architecture Decision Records. Prompt: "Generate an ADR for choosing PostgreSQL over MongoDB for our order service. Include context, decision, alternatives considered, and consequences." ADRs are often skipped because they're tedious — Copilot removes that excuse.
  2. **System Design Docs** — From codebase analysis. "Analyze #codebase and generate a system design document showing component architecture, data flow, and integration patterns."
  3. **Component Diagrams** — Mermaid syntax that renders in GitHub, VS Code preview, and docs. "Generate a Mermaid component diagram showing the service boundaries in this microservice architecture."
  4. **Interface Definitions** — TypeScript interfaces, API contracts, protobuf definitions. Agent can generate these from requirements or existing implementations.
  5. **Sequence Diagrams** — Interaction flows. "Generate a Mermaid sequence diagram showing the order creation flow from API request through auth, validation, payment, and database."
  6. **Trade-off Analysis** — "Compare REST vs GraphQL for our API layer. Include pros, cons, and recommendation based on #codebase."

- **Tip box:** Emphasize the two-mode approach: Plan mode to analyze, Agent mode to generate. Don't jump straight to generation — analysis first produces more accurate artifacts.

**Demo Reference:** `demos/demo_03_design_artifacts.md`

---

## Slide 11 — Section: ER, Class Diagrams & OpenAPI

**Talking Points:**
- Transition: "Now we get into the technical diagrams that developers actually reference daily."
- Three artifact types: ER diagrams (data model), class diagrams (OOP structure), and OpenAPI specs (API contracts)
- All three can be generated from existing code — Copilot reads your models and routes to produce accurate diagrams

---

## Slide 12 — Technical Diagram Generation

**Talking Points:**
- **Left panel — ER & Class Diagrams:**
  - Walk through the prompt example: "Analyze #file:models/ and generate a Mermaid ER diagram." The `#file:models/` reference is critical — it gives Copilot the actual data model to work from.
  - Show the Mermaid output: `USER ||--o{ ORDER : places` means a user has zero or many orders. This syntax renders natively in GitHub Markdown and VS Code preview.
  - For class diagrams, the prompt changes to: "Generate a Mermaid class diagram with all properties, methods, and inheritance relationships."

- **Right panel — OpenAPI / Swagger:**
  - Walk through the prompt: "Generate an OpenAPI 3.0 spec for the REST endpoints in #file:routes/." This produces a Swagger-compatible YAML that can be used with Swagger UI, code generators, or API gateways.
  - Emphasize including "request/response schemas, error codes, and examples" — without this, the spec will be incomplete.

- **Tag row:** Copilot supports generating all these formats: Mermaid, PlantUML, OpenAPI 3.0, Swagger, AsyncAPI, and GraphQL Schema. Use output format control (from Slide 6) to specify exactly which format you want.

**Demo Reference:** `demos/demo_04_er_class_openapi.md`

---

## Slide 13 — Section: Codebase Analysis, Documentation & User Guides

**Talking Points:**
- Transition: "We're combining three related topics — analysis, docs, and guides."
- This section uses the `#codebase` and `@workspace` features heavily
- The common thread: Copilot reads your code and produces human-readable content from it

---

## Slide 14 — Codebase Analysis with Copilot

**Talking Points:**
- Walk through the four analysis capabilities:
  1. **Architecture Questions** — Natural language questions about your codebase. "Where is authentication handled?" triggers semantic search across all files. This is immensely valuable for onboarding new developers or understanding unfamiliar codebases.
  2. **Dependency Mapping** — "Trace the call chain from the /orders POST endpoint to the database." Copilot follows imports, function calls, and middleware chains.
  3. **Pattern Detection** — "Find exceptions without a catch block." "Find all API endpoints without input validation." These audit queries catch issues that are tedious to find manually.
  4. **Key Metrics Extraction** — "Which files have the highest cyclomatic complexity?" "Where are the test coverage gaps?" These provide quantitative insights for tech debt prioritization.

- **Workspace Search flow:** Walk through the five search strategies Copilot uses: Semantic Search (`#codebase`), Text Search (keyword matching), Grep (regex patterns), Find Usages (symbol references), and File Search (glob patterns). Agent mode uses all five automatically — it chooses the right strategy based on the question.

**Demo Reference:** `demos/demo_05_codebase_analysis_docs.md`

---

## Slide 15 — Documentation & User Guide Generation

**Talking Points:**
- Walk through the three documentation types:
  1. **README Generation** — "Analyze #codebase and generate a comprehensive README with project overview, setup instructions, usage examples, API reference, and contributing guidelines." This produces a real README, not a template — it references your actual tech stack, config files, and scripts.
  2. **API Documentation** — JSDoc, docstrings, Swagger UI docs generated from endpoint implementations. Use `/doc` inline to add doc comments to individual functions.
  3. **End-User Tutorials** — Step-by-step guides generated from code workflows and tests. "Generate a tutorial for using the order API: creating an account, placing an order, and checking status."

- **Left code block — Prompt Template:** Show the `.prompt.md` file for README generation. This is a reusable prompt file (from Slide 5) applied to documentation. Any team member can run it to regenerate docs when code changes.

- **Right column — Key Capabilities:**
  1. **Consistent Templates** — Prompt files ensure docs follow the same structure every time
  2. **Multi-format Output** — Same source can produce Markdown, HTML, JSDoc, Swagger
  3. **Keep Docs in Sync** — Agent mode can update docs when code changes: "Update the README to reflect the new /payments endpoint I just added"

**Demo Reference:** `demos/demo_06_user_guide_preparation.md`

---

## Slide 16 — Section: New Feature Implementation

**Talking Points:**
- Transition: "We've covered planning and documentation. Now we build."
- This section demonstrates the Plan → Agent workflow for implementing a new feature end-to-end
- The sample app gets a real feature addition — participants see the full cycle

---

## Slide 17 — Plan Mode Workflow

**Talking Points:**
- Walk through the five-step flow diagram:
  1. **Describe Goal** — Start with a high-level description of the feature. Don't over-constrain — let Plan mode ask questions.
  2. **Analyze Codebase** — Plan mode reads your project structure, existing patterns, dependencies, and conventions.
  3. **Generate Plan** — Produces a numbered step-by-step implementation plan with file-level changes described.
  4. **Review & Iterate** — You can ask follow-ups: "What about rate limiting?" "Add database migration steps." The plan evolves.
  5. **Hand Off** — Send the plan to Agent mode for execution, or to Cloud Agent for a PR.

- Walk through the four capability cards:
  1. **Structured Planning** — Plan mode creates a summary, implementation steps, and verification steps before any code is written. This prevents "code first, think later."
  2. **Multi-Destination Handoff** — The plan can be executed locally (Agent), in background (CLI), or in the cloud (PR). Choose based on complexity and review needs.
  3. **Session Memory** — Plans are auto-saved to session memory. If you close the tab and reopen, the plan is still there. You can also reference it in subsequent prompts.
  4. **Custom Planning Agents** — Define custom agents (`.github/agents/`) that enforce architectural guidelines during planning. For example, an agent that requires all new features to include database migration steps.

**Demo Reference:** `demos/demo_07_feature_implementation.md`

---

## Slide 18 — Agent Mode

**Talking Points:**
- Three columns showing the three agent execution environments:

1. **Local Agent (Interactive)** — This is what participants have been using in VS Code. Full workspace access, real-time review, accept/reject per file. Interactive: the agent pauses for terminal command approval. Best for features you want to review as they're built.

2. **CLI / Background** — The standalone `copilot` binary runs in your terminal. Uses Git worktrees for isolation (doesn't touch your working branch). Runs asynchronously — you can continue other work. Checkpoints allow safe rollback. Best for large-scale changes like codebase-wide refactors.

3. **Cloud Agent** — Runs in GitHub's cloud infrastructure. Creates branches automatically, implements code, and opens PRs. Team collaboration via normal PR review process. Accessible from GitHub.com, Slack, or Teams. Best for async workflows and team tasks.

- **Tip box — Agent Workflow:** Emphasize the self-correction loop: Goal → steps → edit → run commands → self-correct on failure → complete. The "self-correct on failure" step is what makes agents genuinely useful — they don't just try once and fail.

---

## Slide 19 — Choosing the Right Mode

**Talking Points:**
- Walk through the comparison table:
  - **Plan** — Creates plans, does NOT edit files or run commands. Use for strategy before execution.
  - **Agent** — Full execution: edits files, runs terminals, self-corrects. Use for building.
  - **Ask** — Read-only Q&A. Use for learning and exploration.
  - All three search the workspace — the difference is what they DO with the results.

- **Decision framework:** Ask for quick questions → Plan to strategize → Agent to execute. You wouldn't use Agent mode to answer "what does this function do?" — that's Ask mode.

- **Permission Levels warning box:** This is important for enterprise teams:
  - **Default:** Safe tools auto-approved (file reads, searches), risky tools need confirmation (terminal commands, file writes)
  - **Bypass:** Auto-approves all tools. Use in trusted environments only.
  - **Autopilot (Preview):** Fully autonomous until task completion. No human checkpoints. Experimental — use with caution.

---

## Slide 20 — Section: Tech Upgrade & Modernization

**Talking Points:**
- Transition: "This is where Copilot's agent capabilities truly shine."
- Framework upgrades and tech migrations are tedious, error-prone, and high-risk. They're also highly systematic — which makes them ideal for AI assistance.
- We'll cover two patterns: version upgrades (Spring Boot 2→3) and full tech migrations (Angular→React)

---

## Slide 21 — Tech Upgrade: Spring Boot 2 → 3

**Talking Points:**
- Walk through the four-stage pipeline:
  1. **Analyze Current State** — Plan mode scans the project: identifies Spring Boot version, all deprecated APIs, javax namespace usage, configuration format. Produces a comprehensive audit before any changes.
  2. **Generate Migration Plan** — Identifies breaking changes: javax → jakarta namespace migration (hundreds of imports), deprecated API replacements, new configuration properties, dependency version bumps.
  3. **Execute with Agent Mode** — Agent updates `pom.xml`/`build.gradle`, performs the namespace migration across all files, updates deprecated method calls, runs `mvn compile` after each batch, self-corrects on failures.
  4. **Verify & Open PR** — Cloud agent runs the full test suite, generates a PR summary listing all changes, and opens a reviewable PR. Team reviews the migration as a normal code change.

- **Tip box — Reference Official Docs:** The `#fetch` command pulls migration guides from the web. This gives Copilot access to the latest official migration documentation, not just its training data. Especially useful for version-specific changes.

- Note: This same pattern works for any framework upgrade: Node.js major versions, Django version bumps, .NET framework migrations, etc.

**Demo Reference:** `demos/demo_08_tech_upgrade.md`

---

## Slide 22 — Tech Modernization: Angular → React

**Talking Points:**
- **Comparison grid:** Walk through the conceptual mapping between Angular and React concepts:
  - Templates & decorators → JSX with hooks
  - Two-way binding → Unidirectional data flow
  - Dependency injection → Context API / Zustand
  - RxJS → React Query / SWR
  - NgModules → React Router with lazy loading

  This mapping is what Copilot uses internally when translating components. Understanding it helps developers review the generated code.

- **Four capability cards:**
  1. **Incremental Migration** — Copilot helps run Angular and React side-by-side using Module Federation or wrapper components. You don't need to migrate everything at once.
  2. **Code Translation** — Agent converts components one at a time, preserving business logic. It handles template syntax transformation, lifecycle mapping, and state management translation.
  3. **Test Migration** — Jasmine/Karma tests translated to Jest/Testing Library equivalents. Test logic is preserved; only the framework-specific syntax changes.
  4. **Build Verification** — Agent runs builds after each migration step. If the Angular + React hybrid build breaks, it self-corrects before proceeding.

- Key message: Don't expect Copilot to migrate your entire app in one prompt. Use it **component by component**, verify each migration works, then proceed. Prompt chaining (from Slide 5) is the right pattern here.

**Demo Reference:** `demos/demo_09_tech_modernization.md`

---

## Slide 23 — Section: CI/CD, Containers & Infrastructure as Code

**Talking Points:**
- Transition: "Code is written. Now we need to ship it."
- This final technical section covers the three pillars of modern deployment: GitHub Actions workflows, Docker containerization, and Terraform infrastructure provisioning.
- All three are generated from natural language descriptions of your deployment requirements.

---

## Slide 24 — CI/CD Pipeline with GitHub Actions

**Talking Points:**
- Walk through the five-stage flow: Build → Test → Scan → Containerize → Deploy. This is a standard production pipeline that every project needs.

- **Left code block — Generated Workflow:** Walk through the YAML structure. Copilot generates valid GitHub Actions YAML with proper triggers, job definitions, running steps, and action references. The key here is being specific about your requirements: "Node.js 20, PostgreSQL service container for integration tests, deploy to Azure App Service."

- **Right column — What Copilot Generates:**
  1. **Multi-environment workflows** — Dev, staging, production with approval gates. Use: "Generate separate deploy jobs for staging (auto) and production (manual approval)."
  2. **Security scanning steps** — SAST, dependency audit, secret scanning. Copilot knows the standard GitHub security actions.
  3. **Matrix builds & caching** — Multi-version testing (Node 18, 20, 22) with dependency caching for faster runs.

- Pro tip: Tell Copilot to use the negative prompting pattern here — "Do NOT use deprecated action versions (e.g., actions/checkout@v3), always use the latest major version."

**Demo Reference:** `demos/demo_10_cicd_pipeline.md`

---

## Slide 25 — Containerization with Copilot

**Talking Points:**
- **Left code block — Multi-stage Dockerfile:** Walk through the two-stage build:
  - Stage 1 (`builder`): Installs dependencies, builds the app. This layer contains dev dependencies and build tools.
  - Stage 2 (`runtime`): Copies only the built artifacts. Alpine base for minimal size. No dev dependencies in production.

  This is a security and size optimization best practice that Copilot generates automatically when prompted correctly: "Generate a multi-stage Dockerfile for a Node.js/TypeScript app with production optimization."

- **Right code block — Docker Compose:** Multi-service configuration: app + database + volumes for persistence. Copilot generates proper dependency ordering (`depends_on`), health checks, and volume mounts.

- **Three capability cards:**
  1. **Optimized Images** — Multi-stage builds, Alpine base, minimal layers for small image size
  2. **Security Best Practices** — Non-root user, `.dockerignore` to exclude secrets, no credentials in the image
  3. **Multi-service Compose** — App + DB + Cache (Redis) + Reverse proxy (Nginx) configs

- Constraint-driven prompting is especially useful here: "The final image must be under 150MB, must run as non-root, and must not contain node_modules or .env files."

**Demo Reference:** `demos/demo_11_containerization.md`

---

## Slide 26 — Infrastructure as Code — Terraform

**Talking Points:**
- **Left code block — Terraform Example:** Walk through the Azure resources: resource group, service plan, and Linux web app. Copilot generates valid HCL with proper resource naming, attribute references, and dependency chains.

- **Right column — What Copilot Generates:**
  1. **Modular Structure** — Variables, outputs, modules, and environment-specific `.tfvars` files. Not a monolithic `main.tf` — proper Terraform project structure.
  2. **Multi-cloud Resources** — AWS, Azure, GCP — Copilot knows all three provider APIs. Specify the cloud and Copilot uses the correct resource types.
  3. **Security & Compliance** — Network policies, IAM roles, encryption at rest. Use constraint-driven prompting: "All storage must have encryption at rest enabled, all network access must go through Private Endpoints."
  4. **State Management** — Remote backend setup (Azure Blob, S3, GCS), state locking, workspace configuration.

- **Tag row:** Copilot supports generating Terraform, AWS CDK, Pulumi, Bicep, CloudFormation, and Kubernetes YAML. Use output format control to specify exactly which IaC format your team uses.

**Demo Reference:** `demos/demo_12_infrastructure_as_code.md`

---

## Slide 27 — Copilot-Powered Development Lifecycle

**Talking Points:**
- This is the "big picture" slide — connect all 12 topics into a single continuous workflow:
  - **Requirements** (Slide 8) → **Design** (Slides 10, 12) → **Code** (Slides 17–18) → **Review** (Agent + PR) → **Test** (auto-generated) → **Deploy** (Slides 24–26)
- Copilot assists at **every stage** — it's not just a code completion tool, it's a development lifecycle accelerator.

- **Stats cards:** Reference these numbers briefly:
  - 55% faster task completion — GitHub/Microsoft research
  - 46% of new code written by Copilot — in enabled repos
  - 75% more fulfilled developers — self-reported satisfaction
  - 1.5M+ active Copilot developers globally

- Caveat: these numbers represent averages. Individual impact depends on prompt quality, task type, and how deeply teams adopt the techniques covered this week.

---

## Slide 28 — Key Takeaways

**Talking Points:**
- Six takeaway cards — spend 15–20 seconds on each:

1. **Prompt Precision** — Everything starts with the prompt. Use `#file`, `#codebase`, custom instructions, and the advanced techniques from today (constraints, negation, chaining).

2. **Plan Before Build** — Plan mode for strategy, Agent mode for execution. Always analyze before changing. This prevents wasted iterations.

3. **Full Lifecycle Support** — Copilot isn't just for writing code. Requirements, design, documentation, testing, deployment, infrastructure — everything benefits.

4. **Modernization at Scale** — Framework upgrades and tech migrations are where agents provide the most dramatic productivity gains. The self-correction loop handles the tedious error-fix-retry cycle.

5. **DevOps Automation** — CI/CD pipelines, Dockerfiles, Terraform scripts — generate production-ready infrastructure from natural language. Use constraint-driven prompting for quality.

6. **Living Documentation** — READMEs, API docs, and user guides stay in sync with code. Use prompt files for repeatable generation.

---

## Slide 29 — Copilot Context Quick Reference

**Talking Points:**
- This is a reference card — don't read every row. Highlight the 2–3 that are new or most useful:
  - `#fetch` — Retrieve web content. Many developers don't know this exists. Great for pulling migration guides, API docs, and release notes directly into a prompt.
  - `.prompt.md` — Reusable prompt templates. Today's key takeaway.
  - `Plan (mode)` — Select from the mode dropdown. Remind them: Plan first, Agent second.
- Tell participants to screenshot or bookmark this slide — it's a practical cheat sheet.

---

## Slide 30 — Q & A

**Talking Points:**
- Open the floor for questions. This has been a dense session — expect questions.
- If there's a lull, have discussion starters ready:
  - "Which of today's topics would have the most impact on your current project?"
  - "Has anyone tried prompt chaining for a multi-step task? What was the experience?"
  - "What framework upgrade or migration is on your team's backlog that we could apply what we learned today?"
  - "What's the most tedious repetitive task in your workflow that you'd like to automate with a prompt file?"

- Tease Day 5: Quality, Security & Optimization — where we focus on code review, test generation, vulnerability scanning, and performance optimization with Copilot.
- Thank the audience for their time and encourage them to practice the demo exercises against the `sample-app/` project.

---

## General Presentation Tips

- **Pacing:** This is a 12-topic session. Budget ~8–10 min per topic including demos. Watch the clock.
- **Demos:** If a demo takes too long or Copilot produces unexpected output, pivot: "This shows why iterative prompting matters — let me refine." Never fight a bad output live.
- **Model selection:** Claude Sonnet 4 for reasoning-heavy demos (design docs, migrations). GPT-4.1 for speed-critical demos (quick generations, format conversions).
- **Sample app:** Have the `sample-app/` project pre-loaded with all dependencies installed. Run `npm install` before the session.
- **Participant engagement:** After each section, do a quick show-of-hands: "Who's done this manually before? How long did it take?" Then show the Copilot version.
