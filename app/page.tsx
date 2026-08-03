import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { Show, SignUpButton, SignInButton } from '@clerk/nextjs';
import { Link2, BarChart3, Zap, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const features = [
  {
    icon: Link2,
    title: 'Shorten Any URL',
    description:
      'Turn long, unwieldy links into clean, shareable short URLs in seconds.',
  },
  {
    icon: BarChart3,
    title: 'Track Every Click',
    description:
      'Get real-time analytics on who clicks your links, when, and how often.',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description:
      'Redirects happen in milliseconds so your audience never waits.',
  },
  {
    icon: Shield,
    title: 'Secure & Reliable',
    description:
      'All links are protected and routed through a highly available infrastructure.',
  },
];

export default async function Home() {
  const { userId } = await auth();
  if (userId) redirect('/dashboard');

  return (
    <div className="flex flex-1 flex-col">
      {/* Hero */}
      <section className="flex flex-1 flex-col items-center justify-center gap-8 px-6 py-24 text-center">
        <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl">
          Short links.{' '}
          <span className="text-muted-foreground">Big results.</span>
        </h1>
        <p className="max-w-xl text-lg text-muted-foreground">
          ShortLink helps you create, manage, and track short URLs — all from
          one simple dashboard.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Show when="signed-out">
            <SignUpButton mode="modal">
              <Button size="lg">Get started for free</Button>
            </SignUpButton>
            <SignInButton mode="modal">
              <Button size="lg" variant="outline">
                Sign in
              </Button>
            </SignInButton>
          </Show>
        </div>
      </section>

      {/* Features */}
      <section className="border-t px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-12 text-center text-2xl font-semibold tracking-tight sm:text-3xl">
            Everything you need to share smarter
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map(({ icon: Icon, title, description }) => (
              <Card key={title}>
                <CardHeader>
                  <Icon className="mb-2 size-8 text-muted-foreground" />
                  <CardTitle>{title}</CardTitle>
                  <CardDescription>{description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t px-6 py-20 text-center">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight sm:text-3xl">
          Ready to get started?
        </h2>
        <p className="mb-8 text-muted-foreground">
          Create your free account and shorten your first link in under a
          minute.
        </p>
        <Show when="signed-out">
          <SignUpButton mode="modal">
            <Button size="lg">Create free account</Button>
          </SignUpButton>
        </Show>
      </section>
    </div>
  );
}
