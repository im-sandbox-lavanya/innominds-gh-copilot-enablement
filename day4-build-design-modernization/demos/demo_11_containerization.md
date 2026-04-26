# Demo 11 — Containerization

> **Duration:** ~5 min | **Slide:** 25 | **Mode:** VS Code + Copilot Chat (Agent Mode)

| Setting | Recommendation |
|---------|----------------|
| **Chat Mode** | **Agent** mode throughout — needs to analyze project structure and generate Dockerfile, .dockerignore, and Compose files |
| **Model** | **GPT-4.1** — fastest and most accurate for Dockerfile/Compose generation; reliable multi-stage build patterns and security defaults |
| **Fallback Model** | Claude Sonnet 4 — better at explaining optimization trade-offs; prefer for the review/discussion portion |

---

## Objective

Demonstrate generating optimized Dockerfiles, Docker Compose configurations, and container best practices — all tailored to the project's actual tech stack and dependencies.

---

## Pre-Requisites

- VS Code with GitHub Copilot Chat
- A project with a build system (Node.js, Java, Python, etc.)
- Docker installed locally (for optional live build demo)
- No existing Dockerfile (or willing to replace it)

---

## Step 1 — Generate Optimized Dockerfile (2 min)

**Goal:** Create a production-grade, multi-stage Dockerfile from the project.

1. In **Agent mode**, ask:
   ```
   Analyze #codebase and generate an optimized Dockerfile:
   
   Requirements:
   - Multi-stage build (builder + runtime)
   - Use Alpine base images for minimal size
   - Install only production dependencies in runtime stage
   - Run as non-root user (security)
   - Include proper .dockerignore
   - Add health check instruction
   - Use BuildKit cache mounts for faster rebuilds
   - Add labels (maintainer, version, description)
   
   Also generate a .dockerignore file.
   Save Dockerfile and .dockerignore to the project root.
   ```

2. **Show the generated Dockerfile:**
   ```dockerfile
   # ── Build stage ──
   FROM node:20-alpine AS builder
   WORKDIR /app
   COPY package*.json ./
   RUN --mount=type=cache,target=/root/.npm npm ci
   COPY . .
   RUN npm run build
   
   # ── Runtime stage ──
   FROM node:20-alpine AS runtime
   LABEL maintainer="team@example.com"
   
   RUN addgroup -S appgroup && adduser -S appuser -G appgroup
   WORKDIR /app
   
   COPY --from=builder /app/dist ./dist
   COPY --from=builder /app/node_modules ./node_modules
   COPY package*.json ./
   
   USER appuser
   EXPOSE 3000
   HEALTHCHECK --interval=30s --timeout=3s \
     CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1
   
   CMD ["node", "dist/main.js"]
   ```

3. **Show the .dockerignore:**
   ```
   node_modules
   dist
   .git
   .env
   *.md
   .github
   coverage
   .vscode
   ```

4. Point out security and optimization features:
   - _"Non-root user — prevents container escape attacks"_
   - _"Multi-stage — builder stage is 800MB, runtime is 120MB"_
   - _"Cache mount — npm install is cached between builds"_
   - _"Health check — orchestrators can detect unhealthy containers"_

**Talking Point:** _"This isn't a tutorial Dockerfile — it follows production best practices. Non-root user, minimal base image, BuildKit caching, health checks. All generated from your actual project."_

---

## Step 2 — Docker Compose for Local Development (1.5 min)

**Goal:** Generate a multi-service Docker Compose for local development.

1. Ask Copilot:
   ```
   Analyze #codebase — detect all external service dependencies 
   (database, cache, message queue, etc.) and generate a docker-compose.yml:
   
   - App service building from the Dockerfile we just created
   - Database service matching what the code connects to
   - Redis cache if the code uses caching
   - Volume mounts for data persistence
   - Environment variables from .env.example or config files
   - Dev overrides (source mount, hot reload, debug port)
   - Network isolation between services
   
   Save as docker-compose.yml
   ```

2. **Show the generated compose file:**
   ```yaml
   services:
     app:
       build: .
       ports:
         - "3000:3000"
         - "9229:9229"  # Debug port
       volumes:
         - ./src:/app/src  # Hot reload
       environment:
         - NODE_ENV=development
         - DATABASE_URL=postgresql://user:pass@db:5432/myapp
         - REDIS_URL=redis://cache:6379
       depends_on:
         db:
           condition: service_healthy
         cache:
           condition: service_started
     
     db:
       image: postgres:16-alpine
       environment:
         POSTGRES_DB: myapp
         POSTGRES_USER: user
         POSTGRES_PASSWORD: pass
       volumes:
         - pgdata:/var/lib/postgresql/data
       healthcheck:
         test: ["CMD-SHELL", "pg_isready -U user"]
         interval: 10s
         timeout: 5s
         retries: 5
     
     cache:
       image: redis:7-alpine
   
   volumes:
     pgdata:
   ```

3. Point out: _"Copilot detected PostgreSQL from the connection string in the code and Redis from the cache import. The health check ensures the app doesn't start before the database is ready."_

---

## Step 3 — Build & Verify (1.5 min)

**Goal:** Quick live build to show it works (optional — show commands if Docker isn't available).

1. Ask Copilot to build:
   ```
   Build the Docker image and show me the image size. 
   Then run docker-compose up and verify the health check passes.
   ```

2. **If Docker is available**, show the agent running:
   ```bash
   docker build -t myapp . 
   # → Shows multi-stage build progress
   # → Final image size: ~120MB (vs 800MB+ without multi-stage)
   
   docker compose up -d
   # → All services start
   
   curl http://localhost:3000/health
   # → {"status":"ok","timestamp":"...","uptime":5}
   ```

3. **If Docker isn't available**, show the commands and explain what would happen

**Talking Point:** _"From zero Docker setup to a running multi-service environment in under 3 minutes. The image is 120MB because multi-stage builds exclude all build tools from the runtime."_

---

## Key Takeaways to Reinforce

- **Multi-stage builds** dramatically reduce image size (800MB → 120MB)
- **Non-root user** is a security requirement, not optional
- **Docker Compose** from code analysis — detects actual dependencies
- **Health checks** enable proper orchestration (Kubernetes, ECS, Docker Swarm)
- **BuildKit cache mounts** speed up rebuilds significantly
- Always include a **.dockerignore** — prevents leaking secrets and bloating context
