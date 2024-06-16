import { isServer } from '@/ld/isServer';
import { getNextSdk } from '@/ld/provider/LDProvider';
import { useContext } from 'react';

import { context, type ReactContext } from '../provider/reactContext';

const useLDClient = () => {
  if (isServer) {
    return getNextSdk();
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { nextSdk } = useContext<ReactContext>(context);
  return nextSdk;
};

export default useLDClient;
