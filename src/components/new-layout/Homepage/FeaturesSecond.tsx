import Link from "next/link";

const FeaturesSecond = () => {
  return (
    <section className="py-10 py-lg-15 @extraClassList">
      <div className="container">
        {/* <!-- Feature 1 --> */}
        <div className="row g-6 gx-lg-14 gx-xl-20 align-center">
          <div className="col-lg-6" data-aos="fade-up-sm" data-aos-delay="150">
            <div className="content">
              <p className="text-primary-dark">Features 1</p>
              <h4 className="text-white md:text-[24px] text-[17px]">
                Unveil The Secret...
              </h4>
              <h1 className="text-white md:text-[40px] my-5 text-[24px]">
                Craft a Winning
                <span className="text-primary-dark"> Executive Resume</span> in
                Just 7 Minutes!
              </h1>
              <h4 className="text-white mb-8 md:text-[24px] text-[17px] ">
                Stand Out from the Crowd and Secure Your Dream Job Faster
              </h4>
              <p className="mb-6">
                Discover the expert formula that transforms your resume into a
                job-winning masterpiece in mere minutes. Say goodbye to career
                frustrations and hello to boundless opportunities! Your success
                story starts here.
              </p>
              <Link
                href="/register"
                className="arrow-link arrow-link-primary-dark text-primary-dark gap-3"
              >
                <span>Get Started Free</span>
                <svg
                  className="icon"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12.6667L12.6667 4M12.6667 4V12.32M12.6667 4H4.34667"
                    stroke="currentColor"
                    strokeWidth="1.21"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </div>
          <div className="col-lg-6" data-aos="fade-up-sm" data-aos-delay="250">
            <div className="feature-img">
              <img
                src="assets/images/illustrations/feature-illustration-1-dark.svg"
                alt=""
                className="img-fluid"
              />
            </div>
          </div>
        </div>
        {/* <!-- feature 2 --> */}
        <div className="row g-6 gx-lg-14 gx-xl-20 align-center mt-10 flex-row-reverse">
          <div
            className="col-lg-6 col-xl-6"
            data-aos="fade-up-sm"
            data-aos-delay="150"
          >
            <div className="content">
              <p className="text-primary-dark">Feature 2</p>
              <h4 className="text-white md:text-[24px] text-[17px]">
                Unlock Hidden Career Advancements
              </h4>
              <h1 className="text-white md:text-[40px] my-5 text-[24px] ">
                Supercharge Your
                <span className="text-primary-dark "> LinkedIn</span> Networking
                for Confidential Dream Jobs
              </h1>
              <h4 className="text-white mb-8 md:text-[24px] text-[17px]">
                Don{"'"}t Miss Out on Lucrative Unadvertised Opportunities
                Anymore!
              </h4>
              <p className="mb-6">
                Discover the power of LinkedIn optimization! Senior-level jobs
                are often concealed, and recruiters prefer to hunt for talent on
                LinkedIn. If your profile isn{"'"}t optimized, you{"'"}re
                invisible to them, missing out on exclusive career
                opportunities. Our proven strategies will transform your
                LinkedIn presence, ensuring you{"'"}re front and center when
                those lucrative, unadvertised positions become available. Take
                control of your future today!
              </p>
              <Link
                href="/register"
                className="arrow-link arrow-link-primary-dark text-primary-dark gap-3"
              >
                <span>Request A Demo</span>
                <svg
                  className="icon"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12.6667L12.6667 4M12.6667 4V12.32M12.6667 4H4.34667"
                    stroke="currentColor"
                    strokeWidth="1.21"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </div>
          <div className="col-lg-6" data-aos="fade-up-sm" data-aos-delay="250">
            <div className="feature-img">
              <img
                src="assets/images/illustrations/feature-illustration-2-dark.svg"
                alt=""
                className="img-fluid"
              />
            </div>
          </div>
        </div>
        {/* <!-- feature 3 --> */}
        <div className="row g-6 gx-lg-14 gx-xl-20 align-center mt-10">
          <div className="col-lg-6" data-aos="fade-up-sm" data-aos-delay="150">
            <div className="content">
              <p className="text-primary-dark">Features 3</p>
              <h4 className="text-white md:text-[24px] text-[17px] ">
                Stop Wasting Hours on Tailored Cover Letters!
              </h4>
              <h1 className="text-white md:text-[40px] my-5 text-[24px]">
                Unlock the Future of Job Applications with AI-Powered
                <span className="text-primary-dark"> Cover Letters. </span>
              </h1>
              <h4 className="text-white md:text-[24px] text-[17px]  mb-8">
                Craft Tailor-Made Cover Letters for Every Job in Seconds!
              </h4>
              <p className="mb-6">
                Are you tired of spending hours each day crafting individual
                cover letters for job applications? Our AI-powered system
                streamlines the process, allowing you to create customized cover
                letters in mere seconds. Say goodbye to the time-consuming grind
                and embrace a more efficient way to land your dream job!{'"'}
              </p>

              <Link
                href="/register"
                className="arrow-link arrow-link-primary-dark text-primary-dark gap-3"
              >
                <span>Get Started Free</span>
                <svg
                  className="icon"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12.6667L12.6667 4M12.6667 4V12.32M12.6667 4H4.34667"
                    stroke="currentColor"
                    strokeWidth="1.21"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </div>
          <div className="col-lg-6" data-aos="fade-up-sm" data-aos-delay="250">
            <div className="feature-img">
              <img
                src="assets/images/illustrations/feature-illustration-3-dark.svg"
                alt=""
                className="img-fluid"
              />
            </div>
          </div>
        </div>
        {/* <!-- feature 4 --> */}
        <div className="row g-6 gx-lg-14 gx-xl-20 align-center mt-10 flex-row-reverse">
          <div
            className="col-lg-6 col-xl-6"
            data-aos="fade-up-sm"
            data-aos-delay="150"
          >
            <div className="content">
              <p className="text-primary-dark">Feature 4</p>
              <h4 className="text-white md:text-[24px] text-[17px] ">
                Discover the Strength of Your Resume
              </h4>
              <h1 className="text-white md:text-[40px] my-5 text-[24px]">
                Conquer the ATS with Our
                <span className="text-primary-dark"> Free ATS Scan </span>
                Service!
              </h1>
              <h4 className="text-white md:text-[24px] text-[17px]  mb-8">
                Ensure Your Resume Navigates Robots and Recruiters Effortlessly
              </h4>
              <p className="mb-6">
                Take control of your job search by uncovering whether your
                resume passes the ATS screening. Our free ATS Scan service
                provides insights to optimize your resume for success. Don{"'"}t
                let the ATS stand in your way - assess your resume now!{'"'}
              </p>
              <Link
                href="/register"
                className="arrow-link arrow-link-primary-dark text-primary-dark gap-3"
              >
                <span>Request A Demo</span>
                <svg
                  className="icon"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12.6667L12.6667 4M12.6667 4V12.32M12.6667 4H4.34667"
                    stroke="currentColor"
                    strokeWidth="1.21"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </div>
          <div className="col-lg-6" data-aos="fade-up-sm" data-aos-delay="250">
            <div className="feature-img">
              <img
                src="assets/images/illustrations/feature-illustration-2-dark.svg"
                alt=""
                className="img-fluid"
              />
            </div>
          </div>
        </div>
        {/* <!-- feature 5 --> */}
        <div className="row g-6 gx-lg-14 gx-xl-20 align-center mt-10">
          <div className="col-lg-6" data-aos="fade-up-sm" data-aos-delay="150">
            <div className="content">
              <p className="text-primary-dark">Feature 5</p>
              <h4 className="text-white md:text-[24px] text-[17px] ">
                Unlock Resume Excellence
              </h4>
              <h1 className="text-white md:text-[40px] my-5 text-[24px]">
                Get Free
                <span className="text-primary-dark"> Resume Review: </span> Don
                {"'"}t Let Your Resume Undersell Your Achievements
              </h1>
              <h4 className="text-white md:text-[24px] text-[17px]  mb-8">
                Eliminate Costly Mistakes and Supercharge Your Career Success!
              </h4>
              <p className="mb-6">
                Uncover the hidden flaws in your resume through our
                comprehensive review and take your career to new heights. Avoid
                the common mistakes that could be holding you back. Elevate your
                professional journey by crafting a compelling, interview-winning
                resume with our Ai Powered Resume Writer. Your dream job awaits
                - seize it with a flawless resume!
              </p>

              <Link
                href="/register"
                className="arrow-link arrow-link-primary-dark text-primary-dark gap-3"
              >
                <span>Get Started Free</span>
                <svg
                  className="icon"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12.6667L12.6667 4M12.6667 4V12.32M12.6667 4H4.34667"
                    stroke="currentColor"
                    strokeWidth="1.21"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </div>
          <div className="col-lg-6" data-aos="fade-up-sm" data-aos-delay="250">
            <div className="feature-img">
              <img
                src="assets/images/illustrations/feature-illustration-3-dark.svg"
                alt=""
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default FeaturesSecond;
