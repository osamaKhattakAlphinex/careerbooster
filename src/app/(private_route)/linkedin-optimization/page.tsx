"use client";
import { useState } from "react";
import AboutGenerator from "@/components/dashboard/linkedin-optimization/About Generator";
import HeadlineGenerator from "@/components/dashboard/linkedin-optimization/HeadlineGenerator";
import JDGenerator from "@/components/dashboard/linkedin-optimization/JDGenerator";
import KeywordsGenerator from "@/components/dashboard/linkedin-optimization/KeywordsGenerator";
// import DownloadDocx from "@/components/dashboard/linkedin-optimization/DownloadDocx";
import Link from "next/link";
import { leftArrowIcon } from "@/helpers/iconsProvider";

const ResumeCreator = () => {
  const [keywords, setKeywords] = useState<string>("");
  const [headline, setHeadline] = useState<string>("");
  const [about, setAbout] = useState<string>("");
  const [jobDesc, setJobDesc] = useState<string>("");

  return (
    <div className="mb-40">
      <div className="my-5 ml-10 pt-30 ">
        <Link
          href="/dashboard"
          className="flex flex-row gap-2 items-center hover:font-semibold transition-all"
        >
          {leftArrowIcon}
          Dashboard
        </Link>
      </div>
      <div className="flex m-10 mt-2 gap-4">
        <div className="w-full flex p-4  border border-gray-200 rounded-lg shadow sm:p-6">
          <h2 className="text-2xl mr-10">LinkedIn Optimization</h2>
          {/* <div className="">
            <DownloadDocx
              keywords={keywords}
              headline={headline}
              about={about}
              jobDesc={jobDesc}
            />
          </div> */}
        </div>
      </div>
      <div className="flex m-10 gap-4">
        <div className="w-1/2 p-4  border border-gray-200 rounded-lg shadow sm:p-6">
          <KeywordsGenerator setKeywords={setKeywords} />
        </div>
        <div className="w-1/2 p-4  border border-gray-200 rounded-lg shadow sm:p-6">
          <HeadlineGenerator setHeadline={setHeadline} />
        </div>
      </div>

      <div className="flex m-10 gap-4">
        <div className="w-1/2 xs:w-full p-4  border border-gray-200 rounded-lg shadow sm:p-6">
          <AboutGenerator setAbout={setAbout} />
        </div>
        <div className="w-1/2 xs:w-full p-4  border border-gray-200 rounded-lg shadow sm:p-6">
          <JDGenerator setJobDesc={setJobDesc} />
        </div>
      </div>
    </div>
  );
};
export default ResumeCreator;
