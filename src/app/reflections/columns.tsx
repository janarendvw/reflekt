"use client";
import { ColumnDef } from "@tanstack/react-table";
import type { Reflection } from "@prisma/client";
import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

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
        date.getUTCDate()
      );
      return (
        <span className="text-muted-foreground">
          {utcDate.toDateString()}
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
          {skills.map((skill, index) => {
            return (
              <motion.div key={index} initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.05 * index }}>
                <Badge
                  
                  style={{ backgroundColor: `hsla(${generateHSLColorFromSeed(skill)}, 80%, 70%, 1)`, color: `hsla(${generateHSLColorFromSeed(skill)}, 100%, 10%, 1)`}}
                  className="flex px-4 py-px font-bold items-center justify-center rounded-sm text-xs"
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
        <Badge className="bg-secondary font-mono text-secondary-foreground">
          {actionPoints.length} points
        </Badge>
      );
    },
  },
];
