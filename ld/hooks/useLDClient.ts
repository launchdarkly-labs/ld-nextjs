import { useContext } from 'react';

import { context, type ReactContext } from '../client/reactContext';
import { getSkinnySdk } from '../client/skinnySdk';
import { isServer } from '../isServer';

const useLDClient = () => {
  if (isServer) {
    return getSkinnySdk();
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { jsSdk } = useContext<ReactContext>(context);
  return jsSdk;
};

export default useLDClient;
