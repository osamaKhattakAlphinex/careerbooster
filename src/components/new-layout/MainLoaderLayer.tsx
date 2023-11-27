"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Script from "next/script";
const MainLoaderLayer = () => {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowLoader(false);
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  if (!showLoader) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-screen  bg-gradient-to-b from-gray-900 to-gray-600 text-white  z-[9999] flex flex-col justify-center items-center">
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
      <Image
        src="/trans-icon1.png"
        alt="CareerBooster.AI Logo Icon"
        className="animate-ping"
        width={100}
        height={100}
      />
    </div>
  );
};

export default MainLoaderLayer;
