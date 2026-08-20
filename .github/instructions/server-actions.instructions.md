---
description: Read this file before implementing or modifying any data mutation flow.
---

# Server Actions for Data Mutations

## Scope

All data mutations in this app must be implemented through Server Actions.

## Required pattern

1. **Mutations only in Server Actions**
   - Create, update, and delete operations must run in Server Actions.
   - Do not perform mutations directly in Client Components.

2. **Call path**
   - Server Actions must be invoked from Client Components.

3. **File naming and location**
   - Action files must be named `actions.ts`.
   - `actions.ts` must be colocated in the same directory as the Client Component that calls it.

4. **Typed inputs**
   - All action inputs must use explicit TypeScript types/interfaces.
   - Do not use `FormData` as the action input type.

5. **Validation**
   - Validate all action inputs with `zod` inside the Server Action before business logic.

6. **Authentication guard first**
   - Every Server Action must check for a logged-in user before any database operation.
   - Use Clerk auth and fail fast if unauthenticated.

7. **Database access layer**
   - Server Actions must not execute Drizzle queries directly.
   - Use helper functions in the [data/](/Users/diegoadrianrodriguez/Desktop/gitHubCoPilot/linkShortener/shortlink/data) directory for all database operations.
   - Drizzle queries should be wrapped inside those data helper functions.

## Non-negotiables

- Never place mutation logic directly in Client Components.
- Never put mutation actions in files not named `actions.ts`.
- Never bypass zod validation.
- Never run database operations before auth checks.
- Never import/use Drizzle directly from Server Actions; use `data/` helpers only.
- Server Actions must not throw errors. They should return an object with either an `error` or `success` property and any relevant payload.
