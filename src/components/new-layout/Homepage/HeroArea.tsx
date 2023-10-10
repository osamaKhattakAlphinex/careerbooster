import UploadPDFResume from "@/components/UploadPDFResume";

const HeroArea = () => {
  return (
    <section className="hero-section style-1 overflow-hidden bg-dark py-10 py-lg-15">
      <div className="container ">
        <div className="row justify-center ">
          <div className="col-lg-9">
            <div className="text-center">
              <div className="position-relative z-1">
                <p className="text-primary-dark" data-aos="fade-up-sm">
                  Unlock Your Career Potential
                </p>
                <h1
                  className="text-white mb-8 md:text-[40px] text-[24px]"
                  data-aos="fade-up-sm"
                  data-aos-delay="50"
                >
                  Your Free AI Resume Writer & LinkedIn Optimization Tool to
                  Turbocharge Your Career!
                  <br />
                  <span
                    className="fw-bold md:text-[40px] mt-8 text-[24px] text-gradient-2 typed-animation text-wrap"
                    data-strings='["Find Your Dream Job Faster.", "Get More Interviews.", 
                        "Access Confidential Opportunities with the Right Keywords.", "Get the Attention You Deserve from Recruiters.",
                        "Get Past the ATS and Increase Your Visibility.",
                        "A Top-Notch Resume Will Boost Your Confidence.",
                        "Expect a Document That Stands Out from the Competition"]'
                  ></span>
                </h1>
                <UploadPDFResume />
              </div>
              <div data-aos="fade-up-sm" data-aos-delay="300">
                <div className="image-with-shape">
                  <img
                    src="assets/images/shapes/blurry-shape-1.svg"
                    alt=""
                    className="shape animate-scale"
                  />
                  <div className="mt-12 rounded-5 border border-primary-dark shadow-lg overflow-hidden position-relative z-1">
                    <img
                      className="img-fluid d-inline-block"
                      src="assets/images/screens/dashboard.png"
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <ul className="d-flex flex-wrap gap-4 gap-md-8 gap-lg-10 align-center justify-center mt-8 mb-0">
                <li>Write Resumes 100x Faster</li>
                <li>Write Keyword-Optimized LinkedIn Profile</li>
              </ul>
              <div className="d-flex gap-8 align-center justify-center mt-12 review-badges">
                <img
                  className="img-fluid"
                  src="assets/images/review-logos/trustpilot_reviews.svg"
                  alt=""
                />
                <img
                  className="img-fluid"
                  src="assets/images/review-logos/capterra_reviews.svg"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default HeroArea;
