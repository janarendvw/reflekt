"use client";
import React from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import Icon from "./ui/icon";
import { ActionPoint } from "@prisma/client";
import { trpc } from "@/app/_trpc/client";

type Props = {
  actionPoint: ActionPoint;
};

function ActionPointCard({ actionPoint }: Props) {
  const mutation = trpc.actionpoint.updateActionPoint.useMutation();

  const markAsResolved = async (id: number) => {
    mutation.mutate({ id, resolved: true });
  };

  return (
    <Card key={actionPoint.id}>
      <CardHeader>
        <div className="flex items-baseline justify-between gap-4">
          <div className="flex flex-col gap-1">
            <CardTitle>{actionPoint.title}</CardTitle>
            <CardDescription>
              {actionPoint.createdAt.toDateString()}
            </CardDescription>
          </div>
          {actionPoint.resolved && (
            <Button disabled size={"sm"} className="flex items-center gap-2">
              <Icon name="check_circle" />
              resolved
            </Button>
          )}
          {!actionPoint.resolved && (
            <Button
              disabled={mutation.isPending}
              onClick={() => markAsResolved(actionPoint.id)}
              className="flex items-center gap-2"
              size={"sm"}
            >
              {mutation.isSuccess ? (
                <>
                  <Icon name="check_circle" />
                  Resolved
                </>
              ) : (
                <>
                  <Icon name="task_alt" />
                  Mark as resolved
                </>
              )}
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="text-sm">{actionPoint.content}</CardContent>
    </Card>
  );
}

export default ActionPointCard;
