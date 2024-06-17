import { getNextSdk } from '@/ld/server/cacheMap';
import { useContext } from 'react';

import { context, type ReactContext } from '../client/reactContext';
import { isServer } from '../isServer';

const useLDClient = () => {
  if (isServer) {
    // Use our own cache on the server because react context is n/a.
    const sdk = getNextSdk();
    return sdk;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { nextSdk } = useContext<ReactContext>(context);
  return nextSdk;
};

export default useLDClient;
