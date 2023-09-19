import Link from "next/link";

const AboutCard = () => {
  return (
    <section className="py-15">
      <div className="container">
        <div className="row align-center">
          <div
            className="col-lg-6 col-xl-5"
            data-aos="fade-up-sm"
            data-aos-delay="50"
          >
            <div className="text-center text-lg-start">
              <p className="text-primary-dark fs-sm">About CareerBooster</p>
              <h2 className="text-white mb-4">Welcome to CareerBooster.</h2>
              <p className="mb-8">
                Your ultimate destination for revolutionizing your career
                journey with AI-powered tools that supercharge your professional
                image. In today's fiercely competitive job market, where
                qualifications and experience are essential but not always
                enough, we understand the paramount importance of ensuring your
                resume stands out from the crowd.
              </p>
              <Link href="login.html" className="btn btn-lg btn-gradient-1">
                Upload Resume - It{"'"}s Free
              </Link>
            </div>
          </div>
          <div
            className="col-lg-6 offset-xl-1"
            data-aos="fade-up-sm"
            data-aos-delay="100"
          >
            <div className="text-center">
              <img
                className="img-fluid d-inline-block"
                src="assets/images/screens/screen-4.png"
                alt=""
              />
            </div>
          </div>
        </div>
        <hr className="border-top border-dark-blue opacity-100" />
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
    </section>
  );
};
export default AboutCard;
