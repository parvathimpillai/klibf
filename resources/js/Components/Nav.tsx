import { Package2 } from "lucide-react";
import React from "react";
import { Link } from "@inertiajs/react";

export function Nav() {
  return (
    <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
      <Link
        href="#"
        className="flex gap-2 items-center text-lg font-semibold md:text-base"
      >
        <Package2 className="w-6 h-6" />
      </Link>
      <Link
        href={route("dashboard")}
        className="transition-colors text-foreground hover:text-foreground"
      >
        Dashboard
      </Link>
      <Link
        href={route("users.index")}
        className="transition-colors text-muted-foreground hover:text-foreground"
      >
        Users
      </Link>
    </nav>
  );
}
