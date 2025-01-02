import Image from "next/image";
import React from "react";

function JobSeekers() {
  return (
    <div className="flex w-full md:px-20 xs:px-2 md:mt-10">
      <div className="flex flex-col md:w-1/2 xs:w-full  gap-2 xs:text-center md:text-left">
        <h1 className="md:text-[26px] xs:text-[20px] font-medium text-[#6a4dff] dark:text-[#e6f85e]">
          For Job Seekers
        </h1>
        <h3 className="md:text-[36px] xs:text-[24px] font-semibold">
          Unlock Your Potential with AI-Powered Job Matching
        </h3>
        <p className="md:text-[20px] xs:text-[16px] ">
          At CareerBooster.ai, we give job seekers an edge in the competitive
          market. Our AI-Powered Job Board uses advanced algorithms to match you
          with senior-level roles that align with your skills, experience, and
          career aspirations. Enjoy real-time notifications, detailed job
          filters, and resume optimization to increase your chances of landing
          your ideal position. With comprehensive support and a user-friendly
          interface, your path to a high-paying job has never been smoother.
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
  );
}

export default JobSeekers;
