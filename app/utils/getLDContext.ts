import { cookies } from 'next/headers';

import type { LDContext } from '@launchdarkly/node-server-sdk';
import { isServer } from '../../ld/isServer';

const anonymous: LDContext = { kind: 'user', key: 'anon-key', anonymous: true };

/**
 * This is an example of how you can source your LDContext. You may also
 * retrieve it from a database or from request headers.
 *
 * This example looks for an LDContext in a server cookie called 'ld'.
 *
 * @param def The default context if none is found in cookies. As final
 * fallback, anonymous is returned.
 *
 */
export async function getLDContext(def?: LDContext): Promise<LDContext> {
  let context = def ?? anonymous;

  if (isServer) {
    try {
      const cookieStore = await cookies();
      const ld = cookieStore.get('ld');
      if (!ld) {
      } else {
        console.log(`*** found cookie ${JSON.stringify(ld.value)} ***`);
        context = JSON.parse(ld.value);
      }
    } catch (error) {
      console.error('Error accessing cookies:', error);
    }
  }

  return context;
}
