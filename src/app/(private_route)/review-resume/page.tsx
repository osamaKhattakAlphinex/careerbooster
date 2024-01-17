"use client";
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "@/store/userDataSlice";

import Link from "next/link";
import { leftArrowIcon } from "@/helpers/iconsProvider";

import { htmlToPlainText } from "@/helpers/HtmlToPlainText";
import copy from "clipboard-copy";

import LimitCard from "@/components/new-dashboard/dashboard/LimitCard";
import CoverLetterFileUploader from "@/components/new-dashboard/dashboard/cover-letter-generator/CoverLetterFileUploader";
import DownloadService from "@/helpers/downloadFile";

const ReviewResumeBot = () => {
  const componentRef = useRef<any>(null);
  const [aiInputUserData, setAiInputUserData] = useState<any>();
  const [msgLoading, setMsgLoading] = useState<boolean>(false); // msg loading
  const { data: session } = useSession();
  const [show, setShow] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>("file"); // type
  const [streamedData, setStreamedData] = useState<string>("");
  const [isCoverLetterCopied, setIsCoverLetterCopied] =
    useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<string>("");
  const [setSelectedResumeId, setSetSelectedResumeId] = useState<string>("");
  const [availablePercentage, setAvailablePercentage] = useState<number>(0);
  const [percentageCalculated, setPercentageCalculated] =
    useState<boolean>(false);

  // Redux
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.userData);
  const { resumes } = userData;
  const creditLimits = useSelector((state: any) => state.creditLimits);


  const handleGenerate = async () => {
    if (
      session?.user?.email &&
      aiInputUserData &&
      !isNaN(availablePercentage) &&
      availablePercentage !== 0
    ) {
      setMsgLoading(true);
      setShow(true);
      setStreamedData("");

      const obj: any = {
        type: selectedOption,
        email: session?.user?.email,
      };
      if (selectedOption === "file") {
        obj.file = selectedFile;
      } else if (selectedOption === "aiResume") {
        const foundResume = resumes.find(
          (resume: any) => resume.id === setSelectedResumeId
        );

        obj.userData = {
          jobTitle: foundResume.jobTitle,
          name: foundResume.name,
          primarySkills: foundResume.primarySkills,
          professionalSkills: foundResume.professionalSkills,
          secondarySkills: foundResume.secondarySkills,
          education: foundResume.secondarySkills,
          workExperienceArray: foundResume.workExperienceArray,
        };
      } else {
        obj.userData = aiInputUserData;
      }
      // Fetch keywords
      fetch("/api/reviewResumeBot/reviewBot", {
        method: "POST",
        body: JSON.stringify(obj),
      })
        .then(async (resp: any) => {
          if (resp.ok) {
            const reader = resp.body.getReader();
            while (true) {
              const { done, value } = await reader.read();
              if (done) {
                break;
              }
              const text = new TextDecoder().decode(value);
              setStreamedData((prev) => prev + text);
            }

            const updatedObject = {
              ...userData,
              userCredits: userData.userCredits - creditLimits.review_resume,

            };
            dispatch(setUserData({ ...userData, ...updatedObject }));


          } else {
            setStreamedData("Error! Something went wrong");
          }
        })
        .finally(() => {
          setMsgLoading(false);
        });
    }
  };
  const copyCoverLetter = async (text: string) => {
    try {
      const reviewResumeData = htmlToPlainText(text);
      await copy(reviewResumeData);
      setIsCoverLetterCopied(true);
      // Set isHeadlineCopied to false after a delay (e.g., 2000 milliseconds or 2 seconds)
      setTimeout(() => {
        setIsCoverLetterCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy text: ", error);
    }
  };
  useEffect(() => {
    if (userData && userData?.email) {
      setAiInputUserData({
        contact: userData?.contact,
        education: userData?.education,
        email: userData?.email,
        experience: userData?.experience,
        firstName: userData?.firstName,
        lastName: userData?.lastName,
        phone: userData?.phone,
        skills: userData?.skills,
      });
    }
  }, [userData]);
  return (
    <div className="w-full sm:w-full z-1000 ">
      <div className="ml-0 mt-0 lg:ml-[234px] px-[15px] lg:mb-[72px] ">
        <Link
          href="/dashboard"
          className="ml-2 my-4 no-underline dark:text-[#b324d7] dark:hover:text-[#e6f85e] text-gray-950 hover:text-[#b324d7] flex flex-row gap-2 items-center hover:opacity-80 transition-all"
        >
          {leftArrowIcon}
          Back
        </Link>
        <div className=" dark:bg-[#17151b] dark:text-white bg-[#00000015] text-gray-950 rounded-[20px] px-4 lg:px-[30px] py-8 lg:py-[41px] flex flex-col gap-5 ">
          {/* header */}
          <div className="flex flex-col gap-2 md:flex-row  justify-between items-center">
            <h3 className=" text-[16px] md:text-sm uppercase dark:text-gray-100 text-gray-950 font-bold">
              Get Your Resume Reviewed by AI
            </h3>
            <div className=" text-sm dark:text-gray-100 text-gray-950 uppercase font-bold">
              {/* <LimitCard
                title="Review Availble"
                limit={userData?.userPackageData?.limit?.review_resume}
                used={userData?.userPackageUsed?.review_resume}
                setPercentageCalculated={setPercentageCalculated}
                availablePercentage={availablePercentage}
                setAvailablePercentage={setAvailablePercentage}
              /> */}
            </div>
          </div>
          <div className="text-sm text-[#615DFF] self-start">
            <span className="uppercase text-[11px] md:text-sm font-bold block gro">
              select options
            </span>
          </div>
          <div className="flex flex-col gap-5 lg:px-0 ">
            <label
              htmlFor="default-radio-2"
              className={`flex gap-3 items-center rounded-full border-[1px] border-[#353672] px-4 lg:px-6 lg:py-3 py-3 cursor-pointer lg:text-[15px] text-[11px] dark:text-gray-100 text-gray-950 w-[220px] lg:w-[290px] ${selectedOption === "file" ? "border-[1px] border-[#615DFF]" : ""
                } `}
            >
              <input
                id="default-radio-2"
                type="radio"
                value="file"
                defaultChecked
                name="default-radio"
                onChange={(e) => {
                  setSelectedFile("");
                  setSelectedOption(e.target.value);
                }}
                className="w-4 h-4 border-[1px]"
                checked={selectedOption === "file"}
              />
              Choose a File to Review
            </label>
            {selectedOption == "file" ? (
              <CoverLetterFileUploader
                selectedFile={selectedFile}
                setSelectedFile={setSelectedFile}
              />
            ) : (
              ""
            )}
          </div>
          <div className="flex flex-wrap gap-5 items-start">
            {!isNaN(availablePercentage) && availablePercentage !== 0 && (
              <button
                type="button"
                disabled={
                  msgLoading ||
                  !session?.user?.email ||
                  !aiInputUserData ||
                  selectedOption === "" ||
                  (selectedOption === "file" && selectedFile === "") ||
                  (selectedOption === "aiResume" && setSelectedResumeId === "")
                }
                onClick={() => handleGenerate()}
                className={`dark:bg-gradient-to-r from-[#b324d7] to-[#615dff] dark:border-none dark:border-0 border border-gray-950 bg-transparent flex flex-row justify-center items-center gap-2 py-3 px-[28px] rounded-full ${(msgLoading ||
                  !session?.user?.email ||
                  !aiInputUserData ||
                  selectedOption === "" ||
                  (selectedOption === "file" && selectedFile === "") ||
                  (selectedOption === "aiResume" &&
                    setSelectedResumeId === "")) &&
                  "opacity-50 cursor-not-allowed" // Apply these styles when the button is disabled
                  }`}
              >
                <div className="flex flex-row gap-2">
                  <span className="dark:text-gray-100 text-gray-950 text-[15px] font-semibold">
                    {msgLoading ? (
                      <div className="flex">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className={`w-4 h-4 mr-3 ${msgLoading ? "animate-spin" : ""
                            }`}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                          />
                        </svg>
                        Please wait...
                      </div>
                    ) : (
                      <div className="flex">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4 dark:text-gray-100 text-gray-950"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                          />
                        </svg>

                        <span
                          className={`dark:text-gray-100 text-gray-950 ml-3 text-[15px] font-semibold cursor-pointer`}
                        >
                          Generate
                        </span>
                      </div>
                    )}
                  </span>
                </div>
              </button>
            )}
          </div>
          {show && (
            <div className="mt-[15px]">
              <h1 className="uppercase dark:text-gray-100 text-gray-950 font-bold text-[18px] pb-5">
                Get Your Resume Reviewed by AI
              </h1>
              <div
                className={`w-[100%] aigeneratedcoverletter flex flex-col gap-4 border-[#312E37] border rounded-[8px] p-[10px] md:[30px] shadow ${msgLoading ? "animate-pulse" : ""
                  }`}
              >
                <div
                  className="dark:text-gray-100 text-gray-950"
                  ref={componentRef}
                >
                  <div dangerouslySetInnerHTML={{ __html: streamedData }}></div>
                </div>
              </div>
              <div className="buttons mt-5 flex flex-col flex-wrap md:flex-row gap-3">
                <button
                  type="button"
                  disabled={
                    msgLoading ||
                    !session?.user?.email ||
                    !aiInputUserData ||
                    selectedOption === "" ||
                    (selectedOption === "file" && selectedFile === "") ||
                    (selectedOption === "aiResume" &&
                      setSelectedResumeId === "")
                  }
                  onClick={() => handleGenerate()}
                  className={`dark:bg-gradient-to-r from-[#b324d7] to-[#615dff] dark:border-none dark:border-0 border border-gray-950 bg-transparent flex flex-row justify-center items-center gap-2 py-3 px-[28px] rounded-full ${(msgLoading ||
                    !session?.user?.email ||
                    !aiInputUserData ||
                    selectedOption === "" ||
                    (selectedOption === "file" && selectedFile === "") ||
                    (selectedOption === "aiResume" &&
                      setSelectedResumeId === "")) &&
                    "opacity-50 cursor-not-allowed" // Apply these styles when the button is disabled
                    }`}
                >
                  <span className="dark:text-gray-100 text-gray-950 text-[15px] font-semibold">
                    {msgLoading ? (
                      <div className="flex">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className={`w-4 h-4 mr-3 ${msgLoading ? "animate-spin" : ""
                            }`}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                          />
                        </svg>
                        Please wait...
                      </div>
                    ) : (
                      <div className="flex">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4 dark:text-gray-100 text-gray-950"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                          />
                        </svg>
                        <span
                          className={`dark:text-gray-100 text-gray-950 ml-3 text-[15px] font-semibold cursor-pointer`}
                        >
                          Re-generate
                        </span>
                      </div>
                    )}
                  </span>
                </button>
                {show && (
                  <DownloadService
                    componentRef={componentRef}
                    type="onPage"
                    fileName="ai-review"
                  />
                )}
                {show && (
                  <button
                    disabled={
                      msgLoading ||
                      !session?.user?.email ||
                      !aiInputUserData ||
                      selectedOption === "" ||
                      (selectedOption === "file" && selectedFile === "") ||
                      (selectedOption === "aiResume" &&
                        setSelectedResumeId === "")
                    }
                    onClick={() => copyCoverLetter(streamedData)}
                    className={` flex flex-row justify-center items-center gap-2 py-3 px-[28px] dark:border-[#312e37] border border-[#b324d7] rounded-full ${msgLoading ||
                      !session?.user?.email ||
                      !aiInputUserData ||
                      selectedOption === "" ||
                      (selectedOption === "file" && selectedFile === "") ||
                      (selectedOption === "aiResume" &&
                        setSelectedResumeId === "")
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                      }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-4 h-4 dark:text-gray-100 text-gray-950"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
                      />
                    </svg>

                    <span className="dark:text-gray-100 text-gray-950 text-[15px] font-semibold">
                      {msgLoading
                        ? "Please wait..."
                        : isCoverLetterCopied
                          ? "Copied"
                          : "Copy to clipboard"}
                    </span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default ReviewResumeBot;
