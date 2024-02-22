import React, { Suspense } from "react";
import { prisma } from "../client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {};

async function fetchUser() {
  const response = prisma.user.findFirst();
  return response;
}

function page({}: Props) {
  return (
    <main className="flex min-h-[calc(100vh-60px)] w-full items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle><Suspense>{fetchUser().then((data) => (data?.name ? data.name : ""))}</Suspense></CardTitle>
          <CardDescription>
          <Suspense>{fetchUser().then((data) => (data?.email ? data.email : ""))}</Suspense>
            </CardDescription>
        </CardHeader>
        <CardContent>
            <Suspense>
                <div>ID: {fetchUser().then((data) => (data?.id ? data.id : ""))}</div>
                <div>Password: {fetchUser().then((data) => (data?.password ? data.password : ""))}</div>
            </Suspense>
        </CardContent>
      </Card>
    </main>
  );
}

export default page;
