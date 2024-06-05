import { getLDClient } from '@/ld/lib';

export default async function Home() {
  const nodeClient = getLDClient();
  const context = { kind: 'user', key: 'test-user-key-1' };
  const flagValue = await nodeClient.variation('dev-test-flag', context, false);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>{flagValue ? 'Hello from LD! Flag true' : 'Flag false'}</p>
    </main>
  );
}
