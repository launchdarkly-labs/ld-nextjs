import type NextSdk from '@/ld/nextSdk';
import type { Dispatch, SetStateAction } from 'react';

import { ReactContext } from './reactContext';

const setupListeners = (nextSdk: NextSdk, setState: Dispatch<SetStateAction<ReactContext>>) => {
  nextSdk.on('change', () => {
    setState({ nextSdk });
  });
};

export default setupListeners;
