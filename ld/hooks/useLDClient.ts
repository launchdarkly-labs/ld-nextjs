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
    try {
      return ssrCache.get('ssrLDClient') as SsrLDClient;
    } catch (e) {
      const error =
        'The ssr client is undefined. All page components must be marked async. In addition, if you use flags in page components, you must call initSsrLDClient.';
      console.error(error);
      throw new Error(error);
    }
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { jsSdk } = useContext<ReactContext>(context);
  return jsSdk;
};

export default useLDClient;
