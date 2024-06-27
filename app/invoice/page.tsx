import { getLDContext } from '@/app/utils';
import { useLDClientRsc } from '@/ld/server';

export default async function Invoice() {
  const ldc = await useLDClientRsc(getLDContext());
  const flagValue = ldc.variation('dev-test-flag');

  return (
    <div className='h-screen flex flex-col items-center justify-center font-audimat mx-auto '>
      <div className='border-2 border-white/20 p-4'>
      <p className='text-4xl ldgradient'>Invoice</p>
      <p>context: {JSON.stringify(ldc.getContext(), null, 4)}</p>
      <p>Feature flag value in invoice.tsx: <span className=''>{flagValue.toString()}</span></p>
      </div>
    </div>
  );
}
