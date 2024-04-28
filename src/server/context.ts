import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

export const createContext = async (opts: FetchCreateContextFnOptions) => {
    const { req, resHeaders } = opts;
    return {
        req, resHeaders
    }
}

  export type Context = Awaited<ReturnType<typeof createContext>>;