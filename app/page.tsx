import getConfig from 'next/config';

import { LDContext } from '@launchdarkly/node-server-sdk';

export default async function Home() {
  const {
    serverRuntimeConfig: { ldClient },
  } = getConfig();

  const context: LDContext = { kind: 'user', key: 'test-user-key-1' };
  const flagValue = await ldClient.variation('dev-test-flag', context, false);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>{flagValue ? 'Hello from LD! Flag true' : 'Flag false'}</p>
    </main>
  );
}
