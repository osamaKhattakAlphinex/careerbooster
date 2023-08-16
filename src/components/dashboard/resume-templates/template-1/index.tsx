"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const ResumeTemplate1 = ({ basicInfo }: any) => {
  return (
    <div className="w-full">
      <div className="flex">
        <div className="flex flex-col w-10/12 p-8">
          <h2 className="text-4xl">
            {basicInfo?.name ? basicInfo?.name : "FULL NAME"}
          </h2>
          <h3 className="text-xl">
            {basicInfo?.jobTitle ? basicInfo?.jobTitle : "JOB TITLE"}
          </h3>
        </div>
        <div>
          <div className="w-32 h-32 bg-gray-800 text-center p-10 rounded-full">
            <span className="text-4xl text-white">
              {basicInfo?.shortName ? basicInfo?.shortName : "CPH"}
            </span>
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="w-1/4 flex flex-col px-8 border-r-2">
          {/* contacts */}
          <span className="w-full h-0 border border-gray-500 my-4"></span>
          <h3 className="uppercase text-xl font-semibold">Contacts</h3>
          <span className="w-full h-0 border border-gray-500 my-4"></span>
          <ul className="flex flex-col gap-3 mb-4">
            <li>
              {basicInfo?.contact?.phone
                ? basicInfo?.contact?.phone
                : "+92 312 1231234"}
            </li>
            <li>
              {basicInfo?.contact?.email
                ? basicInfo?.contact?.email
                : "your@email.com"}
            </li>
            <li>
              <a
                href={
                  basicInfo?.contact?.linkedIn
                    ? basicInfo?.contact?.linkedIn
                    : "https://www.linkedin.com/"
                }
                className="text-blue-600">
                {basicInfo?.contact?.linkedIn
                  ? basicInfo?.contact?.linkedIn
                  : "https://www.linkedin.com/"}
              </a>
            </li>
          </ul>

          {/* Skills */}

          {basicInfo?.primarySkills && basicInfo?.primarySkills.length > 0 && (
            <>
              <span className="w-full h-0 border border-gray-500 my-4"></span>
              <h3 className="uppercase text-xl font-semibold">Skills</h3>
              <span className="w-full h-0 border border-gray-500 my-4"></span>
              <ul className="flex flex-col gap-2 mb-4">
                <li className="font-semibold uppercase">primary</li>
                {basicInfo?.primarySkills.map((skill: string, i: number) => (
                  <li key={i}>{skill}</li>
                ))}
              </ul>
            </>
          )}

          {/* Education */}
          {basicInfo?.education && (
            <>
              <span className="w-full h-0 border border-gray-500 my-4"></span>
              <h3 className="uppercase text-xl font-semibold">Education</h3>
              <span className="w-full h-0 border border-gray-500 my-4"></span>
              <ul className="flex flex-col  mb-4">
                <li className="font-semibold uppercase">
                  {basicInfo?.education?.year}
                </li>
                <li className="uppercase">{basicInfo?.education?.degree} </li>
                <li>{basicInfo?.education?.school}</li>
              </ul>
            </>
          )}

          {/* Skills */}
          {basicInfo?.professionalSkills &&
            basicInfo?.professionalSkills.length > 0 && (
              <>
                <span className="w-full h-0 border border-gray-500 my-4"></span>
                <h3 className="uppercase text-xl font-semibold">Skills</h3>
                <span className="w-full h-0 border border-gray-500 my-4"></span>
                <ul className="flex flex-col gap-2 mb-4">
                  <li className="font-semibold uppercase">Professional</li>
                  {basicInfo?.professionalSkills.map(
                    (skill: string, i: number) => (
                      <li key={i}>{skill}</li>
                    )
                  )}
                </ul>
              </>
            )}

          {/* Skills */}

          {basicInfo?.secondarySkills &&
            basicInfo?.secondarySkills.length > 0 && (
              <>
                <span className="w-full h-0 border border-gray-500 my-4"></span>
                <h3 className="uppercase text-xl font-semibold">Skills</h3>
                <span className="w-full h-0 border border-gray-500 my-4"></span>
                <ul className="flex flex-col gap-2 mb-4">
                  <li className="font-semibold uppercase">secondary</li>
                  {basicInfo?.secondarySkills.map(
                    (skill: string, i: number) => (
                      <li key={i}>{skill}</li>
                    )
                  )}
                </ul>
              </>
            )}
        </div>
        <div className="w-full flex flex-col px-8">
          {/* Executive Summary */}
          <span className="w-full h-0 border border-gray-500 my-4"></span>
          <h3 className="uppercase text-xl font-semibold">EXECUTIVE SUMMARY</h3>
          <span className="w-full h-0 border border-gray-500 my-4"></span>

          <p className="text-base">{basicInfo?.summary}</p>

          {/* Work Experience */}
          <span className="w-full h-0 border border-gray-500 my-4"></span>
          <h3 className="uppercase text-xl font-semibold">WORK EXPERIENCE</h3>
          <span className="w-full h-0 border border-gray-500 my-4"></span>
          {/* {basicInfo?.workExperience} */}
          {basicInfo?.workExperience &&
            basicInfo?.workExperience.map((record: any, i: number) => {
              const { fields: rec } = record;
              return (
                <div key={i}>
                  <h2 className="text-2xl font-smibold">{rec?.title}</h2>
                  <h2 className="text-xl font-smibold mb-2">
                    {rec?.from} - {rec?.to} | {rec?.company} |{" "}
                    {rec?.companyAddress}
                  </h2>
                  <div className="p-4">
                    {rec?.achievements && (
                      <ul className="flex flex-col gap-3">
                        {rec?.achievements.map(
                          (achivement: any, ind: number) => (
                            <li className="list-disc" key={ind}>
                              {achivement}
                            </li>
                          )
                        )}
                      </ul>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
export default ResumeTemplate1;
