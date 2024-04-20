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
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { serverClient } from "@/app/_trpc/serverClient";
import NavbarBreadcrumb from "./ui/navbar-breadcrumb";

type Props = {};

async function Navbar({}: Props) {
  const user = await serverClient.getFirstUser().then((res) => res);

  return (
    <>
      <nav className="flex w-full items-center justify-between px-4 py-3">
        <div className="flex items-center gap-1">
          <Image src="/Reflekt.svg" alt="Reflekt Logo" width={24} height={24} />
          <h1 className="text-xl font-bold">REFLEKT</h1>
        </div>

        <NavbarBreadcrumb />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="mr-2 cursor-pointer">
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
            <Separator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                Profile
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
      <Separator />
    </>
  );
}

export default Navbar;
