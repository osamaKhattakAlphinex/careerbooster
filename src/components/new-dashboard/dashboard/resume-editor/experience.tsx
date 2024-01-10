"use client";
import { useState } from "react";

export const WorkExperience = ({ experience, handleChange }: any) => {
  const [collapse, setCollapse] = useState<boolean>(true);

  return (
    <div className="rounded-lg bg-gray-100">
      <div className="flex flex-row justify-between items-center p-4  shadow-md rounded-t-lg">
        <div className="flex flex-col justify-start items-start">
          <h1 className="text-sm font-semibold uppercase w-full truncate text-gray-600">
            {experience.title}
          </h1>
          <div className="italic text-gray-400 text-xs font-semibold">
            <span>{experience.fromYear}</span>
            <span>&nbsp; - &nbsp;</span>
            {experience.isContinue ? (
              <span>Present</span>
            ) : (
              <span>{experience.toYear}</span>
            )}
          </div>
        </div>
        <button
          onClick={() => setCollapse(!collapse)}
          className=" border-none outline-none"
        >
          {collapse ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 15.75 7.5-7.5 7.5 7.5"
              />
            </svg>
          )}
        </button>
      </div>
      {!collapse && (
        <div className="flex flex-col gap-3 p-6 bg-gray-50 shadow-sm rounded-b-lg overflow-hidden">
          <div className="grid grid-cols-3 gap-2">
            <div className="">
              <label htmlFor={`workTitle_${experience.index}`}>
                Job Title:
              </label>
              <input
                type="text"
                id={`workTitle_${experience.index}`}
                name={`workExperiences[${experience.index}].title`}
                value={experience.title}
                onChange={handleChange}
                className="p-2 w-full rounded-md bg-gray-100 text-gray-600"
              />
            </div>
            <div>
              <label htmlFor={`workCompany_${experience.index}`}>
                Company:
              </label>
              <input
                type="text"
                id={`workCompany_${experience.index}`}
                name={`workExperiences[${experience.index}].company`}
                value={experience.company}
                onChange={handleChange}
                className="p-2 w-full rounded-md bg-gray-100 text-gray-600"
              />
            </div>
            <div>
              <label htmlFor={`workCountry_${experience.index}`}>
                Country:
              </label>
              <input
                type="text"
                id={`workCountry_${experience.index}`}
                name={`workExperiences[${experience.index}].country`}
                value={experience.country}
                onChange={handleChange}
                className="p-2 w-full rounded-md bg-gray-100 text-gray-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label htmlFor={`workFromMonth_${experience.index}`}>
                From Month:
              </label>
              <input
                type="text"
                id={`workFromMonth_${experience.index}`}
                name={`workExperiences[${experience.index}].fromMonth`}
                value={experience.fromMonth}
                onChange={handleChange}
                className="p-2 w-full rounded-md bg-gray-100 text-gray-600"
              />
            </div>

            <div>
              <label htmlFor={`workFromYear_${experience.index}`}>
                From Year:
              </label>
              <input
                type="text"
                id={`workFromYear_${experience.index}`}
                name={`workExperiences[${experience.index}].fromYear`}
                value={experience.fromYear}
                onChange={handleChange}
                className="p-2 w-full rounded-md bg-gray-100 text-gray-600"
              />
            </div>
            <div>
              <label htmlFor={`workToMonth_${experience.index}`}>
                To Month:
              </label>
              <input
                type="text"
                id={`workToMonth_${experience.index}`}
                name={`workExperiences[${experience.index}].toMonth`}
                value={experience.toMonth}
                onChange={handleChange}
                className="p-2 w-full rounded-md bg-gray-100 text-gray-600"
              />
            </div>
            <div>
              <label htmlFor={`workToYear_${experience.index}`}>To Year:</label>
              <input
                type="text"
                id={`workToYear_${experience.index}`}
                name={`workExperiences[${experience.index}].toYear`}
                value={experience.toYear}
                onChange={handleChange}
                className="p-2 w-full rounded-md bg-gray-100 text-gray-600"
              />
            </div>
            <div>
              <label htmlFor={`isContinue_${experience.index}`}>
                Currently Working:
              </label>
              <input
                type="text"
                id={`isContinue_${experience.index}`}
                name={`workExperiences[${experience.index}].isContinue`}
                value={experience.isContinue}
                onChange={handleChange}
                className="p-2 w-full rounded-md bg-gray-100 text-gray-600"
              />
            </div>
          </div>

          <div className="w-full flex flex-col gap-2">
            {experience.achivements &&
              experience.achivements.length > 0 &&
              experience.achivements.map(
                (achivement: string, index: number) => (
                  <textarea
                    key={index}
                    className=" w-full p-1 rounded-md bg-gray-100 text-gray-600"
                  >
                    {achivement}
                  </textarea>
                )
              )}
          </div>
          {/* Add other fields as needed */}
        </div>
      )}
    </div>
  );
};
