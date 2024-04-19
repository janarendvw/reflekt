import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { serverClient } from "../_trpc/serverClient";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Props = {};

export default async function page({}: Props) {
  const data = await serverClient.reflection.getFirstNReflections({ n: 10 });
  return (
    <>
      <main className="container flex max-h-full gap-8 overflow-hidden py-20">
        <DataTable columns={columns} data={data} />{" "}
        <Card className="w-1/2 h-fit">
          <CardHeader>
            <CardTitle>Add new reflection</CardTitle>
            <CardDescription>
              Click the button below to add a new reflection
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <Input placeholder="Title" />
              <Textarea className="h-56" placeholder="Description" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Add Reflection</Button>
          </CardFooter>{" "}
        </Card>
      </main>
    </>
  );
}
