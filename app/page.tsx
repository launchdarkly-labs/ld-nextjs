import LDButton from '@/app/LDButton';
import { useLDClient } from '@/ld';
import { LDProvider } from '@/ld/client';
import { initSkinnySdk } from '@/ld/server/initSkinnySdk';

export default async function Home() {
  const { context, bootstrap } = await initSkinnySdk({ kind: 'user', key: 'nextjs-default-user' });
  const ldc = useLDClient();
  const flagValue = ldc.variation('dev-test-flag');

  return (
    <LDProvider context={context} options={{ bootstrap }}>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        Server rendered
        <br />
        flagValue is {flagValue ? 'true' : 'false'}.
        <br />
        <LDButton />
      </main>
    </LDProvider>
  );
}
