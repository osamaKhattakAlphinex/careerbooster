import Link from "next/link";
import SVGProvider from "../SVGProvider";

const FeaturesSection = () => {
  return (
    <section className="py-10 py-lg-15">
      <div className="container">
        <div className="text-center mb-18">
          <h4
            className="mb-5 theme-text-2 md:text-[24px] text-[17px]"
            data-aos="fade-up-sm"
            data-aos-delay="50"
          >
            Uncover the Secret to Superior Resumes
          </h4>
          <h1
            className="mb-5  theme-text-2 md:text-[40px] text-[24px]"
            data-aos="fade-up-sm"
            data-aos-delay="50"
          >
            Why Trust AI for Your Executive Resume?
            <br className="d-none d-lg-block" />
          </h1>
          <h4
            className="mb-0 theme-text-2 md:text-[24px] text-[17px]"
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
              <SVGProvider type="svg3" />

              <div className="content">
                <h4 className="mb-4  theme-text-2 ">
                  Get Past the ATS and Increase Your Visibility
                </h4>
                <p className="w-md-3quarter pr-lg-5">
                  The ATS is no human—it&apos;s a robot designed to shortlist
                  resumes based on specific criteria. This means your resume
                  must speak the language of machines to secure that initial
                  interview invitation. The question arises: Who can craft a
                  better robotfriendly resume than a robot itself? We&apos;ve
                  decoded the algorithms that the ATS employs to shortlist
                  candidates. Your resume is crafted with a deep understanding
                  of what it takes to pass this robotic gatekeeper
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-6" data-aos="fade-up-sm" data-aos-delay="250">
            <div className="d-flex flex-column gap-6 flex-lg-row">
              <SVGProvider type="svg2" />

              <div className="content">
                <h4 className="mb-4 theme-text-2">
                  Get the Attention You Deserve from the Recruiters.
                </h4>
                <p className="w-md-3quarter pr-lg-5">
                  Our system has been meticulously trained through extensive
                  research and consultations with numerous executive resume
                  writers. We&apos;ve fine-tuned our system to create resumes
                  that captivate the attention of recruiters and hiring
                  managers.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="row my-md-15 py-10">
          <div
            className="col-lg-6 aos-init aos-animate"
            data-aos="fade-up-sm"
            data-aos-delay="250"
          >
            <div className="d-flex flex-column gap-6 flex-lg-row">
              <SVGProvider type="svg1" />

              <div className="content">
                <h4 className="mb-4 theme-text-2">
                  Land your Dream Job 10x Faster
                </h4>
                <p className="w-md-3quarter pr-lg-5">
                  Your applications will be more strategic, more effective, and
                  more likely to lead to your dream job. Gone are the days of
                  sending out generic resumes and hoping for the best. With our
                  Resume AI, you can craft personalized resumes for every job
                  opportunity you pursue. Our AI analyzes each job posting and
                  highlights the keywords and skills that matter most to
                  recruiters. It then helps you incorporate these essential
                  elements seamlessly into your resume, making it a perfect
                  match for the position you&apos;re targeting. When a recruiter
                  sees a resume that aligns perfectly with their job opening, it
                  significantly increases your chances of getting noticed and
                  landing an interview.
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
              <SVGProvider type="svg4" />

              <div className="content">
                <h4 className="mb-4 theme-text-2">
                  Endorsed by a Former Google Recruiter
                </h4>
                <p className="w-md-3quarter pr-lg-5">
                  Still skeptical? Take it from the experts. Nolan Church, a
                  former Google recruiter, has emphasized that resumes often
                  suffer from an overload of words and paragraphs, resulting in
                  a &quot;zero chance&quot; of progressing. He recommends using
                  AI tools to refine your resume. In an interview with Business
                  Insider, he praised the effectiveness of AI-driven resume
                  optimization, confirming that it&apos;s the smart choice for
                  modern job seekers. So, when you trust AI for your executive
                  resume, you&apos;re not just appeasing the robots; you&apos;re
                  ensuring your resume shines in the eyes of discerning human
                  recruiters too. It&apos;s the winning combination for your
                  career success.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <h5 className="my-10">
            Ready to craft a resume that impresses both bots and humans?
          </h5>
          <Link href="/register" className="btn theme-btn">
            Let{"'"}s get started!
          </Link>
        </div>
      </div>
    </section>
  );
};
export default FeaturesSection;
