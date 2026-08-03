import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { Show, SignUpButton, SignInButton } from '@clerk/nextjs';
import { Link2, BarChart2, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

const features = [
  {
    icon: Link2,
    title: 'Shorten Any URL',
    description:
      'Turn long, unwieldy links into clean, shareable short URLs in seconds. Perfect for social media, emails, and campaigns.',
  },
  {
    icon: BarChart2,
    title: 'Track Every Click',
    description:
      'Get real-time analytics on every link you create. Know when, where, and how many times your links are being visited.',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description:
      'All redirects are handled at the edge for near-instant load times. Your audience never waits, no matter where they are.',
  },
];

export default async function Home() {
  const { userId } = await auth();
  if (userId) redirect('/dashboard');

  return (
    <div className="flex flex-col flex-1">
      {/* Hero */}
      <section className="flex flex-1 flex-col items-center justify-center gap-8 px-6 py-24 text-center">
        <div className="flex flex-col items-center gap-4 max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Short links. Big impact.
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl">
            ShortLink makes it easy to create, share, and track shortened URLs. Go from a messy
            link to a memorable one in one click.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Show when="signed-out">
            <SignUpButton mode="modal">
              <Button size="lg">Get Started Free</Button>
            </SignUpButton>
            <SignInButton mode="modal">
              <Button size="lg" variant="outline">
                Sign In
              </Button>
            </SignInButton>
          </Show>
        </div>
      </section>

      {/* Features */}
      <section className="border-t px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-center text-2xl font-semibold tracking-tight">
            Everything you need to manage your links
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {features.map(({ icon: Icon, title, description }) => (
              <Card key={title}>
                <CardHeader>
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t px-6 py-20 text-center">
        <div className="mx-auto max-w-lg flex flex-col items-center gap-6">
          <h2 className="text-2xl font-semibold tracking-tight">Ready to get started?</h2>
          <p className="text-muted-foreground">
            Create your free account today and start shortening links in minutes.
          </p>
          <Show when="signed-out">
            <SignUpButton mode="modal">
              <Button size="lg">Create Free Account</Button>
            </SignUpButton>
          </Show>
        </div>
      </section>
    </div>
  );
}
