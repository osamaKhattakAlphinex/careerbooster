const PricingSection = () => {
  return (
    <section className="py-10 py-lg-15">
      <div className="container">
        <div className="row justify-center mb-18">
          <div className="col-lg-10">
            <div className="text-center">
              <p
                className="text-primary-dark"
                data-aos="fade-up-sm"
                data-aos-delay="50"
              >
                Pricing Plan
              </p>
              <h1
                className="text-white mb-5 md:text-[40px] text-[24px]"
                data-aos="fade-up-sm"
                data-aos-delay="100"
              >
                Ready to Get Started? <br />
                Don{"'"}t Worry, We{"'"}ll Keep You Under Budget
              </h1>
              <p className="mb-0" data-aos="fade-up-sm" data-aos-delay="150">
                Get started with a 5-day trial, Cancel anytime.
              </p>
            </div>
          </div>
        </div>
        <div className="row g-6 pricing-table">
          <div
            className="col-md-6 col-lg-4"
            data-aos="fade-up-sm"
            data-aos-delay="50"
          >
            <div className="pricing-card p-6 px-lg-10 py-lg-8 rounded-4 h-full bg-">
              <h3 className="text-primary-dark fw-medium mb-0">Free Forever</h3>
              <h1 className="display-3 fw-semibold text-white mb-0 mt-4  md:!text-6xl text-[24px]">
                $00
              </h1>
              {/* <!-- <p className="text-white lead fw-normal mt-4 mb-0">
                    A 10X faster way to writing your professional copy
                  </p> --> */}
              <a
                href="pricing-plan.html"
                className="pricing-btn btn btn-md w-full fs-4 lh-sm mt-9 btn-dark-blue-3"
              >
                No Credit Card Required
              </a>
              <ul className="pricing-list d-flex flex-column gap-5 fs-lg mt-9 mb-0">
                <li>ATS Scan your Resume</li>
                <li>Free ATS Optimization</li>
                <li>Resume Critical Review</li>
                <li>Rewrite your Resume (Preview Only)</li>
                <li>Keyword Optimize your LinkedIn (Preview Only)</li>
              </ul>
            </div>
          </div>
          <div
            className="col-md-6 col-lg-4"
            data-aos="fade-up-sm"
            data-aos-delay="100"
          >
            <div className="pricing-card p-6 px-lg-10 py-lg-8 rounded-4 h-full bg-">
              <h3 className="text-primary-dark fw-medium mb-0">Standard</h3>
              <h1 className="display-2 fw-semibold text-white mb-0 mt-4  md:!text-6xl text-[24px]">
                $99
              </h1>
              {/* <!-- <p className="text-white lead fw-normal mt-4 mb-0">
                    A 10X faster way to writing your professional copy
                  </p> --> */}
              <a
                href="pricing-plan.html"
                className="pricing-btn btn btn-md w-full fs-4 lh-sm mt-9 btn-dark-blue-3"
              >
                Choose Plan
              </a>
              <ul className="pricing-list d-flex flex-column gap-5 fs-lg mt-9 mb-0">
                <li>All features from the Free Package</li>
                <li>Keyword Optimize your LinkedIn</li>
                <li>New Executive Level Resume Design</li>
                <li>Get a Winning Executive Resume</li>
                <li>Tailor Resume for Each Job (50 Credits)</li>
                <li>Write Customize Cover Letters (50 Credits)</li>
                <li>
                  Write a Personalized Email to the Recruiter (50 Credits)
                </li>
              </ul>
            </div>
          </div>
          <div
            className="col-md-6 col-lg-4"
            data-aos="fade-up-sm"
            data-aos-delay="150"
          >
            <div className="pricing-card p-6 px-lg-10 py-lg-8 rounded-4 h-full bg-">
              {/* <!-- <span className="badge text-bg-primary px-4 py-2 rounded-end-0"
                    >Most Popular</span
                  > --> */}
              <h3 className="text-primary-dark fw-medium mb-0">Premium</h3>
              <h1 className="display-2 fw-semibold text-white mb-0 mt-4  md:!text-6xl text-[24px]">
                $500 <span className="text-2xl">/ year</span>
              </h1>
              {/* <!-- <p className="text-white lead fw-normal mt-4 mb-0">
                    A 10X faster way to writing your professional copy
                  </p> --> */}
              <a
                href="pricing-plan.html"
                className="pricing-btn btn btn-md w-full fs-4 lh-sm mt-9 btn-dark-blue-3"
              >
                Choose Plan
              </a>
              <ul className="pricing-list d-flex flex-column gap-5 fs-lg mt-9 mb-0">
                <li>Unlimited seats</li>
                <li>All features from the Standard Package</li>
                <li>Unlimited Resume Tailoring</li>
                <li>Unlimited Custom Cover Letters</li>
                <li>Unlimited Personalized Emails to Recruiters</li>
                <li>
                  Find the HR/Recruiter Email & LinkedIn for Direct Contact for
                  Job Positions
                </li>
                <li>
                  Generate Monthly Content for your LinkedIn Posts with a Single
                  Click.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default PricingSection;
