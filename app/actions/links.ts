'use server';

import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { nanoid } from 'nanoid';
import { and, eq } from 'drizzle-orm';
import { db } from '@/db';
import { links } from '@/db/schema';

export type CreateLinkState =
  { success: true } | { success: false; error: string };
export type LinkMutationState =
  { success: true } | { success: false; error: string };

function parseOriginalUrl(value: FormDataEntryValue | null): string | null {
  if (typeof value !== 'string' || !value.trim()) {
    return null;
  }

  const url = value.trim();
  try {
    new URL(url);
    return url;
  } catch {
    return null;
  }
}

function parseLinkId(value: FormDataEntryValue | null): number | null {
  if (typeof value !== 'string') {
    return null;
  }
  if (!/^\d+$/.test(value)) {
    return null;
  }
  const id = Number.parseInt(value, 10);
  return Number.isFinite(id) ? id : null;
}

function isValidShortCode(value: string): boolean {
  return /^[a-zA-Z0-9_-]+$/.test(value);
}

export async function createLink(
  _prev: CreateLinkState | null,
  formData: FormData,
): Promise<CreateLinkState> {
  const { userId } = await auth();
  if (!userId) {
    return { success: false, error: 'You must be signed in to create a link.' };
  }

  const originalUrl = parseOriginalUrl(formData.get('originalUrl'));
  const customCode = formData.get('customCode');

  if (!originalUrl) {
    return {
      success: false,
      error: 'Please provide a valid URL including http:// or https://.',
    };
  }

  const shortCode =
    typeof customCode === 'string' && customCode.trim()
      ? customCode.trim()
      : nanoid(7);

  if (!isValidShortCode(shortCode)) {
    return {
      success: false,
      error:
        'Short code may only contain letters, numbers, hyphens, and underscores.',
    };
  }

  try {
    await db.insert(links).values({
      originalUrl,
      shortCode,
      clerkUserId: userId,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    if (msg.includes('unique') || msg.includes('duplicate')) {
      return {
        success: false,
        error: 'That short code is already taken. Please choose another.',
      };
    }
    return { success: false, error: 'Something went wrong. Please try again.' };
  }

  revalidatePath('/dashboard/links');
  return { success: true };
}

export async function updateLink(
  _prev: LinkMutationState | null,
  formData: FormData,
): Promise<LinkMutationState> {
  const { userId } = await auth();
  if (!userId) {
    return { success: false, error: 'You must be signed in to edit a link.' };
  }

  const linkId = parseLinkId(formData.get('linkId'));
  const originalUrl = parseOriginalUrl(formData.get('originalUrl'));
  const shortCodeRaw = formData.get('shortCode');
  const shortCode = typeof shortCodeRaw === 'string' ? shortCodeRaw.trim() : '';

  if (!linkId) {
    return { success: false, error: 'Invalid link selected for editing.' };
  }

  if (!originalUrl) {
    return {
      success: false,
      error: 'Please provide a valid URL including http:// or https://.',
    };
  }

  if (!shortCode) {
    return { success: false, error: 'Please provide a short code.' };
  }

  if (!isValidShortCode(shortCode)) {
    return {
      success: false,
      error:
        'Short code may only contain letters, numbers, hyphens, and underscores.',
    };
  }

  try {
    const updated = await db
      .update(links)
      .set({
        originalUrl,
        shortCode,
        updatedAt: new Date(),
      })
      .where(and(eq(links.id, linkId), eq(links.clerkUserId, userId)))
      .returning({ id: links.id });

    if (updated.length === 0) {
      return { success: false, error: 'Link not found or not editable.' };
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    if (msg.includes('unique') || msg.includes('duplicate')) {
      return {
        success: false,
        error: 'That short code is already taken. Please choose another.',
      };
    }
    return { success: false, error: 'Something went wrong. Please try again.' };
  }

  revalidatePath('/dashboard/links');
  return { success: true };
}

export async function deleteLink(
  _prev: LinkMutationState | null,
  formData: FormData,
): Promise<LinkMutationState> {
  const { userId } = await auth();
  if (!userId) {
    return { success: false, error: 'You must be signed in to delete a link.' };
  }

  const linkId = parseLinkId(formData.get('linkId'));
  if (!linkId) {
    return { success: false, error: 'Invalid link selected for deletion.' };
  }

  try {
    const deleted = await db
      .delete(links)
      .where(and(eq(links.id, linkId), eq(links.clerkUserId, userId)))
      .returning({ id: links.id });

    if (deleted.length === 0) {
      return { success: false, error: 'Link not found or not deletable.' };
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    if (msg.includes('permission') || msg.includes('denied')) {
      return {
        success: false,
        error: 'You do not have permission to delete this link.',
      };
    }
    return { success: false, error: 'Something went wrong. Please try again.' };
  }

  revalidatePath('/dashboard/links');
  return { success: true };
}
