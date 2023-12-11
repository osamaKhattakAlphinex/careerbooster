import Packages from "@/components/dashboard/checkout/Packages";
const PricingSection = () => {
  return (
    <section className="py-10 py-lg-15">
      <div className="container">
        <div className="row justify-center mb-18">
          <div className="col-lg-10">
            <div className="text-center">
              <h1
                className="theme-hero-heading mb-5 md:text-[40px] text-[24px]"
                data-aos="fade-up-sm"
                data-aos-delay="100"
              >
                All Plans Include a 30-Day Money Back Guarantee
              </h1>
              <p className="mb-0" data-aos="fade-up-sm" data-aos-delay="150">
                Your Path to More Interviews and Better Opportunities
              </p>
            </div>
          </div>
        </div>
        <div className="row g-6 pricing-table">
          <Packages viewOnly={true} />
        </div>
      </div>
    </section>
  );
};
export default PricingSection;
