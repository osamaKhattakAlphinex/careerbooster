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
      className="dark:bg-transparent dark:border-none dark:rounded-none rounded-md bg-[#ffffff94] border-[#b6b8b6]"
    >
      <Link
        href={link}
        className="flex flex-row items-start justify-between gap-2 p-3 text-white no-underline"
      >
        <div className="">
          <div
            className={`rounded-full flex justify-center items-center bg-gradient-to-b ${bgColor1} ${bgColor2} w-12 h-12 `}
          >
            <Image
              width={
                title !== "Resume Builder" &&
                title !== "AI Job Finder" &&
                title !== "ATS Scan Your Resume"
                  ? 48
                  : 36
              }
              height={
                title !== "Resume Builder" &&
                title !== "AI Job Finder" &&
                title !== "ATS Scan Your Resume"
                  ? 48
                  : 36
              }
              className="p-1 text-white"
              src={icon}
              alt="Not Found"
            />
          </div>
        </div>
        <div className="flex flex-col items-start justify-start">
          <h2 className="text-base font-semibold dark:text-white text-gray-950">
            {title}
          </h2>
          <p className=" flex-1 dark:text-[#959595]  text-gray-950 mt-[6px] font-normal text-sm ">
            {description}
          </p>
          <div className="align-bottom ">
            <Link
              href={link}
              className={`no-underline text-sm mt-[11px] flex items-center uppercase text-[#959595] dark:hover:text-gray-300 hover:text-gray-950 font-semibold`}
            >
              {action} <i className="ml-2">{chevronRight}</i>
            </Link>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ToolsCard;
