"use client";
import { boltIcon } from "@/helpers/iconsProvider";
import React, { useState } from "react";
import ScanScore from "./ScanScore";

const JobDescHandler = () => {
  const [jobDescription, setJobDescription] = useState<string>("");
  const [msgLoading, setMsgLoading] = useState<boolean>(false);
  const [potentialSkills, setPotentialSkills] = useState<string[]>([]);

  const getPotentialSkills = async () => {
    setMsgLoading(true);
    const response = await fetch("/api/resumeScan/potentialKeywordsFromJob", {
      method: "POST",
      body: JSON.stringify({
        jobDescription,
      }),
    });
    const data = await response.json();
    if (data.success) {
      let results;
      if (typeof data.result === "object") {
        results = data.result;
      } else {
        results = await JSON.parse(data.result);
      }
      setPotentialSkills(results.skills);
      setMsgLoading(false);
    } else {
      console.log(data.result);
      setMsgLoading(false);
    }
  };

  return (
    <div className="w-full ">
      <section className="hero bg-gradient-to-r from-gray-200 via-gray-200 to-gray-200 dark:from-[#01010D80] dark:via-[#000A6380] dark:to-purple-900 overflow-x-hidden md:px-0 pt-[52px]  lg:pt-[60px] ">
        <div className=" text-center px-4 md:px-24 ">
          <label className="flex items-center justify-between gap-1 mb-1 text-sm xs:font-semibold md:font-bold md:text-lg dark:text-gray-100 text-gray-950/80 lg:pb-4">
            <span className="text-[10px] md:text-sm dark:text-gray-100 text-gray-950 uppercase font-bold after:content-['*'] after:text-[#F04248] after:ml-1 py-4">
              Paste Job Description
            </span>
          </label>
          <textarea
            id="job-title"
            name="jobTitle"
            rows={10}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the job description for the position you are applying"
            className=" w-full px-3 lg:px-8 rounded-lg text-xs md:text-sm text-[#959595] bg-transparent border-[#312E37] border-[1px] pt-3"
          />
          <button
            type="button"
            onClick={getPotentialSkills}
            className={`w-max flex flex-row transition-all duration-300  group justify-center sm:justify-start lg:px-6 px-4 py-2 my-4 rounded-full dark:bg-gradient-to-r from-[#b324d7] to-[#615dff] dark:border-none dark:border-0 border-[1.5px] border-gray-950 bg-transparent ${
              jobDescription === "" && "opacity-50 cursor-not-allowed" // Apply these styles when the button is disabled
            }`}
          >
            {msgLoading ? (
              <div className="flex flex-row items-center justify-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className={`w-3 h-3 md:w-4 md:h-4 dark:text-gray-100 text-gray-950 ${
                    msgLoading ? "animate-spin" : ""
                  }`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
                <span className="text-xs capitalize dark:text-gray-300 group-hover:dark:text-gray-200 group-hover:font-semibold text-gray-950 md:text-sm">
                  Please wait...
                </span>
              </div>
            ) : (
              <div className="flex flex-row items-center justify-center gap-2">
                {boltIcon}

                <span className="text-xs capitalize dark:text-gray-300 group-hover:dark:text-gray-200 group-hover:font-semibold text-gray-950 md:text-sm">
                  Generate Potential Skills
                </span>
              </div>
            )}
          </button>
        </div>
        {potentialSkills && potentialSkills.length > 0 && (
          <div className="px-6 md:px-24">
            <label className="flex items-center justify-between gap-1 mb-1 text-sm xs:font-semibold md:font-bold md:text-lg dark:text-gray-100 text-gray-950/80 lg:pb-4">
              <span className="text-[10px] md:text-sm dark:text-gray-100 text-gray-950 uppercase font-bold py-4">
                Top Keywords
              </span>
            </label>
            <ul className="list-disc">
              {potentialSkills.map((potentialSkill, index) => (
                <li key={index} className="capitalize">
                  {potentialSkill}
                </li>
              ))}
            </ul>
           <ScanScore potentialSkills={potentialSkills}/>
          </div>
        )}
      </section>
    </div>
  );
};

export default JobDescHandler;
