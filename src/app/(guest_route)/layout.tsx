import React, { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import "@/app/plugins.css";

import Header from "@/components/public-pages/layout/Header";
import Footer from "@/components/public-pages/layout/Footer";
interface Props {
  children: ReactNode;
}

export default async function GuestLayout({ children }: Props) {
  const session = await getServerSession(authOptions);

  if (session) redirect("/dashboard");

  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto">{children}</div>
      <Footer />
    </>
  );
}
