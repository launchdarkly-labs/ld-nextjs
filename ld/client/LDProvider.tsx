'use client';

import { setNextSdk } from '@/ld/server/cacheMap';
import { basicLogger, initialize, type LDOptions } from 'launchdarkly-js-client-sdk';
import { PropsWithChildren, useEffect, useState } from 'react';

import { LDContext } from '@launchdarkly/js-sdk-common';

import { isServer } from '../isServer';
import NextSdk from '../nextSdk';
import { Provider, type ReactContext } from './reactContext';
import { setupListeners } from './setupListeners';

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
  let nextSdk: NextSdk = new NextSdk(context, options?.bootstrap as any);

  if (isServer) {
    // On the server, we can't use context so we use an in-memory cache to fake it.
    setNextSdk(nextSdk);
  } else {
    const jsSdk = initialize(process.env.NEXT_PUBLIC_LD_CLIENT_SIDE_ID ?? '', context, {
      ...options,
      logger: basicLogger({ level: 'debug' }),
    });

    nextSdk = new NextSdk(context, options?.bootstrap as any, jsSdk);
  }

  const [state, setState] = useState<ReactContext>({ nextSdk });

  useEffect(() => {
    setupListeners(nextSdk, setState);
  }, []);

  return <Provider value={state}>{children}</Provider>;
};
