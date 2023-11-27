"use client";
import React, { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { setField, setIsLoading, setUserData } from "@/store/userDataSlice";
import ReactToPrint from "react-to-print";
import Link from "next/link";
import { leftArrowIcon } from "@/helpers/iconsProvider";
import copy from "clipboard-copy";
import CoverLetterFileUploader from "@/components/dashboard/cover-letter-bot/CoverLetterFileUploader";
import CoverLetterResumeSelector from "@/components/dashboard/cover-letter-bot/CoverLetterResumeSelector";
import Button from "@/components/utilities/form-elements/Button";
import LimitCard from "@/components/dashboard/LimitCard";
import axios from "axios";
import { htmlToPlainText } from "@/helpers/HtmlToPlainText";
import PreviouslyGeneratedList from "@/components/PreviouslyGeneratedList";
import CoverLetterCardSingle from "@/components/dashboard/cover-letter-bot/CoverLetterCardSingle";
import { makeid } from "@/helpers/makeid";
import { resetCoverLetter, setCoverLetter } from "@/store/coverLetterSlice";
import Html2Pdf from "js-html2pdf";

const CoverLetterWriter = () => {
  const componentRef = useRef<any>(null);
  const [aiInputUserData, setAiInputUserData] = useState<any>();
  const [msgLoading, setMsgLoading] = useState<boolean>(false); // msg loading
  const { data: session } = useSession();
  const [show, setShow] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>("profile"); // type
  const [streamedData, setStreamedData] = useState<string>("");
  const [isCoverLetterCopied, setIsCoverLetterCopied] =
    useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<string>("");
  const [setSelectedResumeId, setSetSelectedResumeId] = useState<string>("");
  const [jobDescription, setJobDescription] = useState<string>("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState<string>("");

  // Function to toggle editing mode on double-click
  const handleClick = () => {
    // setEditedContent(streamedData);
    setIsEditing(true);
  };

  useEffect(() => {
    if (isEditing) {
      if (componentRef.current) {
        const editorElement = componentRef.current.querySelector("#editor");
        if (editorElement) {
          editorElement.innerHTML = coverLetter.coverLetterText;
        }
      }
    } else {
      dispatch(resetCoverLetter());
    }
  }, [isEditing]);

  // Function to save the edited content and exit editing mode
  const handleSave = async () => {
    let _coverLetterText = "";

    if (componentRef.current) {
      const editorElement = componentRef.current.querySelector("#editor");
      if (editorElement) {
        _coverLetterText = editorElement.innerHTML;
        editorElement.innerHTML = "";
      }
    }

    // setStreamedData(editedContent);
    setIsEditing(false);
    const payLoad = {
      coverLetterText: _coverLetterText, //editedContent,
      generatedOnDate: coverLetter.generatedOnDate,
      generatedViaOption: coverLetter.generatedViaOption,
      id: coverLetter.id,
      jobDescription: coverLetter.jobDescription,
      userEmail: coverLetter.userEmail,
    };

    const updatedCoverLetters = await axios.put(
      `/api/coverLetterBot/${coverLetter.id}`,
      payLoad,
      { headers: { "Content-Type": "application/json" } }
    );

    console.table(updatedCoverLetters.data.results);

    const updatedObject = {
      ...userData,
      coverLetters: updatedCoverLetters.data.results,
    };
    dispatch(setUserData({ ...updatedObject }));
    dispatch(setCoverLetter(payLoad));
  };

  useEffect(() => {
    // saveToDB(streamedData);
  }, [streamedData]);

  // limit bars
  const [availablePercentageCoverLetter, setAvailablePercentageCoverLetter] =
    useState<number>(0);
  const [percentageCalculatedCoverLetter, setPercentageCalculatedCoverLetter] =
    useState<boolean>(false);

  // Redux
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.userData);
  const coverLetter = useSelector((state: any) => state.coverLetter);

  console.clear();
  const { resumes, coverLetters } = userData;

  const handleGenerate = async () => {
    // await getUserDataIfNotExists();
    if (
      session?.user?.email &&
      aiInputUserData &&
      !isNaN(availablePercentageCoverLetter) &&
      availablePercentageCoverLetter !== 0
    ) {
      setMsgLoading(true);
      setShow(true);
      setStreamedData("");

      const obj: any = {
        type: selectedOption,
        email: session?.user?.email,
        jobDescription,
        trainBotData: {
          userEmail: userData.email,
          fileAddress: userData.defaultResumeFile,
        },
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
      fetch("/api/coverLetterBot/coverLetterGenerator", {
        method: "POST",
        body: JSON.stringify(obj),
      })
        .then(async (resp: any) => {
          const response = await resp.json();
          if (response.success) {
            // const reader = resp.body.getReader();
            let tempText = "";
            // while (true) {
            //   const { done, value } = await reader.read();
            //   if (done) {
            //     break;
            //   }
            // const text = new TextDecoder().decode(value);
            const text = response.result;
            setStreamedData((prev) => prev + text);
            tempText += text;
            // }

            // await saveToDB(tempText);

            const limitUpdateResponse = await fetch(
              "/api/users/updateUserLimit",
              {
                method: "POST",
                body: JSON.stringify({
                  email: session?.user?.email,
                  type: "cover_letter_generation",
                }),
              }
            );

            const limitUpdateData = await limitUpdateResponse.json();

            if (limitUpdateData.success) {
              // Generate payload for cover letter
              const payload = {
                id: makeid(),
                jobDescription: jobDescription,
                coverLetterText: tempText,
                generatedOnDate: new Date().toISOString(),
                generatedViaOption: selectedOption,
                userEmail: session?.user?.email,
              };

              // Save cover letter to the server
              const coverLetterResponse = await axios.post(
                "/api/coverLetterBot",
                payload
              );

              if (coverLetterResponse.data.success) {
                // Update Redux store
                const updatedObject = {
                  ...userData,
                  userPackageUsed: {
                    ...userData.userPackageUsed,
                    cover_letter_generation:
                      limitUpdateData.result.userPackageUsed
                        .cover_letter_generation,
                  },
                  coverLetters: coverLetterResponse.data.result.coverLetters,
                };
                dispatch(setUserData({ ...userData, ...updatedObject }));
                dispatch(setCoverLetter(payload));
              }
            }

            // fetch("/api/users/updateUserLimit", {
            //   method: "POST",
            //   body: JSON.stringify({
            //     email: session?.user?.email,
            //     type: "cover_letter_generation",
            //   }),
            // })
            //   .then(async () => {
            //     const payload = {
            //       id: makeid(),
            //       jobDescription: jobDescription,
            //       coverLetterText: streamedData,
            //       generatedOnDate: new Date().toISOString(),
            //       generatedViaOption: selectedOption,
            //       userEmail: session?.user?.email,
            //     };
            //     try {
            //       const coverLetter = await axios.post(
            //         "/api/coverLetterBot",
            //         payload
            //       );

            //       if (coverLetter.data.success) {
            //         dispatch(setCoverLetter(payload));
            //       }
            //     } catch {}
            //   })
            //   .then(async (resp: any) => {
            //     const res = await resp.json();
            //     if (res.success) {
            //       const updatedObject = {
            //         ...userData,
            //         userPackageUsed: {
            //           ...userData.userPackageUsed,
            //           cover_letter_generation:
            //             res.user.userPackageUsed.cover_letter_generation,
            //         },
            //       };
            //       dispatch(setUserData({ ...userData, ...updatedObject }));
            //     }
            //   });
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
      const coverLetterData = await htmlToPlainText(text);
      await copy(coverLetterData);
      setIsCoverLetterCopied(true);
    } catch (error) {
      console.error("Failed to copy text: ", error);
    }
  };

  // const saveToDB = async (tempText: string) => {
  //   try {
  //     const response = await axios.post("/api/users/updateUserData", {
  //       data: {
  //         email: session?.user?.email,
  //         results: {
  //           ...userData.results,
  //           coverLetter: tempText,
  //         },
  //       },
  //     });
  //     const { success } = response.data;
  //     if (success) {
  //       console.log("cover letter saved to DB");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    if (userData && userData?.email) {
      setAiInputUserData({
        contact: userData?.contact,
        education: userData?.contact,
        email: userData?.contact,
        experience: userData?.contact,
        firstName: userData?.firstName,
        lastName: userData?.lastName,
        phone: userData?.phone,
        skills: userData?.skills,
      });
    }
    // if (
    //   userData.results &&
    //   userData.results.coverLetter &&
    //   userData.results.coverLetter !== ""
    // )
    // {
    //   setShow(true);
    //   console.log("userData CoverLetter: ", userData.results.coverLetter);
    //   setStreamedData(userData.results.coverLetter);
    // }

    if (!streamedData) {
      // console.log("userData CoverLetter: ", userData.results.coverLetter);
      setStreamedData(coverLetter.coverLetterText);
    }

    // dispatch(setCoverLetter(coverLetters[0]));
  }, [userData]);

  useEffect(() => {
    if (coverLetter.id !== "") {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [coverLetter]);

  const historyProps = {
    list: userData.coverLetters,
    title: "Your AI Generated Cover Letters",
    Component: (card: any) => (
      <CoverLetterCardSingle card={card} componentRef={componentRef} />
    ),
  };

  useEffect(() => {
    setStreamedData(coverLetter.coverLetterText);
  }, [coverLetter.coverLetterText]);

  return (
    <>
      <div className="w-[95%] my-5 ml-10 flex items-center justify-between ">
        <Link
          href="/dashboard"
          className="flex flex-row gap-2 items-center hover:font-semibold transition-all"
        >
          {leftArrowIcon}
          Dashboard
        </Link>

        <LimitCard
          title="Cover Letter Availble"
          limit={userData?.userPackageData?.limit?.cover_letter_generation}
          used={userData?.userPackageUsed?.cover_letter_generation}
          setPercentageCalculated={setPercentageCalculatedCoverLetter}
          availablePercentage={availablePercentageCoverLetter}
          setAvailablePercentage={setAvailablePercentageCoverLetter}
        />
      </div>

      <div className="m-10 mt-2 w-[95%]  p-4  border border-gray-200 rounded-lg shadow sm:p-6 ">
        <PreviouslyGeneratedList {...historyProps} />
      </div>
      <div className="flex m-10 mt-2 gap-4">
        <div className="w-full flex flex-col p-4  border border-gray-200 rounded-lg shadow sm:p-6 ">
          <h2 className="text-2xl mr-10 mb-6">Cover Letter Generator</h2>
          <div className="mb-6">
            <div className="flex items-center mb-4">
              <input
                id="default-radio-1"
                type="radio"
                value="profile"
                name="default-radio"
                onChange={(e) => setSelectedOption(e.target.value)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  "
              />
              <label
                htmlFor="default-radio-1"
                className="ml-2 text-sm font-medium cursor-pointer"
              >
                Use My Persona to write the Cover Letter
              </label>
            </div>
            <div className="flex items-center mb-4">
              <input
                id="default-radio-2"
                type="radio"
                value="file"
                name="default-radio"
                onChange={(e) => {
                  setSelectedFile("");
                  setSelectedOption(e.target.value);
                }}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  "
              />
              <label
                htmlFor="default-radio-2"
                className="ml-2 text-sm font-medium  cursor-pointer"
              >
                Upload a new PDF Resume
              </label>
            </div>
            <div className="flex items-center mb-4">
              <input
                id="default-radio-3"
                type="radio"
                value="aiResume"
                name="default-radio"
                onChange={(e) => {
                  setSelectedFile("");
                  setSelectedOption(e.target.value);
                }}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  "
              />
              <label
                htmlFor="default-radio-3"
                className="ml-2 text-sm font-medium  cursor-pointer"
              >
                Upload a new PDF Resume
              </label>
            </div>
          </div>
          {selectedOption === "file" && (
            <CoverLetterFileUploader
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
            />
          )}

          {selectedOption === "aiResume" && (
            <CoverLetterResumeSelector
              setSelectedResumeId={setSelectedResumeId}
              setSetSelectedResumeId={setSetSelectedResumeId}
            />
          )}

          <div className="">
            <h2 className="text-2xl mr-10 mb-4 mt-6">
              Paste Job Description *
            </h2>
            <textarea
              name="jobDescription"
              id="jD"
              rows={8}
              value={jobDescription}
              placeholder="Copy the job description for the position you are applying and paste it here to generate a tailor cover letter.  "
              onChange={(e) => setJobDescription(e.target.value)}
              className="w-full mb-4 bg-transparent text-white p-4 border rounded-lg"
            ></textarea>
          </div>

          <div className="flex flex-row gap-4">
            {!isNaN(availablePercentageCoverLetter) &&
              availablePercentageCoverLetter !== 0 && (
                <div>
                  <Button
                    type="button"
                    disabled={
                      msgLoading ||
                      !session?.user?.email ||
                      !aiInputUserData ||
                      selectedOption === "" ||
                      (selectedOption === "file" && selectedFile === "") ||
                      (selectedOption === "aiResume" &&
                        setSelectedResumeId === "") ||
                      jobDescription === ""
                    }
                    onClick={() => handleGenerate()}
                    className="btn theme-outline-btn"
                  >
                    <div className="flex flex-row gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className={`w-4 h-4 ${
                          msgLoading ? "animate-spin" : ""
                        }`}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                        />
                      </svg>
                      <span>
                        {msgLoading
                          ? "Please wait..."
                          : "Generate Cover Letter"}
                      </span>
                    </div>
                  </Button>
                </div>
              )}

            <ReactToPrint
              trigger={() => (
                <Button
                  type="button"
                  disabled={!show || msgLoading || !session?.user?.email}
                  className="btn theme-outline-btn"
                >
                  <div className="flex flex-row gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                      />
                    </svg>
                    <span>Download</span>
                    {/* <span>
                            To download choose destination "save as PDF"
                          </span> */}
                  </div>
                </Button>
              )}
              // content={() => componentRef.current}
              // onBeforeGetContent={async () => await handleOnView(card)}
              content={() => componentRef.current}
              print={async (printIframe: HTMLIFrameElement) => {
                const document = printIframe.contentDocument;
                if (document) {
                  const exporter = new Html2Pdf(componentRef.current, {
                    filename: `coverletter.pdf`,
                  });
                  exporter.getPdf(true);
                }
              }}
            />
            {show && (
              <div>
                <Button
                  type="button"
                  disabled={
                    msgLoading ||
                    !session?.user?.email ||
                    !aiInputUserData ||
                    selectedOption === "" ||
                    (selectedOption === "file" && selectedFile === "") ||
                    (selectedOption === "aiResume" &&
                      setSelectedResumeId === "") ||
                    !show ||
                    isCoverLetterCopied
                  }
                  onClick={() => copyCoverLetter(streamedData)}
                  className="btn theme-outline-btn"
                >
                  <div className="flex flex-row gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                      />
                    </svg>

                    <span>
                      {msgLoading ? "Please wait..." : "Copy to clipboard"}
                    </span>
                  </div>
                </Button>
              </div>
            )}
            {isEditing && (
              <div>
                <Button
                  type="button"
                  onClick={handleSave}
                  className="btn theme-outline-btn"
                >
                  <div className="flex flex-row gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                      />
                    </svg>

                    <span>Save</span>
                  </div>
                </Button>
              </div>
            )}

            {/* {streamedData && (
              <div>
                <Button
                  type="button"
                  onClick={saveCoverLetterToDb}
                  className="btn theme-outline-btn"
                >
                  <div className="flex flex-row gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                      />
                    </svg>

                    <span>Save Cover Letter To DB</span>
                  </div>
                </Button>
              </div>
            )} */}
          </div>
          {/* <div className="">Download PDF</div> */}
        </div>
      </div>
      {/* {coverLetters.length > 0 && ( */}
      {show && (
        <div
          className={`w-[95%] text-gray-800  bg-white border border-gray-200 rounded-lg shadow  m-10 ${
            msgLoading ? "animate-pulse" : ""
          }`}
        >
          {/* <div className="p-12" ref={componentRef}>
            {isEditing ? (
              <div
                contentEditable="true"
                dangerouslySetInnerHTML={{ __html: editedContent }}
                onInput={(e: React.ChangeEvent<HTMLDivElement>) => {
                  setEditedContent(e.target.innerHTML);
                }}
              ></div>
            ) : (
              <div onClick={handleClick}>
                <div dangerouslySetInnerHTML={{ __html: streamedData }}></div>
              </div>
            )}
          </div> */}
          <div className="p-12" ref={componentRef}>
            {isEditing ? (
              <div
                id="editor"
                contentEditable="true"
                // dangerouslySetInnerHTML={{ __html: editedContent }}
                // onInput={(e: React.ChangeEvent<HTMLDivElement>) => {
                //   setEditedContent(e.target.innerHTML);
                // }}
              ></div>
            ) : (
              <div onClick={handleClick}>
                <div
                  className="text-black"
                  dangerouslySetInnerHTML={{ __html: streamedData }}
                ></div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
export default CoverLetterWriter;
