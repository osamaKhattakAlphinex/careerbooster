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
        <div className=" bg-gray-800 text-center p-10 rounded-full">
          <span className="text-4xl text-white">
            {basicInfo?.shortName ? basicInfo?.shortName : "CPH"}
          </span>
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
          <span className="w-full h-0 border border-gray-500 my-4"></span>
          <h3 className="uppercase text-xl font-semibold">Skills</h3>
          <span className="w-full h-0 border border-gray-500 my-4"></span>
          <ul className="flex flex-col gap-2 mb-4">
            <li className="font-semibold uppercase">primary</li>
            <li>Privacy Compliance</li>
            <li>Privacy Compliance</li>
            <li>Privacy Compliance</li>
            <li>Privacy Compliance</li>
            <li>Privacy Compliance</li>
            <li>Privacy Compliance</li>
          </ul>

          {/* Education */}
          <span className="w-full h-0 border border-gray-500 my-4"></span>
          <h3 className="uppercase text-xl font-semibold">Education</h3>
          <span className="w-full h-0 border border-gray-500 my-4"></span>
          <ul className="flex flex-col  mb-4">
            <li className="font-semibold uppercase">1994</li>
            <li className="uppercase">JURIS DOCTORATE </li>
            <li>New York University School of Law New York, NY</li>
          </ul>
          <ul className="flex flex-col  mb-4">
            <li className="font-semibold uppercase">1994</li>
            <li className="uppercase">JURIS DOCTORATE </li>
            <li>New York University School of Law New York, NY</li>
          </ul>
        </div>
        <div className="w-full flex flex-col px-8">
          {/* Executive Summary */}
          <span className="w-full h-0 border border-gray-500 my-4"></span>
          <h3 className="uppercase text-xl font-semibold">EXECUTIVE SUMMARY</h3>
          <span className="w-full h-0 border border-gray-500 my-4"></span>

          <p className="text-base">
            Accomplished professional with over four decades of experience as an
            Associate General Counsel, Chief Privacy Officer, and
            cross-functional leader. Demonstrated ability in designing,
            implementing, and enhancing strategic programs across legal,
            corporate, and entrepreneurial sectors. Proficient in achieving risk
            management, operational efficiency, and revenue goals. Recognized
            for exceptional communication skills, extensive data protection
            knowledge, and unwavering commitment to professional integrity.
            Boasting a career encompassing Fortune 500 corporations, legal
            consultancies, and entrepreneurial ventures, a unique blend of
            skills and insights is offered. A comprehensive background in data
            governance, privacy compliance, and commercial law positions for
            consideration in the Chief Security Officer role.
          </p>

          {/* Work Experience */}
          <span className="w-full h-0 border border-gray-500 my-4"></span>
          <h3 className="uppercase text-xl font-semibold">WORK EXPERIENCE</h3>
          <span className="w-full h-0 border border-gray-500 my-4"></span>
          <h2 className="text-2xl font-smibold">
            Vice President, Chief Privacy Officer, Associate General Counsel
          </h2>
          <h2 className="text-xl font-smibold mb-2">
            Jan 2016 – Present | BARNES & NOBLE EDUCATION, INC | Basking Ridge,
            NJ
          </h2>
          <div className="p-4">
            <ul className="flex flex-col gap-3">
              <li className="list-disc">
                Advised senior leadership and board on global privacy law
                matters, including GDPR and CCPA, ensuring regulatory
                compliance.
              </li>
              <li className="list-disc">
                Designed and executed enterprise-wide data privacy program,
                drafting policies and notices, enhancing data protection.
              </li>
              <li className="list-disc">
                Designed and executed enterprise-wide data privacy program,
                drafting policies and notices, enhancing data protection.
              </li>
            </ul>
          </div>

          <h2 className="text-2xl font-smibold">
            Vice President, Chief Privacy Officer, Associate General Counsel
          </h2>
          <h2 className="text-xl font-smibold mb-2">
            Jan 2016 – Present | BARNES & NOBLE EDUCATION, INC | Basking Ridge,
            NJ
          </h2>
          <div className="p-4">
            <ul className="flex flex-col gap-3">
              <li className="list-disc">
                Advised senior leadership and board on global privacy law
                matters, including GDPR and CCPA, ensuring regulatory
                compliance.
              </li>
              <li className="list-disc">
                Designed and executed enterprise-wide data privacy program,
                drafting policies and notices, enhancing data protection.
              </li>
              <li className="list-disc">
                Designed and executed enterprise-wide data privacy program,
                drafting policies and notices, enhancing data protection.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ResumeTemplate1;
