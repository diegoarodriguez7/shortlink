import {
  index,
  integer,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

export const links = pgTable(
  "links",
  {
    id: integer("id").generatedAlwaysAsIdentity().primaryKey(),
    shortCode: varchar("short_code", { length: 64 }).notNull(),
    originalUrl: text("original_url").notNull(),
    clerkUserId: varchar("clerk_user_id", { length: 255 }),
    clickCount: integer("click_count").notNull().default(0),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    uniqueIndex("links_short_code_unique").on(table.shortCode),
    index("links_clerk_user_id_idx").on(table.clerkUserId),
  ],
);

export type Link = typeof links.$inferSelect;
export type NewLink = typeof links.$inferInsert;
