import { getNextSdk } from '@/ld/server/cacheMap';
import { useContext } from 'react';

import { context, type ReactContext } from '../client/reactContext';
import { isServer } from '../isServer';

const useLDClient = () => {
  if (isServer) {
    const sdk = getNextSdk();
    console.log(
      `====== server ldClient with: ${JSON.stringify(sdk.ldContext)} \n\n ${JSON.stringify(sdk.bootstrap)}`,
    );
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { nextSdk } = useContext<ReactContext>(context);
  return nextSdk;
};

export default useLDClient;
