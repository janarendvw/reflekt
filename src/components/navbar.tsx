"use client"
import React, { Suspense } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import NavbarBreadcrumb from "./ui/navbar-breadcrumb";
import { trpc } from "@/app/_trpc/client";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

type Props = {};

 function Navbar({}: Props) {
  const router = useRouter();
  const user = trpc.getMe.useQuery().data?.data.user
  const mutation = trpc.auth.logoutUser.useMutation();

  const handleLogout = async () => {
    mutation.mutateAsync().then(() => {
      router.push("/login");
    });
  };

  return (
    <>
      <nav className="flex w-full items-center justify-between py-4 px-6 relative">
        <div className="flex items-center gap-1">
          <h1 className="text-xl font-bold">REFLEKT</h1>
        </div>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <NavbarBreadcrumb />
        </div>

        <div className="flex gap-12 items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  <Suspense fallback={"-"}>
                    {user?.email ? user.email[0] : ""}
                  </Suspense>
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-2 w-56">
              <DropdownMenuLabel className="flex flex-col">
                <h1>{user?.name ? user.name : ""}</h1>{" "}
                <h2 className="text-xs font-light text-muted-foreground">
                  {user?.email ? user.email : ""}
                </h2>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  Profile
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem className="text-destructive">
                <Button variant={"link"} onClick={() => handleLogout()}>Logout</Button>
                  <DropdownMenuShortcut>⇧⌘L</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

        </div>
      </nav>
      <Separator />
    </>
  );
}

export default Navbar;
