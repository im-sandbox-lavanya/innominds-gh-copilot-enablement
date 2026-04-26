# Day 3 — Context Setting & Advanced Prompting: Speaker Notes

---

## Slide 1: Title Slide

Welcome everyone to Day 3. Today we shift from using Copilot as a code-completion tool to truly mastering it. We'll cover how Copilot's context engine works under the hood, how to feed it the right information, and how to write prompts that get high-quality results on the first try. We'll also dive into agentic workflows — where Copilot goes from assistant to autonomous teammate. This is arguably the most impactful session of the week for your day-to-day productivity.

---

## Slide 2: Trainer Introduction

Brief self-introduction. Mention relevant experience with GitHub Copilot and large-scale developer enablement. Keep it under one minute — attendees are eager to get into the technical content.

---

## Slide 3: Session Agenda

Walk through the ten-block agenda quickly. Emphasize that the session is roughly split into two halves: the first half focuses on context and prompting fundamentals; the second half is all about agentic workflows — agent mode, @workspace, MCP, and the Copilot CLI. Each theory block is followed by a live demo so participants see these concepts applied in real code. Encourage questions at any point rather than holding them to the end.

---

## Slide 4: Section — Why Context Matters

Transition into the first topic. The core message here: Copilot is only as good as the context you provide. Developers often treat Copilot like a magic black box, but it's more like a brilliant colleague who can only see what you show them. Understanding what Copilot sees — and doesn't see — is the single biggest lever for improving suggestion quality.

---

## Slide 5: How Copilot Gathers Context

Walk through the five-stage flow diagram from left to right:

1. **Current File** — Code above and below the cursor is the highest-weight signal. This is why well-named variables and descriptive comments matter so much — Copilot literally reads them.
2. **Open Tabs** — Copilot scans neighboring files and import chains in your open editor tabs. If you're writing a service, having the corresponding model and types file open dramatically improves suggestions.
3. **Workspace Index** — In chat and agent modes, Copilot performs semantic search across all indexed files. This is more powerful but has a token-budget limit.
4. **Chat History** — Prior messages in the same conversation thread carry forward as context. This is why starting a fresh thread for a new task is recommended.
5. **Instructions** — Custom instruction files (copilot-instructions.md) are auto-injected into every request.

Emphasize the **Context Priority Order** on the right: selected/highlighted code is the strongest signal, followed by the current file, open tabs, workspace index, and finally instruction files. The takeaway: "garbage in, garbage out" — vague names and no comments produce vague suggestions.

---

## Slide 6: Context Sources — What Copilot Actually Reads

This slide clarifies that different Copilot interfaces have access to different context scopes:

- **Inline completions** are the most constrained — they only see the current file and open tabs. No workspace search, no chat history.
- **Copilot Chat** adds chat history, explicit `#file` references, and selected code.
- **Agent Mode** is the most powerful — it has full access via semantic search, grep search, file reads, terminal output, and MCP tools.

Highlight the warning box: for complex tasks, don't fight with inline completions. Switch to Chat or Agent mode to give Copilot the full picture. This is a common mistake — developers stay in inline mode and wonder why suggestions are poor for cross-file tasks.

---

## Slide 7: Section — Context Setting Techniques

Transition. Now that attendees understand what Copilot sees, this section teaches practical techniques to control and optimize that context. These are actionable habits they can start using immediately.

---

## Slide 8: Context Optimization Strategies

Walk through each of the six strategies:

1. **Pin Key Files** — Architecture docs, interfaces, and config files should stay pinned. If you're working on the order service, pin the Order model, the API contract types, and the database config.
2. **Order Tabs by Relevance** — Copilot weighs recently-focused tabs higher. Before prompting, click into the most relevant files to bring them to the top of context.
3. **Use Comments as Anchors** — This is Copilot's strongest signal for inline completions. A well-written comment like `// Validate that the user has permission to cancel this order` right before a function is far more effective than no comment at all.
4. **Select Before Asking** — When using Chat, highlight the exact code block you want help with rather than referencing "the function above." Selection gives laser-focused context.
5. **Use Exact Code Terms** — Say `PaymentService.processRefund()`, not "the payment module." Copilot can find exact references; vague descriptions make it guess.
6. **Close Irrelevant Files** — Too many open tabs introduce noise. If you're done with a file, close it. Five focused tabs beat twenty random ones.

---

## Slide 9: Explicit Context References in VS Code

