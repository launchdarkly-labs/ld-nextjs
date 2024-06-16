'use client';

import { createContext } from 'react';

import NextSdk from '../nextSdk';

export type ReactContext = {
  nextSdk: NextSdk;
};

export const context = createContext<ReactContext>({
  nextSdk: {} as any,
});

const { Provider, Consumer } = context;

export { Provider, Consumer };
