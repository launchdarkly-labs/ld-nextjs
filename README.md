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

* `initNodeSdk` - Initializes the Node SDK on server startup using the [instrumentation hook](https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation)

* `initSsr` - Setups up the ssr client. Call this at the root layout so the ssr client can be shared across pages.

* `LDProvider` - The react context provider used on the client side.

* `useLDClient` - Universal hook for the server and client side to get the ld client. Use this hook to get the client and evaluate flags.

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

3. In your root layout component, run `initSsr` and pass the context and bootstrap to the LDProvider:

```tsx
// layout.tsx
export default async function RootLayout({
                                           children,
                                         }: Readonly<{
  children: ReactNode;
}>) {
  // Set up the ssr client
  const { context, bootstrap } = await initSsr({
    kind: 'user',
    key: 'nextjs-default-user',
  });

  // Pass context and bootstrap to LDProvider
  return (
    <html lang="en">
      <body className={inter.className}>
        <LDProvider context={context} options={{ bootstrap }}>
          {children}
        </LDProvider>
      </body>
    </html>
  );
}
```

4. Mark your root page component as async:

```tsx
// page.tsx must be async
export default async function Page() {
  return <YourApp />;
}
```

5. Then all other components server and client will be able to use the universal `useLDClient` hook to get an ld client and evaluate flags. In each case, server side rendering should work too:

#### Server Component
```tsx
import { useLDClient } from '@/ld';

export default async function YourApp() {
  const ldc = useLDClient();
  const flagValue = ldc.variation('dev-test-flag');

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Server component. FlagValue is {flagValue ? 'true' : 'false'}.
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

  return <>Client component. FlagValue is {flagValue ? 'true' : 'false'}.</>
}
```

## Known issue

There is an [issue](https://github.com/vercel/next.js/discussions/53026) with App Router where nested pages render before their parent layouts. This means if you want to evaluate flags in a page component, you must run `initSsr` in that page component.

```tsx
// page.tsx
export default async function Page() {
  // Won't work. The ssr client is undefined because this Page runs before the parent layout.
  const ldc = useLDClient();
  const flagValue = ldc.variation('dev-test-flag');

  return (
    <>
      page.tsx: {flagValue.toString()}
      <YourApp />
    </>
  );
}
```

As a workaround, run `initSsr` in page.tsx in addition to layout.tsx to ensure the ssr client is setup:

```tsx
export default async function Page() {
  // Ensure the ssr client is set up
  await initSsr({
    kind: 'user',
    key: 'nextjs-default-user',
  });

  // Works now
  const ldc = useLDClient();
  const flagValue = ldc.variation('dev-test-flag');

  return (
    <>
      page.tsx: {flagValue.toString()}
      <YourApp />
    </>
  );
}
```

Don't worry `initSsr` checks to ensure the ssr client is initialized only once even if you call it multiple times. Note that you only need to use this workaround if you actually need to evaluate flags in a page component. For example, if you only evaluate flags in children components below Page, then you can safely ignore this completely and just call `initSsr` once in the root layout.
