import ld from '@launchdarkly/node-server-sdk';

const nextConfig = () => {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    return {
      serverRuntimeConfig: {
        // Will only be available on the server side
        ldClient: ld.init(process.env.LD_SDK_KEY),
      },
    };
  }
};

export default nextConfig;
