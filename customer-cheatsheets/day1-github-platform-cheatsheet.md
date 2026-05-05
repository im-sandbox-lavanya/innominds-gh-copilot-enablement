# Day 1 Cheat Sheet - GitHub Platform Overview

## Helper Prompts
Use these in Copilot Chat (Ask mode) during GitHub platform discussions.

```text
Explain GitHub Flow in 6 steps for a team that currently uses long-lived branches.
```

```text
Compare GitHub Enterprise Cloud, Enterprise Managed Users, and GitHub Enterprise Server for a regulated organization.
```

```text
Summarize branch protection settings we should enable for production repositories.
```

```text
Create a pull request checklist for secure and reviewable changes.
```

## Reusable Prompt Templates

```text
You are a GitHub platform advisor.
Context:
- Organization type: {{org_type}}
- Compliance needs: {{compliance_needs}}
- Team size: {{team_size}}
- Hosting preference: {{hosting_preference}}

Recommend the right GitHub deployment option (Free/Team, GHEC/EMU, GHES), with:
1) Why it fits
2) Trade-offs
3) First 10 implementation steps
4) Risks to watch
```

```text
Generate a GitHub governance baseline for {{team_or_org}}:
- Branch protection
- CODEOWNERS
- Required status checks
- Signed commits
- Secret scanning and dependency policy
Output as a practical checklist.
```
