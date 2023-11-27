"use client";
import useTheme from "@/lib/useTheme";
import Script from "next/script";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme] = useTheme();
  return (
    <html
      lang="en"
      className={theme === "dark" ? "dark" : ""}
      data-bs-theme={theme === "dark" ? "dark" : ""}
    >
      <body className={inter.className}>
        <div className="wrapper d-flex flex-column justify-between">
          {children}
        </div>
        <Script type="text/javascript">
          {`
          (function(c,l,a,r,i,t,y){
          c[a]=c[a]function(){(c[a].q=c[a].q[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "jum6bniqm4");
        `}
        </Script>
        {/* Google tag (gtag.js) --> */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-NDN7TY5F2W"
        />
        <Script>
          {`

        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-NDN7TY5F2W');
        `}
        </Script>
        <Script src="assets/js/plugins.js" />
        <Script src="assets/js/main.js" />
      </body>
    </html>
  );
};
export default ThemeProvider;
