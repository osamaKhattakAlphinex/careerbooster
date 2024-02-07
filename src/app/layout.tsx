import "./globals.css";
import type { Metadata } from "next";
import AuthProvider from "@/components/data-providers/AuthProvider";
import ReduxProvider from "@/components/data-providers/ReduxProvider";
import Head from "next/head";
import Script from "next/script";
import NextThemeProvider from "@/components/data-providers/NextThemeProvider";
import UserDataProvider from "@/components/data-providers/UserDataProvider";
import MainLoaderLayer from "@/components/MainLoaderLayer";
import CreditLimitsProvider from "@/components/data-providers/CreditLimitsProvider";
import "./index.css";
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
    <NextThemeProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <AuthProvider>
        <ReduxProvider>
          <MainLoaderLayer />
          <UserDataProvider />
          <CreditLimitsProvider />
          {children}
        </ReduxProvider>
      </AuthProvider>
    </NextThemeProvider>
  );
}
