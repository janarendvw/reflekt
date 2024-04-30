import { deserializeUser } from "./middleware/auth";
import type { CreateNextContextOptions } from '@trpc/server/adapters/next';

export const createContext = async (opts: CreateNextContextOptions) => deserializeUser();


  export type Context = Awaited<ReturnType<typeof createContext>>;