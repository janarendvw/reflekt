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
import { prisma } from "@/app/client";

type Props = {};

async function fetchUser() {
  const response = prisma.user.findFirst();
  return response;
}

function Navbar({}: Props) {
  return (
    <>
      <nav className="flex w-full items-center justify-between px-2 py-2">
        <h1 className="ml-2 text-xl font-bold">REFLEKT</h1>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="mr-2 cursor-pointer">
              <AvatarFallback>
                <Suspense fallback={"-"}>
                  {fetchUser().then((data) => (data?.name ? data.name[0] : ""))}
                </Suspense>
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-2 w-56">
            <DropdownMenuLabel className="flex flex-col"><h1>{fetchUser().then((data) => (data?.name ? data.name : ""))}</h1> <h2 className="font-light text-xs text-muted-foreground">{fetchUser().then((data) => (data?.email ? data.email : ""))}</h2></DropdownMenuLabel>
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
