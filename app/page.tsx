import LDButton from '@/app/LDButton';
import { useLDClient } from '@/ld';
import { setupServerCache } from '@/ld/server/cacheMap';

export default async function Home() {
  await setupServerCache({ kind: 'user', key: 'nextjs-default-user' });

  const ldc = useLDClient('page.tsx');
  const flagValue = ldc.variation('dev-test-flag');

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Server rendered
      <br />
      context: {JSON.stringify(ldc.getContext())}
      <br />
      flagValue is {flagValue ? 'true' : 'false'}.
      <br />
      <LDButton />
    </main>
  );
}
