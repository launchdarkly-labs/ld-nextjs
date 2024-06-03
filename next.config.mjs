import { start } from '@sitespeed.io/throttle';

export default async (phase, { defaultConfig }) => {
  const ld = await import('@launchdarkly/node-server-sdk');

  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const options = { up: 360, down: 400, rtt: 200 };
    await start(options);
    return {
      serverRuntimeConfig: {
        // Will only be available on the server side
        ldClient: ld.init(process.env.LD_SDK_KEY),
      },
    };
  }

  return defaultConfig;
};
