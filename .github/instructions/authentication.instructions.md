---
description: Read this file before implementing or modifying authentication in the application.
---

# Clerk Authentication

## Overview

- Clerk (`@clerk/nextjs`) is the **only** authentication mechanism in this app. Never add NextAuth/Auth.js, Passport, custom JWT/session handling, or any other auth library or hand-rolled login flow.
- `clerkMiddleware()` is wired up in [proxy.ts](../proxy.ts) — never create a `middleware.ts` file (see [nextjs-conventions.md](nextjs-conventions.md)).
- `<ClerkProvider>` wraps the app in [app/layout.tsx](../app/layout.tsx) and must remain there.

## Version note

This project uses `@clerk/nextjs@^7`, which **removed `<SignedIn>` / `<SignedOut>`** in favor of the `<Show>` component, among other API changes. Before writing auth code, verify the installed API in `node_modules/@clerk/nextjs` — do not rely on older Clerk examples or training data.

## Conditional rendering

Use `<Show when="signed-in">` / `<Show when="signed-out">` (from `@clerk/nextjs`) instead of the removed `<SignedIn>`/`<SignedOut>`:

```tsx
import { Show } from '@clerk/nextjs';

<Show when="signed-in">
  <UserButton />
</Show>
<Show when="signed-out">
  <SignInButton mode="modal" />
</Show>
```

## Sign in / sign up UI

- Always render `SignInButton` and `SignUpButton` with `mode="modal"`. Never build or link to a dedicated `/sign-in` or `/sign-up` route/page.

```tsx
import { SignInButton, SignUpButton } from '@clerk/nextjs';

<SignInButton mode="modal" />
<SignUpButton mode="modal" />
```

## Protecting `/dashboard`

`/dashboard` requires an authenticated user. Enforce this centrally in `proxy.ts` with `createRouteMatcher` + `auth.protect()`, not with ad-hoc checks scattered across pages:

```ts
// proxy.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect(); // redirects unauthenticated users to sign-in
  }
});
```

`auth()` is async in Server Components / Route Handlers — always `await` it:

```ts
const { userId } = await auth();
```

## Homepage redirect

Signed-in users landing on `/` must be redirected to `/dashboard`:

```tsx
// app/page.tsx
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const { userId } = await auth();
  if (userId) redirect("/dashboard");
  // ...render logged-out homepage
}
```

## Non-negotiables

- Clerk is the only auth mechanism — never add another auth library or hand-rolled session/JWT logic.
- Never create `middleware.ts` for auth — extend `proxy.ts` instead.
- `SignInButton`/`SignUpButton` must always use `mode="modal"`; never build dedicated sign-in/sign-up pages.
- `/dashboard` must be protected via `proxy.ts` route matching, not only client-side checks.
- Signed-in users hitting `/` must be redirected to `/dashboard`.
