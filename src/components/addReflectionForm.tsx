"use client"
import React, { useState } from 'react'
import { Button } from './ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './ui/card'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { trpc } from '@/app/_trpc/client'

type Props = {}

function AddReflectionForm({}: Props) {

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

   const mutation = trpc.reflection.createReflection.useMutation()

   const handleSubmit = () => {
         mutation.mutate({ title, content })
   }

  return (
    <Card>
    <CardHeader>
      <CardTitle>Add new reflection</CardTitle>
      <CardDescription>
        Click the button below to add a new reflection
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="flex flex-col gap-4 h-full">
        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
        <Textarea value={content} onChange={(e) => setContent(e.target.value)} className="h-full min-h-full" placeholder="Description" />
      </div>
    </CardContent>
    <CardFooter>
      <Button onClick={() => handleSubmit()}>Add Reflection</Button>
    </CardFooter>
  </Card>
  )
}

export default AddReflectionForm