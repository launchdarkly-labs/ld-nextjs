import type { Dispatch, SetStateAction } from 'react';

import type NextSdk from '../nextSdk';
import { ReactContext } from './reactContext';

export const setupListeners = (
  nextSdk: NextSdk,
  setState: Dispatch<SetStateAction<ReactContext>>,
) => {
  nextSdk.on('change', () => {
    setState({ nextSdk });
  });
};
