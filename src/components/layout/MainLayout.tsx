"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";

import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { PageContainer } from "./PageContainer";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const pathname = usePathname();

  return (
    <>
      <Header />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 overflow-hidden p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{
                opacity: 0,
                y: 12,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -12,
              }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 24,
              }}
            >
              <PageContainer>{children}</PageContainer>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </>
  );
}
