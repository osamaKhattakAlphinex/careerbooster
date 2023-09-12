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
              <p className="text-primary-dark fs-sm">About GenAI.</p>
              <h2 className="text-white mb-4">
                10,000+ Writers, Marketers, & Business owners Love GenAI.
              </h2>
              <p className="mb-8">
                With a few clicks of a button, you can create a whole outline,
                opening paragraph, and body for your blog.
              </p>
              <a href="login.html" className="btn btn-lg btn-gradient-1">
                Start Writing - It's Free
              </a>
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
