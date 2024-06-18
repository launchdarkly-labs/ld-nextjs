import NextSdk from '@/ld/nextSdk';
import { getLDContext } from '@/ld/server/cookies';
import { getBootstrap } from '@/ld/server/getBootstrap';

import { LDContext } from '@launchdarkly/js-sdk-common';

/**
 * A simple map to store server react context because the real react context
 * is not available on the server.
 */
const cacheMap = new Map<string, any>();

export const setupServerCache = async (def: LDContext) => {
  const context = await getLDContext(def);
  const bootstrap = await getBootstrap(context);
  const nextSdk: NextSdk = new NextSdk(context, bootstrap);

  setNextSdk(nextSdk);
};

/**
 * Set on init of LDProvider.
 *
 * @param nextSdk
 */
export const setNextSdk = (nextSdk: NextSdk) => {
  cacheMap.set('nextSdk', nextSdk);
};

export const getNextSdk = () => {
  return cacheMap.get('nextSdk') as NextSdk;
};
