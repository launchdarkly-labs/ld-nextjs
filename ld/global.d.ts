import { type LDClient } from '@launchdarkly/node-server-sdk';

declare global {
  declare module globalThis {
    var nodeClient: LDClient;
  }
}
