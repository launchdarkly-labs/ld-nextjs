'use client';

import LDButton from '@/app/LDButton';
import { useLDClient } from '@/ld';

export default function Invoice() {
  const ldc = useLDClient();
  const flagValue = ldc.variation('dev-test-flag');

  return (
    <>
      <b>Invoice</b>
      <br />
      <br />
      context: {JSON.stringify(ldc.getContext())}
      <br />
      invoice.tsx: {flagValue.toString()}
      <br />
      <br />
      <LDButton />
    </>
  );
}
