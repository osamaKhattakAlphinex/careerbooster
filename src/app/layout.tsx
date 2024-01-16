import "./globals.css";
import type { Metadata } from "next";
import AuthProvider from "@/components/AuthProvider";
import ReduxProvider from "@/components/ReduxProvider";
import ThemeProvider from "@/components/new-layout/ThemeProvider";
import Head from "next/head";
import Script from "next/script";
import NextThemeProvider from "@/components/NextThemeProvider";
import UserDataProvider from "@/components/UserDataProvider";
import MainLoaderLayer from "@/components/new-layout/MainLoaderLayer";
import CreditLimitsProvider from "@/components/CreditLimitsProvider";

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
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Script
        id="hotjar-script"
        dangerouslySetInnerHTML={{
          __html: `
              (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:3796095,hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
              })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
            `,
        }}
      />
      <NextThemeProvider>
        <AuthProvider>
          <ReduxProvider>
            <MainLoaderLayer />
            <UserDataProvider />
            <CreditLimitsProvider />
            {children}
          </ReduxProvider>
        </AuthProvider>
      </NextThemeProvider>
    </ThemeProvider>
  );
}
