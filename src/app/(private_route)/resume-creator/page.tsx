"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import ResumeTemplate1 from "@/components/dashboard/resume-templates/template-1";

const ResumeCreator = () => {
  const { data: session, status } = useSession();

  return (
    <>
      <div className="m-10 w-[95%]  p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
        <div className="w-full card">
          <div className="space-y-4 md:space-y-6">
            <div>
              <label
                htmlFor="targetedJobPosition"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Targeted Job position
              </label>
              <input
                type="targetedJobPosition"
                name="targetedJobPosition"
                id="targetedJobPosition"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="The Job position for which you are creating a new Resume e.g. ReactJS Developer, SEO specialist etc"
              />
            </div>
            <div>
              <button className="bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                Generate Resume
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="m-10  w-[95%]  p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
        <div className="w-full card">
          <ResumeTemplate1 />
        </div>
      </div>
    </>
  );
};
export default ResumeCreator;
