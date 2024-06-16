import NextSdk from '@/ld/nextSdk';

export const initNodeSdk = async () => {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const sdk = await import('@launchdarkly/node-server-sdk');

    // Create a new nodejs client and save it globally.
    global.nodeSdk = sdk.init(process.env.LD_SDK_KEY ?? '');

    try {
      await global.nodeSdk.waitForInitialization({ timeout: 5 });
    } catch (e) {
      // Log and report errors here.
      // A non-initialized ldClient will be returned which
      // will use defaults for evaluation.
      console.log(`LaunchDarkly NodeClient init error: ${e}`);
    }
  }
};
