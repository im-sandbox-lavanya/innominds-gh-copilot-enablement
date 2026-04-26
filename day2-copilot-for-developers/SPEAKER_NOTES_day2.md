# Speaker Notes — GitHub Copilot for Developers (Day 2)

**Presentation:** `copilot-for-dev.html`
**Duration:** 2–2.5 hrs (90 min slides + 30 min demos)
**Audience:** Up to 30 participants (developers, software engineers)

---

## Slide 1 — Title Slide

**Talking Points:**
- Welcome to Day 2 — today is hands-on and developer-focused
- We go from first Copilot suggestion all the way to team-wide adoption best practices
- This is a practical session: 5 live demos, 6 quizzes, and lots of keyboard shortcuts
- Encourage participants to follow along in their own VS Code if possible

---

## Slide 2 — Trainer Introduction

**Talking Points:**
- Introduce yourself: name, GitHub certifications, background
- Quick poll: "How many of you have used Copilot before?" — calibrate depth accordingly
- Mention: today builds on the Copilot overview from Day 1

---

## Slide 3 — Session Agenda

**Talking Points:**
- Six core sections plus best practices and Q&A
- Walk through each card briefly:
  1. **Getting Started** — install, sign in, first suggestion
  2. **Code Completions** — ghost text, Tab, cycling alternatives
  3. **Copilot Chat** — inline vs side panel, natural language code gen
  4. **Copilot Edits** — multi-file changes in one pass
  5. **Slash Commands** — /explain, /fix, /tests, /doc, @workspace, @terminal
  6. **Copilot for PRs** — auto-generated descriptions, review suggestions
- Five demos are spread throughout — each with a runbook reference
- We end with best practices, custom instructions, and open Q&A

---

## Slide 4 — What is GitHub Copilot?

**Talking Points:**
- AI pair programmer — not just autocomplete, understands **intent** from comments, names, and context
- Powered by OpenAI GPT-4 / Codex-class models, specialized for code across 30+ languages
- Deep editor integration: VS Code, JetBrains, Neovim, Visual Studio — no context switching
- Enterprise-ready: Individual, Business, and Enterprise plans with admin controls
- **Impact stats:** 55% faster task completion, 46% of code written by Copilot in enabled repos, 74% of developers stay in flow longer, 1M+ active developers globally
- Key message: Copilot is a force multiplier, not a replacement

**Links:**
- Copilot overview: https://github.com/features/copilot
- Research on impact: https://github.blog/news-insights/research/research-quantifying-github-copilots-impact-on-developer-productivity-and-happiness/

---

## Slide 5 — How Copilot Works — The AI Engine

**Talking Points:**
- Walk through the 4-step pipeline:
  1. **Gather Context:** Current file, open tabs, cursor position, comments, imports
  2. **Send to Model:** Prompt transmitted securely over TLS to GitHub's AI backend
  3. **Generate Suggestions:** Multiple candidates generated, ranked by relevance, filtered for safety
  4. **Display in Editor:** Ghost text appears inline — you accept, reject, or cycle alternatives
- **Privacy & Security:** Code prompts are encrypted in transit. Business/Enterprise plans: prompts are NOT retained, code is NOT used for training. Duplication detection flags public-code matches
- This is the #1 question from security teams — address it proactively

**Links:**
- How Copilot works: https://docs.github.com/en/copilot/about-github-copilot/how-github-copilot-works
- Privacy notice: https://docs.github.com/en/copilot/responsible-use-of-github-copilot-features/github-copilot-general-privacy-notice

---

## Slide 6 — The Context Window — What Copilot Sees

**Talking Points:**
- **Current File (Primary):** Code above and below cursor — most heavily weighted signal
- **Open Tabs (Neighboring Files):** Types, interfaces, helpers in open tabs feed the prompt — **keep relevant files open!**
- **Comments & Docstrings:** Natural language comments are the strongest intent signal. Write them BEFORE code
- **Project Structure (@workspace):** In Chat mode, Copilot indexes all project files for richer answers
- **Quality rule:** Context Quality = Suggestion Quality. Garbage in, garbage out
- Walk through the "Good Context Pattern" example: descriptive comment → descriptive function name → Copilot generates the body

