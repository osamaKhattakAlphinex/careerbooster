"use client";
import { useState } from "react";

type Education = {
  educationLevel: string;
  fieldOfStudy: string;
  schoolName: string;
  schoolLocation: string;
  fromMonth: string;
  fromYear: string;
  isContinue: boolean;
  toMonth: string;
  toYear: string;
};
export const Education = ({
  education,
  index,
  handleChange,
}: {
  education: Education;
  index: number;
  handleChange: any;
}) => {
  const [collapse, setCollapse] = useState<boolean>(true);

  return (
    <div className="rounded-md overflow-hidden">
      <div className="flex flex-row justify-between items-center p-4 bg-gray-100 shadow-md rounded-t-md">
        <div className="flex flex-col justify-start items-start ">
          <h1 className="text-sm font-bold uppercase w-full truncate text-gray-600">
            {education.educationLevel}
          </h1>
          <div className=" italic text-gray-400 text-xs font-semibold">
            <span>{education.fromYear}</span>
            <span>&nbsp; - &nbsp;</span>
            <span>{education.toYear}</span>
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
        <div className="flex flex-col gap-3 p-6 bg-gray-50 shadow-sm rounded-b-md overflow-hidden">
          <div className="grid grid-cols-3 gap-2">
            <div className="">
              <label htmlFor={`educationLevel_${index}`}>
                Education Level:
              </label>
              <input
                type="text"
                id={`educationLevel_${index}`}
                name={`educationLevel[${index}].educationLevel`}
                value={education.educationLevel}
                onChange={handleChange}
                className="p-2 w-full rounded-md bg-gray-100 text-gray-600"
              />
            </div>
            <div>
              <label htmlFor={`fieldOfStudy_${index}`}>Field Of Study:</label>
              <input
                type="text"
                id={`fieldOfStudy_${index}`}
                // name={`educations[${index}].fieldOfStudy`}
                value={education.fieldOfStudy}
                onChange={handleChange}
                className="p-2 w-full rounded-md bg-gray-100 text-gray-600"
              />
            </div>
            <div>
              <label htmlFor={`institute_${index}`}>Institute:</label>
              <input
                type="text"
                id={`institute_${index}`}
                name={`educations[${index}].schoolName`}
                value={education.schoolName}
                onChange={handleChange}
                className="p-2 w-full rounded-md bg-gray-100 text-gray-600"
              />
            </div>
            <div>
              <label htmlFor={`location_${index}`}>Location:</label>
              <input
                type="text"
                id={`location_${index}`}
                name={`educations[${index}].schoolLocation`}
                value={education.schoolLocation}
                onChange={handleChange}
                className="p-2 w-full rounded-md bg-gray-100 text-gray-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label htmlFor={`educationFromMonth_${index}`}>From Month:</label>
              <input
                type="text"
                id={`educationFromMonth_${index}`}
                name={`educations[${index}].toMonth`}
                value={education.fromMonth}
                onChange={handleChange}
                className="p-2 w-full rounded-md bg-gray-100 text-gray-600"
              />
            </div>

            <div>
              <label htmlFor={`educationFromYear_${index}`}>From Year:</label>
              <input
                type="text"
                id={`educationFromYear_${index}`}
                name={`educations[${index}].fromYear`}
                value={education.fromYear}
                onChange={handleChange}
                className="p-2 w-full rounded-md bg-gray-100 text-gray-600"
              />
            </div>
            <div>
              <label htmlFor={`educationToMonth_${index}`}>To Month:</label>
              <input
                type="text"
                id={`educationToMonth_${index}`}
                name={`educations[${index}].toMonth`}
                value={education.toMonth}
                onChange={handleChange}
                className="p-2 w-full rounded-md bg-gray-100 text-gray-600"
              />
            </div>
            <div>
              <label htmlFor={`educationToYear_${index}`}>To Year:</label>
              <input
                type="text"
                id={`educationToYear_${index}`}
                name={`educations[${index}].toYear`}
                value={education.toYear}
                onChange={handleChange}
                className="p-2 w-full rounded-md bg-gray-100 text-gray-600"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
