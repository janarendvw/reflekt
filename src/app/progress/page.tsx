import Line from "@/components/charts/line";
import React from "react";
import { serverClient } from "../_trpc/serverClient";
type Props = {};

export default async function Page({}: Props) {

  const reflections = await serverClient.reflection.getAllReflections().then((res) => {
    console.log(res);
    return res;
  });


  return (
    <div>
    </div>
  );
}
