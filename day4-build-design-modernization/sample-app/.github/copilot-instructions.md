## Coding Standards

- Use TypeScript strict mode
- Use express-validator for all input validation
- Error responses must follow RFC 7807 (Problem Details for HTTP APIs)
- All service functions must be async
- Use winston for structured logging — never use console.log
- Use bcrypt with cost factor 12 for password hashing
- All timestamps stored as UTC in the database
- Soft-delete entities (set isActive = false) instead of hard deletes
- Paginate all list endpoints (default: 20 items per page, max: 100)

## Architecture

- **Routes** → thin HTTP layer, delegate to services
- **Services** → business logic, call models and external services
- **Models** → Sequelize ORM entities with clear relationships
- **Middleware** → cross-cutting: auth, validation, error handling
- **Config** → environment-based settings, no hardcoded values

## Testing

- Unit tests in `tests/` mirroring `src/` structure
- Use Jest with ts-jest preset
- Mock external dependencies (database, Redis) in unit tests
- Test happy path + error scenarios + edge cases

## API Design

- RESTful resource-based endpoints: /api/{resource}
- Bearer JWT authentication on protected routes
- Admin-only routes require `authorizeAdmin` middleware
- Product listing and search are public (no auth required)
