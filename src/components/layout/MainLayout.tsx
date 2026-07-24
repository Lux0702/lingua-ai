"use client";

import { useEffect, useSyncExternalStore, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getStoredAuthSession, subscribeToAuthSession } from "@/features/auth/services/auth.api";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { PageContainer } from "./PageContainer";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const session = useSyncExternalStore(subscribeToAuthSession, getStoredAuthSession, () => null);
  const isPublicRoute = pathname === "/login" || pathname === "/register";

  useEffect(() => {
    if (!session && !isPublicRoute) router.replace("/login");
  }, [isPublicRoute, router, session]);

  if (isPublicRoute) {
    return <main className="min-h-screen">{children}</main>;
  }

  if (!session) return null;

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
