import getConfig from 'next/config';

import { LDClient } from '@launchdarkly/node-server-sdk';

const getLDClient = async () => {
  const {
    serverRuntimeConfig: { ldClient },
  } = getConfig();
  const ldc = ldClient as LDClient;

  if (!ldc.initialized()) {
    try {
      await ldc.waitForInitialization({ timeout: 5 });
    } catch (e) {
      // Log and report errors here.
      // A non-initialized ldClient will be returned which
      // will use defaults for evaluation.
      console.log(`LaunchDarkly init error: ${e}`);
    }
  }

  return ldc;
};

export default getLDClient;
