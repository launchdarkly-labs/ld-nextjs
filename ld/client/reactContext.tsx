'use client';

import { createContext } from 'react';

import type { JSSdk } from '../types';

export type ReactContext = {
  jsSdk: JSSdk;
};

export const context = createContext<ReactContext>({
  jsSdk: {} as any,
});

const { Provider, Consumer } = context;

export { Provider, Consumer };
