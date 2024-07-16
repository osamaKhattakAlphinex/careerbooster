import React, { ReactNode } from "react";
import { Metadata } from "next";
import ProfileCreationLayer from "@/components/dashboard/ProfileCreationLayer";
interface Props {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "Profile - CareerBooster.ai",
  description:
    "Digital Resume Profile - CareerBooster.ai | Developed by NausalTech",
};

export default async function Profilelayout({ children }: Props) {
  return <ProfileCreationLayer>{children}</ProfileCreationLayer>;
}
