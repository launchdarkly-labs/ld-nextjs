import type NextClient from '@/ld/nextClient';
import type { Dispatch, SetStateAction } from 'react';

import { ReactContext } from './reactContext';

const setupListeners = (client: NextClient, setState: Dispatch<SetStateAction<ReactContext>>) => {
  client.on('change', () => {
    setState({ client });
  });
};

export default setupListeners;
