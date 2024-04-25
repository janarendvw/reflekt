"use client"
import AddReflectionForm from "@/components/new-reflection/addReflectionForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReflectionModelType } from "@prisma/client";
import React from "react";

type Props = {};

function Page({}: Props) {
  const reflectionModelType = Object.values(ReflectionModelType);
  const [selectedType, setSelectedType] = React.useState<ReflectionModelType>(reflectionModelType[2]);
  return (
    <>
      <div className="flex flex-col gap-16">
          <Tabs onValueChange={(value) => setSelectedType(value as ReflectionModelType)} defaultValue={reflectionModelType[2]}>
            <TabsList>
              {reflectionModelType.map((type) => (
                <TabsTrigger key={type} value={type}>
                  {type}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        <AddReflectionForm selectedType={selectedType} />
      </div>
    </>
  );
}

export default Page;
