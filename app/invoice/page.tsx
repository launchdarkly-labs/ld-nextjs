import LDButton from '@/app/LDButton';
import { getLDContext } from '@/app/utils';
import { useLDClient } from '@/ld/client';
import { useLDClientRsc } from '@/ld/server';

export default async function Invoice() {
  const ldc = await useLDClientRsc(getLDContext());
  const flagValue = ldc.variation('dev-test-flag');

  return (
    <>
      <b>Invoice</b>
      <br />
      <br />
      context: {JSON.stringify(ldc.getContext())}
      <br />
      invoice.tsx: {flagValue.toString()}
      <br />
      <br />
      <LDButton />
    </>
  );
}
