import { context } from '@/ld/client/reactContext';

import type { LDContext, LDFlagSet, LDFlagValue } from '@launchdarkly/js-sdk-common';

import { isServer } from './isServer';
import type { JSSdk, NodeSdk } from './types';

export default class NextSdk {
  private nodeSdk: NodeSdk;

  /**
   * Saves LDContext and bootstrap values so the server side can evaluate flags.
   *
   * @param ldContext
   * @param bootstrap
   * @param jsSdk This is undefined on the server.
   */
  constructor(
    private readonly ldContext: LDContext,
    private readonly bootstrap?: object,
    private readonly jsSdk?: JSSdk,
  ) {
    this.nodeSdk = global.nodeSdk;

    console.log(`--------- Init NextSDK with: 
    context: ${JSON.stringify(ldContext)}
   
    bootstrap: ${JSON.stringify(bootstrap)}
    `);
  }

  getContext(): LDContext {
    return this.ldContext;
  }

  allFlags(): LDFlagSet | undefined {
    if (isServer) {
      return this.bootstrap;
    }

    return this.jsSdk?.allFlags();
  }

  variation(key: string, defaultValue?: LDFlagValue): LDFlagValue {
    if (isServer) {
      // invoke variation for analytics
      this.nodeSdk.variation(key, this.ldContext, defaultValue);
      // @ts-ignore
      return this.bootstrap?.[key];
    } else {
      return this.jsSdk?.variation(key, defaultValue);
    }
  }

  on(eventName: string, handler: () => void) {
    if (isServer) {
      this.nodeSdk.on(eventName === 'change' ? 'update' : eventName, handler);
    }

    this.jsSdk?.on(eventName, handler);
  }
}
