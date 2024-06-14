'use client';

import { useLDClient } from '@/ld/hooks';

export default async function LDButton() {
  const ldc = useLDClient();
  const flagValue = await ldc?.variation('dev-test-flag');

  return <p>{flagValue ? 'Hello from LD! Flag true' : 'Flag false'}</p>;
}