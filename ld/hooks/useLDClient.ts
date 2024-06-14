import { isServer } from '@/ld/isServer';
import NextClient from '@/ld/nextClient';
import { useContext } from 'react';

import { context, type ReactContext } from '../provider/reactContext';

const useLDClient = () => {
  if (isServer) {
    return NextClient.get();
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { client } = useContext<ReactContext>(context);
  return client;
};

export default useLDClient;
