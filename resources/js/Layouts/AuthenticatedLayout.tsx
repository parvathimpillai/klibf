import { useState, PropsWithChildren, ReactNode } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/Components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { CircleUser, Menu, Package2, Search } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Link } from "@inertiajs/react";
import { User } from "@/types";
import { ModeToggle } from "@/Components/ThemeToggle";

export default function Authenticated({
  user,
  header,
  children,
}: PropsWithChildren<{ user: User; header?: ReactNode }>) {
  const [showingNavigationDropdown, setShowingNavigationDropdown] =
    useState(false);

  return (
    <div className="min-h-screen">
      <div className="border-b">
        <header className="container flex sticky top-0 gap-4 items-center px-4 h-16 sm:px-6 lg:px-8 bg-background md:px-6">
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
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="w-5 h-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="#"
                  className="flex gap-2 items-center text-lg font-semibold"
                >
                  <Package2 className="w-6 h-6" />
                  <span className="sr-only">Acme Inc</span>
                </Link>
                <Link href="#" className="hover:text-foreground">
                  Dashboard
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Users
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="flex gap-4 items-center w-full md:ml-auto md:gap-2 lg:gap-4">
            <form className="flex-1 ml-auto sm:flex-initial">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                />
              </div>
            </form>
            <ModeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                >
                  <CircleUser className="w-5 h-5" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href={route("profile.edit")}>Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href={route("logout")} method="post">
                    Log Out
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
      </div>

      <main className="flex min-h-[calc(100vh_-_theme(spacing.20))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        {children}
      </main>
    </div>
  );
}
