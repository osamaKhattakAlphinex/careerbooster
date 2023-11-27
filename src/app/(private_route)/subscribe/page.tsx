"use client";
import Packages from "@/components/dashboard/checkout/Packages";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Script from "next/script";
export default function SubscribePage() {
  const [showExpiredAlert, setShowExpiredAlert] = useState(false);
  // check if there is ?expired=1 in the URL
  const params = useSearchParams();

  useEffect(() => {
    const expired = params?.get("expired");
    if (expired) {
      setShowExpiredAlert(true);
    }
  }, [params]);

  return (
    <>
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
      <main className="flex-grow-1 mb-20">
        <section className="pt-md-40 pt-15">
          <div className="container">
            {showExpiredAlert && (
              <div className="row justify-center mb-8">
                <div
                  className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4"
                  role="alert"
                >
                  <p className="m-0 p-0">
                    Your current package has been expired. Please resubscribe to
                    a package to choose Free package
                  </p>
                </div>
              </div>
            )}
            <div className="row justify-center mb-8">
              <div className="col-lg-10">
                <div className="text-center">
                  <h1
                    className="theme-text-2 text-4xl"
                    data-aos="fade-up-sm"
                    data-aos-delay="100"
                  >
                    All Plans Include a 30-Day Money Back Guarantee
                  </h1>
                  <p
                    className="mb-0 aos-init aos-animate"
                    data-aos="fade-up-sm"
                    data-aos-delay="150"
                  >
                    Your Path to More Interviews and Better Opportunities
                  </p>
                </div>
              </div>
            </div>
            <div className="row g-6 pricing-table">
              <Packages />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
