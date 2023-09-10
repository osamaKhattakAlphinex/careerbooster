import Header from "@/components/layout/Header";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AuthProvider from "@/components/AuthProvider";
import ReduxProvider from "@/components/ReduxProvider";
import Footer from "@/components/layout/Footer";

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
    <html lang="en" data-bs-theme="dark">
      <head>
        {/* <!-- Required meta tags --> */}
        {/* <meta charset="UTF-8" /> */}
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* <!-- Title --> */}
        <title>AI Resume Bot - Developed by NausalTech</title>

        {/* <!-- SEO meta tags --> */}
        <meta name="description" content="Nausal Tech AI Resume Bot" />

        {/* <!-- CSS --> */}
        <link rel="stylesheet" href="assets/css/plugins.css" />
        <link rel="stylesheet" href="assets/css/style.css" />
      </head>

      <body>
        <div className="wrapper d-flex flex-column justify-between">
          <AuthProvider>
            <ReduxProvider>
              <Header />
              {children}
              <Footer />
            </ReduxProvider>
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
