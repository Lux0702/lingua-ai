"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { PageContainer } from "./PageContainer";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const pathname = usePathname();

  if (pathname === "/login" || pathname === "/register") {
    return <main className="min-h-screen">{children}</main>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="flex flex-1 ">
        <Sidebar />

        <main className="flex-1 overflow-hidden p-6 ">
          <PageContainer>{children}</PageContainer>
        </main>
      </div>
    </div>
  );
}
