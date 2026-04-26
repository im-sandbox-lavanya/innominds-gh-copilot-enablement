# Demo 04 — ER Diagrams, Class Diagrams & OpenAPI Specs

> **Duration:** ~5 min | **Slide:** 12 | **Mode:** VS Code + Copilot Chat (Agent Mode)

| Setting | Recommendation |
|---------|----------------|
| **Chat Mode** | **Agent** mode throughout — needs file system access to read models and write output files |
| **Model** | **GPT-4.1** — fast and accurate for code-to-diagram translation; reliably produces valid Mermaid ER and OpenAPI YAML |
| **Fallback Model** | Claude Sonnet 4 — better at complex relationship inference but slightly slower |

---

## Objective

Generate technical diagrams (ER, class, sequence) in Mermaid syntax and OpenAPI 3.0 specifications directly from existing code — demonstrating Copilot as a reverse-engineering and documentation tool.

---

## Pre-Requisites

- VS Code with GitHub Copilot Chat
- A project with database models/entities (ORM like Sequelize, TypeORM, Prisma, JPA, or raw SQL)
- A project with REST API endpoints
- Mermaid preview extension (recommended: "Markdown Preview Mermaid Support")

---

## Step 1 — ER Diagram from Models (2 min)

**Goal:** Reverse-engineer an ER diagram from existing model files.

1. In Copilot Chat (Agent mode), type:
   ```
   Analyze all model/entity files in #file:src/models/ and generate 
   a Mermaid ER diagram. Include:
   - All entities with their attributes and types
   - Primary and foreign key relationships
   - Cardinality (one-to-one, one-to-many, many-to-many)
   - Junction/join tables if any
   
   Save as docs/er-diagram.md
   ```

2. **Show the generated diagram** in Mermaid preview:
   ```mermaid
   erDiagram
       USER ||--o{ ORDER : places
       USER {
           int id PK
           string email UK
           string name
           datetime created_at
       }
       ORDER ||--|{ LINE_ITEM : contains
       ORDER {
           int id PK
           int user_id FK
           string status
           decimal total
       }
       PRODUCT ||--o{ LINE_ITEM : "ordered in"
       PRODUCT {
           int id PK
           string name
           decimal price
           int stock
       }
       LINE_ITEM {
           int id PK
           int order_id FK
           int product_id FK
           int quantity
       }
   ```

3. Point out how Copilot correctly identified:
   - Foreign key relationships from the code
   - Cardinality (one user → many orders, many-to-many products↔orders via line_items)
   - Data types from the ORM decorators or schema definitions

**Talking Point:** _"This diagram is generated from your actual code — not a guess. If your schema changes, re-run and get an updated diagram in seconds."_

---

## Step 2 — OpenAPI 3.0 Spec Generation (2 min)

**Goal:** Generate a complete OpenAPI specification from route handlers.

1. Ask Copilot:
   ```
   Analyze #file:src/routes/ and generate a complete OpenAPI 3.0 
   specification in YAML format. Include:
   - All endpoints with HTTP methods
   - Request body schemas with validation rules
   - Response schemas for success (200/201) and errors (400/404/500)
   - Example request/response payloads
   - Authentication requirements (Bearer JWT)
   - Tags grouping by resource
   
   Save as docs/openapi.yaml
   ```

2. **Show the generated spec** — highlight key sections:
   ```yaml
   openapi: 3.0.3
   info:
     title: E-Commerce API
     version: 1.0.0
   paths:
     /api/users:
       get:
         tags: [Users]
         summary: List all users
         security:
           - bearerAuth: []
         responses:
           '200':
             description: Success
             content:
               application/json:
                 schema:
                   type: array
                   items:
                     $ref: '#/components/schemas/User'
   ```

3. **Bonus:** If Swagger UI is available, show the live API docs rendered from the generated spec

**Talking Point:** _"From code to interactive API documentation in 30 seconds. Share this with your frontend team and they can start building immediately."_

---

## Step 3 — Class Diagram or Sequence Diagram (1 min)

**Goal:** Quick demo of another diagram type.

1. Ask Copilot:
   ```
   Generate a Mermaid sequence diagram showing the complete flow 
   when a user places an order: from the API request through 
   authentication, validation, order creation, payment processing, 
   inventory update, and email notification. Base it on #codebase.
   ```

2. Show the generated sequence diagram:
   ```mermaid
   sequenceDiagram
       Client->>+API: POST /orders
       API->>+Auth: Validate JWT
       Auth-->>-API: User context
       API->>+OrderService: createOrder(data)
       OrderService->>+DB: Insert order
       DB-->>-OrderService: Order created
       OrderService->>+PaymentGateway: charge(amount)
       PaymentGateway-->>-OrderService: Payment confirmed
       OrderService->>+InventoryService: decrementStock()
       OrderService->>+NotificationService: sendConfirmation()
       OrderService-->>-API: Order response
       API-->>-Client: 201 Created
   ```

**Talking Point:** _"Sequence diagrams are invaluable for onboarding new team members — they show the runtime flow that static code doesn't reveal."_

---

## Key Takeaways to Reinforce

- **ER diagrams from ORM models** — Copilot reads decorators, schema files, and migrations
- **OpenAPI specs from route handlers** — complete with schemas, examples, and auth
- **Sequence diagrams from codebase** — trace runtime flows across services
- **Mermaid syntax** renders natively in GitHub, VS Code, and most doc tools
- **Re-generate when code changes** — diagrams stay current with minimal effort
