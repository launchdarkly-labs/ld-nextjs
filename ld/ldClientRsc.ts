import type {
  LDContext,
  LDEvaluationDetail,
  LDFlagSet,
  LDFlagValue,
} from '@launchdarkly/node-server-sdk';

import { isServer } from './isServer';
import type { JSSdk } from './types';

// GOTCHA: Partially implement the js sdk.
// Omit variationDetail because its return type is incompatible with js-core.
type PartialJSSdk = Omit<Partial<JSSdk>, 'variationDetail'>;

/**
 * A partial ldClient suitable for RSC and server side rendering.
 */
export class LDClientRsc implements PartialJSSdk {
  constructor(
    private readonly _ldContext: LDContext,
    private readonly _bootstrap: LDFlagSet,
  ) {}


  allFlags(): LDFlagSet {
    return this._bootstrap;
  }

  getContext(): LDContext {
    return this._ldContext;
  }

  variation(key: string, defaultValue?: LDFlagValue): LDFlagValue {
    if (isServer) {
      // On the server during ssr, call variation for analytics purposes.
      global.nodeSdk.variation(key, this._ldContext, defaultValue).then(/* ignore */);
    }
    return this._bootstrap[key] ?? defaultValue;
  }

  variationDetail(key: string, defaultValue?: LDFlagValue): LDEvaluationDetail {
    if (isServer) {
      global.nodeSdk.variationDetail(key, this._ldContext, defaultValue).then(/* ignore */);
    }

    const { reason, variation: variationIndex } = this._bootstrap.$flagsState[key];
    return { value: this._bootstrap[key], reason, variationIndex };
  }

  track(key: string, context: LDContext, data?: any, metricValue?: number): void {
    return this.track(key, context, data, metricValue);
  }

  identify(context: LDContext, hash?: string, onDone?: (err: Error | null, flags: LDFlagSet | null) => void): Promise<LDFlagSet> {
    return this.identify(context, hash, onDone);
  }

  flush(onDone?: () => void): Promise<void> {
    return this.flush(onDone);
  }
}
