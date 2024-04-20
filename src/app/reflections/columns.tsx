"use client";
import { ColumnDef } from "@tanstack/react-table";
import type { Reflection } from "@prisma/client";
import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { HoverCard, HoverCardTrigger } from "@/components/ui/hover-card";
import { HoverCardContent } from "@radix-ui/react-hover-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React from "react";

const generateHSLColorFromSeed = (seed: string) => {
  const seedCode = seed
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const hue = seedCode % 360;
  return hue;
};

export const columns: ColumnDef<Reflection>[] = [
  {
    header: "Date",
    accessorKey: "createdAt",
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);
      const utcDate = new Date(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate(),
      );
      return (
        <span className="text-muted-foreground">{utcDate.toDateString()}</span>
      );
    },
  },
  {
    header: "Title",
    accessorKey: "title",
    cell: ({ row }) => {
      const title = row.original.title;
      const words = title.split(" ");
      const truncatedContent = words.slice(0, 5).join(" ");
      const displayContent =
        words.length > 5 ? `${truncatedContent}...` : truncatedContent;
      return (
        <Link
          className="font-semibold hover:underline"
          href={`/reflections/${row.original.id}`}
        >
          {displayContent}
        </Link>
      );
    },
  },
  // {
  //   header: "Content",
  //   accessorKey: "content",
  //   cell: ({ row }) => {
  //     const content = row.original.content;
  //     const words = content.split(" ");
  //     const truncatedContent = words.slice(0, 10).join(" ");
  //     const displayContent = words.length > 5 ? `${truncatedContent}...` : truncatedContent;
  //     return <span className="text-muted-foreground text-xs">{displayContent}</span>;
  //   },

  // },
  {
    header: "Skills",
    accessorKey: "skills",
    cell: ({ row }) => {
      const skills = row.original.skills.sort((a, b) => a.localeCompare(b));

      return (
        <div className="flex items-center gap-1">
          {skills.map((skill, index) => {
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index }}
              >
                <Badge
                  style={{
                    backgroundColor: `hsla(${generateHSLColorFromSeed(skill)}, 100%, 70%, 1)`,
                    color: `hsla(${generateHSLColorFromSeed(skill)}, 100%, 10%, 1)`,
                  }}
                  className="flex items-center justify-center rounded-sm px-4 py-px text-xs font-bold"
                >
                  {skill[0]}
                </Badge>
              </motion.div>
            );
          })}
        </div>
      );
    },
  },
  {
    header: "actionpoints",
    accessorKey: "actionPoints",
    cell: ({ row }) => {
      const actionPoints: [] = row.getValue("actionPoints");
      return (
        <HoverCard >
          <HoverCardTrigger>
            <Badge className="bg-secondary font-mono text-secondary-foreground">
              {actionPoints.length} points
            </Badge>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <Card>
              <CardHeader>
                <CardTitle>Action Points</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  {actionPoints.map((actionPoint: any, index) => {
                    return (
                      <React.Fragment key={actionPoint.id}>
                      {index !== 0 && <Separator />}
                        <Link href={`/action-points/${actionPoint.id}`} className="list-item">
                          <span className="font-muted-foreground underline">
                            {actionPoint.title}
                          </span>
                        </Link>
                      </React.Fragment>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </HoverCardContent>
        </HoverCard>
      );
    },
  },
];
