import Link from 'next/link';
import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="flex items-center justify-between border-b px-6 py-4">
      <Link href="/" className="text-lg font-semibold">
        ShortLink
      </Link>
      <div className="flex items-center gap-3">
        <Show when="signed-out">
          <SignInButton mode="modal" forceRedirectUrl="/dashboard">
            <Button variant="outline">Sign In</Button>
          </SignInButton>
          <SignUpButton mode="modal" forceRedirectUrl="/dashboard">
            <Button>Sign Up</Button>
          </SignUpButton>
        </Show>
        <Show when="signed-in">
          <UserButton />
        </Show>
      </div>
    </header>
  );
}
