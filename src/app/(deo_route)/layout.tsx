import React, { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect, usePathname } from "next/navigation";
import { AppContextsProvider } from "@/context/AppContext";
import DeoNavbar from "@/components/deo/deoNavbar";

interface Props {
  children: ReactNode;
}

export default async function AdminLayout({ children }: Props) {
  const session = await getServerSession(authOptions);

  const user = session?.user as { role: string } | undefined;
  const isDeo = user?.role === "deo";

  if (!isDeo) redirect("/login");

  return (
    <AppContextsProvider>
      <div className="absolute items-start justify-start w-screen overflow-x-hidden overflow-y-hidden">
        <DeoNavbar />
        <main className="h-screen p-10 overflow-y-scroll bg-gray-100 dark:bg-gray-950">
          {children}
        </main>
      </div>
    </AppContextsProvider>
  );
}
