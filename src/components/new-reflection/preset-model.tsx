"use client";
import React from "react";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { ReflectionModelType } from "@prisma/client";
import { el } from "@faker-js/faker";
import { motion } from "framer-motion";

type Props = {
  content: string[];
  setContent: (content: string[]) => void;
  type: ReflectionModelType
};

type ReflectionModel = {
  phase: string;
  description: string;
};

const starrModel = [
  { phase: "Situation",
    description: "Describe the situation you were in or the task you needed to accomplish. You must describe a specific event or situation, not a generalized description of what you have done in the past. Be sure to give enough detail for someone else to understand." },
  { phase: "Task",
    description: "Describe the task you were asked to do. If there was a particular problem you needed to solve, be sure to describe that task. Be sure to include enough detail for someone else to understand." },
  { phase: "Action",
    description: "Describe the action you took and be sure to keep the focus on you. Even if you are discussing a group project or effort, describe what you did – not the efforts of the team. Don’t tell what you might do, tell what you did." },
  { phase: "Result",
    description: "What happened? How did the event end? What did you accomplish? What did you learn?" },
  { phase: "Reflection",
    description: "What did you learn from this experience? What would you do differently next time? What would you do the same? What did you learn about yourself?" }
];

const korthagenModel = [
  { phase: "Experience",
    description: "Describe the experience you had." },
  { phase: "Reflection",
    description: "What did you think and feel?" },
  { phase: "Theoretical Concept",
    description: "What concepts or theories can help you understand this experience?" },
  { phase: "Action",
    description: "What will you do differently next time?" },
  { phase: "Evaluation",
    description: "How did it go?" }
];

const defaultModel = [
  {
    phase: "Reflection",
    description: ""
  }
]

function PresetModel({content, setContent, type}: Props) {

  const [reflectionModel, setReflectionModel] = React.useState<ReflectionModel[]>([]);

  React.useEffect(() => {
    if (type === ReflectionModelType.STARR) {
      setReflectionModel(starrModel);
    } else if (type === ReflectionModelType.KORTHAGEN) {
      setReflectionModel(korthagenModel);
    }
    else{
      setReflectionModel(defaultModel);
    }
  }, [type]);
  const handleContentChange = (index: number, value: string) => {
    const newContent = [...content];
    newContent[index] = value;
    setContent(newContent);
  };




  return (
    <>
      {reflectionModel.map((item, index) => (
        <motion.div initial={{opacity:0, x: -30}} animate={{opacity: 1, x: 0}} transition={{delay: 0.01*index}} key={index} className="flex flex-col gap-2">
         <Label htmlFor={`textarea-${index}`}>{item.phase}</Label>
         <Textarea
            id={`textarea-${index}`}
            value={content[index]}
            onChange={(e) => handleContentChange(index, e.target.value)}
            className="h-32"
            placeholder={item.description}
          />
        </motion.div>
      ))}
    </>
  );
}

export default PresetModel;
