"use client";
import {
  usecasesvg1,
  usecasesvg2,
  usecasesvg3,
  usecasesvg4,
  usecasesvg5,
  usecasesvg6,
  usecasesvg7,
  usecasesvg8,
} from "@/helpers/iconsProvider";
import ToolUsage from "./ToolUsage";
import { Fade } from "react-awesome-reveal";
const useCaseDetails = [
  {
    title: "Write a Winning Executive Resume",
    description:
      "With CareerBooster.AI, you can effortlessly craft a compelling executive resume that grabs the attention of recruiters and showcases your unique skills and achievements.",
    linkText: "Elevate Your Resume!",
    icon: usecasesvg1,
    link: "/register",
  },
  {
    title: "Keyword Optimize Your LinkedIn",
    description:
      "Ensure your LinkedIn profile ranks high in recruiter searches. Our AI system will optimize your profile with relevant keywords, making it more likely to be seen by potential employers.",
    linkText: "Boost Your LinkedIn Now!",
    icon: usecasesvg2,
    link: "/register",
  },
  {
    title: "Tailor Cover Letter for Each Job",
    description:
      "Create customized cover letters for every job application in just a few seconds. Tailoring your cover letter to each specific position greatly increases your chances of landing interviews.",
    linkText: "Craft Your Winning Letter!",
    icon: usecasesvg3,
    link: "/register",
  },
  {
    title: "Get Your Resume Reviewed",
    description:
      "Receive valuable feedback on your resume to identify areas for improvement. Our AI tool analyzes your document and provides actionable suggestions to enhance its impact.",
    linkText: "Unlock Your Full Potential!",
    icon: usecasesvg4,
    link: "/register",
  },
  {
    title: "ATS Scan Your Resume",
    description:
      "Avoid the pitfalls of Applicant Tracking Systems (ATS) with our ATS scanning feature. Ensure your resume is ATS-friendly, increasing your chances of making it to the recruiter's desk.",
    linkText: "Beat the ATS",
    icon: usecasesvg5,
    link: "/register",
  },
  {
    title: "Personalized Email for Each Job",
    description:
      "Craft personalized emails to recruiters quickly and easily. Our AI-generated emails help you make a memorable first impression and increase your chances of getting noticed.",
    linkText: "Stand Out Now!",
    icon: usecasesvg6,
    link: "/register",
  },
  {
    title: "Tailor Resume for Each Job",
    description:
      "Ditch the one-size-fits-all approach. CareerBooster.AI lets you create customized resumes for each job opening, highlighting the skills and experiences most relevant to the position.",
    linkText: "Personalize Your Pitch!",
    icon: usecasesvg7,
    link: "/register",
  },
  {
    title: "Make Your Resume ATS Optimized",
    description:
      "Our AI ensures that your resume is not only tailored for human readers but also optimized for ATS, so it passes through the initial screening and reaches recruiters.",
    linkText: "ATS-Proof Your Resume!",
    icon: usecasesvg8,
    link: "/register",
  },
];
const UseCases = () => {
  return (
    <section className="bg-gray-100 dark:bg-gray-950  py-20 xs:pt-0 xs:pb-6  ">
      <div className="mx-auto md:container ">
        <Fade duration={2000}>
          <div className="flex justify-center">
            <div className="flex flex-col w-9/12 xs:w-full">
              <div className="text-center py-10 xs:py-3 px-4">
                <p className="dark:text-[#e6f85e] text-[#0000ff] text-opacity-[0.6] text-lg">
                  CareerBooster.AI Use Cases
                </p>
                <h1 className="text-[#000] pt-3 dark:text-[#fff] text-center xs:px-0  mb-0  md:px-2 md:text-3xl text-[25px] font-semibold">
                  Leverage our AI-Powered Tools for your Professional Excellence
                </h1>
              </div>
            </div>
          </div>
        </Fade>

        <div className="flex flex-wrap xs:text-center md:text-start md:px-2">
          {useCaseDetails.map((item, index) => (
            <ToolUsage
              key={index}
              title={item.title}
              description={item.description}
              linkText={item.linkText}
              icon={item.icon}
              link={item.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
export default UseCases;
