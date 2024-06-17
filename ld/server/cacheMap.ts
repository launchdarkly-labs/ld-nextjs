import type NextSdk from '@/ld/nextSdk';

/**
 * A simple map to store server react context because the real react context
 * is not available on the server.
 */
const cacheMap = new Map<string, any>();

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
