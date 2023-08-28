"use client";

import { useSelector } from "react-redux";

const ResumeTemplate1 = ({
  streamedSummaryData,
}: {
  streamedSummaryData: string;
}) => {
  const resume = useSelector((state: any) => state.resume);
  return (
    <div className="w-full">
      <div className="flex">
        <div className="flex flex-col w-10/12 p-8">
          <h2 className="text-4xl">
            {resume?.name ? resume?.name : "FULL NAME"}
          </h2>
          <h3 className="text-xl">
            {resume?.jobTitle ? resume?.jobTitle : "JOB TITLE"}
          </h3>
        </div>
        <div>
          <div className="w-32 h-32 bg-gray-800 text-center p-10 rounded-full">
            <span className="text-4xl text-white">
              {resume?.shortName ? resume?.shortName : "CPH"}
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
              {resume?.contact?.phone
                ? resume?.contact?.phone
                : "+92 312 1231234"}
            </li>
            <li>
              {resume?.contact?.email
                ? resume?.contact?.email
                : "your@email.com"}
            </li>
            <li>
              <a
                href={
                  resume?.contact?.linkedIn
                    ? resume?.contact?.linkedIn
                    : "https://www.linkedin.com/"
                }
                className="text-blue-600"
              >
                {resume?.contact?.linkedIn
                  ? resume?.contact?.linkedIn
                  : "https://www.linkedin.com/"}
              </a>
            </li>
          </ul>

          {/* Skills */}

          {resume?.primarySkills && resume?.primarySkills.length > 0 && (
            <>
              <span className="w-full h-0 border border-gray-500 my-4"></span>
              <h3 className="uppercase text-xl font-semibold">Skills</h3>
              <span className="w-full h-0 border border-gray-500 my-4"></span>
              <ul className="flex flex-col gap-2 mb-4">
                <li className="font-semibold uppercase">primary</li>
                {resume?.primarySkills.map((skill: string, i: number) => (
                  <li key={i}>{skill}</li>
                ))}
              </ul>
            </>
          )}

          {/* Education */}
          {resume?.education && (
            <>
              <span className="w-full h-0 border border-gray-500 my-4"></span>
              <h3 className="uppercase text-xl font-semibold">Education</h3>
              <span className="w-full h-0 border border-gray-500 my-4"></span>
              <ul className="flex flex-col  mb-4">
                <li className="font-semibold uppercase">
                  {resume?.education?.year}
                </li>
                <li className="uppercase">{resume?.education?.degree} </li>
                <li>{resume?.education?.school}</li>
              </ul>
            </>
          )}

          {/* Skills */}
          {resume?.professionalSkills &&
            resume?.professionalSkills.length > 0 && (
              <>
                <span className="w-full h-0 border border-gray-500 my-4"></span>
                <h3 className="uppercase text-xl font-semibold">Skills</h3>
                <span className="w-full h-0 border border-gray-500 my-4"></span>
                <ul className="flex flex-col gap-2 mb-4">
                  <li className="font-semibold uppercase">Professional</li>
                  {resume?.professionalSkills.map(
                    (skill: string, i: number) => (
                      <li key={i}>{skill}</li>
                    )
                  )}
                </ul>
              </>
            )}

          {/* Skills */}

          {resume?.secondarySkills && resume?.secondarySkills.length > 0 && (
            <>
              <span className="w-full h-0 border border-gray-500 my-4"></span>
              <h3 className="uppercase text-xl font-semibold">Skills</h3>
              <span className="w-full h-0 border border-gray-500 my-4"></span>
              <ul className="flex flex-col gap-2 mb-4">
                <li className="font-semibold uppercase">secondary</li>
                {resume?.secondarySkills.map((skill: string, i: number) => (
                  <li key={i}>{skill}</li>
                ))}
              </ul>
            </>
          )}
        </div>
        <div className="w-full flex flex-col px-8">
          {/* Executive Summary */}
          <span className="w-full h-0 border border-gray-500 my-4"></span>
          <h3 className="uppercase text-xl font-semibold">EXECUTIVE SUMMARY</h3>
          <span className="w-full h-0 border border-gray-500 my-4"></span>

          <p className="text-base">
            {streamedSummaryData && streamedSummaryData}
          </p>

          {/* Work Experience */}
          <span className="w-full h-0 border border-gray-500 my-4"></span>
          <h3 className="uppercase text-xl font-semibold">WORK EXPERIENCE</h3>
          <span className="w-full h-0 border border-gray-500 my-4"></span>
          {resume?.workExperience &&
            resume?.workExperience.map((record: any, i: number) => {
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
