import { serverClient } from '@/app/_trpc/serverClient'
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import Link from 'next/link';
import React from 'react'

type Props = {}

export default async function Page({ params }: { params: { reflection: number } }) {
    const reflection = await serverClient.reflection.getReflectionById({ id: Number(params.reflection) }).then((res) => res);
    return (
        <>
        <Link href={'/reflections'} className='absolute left-8 top-8 text-muted-foreground flex gap-1 items-center'><Icon name="arrow_back" />Terug</Link>
        <Card className=''>
            <CardHeader className='flex justify-between'>
                <div className='flex flex-col gap-1'>
                    <CardTitle>
                        {reflection?.title}
                    </CardTitle>
                    <CardDescription>
                        {reflection?.createdAt.toDateString()}
                    </CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                {reflection?.content}
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>
                    Action Points
                </CardTitle>
            </CardHeader>
            <CardContent className='grid grid-cols-3 gap-8'>
                {
                    //sort reflections by resolved
                    reflection?.actionPoints.sort((a, b) => a.resolved ? 1 : -1).map(actionPoint => (
                <Card key={actionPoint.id} className={`bg-secondary text-secondary-foreground ${actionPoint.resolved && 'opacity-50 hover:opacity-100'}`}>
                            <CardHeader>
                                <div className="flex gap-4 justify-between items-baseline">
                                    <div className='flex flex-col gap-1'>
                                        <CardTitle>
                                            {actionPoint.title}
                                        </CardTitle>
                                        <CardDescription>
                                            {actionPoint.createdAt.toDateString()}
                                        </CardDescription>
                                    </div>
                                    {actionPoint.resolved && <Badge className='flex items-center gap-1'><Icon name='check_circle'/>resolved</Badge>}
                                </div>
                            </CardHeader>
                            <CardContent className='text-sm'>
                                {actionPoint.content}
                            </CardContent>
                        </Card>
                    ))
                }
            </CardContent>
        </Card>
        </>
    )
    }