Walk through the reference table on the left:

- `#file` — Adds a specific file to chat context. Use this when you know exactly which file matters.
- `#codebase` — Forces a semantic search across the entire workspace. Use for broad questions.
- `#selection` — Includes currently highlighted code. Very useful with Ctrl+I inline chat.
- `#terminalSelection` — Includes terminal output, such as error messages. Great for debugging.
- `@workspace` — Scopes the entire query to the workspace participant for codebase-wide questions.

Show the code examples on the right. Emphasize the **Pro Tip**: combining `#file:types.ts` with selected code and a specific question gives you the most precise answers. It's like handing someone exactly the documents they need to answer your question.

---

## Slide 10: Demo — Context Setting & File References

**Demo Flow:**
1. Open relevant tabs (model, service, route) and show how inline completions improve.
2. Demonstrate `#file` in Chat to reference a specific module.
3. Show `#selection` by highlighting code and asking "explain this" or "refactor this."
4. Use `@workspace` to ask "Where is authentication handled?" and show how it traces across multiple files.
5. Close irrelevant tabs and show how suggestion quality changes.

Refer participants to `demos/demo_01_context_setting.md` for the full runbook they can follow along or revisit later.

---

## Slide 11: Section — Custom Instructions

Transition. We've covered dynamic context (tabs, selections, references). Now we move to **static context** — persistent instructions that are automatically injected into every Copilot request. This is how teams standardize Copilot behavior across a repository.

---

## Slide 12: Repository-Wide Custom Instructions

Walk through the code example on the left:

- The file lives at `.github/copilot-instructions.md` and is in plain Markdown.
- It includes the repository overview (tech stack, languages), coding conventions (functional components, named exports, JSDoc), and testing standards (Vitest, 80% coverage).
- This file is **auto-injected** into every Copilot request from anyone working in this repo — no manual reference needed.

On the right, highlight three key points:
1. **File Location** — `.github/copilot-instructions.md`. It must be exactly this path.
2. **What to Include** — Project overview, stack, conventions, build commands, testing standards, file structure.
3. **Priority Order** — Personal instructions override org instructions, which override repo instructions. So individual developers can have their own preferences that take precedence.

Mention that this is one of the highest-ROI things a team lead can do — write this file once and every developer on the team gets better Copilot suggestions immediately.

---

## Slide 13: Path-Specific & Agent Instructions

Two columns here:

**Left — Path-Specific Files:**
- Stored in `.github/instructions/` directory.
- The YAML frontmatter `applyTo: "**/*.ts,**/*.tsx"` controls when these rules activate.
- Great for language-specific rules (TypeScript strictness), folder-specific rules (API folder conventions), or test-specific rules.
- Show the tag examples: `*.ts`, `*.py`, `src/api/**`, `**/tests/**`.

**Right — Agent Instructions:**
- `.github/AGENTS.md` — Universal instructions for all AI agents (Copilot, Claude, etc.) working on the repo.
- `CLAUDE.md` / `GEMINI.md` — Model-specific instructions. The nearest file in the directory tree wins (like `.gitignore` resolution).
- **Auto-Generation** — Mention that GitHub now offers an agent at `github.com/copilot/agents` that can auto-generate these instruction files by analyzing your codebase.

---

## Slide 14: Demo — Custom Instructions Setup

**Demo Flow:**
1. Create a `copilot-instructions.md` file from scratch — show the immediate effect on Copilot output.
2. Add a path-specific instruction file (e.g., TypeScript strict rules) and demonstrate with a `.ts` file.
3. Show AGENTS.md configuration.
4. Do a before/after comparison: ask the same question with and without custom instructions to show the difference.

Refer to `demos/demo_02_custom_instructions.md`.

---

## Slide 15: Section — Prompt Engineering Fundamentals

Transition. With context mastered, we now focus on the prompt itself. How you ask matters as much as what Copilot sees. This section covers the four foundational prompting strategies that every developer should have in their toolkit.

---

## Slide 16: 4 Core Prompting Strategies

Walk through each quadrant:

1. **Zero-Shot** — Direct instruction, no examples. Works for well-defined tasks: "Generate TypeScript interfaces for a REST API with auth and refresh tokens." Best when the task is standard and unambiguous.

2. **Few-Shot** — Provide input/output examples. The key insight: instead of describing the pattern, show it. "findDates('meeting 11/14/23 and 12-1-23') → ['11/14/23', '12-1-23']". Copilot then generalizes from your examples. Essential for custom formats or business logic.

