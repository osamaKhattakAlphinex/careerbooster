import React, { ReactNode } from "react";
import { Metadata } from "next";
interface Props {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "Cover Letters - CareerBooster.ai",
  description: "Cover Letters - CareerBooster.ai| AI Resume Builder | Developed by NausalTech",
};

export default async function Coverletterlayout({ children }: Props) {
  return <>{children}</>;
}
