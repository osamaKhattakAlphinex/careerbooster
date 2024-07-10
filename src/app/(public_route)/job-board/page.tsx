import React from "react";
import PageHeader from "@/components/PageHeader";
import { Metadata } from "next";
import Image from "next/image";
export const metadata: Metadata = {
  title: "Job Board - CareerBooster.ai",
  description: "Job Board Service Page",
  keywords: [
    "CareerBooster.AI",
    "AI-powered tools",
    "AI Resume Builder",
    "ATS-friendly resumes",
    "Executive resumes",
    "Professional image",
    "Competitive job market",
    "Job hunt transformation",
    "Career advancement",
    "20,000+ professionals",
    "Revolutionize job search",
    "CareerBooster.AI About ",
    "About CareerBooster.AI",
    "Contact CareerBooster.AI",
    "CareerBooster.AI Contact",
    "CareerBooster.AI Contact",
  ],
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};
const cardContent = [
  {
    cardNo: "1",
    cardHeading: "Personalized Job Matching",
    cardContent:
      "Advanced AI algorithms match job seekers with opportunities that align with their skills and experience.",
  },
  {
    cardNo: "2",
    cardHeading: "Advanced Filtering Options",
    cardContent:
      "Filter job listings by salary, location, industry, role, experience, and education.",
  },
  {
    cardNo: "3",
    cardHeading: "Real-Time Notifications",
    cardContent: "Instant alerts for new job postings that meet your criteria.",
  },
  {
    cardNo: "4",
    cardHeading: "Vetted Executive Listings",
    cardContent: "Access high-caliber, senior-level job opportunities.",
  },
  {
    cardNo: "5",
    cardHeading: "Resume Optimization",
    cardContent:
      "AI-driven suggestions to enhance resumes for better visibility",
  },
  {
    cardNo: "6",
    cardHeading: "Comprehensive Candidate Profiles",
    cardContent: "Detailed profiles with two-page resumes and contact details.",
  },
  {
    cardNo: "7",
    cardHeading: "User-Friendly Interface",
    cardContent: "Easy navigation for a seamless job search experience",
  },
  {
    cardNo: "8",
    cardHeading: "Employer Dashboard",
    cardContent:
      "Tools for managing job postings, tracking applications, and communicating with candidates.",
  },
];
function page() {
  return (
    <main className="bg-[#fff] dark:bg-[#171825]">
      <PageHeader title="AI-Powered Job Board" />
      <div className="flex flex-col gap-8 justify-center xs:px-2 md:px-0 mt-10 pb-10">
        <h1 className="md:text-[46px] xs:text-[32px] font-semibold xs:text-center md:self-center ">
          Coming Soon! Currently in Development
        </h1>
        <p className="text-center md:w-[75%] xs:w-[95%] md:text-[24px] xs:text-[18px] mx-auto">
          Our AI-powered matchmakers connect you instantly with the right job.
          Helping both job seekers and employers save time by eliminating
          mismatched opportunities.
        </p>
        <h1 className="md:text-[36px] xs:text-[26px] font-semibold md:self-center xs:text-center xs:mt-4 md:mt-10">
          Unique Features of Our AI-Powered Job Board
        </h1>
        {/* <div className="flex  w-full gap-4 px-20 flex-wrap">
          {cardContent.map((card: any) => {
            return (
              <div className="w-1/4 flex flex-col gap-2 dark:shadow-2xl shadow-md p-6 ">
                <span className="rounded-[100px]  w-6 mx-auto text-center dark:bg-gray-700 bg-gray-300 ">
                  {card.cardNo}
                </span>
                <h1 className="text-gray-950 dark:text-gray-100 font-bold text-[20px] ">
                  {card.cardHeading}
                </h1>
                <p className="text-gray-950 dark:text-gray-100 text-[16px]">
                  {card.cardContent}
                </p>
              </div>
            );
          })}
        </div> */}
        <div className="flex md:flex-row  xs:flex-col w-full gap-4 md:px-20 xs:px-2">
          <div className="lg:w-1/4  md:w-1/3 xs:w-full flex flex-col gap-2 dark:shadow-2xl shadow-md p-6">
            <span className="rounded-[100px]  w-6 mx-auto text-center dark:bg-gray-700 bg-gray-300 ">
              1
            </span>
            <h1 className="text-gray-950 dark:text-gray-100 font-bold text-[20px] ">
              Personalized Job Matching
            </h1>
            <p className="text-gray-950 dark:text-gray-100 text-[16px]">
              Advanced AI algorithms match job seekers with opportunities that
              align with their skills and experience.
            </p>
          </div>
          <div className="lg:w-1/4  md:w-1/3 xs:w-full flex flex-col dark:shadow-2xl shadow-md p-6">
            <span className="rounded-[100px]  w-6 mx-auto text-center dark:bg-gray-700 bg-gray-300 ">
              2
            </span>
            <h1 className="text-gray-950 dark:text-gray-100 font-bold text-[20px] ">
              Advanced Filtering Options
            </h1>
            <p className="text-gray-950 dark:text-gray-100 text-[16px]">
              Filter job listings by salary, location, industry, role,
              experience, and education.
            </p>
          </div>
          <div className="lg:w-1/4  md:w-1/3 xs:w-full flex flex-col dark:shadow-2xl shadow-md p-6">
            <span className="rounded-[100px]  w-6 mx-auto text-center dark:bg-gray-700 bg-gray-300 ">
              3
            </span>
            <h1 className="text-gray-950 dark:text-gray-100 font-bold text-[20px] ">
              Real-Time Notifications
            </h1>
            <p className="text-gray-950 dark:text-gray-100 text-[16px]">
              Instant alerts for new job postings that meet your criteria.
            </p>
          </div>
          <div className="lg:w-1/4  md:w-1/3 xs:w-full flex flex-col dark:shadow-2xl shadow-md p-6">
            <span className="rounded-[100px]  w-6 mx-auto text-center dark:bg-gray-700 bg-gray-300 ">
              4
            </span>
            <h1 className="text-gray-950 dark:text-gray-100 font-bold text-[20px] ">
              Vetted Executive Listings
            </h1>
            <p className="text-gray-950 dark:text-gray-100 text-[16px]">
              Access high-caliber, senior-level job opportunities.
            </p>
          </div>
        </div>
        <div className="flex md:flex-row xs:flex-col w-full gap-4 md:px-20 xs:px-2 my-8">
          <div className="lg:w-1/4  md:w-1/3 xs:w-full flex flex-col gap-2 dark:shadow-2xl shadow-md p-6">
            <span className="rounded-[100px]  w-6 mx-auto text-center dark:bg-gray-700 bg-gray-300 ">
              5
            </span>
            <h1 className="text-gray-950 dark:text-gray-100 font-bold text-[20px] ">
              Resume Optimization
            </h1>
            <p className="text-gray-950 dark:text-gray-100 text-[16px]">
              AI-driven suggestions to enhance resumes for better visibility
            </p>
          </div>
          <div className="lg:w-1/4  md:w-1/3 xs:w-full flex flex-col dark:shadow-2xl shadow-md p-6">
            <span className="rounded-[100px]  w-6 mx-auto text-center dark:bg-gray-700 bg-gray-300 ">
              6
            </span>
            <h1 className="text-gray-950 dark:text-gray-100 font-bold text-[20px] ">
              Comprehensive Candidate Profiles
            </h1>
            <p className="text-gray-950 dark:text-gray-100 text-[16px]">
              Detailed profiles with two-page resumes and contact details.
            </p>
          </div>
          <div className="lg:w-1/4  md:w-1/3 xs:w-full flex flex-col dark:shadow-2xl shadow-md p-6">
            <span className="rounded-[100px]  w-6 mx-auto text-center dark:bg-gray-700 bg-gray-300 ">
              7
            </span>
            <h1 className="text-gray-950 dark:text-gray-100 font-bold text-[20px] ">
              User-Friendly Interface
            </h1>
            <p className="text-gray-950 dark:text-gray-100 text-[16px]">
              Easy navigation for a seamless job search experience
            </p>
          </div>
          <div className="lg:w-1/4  md:w-1/3 xs:w-full flex flex-col dark:shadow-2xl shadow-md p-6">
            <span className="rounded-[100px]  w-6 mx-auto text-center dark:bg-gray-700 bg-gray-300 ">
              8
            </span>
            <h1 className="text-gray-950 dark:text-gray-100 font-bold text-[20px] ">
              Employer Dashboard
            </h1>
            <p className="text-gray-950 dark:text-gray-100 text-[16px]">
              Tools for managing job postings, tracking applications, and
              communicating with candidates.
            </p>
          </div>
        </div>
        <div className="flex w-full md:px-20 xs:px-2 md:mt-10">
          <div className="flex flex-col md:w-1/2 xs:w-full  gap-2 xs:text-center md:text-left">
            <h1 className="md:text-[26px] xs:text-[20px] font-medium">
              For Job Seekers
            </h1>
            <h3 className="md:text-[36px] xs:text-[24px] font-semibold">
              Unlock Your Potential with AI-Powered Job Matching
            </h3>
            <p className="md:text-[20px] xs:text-[16px] ">
              At CareerBooster.ai, we give job seekers an edge in the
              competitive market. Our AI-Powered Job Board uses advanced
              algorithms to match you with senior-level roles that align with
              your skills, experience, and career aspirations. Enjoy real-time
              notifications, detailed job filters, and resume optimization to
              increase your chances of landing your ideal position. With
              comprehensive support and a user-friendly interface, your path to
              a high-paying job has never been smoother.
            </p>
          </div>
          <div className="w-1/2 xs:hidden md:block ">
            <Image
              className="ml-auto"
              src="/assets/images/bg/home-banner-1.png"
              width={400}
              height={428}
              alt="img"
            />
          </div>
        </div>
        <div className="flex w-full md:px-20 xs:px-2 md:mt-16">
          <div className="w-1/2  xs:hidden md:block">
            <Image
              className=""
              src="/assets/images/bg/home-banner-2.png"
              width={238}
              height={423}
              alt="img"
            />
          </div>
          <div className="flex flex-col md:w-1/2 xs:w-full gap-2 xs:text-center md:text-left">
            <h1 className="md:text-[26px] xs:text-[20px] font-medium">
              For Employers
            </h1>
            <h3 className="md:text-[36px] xs:text-[24px] font-semibold">
              Find Exceptional Leaders Quickly and Efficiently
            </h3>
            <p className="md:text-[20px] xs:text-[16px]">
              CareerBooster.ai helps employers connect with top-tier executive
              talent. Our AI-Powered Job Board features vetted, high-caliber
              candidates ready to drive your business forward. Utilize advanced
              filtering options, detailed candidate profiles, and our employer
              dashboard to streamline your recruitment process. Benefit from
              AI-driven insights and real-time updates to secure the best
              leaders for your organization. Trust CareerBooster.ai to make
              hiring seamless and effective.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default page;
