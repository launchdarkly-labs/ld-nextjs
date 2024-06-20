import { useContext } from 'react';

import { context, type ReactContext } from '../client/reactContext';
import { getSsrLDClient } from '../client/ssrLDClient';
import { isServer } from '../isServer';

/**
 * This is a universal hook compatible on both the server and client.
 *
 * On the server side, an {@link SsrLDClient) is returned.
 * On the client side, the js sdk client is returned.
 */
const useLDClient = () => {
  if (isServer) {
    return getSsrLDClient();
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { jsSdk } = useContext<ReactContext>(context);
  return jsSdk;
};

export default useLDClient;
