import React, { ReactNode } from "react";
import { Metadata } from "next";
interface Props {
  children: ReactNode;
}



export const metadata: Metadata = {
  title: "Change Password - CareerBooster.AI",
  description: "Change Password - CareerBooster.ai | Developed by NausalTech",
};


export default async function Coverletterlayout({ children }: Props) {
  

  return (
<>{children}</>
  );
}