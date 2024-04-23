import React, { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/sidebar/adminSidebar";

interface Props {
  children: ReactNode;
}

export default async function AdminLayout({ children }: Props) {
  const session = await getServerSession(authOptions);

  const user = session?.user as { role: string } | undefined;
  const isAdmin = user?.role === "admin";

  if (!isAdmin) redirect("/login");

  return (
    <div className="grid items-start justify-start w-screen grid-cols-12 overflow-x-hidden overflow-y-hidden">
      <div className="max-h-screen col-span-3">
        <div className="h-screen p-3 overflow-y-auto bg-gray-800 no-scrollbar">
          <AdminSidebar />
        </div>
      </div>
      <main className="h-screen col-span-9 p-10 overflow-y-scroll bg-gray-100 max-w-7xl dark:bg-gray-950">
        {children}
      </main>
    </div>
  );
}
