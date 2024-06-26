import { PartialLDClient } from '@/ld/partialLDClient';
import { cache } from 'react';

import { getBootstrap, getLDContext } from './';

const _serverCache = cache(() => new Map<string, any>());

export const useLDClientNode = async () => {
  const serverCache = _serverCache();
  if (!serverCache.get('nodeSdk')) {
    const context = getLDContext();
    const bootstrap = await getBootstrap(context);
    console.log(
      `-------- useLDClientNode: ${context.key}, bootstrap: ${JSON.stringify(bootstrap)}`,
    );
    serverCache.set('nodeSdk', new PartialLDClient(context, bootstrap));
  } else {
    console.log(
      `-------- existing useLDClientNode: ${serverCache.get('nodeSdk').getContext().key}, bootstrap: ${JSON.stringify(serverCache.get('nodeSdk').bootstrap)}`,
    );
  }

  return serverCache.get('nodeSdk') as PartialLDClient;
};
