import { prisma } from "@/app/client";
import { publicProcedure, router } from "../trpc";
import { z } from "zod";

export const actionPointRouter = router({
    getAllActionPoints: publicProcedure
        .query(async () => {
        return await prisma.actionPoint.findMany()
        }),

    getActionPointCount: publicProcedure
        .query(async () => {
        return await prisma.actionPoint.count();
        }),

    getResolvedActionPointCount: publicProcedure
        .query(async () => {
        return await prisma.actionPoint.count({
        where: {
            resolved: true
        }
        });
        }),

    getActionPointById: publicProcedure
        .input(
        z.object({
            id: z.number()
        })
        )
        .query(async ({ input }) => {
        const { id } = input;
        return await prisma.actionPoint.findUnique({
            where: {
            id: id
            }
        });
        }),

    updateActionPoint: publicProcedure
        .input(
        z.object({
            id: z.number(),
            title: z.string(),
            content: z.string()
        })
        )
        .mutation(async ({ input }) => {
        const { id, title, content } = input;
        return await prisma.actionPoint.update({
            where: {
            id: id
            },
            data: {
            title,
            content
            }
        });
        }),
    deleteActionPoint: publicProcedure
        .input(
        z.object({
            id: z.number()
        })
        )
        .mutation(async ({ input }) => {
        const { id } = input;
        return await prisma.actionPoint.delete({
            where: {
            id: id
            }
        });
        }),
    });
    