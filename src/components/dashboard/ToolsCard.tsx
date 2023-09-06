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
      {/* <div className="w-full  p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700 ">
    </div> */}
      <h5 className="mb-3 text-4xl font-bold  text-gray-900 md:text-4xl dark:text-white  ">
        {starsIcon}
        AI Tools
      </h5>
      <ul className="flex flex-row gap-4">
        <li>
          <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            {chatIcon}
            <Link href="/chatAI">
              <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                Custom AI Chat Bot
              </h5>
            </Link>
            <p className="w-full mb-4 text-sm text-gray-500 dark:text-gray-400">
              This custom AI Chat bot is trained on your data and answers
              according to your Profile
            </p>
            <Link
              className="bg-gray-800 text-white rounded-lg px-6 py-2"
              href="/chatAI">
              Launch
            </Link>
          </div>
        </li>
        <li>
          <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            {shockIcon}
            <Link href="/resume-creator">
              <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                Resume Builder
              </h5>
            </Link>
            <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
              Create multiple AI Powered Resumes for multiple Job positions
            </p>
            <Link
              className="bg-gray-800 text-white rounded-lg px-6 py-2"
              href="/resume-creator">
              Launch
            </Link>
          </div>
        </li>
        <li>
          <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            {briefCaseIcon}
            <Link href="/linkedin-pdf-generator">
              <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                LinkedIn PDF Generator
              </h5>
            </Link>
            <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
              Generate PDF Report for your LinkedIn Profile
            </p>
            <Link
              className="bg-gray-800 text-white rounded-lg px-6 py-2"
              href="/linkedin-pdf-generator">
              Launch
            </Link>
          </div>
        </li>
        <li>
          <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            {brushIcon}
            <Link href="/linkedin-optimization">
              <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                LinkedIn Profile Optimization
              </h5>
            </Link>
            <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
              Generate Keywords, About, Headline, Job descriptions for your
              LinkedIn Profile
            </p>
            <Link
              className="bg-gray-800 text-white rounded-lg px-6 py-2"
              href="/linkedin-optimization">
              Launch
            </Link>
          </div>
        </li>
      </ul>
      <ul className="flex flex-row gap-4">
        <li>
          <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            {pencilIcon}
            <Link href="/biography-writer">
              <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                Biography Writer
              </h5>
            </Link>
            <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
              AI will write a biography for you. According to your profile data
            </p>
            <Link
              className="bg-gray-800 text-white rounded-lg px-6 py-2"
              href="/biography-writer">
              Launch
            </Link>
          </div>
        </li>
      </ul>
    </>
  );
};

export default ToolsCard;
