'use client';

import LDButton from '@/app/LDButton';
import { useLDClient } from '@/ld';

export default function Home() {
  const ldc = useLDClient();
  const flagValue = ldc.variation('dev-test-flag');

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      From server, flagValue is {flagValue ? 'true' : 'false'}. <br />
      Below is LDButton.
      <LDButton />
    </main>
  );
}
