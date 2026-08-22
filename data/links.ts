import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { links } from "@/db/schema";

export async function getLinksByClerkUserId(clerkUserId: string) {
  return db
    .select()
    .from(links)
    .where(eq(links.clerkUserId, clerkUserId))
    .orderBy(desc(links.createdAt));
}

export async function getLinkByShortCode(shortCode: string) {
  const rows = await db
    .select()
    .from(links)
    .where(eq(links.shortCode, shortCode))
    .limit(1);
  return rows[0] ?? null;
}
