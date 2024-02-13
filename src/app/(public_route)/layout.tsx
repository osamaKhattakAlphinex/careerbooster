import Header from "@/components/public-pages/layout/Header";

import type { Metadata } from "next";

import Footer from "@/components/public-pages/layout/Footer";
import "@/app/(private_route)/plugins.css"
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
      <div>{children}</div>
      <Footer />
    </>
  );
}
