import { get } from "http";
import { publicProcedure, router } from "../trpc";
import { prisma } from "@/app/client";
import { z } from "zod";

export const reflectionRouter = router({
  getAllReflections: publicProcedure
    .query(async () => {
      return await prisma.reflection.findMany({
        orderBy: {
          createdAt: 'desc'
        }
      })
    }),

  getFirstNReflections: publicProcedure
    .input(
      z.object({
        n: z.number()
      })
    )
    .query(async ({ input }) => {
      const { n } = input;
      return await prisma.reflection.findMany({
        take: n,
        orderBy: {
          createdAt: 'desc'
        }
      });
    }),
  createReflection: publicProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string()
      })
    )
    .mutation(async ({ input }) => {
      const { title, content } = input;
      const reflection = await prisma.reflection.create({
        data: {
          title: title,
          content: content,
          author: {
            connect: {
              id: '1'
            }
          }
        }
      });
      return reflection;
    }),
  updateReflection: publicProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.string(),
        content: z.string()
      })
    )
    .mutation(async ({ input }) => {
      const { id, title, content } = input;
      const reflection = await prisma.reflection.update({
        where: {
          id: id
        },
        data: {
          title: title,
          content: content
        }
      });
      return reflection;
    }),
  deleteReflection: publicProcedure
    .input(
      z.object({
        id: z.string()
      })
    )
    .mutation(async ({ input }) => {
      const { id } = input;
      const reflection = await prisma.reflection.delete({
        where: {
          id: id
        }
      });
      return reflection;
    })
});