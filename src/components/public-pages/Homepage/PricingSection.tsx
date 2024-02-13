"use client";
import CreditPackages from "@/components/dashboard/checkout/CreditPackages";
import { Fade, Zoom } from "react-awesome-reveal";
const PricingSection = () => {
  return (
    <section className="py-4 lg:py-15 dark:bg-gray-950 bg-gray-100 ">
      <Fade duration={2000}>
        <div className="mx-auto w-full sm:container xs:max-w-full xs:px-2  ">
          <div className="flex justify-center mb-18">
            <div className="flex flex-col md:w-10/12 xs:w-full">
              <div className="text-center">
                <h1 className="dark:text-gray-100 text-gray-950 mb-5 md:text-3xl text-xl font-semibold">
                  All Plans Include a 30-Day Money Back Guarantee
                </h1>
                <p className="mb-4 dark:text-gray-100 text-gray-950 py-4 text-base">
                  Your Path to More Interviews and Better Opportunities
                </p>
              </div>
            </div>
          </div>
          <Zoom duration={1200}>
            <div className="flex md:flex-row md:justify-center xs:flex-col gap-6 pricing-table pt-6 ">
              {/* <Packages viewOnly={true} /> */}
              <CreditPackages viewOnly={true} />
            </div>
          </Zoom>
        </div>
      </Fade>
    </section>
  );
};
export default PricingSection;
