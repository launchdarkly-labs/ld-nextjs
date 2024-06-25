import { cache } from 'react';

import { LDContext, LDFlagSet } from '@launchdarkly/js-sdk-common';

import { SsrLDClient } from './ssrLDClient';

export let ssrCache: Map<string, any>;

export const createSsrCache = (context: LDContext, bootstrap: LDFlagSet) => {
  try {
    ssrCache = cache(() => new Map<string, any>())();
    ssrCache.set('ssrLDClient', new SsrLDClient(context, bootstrap));
  } catch (e) {
    console.log(`client side using memory map`);
    ssrCache = new Map<string, any>();
    ssrCache.set('ssrLDClient', new SsrLDClient(context, bootstrap));
  }

  return ssrCache;
};
