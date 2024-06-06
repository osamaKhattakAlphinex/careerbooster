"use client";
import React, { useState } from "react";

const JobDescHandler = () => {
  const [jobDescription, setJobDescription] = useState<string>("");
  return (
    <div className="w-full ">
      <section className="hero bg-gradient-to-r from-gray-200 via-gray-200 to-gray-200 dark:from-[#01010D80] dark:via-[#000A6380] dark:to-purple-900 overflow-x-hidden md:px-0 pt-[52px]  lg:pt-[60px] ">
        <div className=" text-center px-24 ">
          <label className="flex items-center justify-between gap-1 mb-1 text-sm xs:font-semibold md:font-bold md:text-lg dark:text-gray-100 text-gray-950/80 lg:pb-4">
            <span className="text-[10px] md:text-sm dark:text-gray-100 text-gray-950 uppercase font-bold after:content-['*'] after:text-[#F04248] after:ml-1 py-4">
              Paste Job Description
            </span>
          </label>
          <textarea
            id="job-title"
            name="jobTitle"
            rows={6}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the job description for the position you are applying"
            className=" w-full px-3 lg:px-8 rounded-lg text-xs md:text-sm text-[#959595] bg-transparent border-[#312E37] border-[1px] pt-3"
          />
        <button
          type="button"
          className={`w-max flex flex-row transition-all duration-300  group justify-center sm:justify-start lg:px-6 px-4 py-2 mt-4 rounded-full dark:bg-gradient-to-r from-[#b324d7] to-[#615dff] dark:border-none dark:border-0 border-[1.5px] border-gray-950 bg-transparent ${
            jobDescription === "" && "opacity-50 cursor-not-allowed" // Apply these styles when the button is disabled
          }`}
        >
          Generation Potential Skills
        </button>
        </div>
      </section>
    </div>
  );
};

export default JobDescHandler;
