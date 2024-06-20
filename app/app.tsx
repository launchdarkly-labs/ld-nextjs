import LDButton from '@/app/LDButton';
import { useLDClient } from '@/ld';

// All remaining server and client components can use the universal
// useLDClient hook to evaluate flags.
export default function App() {
  const ldc = useLDClient();
  const flagValue = ldc.variation('dev-test-flag');

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      app.tsx: {flagValue.toString()}
      <br />
      <LDButton />
    </main>
  );
}
