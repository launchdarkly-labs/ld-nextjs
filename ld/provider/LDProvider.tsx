'use client';

import { isServer } from '@/ld/isServer';
import NextSdk from '@/ld/nextSdk';
import { setupListeners } from '@/ld/provider/setupListeners';
import { basicLogger, initialize, type LDOptions } from 'launchdarkly-js-client-sdk';
import { cache, PropsWithChildren, useEffect, useState } from 'react';

import { LDContext } from '@launchdarkly/js-sdk-common';

import { Provider, type ReactContext } from './reactContext';

type LDProps = {
  context: LDContext;
  options?: LDOptions;
};

// HACK: this is used on the server side to bypass react context api.
let _getNextSdk: () => NextSdk;

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

  if (!isServer) {
    const jsSdk = initialize(process.env.NEXT_PUBLIC_LD_CLIENT_SIDE_ID ?? '', context, {
      ...options,
      logger: basicLogger({ level: 'debug' }),
    });

    nextSdk = new NextSdk(context, options?.bootstrap as any, jsSdk);
  }

  _getNextSdk = () => nextSdk;

  const [state, setState] = useState<ReactContext>({ nextSdk });

  useEffect(() => {
    setupListeners(nextSdk, setState);
  }, []);

  return <Provider value={state}>{children}</Provider>;
};

// @ts-ignore
export const getNextSdk = cache(_getNextSdk);
