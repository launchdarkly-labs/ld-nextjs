import { LDContext } from '@launchdarkly/js-sdk-common';

import { SsrLDClient } from '../client/ssrLDClient';
import { getBootstrap } from './getBootstrap';
import { getLDContext } from './getLDContext';

/**
 * Call this once at the root page component to setup LDContext
 * and bootstrap values for server side rendering.
 *
 * @param def The default LDContext to use if none is found in cookies.
 * If no context is found in cookies or specified here then an anonymous
 * user is used as default.
 */
export const initSsr = async (def: LDContext) => {
  const context = await getLDContext(def);
  const bootstrap = await getBootstrap(context);
  const ssrLDClient = new SsrLDClient(context, bootstrap);
  return { context, bootstrap, ssrLDClient };
};
