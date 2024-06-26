import App from '@/app/app';
import LDButton from '@/app/LDButton';
import { useLDClientNode } from '@/ld/server';

/**
 * To get the ldClient object:
 * useLDClientNode for server components. Must be marked as async.
 * useLDClient for client components and shared components. Must be marked with 'use client'.
 */
export default async function Page() {
  const ldc = await useLDClientNode();
  const flagValue = ldc.variation('dev-test-flag');

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <b>page.tsx</b>
      <br />
      <br />
      context: {JSON.stringify(ldc.getContext())}
      <br />
      flagValue: {flagValue.toString()}
      <br />
      <App />
      <br />
      <LDButton />
    </main>
  );
}
