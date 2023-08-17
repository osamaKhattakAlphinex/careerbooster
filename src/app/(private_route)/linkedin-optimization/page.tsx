// "use client";

import AboutGenerator from "@/components/dashboard/linkedin-optimization/About Generator";
import HeadlineGenerator from "@/components/dashboard/linkedin-optimization/HeadlineGenerator";
import JDGenerator from "@/components/dashboard/linkedin-optimization/JDGenerator";
import KeywordsGenerator from "@/components/dashboard/linkedin-optimization/KeywordsGenerator";

const ResumeCreator = () => {
  return (
    <>
      <div className="flex m-10 gap-4">
        <div className="w-1/2 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
          <KeywordsGenerator />
        </div>
        <div className="w-1/2 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
          <HeadlineGenerator />
        </div>
      </div>

      <div className="flex m-10 gap-4">
        <div className="w-1/2 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
          <AboutGenerator />
        </div>
        <div className="w-1/2 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
          <JDGenerator />
        </div>
      </div>
    </>
  );
};
export default ResumeCreator;
