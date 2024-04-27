"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { IconProps } from "@radix-ui/react-icons/dist/types";
import Icon from "./ui/icon";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { ResizablePanel } from "./ui/resizable";

type Props = {};

type Link = {
  href: string;
  label: string;
  icon: string;
};

const links: Link[] = [
  { href: "/progress", label: "Progress", icon: "monitoring" },
  { href: "/reflections", label: "Reflections", icon: "cognition" },
  { href: "/action-points", label: "Action Points", icon: "target" },
];
function SideBar({}: Props) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <ResizablePanel
    collapsible
    collapsedSize={4}
    minSize={10}
    maxSize={30}
    defaultSize={15}
    onCollapse={() => setIsCollapsed(true)}
    onExpand={() => setIsCollapsed(false)}
  >
      <div className="flex flex-col items-center gap-px">
        <Link
          href="./reflections/new-reflection"
          className={`flex items-center gap-2 py-4 font-medium tracking-wide bg-orange-500 text-background w-full ${isCollapsed ? 'justify-center text-2xl' : 'justify-between text-sm'}`}
        >
         <span className={`flex gap-4 items-center justify-between mx-auto`}><Icon name="edit" /> {!isCollapsed && 'new reflection'}  </span>
        </Link>
      </div>
      <Separator />

      <div className="flex flex-col gap-1 mt-4">
        {links.map((link) => (
          <Link
            key={link.href}
            className={`relative flex items-center gap-2 px-3 py-2 tracking-wide duration-100 ${isCollapsed ? 'justify-center text-2xl' : 'justify-between text-sm mx-2'} ${
              pathname.startsWith(link.href) && link.href !== "/"
                ? "text-foreground"
                : "text-muted-foreground"
            }`}
            href={link.href}
          >
            <span className="flex items-center gap-2">
              <Icon name={link.icon} />
              {!isCollapsed && link.label}
            </span>
            {pathname.startsWith(link.href) && link.href !== "/" && (
              <motion.div
                transition={{ duration: 0.2 }}
                layoutId="activeLink"
                className="absolute inset-0 -z-10 bg-secondary rounded"
              ></motion.div>
            )}
            {pathname.startsWith(link.href) && link.href !== "/" && (
              <motion.span
                transition={{ duration: 0.2 }}
                layoutId="activeLinkArrow"
                className="float-right"
              >
                <Icon name="chevron_right" />
              </motion.span>
            )}
          </Link>
        ))}
      </div>
    </ResizablePanel>
  );
}

export default SideBar;
