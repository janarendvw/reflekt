"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { ActionPoint } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { trpc } from "../_trpc/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const columns: ColumnDef<ActionPoint>[] = [
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
  {
    id: "id",
    cell: ({ row }) => {
      const mutation = trpc.actionpoint.updateActionPoint.useMutation();
      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Icon name="more_vert" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <button
                disabled={mutation.isPending}
                onClick={() => {
                  mutation.mutate({
                    id: row.original.id,
                    resolved: !row.original.resolved,
                  });
                }}
              >
                {row.original.resolved ? "unresolve" : "resolve"}
              </button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <button
                className="text-red-500"
                disabled={mutation.isPending}
                onClick={() => {
                  mutation.mutate({
                    id: row.original.id,
                    resolved: !row.original.resolved,
                  });
                }}
              >
                delete
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
