import Header from "@/components/layout/Header";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AuthProvider from "@/components/AuthProvider";
import ReduxProvider from "@/components/ReduxProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Resume Bot",
  description: "Developed by NausalTech",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ReduxProvider>
            <main className="bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100 min-h-[100vh] h-[100%]  ">
              <Header />
              {children}
            </main>
          </ReduxProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
