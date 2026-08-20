<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

- **[Auuthentication Guidelines](/clerk-auth.md)** - Clerk integration, route protection, and auth patterns.
- **[UI Components](/shadcn-ui.md)** - shadcn/ui usage and component conventions.

## Project

`shortlink` is a Next.js 16 (App Router) link-shortener app using Clerk for auth, Drizzle ORM + Neon Postgres for data, and Tailwind v4 + shadcn/ui for styling.

## Coding standards

## Non-negotiables

- Never create `middleware.ts` — use the existing `proxy.ts` (see [docs/nextjs-conventions.md](docs/nextjs-conventions.md)).
- Clerk is the only auth mechanism; `/dashboard` is protected and modals are used for sign-in/sign-up (see [docs/clerk-auth.md](docs/clerk-auth.md)).
- All UI must use shadcn/ui components; never build custom UI primitives (see [docs/shadcn-ui.md](docs/shadcn-ui.md)).
- Never use `any` or disable `strict` TypeScript checks.
- Never instantiate a new Drizzle client — import `db` from `@/db`.
- Never hardcode secrets; read them from `process.env` and never print `.env` contents.
- Run `npm run lint` after code changes and fix any new errors before considering a task done.
