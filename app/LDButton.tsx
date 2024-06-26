'use client';

import { useLDClient } from '@/ld';

// This is a client component also rendered on the server.
export default function LDButton() {
  const ldc = useLDClient();
  const flagValue = ldc.variation('dev-test-flag');

  return <p>LDButton: {flagValue.toString()}</p>;
}
