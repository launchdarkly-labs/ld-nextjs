import { useContext } from 'react';

import { context, type ReactContext } from '../client/reactContext';
import { getSsrLDClient } from '../client/ssrLDClient';
import { isServer } from '../isServer';

const useLDClient = () => {
  if (isServer) {
    return getSsrLDClient();
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { jsSdk } = useContext<ReactContext>(context);
  return jsSdk;
};

export default useLDClient;
