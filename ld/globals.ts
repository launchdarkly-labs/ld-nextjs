import { LDContext } from '@launchdarkly/js-sdk-common';

export const getGlobalLDNodeSdk = () => {
  return global.nodeSdk;
};

export const getBootstrap = async (c: LDContext) => {
  const ldc = getGlobalLDNodeSdk();
  const allFlags = await ldc.allFlagsState(c);
  return allFlags?.toJSON();
};
