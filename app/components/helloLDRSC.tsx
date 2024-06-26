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
