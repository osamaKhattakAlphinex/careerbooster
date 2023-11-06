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
  const [msgLoading, setMsgLoading] = useState<boolean>(false); // msg loading
  const [aboutMsgLoading, setAboutMsgLoading] = useState<boolean>(false); // msg loading for about section
  const [headlineMsgLoading, setHeadlineMsgLoading] = useState<boolean>(false); // msg loading for Headline  section
  const [fileError, setFileError] = useState<string>("");
  const [streamedHeadlineData, setStreamedHeadlineData] = useState(
    "Marketing Strategist | Branding Expert | Helping businesses build their brand and grow their revenue | Head of People | Talent HR Consultant | People Developer | Recruitment Expert"
  );
  const [streamedAboutData, setStreamedAboutData] = useState("alsdkjfklasdf");
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
        })
        .finally(() => {
          setMsgLoading(false);
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

  // useEffect(() => {
  //   if (params?.get("fileName")) {
  //     linkedinHeadline(fileName);
  //     linkedinAbout(fileName);
  //   }
  // }, [params?.get("fileName")]);

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
      {streamedHeadlineData || streamedAboutData ? (
        <div className=" my-3 w-full flex flex-col items-center">
          <div className="p-6 border-2 border-purple-600 rounded-2xl w-11/12 ">
            <div className="flex flex-col gap-4 bg-black p-12 rounded-2xl">
              {/* Headline */}
              <h1 className="text-4xl flex items-center font-normal mb-4 text-white">
                <span className="text-yellow-400">{starIcon}</span>
                <span className="text-2xl uppercase font-bold">
                  Your New LinkedIn Headline
                </span>
              </h1>

              {isHeadlineEditing ? (
                <textarea
                  className="tracking-wider border-2 p-8 rounded-2xl border-gray-700 text-white"
                  value={streamedHeadlineData} // Set the initial value
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
                <div className="tracking-wider border-2 p-8 rounded-2xl border-gray-700 text-white">
                  {streamedHeadlineData}
                </div>
              )}
              {streamedHeadlineData && (
                <div className="flex gap-4 ">
                  <Button
                    type="button"
                    className="border-2 border-purple-600 rounded-full px-6 py-2 hover:bg-purple-600 hover:text-white"
                    onClick={() => linkedinHeadline(fileName)}
                  >
                    <div className="flex  gap-2 items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className={` w-4 h-4  ${
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
                    className="border-2 border-indigo-600 rounded-full px-6 py-2 hover:bg-indigo-600 hover:text-white"
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

              {/* Sumary */}
              <h1 className="text-4xl flex items-center font-normal mb-4 text-white mt-8">
                <span className="text-yellow-400">{starIcon}</span>
                <span className="text-2xl uppercase font-bold">
                  your keyword optimized LinkedIn summary
                </span>
              </h1>

              {isSummaryEditing ? (
                <textarea
                  className="tracking-wider border-2 p-8 rounded-2xl border-gray-700 text-white"
                  value={streamedAboutData} // Set the initial value
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
                <div className="tracking-wider border-2 p-8 rounded-2xl border-gray-700 text-white">
                  {streamedAboutData}
                </div>
              )}

              <div className="flex gap-4 ">
                <Button
                  type="button"
                  className="border-2 border-indigo-600 rounded-full px-6 py-2 hover:bg-indigo-600 hover:text-white"
                  onClick={() => {
                    setIsSummaryEditing(true);
                    setIsSummaryCopied(false);
                  }}
                >
                  Edit
                </Button>
                <Button
                  type="button"
                  className="border-2 border-gray-700  rounded-full px-6 py-2 flex gap-2 hover:bg-gray-700 hover:text-white"
                  onClick={copySummary}
                >
                  {clipboardIcon}
                  {isSummaryCopied ? "Copied!" : "Copy to Clipboard"}
                </Button>
              </div>
            </div>
          </div>
          {/* {headlineMsgLoading ? (
            <div className="flex justify-center py-6 items-center">
              {refreshIconRotating}
            </div>
          ) : (
            
          )} */}
          {/* {aboutMsgLoading ? (
            <div className="flex justify-center py-6 items-center">
              {refreshIconRotating}
            </div>
          ) : (
            <>
              <div className="p-4 mt-20 ">
                <h1 className="text-4xl flex items-center font-normal mb-4">
                  <span className="text-yellow-400">{starIcon}</span>
                  <span className="ml-6 text-teal-400">
                    Your Keyword Optimized LinkedIn Summary:
                  </span>
                </h1>
                {isSummaryEditing ? (
                  <textarea
                    className="font-sans w-full whitespace-pre-wrap break-words mt-6 pt-6 pb-16 px-3 text-white text-lg font-semibold border-2 border-gray-400"
                    value={streamedAboutData} // Set the initial value
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
                  <div className="font-sans whitespace-pre-wrap break-words mt-6 py-6 px-3 text-white text-lg font-semibold  border-2 border-gray-400">
                    {streamedAboutData}
                  </div>
                )}
              </div>
              <div className="flex ml-2 ">
                <Button
                  type="button"
                  className="border-2 border-gray-200 ml-5 rounded-2xl py-2 px-9 text-3xl  mt-3 font-normal text-cyan-300"
                  onClick={() => {
                    setIsSummaryEditing(true);
                    setIsSummaryCopied(false);
                  }}
                >
                  Edit
                </Button>
                <Button
                  type="button"
                  className="border-2 border-gray-200  rounded-2xl py-2 px-5 text-3xl mt-3 ml-5 font-normal text-green-300"
                  onClick={copySummary}
                >
                  {isSummaryCopied ? "Copied!" : "Copy to Clipboard"}
                </Button>
              </div>

              {streamedAboutData && (
                <div className="mt-9 p-4">
                  <h2 className=" text-pink-600 capitalize flex justify-center font-normal">
                    Don'n Like the results?
                  </h2>
                  <h2 className=" text-gray-300 font-normal text-3xl flex justify-center">
                    Change your Preference and Regenerate your Summary!
                  </h2>
                  <div className="mt-4 py-3 flex flex-col items-center justify-center ">
                    <div className="flex flex-col mb-4">
                      <div className="flex mb-1 items-center ">
                        <input
                          id="default"
                          type="radio"
                          value="about"
                          name="default-radio"
                          onChange={(e) => setAboutData(e.target.value)}
                          className="w-7 h-7 bg-white text-white "
                        />
                        <label
                          htmlFor="default"
                          className="ml-4 cursor-pointer text-gray-300 font-normal text-3xl flex justify-center"
                        >
                          Use My Persona to write the Cover Letter
                        </label>
                      </div>
                      <div className="flex mb-1 items-center ">
                        <input
                          id="default-radio-1"
                          type="radio"
                          value="jobDescription"
                          name="default-radio"
                          onChange={(e) => setAboutData(e.target.value)}
                          className="w-7 h-7 text-blue-600 bg-white"
                        />
                        <label
                          htmlFor="default-radio-1"
                          className="ml-4 cursor-pointer text-gray-300 font-normal text-3xl flex justify-center"
                        >
                          I need a shorter summary (Not Recommended)
                        </label>
                      </div>
                      <div className="flex mb-1 items-center ">
                        <input
                          id="default-radio-1"
                          type="radio"
                          value="about"
                          name="default-radio"
                          onChange={(e) => setAboutData(e.target.value)}
                          className="w-7 h-7 text-blue-600 bg-white"
                        />
                        <label
                          htmlFor="default-radio-1"
                          className="ml-4 cursor-pointer text-gray-300 font-normal text-3xl flex justify-center"
                        >
                          Add a captivating story to hook the visitiors
                        </label>
                      </div>
                      <div className="flex mb-1 items-center ">
                        <input
                          id="default-radio-1"
                          type="radio"
                          value="instruction"
                          name="default-radio"
                          onChange={(e) => setAboutData(e.target.value)}
                          className="w-7 h-7 text-blue-600 bg-white"
                        />
                        <label
                          htmlFor="default-radio-1"
                          className="ml-4 cursor-pointer text-gray-3    00 font-normal text-3xl flex justify-center"
                        >
                          I want to add my personalized instructions
                        </label>
                      </div>
                      {aboutData === "instruction" ? (
                        <textarea
                          className="font-sans w-full whitespace-pre-wrap break-words mt-6 pt-6 pb-16 px-3 text-white text-lg font-semibold border-2 border-gray-400"
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
                      className="border-2 w-4.5/12 border-gray-200 rounded-2xl py-4 px-5 text-3xl mt-3 font-normal text-yellow-300"
                      onClick={() => {
                        linkedinAbout(fileName);
                        setInstruction("");
                      }}
                    >
                      <div className="flex flex-row gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className={`w-4 h-4 mt-3 ${
                            headlineMsgLoading ? "animate-spin" : ""
                          }`}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                          />
                        </svg>
                        <span>Re-Generate Summary</span>
                      </div>
                    </Button>
                  </div>
                  <LinkedInSummary
                    fullName={names?.fullName}
                    FirstName={names?.firstName}
                  />
                </div>
              )}
            </>
          )} */}
        </div>
      ) : (
        " "
      )}

      {streamedAboutData && (
        <div className="mt-9  flex flex-col justify-center items-center gap-2">
          <h2 className=" text-red-600 ">Don't Like the results?</h2>
          <p className="text-2xl ">
            Change your preference and regenerate you summary
          </p>
          <div className="flex flex-col gap-4">
            <label className="flex gap-3 items-center rounded-full border-2 border-indigo-600 px-8 py-4 cursor-pointer">
              <input
                id="default"
                type="radio"
                value="about"
                name="default-radio"
                onChange={(e) => setAboutData(e.target.value)}
                className="w-5 h-5"
              />
              Use My Persona to write the Cover Letter
            </label>
            <label className="flex gap-3 items-center rounded-full border-2 border-indigo-600 px-8 py-4 cursor-pointer">
              <input
                id="default-radio-1"
                type="radio"
                value="jobDescription"
                name="default-radio"
                onChange={(e) => setAboutData(e.target.value)}
                className="w-5 h-5"
              />
              I need a shorter summary (Not Recommended)
            </label>
            <label className="flex gap-3 items-center rounded-full border-2 border-indigo-600 px-8 py-4 cursor-pointer">
              <input
                id="default-radio-1"
                type="radio"
                value="about"
                name="default-radio"
                onChange={(e) => setAboutData(e.target.value)}
                className="w-5 h-5"
              />
              Add a captivating story to hook the visitiors
            </label>
            <label className="flex gap-3 items-center rounded-full border-2 border-indigo-600 px-8 py-4 cursor-pointer">
              <input
                id="default-radio-1"
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
                className="tracking-wider border-2 p-8 rounded-2xl border-gray-700 text-white "
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
      <div className="w-11/12 h-80 flex flex-col justify-center items-center rounded-2xl mt-14 bg-gradient-to-r to-fuchsia-600 from-indigo-600  border-gray-800">
        <div className="w-6/12 flex justify-center items-center flex-col">
          <h3 className="text-4xl text-normal  leading-normal text-white text-center font-bold ">
            Yes, I Want to Explore More Career Boosting Tools!
          </h3>
          <Link
            href="/register"
            className="bg-yellow-400 hover:bg-yellow-600  h-14 text-center rounded-full font-bold text-xl text-black py-3 px-9 no-underline"
          >
            Click here to experience the magic
          </Link>
        </div>
      </div>
    </>
  );
};

export default LinkedInUploadPDFResume;
