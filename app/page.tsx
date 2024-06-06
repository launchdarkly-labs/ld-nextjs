import LDButton from '@/app/LDButton';
import NextClient from '@/ld/nextClient';

export default async function Home() {
  const flagValue = await NextClient.get().variation('dev-test-flag', false);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>{flagValue ? 'Hello from LD! Flag true' : 'Flag false'}</p>
      <LDButton />
    </main>
  );
}
