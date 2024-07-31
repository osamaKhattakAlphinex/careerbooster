import Link from "next/link";
import React from "react";

function ComingSoon() {
  return (
    <div>
      <p className="text-center md:w-[75%] xs:w-[95%] md:text-[24px] xs:text-[18px] mx-auto">
        Our AI-powered matchmakers connect you instantly with the right job.
        Helping both job seekers and employers save time by eliminating
        mismatched opportunities.
      </p>
      <div className="mt-2 flex xs:flex-col md:flex-row items-center justify-around md:gap-8">
        <Link
          href="/ai-job-board"
          className="mt-2 cursor-pointer gap-2 bg-gradient-to-r from-purple-700 to-pink-500 text-white px-4 py-2 rounded-lg w-fit hover:from-purple-800 hover:to-pink-600 transition-all duration-300 ease-in-out"
        >
          <p className="text-gray-100 m-0 font-semibold whitespace-nowrap lg:text-[16px] cursor-pointer text-[14px] lg:leading-6 leading-4[text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]">
            I am a Job Seeker
          </p>
          <p className="text-center text-gray-100 lg:text-[14px] text-[10px] lg:leading-3 leading-[14px] pt-2">
            Looking for Job
          </p>
        </Link>
        <Link
          href="#"
          className="mt-2 cursor-pointer gap-2 bg-gradient-to-r from-purple-700 to-pink-500 text-white px-4 py-2 rounded-lg w-fit hover:from-purple-800 hover:to-pink-600 transition-all duration-300 ease-in-out"
        >
          <p className="text-gray-100 m-0 font-semibold whitespace-nowrap lg:text-[16px] cursor-pointer text-[14px] lg:leading-6 leading-4[text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]">
            I am an Employer (Coming Soon)
          </p>
          <p className=" text-gray-100 text-center lg:text-[14px] text-[10px] lg:leading-3 leading-[14px] pt-2">
            Searching for Talent
          </p>
        </Link>
      </div>
    </div>
  );
}

export default ComingSoon;
