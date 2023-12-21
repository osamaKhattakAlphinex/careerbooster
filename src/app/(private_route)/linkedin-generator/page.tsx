"use client";

import HeadlineGenerator from "@/components/new-dashboard/dashboard/linkedin-generator-old/HeadlineGenerator";
import { useState } from "react";
import AboutGenerator from "@/components/new-dashboard/dashboard/linkedin-generator-old/AboutGenerator";
import JDGenerator from "@/components/new-dashboard/dashboard/linkedin-generator-old/JDGenerator";
import KeywordsGenerator from "@/components/new-dashboard/dashboard/linkedin-generator-old/KeywordsGenerator";
import { leftArrowIcon } from "@/helpers/iconsProvider";
import Link from "next/link";

export default function LinkedInPage() {
  const [keywords, setKeywords] = useState<string>("");
  const [headline, setHeadline] = useState<string>("");
  const [about, setAbout] = useState<string>("");
  const [jobDesc, setJobDesc] = useState<string>("");
  return (
    <div className="w-full sm:w-full z-1000 ">
      <div className="ml-0 lg:ml-[234px] px-[15px] lg:mb-[72px]  ">
        <Link
          href="/linkedin-generator"
          className="ml-2 my-4 no-underline tback-btn-text flex flex-row gap-2 items-center hover:opacity-80 transition-all"
        >
          {leftArrowIcon}
          Back
        </Link>
        <div className=" single-service-bg  rounded-[20px]   mb-7 px-4 lg:px-[24px] py-[35px]">
          <div className="flex justify-between items-center lg:h-[38px] ">
            <h1 className="uppercase text-[12px] lg:text-[14px] font-semibold card-h2">
              AI LinkedIn Optimization tools
            </h1>
          </div>
          <div className="mt-5">
            <HeadlineGenerator setHeadline={setHeadline} />

            <AboutGenerator setAbout={setAbout} />
            <JDGenerator setJobDesc={setJobDesc} />
            <KeywordsGenerator setKeywords={setKeywords} />
          </div>
        </div>
      </div>
    </div>
  );
}
