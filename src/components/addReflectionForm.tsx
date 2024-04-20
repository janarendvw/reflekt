"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { trpc } from "@/app/_trpc/client";
import { Skills } from "@prisma/client";

type Props = {};

function AddReflectionForm({}: Props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const skills = Object.values(Skills);

  const mutation = trpc.reflection.createReflection.useMutation();

  const handleSubmit = () => {
    mutation.mutate({ title, content });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add new reflection</CardTitle>
        <CardDescription>
          Click the button below to add a new reflection
        </CardDescription>
      </CardHeader>
      <CardContent className="flex w-full gap-8">
        <div className="flex h-full flex-1 flex-col gap-4">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="h-40"
            placeholder="Description"
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={() => handleSubmit()}>Add Reflection</Button>
      </CardFooter>
    </Card>
  ); 
}

export default AddReflectionForm;
