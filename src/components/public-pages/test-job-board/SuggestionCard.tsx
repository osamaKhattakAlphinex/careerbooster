import Link from "next/link";
import React from "react";

const SuggestionCard = ({ aiResumeSuggestions }) => {
  return (
    <>
      <div className="md:px-10  xs:px-4 ">
        <div className="flex flex-col w-full gap-4">
          <div className="w-full">
            <p className="font-semibold text-lg mb-4">
              Here are some suggestions based on your resume data:
            </p>
          </div>
          <div className="w-full">
            <ul className="list-disc">
              {aiResumeSuggestions.map((problem, index) => (
                <li key={index}>{problem}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="md:px-10  xs:px-4 ">
        <div className="w-full mb-3  flex flex-col justify-center items-center rounded-2xl mt-4 md:mt-14 bg-gradient-to-r to-fuchsia-600 from-indigo-500  border-gray-800 lg:px-10">
          <div className="lg:w-10/12 flex justify-center items-center flex-col lg:my-4 my-[28px] lg:mx-0 mx-5 ">
            <h3 className="lg:text-[35px] text-[16px] text-gray-100 text-normal text-center font-bold md:mt-2">
              Get Started with Our Tool to Get Better Resumes
            </h3>
            <p className="text-[12px] md:text-xl text-gray-100 text-normal text-center">
              Simply Upload your Existing Resume
            </p>
            <Link
              href="/register"
              className="bg-yellow-400 bg-opacity-80 mt-6 md:w-56 text-center rounded-full font-semibold text-[14px] md:text-lg hover:bg-yellow-600 text-gray-800 py-2 px-9"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuggestionCard;
