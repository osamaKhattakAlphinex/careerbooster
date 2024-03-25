import "./globals.css";
import type { Metadata } from "next";
import AuthProvider from "@/components/data-providers/AuthProvider";
import ReduxProvider from "@/components/data-providers/ReduxProvider";
import Head from "next/head";
import NextThemeProvider from "@/components/data-providers/NextThemeProvider";
import UserDataProvider from "@/components/data-providers/UserDataProvider";
import MainLoaderLayer from "@/components/MainLoaderLayer";
import CreditLimitsProvider from "@/components/data-providers/CreditLimitsProvider";
import "./index.css";
import { ToastContainer } from "react-toastify";
export const metadata: Metadata = {
  title: "Dashboard - CareerBooster.ai",
  description: "Dashboard - CareerBooster.ai | Developed by NausalTech",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextThemeProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <AuthProvider>
        <ReduxProvider>
          <UserDataProvider />
          <MainLoaderLayer />
          <CreditLimitsProvider />
          {children}
          <ToastContainer />
        </ReduxProvider>
      </AuthProvider>
    </NextThemeProvider>
  );
}