3. **Role-Based** — Assign a persona: "You are a security architect. Review this auth flow for vulnerabilities." This shapes the depth, focus, and vocabulary of the response. Great for reviews, documentation, and specialized analysis.

4. **Chain-of-Thought** — Break reasoning into explicit steps. Instead of "refactor this monolith," say "Step 1: Identify dependencies. Step 2: Map states. Step 3: Extract services." Forces Copilot to show its reasoning, which catches errors early and produces better results for complex tasks.

Point out that these strategies are combinable — you can use role-based + chain-of-thought together for maximum effect.

---

## Slide 17: Prompting Best Practices

Two-column comparison — read through a few key items from each:

**Do This:**
- Start broad, then refine iteratively. Don't try to write the perfect prompt on the first try.
- Give examples — input/output pairs or even unit tests as specifications.
- Break complex tasks into smaller steps. Don't ask for an entire feature at once.
- Use exact names like `createUser()` instead of "the function."
- Start new chat threads for different tasks to keep context clean.
- Keep your existing code clean — Copilot mirrors your coding style.

**Avoid This:**
- "What does this do?" — ambiguous. What is "this"?
- "Use the common library" — which one exactly?
- One giant prompt for a full feature — break it down.
- Ignoring failed results — iterate and guide instead of giving up.
- Keeping irrelevant chat history — it clutters the context window.

The **Golden Rule** at the bottom is important: the best prompt is often well-written code with descriptive names and a leading comment. Copilot completes what you start. If your variable is called `x`, suggestions will be vague. If it's `userAuthToken`, they'll be precise.

---

## Slide 18: Demo — Prompt Engineering Techniques

**Demo Flow:**
1. Zero-Shot vs Few-Shot: same task, different approaches — show quality difference.
2. Role-Based: "You are a database architect" vs. default for schema design.
3. Chain-of-Thought: complex refactoring broken into explicit steps in Chat.
4. Iterative Refinement: start with a broad prompt, notice gaps, refine with follow-ups.

Refer to `demos/demo_03_prompt_engineering.md`.

---

## Slide 19: Section — Advanced Prompting

Transition. Now we take prompting to the next level. These are the patterns that experienced Copilot users rely on for complex, real-world tasks — test-driven prompting, design pattern generation, and multi-file refactoring.

---

## Slide 20: Advanced Prompting Patterns

Three cards:

1. **Test-Driven Prompting** — Write tests first, then ask Copilot to implement code that passes them. This flips the typical workflow: tests become your specification. "Write unit tests for calculateMortgage covering valid inputs, edge cases (0 rate, 0 months), and invalid inputs using Vitest. Then generate the function that passes all tests." This produces better code because the success criteria are explicit.

2. **Design Pattern Generation** — Ask for specific GoF patterns with typed interfaces. "Implement the Observer pattern for an event bus with TypeScript generics." Copilot knows these patterns well. The key is being specific about which pattern, what types, and what context.

3. **Complex Refactoring** — Extract modules, migrate frameworks, restructure architectures. "Extract payment validation from checkout.ts into a new PaymentValidator service." The key is describing both the current state and desired end state clearly.

Highlight the example at the bottom — test-driven prompting in action. This is one of the most powerful patterns and often surprises developers who haven't tried it.

---

## Slide 21: Multi-File Edit Strategies

Walk through the four numbered steps on the left:

1. **Describe the Target Architecture** — Tell Copilot where you are and where you want to be.
2. **Reference All Affected Files** — Use `#file` or `@workspace` to include every file involved.
3. **Ask for Coordinated Changes** — Imports, exports, type changes, and test updates should all happen together.
4. **Review & Iterate** — Accept or reject file by file. Ask follow-ups for missed edges.

On the right, walk through the example: extracting payment validation from checkout.ts. Show how Agent mode autonomously creates the new file, moves logic, updates imports in multiple files, creates a test file, and runs tests to verify. This is where Agent mode truly shines — it handles the coordination burden.

Emphasize the tip box: for multi-file edits, always use Agent mode. It's purpose-built for this workflow.

---

## Slide 22: Demo — Advanced Prompting & Multi-File Edits

