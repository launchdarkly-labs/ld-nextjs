import NextClient from '@/ld/nextClient';

export const initNodeSdk = async () => {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const sdk = await import('@launchdarkly/node-server-sdk');
    const nodeClient = sdk.init(process.env.LD_SDK_KEY ?? '');

    // Cons
    const nextClient = new NextClient(nodeClient);

    try {
      await nextClient.waitForInitialization(5);
    } catch (e) {
      // Log and report errors here.
      // A non-initialized ldClient will be returned which
      // will use defaults for evaluation.
      console.log(`LaunchDarkly NodeClient init error: ${e}`);
    }
  }
};
