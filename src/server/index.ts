import { PrismaClient } from "@prisma/client";
import { publicProcedure, router } from "./trpc";

import { z } from "zod";

const prisma = new PrismaClient();

export const appRouter = router({
  getReflection: publicProcedure.query(async () => {
    const reflections = await prisma.reflection.findMany();
    return reflections;
  }),

  createUser: publicProcedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
        name: z.string().optional(),
      }),
    )
    .mutation(async (input) => {
      const user = await prisma.user.create({
        data: {
          email: input.input.email,
          password: input.input.password,
          name: input.input.name,
        },
      });
      return user;
    }),
});

export type AppRouter = typeof appRouter;
