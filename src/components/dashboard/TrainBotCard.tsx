"use client";
import Link from "next/link";
const TrainBotCard = () => {
  return (
    <div className="w-full max-w-sm  p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
      <h5 className="mb-3 text-base font-semibold text-gray-900 md:text-xl dark:text-white">
        Train your Bot
      </h5>
      <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
        Upload Dcouments to Train your bot
      </p>
      <ul className="my-4 space-y-3">
        <li>
          <Link
            href="/upload-pdf"
            className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15"
              />
            </svg>

            <span className="flex-1 ml-3 whitespace-nowrap">
              Upload PDF Resume
            </span>
            <span className="inline-flex items-center justify-center px-2 py-0.5 ml-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400">
              Popular
            </span>
          </Link>
        </li>
        <li>
          <button
            onClick={() => alert("will be available soon")}
            className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15"
              />
            </svg>
            <span className="flex-1 ml-3 whitespace-nowrap">
              Upload Resume (Word File)
            </span>
          </button>
        </li>
      </ul>
      <div>
        <a
          href="#"
          className="inline-flex items-center text-xs font-normal text-gray-500 hover:underline dark:text-gray-400">
          <svg
            className="w-3 h-3 mr-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7.529 7.988a2.502 2.502 0 0 1 5 .191A2.441 2.441 0 0 1 10 10.582V12m-.01 3.008H10M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          Why do I need to upload Files?
        </a>
      </div>
    </div>
  );
};

export default TrainBotCard;
