// import type { LDClient } from 'launchdarkly-js-client-sdk';
//
// import type { LDContext, LDFlagSet, LDFlagValue } from '@launchdarkly/js-sdk-common';
//
// /**
//  * @internal
//  *
//  * Internal and for server only. Please use either the js or node sdk for all
//  * your sdk needs.
//  *
//  * This is a partial implementation of the JS client. It uses bootstrap values for
//  * evaluation. It is designed to be used on the server for server side rendering.
//  *
//  * This client does not connect to the network. All operations are synchronous.
//  * It does not have any dom or node dependencies. Hence this is a suitable client
//  * to be run on the server for server side rendering.
//  *
//  * In a way, this is a "middle" client which makes this universal sdk possible.
//  *
//  */
// export class SsrLDClient implements Partial<LDClient> {
//   constructor(
//     private readonly ldContext: LDContext,
//     private readonly bootstrap: LDFlagSet,
//   ) {}
//
//   allFlags(): LDFlagSet {
//     return this.bootstrap;
//   }
//
//   getContext(): LDContext {
//     return this.ldContext;
//   }
//
//   variation(key: string, defaultValue?: LDFlagValue): LDFlagValue {
//     return this.bootstrap[key] ?? defaultValue;
//   }
// }
