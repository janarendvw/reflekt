import Line from "@/components/charts/line";
import React from "react";
import { serverClient } from "../_trpc/serverClient";
import { ActionPoint } from "@prisma/client";

type Props = {};

export default async function Page({}: Props) {

  const actionPoints: ActionPoint[] = await serverClient.actionpoint.getAllActionPoints().then((res) => {
    return res;
  });


  return (
    <div className="w-full h-screen grid grid-cols-2 grid-rows-2 gap-8">
      <div className="aspect-video">
        <h4>Progress</h4>
        <Line data={actionPoints} />
      </div>
      <div className="aspect-video">
      <h4>Progress</h4>
        <Line data={actionPoints} />
      </div>
    </div>
  );
}
