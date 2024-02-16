"use client";
import Packages from "@/components/dashboard/checkout/Packages";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import CreditPackages from "@/components/dashboard/checkout/CreditPackages";
import { useSelector } from "react-redux";
import Link from "next/link";
import { leftArrowIcon } from "@/helpers/iconsProvider";
export default function SubscribePage() {
  const [showExpiredAlert, setShowExpiredAlert] = useState(false);
  // check if there is ?expired=1 in the URL
  const params = useSearchParams();
  const userData = useSelector((state: any) => state.userData);
  useEffect(() => {
    const expired = params?.get("expired");
    if (expired) {
      setShowExpiredAlert(true);
    }
  }, [params]);

  return (
    <>
      <div className="ml-0  md:px-[15px] pb-[72px]">
        <Link
          href="/dashboard"
          className="ml-2 my-4 w-fit  no-underline dark:text-[#b324d7] dark:hover:text-[#e6f85e] text-gray-950 hover:text-[#b324d7] flex flex-row gap-2 items-center  hover:opacity-80 transition-all"
        >
          {leftArrowIcon}
          Back
        </Link>
        <main className="flex-grow-1 pb-20">
          <section className="pt-4 w-full">
            <div className="">
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
                    <h1 className="dark:text-gray-100 text-gray-950 xs:text-2xl md:text-4xl font-semibold mb-6">
                      All Plans Include a 30-Day Money Back Guarantee
                    </h1>
                    <p className="mb-0 dark:text-gray-100 text-gray-950 text-base ">
                      Your Path to More Interviews and Better Opportunities
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <div
                  className={`grid grid-cols w-fit xs:flex-col-1 md:grid-cols-2 gap-6 pt-6 ${
                    userData.creditPackage ? "lg:grid-cols-2" : "lg:grid-cols-3"
                  }`}
                >
                  {/* <Packages /> */}
                  <CreditPackages />
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
