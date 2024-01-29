import Header from "@/components/public-pages/layout/Header";

import type { Metadata } from "next";

import Footer from "@/components/public-pages/layout/Footer";
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
      <div className="max-w-7xl mx-auto">{children}</div>
      <Footer />
    </>
  );
}
