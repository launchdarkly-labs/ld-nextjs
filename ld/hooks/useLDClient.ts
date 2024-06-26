import { useContext } from 'react';

import { context as reactContext, type ReactContext } from '../client/reactContext';
import { PartialLDClient } from '../partialLDClient';

/**
 * This is a universal hook compatible on both the server and client.
 *
 * On the server side, an {@link SsrLDClient) is returned.
 * On the client side, the js sdk client is returned.
 */
export const useLDClient = () => {
  const { context, bootstrap } = useContext<ReactContext>(reactContext);
  console.log(`===== useLDClient: ${context?.key}, dev-test-flag: ${bootstrap['dev-test-flag']}`);
  return new PartialLDClient(context, bootstrap);
};
