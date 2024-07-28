import { PropsWithChildren, ReactNode } from "react";

import { User } from "@/types";
import { Header } from "@/Components/Header";
import { Toaster } from "@/Components/ui/sonner";

export default function Authenticated({
  user,
  header,
  children,
}: PropsWithChildren<{ user: User; header?: ReactNode }>) {
  return (
    <div className="min-h-screen">
      <Header user={user} />
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        {children}
      </main>
      <Toaster />
    </div>
  );
}
