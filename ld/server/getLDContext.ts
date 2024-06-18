import type { LDContext } from '@launchdarkly/js-sdk-common';

import { isServer } from '../isServer';

const anonymous: LDContext = { kind: 'user', key: 'anon-key', anonymous: true };

/**
 * Unused. Example only.
 */
export async function getLDContext(def?: LDContext) {
  let context = def ?? anonymous;

  if (isServer) {
    const { cookies } = await import('next/headers');
    const ld = cookies().get('ld');
    if (!ld) {
      console.log(`======= no cookie, defaulting to ${JSON.stringify(context)}`);
    }
    context = ld ? JSON.parse(ld.value) : context;
  }

  return context;
}
