import { SignInButton, SignUpButton } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import { ArrowRight, BarChart3, Link2, ShieldCheck, Sparkles } from 'lucide-react';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';

const features = [
  {
    title: 'Create short links in seconds',
    description: 'Turn long URLs into clean, shareable links from a single dashboard.',
    icon: Link2,
  },
  {
    title: 'Track click performance',
    description: 'Understand what works with clear analytics for every short link you publish.',
    icon: BarChart3,
  },
  {
    title: 'Secure, authenticated access',
    description: 'Manage your links safely with protected routes and account-based control.',
    icon: ShieldCheck,
  },
];

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect('/dashboard');
  }

  return (
    <main className="flex flex-1 flex-col bg-background">
      <section className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 py-16 md:px-10">
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-6 text-center">
          <p className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm text-muted-foreground">
            <Sparkles className="size-4" />
            Smart link management for teams and creators
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Share cleaner links and learn what gets clicks.
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground">
            ShortLink helps you create, organize, and measure short URLs so every campaign is easier
            to launch and optimize.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <SignUpButton mode="modal">
              <Button size="lg">
                Get started
                <ArrowRight className="size-4" />
              </Button>
            </SignUpButton>
            <SignInButton mode="modal">
              <Button size="lg" variant="outline">
                I already have an account
              </Button>
            </SignInButton>
          </div>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {features.map(({ title, description, icon: Icon }) => (
            <article
              key={title}
              className="rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
              <div className="mb-4 inline-flex rounded-lg border bg-muted p-2">
                <Icon className="size-5" />
              </div>
              <h2 className="text-lg font-medium">{title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
