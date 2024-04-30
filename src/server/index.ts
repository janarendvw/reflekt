import { prisma } from "@/app/client";
import { privateProcedure, publicProcedure, router, t } from "./trpc";
import { z } from "zod";
import { reflectionRouter } from "./routers/reflection";
import { actionPointRouter } from "./routers/actionpoint";
import { getMeHandler } from "./controllers/user";
import authRouter from "./routers/auth";
import { createContext } from "./context";


export const appRouter = router({
  actionpoint: actionPointRouter,
  reflection: reflectionRouter,
  auth: authRouter,

  getFirstUser: publicProcedure.query(async () => {
    const user = await prisma.user.findFirst();
    return user;
  }),
  getMe: privateProcedure.query(({ ctx }) => getMeHandler({ ctx })),
});

export const createCaller = t.createCallerFactory(appRouter);

export type AppRouter = typeof appRouter;
