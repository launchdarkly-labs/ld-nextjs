'use client';

import { type LDOptions } from 'launchdarkly-js-client-sdk';
import { type PropsWithChildren, useState } from 'react';

import type { LDContext } from '@launchdarkly/js-sdk-common';

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
  const [state] = useState<ReactContext>({
    context,
    // @ts-ignore
    bootstrap: options?.bootstrap,
  });

  return <Provider value={state}>{children}</Provider>;
};
