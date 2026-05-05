# Demo 12 — Infrastructure as Code (Terraform)

> **Duration:** ~5 min | **Slide:** 26 | **Mode:** VS Code + Copilot Chat (Agent Mode)

| Setting | Recommendation |
|---------|----------------|
| **Chat Mode** | **Agent** mode throughout — needs to generate multiple Terraform files |
| **Model** | **Claude Sonnet 4** — best at generating interconnected Terraform resources with correct dependency chains |
| **Fallback Model** | GPT-4.1 — faster output; good for simpler infra setups |

---

## Objective

Demonstrate generating production-grade Terraform configurations from a natural language description of the desired infrastructure.

---

## Pre-Requisites

- VS Code with GitHub Copilot Chat
- The sample-app project open (`day4-build-design-modernization/sample-app/`)
- Terraform extension for VS Code (optional, for syntax highlighting)

---

## Step 1 — Generate Terraform from Requirements (2 min)

**Goal:** Create a complete infrastructure definition from natural language.

1. In **Agent mode**, type:
   ```
   Generate Terraform to deploy this Node.js app to Azure: App Service, 
   PostgreSQL, Redis, and Application Insights. Use modular structure 
   with variables.tf, outputs.tf, and a tfvars example. 
   Save all files in an infrastructure/ folder.
   ```

2. **Open the generated files** and walk through the structure

> **👀 What to watch for:** Everything uses variables — no hardcoded values. The naming convention includes project name and environment so you can deploy multiple environments from the same code. Resources reference each other correctly (the web app connects to the database it created, not a random one).

**Talking Point:** _"From a natural language description to production-grade Terraform in 60 seconds. All resources are properly linked and parameterized."_

---

## Step 2 — Multi-Environment Support (1.5 min)

**Goal:** Show how to extend for staging vs production.

1. Type:
   ```
   Create environment-specific tfvars files for staging (smaller SKUs, 
   single instance) and production (larger SKUs, auto-scaling, 
   geo-redundant backups). Save in infrastructure/environments/
   ```

2. **Show the two files** and compare the differences

> **👀 What to watch for:** Same Terraform code, different variable values. Staging uses budget-friendly SKUs, production uses high-availability settings. You deploy either one with `terraform plan -var-file=environments/staging.tfvars` — no code duplication.

**Talking Point:** _"Same infrastructure code, different environments. Change the tfvars file and you deploy staging or production."_

---

## Step 3 (Bonus) — Remote State & CI

If time allows:
```
Add a remote backend configuration for Azure Storage with state 
locking, and a GitHub Actions workflow that runs terraform plan 
on PRs and terraform apply on merge to main.
```

> **👀 What to watch for:** The workflow posts the plan output as a PR comment so your team can review infrastructure changes the same way they review code. OIDC authentication means no stored secrets.

---

## Note: Works for Any Cloud

The same prompt pattern works for AWS (ECS, RDS, ElastiCache) or GCP (Cloud Run, Cloud SQL). Just change the provider in your prompt.

---

## Key Takeaways

- **Natural language → Terraform** — describe what you need, get production-grade IaC
- **Modular structure** — variables, outputs, and tfvars from the start
- **Multi-environment** — same code, different tfvars files
- **CI integration** — plan on PRs, apply on merge
- Always **review generated infrastructure** before applying
