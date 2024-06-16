import { isServer } from '@/ld/isServer';
import { getGlobalLDNodeSdk } from '@/ld/server';
import type { JSSdk, NodeSdk } from '@/ld/types';

import type { LDContext, LDFlagValue } from '@launchdarkly/js-sdk-common';

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
    public readonly ldContext: LDContext,
    public readonly bootstrap?: object,
    private readonly jsSdk?: JSSdk,
  ) {
    this.nodeSdk = getGlobalLDNodeSdk();
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
