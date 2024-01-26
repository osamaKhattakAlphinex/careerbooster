"use client ";
import Image from "next/image";
import Svg1 from "@/../public/icon/headline-icon.svg";
import buttonIconSrc from "@/../public/icon/u_bolt-alt.svg";

import Link from "next/link";
import { useState } from "react";

const HeadlineGenerator = ({ creditLimits }: { creditLimits: any }) => {
  return (
    <>
      <Link className="no-underline" href="/linkedin-generator/headline">
        <div className="headline-generator dark:bg-[#222027] dark:text-gray-50 bg-[#ffffff94] text-gray-950 py-8 px-3 lg:px-6 flex flex-col md:flex-row md:align-center gap-5 justify-center items-center rounded-[10px] mb-[20px]">
          <div
            className={`icon  hidden rounded-full  bg-gradient-to-b from-[#5D26C1] to-[#A17FE0] md:flex justify-center items-center w-16 h-16`}
          >
            <Image
              alt="Svg1"
              src={Svg1}
              width={32}
              height={32}
              className="z-[10000px] "
            />
          </div>
          <div className="linkedintooltext flex  flex-col lg:w-[24.0625rem] gap-2 ml-2">
            <div className=" flex items-center xs:justify-between sm:justify-between gap-4 md:justify-start flex-row">
              <h1 className="text-[16px] dark:text-gray-100 text-gray-950 font-bold">
                Headline Generator
              </h1>
              <div
                className={`text-[#000] group relative rounded-full h-8 md:ml-3 flex justify-center items-center px-[16px] py-[6px]  bg-[#FEB602] xs:text-[10px] md:text-[12px]  font-bold `}
              >
                <div className="mr-1">
                  {creditLimits?.linkedin_headline_generation}{" "}
                </div>
                Credits
                <div className="w-44 bg-gradient-to-r  from-[#B324D7] to-[#615DFF] font-medium xs:text-[10px] md:text-[12px] px-2 absolute xs:-left-32 md:left-10 xs:-top-12  md:-top-14  hidden group-hover:block md:rounded-bl-none xs:rounded-br-none md:rounded-br-xl text-gray-100  mb-6 shadow-xl rounded-xl py-2  transition-all">
                  {creditLimits?.linkedin_headline_generation} credits will be
                  used for Headline Generation
                </div>
              </div>
            </div>
            <p className="text-[14px] text-[#959595] pr-5">
              Generate headline for your linkedin in one click
            </p>
          </div>

          <div
            // onClick={() => handleGenerate()}
            className={` bg-gradient-to-r  from-[#B324D7] to-[#615DFF] flex flex-row justify-center items-center gap-2 rounded-full px-[32px] py-[12px] md:ml-auto`}
          >
            <span className={`text-white text-[15px] font-semibold`}>
              <div className="flex">
                <Image
                  src={buttonIconSrc}
                  alt="bold icon"
                  height={18}
                  width={18}
                />
                <span
                  className={`text-white ml-3 text-[15px] font-semibold cursor-pointer no-underline`}
                >
                  Generate Headline
                </span>
              </div>
            </span>
          </div>
        </div>
      </Link>
    </>
  );
};

export default HeadlineGenerator;
