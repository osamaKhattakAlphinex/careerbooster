"use client";
import { Fade } from "react-awesome-reveal";

const FAQSection = () => {
  return (
    <section className="py-10 py-lg-15">
      <Fade duration={2000}>
        <div className="container">
          <div className="justify-center row mb-18">
            <div className="col-lg-10">
              <div className="text-center">
                <h1 className="mb-0 theme-hero-heading md:text-[48px] text-[24px]">
                  Questions About our Career Booster?
                  <br className="d-none d-md-block" />
                  We have Answers!
                </h1>
              </div>
            </div>
          </div>

          <div className="justify-center row">
            <div className="col-lg-8" data-aos-delay="100">
              <div
                className="gap-6 accordion accordion-flush d-flex flex-column"
                id="faqAccordion"
              >
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button"
                      type="button"
                      aria-expanded="false"
                      aria-controls="faq-collapseOne"
                    >
                      <span className="icon"></span>
                      1. What is CareerBooster?
                    </button>
                  </h2>
                  <div id="faq-collapseOne" className="accordion-collapse show">
                    <div className="accordion-body">
                      CareerBooster is an AI-powered platform designed to
                      enhance your professional presentation and improve your
                      chances in the job market. It offers a suite of tools and
                      services to optimize your resume, LinkedIn profile, cover
                      letters, and more.
                    </div>
                  </div>
                </div>

                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      aria-expanded="false"
                      aria-controls="faq-collapseTwo"
                    >
                      <span className="icon"></span>
                      2. How does CareerBooster work?
                    </button>
                  </h2>
                  <div
                    id="faq-collapseTwo"
                    className="accordion-collapse collapse"
                  >
                    <div className="accordion-body">
                      CareerBooster uses advanced AI algorithms to analyze your
                      existing career documents, such as resumes and LinkedIn
                      profiles. It provides actionable insights, keyword
                      optimization, and personalized recommendations to make
                      your professional materials stand out to recruiters and
                      employers
                    </div>
                  </div>
                </div>

                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      aria-expanded="false"
                      aria-controls="faq-collapseThree"
                    >
                      <span className="icon"></span>
                      3. What makes CareerBooster different from other tools?
                    </button>
                  </h2>
                  <div
                    id="faq-collapseThree"
                    className="accordion-collapse collapse"
                  >
                    <div className="accordion-body">
                      CareerBooster stands out because It{"'"}s specifically
                      designed for seniorlevel professionals. It{"'"}s been
                      developed by top executive resume writers and AI engineers
                      to cater to the unique needs and expectations of
                      experienced job seekers.
                    </div>
                  </div>
                </div>

                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      aria-expanded="false"
                      aria-controls="faq-collapseFour"
                    >
                      <span className="icon"></span>
                      4. Is CareerBooster suitable for all industries and job
                      levels?
                    </button>
                  </h2>
                  <div
                    id="faq-collapseFour"
                    className="accordion-collapse collapse"
                  >
                    <div className="accordion-body">
                      Yes, CareerBooster is designed to be versatile and
                      adaptable to various industries and career levels. Whether
                      you{"'"}re a seasoned executive or a recent graduate, our
                      tools can help you improve your professional presentation.
                    </div>
                  </div>
                </div>

                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      aria-expanded="false"
                      aria-controls="faq-collapseFive"
                    >
                      <span className="icon"></span>
                      5. Can I try CareerBooster for free?
                    </button>
                  </h2>
                  <div
                    id="faq-collapseFive"
                    className="accordion-collapse collapse"
                  >
                    <div className="accordion-body">
                      Yes, we offer a free package that includes services like
                      ATS resume scanning, resume optimization, and a resume
                      review. You can get a taste of our services before
                      deciding to upgrade to our premium packages.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="justify-center row">
            <div className="col-lg-8" data-aos-delay="100">
              <div
                className="gap-6 accordion accordion-flush d-flex flex-column"
                id="faqAccordion"
              >
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      aria-expanded="false"
                      aria-controls="faq-collapseTwo"
                    >
                      <span className="icon"></span>
                      6. How secure is my data on CareerBooster?
                    </button>
                  </h2>
                  <div
                    id="faq-collapseTwo"
                    className="accordion-collapse collapse"
                  >
                    <div className="accordion-body">
                      We take data security seriously. Your personal and
                      professional information is protected with the highest
                      level of encryption and security protocols. We do not
                      share your data with third parties.
                    </div>
                  </div>
                </div>

                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      aria-expanded="false"
                      aria-controls="faq-collapseTwo"
                    >
                      <span className="icon"></span>
                      7. What do the premium packages include?
                    </button>
                  </h2>
                  <div
                    id="faq-collapseTwo"
                    className="accordion-collapse collapse"
                  >
                    <div className="accordion-body">
                      Our premium packages offer additional benefits, such as
                      unlimited resume tailoring, cover letter customization,
                      personalized emails to recruiters, and more. Please refer
                      to our pricing section for a detailed breakdown of each
                      package
                      {"'"}s features.
                    </div>
                  </div>
                </div>

                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      aria-expanded="false"
                      aria-controls="faq-collapseThree"
                    >
                      <span className="icon"></span>
                      8. How often can I use CareerBooster{"'"}s services?
                    </button>
                  </h2>
                  <div
                    id="faq-collapseThree"
                    className="accordion-collapse collapse"
                  >
                    <div className="accordion-body">
                      The frequency of service usage depends on your chosen
                      package. Free users have access to limited credits, while
                      premium users can enjoy unlimited access to our tools and
                      services.
                    </div>
                  </div>
                </div>

                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      aria-expanded="false"
                      aria-controls="faq-collapseFour"
                    >
                      <span className="icon"></span>
                      9. Is CareerBooster suitable for international job
                      seekers?
                    </button>
                  </h2>
                  <div
                    id="faq-collapseFour"
                    className="accordion-collapse collapse"
                  >
                    <div className="accordion-body">
                      Yes, CareerBooster is designed to assist job seekers
                      globally. Our tools are adaptable to various job markets
                      and industries, making them useful for international job
                      searches.
                    </div>
                  </div>
                </div>

                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      aria-expanded="false"
                      aria-controls="faq-collapseFive"
                    >
                      <span className="icon"></span>
                      10. Do I need any special software or technical skills to
                      use CareerBooster?
                    </button>
                  </h2>
                  <div
                    id="faq-collapseFive"
                    className="accordion-collapse collapse"
                  >
                    <div className="accordion-body">
                      No, CareerBooster is designed to be user-friendly and
                      accessible to individuals with basic computer skills. You
                      Don{"'"}t need any specialized software or technical
                      expertise to use our platform.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fade>
    </section>
  );
};

export default FAQSection;
