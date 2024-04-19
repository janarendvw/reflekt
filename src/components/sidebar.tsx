"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { IconProps } from "@radix-ui/react-icons/dist/types";

type Props = {};

type Link = {
    href: string;
    label: string;
    icon: string
};

const links: Link[] = [
    { href: "/", label: "Home", icon: 'home'},
    { href: "/reflections", label: "Reflections", icon: 'info' },
];
function SideBar({}: Props) {
    const pathname = usePathname();

    return (
        <div className="flex flex-col gap-px p-4">
            {links.map((link) => (
                <Link
                    key={link.href}
                    className={`rounded-lg px-3 py-2 tracking-wide duration-100 flex gap-2 items-center ${
                        pathname === link.href
                            ? "bg-secondary font-bold text-secondary-foreground"
                            : "bg-background text-foreground hover:bg-secondary"
                    }`}
                    href={link.href}
                >
                    {link.label}
                </Link>
            ))}
        </div>
    );
}

export default SideBar;
