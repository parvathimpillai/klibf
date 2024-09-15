import { Link } from "@inertiajs/react";
import { cn } from "@/lib/utils";
import { Home, Settings, Package, Users } from "lucide-react";

export function Sidebar() {
  return (
    <div className="hidden sticky top-0 z-50 h-screen border-r bg-muted/40 md:block">
      <div className="flex flex-col gap-2 h-full max-h-screen">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex gap-2 items-center font-semibold">
            <Package className="w-6 h-6" />
            <span className="">Laravel Shadcn</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid gap-2 items-start px-2 text-sm font-medium lg:px-4">
            <Link
              href={route("dashboard")}
              className={cn(
                "flex gap-3 items-center px-3 py-2 rounded-lg transition-all hover:bg-muted", // Added hover effect
                { active: route().current("dashboard") }
              )}
            >
              <Home className="w-4 h-4" />
              Dashboard
            </Link>

            <Link
              href={route("users.index")}
              className={cn(
                "flex gap-3 items-center px-3 py-2 rounded-lg transition-all hover:bg-muted", // Added hover effect
                { active: route().current("users.index") }
              )}
            >
              <Users className="w-4 h-4" />
              Users
            </Link>
            <Link
              href={route("profile.edit")}
              className={cn(
                "flex gap-3 items-center px-3 py-2 rounded-lg transition-all hover:bg-muted", // Added hover effect
                { active: route().current("profile.edit") }
              )}
            >
              <Settings className="w-4 h-4" />
              Profile
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
