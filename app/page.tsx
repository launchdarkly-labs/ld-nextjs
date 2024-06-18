import App from '@/app/app';
import { LDProvider } from '@/ld/client';
import { initSkinnySdk } from '@/ld/server/initSkinnySdk';

export default async function Home() {
  const { context, bootstrap } = await initSkinnySdk({ kind: 'user', key: 'nextjs-default-user' });

  return (
    <LDProvider context={context} options={{ bootstrap }}>
      <App />
    </LDProvider>
  );
}
