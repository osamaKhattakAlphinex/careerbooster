import CreditPackages from "@/components/dashboard/checkout/CreditPackages";
import Packages from "@/components/dashboard/checkout/Packages";
const PricingSection = () => {
  return (
    <section className="py-10 lg:py-15 dark:bg-gray-950 bg-gray-100 ">
      <div className="container">
        <div className="flex justify-center mb-18">
          <div className="flex flex-col w-10/12">
            <div className="text-center">
              <h1 className="dark:text-gray-100 text-gray-950 mb-5 md:text-[40px] text-[24px]">
                All Plans Include a 30-Day Money Back Guarantee
              </h1>
              <p className="mb-0 dark:text-gray-100 text-gray-950">
                Your Path to More Interviews and Better Opportunities
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-6 pricing-table">
          {/* <Packages viewOnly={true} /> */}
          <CreditPackages viewOnly={true} />
        </div>
      </div>
    </section>
  );
};
export default PricingSection;
