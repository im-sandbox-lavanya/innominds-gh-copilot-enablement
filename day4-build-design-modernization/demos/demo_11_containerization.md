# Demo 11 — Containerization

> **Duration:** ~5 min | **Slide:** 25 | **Mode:** VS Code + Copilot Chat (Agent Mode)

| Setting | Recommendation |
|---------|----------------|
| **Chat Mode** | **Agent** mode throughout — needs to analyze project and generate Dockerfile, .dockerignore, and Compose files |
| **Model** | **GPT-4.1** — fastest and most accurate for Dockerfile/Compose generation |
| **Fallback Model** | Claude Sonnet 4 — better at explaining optimization trade-offs |

---

## Objective

Demonstrate generating optimized Dockerfiles and Docker Compose configurations tailored to the project's actual tech stack.

---

## Pre-Requisites

- VS Code with GitHub Copilot Chat
- The sample-app project open (`day4-build-design-modernization/sample-app/`)
- Docker installed locally (optional — for live build)

---

## Step 1 — Generate Optimized Dockerfile (2 min)

**Goal:** Create a production-grade, multi-stage Dockerfile.

1. In **Agent mode**, type:
   ```
   Analyze this project and generate an optimized multi-stage Dockerfile. 
   Use Alpine base images, run as non-root user, include a health check, 
   and add a .dockerignore. Save both files to the project root.
   ```

2. **Open the generated Dockerfile** and walk through the stages

> **👀 What to watch for:** The Dockerfile has two stages — a builder (installs everything, compiles TypeScript) and a runtime (copies only the built output). The runtime runs as a non-root user and includes a HEALTHCHECK. The .dockerignore excludes node_modules, .git, and .env — preventing secret leakage and context bloat.

**Talking Point:** _"This isn't a tutorial Dockerfile — it follows production best practices. Non-root user, minimal base image, health checks. All generated from your actual project."_

---

## Step 2 — Docker Compose for Local Dev (1.5 min)

**Goal:** Generate a multi-service Compose file from code analysis.

1. Type:
   ```
   Analyze this project for external service dependencies (database, cache, 
   etc.) and generate a docker-compose.yml with the app, all detected 
   services, health checks, and volume persistence.
   ```

2. **Open the generated compose file** and show the services

> **👀 What to watch for:** Copilot detected the database and cache from your connection strings and config files — not from you telling it. The app service has `depends_on` with health check conditions so it doesn't start before the database is ready. Dev conveniences like source volume mounts and debug ports are included.

**Talking Point:** _"Copilot detected PostgreSQL from the connection string and Redis from the cache import. The health check ensures proper startup order."_

---

## Step 3 (Bonus) — Build & Verify

If Docker is available:
```
Build the Docker image and show the image size. 
Then run docker-compose up and verify the health check passes.
```

> **👀 What to watch for:** The final image is dramatically smaller than a single-stage build (typically ~120MB vs 800MB+) because the builder stage with all dev dependencies is discarded. The health check endpoint responds within seconds of container start.

---

## Key Takeaways

- **Multi-stage builds** dramatically reduce image size
- **Non-root user** is a security requirement, not optional
- **Docker Compose from code** — Copilot detects actual service dependencies
- **Health checks** enable proper orchestration (Kubernetes, ECS, Swarm)
- Always include a **.dockerignore** — prevents secret leakage and bloated images
