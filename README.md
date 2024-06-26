> [!IMPORTANT]  
> This is an experimental project to demonstrate the use of LaunchDarkly with Next.js App Router.
>
> This is designed for the App Router. Pages router is not supported.

This solution uses the Node Server SDK and the Javascript SDK. It features:

- Server side rendering with both Server Components and Client Components.
- A client example located in `/app/components/helloLDClient.tsx`
- A React Server Component (RSC) example in `/app/components/helloLDRSC.tsx`
- A universal LDClient which works on both client and server.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) using App Router.

## Quickstart

To run this project:

1. Update the .env.local file with your LaunchDarkly SDK Key configurations.

```dotenv
LD_SDK_KEY='<YOUR LD SERVER SDK KEY>'
NEXT_PUBLIC_LD_CLIENT_SIDE_ID='<YOUR LD CLIENT SDK KEY>'
```

Optional - 

1. Either create `dev-test-flag` in your LaunchDarkly environment or replace with your own flags in `helloLDClient.tsx` and/or `helloLDRSC.tsx`.
2. `yarn && yarn dev` or `npm i && npm run dev`

You should see your flag value rendered in the browser.

## Api

The code under `ld` exposes these public apis:

- `initNodeSdk` - Initializes the Node SDK on server startup using the [instrumentation hook](https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation)

- `initSsrLDClient` - Setups up the ssr client. Call this at the root layout so the ssr client can be shared across pages.

- `LDProvider` - The react context provider used on the client side.

- `useLDClient` - Universal hook for the server and client side to get the ld client. Use this hook to get the client and evaluate flags.

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

3. In your root layout component, run `initSsrLDClient` and pass the context and bootstrap to the LDProvider:

```tsx
// layout.tsx
export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  // Set up the ssr client
  const { context, bootstrap } = await initSsrLDClient();

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
// page.tsx must be async to ensure server cache is properly initialized.
export default async function Page() {
  return <YourApp />;
}
```

5. Then all other components server and client will be able to use the universal `useLDClient` hook to get an ld client and evaluate flags. In each case, server side rendering should work too:

#### Server Component

```tsx
import { useLDClient } from '@/ld';

export default async function HelloRSC() {
  const ldc = useLDClient();
  const flagValue = ldc.variation('dev-test-flag');

  return (
    <div className="border-2 border-white/20 p-4">
      <p className="text-xl ldgradient">
        {flagValue
          ? "This flag is evaluating True in a React Server Component"
          : "This flag is evaluating False in a React Server Component"}
      </p>
    </div>
  );
}
```

#### Client Component

```tsx
"use client";

import { setCookie } from "cookies-next";
import { useLDClient } from '@/ld';
import { useEffect } from "react";

export default function HelloClient() {

  const ldc = useLDClient();
  const flagValue = ldc.variation('dev-test-flag');

// Cookies can only be set from within middleware or a client component. We set our LaunchDarkly context cookie here so it's avialable in our server components. You would set this during an authentication action normally. 

  useEffect(() => {
    async function getLDContext() {
      const context: any = await ldc?.getContext();
      return context;
    }

    getLDContext().then((ldcontext) => {
      setCookie("ldcontext", ldcontext);
    });
  }, [ldc]);

  return (
    <div className="border-2 border-white/20  p-4 ">
      <p className="ldgradient text-xl">
        {flagValue
          ? "This flag is evaluating True running Client-Side JavaScript"
          : "This flag is evaluating False running Client-Side JavaScript"}
      </p>
    </div>
  );
}
```

## Known issue

There is an [issue](https://github.com/vercel/next.js/discussions/53026) with App Router where nested pages render before their parent layouts. This means if you want to evaluate flags in a page component, you must run `initSsrLDClient` in that page component.

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

As a workaround, run `initSsrLDClient` in page.tsx in addition to layout.tsx to ensure the ssr client is setup:

```tsx
export default async function Page() {
  // Ensure the ssr client is set up
  await initSsrLDClient();

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

Don't worry `initSsrLDClient` checks to ensure the ssr client is initialized only once even if you call it multiple times. Note that you only need to use this workaround if you actually need to evaluate flags in a page component. For example, if you only evaluate flags in children components below Page, then you can safely ignore this completely and just call `initSsrLDClient` once at the root layout.
