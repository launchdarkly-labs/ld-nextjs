'use client';

import NextSdk from '@/ld/nextSdk';
import { createContext } from 'react';

export type ReactContext = {
  nextSdk: NextSdk;
};

export const context = createContext<ReactContext>({
  nextSdk: {} as any,
});

const { Provider, Consumer } = context;

export { Provider, Consumer };