**Demo Flow:**
1. Test-Driven Prompting: write tests first, then generate implementation.
2. Design Pattern: ask for a specific pattern with TypeScript generics.
3. Cross-File Refactoring: extract a service into its own module, update all references.
4. Agent Mode in Action: show the autonomous plan → implement → test → fix loop.

Refer to `demos/demo_04_advanced_prompting.md`.

---

## Slide 23: Section — Copilot Agentic Behaviour

Transition. This is the big shift in how we think about AI-assisted development. Up until now, Copilot has been reactive — you prompt, it responds. With agent mode, Copilot becomes proactive: it plans, implements, tests, and self-corrects with minimal human intervention.

---

## Slide 24: What is Agent Mode?

This is a key slide. Emphasize the paradigm shift:

- Unlike inline completions (which react to your cursor), agents take a **high-level goal** and execute it autonomously.
- Three core capabilities: **Plans Before Coding** (analyzes codebase, creates implementation strategy), **Edits Multiple Files** (coordinated changes), **Runs Terminal Commands** (build, test, lint — it verifies its own work).
- Walk through **The Agent Loop** on the right: Receive Goal → Analyze Codebase → Implement & Test → Self-Correct & Verify. The self-correction step is crucial — if a build fails, the agent reads the error, searches for the fix, applies it, and re-runs. This loop can iterate multiple times.

Agent Mode is now GA (Generally Available), not preview. It's production-ready.

---

## Slide 25: Built-in Agent Types in VS Code

Walk through the four agent types:

1. **Agent** — Full autonomous mode. Plans, writes code, runs commands, iterates. Best for building features end-to-end.
2. **Plan** — Creates detailed step-by-step plans and asks clarifying questions before acting. Best for complex refactors and migrations where you want to review the strategy before execution.
3. **Ask** — Read-only Q&A. Does NOT make file changes. Best for learning, understanding code, and exploration.
4. **Custom** (Preview) — User-defined agents with specific roles, custom tools, and instructions in `.github/agents/` files.

The tip at the bottom is the decision framework: **Ask** for quick questions → **Plan** to strategize → **Agent** to execute. Start conservative, escalate when needed. You wouldn't use a bulldozer to plant a flower.

---

## Slide 26: MCP — Model Context Protocol

This is cutting-edge content. MCP is a new open standard:

- It connects AI agents to external tools and services via a standardized protocol.
- Show the four example integrations: Playwright (browser automation), GitHub (issues, PRs), Database (query/update), Custom APIs.
- Walk through the Playwright example: a single prompt can open a browser, navigate to a page, fill a form, click submit, and capture a screenshot — all through MCP tool calls.
- **Permission Control** is important to highlight: agents request approval before invoking MCP tools. Users control whether tools auto-run (for safe operations) or require confirmation every time.

This is the extensibility layer that makes agents truly powerful — they're not limited to code editing anymore.

---

## Slide 27: Section — Agentic Coding in Practice

Transition. Theory is done — now let's see how agents work in real-world development workflows.

---

## Slide 28: Three Agent Workflow Patterns

Three cards:

1. **Local Agent (Interactive)** — You open Chat, select Agent mode, type your goal, and review changes live in the editor. Real-time review, accept/reject per file, iterative guidance. This is the most common workflow for individual developers.

2. **Cloud Agent (PR-based)** — Assign a task (from a GitHub Issue, Jira ticket, etc.) and the agent runs remotely in the cloud. It creates a pull request when done. The team reviews the PR as normal. Great for async workflows — assign a task before lunch, review the PR after.

3. **Hand-off (Combined)** — Start with Plan mode to strategize, switch to Local Agent for prototyping, then hand off to Cloud Agent for the production PR. Context carries over. This is the best-of-both-worlds approach for critical features.

---

## Slide 29: Agent Tools & Self-Correction

Two columns:

**Left — Built-in Tools:**
Walk through the tool table: Semantic Search (find by meaning), Grep Search (find by pattern/regex), File Search (locate by name), Usages (trace symbol references), Read File, Terminal (run commands). These are the tools the agent uses autonomously — it decides which tool to use based on the task.

**Right — Self-Correction Loop:**
This is one of the most impressive agent capabilities. Walk through the flow: Agent runs `npm run build` → Build fails (missing import) → Agent reads error, searches for fix → Fixes import, re-builds successfully. This loop can iterate multiple times. The agent doesn't just try once and give up — it reads errors, diagnoses issues, and retries. This is real problem-solving behavior.

---

## Slide 30: Section — @workspace Agent Deep-Dive

