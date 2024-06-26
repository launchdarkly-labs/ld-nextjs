import { isServer } from '@/ld/isServer';
import { cookies } from 'next/headers';

import type { LDContext } from '@launchdarkly/js-sdk-common';

const anonymous: LDContext = { kind: 'user', key: 'anon-key', anonymous: true };

/**
 * Looks for an LDContext in a server cookie called 'ld'.
 *
 * @param def The default context if none is found in cookies. If unspecified
 * and none is found in cookies then anonymous is returned.
 *
 */
export function getLDContext(def?: LDContext) {
  let context = def ?? anonymous;

  if (isServer) {
    const ld = cookies().get('ld');
    if (!ld) {
      console.log(`*** no cookie, defaulting to ${JSON.stringify(context)} ***`);
    } else {
      console.log(`*** found cookie ${JSON.stringify(ld.value)} ***`);
      context = JSON.parse(ld.value);
    }
  }

  return context;
}
