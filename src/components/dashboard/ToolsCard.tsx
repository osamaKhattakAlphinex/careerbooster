"use client";
import { useTourContext } from "@/context/TourContext";
import { chevronRight } from "@/helpers/iconsProvider";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

const ToolsCard = ({
  title,
  description,
  link,
  icon,
  bgColor1,
  bgColor2,
  isActive,
  action,
}: {
  title: string;
  description: string;
  link: string;
  icon: any;
  bgColor1: string;
  bgColor2: string;
  isActive: boolean;
  action: string;
}) => {
  const {
    resumeElementRef,
    coverLetterElementRef,
    linkedinElementRef,
    emailElementRef,
    bidElementRef,
    coachElementRef,
    reviewElementRef,
    finderElementRef,
    atsElementRef,
  } = useTourContext();

  const getRef = (title: any, ref: any) => {
    switch (title) {
      case "Resume Builder":
        resumeElementRef.current = ref;
        break;
      case "Generator Cover Letters":
        coverLetterElementRef.current = ref;
        break;
      case "Keyword Optimize Your LinkedIn":
        linkedinElementRef.current = ref;
        break;
      case "Personalized Email Generator":
        emailElementRef.current = ref;
        break;
      case "Consulting Bids Generator":
        bidElementRef.current = ref;
        break;
      case "Career Coach":
        coachElementRef.current = ref;
        break;
      case "Review Resume by AI":
        reviewElementRef.current = ref;
        break;
      case "AI Job Finder":
        finderElementRef.current = ref;
        break;
      case "ATS Scan Your Resume":
        atsElementRef.current = ref;
        break;
      default:
        return null;
    }
  };
  return (
    <div
      ref={(ref) => getRef(title, ref)}
      className="lg:w-[32%] flex mb-8 dark:bg-transparent dark:border-none dark:rounded-none rounded-[20px] bg-[#ffffff94] border-[#b6b8b6]  p-3"
    >
      <Link href={link} className="flex text-white no-underline">
        <div className="mr-4">
          <div
            className={`rounded-full flex justify-center items-center bg-gradient-to-b ${bgColor1} ${bgColor2} w-[60px] h-[60px] `}
          >
            <Image
              width={
                title !== "Resume Builder" &&
                title !== "AI Job Finder" &&
                title !== "ATS Scan Your Resume"
                  ? 55
                  : 35
              }
              height={
                title !== "Resume Builder" &&
                title !== "AI Job Finder" &&
                title !== "ATS Scan Your Resume"
                  ? 55
                  : 35
              }
              className="text-white"
              src={icon}
              alt="Not Found"
            />
          </div>
        </div>
        <div className="">
          <h2 className="text-[16px] dark:text-white text-gray-950 font-semibold">
            {title}
          </h2>
          <p className=" dark:text-[#959595]  text-gray-950 mt-[6px] font-normal text-[14px] pr-2">
            {description}
          </p>
          <Link
            href={link}
            className={`no-underline text-[14px] mt-[11px] flex items-center uppercase text-[#959595] dark:hover:text-gray-100 hover:text-gray-950 font-semibold`}
          >
            {action} <i className="ml-2">{chevronRight}</i>
          </Link>
        </div>
      </Link>
    </div>
  );
};

export default ToolsCard;
