import React from "react";

function UniqueFeatures() {
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
      cardContent:
        "Instant alerts for new job postings that meet your criteria.",
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
      cardContent:
        "Detailed profiles with two-page resumes and contact details.",
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
  return (
    <div>
      {" "}
      <h1 className="md:text-[36px] xs:text-[26px] font-semibold md:self-center xs:text-center xs:mt-4 md:mt-10 text-[#6a4dff] dark:text-[#e6f85e]">
        Unique Features of Our AI-Powered Job Board
      </h1>
      <div className="flex md:flex-row xs:flex-col w-full gap-4 md::px-20 xs:px-2 flex-wrap">
        {cardContent.map((card, index:number) => {
          return (
            <div key={index} className="md:w-[23%] xs:w-full flex flex-col gap-2 dark:shadow-2xl shadow-md p-6 text-center ">
              <span className="rounded-[100px]  w-6 mx-auto  dark:bg-gray-700 bg-gray-300 ">
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
      </div>
    </div>
  );
}

export default UniqueFeatures;
