'use client';

import { useActionState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createLink, type CreateLinkState } from '@/app/actions/links';
import { Plus } from 'lucide-react';
import { useState } from 'react';

export function CreateLinkDialog() {
  const [open, setOpen] = useState(false);
  const [state, formAction, pending] = useActionState<
    CreateLinkState | null,
    FormData
  >(createLink, null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.success) {
      const id = setTimeout(() => {
        setOpen(false);
        formRef.current?.reset();
      }, 0);
      return () => clearTimeout(id);
    }
  }, [state]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create link
          </Button>
        }
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a short link</DialogTitle>
          <DialogDescription>
            Paste a long URL and optionally pick a custom short code.
          </DialogDescription>
        </DialogHeader>
        <form ref={formRef} action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="originalUrl">Destination URL</Label>
            <Input
              id="originalUrl"
              name="originalUrl"
              type="url"
              placeholder="https://example.com/very/long/url"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="customCode">
              Short code{' '}
              <span className="text-muted-foreground font-normal">
                (optional)
              </span>
            </Label>
            <Input
              id="customCode"
              name="customCode"
              placeholder="my-link"
              pattern="[a-zA-Z0-9_\-]+"
              title="Letters, numbers, hyphens, and underscores only"
            />
          </div>
          {state && !state.success && (
            <p className="text-destructive text-sm">{state.error}</p>
          )}
          <DialogFooter>
            <Button type="submit" disabled={pending}>
              {pending ? 'Creating…' : 'Create link'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
