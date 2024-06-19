> [!IMPORTANT]  
> This is an experimental project to demonstrate the use of LaunchDarkly with Next.js App Router.
> 
> This is designed for the App Router. Pages router is not supported.

This solution uses the Node Server SDK and the Javascript SDK. It features:

* Server side rendering with both Server Components and Client Components.
* A universal LDClient which works on both client and server.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) using App Router.

## Quickstart

To run this project:

1. Create an .env file at repo root.
2. Add your SDK key and client-side ID:

```dotenv
LD_SDK_KEY=sdk-***
NEXT_PUBLIC_LD_CLIENT_SIDE_ID=***
```

3. Replace `dev-test-flag` with your own flags in `app.tsx` and `LDButton.tsx`.
4. `yarn && yarn dev`

You should see your flag value rendered in the browser.

## Api

The code under `ld` exposes these public apis:

* initNodeSdk - Initializes the Node SDK on server startup using the [instrumentation hook](https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation)

* initSsr - 

* LDProvider

* useLDClient

Follow these instructions if you want to test this apis in your own project:

1. Enable [instrumentationHook](https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation) in `next.config.mjs`:

```ts
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { instrumentationHook: true },
};

export default nextConfig;

```

2. Create a new file `instrumentation.ts` at the root of your project. This will initialize the Node Server SDK.

```ts
import { initNodeSdk } from '@/ld/server';

export async function register() {
  await initNodeSdk();
}
```

3. In your `app` folder, each page component must be async and must run `initSsr`:

```tsx
// must be async
export default async function RootPage() {
  // must be run in each page component
  const { context, bootstrap } = await initSsr({
    kind: 'user',
    key: 'nextjs-default-user',
  });

  // pass context and bootstrap to LDProvider
  return (
    <LDProvider context={context} options={{ bootstrap }}>
      <YourApp />
    </LDProvider>
  );
}
```

4. Then all components server and client will be able to use the `useLDClient` hook to get an LDClient and evaluate flags. In each case, server side rendering should work too:

#### Server Component
```tsx
import { useLDClient } from '@/ld';

export default async function YourApp() {
  const ldc = useLDClient();
  const flagValue = ldc.variation('dev-test-flag');

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      FlagValue is {flagValue ? 'true' : 'false'}.
      <br />
      <Home />
    </main>
  );
}
```

#### Client Component
```tsx
'use client';

import { useLDClient } from '@/ld';

export default function Home() {
  const ldc = useLDClient();
  const flagValue = ldc.variation('dev-test-flag');

  return <p>{flagValue ? 'Hello from LD! Flag true' : 'Flag false'}</p>;
}
```
