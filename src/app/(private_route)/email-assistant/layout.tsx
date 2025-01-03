import React, { ReactNode } from "react";
import { Metadata } from "next";
interface Props {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "Email Assistant - CareerBooster.ai",
  description: "Email Assistant - CareerBooster.ai| AI Resume Builder | Developed by NausalTech",
};

export default async function Coverletterlayout({ children }: Props) {
  return <>{children}</>;
}
