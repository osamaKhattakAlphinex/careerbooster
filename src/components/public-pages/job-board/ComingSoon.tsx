import Link from "next/link";
import React from "react";

function ComingSoon() {
  return (
    <div>
      {/* <h1 className="md:text-[46px] xs:text-[32px] font-semibold xs:text-center md:self-center ">
        Coming Soon! Currently in Development
      </h1> */}
      <p className="text-center md:w-[75%] xs:w-[95%] md:text-[24px] xs:text-[18px] mx-auto">
        Our AI-powered matchmakers connect you instantly with the right job.
        Helping both job seekers and employers save time by eliminating
        mismatched opportunities.
      </p>
      <div className="flex justify-center mt-2 items-center cursor-pointer gap-2 bg-gradient-to-r from-purple-700 to-pink-500 text-white px-4 py-2 rounded-lg w-fit mx-auto hover:from-purple-800 hover:to-pink-600 transition-all duration-300 ease-in-out">
        <Link href="/ai-job-board">
          <p className="font-semibold text-lg">Launch</p>
        </Link>
      </div>
    </div>
  );
}

export default ComingSoon;
