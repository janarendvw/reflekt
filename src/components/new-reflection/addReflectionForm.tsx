"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { trpc } from "@/app/_trpc/client";
import { ReflectionModelType, Skills } from "@prisma/client";
import { useRouter } from "next/navigation";
import { resolveSkillEnum } from "@/lib/helpers";
import PresetModel from "./preset-model";
import { Label } from "../ui/label";
import { router } from "@/server/trpc";

type Props = {
  selectedType: ReflectionModelType;
};

function AddReflectionForm({ selectedType }: Props) {
  const [content, setContent] = useState<string[]>([]);
  const [title, setTitle] = useState<string>("");
  const [selectedSkills, setSelectedSkills] = useState<Skills[]>([]);
  const router = useRouter();

  const skills = Object.values(Skills);

  const mutation = trpc.reflection.create.useMutation();

  const handleSubmit = async () => {
    await mutation.mutateAsync({
      title,
      content: content,
      skills: selectedSkills,
      reflectionType: selectedType,
    }).then(() => {
      router.push("/reflections");
    })
  };

  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="flex h-full gap-8">
          <div className="flex w-2/3 flex-col gap-4">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="mb-8"
            />
            <PresetModel
              content={content}
              setContent={setContent}
              type={selectedType}
            />
          </div>
          <div className="flex max-w-md flex-col gap-4">
            <h3 className="mt-8 font-semibold">Select relevant skills</h3>
            <div className="flex flex-wrap gap-1">
              {skills.map((skill) => (
                <Button
                  size={"sm"}
                  onClick={() => {
                    selectedSkills.includes(skill)
                      ? setSelectedSkills(
                          selectedSkills.filter((s) => s !== skill),
                        )
                      : setSelectedSkills([...selectedSkills, skill]);
                  }}
                  className="cursor-pointer"
                  variant={
                    selectedSkills.includes(skill) ? "default" : "secondary"
                  }
                  key={skill}
                >
                  {resolveSkillEnum(skill)}
                </Button>
              ))}
            </div>
          </div>
        </div>
        <Button
          className="w-fit"
          onClick={handleSubmit}
          disabled={mutation.isPending}
        >
          Add Reflection
        </Button>
      </div>
    </>
  );
}

export default AddReflectionForm;