**Links:**
- Context tips: https://docs.github.com/en/copilot/using-github-copilot/best-practices-for-using-github-copilot

---

## Slide 7 — Copilot Across Your Dev Workflow

**Talking Points:**
- Map each Copilot surface to where it fits in the workflow:
  - **Inline Completions:** Zero friction, best for boilerplate, loops, repetitive code
  - **Copilot Chat:** Exploration, learning, targeted code gen, docs
  - **Copilot Edits:** Refactors, feature additions, cross-file changes
  - **Slash Commands:** Tests, docs, fixes, explanations on demand
  - **Copilot for PRs:** Code reviews, PR descriptions, collaborative feedback
  - **Agent Mode:** Autonomous multi-step tasks, scaffolding, test loops
- Key message: "Right tool, right task" — don't use Chat for a simple Tab-accept scenario, and don't use inline completions for a multi-file refactor

---

## SECTION 01: Getting Started

### Slide 8 — Section Divider

**Talking Points:**
- Let's get everyone set up — if participants have VS Code open, they can follow along
- This section covers prerequisites, installation, and your first Copilot experience

---

### Slide 9 — Installation & Prerequisites

**Talking Points:**
- **Prerequisites:** GitHub account with Copilot subscription, VS Code 1.80+ (recommended), internet connection
- **Installation steps** (walk through the 5-step process on screen):
  1. Extensions panel (Ctrl+Shift+X)
  2. Search "GitHub Copilot"
  3. Install both GitHub Copilot and GitHub Copilot Chat
  4. Click "Sign in to GitHub" notification
  5. Authorize in browser → return to VS Code
- **Verify:** Look for the Copilot icon in the VS Code status bar (bottom). Spinning = generating

**Links:**
- Install guide: https://docs.github.com/en/copilot/using-github-copilot/getting-code-suggestions-in-your-ide-with-github-copilot
- VS Code extension: https://marketplace.visualstudio.com/items?itemName=GitHub.copilot

---

### Slide 10 — Sign-In & First Experience

**Talking Points:**
- **Authenticate:** OAuth flow — token stored securely in OS keychain
- **Configure:** Enable/disable for specific languages, set suggestion delay
- **First Suggestion:** Open a new file → write a comment → pause → ghost text appears
- **Essential Keyboard Shortcuts** — walk through each one:
  | Shortcut | Action |
  |----------|--------|
  | `Tab` | Accept suggestion |
  | `Esc` | Dismiss suggestion |
  | `Alt+]` | Next suggestion |
  | `Alt+[` | Previous suggestion |
  | `Ctrl+Enter` | Open suggestions panel |
  | `Ctrl+I` | Open Inline Chat |
- Participants should try these as you demonstrate

**Links:**
- Keyboard shortcuts reference: https://docs.github.com/en/copilot/using-github-copilot/getting-code-suggestions-in-your-ide-with-github-copilot#keyboard-shortcuts

---

### Slide Q1 — Quiz: Getting Started

**Question:** What keyboard shortcut opens the Copilot suggestions panel showing all alternatives?

**Answer:** ✅ Ctrl + Enter

**Explanation:** Tab accepts a single suggestion. Ctrl+Enter opens a panel showing ALL alternative completions side by side. Ctrl+Space is the standard VS Code IntelliSense, not Copilot-specific.

---

## SECTION 02: Code Completions

### Slide 11 — Section Divider

**Talking Points:**
- This is the bread and butter of Copilot — inline completions are what most developers experience first
- We'll cover how ghost text works, how to control it, and what makes suggestions good or bad

---

### Slide 12 — Inline Suggestions & Ghost Text

