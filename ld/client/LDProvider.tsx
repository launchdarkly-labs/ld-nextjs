'use client';

import { basicLogger, initialize, type LDOptions } from 'launchdarkly-js-client-sdk';
import { PropsWithChildren, useEffect, useState } from 'react';

import { LDContext, LDFlagSet } from '@launchdarkly/js-sdk-common';

import { isServer } from '../isServer';
import { Provider, type ReactContext } from './reactContext';
import { setupListeners } from './setupListeners';
import { SsrLDClient } from './ssrLDClient';

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
  if (isServer) {
    // GOTCHA: The root Page component already calls initSsr but this is still required here otherwise
    // server side rendering does not work for client components. It seems like on the server side, client components
    // are run asynchronously/somewhat differently from server components resulting in a race.
    new SsrLDClient(context, options?.bootstrap as LDFlagSet);
    return <>{children}</>;
  }

  const jsSdk = initialize(process.env.NEXT_PUBLIC_LD_CLIENT_SIDE_ID ?? '', context, {
    ...options,
    logger: basicLogger({ level: 'debug' }),
  });

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [state, setState] = useState<ReactContext>({ jsSdk });

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    setupListeners(jsSdk, setState);
  }, []);

  return <Provider value={state}>{children}</Provider>;
};
