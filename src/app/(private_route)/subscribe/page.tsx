"use client";
import Packages from "@/components/dashboard/checkout/Packages";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
 

import CreditPackages from "@/components/dashboard/checkout/CreditPackages";
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
      <div className="ml-0 px-[15px] pb-[72px] dark:bg-gradient-to-l from-[#340e53] to-[#000533] bg-gray-100">
        <main className="flex-grow-1 pb-20">
          <section className=" pt-10 dark:bg-gradient-to-l from-[#340e53] to-[#000533] bg-gray-100">
            <div className="container">
              {showExpiredAlert && (
                <div className="row justify-center mb-8">
                  <div
                    className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4"
                    role="alert"
                  >
                    <p className="m-0 p-0 dark:text-gray-100 text-gray-950 ">
                      Your current package has been expired. Please resubscribe
                      to a package to choose Free package
                    </p>
                  </div>
                </div>
              )}
              <div className="flex justify-center mb-8">
                <div className="flex flex-col lg:w-10/12">
                  <div className="text-center">
                    <h1 className="dark:text-gray-100 text-gray-950 text-4xl font-semibold mb-6">
                      All Plans Include a 30-Day Money Back Guarantee
                    </h1>
                    <p className="mb-0 dark:text-gray-100 text-gray-950 text base ">
                      Your Path to More Interviews and Better Opportunities
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex md:justify-center gap-6 pricing-table">
                {/* <Packages /> */}
                <CreditPackages />
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
