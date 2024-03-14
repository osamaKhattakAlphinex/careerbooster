import React, { ReactNode } from "react";
import { Metadata } from "next";
interface Props {
  children: ReactNode;
}



export const metadata: Metadata = {
  title: "Resumes - CareerBooster.ai",
  description: "Resumes - CareerBooster.ai | Developed by NausalTech",
};


export default async function Resumelayout({ children }: Props) {
  

  return (
<>{children}</>
  );
}
