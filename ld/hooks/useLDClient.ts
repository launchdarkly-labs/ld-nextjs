import { getNextSdk } from '@/ld/server/cacheMap';
import { useContext } from 'react';

import { context, type ReactContext } from '../client/reactContext';
import { isServer } from '../isServer';

const useLDClient = (source?: string) => {
  if (isServer) {
    let sdk = getNextSdk();
    if (!sdk) {
      console.log(`====== ${source} sdk undefined`);
    }
    return sdk;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { nextSdk } = useContext<ReactContext>(context);
  return nextSdk;
};

export default useLDClient;
