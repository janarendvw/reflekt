"use client";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { ActionPoint } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const columns: ColumnDef<ActionPoint>[] = [
    {
        header: "Date",
        accessorKey: "createdAt",
        cell: ({ row }) => {
          const date = new Date(row.original.createdAt);
          const utcDate = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
          return <span className="text-muted-foreground">{utcDate.toDateString()}</span>;
        },
    },
  {
    header: "Title",
    accessorKey: "title",
    cell: ({ row }) => {
      return <Link href={`/action-points/${row.original.id}`} className="font-semibold hover:underline">{row.original.title}</Link>;
    },
  },
  {
    header: "Status",
    accessorKey: "resolved",
    cell: ({ row }) => {
      return row.original.resolved ? <Badge className="bg-green-400/10 text-green-500 flex items-center gap-1"><Icon name="check_circle" />Resolved</Badge> : <Badge className="flex border border-foreground border-dashed bg-transparent text-foreground items-center gap-1"><Icon name="work_history" />Open</Badge>;
    },
  },
  {
    header: "Reflection",
    accessorKey: "reflectionId",
    cell: ({ row }) => {
      return (
        <Link href={`/reflections/${row.original.reflectionId}`} className="underline">
          Reflection
        </Link>
      );
    },
  },
];
