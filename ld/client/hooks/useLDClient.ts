import { useContext, useMemo } from 'react';

import { LDClientRsc } from '../../ldClientRsc';
import { context as reactContext, type ReactContext } from '../reactContext';

/**
 * Only useLDClient with Client Components.
 */
export const useLDClient = () => {
  const { context, bootstrap, jsSdk } = useContext<ReactContext>(reactContext);

  return useMemo(() => {
    return jsSdk ?? new LDClientRsc(context, bootstrap);
  }, [jsSdk, context, bootstrap]);
};