"use client";
import Link from "next/link";
import React, { ReactNode } from "react";
import { Fade, Slide } from "react-awesome-reveal";
interface ToolUsageProps {
  icon?: any;
  title: string;
  description: string;
  linkText?: string;
  link?: string;
}

const ToolUsage: React.FC<ToolUsageProps> = ({
  icon,
  title,
  description,
  linkText,
  link,
}) => {
  return (
    <div className="w-4/12 xs:w-full  sm:w-full md:w-4/12 lg:w-4/12 xl:w-4/12 px-2 md:py-3 h-full">
      <Slide
        duration={600}
        direction="up"
        className="flex xs:justify-center md:justify-start "
      >
        {icon && (
          <div className=" w-14 h-14 my-5  flex-shrink-0 align-center justify-center rounded-xl border-[1px] p-2  dark:text-[#e6f85e] text-[#6a4dff] dark:border-gray-600 border-gray-700 border-opacity-10 bg-[#464f6f] bg-opacity-[0.1] dark:bg-opacity-[0.2] ">
            {icon}
          </div>
        )}
        <div className="">
          <h5 className={` mb-4 text-gray-950 font-semibold dark:text-gray-100 md:text-xl xs:text-base ${!icon && "mt-6"}`}>
            {title}
          </h5>
          <p className="mb-0 text-gray-950 dark:text-gray-400 ">
            {description}
          </p>
        </div>
      </Slide>
      {link && (
        <Fade duration={3000}>
          <div className="flex-shrink-0 my-5">
            <Link
              href={link ? link : "#"}
              className="inline-flex no-underline justify-center group items-center relative  text-[#6a4dff] dark:text-[#e6f85e] gap-3 dark:after:bg-[#e6f85e] after:bg-[#0000ff9c] hover:text-[#6a4dff] after:content[''] after:absolute after:-bottom-[2px] after:left-0 after:w-0 after:h-[1px] after:ease-in-out after:duration-300  hover:after:w-[100%]"
            >
              <span className=" md:text-[16px] xs:text-sm">{linkText}</span>
              <svg
                className="w-[1rem] h-[1rem] "
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 12.6667L12.6667 4M12.6667 4V12.32M12.6667 4H4.34667"
                  stroke="currentColor"
                  strokeWidth="1.21"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </Fade>
      )}
    </div>
  );
};

export default ToolUsage;
