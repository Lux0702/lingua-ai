"use client";

import { useSyncExternalStore } from "react";
import { Bell, Moon } from "lucide-react";
import { Link } from "next-view-transitions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getStoredAuthSession, subscribeToAuthSession } from "@/features/auth/services/auth.api";

export function Header() {
  const session = useSyncExternalStore(subscribeToAuthSession, getStoredAuthSession, () => null);

  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-6">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold">Lingua AI</h1>
      </div>

      <div className="w-full max-w-md">
        <Input placeholder="Search lessons, vocabulary..." />
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" aria-label="Notifications">
          <Bell className="h-5 w-5" />
        </Button>

        <Button variant="ghost" size="icon" aria-label="Toggle theme">
          <Moon className="h-5 w-5" />
        </Button>

        <Button variant="outline" asChild>
          <Link href="/login">{session?.user.displayName ?? "Đăng nhập"}</Link>
        </Button>
      </div>
    </header>
  );
}
