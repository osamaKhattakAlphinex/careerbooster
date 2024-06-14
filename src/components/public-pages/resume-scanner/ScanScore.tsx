"use client";
import { refreshIconRotating, uploadIcon } from "@/helpers/iconsProvider";
import React, { useState } from "react";
import "@/styles/ScoreRing.css";
import Link from "next/link";

const ScanScore = ({ potentialSkills }) => {
  const [gettingScore, setGettingScore] = useState<boolean>(false);
  const [aiResumeScore, setAiResumeScore] = useState<number>(0);
  const [aiKeywordsScore, setAiKeywordsScore] = useState<number>(0);
  const [aiResumeKeywords, setAiResumeKeywords] = useState<string[]>([]);
  const [aiResumeProblems, setAiResumeProblems] = useState<string[]>([]);
  const [fileUploading, setFileUploading] = useState<boolean>(false);
  const [uploadComplete, setUploadComplete] = useState<boolean>(false);
  const [uploadCompleteText, setUploadCompleteText] = useState<string>("");
  const [missingKeywords, setMissingKeywords] = useState<string[]>([]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFileUploading(true);
    const fileInput = e.target;
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      const formData = new FormData();
      formData.append("file", fileInput.files[0]);
      try {
        const response = await fetch("/api/resumeScan/resumeAnalysis", {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        if (data.success) {
          setAiResumeKeywords(data.result.keywords);
          setAiResumeProblems(data.result.problems);
          setAiResumeScore(data.result.score);
          setUploadCompleteText("Resume Scanned Successfully");
          setFileUploading(false);
          setUploadComplete(true);
        }
      } catch (error) {
        setFileUploading(false);
        console.log(error);
      }
    }
  };

  const getResumeScore = async () => {
    setGettingScore(true);
    try {
      const response = await fetch("/api/resumeScan/matchingKeywords", {
        method: "POST",
        body: JSON.stringify({
          potentialSkills,
          aiResumeKeywords,
        }),
      });
      const data = await response.json();
      
      if (data.success) {
        let obj;
        if (typeof data.result === "object") {
          obj = data.result;
        } else {
          obj = await JSON.parse(data.result);
        }
        const score = Math.round(
          (obj.matchingKeywords.length / potentialSkills.length) * 100
        );
        setAiKeywordsScore(score);
        setMissingKeywords(obj.missingKeywords);
        setGettingScore(false);
      }
    } catch (error) {
      console.log(error);
      setGettingScore(false);
    }
  };
  const getColor = (score: number): string => {
    if (score > 70) {
      return "#4CC790"; // Green
    } else if (score > 50) {
      return "#FFEB3B"; // Yellow
    } else {
      return "#F44336"; // Red
    }
  };
  return (
    <div className="w-full ">
      <div className=" text-center px-4 md:px-24 ">
        <div className="linkedinPdfButton flex justify-center mt-11 md:mt-11">
          <label className=" py-2 lg:py-2.5 mb-4  lg:px-[40px]  px-[28px] cursor-pointer  rounded-xl bg-gradient-to-r to-violet-500 from-fuchsia-500">
            <input
              type="file"
              className="hidden "
              disabled={fileUploading}
              onChange={(e) => {
                handleFileChange(e);
              }}
            />
            {fileUploading ? (
              <p className="text-gray-100">{refreshIconRotating}</p>
            ) : (
              <div className="flex gap-2 ">
                <div className="text-gray-100">{uploadIcon}</div>
                <div className="text-center ">
                  <p className="text-gray-100 m-0 font-semibold whitespace-nowrap lg:text-[20px] cursor-pointer text-[14px] lg:leading-6 leading-4[text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]">
                    Now Upload Resume
                  </p>
                  <p className=" text-gray-100 lg:text-[14px] text-[10px] lg:leading-4 leading-[14px] pt-2">
                    No credits required
                  </p>
                </div>
              </div>
            )}
          </label>
        </div>
        {uploadComplete && uploadCompleteText !== "" && (
          <div
            className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 my-2!text-left w-[50%] m-auto"
            role="alert"
          >
            <p className="m-0">{uploadCompleteText}</p>
          </div>
        )}
        {uploadComplete && (
          <div
            className=" flex justify-center mt-11 md:mt-11"
            onClick={getResumeScore}
          >
            <label className=" py-2 lg:py-2.5 mb-4  lg:px-[40px]  px-[28px] cursor-pointer  rounded-xl bg-gradient-to-r to-violet-500 from-fuchsia-500">
              <div className="flex gap-2 ">
                {gettingScore ? (
                  <p className="text-gray-100">{refreshIconRotating}</p>
                ) : (
                  <div className="text-center ">
                    <p className="m-0 font-semibold text-gray-100 whitespace-nowrap lg:text-[20px] cursor-pointer text-[14px] lg:leading-6 leading-4[text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]">
                      Click to Get Your Resume Score
                    </p>
                    <p className="lg:text-[14px] text-[10px] text-gray-100 lg:leading-4 leading-[14px] pt-2">
                      No credits required
                    </p>
                  </div>
                )}
              </div>
            </label>
          </div>
        )}
      </div>
      <div className="flex flex-col md:flex-row gap-8 my-4">
        {aiKeywordsScore !== 0 && (
          <div className="flex flex-col w-full md:w-1/2 gap-4">
            <div className="w-full">
              <p className="font-semibold text-lg">Keywords Score</p>
              <svg viewBox="0 0 36 36" className="circular-chart">
                <path
                  className="circle"
                  strokeDasharray={`${aiKeywordsScore}, 100`}
                  stroke={getColor(aiKeywordsScore)}
                  d="M18 2.0845
      a 15.9155 15.9155 0 0 1 0 31.831
      a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <text
                  x="18"
                  y="20.35"
                  fill="currentColor"
                  className="percentage"
                >
                  {aiKeywordsScore}%
                </text>
              </svg>
            </div>

            <div className="w-full">
              {missingKeywords.length > 0 && (
                <>
                  <p className="font-semibold text-lg">Missing Keywords</p>
                  <ul className="list-disc">
                    {missingKeywords.map((problem, index) => (
                      <li key={index}>{problem}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        )}
        {aiKeywordsScore !== 0 && (
          <div className="flex w-full md:w-1/2 flex-col gap-4">
            <div className="w-full">
              <p className="font-semibold text-lg">Overall Resume Score</p>
              <svg viewBox="0 0 36 36" className="circular-chart">
                <path
                  className="circle"
                  strokeDasharray={`${aiResumeScore}, 100`}
                  stroke={getColor(aiResumeScore)}
                  d="M18 2.0845
      a 15.9155 15.9155 0 0 1 0 31.831
      a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <text
                  x="18"
                  y="20.35"
                  fill="currentColor"
                  className="percentage"
                >
                  {aiResumeScore}%
                </text>
              </svg>
            </div>

            <div className="w-full">
              {aiResumeProblems.length > 0 && (
                <>
                  <p className="font-semibold text-lg">Problems with Resume</p>
                  <ul className="list-disc">
                    {aiResumeProblems.map((problem, index) => (
                      <li key={index}>{problem}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {aiResumeScore !== 0 && (
        <div className="md:px-10  xs:px-4 ">
          <div className="w-full mb-3  flex flex-col justify-center items-center rounded-2xl mt-4 md:mt-14 bg-gradient-to-r to-fuchsia-600 from-indigo-500  border-gray-800 lg:px-10">
            <div className="lg:w-10/12 flex justify-center items-center flex-col lg:my-4 my-[28px] lg:mx-0 mx-5 ">
              <h3 className="lg:text-[35px] text-[16px] text-gray-100 text-normal text-center font-bold md:mt-2">
                Get Started with Our Tool to Get Better Scores and Become Top
                Candidate
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
      )}
    </div>
  );
};

export default ScanScore;
