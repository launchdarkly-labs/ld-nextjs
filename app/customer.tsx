// GOTCHA: page components must be async. Otherwise the ssr cache may not be initialized correctly.
import LDButton from '@/app/LDButton';
import { useLDClient } from '@/ld';

export default async function Customer() {
  const ldc = useLDClient();
  const flagValue = ldc.variation('dev-test-flag');

  return (
    <>
      context: {JSON.stringify(ldc.getContext())}
      <br />
      customer.tsx: {flagValue.toString()}
      <br />
      <LDButton />
    </>
  );
}
