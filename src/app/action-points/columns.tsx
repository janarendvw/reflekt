"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { ActionPoint } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { trpc } from "../_trpc/client";

export const columns: ColumnDef<ActionPoint>[] = [
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
      return (
        <Link
          href={`/action-points/${row.original.id}`}
          className="font-semibold hover:underline"
        >
          {row.original.title}
        </Link>
      );
    },
  },
  {
    header: "Status",
    accessorKey: "resolved",
    cell: ({ row }) => {
      return row.original.resolved ? (
        <Badge className="flex items-center gap-1 bg-green-400/10 text-green-500">
          <Icon name="check_circle" />
          Resolved
        </Badge>
      ) : (
        <Badge variant={"secondary"} className="flex items-center gap-1">
          <Icon name="work_history" />
          Open
        </Badge>
      );
    },
  },
  {
    header: "Actions",
    accessorKey: "id",
    cell: ({ row }) => {
      const mutation = trpc.actionpoint.updateActionPoint.useMutation();
      return (
        <Button
          disabled={mutation.isPending}
          variant="link"
          onClick={() => {
            mutation.mutate({
              id: row.original.id,
              resolved: !row.original.resolved,
            });
          }}
        >
          {row.original.resolved ? (
            <span>{mutation.isSuccess ? "Unresolved" : "Unresolve"}</span>
          ) : (
            <span>{mutation.isSuccess ? "Resolved" : "Resolve"}</span>
          )}
        </Button>
      );
    },
  },
  {
    header: "Reflection",
    accessorKey: "reflectionId",
    cell: ({ row }) => {
      return (
        <Link
          href={`/reflections/${row.original.reflectionId}`}
          className="underline"
        >
          Reflection
        </Link>
      );
    },
  },
];
