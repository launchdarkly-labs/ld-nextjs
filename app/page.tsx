import App from '@/app/app';
import { LDProvider } from '@/ld/client';
import { initSsr } from '@/ld/server';

export default async function Home() {
  const { context, bootstrap } = await initSsr({
    kind: 'user',
    key: 'nextjs-default-user',
  });

  return (
    <LDProvider context={context} options={{ bootstrap }}>
      <App />
    </LDProvider>
  );
}
