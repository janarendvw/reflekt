import Line from "@/components/charts/line";
import React from "react";
import { ActionPoint } from "@prisma/client";
import { createContext } from "@/server/context";
import { createCaller } from "@/server";

type Props = {};

export default async function Page({}: Props) {
  const ctx = await createContext();
  const serverClient = createCaller(ctx);

  const actionPoints: ActionPoint[] = await serverClient.actionpoint.getAll().then((res) => {
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
