import React, { ReactNode } from "react";
import { Metadata } from "next";
interface Props {
  children: ReactNode;
}



export const metadata: Metadata = {
  title: "Profile Review - CareerBooster.AI",
  description: "Profile Review - CareerBooster.ai | Developed by NausalTech",
};


export default async function Coverletterlayout({ children }: Props) {
  

  return (
<>{children}</>
  );
}
