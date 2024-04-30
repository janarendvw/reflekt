import { DataTable } from "@/components/ui/data-table";
import React from "react";
import { columns } from "./columns";
import { createContext } from "@/server/context";
import { createCaller } from "@/server";

type Props = {};

async function page({}: Props) {
  const ctx = await createContext();
  const serverClient = createCaller(ctx);

  const data = await serverClient.actionpoint.getAll();

  return <DataTable columns={columns} data={data} />;
}

export default page;
