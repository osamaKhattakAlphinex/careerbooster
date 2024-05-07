import React, { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect, usePathname } from "next/navigation";
import { AppContextsProvider } from "@/context/AppContext";
import DeoSidebar from "@/components/deo/sidebar/DeoSidebar";

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
      <div className="absolute grid items-start justify-start w-screen grid-cols-12 overflow-x-hidden overflow-y-hidden">
        <DeoSidebar/>
        <main className="h-screen col-span-12 p-10 overflow-y-scroll bg-gray-100 sm:col-span-9 max-w-7xl dark:bg-gray-950">
          {children}
        </main>
      </div>
    </AppContextsProvider>
  );
}
