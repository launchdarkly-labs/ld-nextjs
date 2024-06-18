import { LDContext } from '@launchdarkly/js-sdk-common';

import { SkinnySdk } from '../client/skinnySdk';
import { getBootstrap } from './getBootstrap';
import { getLDContext } from './getLDContext';

export const initSkinnySdk = async (def: LDContext) => {
  const context = await getLDContext(def);
  const bootstrap = await getBootstrap(context);
  const skinnySdk = new SkinnySdk(context, bootstrap);
  return { context, bootstrap, skinnySdk };
};
