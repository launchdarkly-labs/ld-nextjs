import { cache } from 'react';

import { LDContext } from '@launchdarkly/js-sdk-common';

import { LDClientRsc } from '../ldClientRsc';
import { getBootstrap } from './';

const ldClientRsc = 'ldClientRsc';
const getServerCache = cache(() => new Map<string, any>());

/**
 * Only useLDClientRsc with Server Components.
 *
 * @param context The LDContext for evaluation.
 */
export const useLDClientRsc = async (context: LDContext) => {
  const cache = getServerCache();
  let cachedClient = cache.get(ldClientRsc);

  if (!cachedClient) {
    const bootstrap = await getBootstrap(context);
    console.log(`*** create cache ldClientRsc: ${context.key}`);
    cachedClient = new LDClientRsc(context, bootstrap);
    cache.set(ldClientRsc, cachedClient);
  } else {
    console.log(`*** reuse cache ldClientRsc: ${cachedClient.getContext().key}`);
  }

  return cachedClient as LDClientRsc;
};
