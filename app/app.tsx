import { getLDContext } from '@/app/utils';
import { useLDClientRsc } from '@/ld/server';

export default async function App() {
  const context = await getLDContext();
  const ldc = await useLDClientRsc(context);
  const flagValue = ldc.variation('dev-test-flag');

  return (
    <p>
      <b>app.tsx</b>
      <br />
      <br />
      context: {JSON.stringify(ldc.getContext())}
      <br />
      flagValue: {flagValue.toString()}
      <br />
    </p>
  );
}
