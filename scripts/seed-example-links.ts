import "dotenv/config";
import { nanoid } from "nanoid";
import { db } from "@/db";
import { links, type NewLink } from "@/db/schema";

const CLERK_USER_ID = "user_3HPS0kzC5TK5YWVBDkNWHdcV1EU";

const exampleUrls = [
  "https://www.nextjs.org/docs/app",
  "https://www.typescriptlang.org/docs/",
  "https://orm.drizzle.team/docs/overview",
  "https://neon.tech/docs/introduction",
  "https://clerk.com/docs",
  "https://ui.shadcn.com/docs",
  "https://tailwindcss.com/docs",
  "https://react.dev/learn",
  "https://github.com/diegoarodriguez7/shortlink",
  "https://vercel.com/docs",
];

const exampleLinks: NewLink[] = exampleUrls.map((originalUrl, index) => ({
  shortCode: nanoid(8),
  originalUrl,
  clerkUserId: CLERK_USER_ID,
  clickCount: index * 3,
}));

async function main() {
  const inserted = await db.insert(links).values(exampleLinks).returning();
  console.log(
    `Inserted ${inserted.length} example links for ${CLERK_USER_ID}:`,
  );
  console.table(
    inserted.map((link) => ({
      id: link.id,
      shortCode: link.shortCode,
      originalUrl: link.originalUrl,
      clickCount: link.clickCount,
    })),
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Failed to seed example links:", error);
    process.exit(1);
  });
