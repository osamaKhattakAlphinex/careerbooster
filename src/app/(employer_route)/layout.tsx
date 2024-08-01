import React, { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import EmployerSidebar from "@/components/employer/Sidebar";
import { Metadata } from "next";

interface Props {
  children: ReactNode;
}
export const metadata: Metadata = {
  title: "Employer Portal - CareerBooster.ai",
  description: "Employer Portal",
  keywords: [
    "AI Job Finder",
    "Employer Portal",
    "Career Booster",
    "Job Search",
    "AI Resume Builder",
    "Finding Jobs",
    "Find Candidates",
  ],
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

export default async function EmployerLayout({ children }: Props) {
  const session = await getServerSession(authOptions);

  const user = session?.user as { role: string } | undefined;
  const iEmployer = user?.role === "employer";

  if (!iEmployer) redirect("/login");

  return (
    <div className="absolute grid items-start justify-start w-screen grid-cols-12 overflow-x-hidden overflow-y-hidden">
      <EmployerSidebar />

      <main className="h-screen col-span-12 p-10 overflow-y-scroll bg-gray-200 sm:col-span-10 max-w-7xl dark:bg-gray-950">
        {children}
      </main>
    </div>
  );
}
