import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import { Geist, Geist_Mono } from 'next/font/google';
import { Header } from '@/components/header';
import { shadcn } from '@clerk/themes';
import { shadesOfPurple } from '@clerk/themes';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'ShortLink – Shorten URLs, Share Smarter',
  description:
    'ShortLink turns lengthy URLs into clean, trackable short links you can share anywhere — in seconds.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{ theme: shadcn }}>
      <html
        lang="en"
        className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
      >
        <body className="flex min-h-full flex-col">
          <Header />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
