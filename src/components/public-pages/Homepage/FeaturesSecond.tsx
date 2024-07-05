"use client";
//v1.2
import Image from "next/image";
import Link from "next/link";
import { Fade, Slide, Zoom } from "react-awesome-reveal";
const FeaturesSecond = () => {
  const SecondFeatureSingleData = [
    {
      id: 1,
      featureNo: "Feature 1",
      headingTwo: "Unveil The Secret...",
      mainHeading:
        "Transforms your Resume into a Job-Winning Masterpiece in Mere Minutes!",
      subHeading: "Stand Out from the Crowd and Secure Your Dream Job Faster",
      content:
        "Discover the expert formula to Craft a Winning Executive Resume in Just 7 Minutes. Say goodbye to career frustrations and hello to boundless opportunities! Your success story starts here.",
      buttonText: "Get Started Free",
      buttonSvg: (
        <svg
          className="w-4 h-4 "
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
      ),
      className: "",
      imageSrc1: "assets/images/illustrations/feature-illustration-1-dark.svg",
      imageSrc2: "assets/images/illustrations/feature-illustration-1-blue.svg",
    },
    {
      id: 2,
      featureNo: "Feature 2",
      headingTwo: "Unlock Hidden Career Advancements",
      mainHeading:
        "Keyword Optimize Your LinkedIn to Access Confidential Senior-Level Jobs",
      subHeading:
        "Don't Miss Out on Lucrative Unadvertised Opportunities Anymore!",
      content:
        "Discover the power of LinkedIn optimization! Senior-level jobs are often concealed, and recruiters prefer to hunt for talent on LinkedIn. If your profile isn't optimized, you're invisible to them, missing out on exclusive career opportunities. Our proven strategies will transform your LinkedIn presence, ensuring you're front and center when those lucrative, unadvertised positions become available. Take control of your future today",
      buttonText: "Get Started Free",
      buttonSvg: (
        <svg
          className="w-4 h-4"
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
      ),
      className: " md:flex-row-reverse",
      imageSrc1: "assets/images/illustrations/feature-illustration-1-dark.svg",
      imageSrc2: "assets/images/illustrations/feature-illustration-1-blue.svg",
    },
    {
      id: 3,
      featureNo: "Feature 3",
      headingTwo: "Stop Wasting Hours on Tailored Cover Letters!",
      subHeading:
        "Unlock the Future of Job Applications with AI-Powered Cover Letters",
      mainHeading: "Craft Tailor-Made Cover Letters for Every Job in Seconds!",
      content:
        "Are you tired of spending hours each day crafting individual cover letters for job applications? Our AI-powered system streamlines the process, allowing you to create customized cover letters in mere seconds. Say goodbye to the time-consuming grind and embrace a more efficient way to land your dream job!",
      buttonText: "Get Started Free",
      buttonSvg: (
        <svg
          className="w-4 h-4"
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
      ),
      className: " ",
      imageSrc1: "/assets/images/illustrations/feature-illustration-2-dark.svg",
      imageSrc2: "/assets/images/illustrations/feature-illustration-2-blue.svg",
    },
    {
      id: 4,
      featureNo: "Feature 4",
      headingTwo: "Discover the Strength of Your Resume",
      mainHeading: "Conquer the ATS with Our Free ATS Scan Service!",
      subHeading:
        "Ensure Your Resume Navigates Robots and Recruiters Effortlessly",
      content:
        "DTake control of your job search by uncovering whether your resume passes the ATS screening. Our free ATS Scan service provides insights to optimize your resume for success. Don't let the ATS stand in your way - assess your resume now!",
      buttonText: "Get Started Free",
      buttonSvg: (
        <svg
          className="w-4 h-4"
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
      ),
      className: " md:flex-row-reverse",
      imageSrc1: "	/assets/images/illustrations/feature-illustration-3-dark.svg",
      imageSrc2: "	/assets/images/illustrations/feature-illustration-3-blue.svg",
    },
    {
      id: 5,
      featureNo: "Feature 5",
      headingTwo: "Unlock Resume Excellence",
      mainHeading:
        "Get Free Resume Review Don't Let Your Resume Undersell Your Achievements",
      subHeading:
        "Eliminate Costly Mistakes and Supercharge Your Career Success!",
      content:
        "Uncover the hidden flaws in your resume through our comprehensive review and take your career to new heights. Avoid the common mistakes that could be holding you back. Elevate your professional journey by crafting a compelling, interview-winning resume with our Ai Powered Resume Writer. Your dream job awaits – seize it with a flawless resume!",
      buttonText: "Get Started Free",
      buttonSvg: (
        <svg
          className="w-4 h-4"
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
      ),
      className: "",
      imageSrc1: "assets/images/illustrations/feature-illustration-1-dark.svg",
      imageSrc2: "assets/images/illustrations/feature-illustration-1-blue.svg",
    },
  ];

  return (
    <section className="pb-10 bg-gray-100 dark:bg-gray-950">
      <div className="w-full mx-auto sm:container xs:max-w-full xs:px-2 ">
        {SecondFeatureSingleData.map((item, i) => {
          return (
            <Fade duration={2000} key={i}>
              <div
                className={` flex md:flex-row xs:flex-col w-[100%] px-2 gap-20 xs:gap-5 pt-15 justify-center  items-center ${item.className}`}
              >
                <div className="flex flex-col  md:w-[50%] xs:text-center md:text-start xs:w-[100%] px-[8px] xs:px-0 pt-8 xs:pt-2">
                  <Slide
                    duration={1200}
                    direction={i % 2 === 0 ? "left" : "right"}
                  >
                    <div className="content" key={item.id}>
                      <p className="text-[#6a4dff] dark:text-[#e6f85e] text-[1rem] mb-[1rem]">
                        {item.featureNo}
                      </p>
                      <h4 className="dark:text-gray-100 text-gray-950 font-[600] md:text-lg text-base">
                        {item.headingTwo}
                      </h4>
                      <h1 className="dark:text-gray-100 text-gray-950 font-[600] md:text-2xl my-5 text-xl">
                        {item.mainHeading}
                      </h1>
                      <h4 className="dark:text-gray-100 text-gray-950 font-[600] mb-8 md:text-lg text-base">
                        {item.subHeading}
                      </h4>
                      <p className="mb-6 text-gray-950 dark:text-gray-400 ">
                        {item.content}
                      </p>
                      <Link
                        href="/register"
                        className="inline-flex no-underline justify-center items-center relative text-[#6a4dff] dark:text-[#e6f85e] gap-3 dark:after:bg-[#e6f85e] after:bg-[#0000ff9c] after:content[''] after:absolute after:-bottom-[2px] after:left-0 after:w-0 after:h-[1px] after:ease-in-out after:duration-300 hover:text-[#6a4dff] hover:after:w-[100%]"
                      >
                        <span>{item.buttonText}</span>
                        {item.buttonSvg}
                      </Link>
                    </div>
                  </Slide>
                </div>
                <div className="flex flex-col lg:w-[50%] md:w-[50%] px-[8px] xs:px-0 xs:w-[100%]">
                  <Zoom duration={1200}>
                    <div className="hidden dark:block">
                      <Image
                        width={506}
                        height={555}
                        src={item.imageSrc1}
                        alt=""
                      />
                    </div>
                    <div className="block dark:hidden">
                      <Image
                        src={item.imageSrc2}
                        alt=""
                        width={506}
                        height={555}
                      />
                    </div>
                  </Zoom>
                </div>
              </div>
            </Fade>
          );
        })}
      </div>
    </section>
  );
};
export default FeaturesSecond;