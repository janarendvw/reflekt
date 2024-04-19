"use client"
import { ColumnDef } from "@tanstack/react-table";
import type { Reflection } from "@prisma/client";
import Link from "next/link";

export const columns: ColumnDef<Reflection>[] = [
  {
    header: "Title",
    accessorKey: "title",
    cell: ({ row }) => {
      const title = row.original.title;
      const words = title.split(" ");
      const truncatedContent = words.slice(0, 5).join(" ");
      const displayContent = words.length > 5 ? `${truncatedContent}...` : truncatedContent;
     return <Link className="font-semibold underline" href={`/reflections/${row.original.id}`}>{displayContent}</Link>
    },
  },
  {
    header: "Content",
    accessorKey: "content",
    cell: ({ row }) => {
      const content = row.original.content;
      const words = content.split(" ");
      const truncatedContent = words.slice(0, 10).join(" ");
      const displayContent = words.length > 5 ? `${truncatedContent}...` : truncatedContent;
      return <span className="text-muted-foreground text-xs">{displayContent}</span>;
    },

  },
  {
    header: "Skills",
    accessorKey: "skills",
  },
];
