import Header from "@/components/layout/Header";
import "./globals.css";
import type { Metadata } from "next";

import AuthProvider from "@/components/AuthProvider";
import ReduxProvider from "@/components/ReduxProvider";
import Footer from "@/components/layout/Footer";

import "./plugins.css";
import "./style.css";
import ThemeProvider from "@/components/new-layout/ThemeProvider";
import MainLoaderLayer from "@/components/new-layout/MainLoaderLayer";

export const metadata: Metadata = {
  title: "AI Resume Bot",
  description: "AI Resume Bot | Developed by NausalTech",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ReduxProvider>
          <MainLoaderLayer />
          <Header />
          {children}
          <Footer />
        </ReduxProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
