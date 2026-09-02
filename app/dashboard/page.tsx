import Link from 'next/link';
import { Show, SignUpButton } from '@clerk/nextjs';
import { Link2, BarChart2, Shield, Zap, Globe, Copy } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';

const features = [
  {
    icon: Zap,
    title: 'Instant Shortening',
    description:
      'Paste any long URL and get a clean, shareable short link in seconds — no sign-up required to try it.',
  },
  {
    icon: BarChart2,
    title: 'Click Analytics',
    description:
      'Track how many times your links are clicked. Know exactly how your audience is engaging with your content.',
  },
  {
    icon: Copy,
    title: 'Easy Management',
    description:
      'All your short links live in one organised dashboard. Edit, copy, or delete them whenever you need.',
  },
  {
    icon: Globe,
    title: 'Reliable Redirects',
    description:
      'Every redirect is fast and dependable, so your audience always lands where you intend.',
  },
  {
    icon: Link2,
    title: 'Custom Aliases',
    description:
      'Choose a meaningful slug for your link instead of a random string to make it memorable and brand-friendly.',
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description:
      'Your links and data are protected with industry-standard security. Only you control your short links.',
  },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-1 flex-col">
      <section className="flex flex-1 flex-col items-center justify-center gap-8 px-6 py-24 text-center">
        <div className="flex flex-col items-center gap-4">
          <span className="text-muted-foreground rounded-full border px-4 py-1 text-sm">
            Simple · Fast · Free
          </span>
          <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Shorten URLs. <span className="text-primary">Share smarter.</span>
          </h1>
          <p className="text-muted-foreground max-w-xl text-lg">
            ShortLink turns lengthy, unwieldy URLs into clean, trackable short
            links you can share anywhere — in seconds.
          </p>
        </div>
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <Show when="signed-out">
            <SignUpButton mode="modal" forceRedirectUrl="/dashboard/links">
              <Button size="lg" className="px-8">
                Get started for free
              </Button>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            <Link
              href="/dashboard/links"
              className={buttonVariants({ size: 'lg', className: 'px-8' })}
            >
              Go to your links
            </Link>
          </Show>
        </div>
      </section>

      <section id="features" className="bg-muted/40 px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              Everything you need to manage your links
            </h2>
            <p className="text-muted-foreground mt-3">
              A simple yet powerful set of tools to create, track, and share
              your short links.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, description }) => (
              <Card key={title}>
                <CardHeader>
                  <div className="bg-primary/10 mb-2 flex size-10 items-center justify-center rounded-lg">
                    <Icon className="text-primary size-5" />
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

      <section className="px-6 py-20 text-center">
        <div className="mx-auto flex max-w-xl flex-col items-center gap-6">
          <h2 className="text-3xl font-bold tracking-tight">
            Ready to shorten your first link?
          </h2>
          <p className="text-muted-foreground">
            Create a free account and start shortening links in under a minute.
          </p>
          <Show when="signed-out">
            <SignUpButton mode="modal" forceRedirectUrl="/dashboard/links">
              <Button size="lg" className="px-8">
                Create your free account
              </Button>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            <Link
              href="/dashboard/links"
              className={buttonVariants({ size: 'lg', className: 'px-8' })}
            >
              Manage your links
            </Link>
          </Show>
        </div>
      </section>
    </div>
  );
}
