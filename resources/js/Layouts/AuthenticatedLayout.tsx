import { PropsWithChildren, ReactNode } from "react";
import { Head } from "@inertiajs/react";

import { User } from "@/types";
import { Header } from "@/Components/Header";
import { Toaster } from "@/Components/ui/sonner";

import { Sidebar } from "@/Components/Sidebar";
export default function Authenticated({
  user,
  header,
  children,
}: PropsWithChildren<{ user: User; header?: string }>) {
  return (
    <div className="grid min-h-screen w-full  md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Head title={header} />
      <Sidebar />
      <div className="flex flex-col">
        <Header user={user} />
        <main className="flex flex-col flex-1 gap-4 p-4 mx-auto w-full max-w-[1440px] lg:gap-6 lg:p-6">
          {header && (
            <div className="flex items-center">
              <h1 className="text-lg font-semibold md:text-2xl">{header}</h1>
            </div>
          )}
          <div className="rounded-lg">{children}</div>
        </main>
        <Toaster />
      </div>
    </div>
  );
}
