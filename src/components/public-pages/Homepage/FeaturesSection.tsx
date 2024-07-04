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
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          >
            <path d="M30.167 10c-1.833 4.855-3.167 8.188-4 10m0 0c-3.132 6.813-6.188 10-10 10-4 0-8-4-8-10s4-10 8-10c3.778 0 6.892 3.31 10 10Zm0 0c.853 1.837 2.187 5.17 4 10"></path>
          </g>
        </svg>
      ),
      heading: "CareerBoost AI Suite",
      content:
        "Optimize your resume, LinkedIn profile, and cover letters with our cutting-edge AI tools.Ensure your application materials stand out and pass through Applicant Tracking Systems (ATS) with ease.",
    },
    {
      id: 2,
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-full h-full"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
          />
        </svg>
      ),
      heading: "Find Me a Job",
      content:
        "Navigating the job market can be overwhelming. Our Virtual Job Search Assistant is here to streamline your search process. This personalized service identifies and recommends jobs tailored to your skills, experience, and career aspirations, saving you time and effort.",
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
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          >
            <path d="M10 29.334 6.667 27.5v-4.166m0-6.668V12.5L10 10.666m6.667-3.833L20 5l3.334 1.833M30 10.666l3.333 1.834v4.166m0 6.668V27.5L30 29.367m-6.666 3.799L20 35l-3.333-1.834M20 20l3.333-1.834M30 14.333l3.333-1.833M20 20v4.167m0 6.667V35m0-15-3.333-1.867M10 14.333 6.667 12.5"></path>
          </g>
        </svg>
      ),
      heading: "AI-Powered Job Board ",
      content:
        "Discover exclusive job opportunities on our curated job board. Leveraging advanced AI technology, we match you with the right opportunities, ensuring that senior-level professionals have access to high-impact roles across various industries.",
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
      heading: "Career Advancement Suite",
      content:
        "Our Executive Career Advancement Suite offers senior-level job seekers comprehensive support to excel in their careers. It includes Interview Coaching for confident interview performance, Networking Opportunities to connect with industry leaders, and Personal Branding to stand out in the job market.",
    },
  ];
  return (
    <section className="pb-15 px-2 dark:bg-gray-950 bg-gray-100">
      <Fade duration={2000}>
        <div className="mx-auto w-full sm:container xs:max-w-full xs:px-2  ">
          <div className="flex flex-col justify-center text-center mb-18">
            {/* <p className="mb-5 dark:text-gray-100  xs:text-base md:text-xl text-gray-950  ">
              Uncover the Secret to Superior Resumes
            </p> */}
            <h1 className="mb-2  dark:text-gray-100 text-gray-950 font-semibold md:text-3xl text-[20px]">
              Your One-Stop Shop for Senior-Level Jobs
              {/* <br className="d-none d-lg-block" /> */}
            </h1>
            {/* <h4 className="mb-0 dark:text-gray-100 text-gray-950  md:text-[20px] text-[17px]">
              The Game-Changing Advantages You Never Knew About
            </h4> */}
            <p className="py-4 md:w-[75%] text-base xs:w-full mx-auto dark:text-gray-100 text-gray-950 pb-10">
              Whether you{"'"}re aiming for senior management, director, VP, or
              C-level positions like CMO, CFO, CTO, and CIO, we have the tools
              and expertise to help you succeed.
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
                  <div className="flex col-span-1 mb-6 lg:px-4 lg:pt-10 md:pt-10 xs:pt-0">
                    <div className="flex xs:flex-col md:flex-row xs:text-center md:text-start gap-5">
                      <Fade
                        duration={2000}
                        className="flex xs:justify-center md:justify-start"
                      >
                        <div className="icon hidden xs:flex md:hidden w-14 h-14 lg:flex lg:flex-shrink-0  align-center justify-center rounded-lg border-[1px] dark:bg-[#1E1F27] text-[#0000ff9c] bg-[#E5E3F7] dark:text-[#e6f85e] dark:border-white border-[#c7bef9] dark:border-opacity-10 border-opacity-25">
                          {item.svg}
                        </div>
                        <div className="content">
                          <h4 className="mb-4 font-semibold xs:flex xs:justify-center md:justify-normal xs:gap-2  text-xl dark:text-gray-100 text-gray-950 ">
                            <div className="icon  xs:hidden  md:flex mb-2 lg:hidden w-14 h-14 md:flex-shrink-0  align-center justify-center rounded-lg border-[1px] dark:bg-[#1E1F27] text-[#0000ff9c] bg-[#E5E3F7] dark:text-[#e6f85e] dark:border-white border-[#c7bef9] dark:border-opacity-10 border-opacity-25">
                              {item.svg}
                            </div>
                            {item.heading}
                          </h4>
                          <p className=" font-normal dark:text-gray-100 text-gray-950">
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

          {/* <div className="text-center ">
            <h5 className="lg:my-10 md:my-10 xs:mb-10 xs:mt-0 dark:text-gray-100 text-gray-950 font-[600] text-[1.25rem]">
              Ready to craft a resume that impresses both bots and humans?
            </h5>
            <Link
              href="/register"
              className="dark:bg-[#e6f85e] dark:text-gray-950  text-[16px] font-[500] px-[1.5rem] py-[.85rem] bg-[#6a4dff] text-gray-100 rounded-md "
            >
              Let{"'"}s get started!
            </Link>
          </div> */}
        </div>
      </Fade>
    </section>
  );
};
export default FeaturesSection;
