"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { IconProps } from "@radix-ui/react-icons/dist/types";
import Icon from "./ui/icon";

type Props = {};

type Link = {
    href: string;
    label: string;
    icon: string
};

const links: Link[] = [
    { href: "/", label: "Home", icon: 'home'},
    { href: "/progress", label: "Progress", icon: 'monitoring' },
    { href: "/reflections", label: "Reflections", icon: 'cognition' },
    { href: "/action-points", label: "Action Points", icon: 'target' },
];
function SideBar({}: Props) {
    const pathname = usePathname();

    return (
        <div className="flex flex-col gap-px p-4">
            {links.map((link) => (
                <Link
                    key={link.href}
                    className={`rounded-lg px-3 py-2 text tracking-wide duration-100 flex gap-2 items-center justify-between ${
                        pathname.startsWith(link.href) && link.href !== "/"
                            ? "bg-secondary font-bold text-secondary-foreground"
                            : "bg-background text-foreground hover:bg-secondary"
                    }`}
                    href={link.href}
                >
                    <span className="flex items-center gap-2">
                        <Icon name={link.icon} />
                        {link.label}
                    </span>
                   {pathname.startsWith(link.href) && link.href !== "/" && <Icon name="chevron_right" />}
                </Link>
            ))}
        </div>
    );
}

export default SideBar;
