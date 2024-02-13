import { LDClient, LDContext } from "@launchdarkly/node-server-sdk";

export default async function Home() {
  // @ts-ignore
  const ldClient = global.ldClient as LDClient;
  const context: LDContext = { kind: "user", key: "test-user-key-1" };
  // @ts-ignore
  const v = await ldClient.variation(process.env.FLAG_KEY, context, false);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>{v ? "Hello from LD! flag true" : "Flag false"}</p>
    </main>
  );
}
