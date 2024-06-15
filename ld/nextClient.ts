import { getGlobalBootstrap, getGlobalLDContext, setGlobalNextClient } from '@/ld/globals';
import { isServer } from '@/ld/isServer';
import type { JSClient, NodeClient } from '@/ld/types';

import type { LDFlagValue } from '@launchdarkly/js-sdk-common';

export default class NextClient {
  /**
   * Creates a new client and saves it in the global namespace.
   *
   * @param nodeClient
   * @param jsClient
   */
  constructor(
    public readonly nodeClient?: NodeClient,
    public readonly jsClient?: JSClient,
  ) {
    setGlobalNextClient(this);
  }
  allFlags() {
    if (isServer) {
      return getGlobalBootstrap();
    }

    return this.jsClient?.allFlags();
  }

  async waitForInitialization(timeout: number): Promise<void> {
    if (isServer) {
      await this.nodeClient?.waitForInitialization({ timeout });
    }

    await this.jsClient?.waitForInitialization(timeout);
  }

  variation(key: string, defaultValue?: LDFlagValue): LDFlagValue {
    if (isServer) {
      // invoke variation for analytics
      this.nodeClient?.variation(key, getGlobalLDContext(), defaultValue);
      return getGlobalBootstrap()?.[key];
    } else {
      return this.jsClient?.variation(key, defaultValue);
    }
  }

  on(eventName: string, handler: () => void) {
    if (isServer) {
      this.nodeClient?.on(eventName === 'change' ? 'update' : eventName, handler);
    }

    this.jsClient?.on(eventName, handler);
  }
}
