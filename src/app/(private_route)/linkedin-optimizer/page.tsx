"use client";
import HeadlineGenerator from "@/components/dashboard/linkedin-generator/HeadlineGenerator";

import AboutGenerator from "@/components/dashboard/linkedin-generator/AboutGenerator";
import JDGenerator from "@/components/dashboard/linkedin-generator/JDGenerator";
import KeywordsGenerator from "@/components/dashboard/linkedin-generator/KeywordsGenerator";
import { useSelector } from "react-redux";
import { useTourContext } from "@/context/TourContext";
import TourBot from "@/components/dashboard/TourBot";
import { useEffect } from "react";
import { RootState } from "@/store/store";

export default function LinkedInPage() {
  const {
    linkedinElementRef,
    linkedinAboutElementRef,
    linkedinHeadlineElementRef,
    linkedinJDElementRef,
    linkedinKeywordsElementRef,
    tourBotRef,
  } = useTourContext();
  const userData = useSelector((state: RootState) => state.userData);

  const tourBotConfig = {
    name: "linkedinOptimizer",
    audios: [
      {
        url: "/linkedin-headline-card-main.mp3",
        for: "headline",
      },
      {
        url: "/linkedin-about-card-main.mp3",
        for: "about",
      },
      {
        url: "/linkedin-jd-card-main.mp3",
        for: "job-description",
      },
      {
        url: "/linkedin-keywords-card-main.mp3",
        for: "keywords",
      },
    ],
    toolRefs: [
      {
        ref: linkedinHeadlineElementRef,
        for: "headline",
      },
      {
        ref: linkedinAboutElementRef,
        for: "about",
      },
      {
        ref: linkedinJDElementRef,
        for: "job-description",
      },
      {
        ref: linkedinKeywordsElementRef,
        for: "keywords",
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

  const creditLimits = useSelector((state: RootState) => state.creditLimits);
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
              ref={(ref: HTMLDivElement) => (linkedinElementRef.current = ref)}
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
