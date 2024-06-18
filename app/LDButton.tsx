'use client';

import { useLDClient } from '@/ld';

export default function LDButton() {
  const ldc = useLDClient('LDButton');
  const flagValue = ldc.variation('dev-test-flag');

  return <p>{flagValue ? 'Hello from LD! Flag true' : 'Flag false'}</p>;
}
