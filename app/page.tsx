import LDButton from '@/app/LDButton';
import { useLDClientNode } from '@/ld/server/useLDClientNode';

export default async function Page() {
  const ldc = await useLDClientNode();
  const flagValue = ldc.variation('dev-test-flag');

  return (
    <>
      <b>page.tsx</b>
      <br />
      <br />
      context: {JSON.stringify(ldc.getContext())}
      <br />
      flagValue: {flagValue.toString()}
      <br />
      <br />
      <LDButton />
    </>
  );
}
