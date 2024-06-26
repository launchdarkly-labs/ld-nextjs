// import type { LDContext } from '@launchdarkly/js-sdk-common';
//
// import { getBootstrap } from '../getBootstrap';
// import { getLDContext } from '../getLDContext';
// import { createSsrCache, ssrCache } from './ssrCache';
//
// /**
//  * Called at the root layout or root page to setup initialize the ssr client.
//  *
//  * @param def The default LDContext to use if none is found in cookies.
//  * If no default is specified and no context is found in cookies, an anonymous
//  * user is used as the final context.
//  */
// export const initSsrLDClient = async (def?: LDContext) => {
//   const context = getLDContext(def);
//   const ssrLDClient = ssrCache?.get('ssrLDClient');
//
//   // TODO: deep compare contexts
//   if (!ssrCache || ssrLDClient?.getContext().key !== context.key) {
//     const bootstrap = await getBootstrap(context);
//     const map = createSsrCache(context, bootstrap);
//     return { context, bootstrap, ssrLDClient: map.get('ssrLDClient') };
//   } else {
//     console.log(`Using cached context: ${context.key}`);
//     return { context: ssrLDClient.getContext(), bootstrap: ssrLDClient.allFlags(), ssrLDClient };
//   }
// };
