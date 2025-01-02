import React, { ReactNode } from "react";
import { Metadata } from "next";
interface Props {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "Dashboard - CareerBooster.ai",
  description: "Dashboard - CareerBooster.ai| AI Resume Builder | Developed by NausalTech",
};

export default async function Dashboardlayout({ children }: Props) {
  return <>{children}</>;
}
