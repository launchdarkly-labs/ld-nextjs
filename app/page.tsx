'use client';

import LDButton from '@/app/LDButton';
import { useLDClient } from '@/ld';

export default function Home() {
  const ldc = useLDClient();
  const flagValue = ldc.variation('dev-test-flag');

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <b>Server rendered</b>
      <div>context: {JSON.stringify(ldc.getContext())}</div>
      <div>flagValue is {flagValue ? 'true' : 'false'}.</div>
      <div>
        Below is LDButton.
        <LDButton />
      </div>
    </main>
  );
}
