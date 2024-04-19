import { PrismaClient } from "@prisma/client";
import { publicProcedure, router } from "./trpc";
import { z } from "zod";
import { reflectionRouter } from "./routers/reflections";

const prisma = new PrismaClient();

export const appRouter = router({
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

});

export type AppRouter = typeof appRouter;
