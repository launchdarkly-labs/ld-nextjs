import type { LDContext } from '@launchdarkly/js-sdk-common';

/**
 * Returns a json suitable for bootstrapping the js sdk.
 
 * @param context The LDContext to generate bootstrap for.
 * 
 * @returns A promise which resolves to a json object suitable for bootstrapping the js sdk.
 */
export const getBootstrap = async (context: LDContext) => {
  try {
    const allFlags = await global.nodeSdk.allFlagsState(context);
    if (!allFlags) {
      console.warn('allFlagsState returned null or undefined');
      return {};
    }
    return allFlags.toJSON();
  } catch (error) {
    console.error('Error in getBootstrap:', error);
    return {};
  }
};
