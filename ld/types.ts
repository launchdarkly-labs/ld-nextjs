import type NextClient from '@/ld/nextClient';

import type { LDContext, LDFlagSet } from '@launchdarkly/js-sdk-common';

export type { LDClient as JSClient } from 'launchdarkly-js-client-sdk';
export type { LDClient as NodeClient } from '@launchdarkly/node-server-sdk';

declare global {
  module globalThis {
    var nextClient: NextClient;
    var ldContext: LDContext;
    var bootstrap: LDFlagSet | undefined;
  }
}
