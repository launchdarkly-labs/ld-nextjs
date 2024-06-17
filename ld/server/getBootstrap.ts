import type { LDContext } from '@launchdarkly/js-sdk-common';

export const getBootstrap = async (c: LDContext) => {
  const allFlags = await global.nodeSdk.allFlagsState(c);
  return allFlags?.toJSON();
};
