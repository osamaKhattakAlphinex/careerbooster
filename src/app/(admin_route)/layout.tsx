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
    <div className="flex w-screen  overflow-x-hidden overflow-y-hidden">
      <AdminSidebar />

      <main className="p-10 overflow-y-scroll bg-gray-100  dark:bg-gray-950">
        {children}
      </main>
    </div>
  );
}
