"use client"
import Image from "next/image";
import Svg1 from "@/../public/icon/headline-icon.svg";
import LinkedinSingleTool from "@/components/new-dashboard/dashboard/linkedin-generator/LinkedinSingleTool";
import HeadlineGenerator from "@/components/new-dashboard/dashboard/linkedin-generator-old/HeadlineGenerator";
import { useState } from "react";
import AboutGenerator from "@/components/new-dashboard/dashboard/linkedin-generator-old/AboutGenerator";
import JDGenerator from "@/components/new-dashboard/dashboard/linkedin-generator-old/JDGenerator";
import KeywordsGenerator from "@/components/new-dashboard/dashboard/linkedin-generator-old/KeywordsGenerator";
// const linkedinComponentContent = [
//   {
//     hedline: "Headline Generator",
//     bgOfIcon: "bg-gradient-to-b from-[#5D26C1] to-[#A17FE0]",
//     bgOfPackageBadge: "bg-[#02FF19]",
//     textOfPackageBadge: "free",
//     description:
//       "The purpose of lorem ipsum is to create a natural looking block of text (sentence, paragraph, page, etc.)",
//     buttonText: "Generate Headline",
//     buttonBg: "bg-gradient-to-r from-[#B324D7] to-[#615DFF]",
//     buttonTextColor: "text-white",
//     buttonIconSrc: "/icon/u_bolt-alt.svg",
//   },
//   {
//     hedline: "About Generator",
//     bgOfIcon: "bg-gradient-to-b from-[#26A5C1] to-[#84E1E7]",
//     bgOfPackageBadge: "bg-[#02FF19]",
//     textOfPackageBadge: "free",
//     buttonBg: "bg-gradient-to-r from-[#B324D7] to-[#615DFF]",
//     buttonTextColor: "text-white",
//     description:
//       "The purpose of lorem ipsum is to create a natural looking block of text (sentence, paragraph, page, etc.)",
//     buttonText: "Generate Headline",
//     buttonIconSrc: "/icon/u_bolt-alt.svg",
//   },
//   {
//     hedline: "Job Description Generator",
//     bgOfIcon: "bg-gradient-to-b from-[#255CE7] to-[#7FA0E0]",
//     textOfPackageBadge: "Premium",
//     buttonBg: "bg-[#FEB602]",
//     buttonTextColor: "text-black",
//     bgOfPackageBadge: "bg-[#FEB602]",
//     description:
//       "The purpose of lorem ipsum is to create a natural looking block of text (sentence, paragraph, page, etc.)",
//     buttonText: "Upgrade Plan",

//     iconOfPackageBadge: "icon/crown.svg",
//   },
//   {
//     hedline: "Keywords Generator",
//     textOfPackageBadge: "Premium",
//     buttonBg: "bg-[#FEB602]",
//     buttonTextColor: "text-black",
//     bgOfIcon: "bg-gradient-to-b from-[#20AA89] to-[#65D4AC]",
//     bgOfPackageBadge: "bg-[#FEB602]",
//     description:
//       "The purpose of lorem ipsum is to create a natural looking block of text (sentence, paragraph, page, etc.)",
//     buttonText: "Upgrade Plan",

//     iconOfPackageBadge: "/icon/crown.svg",
//   },
// ];

export default function LinkedInPage() {
  const [keywords, setKeywords] = useState<string>("");
  const [headline, setHeadline] = useState<string>("");
  const [about, setAbout] = useState<string>("");
  const [jobDesc, setJobDesc] = useState<string>("");
  return (
    <div className="w-full sm:w-full z-1000 ">
      <div className="ml-0 lg:ml-[244px] px-[15px] lg:mb-[72px] ">
        <div className=" bg-[#18181B] rounded-[20px]   mb-7 px-[30px] py-[35px]">
          <div className="flex justify-between items-center ">
            <h1 className="uppercase text-[14px] font-semibold text-white pb-4">
              AI LinkedIn Optimization tools
            </h1>
          </div>
          {/* {linkedinComponentContent.map((item) => {
            return (
              <LinkedinSingleTool
                headline={item.hedline}
                bgOfIcon={item.bgOfIcon}
                bgOfPackageBadge={item.bgOfPackageBadge}
                textOfPackageBadge={item.textOfPackageBadge}
                iconOfPackageBadge={item.iconOfPackageBadge}
                description={item.description}
                buttonText={item.buttonText}
                buttonIconSrc={item.buttonIconSrc}
                buttonBg={item.buttonBg}
                buttonTextColor={item.buttonTextColor}
              />
            );
          })} */}
          <HeadlineGenerator  setHeadline={setHeadline}  />

          <AboutGenerator  setAbout={setAbout} />
          <JDGenerator setJobDesc={setJobDesc} />
          <KeywordsGenerator setKeywords={setKeywords}  />

        </div>
      </div>
    </div>
  );
}
