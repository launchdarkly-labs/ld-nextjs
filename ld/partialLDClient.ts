import type { LDContext, LDFlagSet, LDFlagValue } from '@launchdarkly/js-sdk-common';
import { LDClient } from '@launchdarkly/node-server-sdk';

export class PartialLDClient implements Partial<LDClient> {
  constructor(
    private readonly ldContext: LDContext,
    private readonly bootstrap: LDFlagSet,
  ) {}

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
