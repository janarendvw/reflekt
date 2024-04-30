"use client";
import Link from "next/link";
import React from "react";
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
import { SubmitHandler, useForm } from "react-hook-form";

type Props = {};
type Inputs = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

function SignUpForm({}: Props) {
  const {
    register, handleSubmit, watch, formState: { errors }
  } = useForm<Inputs>();
  const mutation = trpc.auth.registerUser.useMutation();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await mutation.mutateAsync(
      data
    );
  }

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
            <Label htmlFor="login-name">Name</Label>
            <Input
              {...register("name", { required: true })}
              id="login-name"
              placeholder="Enter your name"
            />
          </div>
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
          </div>
          <div>
            <Label htmlFor="login-password-confirmm">Confirm password</Label>
            <Input
              type="password"
              {...register("passwordConfirm", { required: true })}
              id="login-password-confirm"
              placeholder="Confirm your password"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between gap-4">
          <span className="text-xs">
            Already have an account?{" "}
            <Link className="underline" href="/login">
              Log in
            </Link>{" "}
            here.
          </span>
          <Button type="submit">Sign up</Button>
        </CardFooter>
      </form>
    </Card>
  );
}

export default SignUpForm;
