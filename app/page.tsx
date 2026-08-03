import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { Show, SignUpButton } from '@clerk/nextjs';
import { Link2, BarChart2, Zap, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const features = [
  {
    icon: Zap,
    title: 'Instant Short Links',
    description:
      'Paste any long URL and get a clean, shareable short link in seconds. No friction, no fuss.',
  },
  {
    icon: Link2,
    title: 'Memorable & Branded',
    description:
      'Create custom slugs that reflect your brand or content so people know exactly where they\'re headed.',
  },
  {
    icon: BarChart2,
    title: 'Click Analytics',
    description:
      'See how many times each link has been clicked. Understand your audience and optimise your sharing.',
  },
  {
    icon: Shield,
    title: 'Secure & Reliable',
    description:
      'All links are stored securely and served with minimal latency so your audience is never left waiting.',
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
          Shorten links.{' '}
          <span className="text-muted-foreground">Share smarter.</span>
        </h1>
        <p className="max-w-xl text-lg text-muted-foreground">
          ShortLink turns unwieldy URLs into clean, memorable links you can
          share anywhere — with built-in analytics to track every click.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Show when="signed-out">
            <SignUpButton mode="modal">
              <Button size="lg" className="px-8">
                Get started for free
              </Button>
            </SignUpButton>
          </Show>
        </div>
      </section>

      {/* Features */}
      <section className="border-t px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-12 text-center text-2xl font-semibold tracking-tight sm:text-3xl">
            Everything you need to share links with confidence
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map(({ icon: Icon, title, description }) => (
              <Card key={title}>
                <CardHeader>
                  <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-muted">
                    <Icon className="size-5 text-foreground" />
                  </div>
                  <CardTitle>{title}</CardTitle>
                  <CardDescription>{description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t bg-muted/40 px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-2xl font-semibold tracking-tight sm:text-3xl">
            Three steps to a shorter link
          </h2>
          <p className="mb-12 text-muted-foreground">
            From long and forgettable to short and shareable in moments.
          </p>
          <ol className="grid gap-8 sm:grid-cols-3">
            {[
              { step: '1', label: 'Sign up', detail: 'Create a free account in seconds with just your email.' },
              { step: '2', label: 'Paste your URL', detail: 'Drop any long link into the dashboard and hit shorten.' },
              { step: '3', label: 'Share & track', detail: 'Copy your short link, share it, and watch the clicks roll in.' },
            ].map(({ step, label, detail }) => (
              <li key={step} className="flex flex-col items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">
                  {step}
                </span>
                <span className="font-semibold">{label}</span>
                <span className="text-sm text-muted-foreground">{detail}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t px-6 py-20 text-center">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight sm:text-3xl">
          Ready to start shortening?
        </h2>
        <p className="mb-8 text-muted-foreground">
          Join thousands of users who trust ShortLink to manage their links.
        </p>
        <Show when="signed-out">
          <SignUpButton mode="modal">
            <Button size="lg" className="px-8">
              Create your free account
            </Button>
          </SignUpButton>
        </Show>
      </section>
    </div>
  );
}
