"use client";
import { useEffect, useState } from "react";
// import { slugify } from "@/helpers/slugify";
import { useSearchParams } from "next/navigation";
import copy from "clipboard-copy";
import {
  clipboardIcon,
  refreshIconRotating,
  starIcon,
  uploadIcon,
} from "@/helpers/iconsProvider";
import Button from "../../utilities/form-elements/Button";
import LinkedInSummary from "./LinkedInSummary";
import Link from "next/link";

//Editable

const LinkedInUploadPDFResume = () => {
  const params = useSearchParams();
  const fileName: any = params?.get("fileName");

  // local states
  const [aboutMsgLoading, setAboutMsgLoading] = useState<boolean>(false); // msg loading for about section
  const [headlineMsgLoading, setHeadlineMsgLoading] = useState<boolean>(false); // msg loading for Headline  section
  const [fileError, setFileError] = useState<string>("");
  const [streamedHeadlineData, setStreamedHeadlineData] = useState("123");
  const [streamedAboutData, setStreamedAboutData] = useState("123");
  // Define a state variable to hold both first name and full name
  const [names, setNames] = useState({ firstName: "", fullName: "" });
  // Define state variables to track API call statuses
  const [headlineComplete, setHeadlineComplete] = useState<boolean>(false);
  const [aboutComplete, setAboutComplete] = useState<boolean>(false);
  const [aboutData, setAboutData] = useState<string>("about");
  const [instruction, setInstruction] = useState<string>("");
  const [isHeadlineCopied, setIsHeadlineCopied] = useState(false);
  const [isSummaryCopied, setIsSummaryCopied] = useState(false);
  const [isHeadlineEditing, setIsHeadlineEditing] = useState(false);
  const [isSummaryEditing, setIsSummaryEditing] = useState(false);
  // const uploadFileToServer = async () => {
  //   setFileError("");
  //   setFileUploading(true);
  //   setMsgLoading(true);
  //   if (file) {
  //     const body = new FormData();
  //     body.append("file", file);

  //     fetch("/api/fileUpload?type=linkedin-tool", {
  //       method: "POST",
  //       body,
  //     })
  //       .then(async (resp: any) => {
  //         const res = await resp.json();
  //         if (res.success) {
  //           const uploadedFileName = res.fileName + "_" + file.name;
  //           // setFileName(uploadedFileName);
  //           linkedinHeadline(uploadedFileName);
  //           linkedinAbout(uploadedFileName);

  //           // router.replace("/welcome?step=1");
  //           // router.replace("/register");
  //           // setSuccessMsg("File has been uploaded!");
  //         } else {
  //           setFileError("Something went wrong");
  //         }
  //       })
  //       .catch((error) => {
  //         setFileError("Something went wrong");
  //       })
  //       .finally(() => {
  //         setFileUploading(false);
  //         setMsgLoading(false);
  //         setUploadComplete(true);
  //       });
  //   }
  // };

  const linkedinHeadline = async (fileName: string) => {
    setStreamedHeadlineData("");
    setFileError("");
    setHeadlineMsgLoading(true);
    if (fileName) {
      fetch("/api/linkedInBots/linkedinHeadlineGenerator", {
        method: "POST",
        body: JSON.stringify({ fileName }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(async (resp: any) => {
          const res = await resp.json();
          if (res.data) {
            setStreamedHeadlineData(res.data);
          } else {
            setFileError("Something went wrong");
          }
        })
        .catch((error) => {
          setFileError("Something went wrong");
        })
        .finally(() => {
          setHeadlineMsgLoading(false);
          setHeadlineComplete(true);
        });
    } else if (!fileName) {
      setFileError("PDF Resume / CV is Required");
    }
  };

  const linkedinAbout = async (fileName: string) => {
    setStreamedAboutData("");
    setFileError("");
    setAboutMsgLoading(true);

    if (fileName) {
      fetch("/api/linkedInBots/linkedinAboutGenerator", {
        method: "POST",
        body: JSON.stringify({ fileName, option: aboutData, instruction }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(async (resp: any) => {
          const res = await resp.json();
          if (res.data && res.success) {
            setStreamedAboutData(res.data);
          } else {
            setFileError("Something went wrong");
          }
        })
        .catch((error) => {
          setFileError("Something went wrong");
        })
        .finally(() => {
          setAboutMsgLoading(false);
          setAboutComplete(true);
        });
    } else if (!fileName) {
      setFileError("PDF Resume / CV is Required");
    }
  };

  //Save User in DB
  const linkedinToolSaveUser = async (fileName: string) => {
    setFileError("");
    if (fileName) {
      fetch("/api/linkedInBots/LinkedinToolEntries", {
        method: "POST",
        body: JSON.stringify({ fileName }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(async (resp: any) => {
          const { firstName, fullName } = await resp.json();
          setNames({ firstName, fullName });
        })
        .catch((error) => {
          setFileError("Something went wrong");
        });
    } else if (!fileName) {
      setFileError("PDF Resume / CV is Required");
    }
  };
  const copyText = async () => {
    try {
      await copy(streamedHeadlineData);
      setIsHeadlineCopied(true);
    } catch (error) {
      console.error("Failed to copy text: ", error);
    }
  };
  const copySummary = async () => {
    try {
      await copy(streamedAboutData);
      setIsSummaryCopied(true);
    } catch (error) {
      console.error("Failed to copy text: ", error);
    }
  };

  useEffect(() => {
    if (params?.get("fileName")) {
      linkedinHeadline(fileName);
      linkedinAbout(fileName);
    }
  }, [params?.get("fileName")]);

  useEffect(() => {
    if (headlineComplete && aboutComplete) {
      // All APIs have completed, call linkedinToolSaveUser
      linkedinToolSaveUser(fileName);
    }
  }, [headlineComplete, aboutComplete, fileName]);

  return (
    <>
      {headlineMsgLoading || aboutMsgLoading ? (
        refreshIconRotating
      ) : (
        <div className="flex gap-2 text-[#33FF00] font-extrabold text-5xl mb-4">
          Success!
        </div>
      )}
      {fileError && (
        <div
          className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 my-2 !text-left w-[50%] m-auto"
          role="alert"
        >
          <p className="m-0">{fileError}</p>
        </div>
      )}
      {streamedHeadlineData || streamedAboutData ? (
        <div className=" my-3 w-full flex flex-col items-center">
          <div className="lg:p-6 border-2 border-purple-600 rounded-2xl w-11/12 ">
            <div className=" flex flex-col gap-4 bg-black div-m lg:p-12 rounded-2xl">
              {/* Headline */}
              <h1 className="text-4xl flex items-center font-normal mb-4 text-white">
                {/* <span className="text-yellow-400">{starIcon}</span> */}
                <span className="text-center heading1 lg:text-left text-2xl uppercase font-bold">
                  Your New LinkedIn Headline
                </span>
              </h1>

              {headlineMsgLoading ? (
                <div className="text-2xl text-white flex justify-center font-semibold">
                  {refreshIconRotating}
                </div>
              ) : (
                <>
                  {isHeadlineEditing ? (
                    <textarea
                      className="tracking-wider border-2 box lg:p-8 rounded-2xl border-gray-700 text-white"
                      value={streamedHeadlineData}
                      onChange={(e) => {
                        setStreamedHeadlineData(e.target.value);
                        setIsHeadlineCopied(false);
                      }}
                      autoFocus
                      rows={3}
                      cols={50}
                      onBlur={() => {
                        setIsHeadlineEditing(false);
                        setIsHeadlineCopied(false);
                      }}
                    />
                  ) : (
                    <div className="tracking-wider border-2 box lg:p-8 rounded-2xl border-gray-700 text-white">
                      {streamedHeadlineData}
                    </div>
                  )}
                  {streamedHeadlineData && (
                    <div className="flex flex-col div-1 lg:flex-row  gap-4">
                      <Button
                        type="button"
                        className="border-2 border-purple-600 rounded-full headline-btn lg:px-6 lg:py-2 hover:bg-purple-600 hover:text-white"
                        onClick={() => linkedinHeadline(fileName)}
                      >
                        <div className="flex gap-2 items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className={`w-4 h-4 ${
                              headlineMsgLoading ? "animate-spin" : ""
                            }`}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                            />
                          </svg>
                          <span>Re-Generate Headline</span>
                        </div>
                      </Button>
                      <Button
                        type="button"
                        className="border-2 border-indigo-600 rounded-full headlin-edit-btn lg:px-6 lg:py-2 hover:bg-indigo-600 hover:text-white"
                        onClick={() => {
                          setIsHeadlineEditing(true);
                          setIsHeadlineCopied(false);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        type="button"
                        className="border-2 border-gray-700  rounded-full px-6 py-2 hover:bg-gray-700 hover:text-white flex gap-2"
                        onClick={copyText}
                      >
                        {clipboardIcon}
                        {isHeadlineCopied ? "Copied!" : "Copy to Clipboard"}
                      </Button>
                    </div>
                  )}
                </>
              )}

              {/* Summary */}
              <h1 className="text-4xl flex items-center font-normal mb-4 text-white">
                {/* <span className="text-yellow-400">{starIcon}</span> */}
                <span className="text-center lg:text-left text-2xl uppercase font-bold">
                  Your Keyword Optimized LinkedIn Summary
                </span>
              </h1>

              {aboutMsgLoading ? (
                <div className="text-2xl text-white flex justify-center font-semibold">
                  {refreshIconRotating}
                </div>
              ) : (
                <>
                  {isSummaryEditing ? (
                    <textarea
                      className="tracking-wider border-2 box lg:p-8 rounded-2xl border-gray-700 text-white"
                      value={streamedAboutData}
                      onChange={(e) => {
                        setStreamedAboutData(e.target.value);
                        setIsSummaryCopied(false);
                      }}
                      autoFocus
                      rows={10}
                      cols={50}
                      onBlur={() => {
                        setIsSummaryEditing(false);
                        setIsSummaryCopied(false);
                      }}
                    />
                  ) : (
                    <div className="tracking-wider border-2 box lg:p-8 rounded-2xl border-gray-700 text-white">
                      {streamedAboutData}
                    </div>
                  )}
                  {streamedAboutData && (
                    <div className="flex gap-4 div-1">
                      <Button
                        type="button"
                        className="border-2 border-indigo-600 rounded-full px-6 py-2 hover:bg-indigo-600 hover-text-white"
                        onClick={() => {
                          setIsSummaryEditing(true);
                          setIsSummaryCopied(false);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        type="button"
                        className="border-2 border-gray-700 rounded-full px-6 py-2 flex gap-2 hover:bg-gray-700 hover-text-white"
                        onClick={copySummary}
                      >
                        {clipboardIcon}
                        {isSummaryCopied ? "Copied!" : "Copy to Clipboard"}
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        " "
      )}

      {streamedAboutData && (
        <div className="content-1 lg:mt-9 flex flex-col justify-center items-center gap-2">
          <h2 className="text-center lg:text-left text-red-600 ">
            Don{"'"}t Like the results?
          </h2>
          <p className="text-xl content-p lg:text-2xl">
            Change your preference and regenerate you summary
          </p>
          <div className="flex flex-col gap-4">
            <label
              htmlFor="default-radio-1"
              className="flex gap-3 redio-btn items-center rounded-full border-2 border-indigo-600 lg:px-8 lg:py-4 cursor-pointer"
            >
              <input
                id="default-radio-1"
                type="radio"
                value="about"
                name="default-radio"
                onChange={(e) => setAboutData(e.target.value)}
                className="w-5 h-5"
                checked={aboutData === "about"}
              />
              Use My Persona to write the Cover Letter
            </label>
            <label
              htmlFor="default-radio-2"
              className="flex gap-3 redio-btn  items-center rounded-full border-2 border-indigo-600 lg:px-8 lg:py-4 cursor-pointer"
            >
              <input
                id="default-radio-2"
                type="radio"
                value="jobDescription"
                name="default-radio"
                onChange={(e) => setAboutData(e.target.value)}
                className="w-5 h-5"
              />
              I need a shorter summary (Not Recommended)
            </label>
            <label
              htmlFor="default-radio-3"
              className="flex gap-3 redio-btn  items-center rounded-full border-2 border-indigo-600 lg:px-8 lg:py-4 cursor-pointer"
            >
              <input
                id="default-radio-3"
                type="radio"
                value="about"
                name="default-radio"
                onChange={(e) => setAboutData(e.target.value)}
                className="w-5 h-5"
              />
              Add a captivating story to hook the visitiors
            </label>
            <label
              htmlFor="default-radio-4"
              className="flex gap-3 redio-btn  items-center rounded-full border-2 border-indigo-600 lg:px-8 lg:py-4 cursor-pointer"
            >
              <input
                id="default-radio-4"
                type="radio"
                value="instruction"
                name="default-radio"
                onChange={(e) => setAboutData(e.target.value)}
                className="w-5 h-5"
              />
              I want to add my personalized instructions
            </label>
            {aboutData === "instruction" ? (
              <textarea
                className="tracking-wider text-area border-2 p-8 rounded-2xl border-gray-700 text-white"
                value={instruction} // Set the initial value
                onChange={(e) => setInstruction(e.target.value)}
                autoFocus
                rows={3}
                cols={50}
                placeholder="Enter Instruction"
              />
            ) : (
              ""
            )}
          </div>
          <Button
            type="button"
            className="flex gap-2 justify-center items-center text-lg text-white mt-6 bg-gradient-to-r from-purple-700 hover:translate-y-[-4px] transition-all duration-200 to-blue-400 px-6 py-3 rounded-full border shadow-md hover:shadow-lg"
            onClick={() => {
              linkedinAbout(fileName);
              setInstruction("");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className={`w-4 h-4 ${headlineMsgLoading ? "animate-spin" : ""}`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
            <span>Re-generate Summary</span>
          </Button>
          <LinkedInSummary
            fullName={names?.fullName}
            FirstName={names?.firstName}
          />
        </div>
      )}
      <div className="w-11/12 h-80 flex flex-col justify-center lg:items-center rounded-2xl mt-14 bg-gradient-to-r to-fuchsia-600 from-indigo-600  border-gray-800">
        <div className=" lg:w-6/12  flex items-center flex-col">
          <h3 className="lg:text-4xl text-normal  lg:leading-normal text-white text-center lg:font-bold ">
            Yes, I Want to Explore More Career Boosting Tools!
          </h3>
          <Link
            href="/register"
            className="mx-1 mt-8 p-3 text-lg my-2 bg-yellow-400 hover:bg-yellow-600  lg:w-8/12 lg:h-14 lg:mt-8 text-center rounded-full font-bold lg:text-xl text-black lg:py-3 lg:px-9 no-underline"
          >
            Click here to experience the magic
          </Link>
        </div>
      </div>
    </>
  );
};

export default LinkedInUploadPDFResume;
