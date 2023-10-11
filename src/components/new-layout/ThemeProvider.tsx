"use client";
import useTheme from "@/lib/useTheme";
import Script from "next/script";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme] = useTheme();
  return (
    <html lang="en" data-bs-theme="dark">
      {/* <html lang="en" data-bs-theme={theme === "dark" ? "dark" : ""}></html> */}
      <body className={inter.className}>
        <div className="wrapper d-flex flex-column justify-between">
          {children}
        </div>
        <Script src="assets/js/plugins.js" />
        <Script src="assets/js/main.js" />
      </body>
    </html>
  );
};
export default ThemeProvider;
