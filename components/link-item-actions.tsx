'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import {
  deleteLink,
  type LinkMutationState,
  updateLink,
} from '@/app/actions/links';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type LinkItemActionsProps = {
  linkId: number;
  shortCode: string;
  originalUrl: string;
};

export function LinkItemActions({
  linkId,
  shortCode,
  originalUrl,
}: LinkItemActionsProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [editState, editAction, isEditing] = useActionState<
    LinkMutationState | null,
    FormData
  >(updateLink, null);
  const [deleteState, deleteAction, isDeleting] = useActionState<
    LinkMutationState | null,
    FormData
  >(deleteLink, null);

  const editFormRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (editState?.success) {
      const id = setTimeout(() => {
        setIsEditOpen(false);
        editFormRef.current?.reset();
      }, 0);
      return () => clearTimeout(id);
    }
  }, [editState]);

  useEffect(() => {
    if (deleteState?.success) {
      const id = setTimeout(() => setIsDeleteOpen(false), 0);
      return () => clearTimeout(id);
    }
  }, [deleteState]);

  return (
    <div className="flex items-center gap-2">
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogTrigger
          render={
            <Button size="sm" variant="outline">
              <Pencil className="mr-1.5 h-3.5 w-3.5" />
              Edit
            </Button>
          }
        />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit link</DialogTitle>
            <DialogDescription>
              Update the destination URL or short code.
            </DialogDescription>
          </DialogHeader>
          <form ref={editFormRef} action={editAction} className="space-y-4">
            <input type="hidden" name="linkId" value={linkId} />
            <div className="space-y-2">
              <Label htmlFor={`originalUrl-${linkId}`}>Destination URL</Label>
              <Input
                id={`originalUrl-${linkId}`}
                name="originalUrl"
                type="url"
                defaultValue={originalUrl}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`shortCode-${linkId}`}>Short code</Label>
              <Input
                id={`shortCode-${linkId}`}
                name="shortCode"
                defaultValue={shortCode}
                pattern="[a-zA-Z0-9_\-]+"
                title="Letters, numbers, hyphens, and underscores only"
                required
              />
            </div>
            {editState && !editState.success && (
              <p className="text-sm text-destructive">{editState.error}</p>
            )}
            <DialogFooter>
              <Button type="submit" disabled={isEditing}>
                {isEditing ? 'Saving…' : 'Save changes'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogTrigger
          render={
            <Button size="sm" variant="destructive">
              <Trash2 className="mr-1.5 h-3.5 w-3.5" />
              Delete
            </Button>
          }
        />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete link?</DialogTitle>
            <DialogDescription>
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <form action={deleteAction} className="space-y-4">
            <input type="hidden" name="linkId" value={linkId} />
            <p className="text-sm text-muted-foreground">
              Are you sure you want to delete /{shortCode}?
            </p>
            {deleteState && !deleteState.success && (
              <p className="text-sm text-destructive">{deleteState.error}</p>
            )}
            <DialogFooter className="sm:justify-between">
              <DialogClose render={<Button type="button" variant="outline" />}>
                Cancel
              </DialogClose>
              <Button type="submit" variant="destructive" disabled={isDeleting}>
                {isDeleting ? 'Deleting…' : 'Delete link'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
