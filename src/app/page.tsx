import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <nav className="flex w-full items-baseline justify-between px-2 py-2">
        <h1 className="ml-2 text-xl font-bold">REFLEKT</h1>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem></NavigationMenuItem>{" "}
          </NavigationMenuList>
        </NavigationMenu>
        <Avatar>
          <AvatarFallback>T</AvatarFallback>
        </Avatar>
      </nav>
      <Separator />
      <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
    </>
  );
}
