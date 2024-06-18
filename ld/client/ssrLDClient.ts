import type { LDClient } from 'launchdarkly-js-client-sdk';

import { LDContext, LDFlagSet, LDFlagValue } from '@launchdarkly/js-sdk-common';

/**
 * Stores react context on the server because the real react context
 * is not available on the server.
 */
const serverReactContext = new Map<string, any>();

export const getSsrLDClient = () => serverReactContext.get('ssrLDClient') as SsrLDClient;

/**
 * @internal
 *
 * GOTCHA: Internal and server only.
 * Used for ssr only. Please use either the js or node sdk for all your sdk needs.
 */
export class SsrLDClient implements Partial<LDClient> {
  constructor(
    private readonly ldContext: LDContext,
    private readonly bootstrap: LDFlagSet,
  ) {
    serverReactContext.set('ssrLDClient', this);
  }

  allFlags(): LDFlagSet {
    return this.bootstrap;
  }

  getContext(): LDContext {
    return this.ldContext;
  }

  variation(key: string, defaultValue?: LDFlagValue): LDFlagValue {
    return this.bootstrap[key] ?? defaultValue;
  }
}
