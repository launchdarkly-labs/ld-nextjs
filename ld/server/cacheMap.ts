import type NextSdk from '@/ld/nextSdk';

const cacheMap = new Map<string, any>();

export const setNextSdk = (nextSdk: NextSdk) => {
  cacheMap.set('nextSdk', nextSdk);
};

export const getNextSdk = () => {
  return cacheMap.get('nextSdk') as NextSdk;
};
