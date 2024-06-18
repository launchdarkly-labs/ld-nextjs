import type { LDClient } from 'launchdarkly-js-client-sdk';

import { LDContext, LDFlagSet, LDFlagValue } from '@launchdarkly/js-sdk-common';

const _mockContext = new Map<string, any>();
export const getSkinnySdk = () => _mockContext.get('skinnySdk') as SkinnySdk;

/**
 * GOTCHA: This is an internal server only class used for ssr only. Please use either the js or node sdk for
 * all your external sdk purposes.
 */
export class SkinnySdk implements Partial<LDClient> {
  constructor(
    private readonly ldContext: LDContext,
    private readonly bootstrap: LDFlagSet,
  ) {
    _mockContext.set('skinnySdk', this);
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
