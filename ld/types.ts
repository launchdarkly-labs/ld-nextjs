import NextClient from '@/ld/nextClient';

export type { LDClient as JSClient } from 'launchdarkly-js-client-sdk';
export type { LDClient as NodeClient } from '@launchdarkly/node-server-sdk';

declare global {
  module globalThis {
    var nextClient: NextClient;
  }
}
