import { isServer } from '@/ld/isServer';

import type { LDContext } from '@launchdarkly/js-sdk-common';

const anonymous: LDContext = { kind: 'user', key: 'anon-key', anonymous: true };

/**
 * Unused. Example only.
 */
export async function getLDContext() {
  let context = anonymous;

  if (isServer) {
    const { cookies } = await import('next/headers');
    const ld = cookies().get('ld');
    context = ld ? JSON.parse(ld.value) : context;
  }

  return context;
}
