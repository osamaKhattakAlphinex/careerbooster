import Header from "@/components/public-pages/layout/Header";

import type { Metadata } from "next";

import Footer from "@/components/public-pages/layout/Footer";
import "../plugins.css";
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
      <div className="max-w-full bg-gray-100 dark:bg-gray-950">{children}</div>
      <Footer />
    </>
  );
}
