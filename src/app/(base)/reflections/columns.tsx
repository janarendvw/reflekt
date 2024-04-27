"use client";
import { ColumnDef } from "@tanstack/react-table";
import type { Reflection } from "@prisma/client";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { HoverCard, HoverCardTrigger } from "@/components/ui/hover-card";
import { HoverCardContent } from "@radix-ui/react-hover-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { resolveSkillEnum } from "@/lib/helpers";

export const columns: ColumnDef<Reflection>[] = [
  {
    header: "Date",
    accessorKey: "createdAt",
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);
      return (
        <span className="font-mono text-muted-foreground">
          {date.toUTCString().split(" ").slice(0, 4).join(" ")}
        </span>
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
          {skills && skills.length > 0 ? (
            <span className="flex items-center gap-2">
              <Badge variant={"default"}>{resolveSkillEnum(skills[0])}</Badge>
              {skills.length > 1 && (
                <span className="text-xs font-semibold">
                  +{skills.length - 1}
                </span>
              )}
            </span>
          ) : (
            <span className="text-xs text-muted-foreground">-</span>
          )}
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
        <>
          {actionPoints.length > 0 ? (
            <HoverCard>
              <HoverCardTrigger>
                <Badge variant={"outline"} className="font-mono">
                  {actionPoints.length} points
                </Badge>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <motion.div
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ y: "-30%", opacity: 0 }}
                >
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
                              <Link href={`/action-points/${actionPoint.id}`}>
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
                </motion.div>
              </HoverCardContent>
            </HoverCard>
          ) : (
            <span className="text-muted-foreground">-</span>
          )}
        </>
      );
    },
  },
];
