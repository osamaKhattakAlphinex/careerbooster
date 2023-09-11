"use client";
import {
  briefCaseIcon,
  brushIcon,
  chatIcon,
  infoSmallIcon,
  pencilIcon,
  shockIcon,
  starsIcon,
} from "@/helpers/iconsProvider";
import Link from "next/link";
const ToolsCard = () => {
  return (
    <>
      {/* <div className="w-full  p-4  border border-gray-200 rounded-lg shadow sm:p-6   ">
    </div> */}
      <h5 className="mb-3 text-4xl font-bold   md:text-4xl   ">
        {starsIcon}
        AI Tools
      </h5>
      <ul className="flex flex-row  pl-0">
        <li className="w-1/3 ">
          <div className="h-[225px] min-h-full max-w-sm p-6  border border-gray-200 rounded-lg shadow  ">
            {chatIcon}
            <Link href="/chatAI" className="no-underline">
              <h5 className="mb-2 mt-4 text-lg font-semibold tracking-tight">
                Custom AI Chat Bot
              </h5>
            </Link>
            <p className="w-full mb-4 text-xs">
              This custom AI Chat bot is trained on your data and answers
              according to your Profile
            </p>
            <Link
              className=" bg-gray-800 text-sm text-white rounded-lg px-6 py-2 no-underline hover:bg-gray-950"
              href="/chatAI"
            >
              Launch
            </Link>
          </div>
        </li>
        <li className="w-1/3 ">
          <div className="h-[225px] min-h-full max-w-sm p-6  border border-gray-200 rounded-lg shadow  ">
            {shockIcon}
            <Link href="/resume-creator" className="no-underline">
              <h5 className="mb-2 mt-4 text-lg font-semibold tracking-tight  ">
                Resume Builder
              </h5>
            </Link>
            <p className="mb-4 text-xs  ">
              Create multiple AI Powered Resumes for multiple Job positions
            </p>
            <Link
              className=" bg-gray-800 text-xs text-white rounded-lg px-6 py-2 no-underline hover:bg-gray-950"
              href="/resume-creator"
            >
              Launch
            </Link>
          </div>
        </li>
        <li className="w-1/3 ">
          <div className="h-[225px] min-h-full max-w-sm p-6  border border-gray-200 rounded-lg shadow  ">
            {briefCaseIcon}
            <Link href="/linkedin-pdf-generator" className="no-underline">
              <h5 className="mb-2 mt-4 text-lg font-semibold tracking-tight  ">
                LinkedIn PDF Generator
              </h5>
            </Link>
            <p className="mb-4 text-xs  ">
              Generate PDF Report for your LinkedIn Profile based on your
              profile data
            </p>
            <Link
              className=" bg-gray-800 text-sm text-white rounded-lg px-6 py-2 no-underline hover:bg-gray-950"
              href="/linkedin-pdf-generator"
            >
              Launch
            </Link>
          </div>
        </li>
      </ul>
      <ul className="flex flex-row mt-8 pl-0">
        <li className="w-1/3 ">
          <div className="h-[225px] min-h-full max-w-sm p-6  border border-gray-200 rounded-lg shadow  ">
            {brushIcon}
            <Link href="/linkedin-optimization" className="no-underline">
              <h5 className="mb-2 mt-4 text-lg font-semibold tracking-tight  ">
                LinkedIn Profile Optimization
              </h5>
            </Link>
            <p className="mb-4 text-xs  ">
              Generate Keywords, About, Headline, Job descriptions for your
              LinkedIn Profile
            </p>
            <Link
              className=" bg-gray-800 text-sm text-white rounded-lg px-6 py-2 no-underline hover:bg-gray-950"
              href="/linkedin-optimization"
            >
              Launch
            </Link>
          </div>
        </li>
        <li className="w-1/3 ">
          <div className="h-[225px] min-h-full max-w-sm p-6  border border-gray-200 rounded-lg shadow  ">
            {pencilIcon}
            <Link href="/biography-writer" className="no-underline">
              <h5 className="mb-2 mt-4 text-lg font-semibold tracking-tight  ">
                Biography Writer
              </h5>
            </Link>
            <p className="mb-4 text-xs  ">
              AI will write a biography for you. According to your profile data
            </p>
            <Link
              className=" bg-gray-800 text-sm text-white rounded-lg px-6 py-2 no-underline hover:bg-gray-950"
              href="/biography-writer"
            >
              Launch
            </Link>
          </div>
        </li>
        <li className="w-1/3 "></li>
      </ul>
    </>
  );
};

export default ToolsCard;
