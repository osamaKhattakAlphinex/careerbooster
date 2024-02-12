"use client";
import Link from "next/link";
import SVGProvider from "../../../helpers/SVGProvider";
import { Fade, Slide } from "react-awesome-reveal";

const FeaturesSection = () => {
  const singleFeatureData = [
    {
      id: 1,
      svg: (
        <svg
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 40 40"
        >
          <g
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          >
            <path d="M30.167 10c-1.833 4.855-3.167 8.188-4 10m0 0c-3.132 6.813-6.188 10-10 10-4 0-8-4-8-10s4-10 8-10c3.778 0 6.892 3.31 10 10Zm0 0c.853 1.837 2.187 5.17 4 10"></path>
          </g>
        </svg>
      ),
      heading: "Get Past the ATS and Increase Your Visibility",
      content:
        "The ATS is no human—it's a robot designed to shortlist resumes based on specific criteria. This means your resume must speak the language of machines to secure that initial interview invitation. The question arises: Who can craft a better robotfriendly resume than a robot itself? We've decoded the algorithms that the ATS employs to shortlist candidates. Your resume is crafted with a deep understanding of what it takes to pass this robotic gatekeeper",
    },
    {
      id: 2,
      svg: (
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
      ),
      heading: "Get the Attention You Deserve from the Recruiters.",
      content:
        "Our system has been meticulously trained through extensive research and consultations with numerous executive resume writers. We've fine-tuned our system to create resumes that captivate the attention of recruiters and hiring managers.",
    },
    {
      id: 3,
      svg: (
        <svg
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 40 40"
        >
          <g
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          >
            <path d="M10 29.334 6.667 27.5v-4.166m0-6.668V12.5L10 10.666m6.667-3.833L20 5l3.334 1.833M30 10.666l3.333 1.834v4.166m0 6.668V27.5L30 29.367m-6.666 3.799L20 35l-3.333-1.834M20 20l3.333-1.834M30 14.333l3.333-1.833M20 20v4.167m0 6.667V35m0-15-3.333-1.867M10 14.333 6.667 12.5"></path>
          </g>
        </svg>
      ),
      heading: "Land your Dream Job 10x Faster",
      content:
        "Your applications will be more strategic, more effective, and more likely to lead to your dream job. Gone are the days of sending out generic resumes and hoping for the best. With our Resume AI, you can craft personalized resumes for every job opportunity you pursue. Our AI analyzes each job posting and highlights the keywords and skills that matter most to recruiters. It then helps you incorporate these essential elements seamlessly into your resume, making it a perfect match for the position you're targeting. When a recruiter sees a resume that aligns perfectly with their job opening, it significantly increases your chances of getting noticed and landing an interview.",
    },
    {
      id: 4,
      svg: (
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
      ),
      heading: "Endorsed by a Former Google Recruiter",
      content:
        "Still skeptical? Take it from the experts. Nolan Church, a former Google recruiter, has emphasized that resumes often suffer from an overload of words and paragraphs, resulting in a 'zero chance' of progressing. He recommends using AI tools to refine your resume. In an interview with Business Insider, he praised the effectiveness of AI-driven resume optimization, confirming that it's the smart choice for modern job seekers. So, when you trust AI for your executive resume, you're not just appeasing the robots; you're ensuring your resume shines in the eyes of discerning human recruiters too. It's the winning combination for your career success.",
    },
  ];
  return (
    <section className="pb-15 dark:pt-0 pt-8  dark:bg-gray-950 bg-gray-100">
      <Fade duration={2000}>
        <div className="md:container mx-auto">
          <div className="flex flex-col justify-center text-center mb-18 xs:px-10">
            <h4 className="mb-5 dark:text-gray-100 text-gray-950 font-bold md:text-[24px] text-[17px]">
              Uncover the Secret to Superior Resumes
            </h4>
            <h1 className="mb-5  dark:text-gray-100 text-gray-950 font-bold md:text-[40px] text-[24px]">
              Why Trust AI for Your Executive Resume?
              <br className="d-none d-lg-block" />
            </h1>
            <h4 className="mb-0 dark:text-gray-100 text-gray-950 font-bold md:text-[24px] text-[17px]">
              The Game-Changing Advantages You Never Knew About
            </h4>
            <p className="py-10 lg:w-[75%] md:w-[75%] xs:w-full mx-auto dark:text-gray-100 text-gray-950 pb-10">
              In today{"'"}s competitive job market, landing your dream role isn
              {"'"}t just about qualifications and experience; It{"'"}s about
              making sure your resume stands out. But here{"'"}s the catch:
              before your resume even reaches the human recruiter{"'"}s desk, it
              has to pass through a critical gatekeeper—the Applicant Tracking
              System (ATS).
            </p>
          </div>

          <div className="grid lg:grid-cols-2 md:grid-cols-2 xs:grid-cols-1 mr-6 xs:mr-0">
            {singleFeatureData.map((item, i) => {
              return (
                <Slide
                  key={i}
                  duration={1200}
                  direction={i % 2 === 0 ? "left" : "right"}
                >
                  <div className="flex col-span-1 mb-6 px-4 lg:pt-10 md:pt-10 xs:pt-0">
                    <div className="flex gap-5">
                      <Fade duration={2000}>
                        <div className="icon w-14 h-14 flex-shrink-0 d-flex align-center justify-center rounded-lg p-2 border-[1px] dark:bg-[#1E1F27] text-[#0000ff9c] bg-[#E5E3F7] dark:text-[#e6f85e] dark:border-white border-[#c7bef9] dark:border-opacity-10 border-opacity-25">
                          {item.svg}
                        </div>
                        <div className="content">
                          <h4 className="mb-4  text-[1.5rem] font-[600] dark:text-gray-100 text-gray-950 ">
                            {item.heading}
                          </h4>
                          <p className="w-md-3quarter pr-lg-5 dark:text-gray-100 text-gray-950">
                            {item.content}
                          </p>
                        </div>
                      </Fade>
                    </div>
                  </div>
                </Slide>
              );
            })}
          </div>

          <div className="text-center ">
            <h5 className="lg:my-10 md:my-10 xs:mb-10 xs:mt-0 dark:text-gray-100 text-gray-950 font-[600] text-[1.25rem]">
              Ready to craft a resume that impresses both bots and humans?
            </h5>
            <Link
              href="/register"
              className="dark:bg-[#e6f85e] dark:text-gray-950  text-[16px] font-[500] px-[1.5rem] py-[.85rem] bg-[#6a4dff] text-gray-100 rounded-md "
            >
              Let{"'"}s get started!
            </Link>
          </div>
        </div>
      </Fade>
    </section>
  );
};
export default FeaturesSection;
