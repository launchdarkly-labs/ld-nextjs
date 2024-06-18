import LDButton from '@/app/LDButton';
import { useLDClient } from '@/ld';

export default async function App() {
  const ldc = useLDClient();
  const flagValue = ldc.variation('dev-test-flag');

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Server rendered. FlagValue is {flagValue ? 'true' : 'false'}.
      <br />
      <LDButton />
    </main>
  );
}
