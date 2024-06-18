import { LDContext } from '@launchdarkly/js-sdk-common';

import { SsrLDClient } from '../client/ssrLDClient';
import { getBootstrap } from './getBootstrap';
import { getLDContext } from './getLDContext';

export const initSsr = async (def: LDContext) => {
  const context = await getLDContext(def);
  const bootstrap = await getBootstrap(context);
  const ssrLDClient = new SsrLDClient(context, bootstrap);
  return { context, bootstrap, ssrLDClient };
};
