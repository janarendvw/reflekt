import { prisma } from "@/app/client";
import { privateProcedure, publicProcedure, router } from "../trpc";
import { z } from "zod";
import { resolve } from "path";

export const actionPointRouter = router({
  getAll: privateProcedure.query(async ({ ctx }) => {
    return await prisma.actionPoint.findMany({
      where: {
        authorId: ctx.user?.id,
      },
    });
  }),

  getCount: privateProcedure.query(async ({ ctx }) => {
    return await prisma.actionPoint.count({
      where: {
        authorId: ctx.user?.id,
      },
    });
  }),

  getResolvedCount: privateProcedure.query(async ({ctx}) => {
    return await prisma.actionPoint.count({
      where: {
        resolved: true,
        authorId: ctx.user?.id,
      },
    });
  }),

  getActionPointById: privateProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .query(async ({ input }) => {
      const { id } = input;
      return await prisma.actionPoint.findUnique({
        where: {
          id: id,
        },
      });
    }),

  updateActionPoint: publicProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.string().optional(),
        content: z.string().optional(),
        resolved: z.boolean().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const { id, title, content, resolved } = input;
      return await prisma.actionPoint.update({
        where: {
          id: id,
        },
        data: {
          title,
          content,
          resolved,
        },
      });
    }),
  deleteActionPoint: publicProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .mutation(async ({ input }) => {
      const { id } = input;
      return await prisma.actionPoint.delete({
        where: {
          id: id,
        },
      });
    }),
});
