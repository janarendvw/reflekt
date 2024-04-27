import { publicProcedure, router } from "../trpc";
import { prisma } from "@/app/client";
import { ReflectionModelType, Skills } from "@prisma/client";
import { z } from "zod";

export const reflectionRouter = router({
  getAllReflections: publicProcedure
    .query(async () => {
      return await prisma.reflection.findMany({
        include: {
          actionPoints: true
        },
        orderBy: {
          createdAt: 'desc'
        }

      })
    }),

  getReflectionCount: publicProcedure
    .query(async () => {
      return await prisma.reflection.count();
    }),


  getReflectionById: publicProcedure
    .input(
      z.object({
        id: z.number()
      })
    )
    .query(async ({ input }) => {
      const { id } = input;
      return await prisma.reflection.findUnique({
        include: {
          actionPoints: true
        },
        where: {
          id: id
        }
      });
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
        include: {
          actionPoints: true
        },
        orderBy: {
          createdAt: 'desc'
        }
      });
    }),
    
  createReflection: publicProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.array(z.string()),
        skills: z.array(z.nativeEnum(Skills)).optional(),
        reflectionType: z.nativeEnum(ReflectionModelType)
      })
    )
    .mutation(async ({ input }) => {
      const { title, content, skills, reflectionType } = input;
      const reflection = await prisma.reflection.create({
        data: {
          title: title,
          content: content,
          skills: skills,
          reflectionType: reflectionType ,
          author: {
            connect: {
              id: 'test-user-id'
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
        content: z.array(z.string())
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
        id: z.number()
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