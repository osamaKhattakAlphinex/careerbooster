import Header from "@/components/layout/Header";

import type { Metadata } from "next";

import Footer from "@/components/layout/Footer";
import "../plugins.css";
import "../style.css";
export const metadata: Metadata = {
  title: "AI Resume Bot",
  description: "AI Resume Bot | Developed by NausalTech",
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
