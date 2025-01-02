import Header from "@/components/public-pages/layout/Header";

import type { Metadata } from "next";

import Footer from "@/components/public-pages/layout/Footer";
import "@/app/(private_route)/plugins.css";
import "@/styles/singleJobStyles.css";

export const metadata: Metadata = {
  title: "CareerBooster.Ai",
  description: "AI Resume Builder | Developed by NausalTech",
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
