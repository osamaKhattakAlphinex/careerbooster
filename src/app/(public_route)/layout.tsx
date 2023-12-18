import Header from "@/components/layout/Header";
// import "./globals.css";
import type { Metadata } from "next";
// import AuthProvider from "@/components/AuthProvider";
// import ReduxProvider from "@/components/ReduxProvider";
import Footer from "@/components/layout/Footer";

// import ThemeProvider from "@/components/new-layout/ThemeProvider";

import Head from "next/head";

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
