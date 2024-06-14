import { useContext } from 'react';

import { context, type ReactContext } from '../provider/reactContext';

const useLDClient = () => {
  const { client } = useContext<ReactContext>(context);
  return client;
};

export default useLDClient;
