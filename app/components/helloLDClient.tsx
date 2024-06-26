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
