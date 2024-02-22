import { ColumnDef } from "@tanstack/react-table";
import type { Reflection } from "@prisma/client";

export const columns: ColumnDef<Reflection>[] = [
  {
    header: "Title",
    accessorKey: "title"
  },
  {
    header: "Content",
    accessorKey: "content",

  },
  {
    header: "Skills",
    accessorKey: "skills",
  },
];
