"use client";
import Packages from "@/components/dashboard/checkout/Packages";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import "@/app/plugins.css";
import "@/app/style.css";
import { leftArrowIcon } from "@/helpers/iconsProvider";
import Link from "next/link";
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
      <div className="ml-0 px-[15px] mb-[72px]">
        <main className="flex-grow-1 mb-20">
          <section className=" pt-10">
            <div className="container">
              {showExpiredAlert && (
                <div className="row justify-center mb-8">
                  <div
                    className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4"
                    role="alert"
                  >
                    <p className="m-0 p-0">
                      Your current package has been expired. Please resubscribe
                      to a package to choose Free package
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
