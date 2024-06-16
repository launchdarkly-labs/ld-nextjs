import { getBootstrap } from '@/ld/globals';
import LDProvider from '@/ld/provider/LDProvider';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  // In production, contexts should be obtained from cookies.
  // We are hard-coding the context here as a contrived example.
  const context = { kind: 'user', key: 'nextjs-user-1' };

  // Uses the node sdk allFlagsState to generate bootstrap values
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
