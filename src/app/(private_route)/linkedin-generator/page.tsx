"use client"
import Image from "next/image";
import Svg1 from "@/../public/icon/headline-icon.svg";
import LinkedinSingleTool from "@/components/new-dashboard/dashboard/linkedin-generator/LinkedinSingleTool";
import HeadlineGenerator from "@/components/new-dashboard/dashboard/linkedin-generator-old/HeadlineGenerator";
import { useState } from "react";
import AboutGenerator from "@/components/new-dashboard/dashboard/linkedin-generator-old/AboutGenerator";
import JDGenerator from "@/components/new-dashboard/dashboard/linkedin-generator-old/JDGenerator";
import KeywordsGenerator from "@/components/new-dashboard/dashboard/linkedin-generator-old/KeywordsGenerator";

export default function LinkedInPage() {
  const [keywords, setKeywords] = useState<string>("");
  const [headline, setHeadline] = useState<string>("");
  const [about, setAbout] = useState<string>("");
  const [jobDesc, setJobDesc] = useState<string>("");
  return (
    <div className="w-full sm:w-full z-1000 ">
      <div className="ml-0 lg:ml-[244px] px-[15px] lg:mb-[72px] my-5 ">
        <div className=" bg-[#18181B] rounded-[20px]   mb-7 px-4 lg:px-[30px] py-[35px]">
          <div className="flex justify-between items-center ">
            <h1 className="uppercase text-[14px] font-semibold text-white pb-4">
              AI LinkedIn Optimization tools
            </h1>
          </div>
          
          <HeadlineGenerator  setHeadline={setHeadline}  />

          <AboutGenerator  setAbout={setAbout} />
          <JDGenerator setJobDesc={setJobDesc} />
          <KeywordsGenerator setKeywords={setKeywords}  />

        </div>
      </div>
    </div>
  );
}
