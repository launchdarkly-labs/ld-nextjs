'use client';

import { useLDClient } from '@/ld/client';

// Client Components must useLDClient for evaluation.
export default function LDButton() {
  const ldc = useLDClient();
  const flagValue = ldc.variation('dev-test-flag');

  return <p>LDButton: {flagValue.toString()}</p>;
}
