import { Bell, Moon, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-6">
      {/* Left */}
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold">Polyglot AI</h1>
      </div>

      {/* Center */}
      <div className="w-full max-w-md">
        <Input placeholder="Search lessons, vocabulary..." />
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>

        <Button variant="ghost" size="icon">
          <Moon className="h-5 w-5" />
        </Button>

        <Button variant="outline">User</Button>
      </div>
    </header>
  );
}
