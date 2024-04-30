"use client";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./breadcrumb";
import { usePathname } from "next/navigation";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";

type Props = {};

function NavbarBreadcrumb({}: Props) {
  const pathArray = usePathname()
    .split("/")
    .filter((path) => path !== "");
  return (
      <Breadcrumb>
        <BreadcrumbList>
          {pathArray.map((path, index) => {
            return (
              <React.Fragment key={index}>
                 <motion.div
                  layoutId={path}
                  transition={{duration: 0.1}}
                    initial={{ opacity: 0, x: "-100%" }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, y: "-100%" }}
                  >
                <BreadcrumbItem>
                 
                    {index !== pathArray.length - 1 ? (
                      <BreadcrumbLink
                        href={`/${path}`}
                        className="hover:underline"
                      >
                        {path}
                      </BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage className="font-semibold">
                        {path}
                      </BreadcrumbPage>
                    )}
       
                </BreadcrumbItem>
                </motion.div>
                {index !== pathArray.length - 1 && <BreadcrumbSeparator />}
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
  );
}

export default NavbarBreadcrumb;