**Talking Points:**
- **Ghost Text:** Greyed-out text appears directly after cursor — no modal, no popup, zero friction
- **Range:** From finishing a single expression to generating a complete 50-line function with error handling
- **Multiple Alternatives:** Copilot generates several candidates — cycle with Alt+] / Alt+[
- **Triggered Automatically:** Suggestions fire on pause — no explicit key press. Start a new line or press Enter after a comment
- Walk through the factorial code example on screen
- **Pro Tip:** Partial accept with `Ctrl+Right` — accept word-by-word to nudge Copilot in the right direction

**Links:**
- Code suggestions: https://docs.github.com/en/copilot/using-github-copilot/getting-code-suggestions-in-your-ide-with-github-copilot

---

### Slide 13 — Accepting, Rejecting & Cycling Suggestions

**Talking Points:**
- Walk through each of the four cards in detail:
  - **Accepting:** Tab (full), Ctrl+Right (word-by-word), click ghost text
  - **Rejecting:** Esc (dismiss), keep typing (overrides), Delete (cancel)
  - **Cycling:** Alt+] (next), Alt+[ (previous), Ctrl+Enter (panel with all)
  - **Toggle Copilot:** Click status bar icon, disable globally or per-language
- Have participants try each shortcut if they're following along
- The toggle is useful when working in sensitive files or when you want to write code yourself

---

### Slide 14 — What Drives Completion Quality?

**Talking Points:**
- **Signals that IMPROVE suggestions:**
  - Descriptive function names: `parseAndValidateEmail()` >> `fn()`
  - Comments before code — the strongest intent signal
  - Open related files — types, interfaces, helpers in tabs
  - Good examples nearby — consistent patterns in the same file
  - Type annotations — TypeScript types, Python hints, C++ signatures
- **Signals that HURT suggestions:**
  - Single-letter names: `x`, `temp`, `foo` — no intent signal
  - No comments — Copilot must guess what you want
  - Closed relevant files — Copilot can't see what's not open
  - Mixed coding styles — inconsistent patterns confuse the model
  - Sensitive data in context — never put credentials where Copilot can see them
- Key takeaway: **You control the quality by controlling the context**

---

### Slide 15 — Demo: Code Completions & First Chat

**Duration:** ~7 minutes

**Demo Script:**

1. **Ghost Text in Action (~2 min)**
   - Create a new file: `utils.js` or `utils.py`
   - Type a comment: `// function to validate an email address using regex`
   - Pause — watch ghost text appear
   - Press Tab to accept
   - Type another comment: `// function to calculate the distance between two GPS coordinates`
   - Accept and show the full function generated

2. **Cycling Suggestions (~1 min)**
   - Type: `// sort an array of objects by a property name`
   - When ghost text appears, press `Alt+]` to see alternatives
   - Press `Alt+[` to go back
   - Press `Ctrl+Enter` to open the suggestions panel — show all alternatives side by side

3. **Comment-Driven Generation (~2 min)**
   - Write a multi-line comment:
     ```
     // Parse a CSV string into an array of objects
     // The first row contains column headers
     // Handle quoted fields with commas inside
     ```
   - Show how detailed comments produce detailed implementations
   - Compare with vague comment: `// parse csv` — show weaker output

4. **Writing Tests with Copilot (~2 min)**
   - Open a function you've written
   - Create a new test file: `utils.test.js`
   - Type: `describe('validateEmail', () => {`
   - Watch Copilot generate multiple test cases
   - Accept and run the tests

**Fallback:** Pre-recorded GIF if live demo has issues

---

### Slide Q2 — Quiz: Code Completions

**Question:** Which of these practices MOST improves the quality of Copilot's inline suggestions?

**Answer:** ✅ Writing descriptive comments and meaningful function names before the implementation

**Explanation:** Comments and names are the strongest intent signals. Short/cryptic names give Copilot nothing to work with. Closing tabs actually hurts because Copilot uses neighboring files for context.

---

## SECTION 03: Copilot Chat

### Slide 16 — Section Divider

**Talking Points:**
- Moving from passive suggestions to active conversation
- Two modes: Inline Chat (in-editor) and Side Panel Chat (persistent)

---

### Slide 17 — Inline Chat vs Side Panel Chat

**Talking Points:**
- **Inline Chat (Ctrl+I):**
  - Opens a prompt directly in your code at the cursor
  - Changes appear as a diff — accept or discard
  - Select code + Ctrl+I to modify a selection
  - Ideal for: quick fixes, refactors, in-place explanations
- **Side Panel Chat (Ctrl+Alt+I):**
  - Persistent conversational UI on the side
  - Retains chat history across the session
  - Use @references to pull in files and symbols
  - Ideal for: exploration, complex tasks, multi-turn Q&A
- **Rule of Thumb:** Inline Chat for "do something to this code." Side Panel for "help me understand or build something."

**Links:**
- Copilot Chat: https://docs.github.com/en/copilot/using-github-copilot/copilot-chat/using-github-copilot-chat-in-your-ide

---

### Slide 18 — Generating Code from Natural Language

**Talking Points:**
- **Describe What You Need** in plain English — be specific about language, framework, and style
- **Specify Constraints:** "Use Express.js, async/await, return proper HTTP status codes"
- **Iterate Conversationally:** "Now add input sanitization" — builds on previous responses
- **Insert into Editor:** Use "Insert at Cursor" button or copy the code block
- Walk through the "Weak prompt vs Strong prompt" example:
  - Weak: "Write a function"
  - Strong: "Write a TypeScript function that takes a list of User objects and returns only those with verified emails. Include JSDoc and a unit test using Jest."
- **Pro Tip:** Type `@` in Chat to reference specific files, symbols, or selections for precise context

**Links:**
- Prompt crafting: https://docs.github.com/en/copilot/using-github-copilot/best-practices-for-using-github-copilot

---

### Slide 19 — Explaining & Documenting Code

**Talking Points:**
- **Explain Code:** Select code → /explain — step-by-step logic walkthrough. Perfect for onboarding on unfamiliar codebases
- **Generate Docs:** Select function → /doc — generates JSDoc, Python docstrings, Javadoc, XML comments matching your codebase style
- **Understand Architecture:** Use @workspace in Side Panel: "Explain how the authentication flow works across these files"
- **Translate Code:** "Convert this Python function to TypeScript" — preserves logic, adapts idioms

---

### Slide 20 — Demo: Copilot Chat

**Duration:** ~7 minutes

**Demo Script:**

1. **Inline Chat Fix & Explain (~2 min)**
   - Open a file with a subtle bug (e.g., off-by-one error in a loop)
   - Select the buggy code → Ctrl+I → type "fix the bug in this code"
   - Show the diff — accept the fix
   - Select a complex function → Ctrl+I → type `/explain`
   - Show the step-by-step explanation

2. **Generate Feature from Natural Language (~2 min)**
   - Open Side Panel Chat (Ctrl+Alt+I)
   - Type: "Create an Express.js middleware that validates JWT tokens, checks expiration, and returns 401 with a JSON error body if invalid"
   - Show the generated code
   - Follow up: "Now add rate limiting with a 100 requests/minute window"
   - Show multi-turn conversation building on the previous answer

3. **Generate Docs with /doc (~1.5 min)**
   - Select an undocumented function
   - Ctrl+I → type `/doc`
   - Show the JSDoc/docstring generated
   - Accept and point out it matched the language's standard format

4. **Multi-Turn Conversation (~1.5 min)**
   - In Side Panel: "What testing framework does this project use?" (using @workspace)
   - Follow up: "Generate a test for the validateUser function using that framework"
   - Show how context carries across turns

**Fallback:** Pre-recorded GIF or video

---

### Slide Q3 — Quiz: Chat

**Question:** What is the primary difference between Inline Chat and the Side Panel Chat?

**Answer:** ✅ Inline Chat appears in the editor at your cursor; Side Panel is persistent with conversation history

**Explanation:** Both use the same AI model. Both work with all languages. The difference is placement (in-editor vs sidebar) and persistence (ephemeral vs conversation history).

---

## SECTION 04: Copilot Edits & Multi-File Changes

### Slide 21 — Section Divider

**Talking Points:**
- Level up from single-file changes to coordinated multi-file edits
- This is one of Copilot's most powerful features for refactoring and feature additions

---

### Slide 22 — What Are Copilot Edits?

**Talking Points:**
- **Multi-file, single instruction:** Write one natural language instruction → Copilot applies coordinated edits across all relevant files
- **Diff review workflow:** All changes staged as diffs. Review each file, accept what you want, discard the rest
- **Working Set Control:** You define which files Copilot can edit — keeps changes scoped
- **Safe Iteration:** Reject all → modify instruction → re-run until changes are right
- Walk through the example edit prompt on screen
- **Edits vs Chat:** Chat is conversational and exploratory. Edits is transactional — instruction → diffs → review

**Links:**
- Copilot Edits: https://code.visualstudio.com/docs/copilot/copilot-edits

---

### Slide 23 — Multi-File Editing Workflow

**Talking Points:**
- 4-step workflow:
  1. **Open Edit Mode:** Copilot Edits sidebar or Ctrl+Shift+I
  2. **Define Working Set:** Add files by dragging from Explorer or using + button
  3. **Describe Changes:** Clear, specific instruction — what to change AND what to preserve
  4. **Review & Accept:** Diff view per file — Accept All, Discard All, or file by file
- **Best Practice:** Always commit or stash before running Copilot Edits. `git checkout .` is your rollback if needed

---

### Slide 24 — Demo: Copilot Edits

**Duration:** ~5 minutes

**Demo Script:**

1. **Add Feature Across Files (~2 min)**
   - Open Copilot Edits panel (Ctrl+Shift+I)
   - Add 3-4 related files to the working set (e.g., a model, controller, and test)
   - Type: "Add a 'lastLogin' timestamp field to the User model. Update the controller to set it on successful authentication. Add a test for the new field."
   - Show diffs across all files
   - Accept file by file, pointing out the coordinated changes

2. **Refactor with Guardrails (~1.5 min)**
   - Type: "Refactor all callback-style error handling to use try/catch with async/await. Do not modify test files."
   - Show how the "do not modify" instruction is respected
   - Accept changes selectively

3. **Review & Accept Diffs (~1.5 min)**
   - Walk through the diff view in detail
   - Show: Accept All vs individual file accept
   - Show: Discard All and re-run with a modified instruction
   - Emphasize: this is a safe, iterative process

**Fallback:** Pre-recorded demo

---

## SECTION 05: Slash Commands & Chat Participants

### Slide 25 — Section Divider

**Talking Points:**
- Slash commands and @ participants unlock Copilot's full potential
- These are structured shortcuts that save time on repetitive developer tasks

---

### Slide 26 — Slash Commands

**Talking Points:**
- Walk through each command:
  | Command | Purpose | Usage |
  |---------|---------|-------|
  | `/explain` | Explain selected code step by step | Select code → /explain |
  | `/fix` | Analyze and propose a fix | Select buggy code → /fix |
  | `/tests` | Generate unit tests (auto-detects framework) | Select function → /tests |
  | `/doc` | Generate documentation comments | Select function → /doc |
  | `/optimize` | Suggest performance improvements | Select code → /optimize |
  | `/clear` | Clear chat thread — start fresh | New topic? /clear first |
- These work in both Inline Chat and Side Panel Chat
- Pro tip: combine commands — `/fix` then `/tests` to fix and verify in one flow

**Links:**
- Slash commands reference: https://docs.github.com/en/copilot/using-github-copilot/copilot-chat/github-copilot-chat-cheat-sheet

---

### Slide 27 — Chat Participants (@)

**Talking Points:**
- **@workspace:** Access your entire repo index. For cross-file questions and architectural understanding
  - Example: "@workspace Where do we handle JWT refresh tokens?"
- **@terminal:** Context from the terminal — explain errors, suggest commands, debug failing tests
  - Example: "@terminal /fix the last test failure"
- **@vscode:** Ask about VS Code settings, extensions, commands — knows the VS Code API
- **#file / #selection:** Reference specific files or current selection — precise scoping
  - Example: "#file:userService.ts /tests"
- **Power Combinations:** Show the examples on screen — these are where Copilot becomes a true development partner
- **Strategic use of @workspace:** Powerful but slower (indexes full repo). Use for cross-file questions, not simple edits

**Links:**
- Chat participants: https://docs.github.com/en/copilot/using-github-copilot/copilot-chat/using-github-copilot-chat-in-your-ide#chat-participants

---

### Slide 28 — Demo: Slash Commands & Chat Participants

**Duration:** ~5 minutes

**Demo Script:**

1. **/fix a Bug from Test Output (~1.5 min)**
   - Run a test suite that has a failing test
   - In Side Panel: "@terminal /fix the last test failure"
   - Show Copilot reading the terminal error and proposing a fix
   - Apply the fix and re-run tests to verify

2. **/tests for a Function (~1.5 min)**
   - Select a utility function
   - Ctrl+I → type `/tests`
   - Show the generated tests — point out edge cases covered
   - Run the tests to prove they pass

3. **@workspace Architecture Q&A (~1 min)**
   - In Side Panel: "@workspace How does the error handling middleware work? Which files are involved?"
   - Show how Copilot traces through multiple files and provides a coherent answer
   - Follow up: "@workspace What endpoints don't have input validation?"

4. **@terminal Error Explanation (~1 min)**
   - Trigger a terminal error (e.g., `npm run build` with a TypeScript error)
   - In Side Panel: "@terminal Explain this error and how to fix it"
   - Show the explanation and suggested fix

**Fallback:** Pre-recorded demo

---

### Slide Q4 — Quiz: Commands

**Question:** You want to ask Copilot "Where is the authentication logic used across the entire codebase?" Which participant should you use?

**Answer:** ✅ @workspace — to let Copilot search the full repository index

**Explanation:** @workspace indexes all project files for cross-file questions. @terminal is for shell/terminal context. @vscode is for editor settings.

---

## SECTION 06: Copilot for Pull Requests

### Slide 29 — Section Divider

**Talking Points:**
- Copilot extends beyond the editor to your PR workflow on GitHub.com
- Auto-generated descriptions and AI-powered review suggestions

---

### Slide 30 — PR Summaries & Auto-Generated Descriptions

**Talking Points:**
- **One-Click PR Description:** On GitHub.com, click the Copilot sparkle icon in the PR description field
- Copilot reads all diffs and generates: What changed, Why, How to test, affected files
- Follows your PR template if configured
- **Editable:** The generated description is a starting point — edit and extend
- **Time saved:** Teams report 50%+ reduction in time writing PR descriptions
- Walk through the example generated description on screen

**Links:**
- Copilot for PRs: https://docs.github.com/en/copilot/using-github-copilot/using-github-copilot-for-pull-requests/creating-a-pull-request-summary-with-github-copilot

---

### Slide 31 — Copilot Code Review Suggestions

**Talking Points:**
- **Bug Detection:** Flags null dereferences, off-by-one errors, race conditions, missing error handling
- **Security Suggestions:** Highlights SQL injection risks, unsanitized inputs, hardcoded secrets, insecure configs
- **Improvement Hints:** Better variable names, extract-function opportunities, readability improvements
- **In VS Code:** Select changed files → right-click → "Copilot: Review and Comment" — inline comments before you even open a PR
- **Critical message:** Copilot review is a FIRST PASS — architecture decisions, business logic, and security-critical code need human expert review

**Links:**
- Copilot code review: https://docs.github.com/en/copilot/using-github-copilot/code-review/using-copilot-code-review

---

### Slide 32 — Demo: Copilot for Pull Requests

**Duration:** ~5 minutes

**Demo Script:**

1. **Generate PR Description (~2 min)**
   - Navigate to a PR on GitHub.com (pre-created with meaningful changes)
   - Click the Copilot sparkle icon in the description field
   - Show the generated summary — point out the structure (Summary, Changes, Testing)
   - Edit the description to add team-specific context
   - Show how it adapts if you have a PR template

2. **Copilot Review Comments (~2 min)**
   - On the PR Files Changed tab, click "Copilot" review button (if available)
   - Show the inline comments Copilot leaves — bugs, security issues, suggestions
   - Walk through 2-3 specific comments, explaining why they're useful
   - Alternatively: in VS Code, right-click changed files → "Copilot: Review and Comment"

3. **Respond to Review Feedback (~1 min)**
   - Show a review comment suggesting a fix
   - Use Copilot Chat: "Fix the issue mentioned in this review comment"
   - Push the fix and show the comment resolved

**Fallback:** Screenshots of a pre-generated PR description and review comments

---

### Slide Q5 — Quiz: PRs

**Question:** Where do you find the Copilot button to auto-generate a PR description on GitHub.com?

**Answer:** ✅ Next to the PR description field — the Copilot sparkle icon

**Explanation:** The sparkle (✨) icon appears next to the PR description text area when creating or editing a PR. It's not in Settings or Actions.

---

## SECTION 07: Best Practices for Copilot Adoption

### Slide 33 — Section Divider

**Talking Points:**
- Now that you know all the tools, let's talk about using them responsibly
- Trust, verify, security, and building good habits

---

### Slide 34 — When to Trust & When to Verify

**Talking Points:**
- **High-Confidence Areas (Trust more):**
  - Boilerplate & scaffolding — standard patterns Copilot has seen millions of times
  - Common algorithms — sorting, searching, data transformation
  - Test generation — happy path and common edge cases for pure functions
  - Documentation — docstrings, comments, README sections
  - SQL & regex — well-known syntax and common patterns
- **Always Verify These:**
  - Business logic — Copilot doesn't know your domain rules
  - Security-critical code — auth, crypto, input handling, permissions
  - External API calls — endpoints, auth flows may be outdated
  - Edge cases — Copilot optimizes for common paths, not adversarial inputs
  - Performance-critical paths — may suggest readable but inefficient approaches
- Key message: "Trust but verify" — Copilot accelerates, you validate

---

### Slide 35 — Security Considerations

**Talking Points:**
- Walk through all six cards:
  1. **No Secrets in Context:** Use env variables and secrets managers, never put credentials in files
  2. **Duplication Detection:** Public code filter flags matches — review for license implications
  3. **OWASP-Aware Review:** Check generated code for injection, broken access control, XSS
  4. **Enterprise Policy:** Business/Enterprise: prompts NOT retained for training
  5. **Code Review Gate:** Treat AI code like third-party code — require PR review, static analysis, tests
  6. **Developer Responsibility:** You are accountable for every line you commit
- This slide is important for compliance-conscious organizations

**Links:**
- Copilot security: https://docs.github.com/en/copilot/responsible-use-of-github-copilot-features
- OWASP Top 10: https://owasp.org/www-project-top-ten/

---

### Slide 36 — Best Practices for Maximum Value

**Talking Points:**
- **Prompting Excellence:**
  - Comment first, code second — write intent before implementation
  - Open relevant files — types, interfaces, helpers in tabs
  - Iterate & refine — if first suggestion isn't right, add more context or use inline chat
- **Team Adoption:**
  - Shared Copilot Instructions: `.github/copilot-instructions.md` codifies team standards
  - Reusable Prompt Files: `.prompt.md` files for complex, repeatable prompts
  - Measure & Celebrate: Track acceptance rates in the Copilot metrics dashboard (Business/Enterprise)

**Links:**
- Best practices: https://docs.github.com/en/copilot/using-github-copilot/best-practices-for-using-github-copilot
- Custom instructions: https://docs.github.com/en/copilot/customizing-copilot/adding-repository-custom-instructions-for-github-copilot

---

### Slide 37 — Custom Instructions

**Talking Points:**
- **`.github/copilot-instructions.md`** — a Markdown file at the root of your repo
- Customizes Copilot's behavior for EVERY developer on the team automatically
- Define: preferred patterns, naming conventions, error handling, libraries to use/avoid
- Walk through the example on screen: TypeScript strict mode, async/await, Zod, Jest, no `any`, REST naming
- **Prompt Files (.prompt.md):** Save complex, reusable prompts for tests, features, migrations
- Once committed to the repo, Copilot reads this file on every interaction — no developer needs to repeat standards

**Links:**
- Custom instructions: https://docs.github.com/en/copilot/customizing-copilot/adding-repository-custom-instructions-for-github-copilot
- Prompt files: https://code.visualstudio.com/docs/copilot/copilot-customization#_reusable-prompt-files

---

### Slide Q6 — Quiz: Best Practices

**Question:** What file can you create in your repository to share Copilot coding standards across your entire team automatically?

**Answer:** ✅ .github/copilot-instructions.md

**Explanation:** This is the official mechanism for repo-level Copilot customization. `.copilotrc` is not a real file. VS Code settings.json is per-user, not team-shared.

---

### Slide 38 — Key Takeaways

**Talking Points:**
- Recap all six cards:
  1. **Context is King** — names, comments, open tabs = better suggestions
  2. **Right Tool, Right Task** — inline for speed, Chat for exploration, Edits for multi-file, PRs for review
  3. **Commands Unlock Power** — /explain, /fix, /tests, /doc + @workspace
  4. **Always Review** — AI code is a starting point, you own every line
  5. **Team Standards Scale** — copilot-instructions.md multiplies benefit
  6. **Stay in Flow** — biggest win is no context switching

---

### Slide 39 — Q & A

**Talking Points:**
- Seed discussion with the five topics on screen:
  - Adoption blockers, use case brainstorm, security concerns, enterprise features, what's next
- Share resources:
  - docs.github.com/copilot
  - GitHub Copilot YouTube channel
  - GitHub Skills (skills.github.com)
  - GitHub Community Discussions
  - github.blog for changelog
- **Weekly Challenge:** Pick one real task from your backlog and complete it using only Copilot Chat + Edits. Track the time difference vs your usual approach

**All Resource Links:**

| Resource | Link |
|----------|------|
| Copilot Docs | https://docs.github.com/en/copilot |
| Best Practices | https://docs.github.com/en/copilot/using-github-copilot/best-practices-for-using-github-copilot |
| GitHub Skills | https://skills.github.com |
| Copilot YouTube | https://www.youtube.com/@GitHub (Copilot playlist) |
| GitHub Blog | https://github.blog |
| Community Discussions | https://github.com/orgs/community/discussions |
| VS Code Copilot Docs | https://code.visualstudio.com/docs/copilot/overview |
| Copilot Chat Cheat Sheet | https://docs.github.com/en/copilot/using-github-copilot/copilot-chat/github-copilot-chat-cheat-sheet |

---

### Slide 40 — Thank You

**Talking Points:**
- Thank everyone for their time and engagement
- Remind: "From your first Tab acceptance to team-wide adoption — Copilot grows with you"
- Encourage the weekly challenge
- Share contact info for follow-up questions
- Preview Day 3 content if applicable (context setting and advanced prompting)
