import React, { ReactNode } from "react";
import { Metadata } from "next";
interface Props {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "Dashboard - CareerBooster.AI",
  description: "Dashboard - CareerBooster.ai | Developed by NausalTech",
};

export default async function Dashboardlayout({ children }: Props) {
  return <>{children}</>;
}
