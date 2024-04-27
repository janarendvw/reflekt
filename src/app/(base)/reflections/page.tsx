import React from "react";
import { columns } from "./columns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { serverClient } from "@/app/_trpc/serverClient";
import { DataTable } from "@/components/ui/data-table";

type Props = {};

export default async function page({}: Props) {
  const data = await serverClient.reflection.getFirstNReflections({ n: 10 });
  const reflectionCount = await serverClient.reflection.getReflectionCount();
  const actionPointCount = await serverClient.actionpoint.getActionPointCount();
  const resolvedActionPointCount = await serverClient.actionpoint.getResolvedActionPointCount();
  return (
    <>
  
    <div className="flex gap-8 w-full">
      <Card className="flex-1">
        <CardHeader className="pb-2">
          <CardDescription>Total reflections</CardDescription>
          <CardTitle className="text-4xl">{reflectionCount}</CardTitle>
        </CardHeader>
        <CardContent>
        </CardContent>
      </Card>
      <Card className="flex-1">
        <CardHeader className="pb-2">
          <CardDescription>Total action points</CardDescription>
          <CardTitle className="text-4xl">{actionPointCount}</CardTitle>
        </CardHeader>
        <CardContent>
        </CardContent>
      </Card>
      <Card className="flex-1">
        <CardHeader className="pb-2">
          <CardDescription>Percentage resolved</CardDescription>
          <CardTitle className="text-4xl">{Math.round(resolvedActionPointCount/actionPointCount*100)}%</CardTitle>
        </CardHeader>
        <CardContent>
        </CardContent>
      </Card>
    </div>

      <DataTable columns={columns} data={data} /> 
      
    </>
  );
}
