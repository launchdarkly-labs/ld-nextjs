'use client';

import { getGlobalNextClient } from '@/ld/globals';
import NextClient from '@/ld/nextClient';
import { createContext } from 'react';

export type ReactContext = {
  client: NextClient;
};

export const context = createContext<ReactContext>({
  client: getGlobalNextClient(),
});

const { Provider, Consumer } = context;

export { Provider, Consumer };
