"use client";
import { useEffect, useState } from "react";
// import { slugify } from "@/helpers/slugify";
import copy from "clipboard-copy";
import {
  clipboardIcon,
  refreshIconRotating,
  starIcon,
  uploadIcon,
} from "@/helpers/iconsProvider";
import Button from "../../utilities/form-elements/Button";
import LinkedInSummary from "./LinkedInSummary";
import axios from "axios";
import { useRouter } from "next/navigation";

//Editable
const loadFromLocalStorage = () => {
  const linkedinContent = localStorage.getItem("linkedin-content");
  const linkedinFileName = localStorage.getItem("linkedin-fileName");
  return { linkedinContent, linkedinFileName };
};

// alskdfjals?
const LinkedInUploadPDFResume = () => {
  // local states
  const router = useRouter();
  const [aboutMsgLoading, setAboutMsgLoading] = useState<boolean>(false); // msg loading for about section
  const [headlineMsgLoading, setHeadlineMsgLoading] = useState<boolean>(false); // msg loading for Headline  section
  const [fileError, setFileError] = useState<string>("");
  const [streamedHeadlineData, setStreamedHeadlineData] = useState("");
  const [streamedAboutData, setStreamedAboutData] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [linkedinContent, setLinkedinContent] = useState<any>("");
  const [linkedinFileName, setLinkedinFileName] = useState<any>("");

  // Define a state variable to hold both first name and full name
  const [names, setNames] = useState({
    id: "",
    firstName: "",
    fullName: "",
    email: "",
    lastName: "",
    phone: "",
    location: "",
  });
  // Define state variables to track API call statuses
  const [headlineComplete, setHeadlineComplete] = useState<boolean>(false);
  const [aboutComplete, setAboutComplete] = useState<boolean>(false);
  const [aboutData, setAboutData] = useState<string>("aboutdefault");
  const [instruction, setInstruction] = useState<string>("");
  const [isHeadlineCopied, setIsHeadlineCopied] = useState(false);
  const [isSummaryCopied, setIsSummaryCopied] = useState(false);
  const [isHeadlineEditing, setIsHeadlineEditing] = useState(false);
  const [isSummaryEditing, setIsSummaryEditing] = useState(false);

  const linkedinHeadline = async (linkedinContent: string) => {
    setStreamedHeadlineData("");
    setFileError("");
    // setHeadlineMsgLoading(true);
    if (linkedinContent) {
      fetch("/api/linkedInBots/linkedinHeadlineGenerator", {
        method: "POST",
        body: JSON.stringify({
          linkedinContent,
          trainBotData: {
            // userEmail: userData.email,
            fileContent: linkedinContent,
          },
        }),
        headers: {
          "Content-Type": "application/json",
        },
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

              if (text) {
                setHeadlineMsgLoading(false);
                setStreamedHeadlineData((prev) => prev + text);
              }
            }
            setHeadlineComplete(true);
          }
        })
        .catch((error) => {
          setFileError("Something went wrong");
        });
    } else if (!linkedinFileName) {
      setFileError("PDF Resume / CV is Required");
    }
  };

  const linkedinAbout = async (linkedinContent: string) => {
    setStreamedAboutData("");
    setFileError("");
    setAboutMsgLoading(true);

    if (linkedinFileName) {
      fetch("/api/linkedInBots/linkedinAboutGenerator", {
        method: "POST",
        body: JSON.stringify({
          linkedinContent,
          option: aboutData,
          instruction,
          trainBotData: {
            // userEmail: userData.email,
            fileContent: linkedinContent,
          },
        }),
        headers: {
          "Content-Type": "application/json",
        },
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
              if (text) {
                setAboutMsgLoading(false);
                setStreamedAboutData((prev) => prev + text);
              }
            }
            setAboutComplete(true);
          }
        })
        .catch((error) => {
          setFileError("Something went wrong");
        });
    } else if (!linkedinFileName) {
      setFileError("PDF Resume / CV is Required");
    }
  };

  //Save User in DB
  const linkedinToolSaveUser = async (
    linkedinFileName: string,
    linkedinContent: string
  ) => {
    setFileError("");
    if (linkedinFileName) {
      fetch("/api/linkedInBots/LinkedinToolEntries", {
        method: "POST",
        body: JSON.stringify({ linkedinFileName, linkedinContent }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(async (resp: any) => {
          const {
            userId,
            firstName,
            fullName,
            email,
            lastName,
            phone,
            location,
          } = await resp.json();
          setNames({
            id: userId,
            firstName,
            fullName,
            email,
            lastName,
            phone,
            location,
          });
          setButtonDisabled(false);
          if (email && phone) {
            UpdateGohighlevel({
              userId,
              firstName,
              fullName,
              email,
              lastName,
              phone,
              location,
            });
          }
        })
        .catch((error) => {
          setFileError("Something went wrong");
        });
    } else if (!linkedinFileName) {
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
  // Move File linkedin-temp To temp folder
  const moveToRegister = () => {
    setFileError("");
    if (linkedinContent) {
      router.replace(
        `/register?firstName=${names.firstName}&lastName=${names.lastName}&email=${names.email}&file=${linkedinFileName}`
      );
    } else {
      setFileError("Something went wrong");
    }
  };
  const UpdateGohighlevel = async ({
    userId,
    firstName,
    fullName,
    email,
    lastName,
    phone,
    location,
  }: {
    userId: string;
    firstName: string;
    fullName: string;
    email: string;
    lastName: string;
    phone: number;
    location: string;
  }) => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_GHL_API_URL}/contacts/`,
        {
          fullName,
          firstName,
          lastName,
          email: email,
          phone,
          location,
          tags: ["cb-linkedinTool"],
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_GHL_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        if (names) updateCRMStatus(userId);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const updateCRMStatus = async (id: string) => {
    if (id) {
      fetch("/api/linkedInBots/LinkedinToolEntriesUpdate", {
        method: "POST",
        body: JSON.stringify({ id }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(async (resp: any) => {
          const res = await resp.json();
        })
        .catch((error) => {
          setFileError("Something went wrong");
        });
    }
  };
  useEffect(() => {
    const data = loadFromLocalStorage();
    if (data) {
      setLinkedinContent(data.linkedinContent);
      setLinkedinFileName(data.linkedinFileName);
    }
  }, []);

  useEffect(() => {
    if (linkedinContent !== "" && linkedinFileName !== "") {
      linkedinHeadline(linkedinContent);
      linkedinAbout(linkedinContent);
    }
  }, [linkedinContent, linkedinFileName]);

  useEffect(() => {
    if (headlineComplete && aboutComplete) {
      // All APIs have completed, call linkedinToolSaveUser
      linkedinToolSaveUser(linkedinFileName, linkedinContent);
    }
  }, [headlineComplete, aboutComplete]);

  return (
    <>
      {!aboutComplete || aboutMsgLoading ? (
        refreshIconRotating
      ) : (
        <div className="flex gap-2 text-[#33FF00] font-extrabold text-5xl lg:my-[40px] my-[10px]">
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
        <div className=" my-3 w-full flex flex-col items-center lg:px-[100px] px-[10px]">
          <div className="padding-t sm:p-2 md:p-4 lg:p-6 border-2 border-purple-600 rounded-2xl w-11/12 ">
            <div className=" flex flex-col  md:py-4  gap-4 bg-black div-m lg:p-12 rounded-2xl">
              {/* Headline */}
              <h1 className="  flex items-center font-normal mb-4 text-white">
                {/* <span className="text-yellow-400">{starIcon}</span> */}
                <span className="text-center lg:text-[36px] text-[20px] sm:ml-4 md:ml-4 lg:text-left  uppercase font-bold">
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
                      className="tracking-wider md:p-3 border-2 box lg:p-8 rounded-2xl border-gray-700 text-white"
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
                    <div className="tracking-wider md:mx-2 md:p-3 border-2 box lg:p-8 rounded-2xl border-gray-700 text-white">
                      {streamedHeadlineData}
                    </div>
                  )}

                  {streamedHeadlineData && (
                    <div className="flex flex-col md:flex-row md:mx-2 div-1 lg:flex-row  gap-4 lg:text-left text-center">
                      <Button
                        type="button"
                        className="border-2 border-purple-600 rounded-full headline-btn  hover:bg-purple-600 hover:text-white"
                        onClick={() => linkedinHeadline(linkedinContent)}
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
                        className="border-2 border-gray-700   rounded-full headlin-copy-btn px-6 py-2 hover:bg-gray-700 hover:text-white flex gap-2"
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
              <h1 className=" flex items-center font-normal mb-4 mt-8 text-white">
                {/* <span className="text-yellow-400">{starIcon}</span> */}
                <span className="lg:text-[36px] text-[20px] text-center sm:ml-4 md:ml-4 lg:text-left  uppercase font-bold">
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
                    <div className="tracking-wider md:mx-2 md:p-3 border-2 box lg:p-8 rounded-2xl border-gray-700 text-white font-sans">
                      {streamedAboutData.split("\n").map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                      ))}
                    </div>
                  )}

                  {streamedAboutData && (
                    <div className="flex md:mx-2 gap-4 div-1">
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
        <div className="lg:content-1 lg:mt-[36px] mt-[20px] flex flex-col justify-center items-center gap-2 ">
          <h2 className="text-center lg:text-left text-red-600 lg:text-[46px] tex-[28px] lg:px-0 px-[15px]">
            Don{"'"}t Like the results?
          </h2>
          <p className="text-[16px]  lg:text-[24px] lg:text-left text-center">
            Change your preference and regenerate you summary
          </p>
          <div className="flex flex-col gap-4 lg:px-0 px-8">
            <label
              htmlFor="default-radio-1"
              className="flex gap-3 redio-btn items-center rounded-full border-2 border-indigo-600 lg:px-8 lg:py-4 py-3 cursor-pointer lg:text-[16px] text-[11px]"
            >
              <input
                id="default-radio-1"
                type="radio"
                value="aboutPersona"
                name="default-radio"
                onChange={(e) => setAboutData(e.target.value)}
                className="lg:w-5 lg:h-5 w-3 h-3 "
              />
              Use My Persona to write the Cover Letter
            </label>
            <label
              htmlFor="default-radio-2"
              className="flex gap-3 redio-btn  items-center rounded-full border-2 border-indigo-600 lg:px-8 lg:py-4 py-3 cursor-pointer lg:text-[16px] text-[11px]"
            >
              <input
                id="default-radio-2"
                type="radio"
                value="aboutShort"
                name="default-radio"
                onChange={(e) => setAboutData(e.target.value)}
                className="lg:w-5 lg:h-5 w-3 h-3 "
              />
              I need a shorter summary (Not Recommended)
            </label>
            <label
              htmlFor="default-radio-3"
              className="flex gap-3 redio-btn  items-center rounded-full border-2 border-indigo-600 lg:px-8 lg:py-4 py-3 cursor-pointer lg:text-[16px] text-[11px]"
            >
              <input
                id="default-radio-3"
                type="radio"
                value="aboutStory"
                name="default-radio"
                onChange={(e) => setAboutData(e.target.value)}
                className="lg:w-5 lg:h-5 w-3 h-3 "
              />
              Add a captivating story to hook the visitiors
            </label>
            <label
              htmlFor="default-radio-4"
              className="flex gap-3 redio-btn  items-center rounded-full border-2 border-indigo-600 lg:px-8 lg:py-4 py-3 cursor-pointer lg:text-[16px] text-[11px]"
            >
              <input
                id="default-radio-4"
                type="radio"
                value="aboutInstructions"
                name="default-radio"
                onChange={(e) => setAboutData(e.target.value)}
                className="lg:w-5 lg:h-5 w-3 h-3 "
              />
              I want to add my personalized instructions
            </label>
            {aboutData === "aboutInstructions" ? (
              <textarea
                className="tracking-wider text-area border-2 p-8 rounded-2xl border-gray-700 text-white"
                value={instruction} // Set the initial value
                onChange={(e) => setInstruction(e.target.value)}
                autoFocus
                rows={3}
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
              linkedinAbout(linkedinContent);
              setInstruction("");
              window.scrollTo({ top: 50, behavior: "smooth" });
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
            <span className="lg:text-[20px] text-[16px] font-semibold">
              Re-generate Summary
            </span>
          </Button>
          <LinkedInSummary
            fullName={names?.fullName}
            FirstName={names?.firstName}
          />
        </div>
      )}
      <div className="w-11/12 h-80 flex flex-col justify-center lg:items-center rounded-2xl mt-14 bg-gradient-to-r to-fuchsia-600 from-indigo-600  border-gray-800">
        <div className=" lg:w-6/12  flex items-center flex-col">
          <h3 className="lg:text-[36px] text-[20] text-normal  lg:leading-normal text-white text-center lg:font-bold ">
            Yes, I Want to Explore More Career Boosting Tools!
          </h3>
          <button
            className={`mx-1 mt-8 p-3  my-2 bg-yellow-400 hover:bg-yellow-600  lg:w-8/12 lg:h-14 lg:mt-8 text-center rounded-full font-bold lg:text-[20px] text-[16px] text-black lg:py-3 lg:px-9 no-underline  ${
              buttonDisabled ? "bg-yellow-600" : "cursor-pointer"
            } `}
            onClick={moveToRegister}
            disabled={buttonDisabled}
          >
            Click here to experience the magic
          </button>
          {fileError && <div className="error-message">{fileError}</div>}
        </div>
      </div>
    </>
  );
};

export default LinkedInUploadPDFResume;
