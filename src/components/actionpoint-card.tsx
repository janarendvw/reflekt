"use client"
import React from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './ui/card'
import Icon from './ui/icon'
import { ActionPoint } from '@prisma/client'
import { trpc } from '@/app/_trpc/client'

type Props = {
    actionPoint: ActionPoint
}

function ActionPointCard({actionPoint}: Props) {

  const mutation = trpc.actionpoint.updateActionPoint.useMutation()

    const markAsResolved = async (id: number) => {
        mutation.mutate({id, resolved: true})
    }

  return (    <Card
    key={actionPoint.id}
    className={`bg-secondary text-secondary-foreground ${actionPoint.resolved && "opacity-70 hover:opacity-100"}`}
  >
    <CardHeader>
      <div className="flex items-baseline justify-between gap-4">
        <div className="flex flex-col gap-1">
          <CardTitle>{actionPoint.title}</CardTitle>
          <CardDescription>
            {actionPoint.createdAt.toDateString()}
          </CardDescription>
        </div>
        {actionPoint.resolved && (
          <Badge className="flex items-center gap-1 bg-green-400">
            <Icon name="check_circle" />
            resolved
          </Badge>
        )}
      </div>
    </CardHeader>
    <CardContent className="text-sm">
      {actionPoint.content}
    </CardContent>
    {!actionPoint.resolved && (
      <CardFooter>
        <Button onClick={() => markAsResolved(actionPoint.id)} className="gap-2 flex items-center" size={"sm"}><Icon name="task_alt" />Mark as resolved</Button>
      </CardFooter>
    )}
  </Card>
  )
}

export default ActionPointCard