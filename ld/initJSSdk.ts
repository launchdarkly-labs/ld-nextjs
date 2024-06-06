'use client';

import NextClient from '@/ld/nextClient';
import {
  basicLogger, // basicLogger,
  initialize,
  type LDContext,
  type LDOptions,
} from 'launchdarkly-js-client-sdk';
import { useEffect } from 'react';

type InitJSSdkProps = {
  context: LDContext;
  options?: LDOptions;
};

export function InitJSSdk({ context, options }: InitJSSdkProps) {
  useEffect(() => {
    const initSdk = async () => {
      const jsClient = initialize(process.env.NEXT_PUBLIC_LD_CLIENT_SIDE_ID ?? '', context, {
        ...options,
        logger: basicLogger({ level: 'debug' }),
      });
      const nextClient = new NextClient(undefined, jsClient);

      try {
        await nextClient.waitForInitialization(5);
      } catch (e) {
        // Log and report errors here.
        // A non-initialized ldClient will be returned which
        // will use defaults for evaluation.
        console.log(`LaunchDarkly JSClient init error: ${e}`);
      }
    };

    initSdk().then();
  }, []);

  return null;
}
