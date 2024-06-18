import type { Dispatch, SetStateAction } from 'react';

import { JSSdk } from '../types';
import { ReactContext } from './reactContext';

export const setupListeners = (jsSdk: JSSdk, setState: Dispatch<SetStateAction<ReactContext>>) => {
  jsSdk.on('change', () => {
    setState({ jsSdk });
  });
};
