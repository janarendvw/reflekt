import { TRPCError, initTRPC } from "@trpc/server";
import { Context } from "./context";
import { SuperJSON } from "superjson";
import { redirect } from "next/navigation";

export const t = initTRPC.context<Context>().create({
    transformer: SuperJSON,
});


const isAuthed = t.middleware(({ next, ctx }) => {
    if (!ctx.user) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You must be logged in to access this resource",
      });
    }
    return next();
  });

export const router = t.router;

export const publicProcedure = t.procedure;

export const privateProcedure = t.procedure.use(isAuthed);

export const unCachedPrivateProcedure = t.procedure.use(isAuthed)
