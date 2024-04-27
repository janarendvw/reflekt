import { serverClient } from "@/app/_trpc/serverClient";
import ActionPointCard from "@/components/actionpoint-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import Link from "next/link";
import React from "react";

export default async function Page({
  params,
}: {
  params: { actionPoint: number };
}) {
  const actionPoint = await serverClient.actionpoint
    .getActionPointById({ id: Number(params.actionPoint) })
    .then((res) => res);

  return (
    <>
      <Link
        href={"/action-points"}
        className="absolute left-8 top-8 flex items-center gap-1 text-muted-foreground"
      >
        <Icon name="arrow_back" />
        Terug
      </Link>
      {actionPoint && <ActionPointCard actionPoint={actionPoint} />}
    </>
  );
}
