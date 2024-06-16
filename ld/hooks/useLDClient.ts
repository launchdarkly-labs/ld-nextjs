import { useContext } from 'react';

import { getNextSdk } from '../client/LDProvider';
import { context, type ReactContext } from '../client/reactContext';
import { isServer } from '../isServer';

const useLDClient = () => {
  if (isServer) {
    return getNextSdk();
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { nextSdk } = useContext<ReactContext>(context);
  return nextSdk;
};

export default useLDClient;
