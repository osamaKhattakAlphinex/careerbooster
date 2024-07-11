import { Montserrat } from "next/font/google";
import Link from "next/link";
import React from "react";
const montserrat_r = Montserrat({
  weight: "400",
  subsets: ["latin"],
});
function VideoSection() {
  return (
    <div
      className={`bg-[#E5EFF7] text-gray-900 py-10 md:px-6 w-full ${montserrat_r.className}`}
    >
      <div className="mx-auto text-center md:px-10 xs:px-2">
        <h1 className={` md:text-[36px] xs:text-[26px]`}>Introducing:</h1>
        <h1
          className={`text-[#4F31F0] font-extrabold md:text-[46px] xs:text-[32px]`}
        >
          Career JumpStart Service{" "}
        </h1>
        <h4 className="md:text-[24px] xs:text-[18px] text-gray-600 italic">
          For Director, VP, SVP and C-Level Job Seekers
        </h4>
        <div className="md:w-[38%] xs:w-full h-[20%] mx-auto my-8">
          <div className="pt-[100%] relative ">
            <iframe
              src="https://player.vimeo.com/video/981888560?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
              className="absolute top-0 left-0 w-full h-full"
              title="CareerBooster's Career JumpStart"
            ></iframe>
          </div>
        </div>
        <h1 className="text-gray-950 md:text-[46px] xs:text-[32px] font-extrabold">
          Want to JumpStart Your Career?
        </h1>
        <p className="text-gray-600 md:text-[24px] xs:text-[18px] md:w-2/3 xs:w-full py-2 mx-auto">
          Elevate your career and secure a high-paying position, schedule a call
          with us today. Let{"’"}s explore how we can work together to land your
          next executive role.
        </p>
        <div className="mt-6 md:mb-20 xs:mb-8">
          <Link
            target="_blank"
            href="https://api.leadconnectorhq.com/widget/booking/YWUhGhQTqpIH6XVQZBPu"
            className={`${montserrat_r.className} md:text-[20px] xs:text-[14px] bg-[#BD10E0] text-gray-100  md:py-4 md:px-8 xs:py-3 xs:px-4 rounded-full hover:bg-purple-700 transition duration-300 !font-bold mt-4 w-fit mx-auto `}
          >
            Schedule Your Call Now
          </Link>
        </div>

        <h2
          className={`md:text-[40px] xs:text-[26px]  mb-4 !font-extrabold ${montserrat_r.className}`}
        >
          As A Senior-Level Candidate You Have Already Realized That Finding A
          Job Is Tricky And Complicated
        </h2>
        <ul
          className={`text-[#595757] text-left list-disc list-inside space-y-2 mb-6 md:text-[25px] xs:text-[16px] ${montserrat_r.className} xs:px-2`}
        >
          <li>
            Most senior-level jobs that pay at least $150k+ are rarely announced
            to the general public and are kept strictly confidential.
          </li>
          <li>
            Technology has actually made it harder than ever to get hired;
            recruiters see hundreds and hundreds of resumes every day.
          </li>
          <li>
            98% of Fortune 500 companies and at least 66% of large companies use
            recruitment software (ATS), you can{"’"}t always outsmart an
            algorithm or a bloated corporate hiring system.
          </li>
        </ul>
        <p
          className={`text-gray-950 space-y-2 mb-6 md:text-[30px] xs:text-[24px] !font-extrabold ${montserrat_r.className}`}
        >
          To overcome these challenges, here is what we can do to help you find
          your dream job faster.
        </p>
        <p
          className={`text-[#595757]mb-6 md:text-[25px] xs:text-[16px] ${montserrat_r.className}`}
        >
          We will assign you a dedicated virtual assistant for 1-2 months to
          help you with your job search using the latest tools and techniques
          that put you in front of the decision makers and give you access to
          confidential and unannounced opportunities.
        </p>
      </div>
    </div>
  );
}

export default VideoSection;
