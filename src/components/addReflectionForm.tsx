"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { trpc } from "@/app/_trpc/client";
import { Skills } from "@prisma/client";
import { useRouter } from "next/navigation";
import Icon from "./ui/icon";
import { Separator } from "./ui/separator";
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

  const injectReflectionModel = (type: string) => {
    switch (type) {
      case "STARR":
        setContent(
          `Situation:

Task:

Action:

Result:

Reflection:`,
        );
        break;

      case "Korthagen":
        setContent(
          `Experience:

Observation:

Theory:

Action:

Result:

Reflection:`,
        );
        break;
      default:
        break;
    }
  };

  return (
    <>
      {mutation.isSuccess ? (
        "succes!"
      ) : (
        <>
          <h3 className="mt-12 text-lg font-semibold">New Reflection</h3>
          <div className="flex flex-col gap-8">
            <div className="flex h-full flex-1 flex-col gap-4">
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
              />
              <div className="relative">
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="h-96"
                  placeholder="Description"
                />
                <div className="absolute bottom-0 flex w-2/3 items-center gap-1 rounded p-2">
                  <Button
                    onClick={() => injectReflectionModel("STARR")}
                    size={"sm"}
                    variant={"secondary"}
                  >
                    STARR
                  </Button>
                  <Button
                    onClick={() => injectReflectionModel("Korthagen")}
                    size={"sm"}
                    variant={"secondary"}
                  >
                    Korthagen
                  </Button>
                </div>
              </div>
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
      )}
    </>
  );
}

export default AddReflectionForm;
