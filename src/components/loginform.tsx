"use client";
import React, { useEffect } from "react";
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
import { Label } from "./ui/label";
import { trpc } from "@/app/_trpc/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";


type Inputs = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const {
    register, handleSubmit, watch, formState: { errors }

  } = useForm<Inputs>();
  const router = useRouter();
  const mutation = trpc.auth.loginUser.useMutation();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    mutation.mutateAsync(data).then(() => {
      router.push("/reflections");
    });
  };

  return (
    <Card className="max-w-xs">
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Enter your credentials to login, or click sign up to create a new
            account.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <div>
            <Label htmlFor="login-email">Email</Label>
            <Input
              type="email"
              {...register("email", { required: true })}
              id="login-email"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <Label htmlFor="login-password">Password</Label>
            <Input
              type="password"
              {...register("password", { required: true })}
              id="login-password"
              placeholder="Enter your password"
            />
            {errors.password && <span className="text-xs text-destructive">This field is required</span>}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <span className="text-xs">
            No account?{" "}
            <Link className="underline" href="/signup">
              Sign up
            </Link>{" "}
            here.
          </span>
          <Button type="submit" disabled={mutation.isPending} >
            Log in
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default LoginForm;
