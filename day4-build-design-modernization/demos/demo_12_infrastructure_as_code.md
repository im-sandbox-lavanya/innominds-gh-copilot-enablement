# Demo 12 — Infrastructure as Code (Terraform)

> **Duration:** ~5 min | **Slide:** 26 | **Mode:** VS Code + Copilot Chat (Agent Mode)

| Setting | Recommendation |
|---------|----------------|
| **Chat Mode** | **Agent** mode throughout — needs to generate multiple Terraform files and organize a modular folder structure |
| **Model** | **Claude Sonnet 4** — best at generating interconnected Terraform resources with correct dependency chains and cross-references |
| **Fallback Model** | GPT-4.1 — faster output; good for simpler infra setups with fewer resource interdependencies |

---

## Objective

Demonstrate generating production-grade Terraform configurations — modular structure, multi-environment support, security best practices, and state management — all from a natural language description of the desired infrastructure.

---

## Pre-Requisites

- VS Code with GitHub Copilot Chat
- Basic understanding of cloud concepts (resource groups, app services, databases)
- Terraform extension for VS Code (optional, for syntax highlighting)
- No Terraform files needed — we'll generate from scratch

---

## Step 1 — Generate Terraform from Requirements (2 min)

**Goal:** Create a complete infrastructure definition from a natural language description.

1. In **Agent mode**, describe the desired infrastructure:
   ```
   Generate Terraform configuration to deploy this application to Azure:
   
   Infrastructure needed:
   - Resource group in East US
   - App Service Plan (Linux, P1v3 SKU)
   - Linux Web App running Node.js 20
   - PostgreSQL Flexible Server (General Purpose, 2 vCores)
   - Redis Cache (Basic tier)
   - Application Insights for monitoring
   - Key Vault for secrets
   
   Requirements:
   - Modular structure (separate files: main.tf, variables.tf, outputs.tf)
   - Use variables for all configurable values
   - Create a terraform.tfvars.example with sample values
   - Enable diagnostics logging to Application Insights
   - Network: Web app connects to DB and Redis via private endpoints
   
   Save all files in an infrastructure/ folder.
   ```

2. **Show the generated file structure:**
   ```
   infrastructure/
   ├── main.tf              # Resource definitions
   ├── variables.tf         # Input variables with descriptions
   ├── outputs.tf           # Output values (URLs, connection strings)
   ├── providers.tf         # Provider configuration
   ├── terraform.tfvars.example  # Sample variable values
   ```

3. **Walk through main.tf** — highlight key resources:
   ```hcl
   resource "azurerm_resource_group" "main" {
     name     = "${var.project_name}-${var.environment}-rg"
     location = var.location
     tags     = local.common_tags
   }
   
   resource "azurerm_service_plan" "main" {
     name                = "${var.project_name}-${var.environment}-asp"
     resource_group_name = azurerm_resource_group.main.name
     location            = azurerm_resource_group.main.location
     os_type             = "Linux"
     sku_name            = var.app_service_sku
   }
   ```

4. Point out: _"Everything uses variables — no hardcoded values. The naming convention includes project name and environment, so you can deploy multiple environments from the same code."_

**Talking Point:** _"From a natural language description to production-grade Terraform in 60 seconds. All resources are properly linked, variables are parameterized, and naming follows conventions."_

---

## Step 2 — Multi-Environment Support (1.5 min)

**Goal:** Show how to extend for multiple environments.

1. Ask Copilot:
   ```
   Create environment-specific tfvars files for staging and production:
   
   Staging:
   - Smaller SKUs (B1 app service, Burstable 1 vCore DB)
   - Single instance (no scaling)
   - Lower retention periods
   
   Production:
   - P1v3 app service, General Purpose 4 vCores DB
   - Auto-scaling (2-5 instances)
   - 90-day log retention
   - Geo-redundant backups
   
   Save as infrastructure/environments/staging.tfvars 
   and infrastructure/environments/production.tfvars
   ```

2. **Show the two files side by side:**
   ```hcl
   # staging.tfvars
   environment      = "staging"
   app_service_sku  = "B1"
   db_sku          = "B_Standard_B1ms"
   min_instances    = 1
   max_instances    = 1
   
   # production.tfvars
   environment      = "production"
   app_service_sku  = "P1v3"
   db_sku          = "GP_Standard_D4ads_v5"
   min_instances    = 2
   max_instances    = 5
   backup_retention = 35
   geo_redundant    = true
   ```

3. Show how to apply: 
   ```bash
   terraform plan -var-file=environments/staging.tfvars
   terraform plan -var-file=environments/production.tfvars
   ```

**Talking Point:** _"Same infrastructure code, different environments. Change the tfvars file and you deploy staging or production. No code duplication."_

---

## Step 3 — State Management & CI Integration (1.5 min)

**Goal:** Add remote state backend and Terraform CI workflow.

1. Ask Copilot:
   ```
   Add two things:
   
   1. Remote backend configuration for Azure Storage 
      (state file in a blob container with state locking)
   
   2. GitHub Actions workflow (.github/workflows/terraform.yml) that:
      - Runs terraform fmt -check on PRs
      - Runs terraform plan on PRs (post plan as PR comment)
      - Runs terraform apply on merge to main (production.tfvars)
      - Uses OIDC for Azure authentication (no stored secrets)
   ```

2. **Show the backend configuration:**
   ```hcl
   terraform {
     backend "azurerm" {
       resource_group_name  = "terraform-state-rg"
       storage_account_name = "tfstatemyapp"
       container_name       = "tfstate"
       key                  = "myapp.terraform.tfstate"
     }
   }
   ```

3. **Show the key workflow section:**
   ```yaml
   - name: Terraform Plan
     run: terraform plan -var-file=environments/production.tfvars -out=tfplan
   
   - name: Post Plan to PR
     uses: actions/github-script@v7
     with:
       script: |
         const plan = '${{ steps.plan.outputs.stdout }}';
         github.rest.issues.createComment({ body: plan });
   ```

**Talking Point:** _"Infrastructure as Code is only valuable if it's in your CI/CD pipeline. PR plan comments let your team review infrastructure changes the same way they review code."_

---

## Alternative: AWS or GCP

If the audience uses AWS or GCP instead of Azure, ask Copilot:
```
Convert this Terraform configuration from Azure to AWS:
- Resource Group → No equivalent (use tags)
- App Service → ECS Fargate / Lambda
- PostgreSQL Flexible Server → RDS PostgreSQL
- Redis Cache → ElastiCache
- Key Vault → Secrets Manager
- Application Insights → CloudWatch
```

Copilot will translate the entire infrastructure definition.

---

## Key Takeaways to Reinforce

- **Natural language → Terraform** — describe what you need, get production-grade IaC
- **Modular structure** — variables, outputs, and tfvars from the start
- **Multi-environment** — same code, different tfvars files
- **Remote state** — mandatory for team collaboration
- **CI/CD integration** — plan on PRs, apply on merge
- **Cloud-portable** — Copilot can translate between Azure, AWS, and GCP
