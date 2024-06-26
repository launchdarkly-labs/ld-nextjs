import { useContext } from 'react';

import { LDClientRsc } from '../../ldClientRsc';
import { context as reactContext, type ReactContext } from '../reactContext';

/**
 * Only useLDClient with Client Components.
 */
export const useLDClient = () => {
  const { context, bootstrap } = useContext<ReactContext>(reactContext);

  // TODO: potentially memo this
  return new LDClientRsc(context, bootstrap);
};