Transition. `@workspace` is the gateway to codebase-wide intelligence. It's how you ask questions about your entire project, not just the file you're looking at.

---

## Slide 31: @workspace — Your Codebase Assistant

Walk through the four use-case cards:

1. **Architecture Queries** — "Where is authentication handled across the codebase?" Copilot traces auth logic across middleware, services, controllers, and configs. No need to manually grep through files.

2. **Multi-File Refactoring** — "Migrate all Redux state management to Zustand." Copilot identifies stores, updates components, removes boilerplate, and verifies imports.

3. **Impact Analysis** — "If we rename User to Account, which files break?" Copilot lists all references and estimates complexity. Essential before large refactors.

4. **Pattern Detection** — "Show all API calls without error handling." Scans the entire codebase and highlights missing try-catch blocks. Great for code quality audits.

The **tip box** about semantic vs. keyword search is important: @workspace finds code by meaning, not just exact keywords. Asking "permission validation" finds `checkAuth()`, `validateAccess()`, and `isAuthorized()` even though none of those terms match the search query.

---

## Slide 32: Demo — Agent Mode, @workspace & CLI

**Demo Flow:**
1. Agentic Workflow: give the agent a feature task and watch it plan, implement, and test.
2. @workspace Queries: ask architecture questions about the sample app.
3. MCP Tool Integration: show a configured MCP server (e.g., Playwright or GitHub) in action.
4. Copilot CLI: demonstrate the new standalone `copilot` binary — interactive session, Shift+Tab mode cycling, programmatic `-p` mode, and key slash commands (`/model`, `/diff`, `/undo`, `/init`, `/context`).

Refer to `demos/demo_05_agent_workspace_cli.md`. This is the longest demo — allocate adequate time.

---

## Slide 33: Section — CLI & Cloud Agent

Transition. Copilot isn't only in VS Code anymore. With the standalone CLI and cloud agent, it extends to your terminal and your GitHub workflow.

---

## Slide 34: Copilot CLI & Cloud Agent

Two columns:

**Left — Copilot CLI:**
- The new `copilot` binary is a standalone CLI tool (not the old `gh copilot` extension, which is now retired).
- Interactive mode: just type `copilot` and start chatting.
- Programmatic mode: `copilot -p "Add error handling to auth.ts" --allow-tool='shell(git)'` for scripting and CI integration.
- Shift+Tab toggles between ask/execute and plan modes.
- Tool Permissions: fine-grained control with `--allow-all-tools` or `--deny-tool='shell(rm)'`.
- Default model: Claude Sonnet 4.5, switchable via `/model` command or `--model` flag.

**Right — Cloud Agent & PR Automation:**
- Creates PRs directly from GitHub Issues.
- Auto-generates PR descriptions.
- Manages Actions workflows.
- Runs asynchronously — assign a task and review when the PR is ready.
- Integrates with Jira, Slack, Teams, Linear, Azure Boards.

Highlight the warning note: the old `gh copilot suggest` / `gh copilot explain` extension is retired. The new standalone `copilot` binary replaces it entirely.

---

## Slide 35: Key Takeaways

Summarize the six key messages:

1. **Context is King** — Better context equals better suggestions. Open relevant files, write clear comments, use references.
2. **Craft Your Prompts** — Use the four strategies: zero-shot, few-shot, role-based, chain-of-thought. Be specific, give examples, iterate.
3. **Set Instructions** — Create `copilot-instructions.md` and path-specific rules. Do this once for your team — it's high ROI.
4. **Embrace Agent Mode** — For multi-file tasks, let agents plan, implement, test, and self-correct.
5. **Extend with MCP** — Connect agents to external tools for workflows beyond code editing.
6. **Iterate & Learn** — Prompting is a skill that improves with practice. Experiment, refine, learn what works for your codebase.

---

## Slide 36: Q & A

Open the floor for questions. If there's a lull, have a few discussion starters ready:
- "What's the most frustrating thing about Copilot suggestions in your current projects?"
- "Has anyone tried custom instructions yet? What was the effect?"
- "What multi-file tasks do you spend the most time on that agent mode could help with?"

Point to resources: docs.github.com/copilot, code.visualstudio.com/docs/copilot. Tease Day 4: Build, Design & Modernization — where we apply everything learned so far to real-world software engineering workflows.

Thank the audience for their time and encourage them to practice the demo exercises on their own.
