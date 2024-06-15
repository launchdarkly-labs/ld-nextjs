import type NextClient from '@/ld/nextClient';

import type { LDContext } from '@launchdarkly/js-sdk-common';

/**
 * Called once when the node sdk is initialized in instrumentation.ts.
 *
 * @param nc
 */
export const setGlobalNextClient = (nc: NextClient) => {
  global.nextClient = nc;
};

export const getGlobalNextClient = () => {
  return global.nextClient;
};

export const getGlobalLDContext = () => {
  return global.ldContext;
};

export const getGlobalBootstrap = () => {
  return global.bootstrap;
};

export const setGlobalLDContext = async (c: LDContext) => {
  global.ldContext = c;

  const ldc = getGlobalNextClient();
  const allFlags = await ldc.nodeClient?.allFlagsState(c);
  const bootstrap = allFlags?.toJSON();

  global.bootstrap = bootstrap;
  return bootstrap;
};
