import { cache } from 'react';

import { LDContext } from '@launchdarkly/js-sdk-common';

import { LDClientRsc } from '../../ldClientRsc';
import { getBootstrap } from '../getBootstrap';

const ldClientRsc = 'ldClientRsc';
const getServerCache = cache(() => new Map<string, any>());

/**
 * Server Components only. This creates and caches an LDClientRsc object
 * using React cache which is available on the server side only.
 *
 * @param context The LDContext for evaluation.
 *
 * @returns An {@link LDClientRsc} object suitable for RSC and server side rendering.
 */
export const useLDClientRsc = async (context: LDContext) => {
  const cache = getServerCache();
  let cachedClient = cache.get(ldClientRsc);


  if (!cachedClient) {
    const bootstrap = await getBootstrap(context);
    cachedClient = new LDClientRsc(context, bootstrap);
    cache.set(ldClientRsc, cachedClient);
  } else {
    console.log(`*** reuse cache ldClientRsc: ${cachedClient.getContext().key}`);
  }

  return cachedClient as LDClientRsc;
};
