import type { LDClient as NodeSdk } from '@launchdarkly/node-server-sdk';

export type { LDClient as JSSdk } from 'launchdarkly-js-client-sdk';

export { NodeSdk };

declare global {
  module globalThis {
    var nodeSdk: NodeSdk;
  }
}
