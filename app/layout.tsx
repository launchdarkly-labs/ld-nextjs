import { LDProvider } from '@/ld/client';
import { initSsrLDClient } from '@/ld/server';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'LaunchDarkly NextJS Universal',
  description: 'Universal SDK Configuration for NextJS App Router',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  // Sets up the ssr client and share it across pages.
  const { context, bootstrap } = await initSsrLDClient();

  return (
    <html lang="en">
      <body className={inter.className}>
        <LDProvider context={context} options={{ bootstrap }}>
          {children}
        </LDProvider>
      </body>
    </html>
  );
}
