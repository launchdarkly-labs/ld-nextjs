export const registerLD = async () => {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const nodeSdk = await import('@launchdarkly/node-server-sdk');
    global.nodeClient = nodeSdk.init(process.env.LD_SDK_KEY ?? '');

    try {
      await global.nodeClient.waitForInitialization({ timeout: 5 });
    } catch (e) {
      // Log and report errors here.
      // A non-initialized ldClient will be returned which
      // will use defaults for evaluation.
      console.log(`LaunchDarkly init error: ${e}`);
    }
  }
};

export const getLDClient = () => global.nodeClient;
