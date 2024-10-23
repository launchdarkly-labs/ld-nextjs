import { getLDContext } from '@/app/utils';
import { useVariationRsc } from '@/ld/server';

export default async function HelloServerComponent() {
  const flagValue = await useVariationRsc('dev-test-flag', await getLDContext());

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
