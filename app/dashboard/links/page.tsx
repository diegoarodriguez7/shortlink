import { auth } from "@clerk/nextjs/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getLinksByClerkUserId } from "@/data/links";
import { CreateLinkDialog } from "@/components/create-link-dialog";
import { LinkItemActions } from "@/components/link-item-actions";

export default async function DashboardLinksPage() {
  const { userId } = await auth();
  const userLinks = userId ? await getLinksByClerkUserId(userId) : [];

  return (
    <section className="mx-auto w-full max-w-4xl px-6 py-10">
      <Card>
        <CardHeader className="flex flex-row items-start justify-between gap-4">
          <div>
            <CardTitle>Your links</CardTitle>
            <CardDescription>
              Links created by your account appear here.
            </CardDescription>
          </div>
          <CreateLinkDialog />
        </CardHeader>
        <CardContent>
          {userLinks.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              You have not created any links yet.
            </p>
          ) : (
            <ul className="space-y-3">
              {userLinks.map((link) => (
                <li
                  key={link.id}
                  className="flex flex-col gap-3 rounded-md border p-4 sm:flex-row sm:items-start sm:justify-between"
                >
                  <div>
                    <p className="text-sm font-medium">/{link.shortCode}</p>
                    <p className="text-muted-foreground mt-1 text-sm break-all">
                      {link.originalUrl}
                    </p>
                  </div>
                  <LinkItemActions
                    linkId={link.id}
                    shortCode={link.shortCode}
                    originalUrl={link.originalUrl}
                  />
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
