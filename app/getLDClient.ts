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
      console.log('=========== ld init timeout');
    }
  }

  return ldc;
};

export default getLDClient;
