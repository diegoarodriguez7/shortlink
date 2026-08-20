---
agent: Instructions-Generator
---

Take this information below and generate an agent instructions .md file in the /docs directory. If a .md filename is provided, use that, otherwise generate an appropriate filename based on the generated content. Make sure to update the AGENTS.md file to reference this new docs file. If no information is provided below, prompt the user to give the necessary details about the layer of architecture or coding standards to document.

Include practical code examples that reflect the project’s actual conventions. The examples should be short, realistic, and aligned with the app’s architecture.

Example pattern for server actions in this repo:

```ts
// app/dashboard/components/LinkForm/actions.ts
import { z } from 'zod';
import { auth } from '@clerk/nextjs/server';
import { createLink } from '@/data/links';

const createLinkSchema = z.object({
  url: z.string().url(),
  slug: z.string().min(3).max(30),
});

export async function createLinkAction(input: { url: string; slug: string }) {
  const parsed = createLinkSchema.safeParse(input);
  if (!parsed.success) {
    return { error: 'Invalid link payload' };
  }

  const { userId } = await auth();
  if (!userId) {
    return { error: 'Unauthorized' };
  }

  const link = await createLink({ userId, ...parsed.data });
  return { success: true, data: link };
}
```

```tsx
'use client';

import { createLinkAction } from './actions';

export function LinkForm() {
  const handleSubmit = async () => {
    const result = await createLinkAction({
      url: 'https://example.com',
      slug: 'demo',
    });
    if (result.error) {
      console.error(result.error);
      return;
    }

    console.log(result.success);
  };

  return <button onClick={handleSubmit}>Create link</button>;
}
```

Use examples like this when documenting server actions, client invocation, validation, auth checks, and data helper usage. Make the output concise but concrete, and ensure examples do not use `FormData` or direct Drizzle queries in the server action.
