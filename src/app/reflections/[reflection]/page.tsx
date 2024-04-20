import { serverClient } from "@/app/_trpc/serverClient";
import ActionPointCard from "@/components/actionpoint-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { ActionPoint } from "@prisma/client";
import Link from "next/link";
import React from "react";

type Props = {};

export default async function Page({
  params,
}: {
  params: { reflection: number };
}) {
  const reflection = await serverClient.reflection
    .getReflectionById({ id: Number(params.reflection) })
    .then((res) => res);
 
  return (
    <>
      <Link
        href={"/reflections"}
        className="absolute left-8 top-8 flex items-center gap-1 text-muted-foreground"
      >
        <Icon name="arrow_back" />
        Terug
      </Link>
      <Card className="">
        <CardHeader className="flex justify-between">
          <div className="flex flex-col gap-1">
            <CardTitle>{reflection?.title}</CardTitle>
            <CardDescription>
              {reflection?.createdAt.toDateString()}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>{reflection?.content}</CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Action Points</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-3 gap-8">
          {//sort reflections by resolved
          reflection?.actionPoints
            .sort((a) => (a.resolved ? 1 : -1))
            .map((actionPoint: ActionPoint) => (
          <ActionPointCard key={actionPoint.id} actionPoint={actionPoint} />
            ))}
        </CardContent>
      </Card>
    </>
  );
}
