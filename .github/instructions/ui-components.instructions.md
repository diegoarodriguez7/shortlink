---
description: Read this file before implementing or modifying UI components in the application.
---

# shadcn/ui Components

## Overview

- All UI in this app is built with shadcn/ui. Never hand-roll custom buttons, inputs, dialogs, dropdowns, cards, etc. — always use (or add) the shadcn/ui equivalent.
- Config lives in [components.json](../components.json); generated primitives live in `components/ui/`, imported via the `@/components/ui/*` alias.

## Version note

This project uses `shadcn@^4.16` with the `base-nova` style, which is built on **`@base-ui/react`, not Radix UI**. Don't assume Radix-based props/APIs from older shadcn examples or training data — check the generated component in `components/ui/` first (see [button.tsx](../components/ui/button.tsx) for an example).

## Adding a component

If a needed primitive doesn't exist yet in `components/ui/`, scaffold it with the CLI instead of writing it by hand:

```
npx shadcn@latest add <component>
```

This uses the project's [components.json](../components.json) config (`style: base-nova`, `baseColor: neutral`, `iconLibrary: lucide`) to generate the component in the right place.

## Usage

Import shadcn/ui primitives via the alias and compose feature-level UI from them:

```tsx
import { Button } from "@/components/ui/button";
```

Feature components (e.g. a link card or a form) should be composed from shadcn/ui primitives, not built as raw `<button>`/`<input>`/`<div>` trees that duplicate what shadcn already provides.

## Non-negotiables

- Never create custom UI primitives (buttons, inputs, modals, dropdowns, etc.) from scratch — always use the shadcn/ui equivalent.
- If a required shadcn/ui component isn't installed yet, add it with `npx shadcn@latest add <component>`; don't recreate it manually.
- Don't import Radix UI directly or mix in another component library — this project's shadcn setup is built on `@base-ui/react`.
- Icons come from `lucide-react` (per `components.json` `iconLibrary`), consistent with installed shadcn components.
