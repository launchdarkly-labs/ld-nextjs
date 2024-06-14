import { getLDContext } from '@/ld/cookies';
import { isServer } from '@/ld/isServer';
import type { JSClient, NodeClient } from '@/ld/types';

import type { LDContext, LDFlagValue } from '@launchdarkly/js-sdk-common';

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
    global.nextClient = this;
  }

  static get() {
    return global.nextClient;
  }

  async allFlags() {
    if (isServer) {
      return await this.nodeClient?.allFlagsState(await getLDContext());
    }

    return Promise.resolve(this.jsClient?.allFlags());
  }
  async waitForInitialization(timeout: number): Promise<void> {
    if (isServer) {
      await this.nodeClient?.waitForInitialization({ timeout });
    }

    await this.jsClient?.waitForInitialization(timeout);
  }

  async variation(key: string, defaultValue?: LDFlagValue): Promise<LDFlagValue> {
    console.log(`========= calling variation. isServer ? ${isServer}, flagKey: ${key}`);
    return isServer
      ? this.nodeClient?.variation(key, await getLDContext(), defaultValue)
      : this.jsClient?.variation(key, defaultValue);
  }
}
