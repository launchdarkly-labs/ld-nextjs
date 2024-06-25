import App from '@/app/app';
import { useLDClient } from '@/ld';
import { initSsrLDClient } from '@/ld/server';

// Root page component must be async.
export default async function Page() {
  await initSsrLDClient();
  const ldc = useLDClient();
  const flagValue = ldc.variation('dev-test-flag');

  return (
    <>
      context: {JSON.stringify(ldc.getContext())}
      <br />
      page.tsx: {flagValue.toString()}
      <App />
    </>
  );
}
