import { LDContext } from '@launchdarkly/js-sdk-common';

import { getSsrLDClient, setSsrLDClient, SsrLDClient } from '../client/ssrLDClient';
import { getBootstrap } from './getBootstrap';
import { getLDContext } from './getLDContext';

/**
 * Called at the root layout to setup the ssr client.
 *
 * @param def The default LDContext to use if none is found in cookies.
 * If no default is specified and no context is found in cookies, an anonymous
 * user is used as default.
 */
export const initSsr = async (def?: LDContext) => {
  const ssrLDClient = getSsrLDClient();

  if (!ssrLDClient) {
    const context = await getLDContext(def);
    const bootstrap = await getBootstrap(context);
    const ssrLDClient = setSsrLDClient(context, bootstrap);
    return { context, bootstrap, ssrLDClient };
  } else {
    console.log('Skipping initSsr because client already exists.');
    return { context: ssrLDClient.getContext(), bootstrap: ssrLDClient.allFlags(), ssrLDClient };
  }
};
