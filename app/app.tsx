'use client';

import { useLDClient } from '@/ld';

export default function App() {
  const ldc = useLDClient();
  const flagValue = ldc.variation('dev-test-flag');

  return (
    <p>
      <b>app.tsx</b>
      <br />
      <br />
      context: {JSON.stringify(ldc.getContext())}
      <br />
      flagValue: {flagValue.toString()}
      <br />
    </p>
  );
}
