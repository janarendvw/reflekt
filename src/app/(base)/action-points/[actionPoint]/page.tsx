import ActionPointCard from "@/components/actionpoint-card";
import Icon from "@/components/ui/icon";
import { createCaller } from "@/server";
import { createContext } from "@/server/context";
import Link from "next/link";
import React from "react";

export default async function Page({
  params,
}: {
  params: { actionPoint: number };
}) {
  const ctx = await createContext();
  const serverClient = createCaller(ctx);

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
