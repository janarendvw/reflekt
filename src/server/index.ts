import { prisma } from "@/app/client";
import { publicProcedure, router } from "./trpc";
import { z } from "zod";
import { reflectionRouter } from "./routers/reflections";
import { actionPointRouter } from "./routers/actionpoint";

export const appRouter = router({
  actionpoint: actionPointRouter,
  reflection: reflectionRouter,
  createUser: publicProcedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
        name: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const { email, password, name } = input;
      const user = await prisma.user.create({
        data: {
          email: email,
          password: password,
          name: name,
        },
      });
      return user;
    }),
  
  getFirstUser: publicProcedure
    .query(async () => {
      const user = await prisma.user.findFirst();
      return user;
    }),

});

export type AppRouter = typeof appRouter;
