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
      <h3 className="text-lg font-semibold">Reflection</h3>

      <Card className="mb-12">
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

      <h3 className="text-lg font-semibold">Open Action Points</h3>
      {reflection?.actionPoints.filter((actionPoint: ActionPoint) => {
        return !actionPoint.resolved;
      }).length === 0 ? (
        <p className="italic text-muted-foreground">No open action points</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {reflection?.actionPoints
            .filter((actionPoint: ActionPoint) => {
              return !actionPoint.resolved;
            })
            .map((actionPoint: ActionPoint) => {
              return (
                <ActionPointCard
                  actionPoint={actionPoint}
                  key={actionPoint.id}
                />
              );
            })}
        </div>
      )}
      <h3 className="text-lg font-semibold">Resolved Action Points</h3>
      {reflection?.actionPoints.filter((actionPoint: ActionPoint) => {
        return actionPoint.resolved;
      }).length === 0 ? (
        <p className="italic text-muted-foreground">
          No resolved action points
        </p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {reflection?.actionPoints
            .filter((actionPoint: ActionPoint) => {
              return actionPoint.resolved;
            })
            .map((actionPoint: ActionPoint) => {
              return (
                <ActionPointCard
                  actionPoint={actionPoint}
                  key={actionPoint.id}
                />
              );
            })}
        </div>
      )}
    </>
  );
}
