import { getLDContext } from '@/app/utils';
import { LDProvider } from '@/ld/client';
import { getBootstrap } from '@/ld/server';
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
  // You must supply an LDContext. For example, here getLDContext
  // inspects cookies and defaults to anonymous.
  const context = getLDContext();

  // A bootstrap is required to initialize LDProvider.
  const bootstrap = await getBootstrap(context);

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
