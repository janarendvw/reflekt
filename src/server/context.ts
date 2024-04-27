import type { CreateNextContextOptions } from '@trpc/server/adapters/next';

export async function createContext(opts: CreateNextContextOptions) {
   
    return {
        undefined,
    };
  }

  export type Context = Awaited<ReturnType<typeof createContext>>;