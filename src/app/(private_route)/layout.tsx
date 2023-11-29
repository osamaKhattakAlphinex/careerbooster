import React, { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import ProfileCreationLayer from "@/components/dashboard/ProfileCreationLayer";
import Footer from "@/components/new-dashboard/Layout/Footer";
import Header from "@/components/new-dashboard/Layout/Header";
import SideBar from "@/components/new-dashboard/Layout/SideBar";
import "./dashboard.css";
interface Props {
  children: ReactNode;
}

export default async function Privatelayout({ children }: Props) {
  const session = await getServerSession(authOptions);

  const user = session?.user as { role: string } | undefined;
  const isAdmin = user?.role === "admin";

  if (isAdmin) redirect("/admin");
  if (!session?.user) redirect("/login");

  return (
    <div className="bg-gradient-to-bl from-[#340e53] via-[#000533] to-[#010111]   w-screen h-screen overflow-y-scroll">
      <ProfileCreationLayer>
        <Header />
        <SideBar />
        <div className="pb-12">{children}</div>
        <Footer />
      </ProfileCreationLayer>
    </div>
  );
}
