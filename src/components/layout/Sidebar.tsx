import { Link } from "next-view-transitions";
import { navigation } from "@/lib/navigation";

export function Sidebar() {
  return (
    <aside className="w-64 border-r bg-background ">
      <div className="p-6">
        <h2 className="text-xl font-bold">Polyglot AI</h2>
      </div>

      <nav className="px-3">
        <ul className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.title}>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-muted transition-colors"
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
