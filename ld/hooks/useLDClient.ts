import type { SsrLDClient } from '@/ld/server';
import { useContext } from 'react';

import { context, type ReactContext } from '../client/reactContext';
import { isServer } from '../isServer';
import { ssrCache } from '../server/ssr/ssrCache';

/**
 * This is a universal hook compatible on both the server and client.
 *
 * On the server side, an {@link SsrLDClient) is returned.
 * On the client side, the js sdk client is returned.
 */
const useLDClient = () => {
  if (isServer) {
    return ssrCache.get('ssrLDClient') as SsrLDClient;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { jsSdk } = useContext<ReactContext>(context);
  return jsSdk;
};

export default useLDClient;
