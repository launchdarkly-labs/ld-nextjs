'use client';

import NextClient from '@/ld/nextClient';
import { createContext } from 'react';

export type ReactContext = {
  client: NextClient;
};

export const context = createContext<ReactContext>({
  client: NextClient.get(),
});

const { Provider, Consumer } = context;

export { Provider, Consumer };
