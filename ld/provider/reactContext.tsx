'use client';

import { isServer } from '@/ld/isServer';
import NextClient from '@/ld/nextClient';
import { basicLogger, initialize, LDContext, type LDOptions } from 'launchdarkly-js-client-sdk';
import React, { createContext, PropsWithChildren, useContext, useState } from 'react';

export type ReactContext = {
  client: any;
};

const Context = createContext<ReactContext>({
  client: {} as any,
});

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
  let client: NextClient = NextClient.get();

  if (!isServer && !client?.jsClient) {
    const jsClient = initialize(process.env.NEXT_PUBLIC_LD_CLIENT_SIDE_ID ?? '', context, {
      ...options,
      logger: basicLogger({ level: 'debug' }),
    });
    client = new NextClient(undefined, jsClient);
  }

  const [state, setState] = useState<ReactContext>({ client });

  return <Context.Provider value={state}>{children}</Context.Provider>;
};

export const useLDClient = () => {
  const { client } = useContext<ReactContext>(Context);
  return client;
};
