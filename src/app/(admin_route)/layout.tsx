import React, { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { ThemeProvider } from "next-themes";
import "@/app/plugins.css";
import "@/app/style.css";
import AdminSidebar from "@/components/admin/sidebar/adminSidebar";
import ThemeToggler from "@/components/Themetoggler";
import NextThemeProvider from "@/components/data-providers/NextThemeProvider";
interface Props {
  children: ReactNode;
}

export default async function AdminLayout({ children }: Props) {
  const session = await getServerSession(authOptions);

  const user = session?.user as { role: string } | undefined;
  const isAdmin = user?.role === "admin";

  if (!isAdmin) redirect("/login");

  return (
    <div className="grid grid-cols-12 justify-start items-start w-screen overflow-y-hidden overflow-x-hidden">
      <div className="col-span-3  max-h-screen">
        <div className=" bg-gray-800 p-3 overflow-y-auto h-screen no-scrollbar">
          <AdminSidebar />
        </div>
      </div>
      <main className="col-span-9 p-10 overflow-y-scroll h-screen dark:bg-[#000000] bg-[#ffffff]">
        {children}
      </main>
    </div>
  );
}
