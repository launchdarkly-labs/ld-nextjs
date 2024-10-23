'use client';

import { useLDClient } from '@/ld/client';
import { useTypedVariation } from '@/ld/client/hooks/variation/useTypedVariation';

export default function HelloClientComponent() {
  const flagValue = useTypedVariation('dev-test-flag', false);

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
