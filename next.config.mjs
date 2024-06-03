export default async (phase, { defaultConfig }) => {
  const ld = await import('@launchdarkly/node-server-sdk');
  const ldClient = ld.init(process.env.LD_SDK_KEY);

  if (process.env.NEXT_RUNTIME === 'nodejs') {
    return {
      serverRuntimeConfig: {
        // Will only be available on the server side
        ldClient,
      },
    };
  }

  return defaultConfig;
};
