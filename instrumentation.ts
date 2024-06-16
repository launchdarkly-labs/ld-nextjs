import { initNodeSdk } from '@/ld/server';

export async function register() {
  await initNodeSdk();
}
