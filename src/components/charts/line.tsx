"use client";
import React from "react";
import { ResponsiveLine } from "@nivo/line";
import { ActionPoint } from "@prisma/client";

type Props = {
  data: ActionPoint[];
};

type FormattedData = [
  {
    id: string;
    color: string;
    data: {
      x: string;
      y: number;
    }[];
  },
];

function Line({ data, ...inherited }: Props) {
  const formattedData: FormattedData = [
    {
      id: "reflections",
      color: "hsl(40, 100%, 50%)",
      data: data.map((actionPoint) => {
        return {
          x: actionPoint.createdAt.toDateString(),
          y: actionPoint.id,
        };
      }),
    },
  ];
  return (
    <ResponsiveLine
      {...inherited}
      data={formattedData || []}
      animate
      defs={[
        {
          colors: [
            {
              color: "inherit",
              offset: 0,
            },
            {
              color: "inherit",
              offset: 120,
              opacity: 0,
            },
          ],
          id: "gradientA",
          type: "linearGradient",
        },
      ]}
      fill={[
        {
          id: "gradientA",
          match: "*",
        },
      ]}
      enableSlices={"x"}
      pointSize={0}
      enableArea
      margin={{ top: 50, right: 0, bottom: 50, left: 30 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      axisBottom={{ tickRotation: -15 }}
      useMesh
      lineWidth={3}
      gridXValues={5}
      theme={{
        grid: {
          line: {
            stroke: "hsl(0, 0%, 10%)",
            strokeWidth: 1,
          },
        },
      }}
      curve={"monotoneX"}
      colors={{ datum: "color" }}
    />
  );
}

export default Line;
