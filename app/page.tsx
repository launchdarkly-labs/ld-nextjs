import App from '@/app/app';
import { LDProvider } from '@/ld/client';
import { initSsr } from '@/ld/server';

// must be async
export default async function Home() {
  // must be run in each page component
  const { context, bootstrap } = await initSsr({
    kind: 'user',
    key: 'nextjs-default-user',
  });

  // pass context and bootstrap to the LDProvider
  return (
    <LDProvider context={context} options={{ bootstrap }}>
      <App />
    </LDProvider>
  );
}
