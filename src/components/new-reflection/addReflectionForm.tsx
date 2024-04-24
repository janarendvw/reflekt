"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { trpc } from "@/app/_trpc/client";
import { Skills } from "@prisma/client";
import { useRouter } from "next/navigation";
import { resolveSkillEnum } from "@/lib/helpers";

type Props = {};

function AddReflectionForm({}: Props) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<Skills[]>([]);
  const [actionPoints, setActionPoints] = useState([] as any[]);

  const skills = Object.values(Skills);

  const mutation = trpc.reflection.createReflection.useMutation();

  const handleSubmit = () => {
    mutation.mutate({ title, content, skills: selectedSkills });
  };

  useEffect(() => {
    if (mutation.isSuccess) {
      setTitle("");
      setContent("");
      setSelectedSkills([]);
      router.push("/reflections");
    }
  }, [mutation.isSuccess, router]);

  return (
    <>
      <h3 className="text-lg font-semibold">New STARR Reflection</h3>
      <div className="flex flex-col gap-8">
        <div className="flex h-full flex-1 flex-col gap-4">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
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
