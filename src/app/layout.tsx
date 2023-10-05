"use client";
import Header from "@/components/layout/Header";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AuthProvider from "@/components/AuthProvider";
import ReduxProvider from "@/components/ReduxProvider";
import Footer from "@/components/layout/Footer";
import Script from "next/script";
import "./plugins.css";
import "./style.css";
import useTheme from "@/lib/useTheme";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "AI Resume Bot",
//   description: "AI Resume Bot | Developed by NausalTech",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme] = useTheme();
  return (
    <html lang="en" data-bs-theme="dark">
      <body className={inter.className}>
        <div className="wrapper d-flex flex-column justify-between ">
          <AuthProvider>
            <ReduxProvider>
              <Header />
              {children}
              <Footer />
            </ReduxProvider>
          </AuthProvider>
        </div>

        <Script src="assets/js/plugins.js" />
        <Script src="assets/js/main.js" />
      </body>
    </html>
  );
}
