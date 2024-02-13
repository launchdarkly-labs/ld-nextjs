// https://stackoverflow.com/a/77289738
// https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation#examples

export async function register() {
  // works https://github.com/vercel/next.js/issues/49565#issuecomment-1902082982
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const ld = await import("@launchdarkly/node-server-sdk");
    // @ts-ignore
    global.ldClient = ld.init(process.env.LD_SDK_KEY);
  }
}
