import type { LDContext } from '@launchdarkly/js-sdk-common';

import { isServer } from '../isServer';

const anonymous: LDContext = { kind: 'user', key: 'anon-key', anonymous: true };

/**
 * Looks for an LDContext in a server cookie called 'ld'.
 *
 * @param def The default context if none is found in cookies. If unspecified
 * and none is found in cookies then anonymous is returned.
 *
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
