import Link from "next/link";

const FeaturesSection = () => {
  return (
    <section className="py-10 py-lg-15">
      <div className="container">
        <div className="text-center mb-18">
          <h4
            className="mb-5 text-white md:text-[24px] text-[17px]"
            data-aos="fade-up-sm"
            data-aos-delay="50"
          >
            Uncover the Secret to Superior Resumes
          </h4>
          <h1
            className="mb-5 text-white md:text-[48px] text-[24px]"
            data-aos="fade-up-sm"
            data-aos-delay="50"
          >
            Why Trust Ai for Your Executive Resume?
            <br className="d-none d-lg-block" />
          </h1>
          <h4
            className="mb-0 text-white md:text-[24px] text-[17px]"
            data-aos="fade-up-sm"
            data-aos-delay="50"
          >
            The Game-Changing Advantages You Never Knew About
          </h4>
          <p className="py-10 w-md-3quarter mx-auto">
            In today{"'"}s competitive job market, landing your dream role isn
            {"'"}t just about qualifications and experience; It{"'"}s about
            making sure your resume stands out. But here{"'"}s the catch: before
            your resume even reaches the human recruiter{"'"}s desk, it has to
            pass through a critical gatekeeper—the Applicant Tracking System
            (ATS).
          </p>
        </div>

        <div className="row g-6 g-xl-14">
          <div
            className="col-lg-6 px-lg-5"
            data-aos="fade-up-sm"
            data-aos-delay="200"
          >
            <div className="d-flex flex-column gap-6 flex-lg-row">
              <div className="icon w-14 h-14 flex-shrink-0 d-flex align-center justify-center rounded-3 p-2 border bg-gradient-3 text-primary-dark border-white border-opacity-10">
                <svg
                  className="w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 40 40"
                >
                  <g
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  >
                    <path d="M30.167 10c-1.833 4.855-3.167 8.188-4 10m0 0c-3.132 6.813-6.188 10-10 10-4 0-8-4-8-10s4-10 8-10c3.778 0 6.892 3.31 10 10Zm0 0c.853 1.837 2.187 5.17 4 10" />
                  </g>
                </svg>
              </div>
              <div className="content">
                <h4 className="mb-4 text-white">
                  The ATS: Your Resume{"'"}s First Adjudicator
                </h4>
                <p className="w-md-3quarter pr-lg-5">
                  The ATS is no human—It{"'"}s a robot designed to shortlist
                  resumes based on specific criteria. This means your resume
                  must speak the language of machines to secure that initial
                  interview invitation. The question arises: Who can craft a
                  better robotfriendly resume than a robot itself?
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-6" data-aos="fade-up-sm" data-aos-delay="250">
            <div className="d-flex flex-column gap-6 flex-lg-row">
              <div className="icon w-14 h-14 flex-shrink-0 d-flex align-center justify-center rounded-3 p-2 border bg-gradient-3 text-primary-dark border-white border-opacity-10">
                <svg
                  className="w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 40 40"
                >
                  <g
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  >
                    <path d="M3.333 20 20 32.37 36.666 20" />
                    <path d="M11.667 15 20 21.667 28.334 15m-10.001-5L20 11.333 21.666 10 20 8.666 18.333 10Z" />
                  </g>
                </svg>
              </div>
              <div className="content">
                <h4 className="mb-4 text-white">
                  But What About the Human Recruiter?
                </h4>
                <p className="w-md-3quarter pr-lg-5">
                  We understand your concerns Don{"'"}t end with impressing a
                  machine. That{"'"}s why our AI doesn{"'"}t stop at being
                  ATS-friendly; It{"'"}s also human-recruiter-approved. We{"'"}
                  ve fine-tuned our system to create resumes that captivate the
                  attention of senior-level professionals.
                </p>
              </div>
            </div>
          </div>
          {/* <!-- <div className="col-lg-4" data-aos="fade-up-sm" data-aos-delay="300">
                <div className="d-flex flex-column gap-6 flex-lg-row">
                  <div
                    className="icon w-14 h-14 flex-shrink-0 d-flex align-center justify-center rounded-3 p-2 border bg-gradient-3 text-primary-dark border-white border-opacity-10"
                  >
                    <svg
                      className="w-full h-full"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 40 40"
                    >
                      <g
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      >
                        <path
                          d="M10 29.334 6.667 27.5v-4.166m0-6.668V12.5L10 10.666m6.667-3.833L20 5l3.334 1.833M30 10.666l3.333 1.834v4.166m0 6.668V27.5L30 29.367m-6.666 3.799L20 35l-3.333-1.834M20 20l3.333-1.834M30 14.333l3.333-1.833M20 20v4.167m0 6.667V35m0-15-3.333-1.867M10 14.333 6.667 12.5"
                        />
                      </g>
                    </svg>
                  </div>
                  <div className="content">
                    <h4 className="mb-4 text-white">
                      Improves Products Productivity
                    </h4>
                    <p>
                      Emotions are a powerful tool in advertising. Use emotions
                      that resonate with your audience to create a connection.
                    </p>
                  </div>
                </div>
              </div> --> */}
        </div>
        <div className="row my-md-15 py-10">
          <div
            className="col-lg-6 aos-init aos-animate"
            data-aos="fade-up-sm"
            data-aos-delay="250"
          >
            <div className="d-flex flex-column gap-6 flex-lg-row">
              <div className="icon w-14 h-14 flex-shrink-0 d-flex align-center justify-center rounded-3 p-2 border bg-gradient-3 text-primary-dark border-white border-opacity-10">
                <svg
                  className="w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 40 40"
                >
                  <g
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  >
                    <path d="M3.333 20 20 32.37 36.666 20"></path>
                    <path d="M11.667 15 20 21.667 28.334 15m-10.001-5L20 11.333 21.666 10 20 8.666 18.333 10Z"></path>
                  </g>
                </svg>
              </div>
              <div className="content">
                <h4 className="mb-4 text-white">
                  CareerBooster: Your ATS-Friendly Resume Partner
                </h4>
                <p className="w-md-3quarter pr-lg-5">
                  Our system has been meticulously trained through extensive
                  research and consultations with numerous executive resume
                  writers. We{"'"}ve decoded the algorithms that the ATS employs
                  to shortlist candidates. Your resume is crafted with a deep
                  understanding of what it takes to pass this robotic
                  gatekeeper.
                </p>
              </div>
            </div>
          </div>
          <div
            className="col-lg-6 aos-init aos-animate"
            data-aos="fade-up-sm"
            data-aos-delay="250"
          >
            <div className="d-flex flex-column gap-6 flex-lg-row">
              <div className="icon w-14 h-14 flex-shrink-0 d-flex align-center justify-center rounded-3 p-2 border bg-gradient-3 text-primary-dark border-white border-opacity-10">
                <svg
                  className="w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 40 40"
                >
                  <g
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  >
                    <path d="M3.333 20 20 32.37 36.666 20"></path>
                    <path d="M11.667 15 20 21.667 28.334 15m-10.001-5L20 11.333 21.666 10 20 8.666 18.333 10Z"></path>
                  </g>
                </svg>
              </div>
              <div className="content">
                <h4 className="mb-4 text-white">
                  Endorsed by a Former Google Recruiter
                </h4>
                <p className="w-md-3quarter pr-lg-5">
                  Still skeptical? Take it from the experts. Nolan Church, a
                  former Google recruiter, has emphasized that resumes often
                  suffer from an overload of words and paragraphs, resulting in
                  a {'"'}zero chance{'"'} of progressing. He recommends using AI
                  tools to refine your resume. In an interview with Business
                  Insider, he praised the effectiveness of AI-driven resume
                  optimization, confirming that It{"'"}s the smart choice for
                  modern job seekers. So, when you trust AI for your executive
                  resume, you
                  {"'"}re not just appeasing the robots; you{"'"}re ensuring
                  your resume shines in the eyes of discerning human recruiters
                  too. It{"'"}s the winning combination for your career success.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <h5 className="my-10">
            Ready to craft a resume that impresses both bots and humans?
          </h5>
          <Link href="/register" className="btn btn-primary-dark">
            Let{"'"}s get started!
          </Link>
        </div>
      </div>
    </section>
  );
};
export default FeaturesSection;
