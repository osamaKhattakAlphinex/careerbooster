const HeroArea = () => {
  return (
    <section
      className="hero-section style-1 overflow-hidden bg-dark py-10 py-lg-15"
      data-bs-theme="dark"
    >
      <div className="container">
        <div className="row justify-center">
          <div className="col-lg-9">
            <div className="text-center">
              <div className="position-relative z-1">
                <p className="text-primary-dark" data-aos="fade-up-sm">
                  Unlock Your Career Potential
                </p>
                <h1
                  className="text-white mb-8"
                  data-aos="fade-up-sm"
                  data-aos-delay="50"
                >
                  7 Reasons to Turbocharge Your <br />
                  Career with AI-Powered Tools <br />
                  <span
                    className="fw-bold font-36 text-gradient-2 typed-animation text-wrap"
                    data-strings='["Customizes Your Documents for Each Job", "Creates Documents 100 Times Faster, Saving You Time", 
                        "Ensures Your Resume Gets Through Applicant Tracking Systems", "Maintains A Consistent Message Across Career Tools",
                        "Research-Backed Insights and Actionable Feedback",
                        "Reduces Manual Errors and Ensures Accuracy",
                        "Generates Keyword-Optimized Resumes to Boost Your Visibility"]'
                  >
                    Product Description
                  </span>
                </h1>
                <a
                  href="login.html"
                  className="btn btn-lg btn-gradient-1"
                  data-aos="fade-up-sm"
                  data-aos-delay="200"
                >
                  Upload Resume - It's Free
                </a>
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
                      src="assets/images/screens/screen-1.jpg"
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
