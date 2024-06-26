import type { Dispatch, SetStateAction } from 'react';

import type { LDContext, LDFlagSet } from '@launchdarkly/js-sdk-common';

import type { JSSdk } from '../types';
import type { ReactContext } from './reactContext';

export const setupListeners = (setState: Dispatch<SetStateAction<ReactContext>>, jsSdk: JSSdk) => {
  jsSdk.on('change', () => {
    setState((prevState) => ({ ...prevState, jsSdk }));
  });
};
