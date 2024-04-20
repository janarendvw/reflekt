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
    <LayoutGroup >
      <Breadcrumb>
        <BreadcrumbList>
          {pathArray.map((path, index) => {
            return (
              <React.Fragment key={index}>
                <BreadcrumbItem>
                  <motion.div
                    initial={{ opacity: 0, x: "-300%" }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, y: "-100%" }}
                  >
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
                  </motion.div>
                </BreadcrumbItem>

                {index !== pathArray.length - 1 && <BreadcrumbSeparator />}
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </LayoutGroup>
  );
}

export default NavbarBreadcrumb;
