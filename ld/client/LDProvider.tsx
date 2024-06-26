'use client';

// GOTCHA: launchdarkly-js-client-sdk will soon be replaced with a new js package under
// the launchdarkly/js-core repo.
import { type LDOptions } from 'launchdarkly-js-client-sdk';
import { PropsWithChildren, useState } from 'react';

import { LDContext } from '@launchdarkly/js-sdk-common';

import { Provider, type ReactContext } from './reactContext';

type LDProps = {
  context: LDContext;
  options?: LDOptions;
};

/**
 * This is the LaunchDarkly Provider which uses the React context api to store
 * and pass data to child components through hooks.
 *
 * @param context
 * @param options
 * @param children
 *
 * @constructor
 */

export const LDProvider = ({ context, options, children }: PropsWithChildren<LDProps>) => {
  const [state, setState] = useState<ReactContext>({
    context,
    // @ts-ignore
    bootstrap: options?.bootstrap,
  });

  return <Provider value={state}>{children}</Provider>;
};
