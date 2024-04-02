"use client";
import HeadlineGenerator from "@/components/dashboard/linkedin-generator-old/HeadlineGenerator";

import AboutGenerator from "@/components/dashboard/linkedin-generator-old/AboutGenerator";
import JDGenerator from "@/components/dashboard/linkedin-generator-old/JDGenerator";
import KeywordsGenerator from "@/components/dashboard/linkedin-generator-old/KeywordsGenerator";
import { leftArrowIcon } from "@/helpers/iconsProvider";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useTourContext } from "@/context/TourContext";
import TourBot from "@/components/dashboard/TourBot";
import { useEffect } from "react";

export default function LinkedInPage() {
  const { linkedinElementRef, tourBotRef } = useTourContext();
  const userData = useSelector((state: any) => state.userData);

  const tourBotConfig = {
    name: "linkedinOptimizer",
    audios: [
      {
        url: "/speech_linkedin_card.mp3",
        for: "linkedin",
      },
    ],
    toolRefs: [
      {
        ref: linkedinElementRef,
        for: "linkedin",
      },
    ],
  };

  useEffect(() => {
    if (userData && userData?.tours) {
      if (!userData.tours.linkedinOptimizer) {
        setTimeout(() => {
          tourBotRef?.current?.click();
        }, 500);
      }
    }
  }, [tourBotRef]);

  const creditLimits = useSelector((state: any) => state.creditLimits);
  return (
    <>
      <div className="w-full my-2 sm:w-full z-1000 ">
        <div className="ml-0 lg:ml-[234px] md:px-[15px] lg:mb-[72px]  ">
          <div className=" dark:bg-[#17151b] dark:text-white bg-[#00000015] text-gray-950  md:rounded-[20px]   mb-7 px-3 lg:px-[24px] py-4">
            <div className="flex justify-between items-center lg:h-[38px] ">
              <h1 className="capitalize text-[12px] pb-2 lg:text-[14px] font-semibold dark:text-gray-100 text-gray-950">
                Revolutionize Your LinkedIn with the Ultimate AI Tool
              </h1>
            </div>
            <div
              className="xs:mt-2 md:mt-5"
              ref={(ref: any) => (linkedinElementRef.current = ref)}
            >
              <HeadlineGenerator creditLimits={creditLimits} />
              <AboutGenerator creditLimits={creditLimits} />
              <JDGenerator creditLimits={creditLimits} />
              <KeywordsGenerator creditLimits={creditLimits} />
            </div>
          </div>
        </div>
      </div>

      <TourBot config={tourBotConfig} />
    </>
  );
}
