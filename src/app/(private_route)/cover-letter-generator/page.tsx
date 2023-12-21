"use client";
import React, { cloneElement, useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "@/store/userDataSlice";
import ReactToPrint from "react-to-print";
import Html2Pdf from "js-html2pdf";

import copy from "clipboard-copy";
import CoverLetterFileUploader from "@/components/new-dashboard/dashboard/cover-letter-generator/CoverLetterFileUploader";
import "@/app/(private_route)/dashboard.css";

import LimitCard from "@/components/new-dashboard/dashboard/LimitCard";
import axios from "axios";
import { htmlToPlainText } from "@/helpers/HtmlToPlainText";
import PreviouslyGeneratedList from "@/components/PreviouslyGeneratedList";
import { setCoverLetter } from "@/store/coverLetterSlice";

import buttonIconSrc from "@/../public/icon/u_bolt-alt.svg";
import CoverLetterCardSingle from "@/components/new-dashboard/dashboard/cover-letter-generator/CoverLetterCardSingle";
import Image from "next/image";
import Link from "next/link";
import { leftArrowIcon } from "@/helpers/iconsProvider";
import { makeid } from "@/helpers/makeid";

export default function CoverLetterPage() {
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
  const [showPopup, setShowPopup] = useState(false);

  // Function to toggle editing mode on double-click
  const handleClick: any = () => {
    // setEditedContent(streamedData);
    setIsEditing(true);
  };

  const handleDownload = async () => {
    const domElement = componentRef.current.querySelector(".text-white");
    console.log(domElement);
    const exporter = new Html2Pdf(domElement, {
      filename: `coverletter.pdf`,
      html2canvas: {
        backgroundColor: "white",
        onclone: async function (doc: any) {
          doc = await componentRef.current.querySelector(".text-white");
          doc.style.color = "black";
          console.log(doc);
        },
      },
    })
      .getPdf()
      .then(() => {
        exporter.getPdf(true);
      });
  };

  useEffect(() => {
    if (isEditing) {
      if (componentRef.current) {
        const editorElement = componentRef.current.querySelector("#editor");
        if (editorElement) {
          editorElement.innerHTML = coverLetter.coverLetterText;
        }
      }
    }
    // else {
    //   dispatch(resetCoverLetter());
    // }
  }, [isEditing]);

  const saveToDB = async (obj: any, text: any) => {
    const id = obj?.coverletterId;
    const email = obj?.email;
    const payload: any = {
      id,
      email,
      text,
    };

    await fetch("/api/coverLetterBot", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  };

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

    const updatedObject = {
      ...userData,
      coverLetters: updatedCoverLetters.data.results,
    };
    dispatch(setUserData({ ...updatedObject }));
    dispatch(setCoverLetter(payLoad));
  };

  // limit bars
  const [availablePercentageCoverLetter, setAvailablePercentageCoverLetter] =
    useState<number>(0);
  const [percentageCalculatedCoverLetter, setPercentageCalculatedCoverLetter] =
    useState<boolean>(false);

  // Redux
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.userData);
  const coverLetter = useSelector((state: any) => state.coverLetter);

  // console.clear();
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
      const coverletterId = makeid();
      const obj: any = {
        coverletterId: coverletterId,
        type: selectedOption,
        email: session?.user?.email,
        jobDescription,
        trainBotData: {
          userEmail: userData.email,
          // fileAddress: userData.files[0].fileName,
          fileAddress: userData.uploadedResume.fileName,
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
          // const response = await resp.json();
          if (resp.ok) {
            const reader = resp.body.getReader();
            let tempText = "";
            while (true) {
              const { done, value } = await reader.read();
              if (done) {
                break;
              }
              const text = new TextDecoder().decode(value);
              // const text = response.result;
              setStreamedData((prev) => prev + text);
              tempText += text;
            }

            await saveToDB(obj, tempText);

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
              const coverLetterResponse = await axios.get(
                "/api/coverLetterBot/getAllCoverLetters"
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
                dispatch(
                  setCoverLetter(
                    coverLetterResponse.data.result.coverLetters[
                      coverLetterResponse.data.result.coverLetters.length - 1
                    ]
                  )
                );
              }
            }
          } else {
            setStreamedData("Error! Something went wrong");
          }
        })
        .finally(() => {
          setMsgLoading(false);
        });
    } else {
      setShowPopup(true);

      // Hide the popup after 3 seconds
      setTimeout(() => {
        setShowPopup(false);
      }, 3000);
    }
  };

  const copyCoverLetter = async (text: string) => {
    try {
      const coverLetterData = await htmlToPlainText(text);
      await copy(coverLetterData);
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

    if (streamedData !== "") {
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
    dataSource: "coverLetters",
    Component: (card: any) => (
      <CoverLetterCardSingle
        card={card}
        componentRef={componentRef}
        source=""
      />
    ),
  };

  useEffect(() => {
    setStreamedData(coverLetter.coverLetterText);
  }, [coverLetter.coverLetterText]);
  const [uploadPdfFile, setUploadPdfFile] = useState<string>("useYourPersona");
  return (
    <>
      <div className="w-full sm:w-full z-1000">
        <div className="ml-0 lg:ml-[234px] px-[15px] mb-[72px]">
          {/* <AiGeneratedCoverLetters /> */}
          <Link
            href="/dashboard"
            className="ml-2 my-4 no-underline back-btn-text flex flex-row gap-2 items-center hover:opacity-80 transition-all"
          >
            {leftArrowIcon}
            Back
          </Link>

          <PreviouslyGeneratedList {...historyProps} />

          {/* <MainCoverLetterTool /> */}
          <>
            <div className=" single-service-bg rounded-[20px] px-4 lg:px-[30px] py-8 lg:py-[41px] flex flex-col gap-5 ">
              {/* header */}
              <div className="flex flex-col gap-2 md:flex-row  justify-between items-center">
                <h3 className=" text-[16px] md:text-sm uppercase card-h2 font-bold">
                  Generate Cover Letter
                </h3>
                <div className=" text-sm card-h2 uppercase font-bold">
                  <LimitCard
                    title="Cover Letter Availble"
                    limit={
                      userData?.userPackageData?.limit?.cover_letter_generation
                    }
                    used={userData?.userPackageUsed?.cover_letter_generation}
                    setPercentageCalculated={setPercentageCalculatedCoverLetter}
                    availablePercentage={availablePercentageCoverLetter}
                    setAvailablePercentage={setAvailablePercentageCoverLetter}
                  />
                </div>
              </div>

              {/* option */}

              <div className="text-sm text-[#615DFF] self-start">
                {/* <button
                className="flex flex-row justify-start items-center gap-[10px]"
                type="button"
                onClick={() => setShowInstruction(!showInstruction)}
              > */}
                <span className="uppercase text-[11px] md:text-sm font-bold block gro">
                  select options
                </span>
              </div>

              <div className="flex flex-col gap-5 lg:px-0 ">
                <label
                  htmlFor="default-radio-1"
                  className={`flex gap-3 items-center rounded-full border-[1px] border-[#353672] px-4 lg:px-6 lg:py-3 py-3 cursor-pointer lg:text-[15px] text-[11px] card-h2 w-[290px] lg:w-[400px] ${
                    selectedOption === "profile"
                      ? "border-[1px] border-[#615DFF]"
                      : ""
                  }`}
                >
                  <input
                    style={{
                      color: "#B324D7",
                      background: "#B324D7",
                      border: "1px solid #B324D7",
                    }}
                    id="default-radio-1"
                    type="radio"
                    value="profile"
                    name="default-radio"
                    onChange={(e) => setSelectedOption(e.target.value)}
                    // onChange={(e) => {
                    //   setUploadPdfFile(e.target.value);
                    // }}
                    checked={selectedOption === "profile"}
                    className="w-5 h-4"
                  />
                  Use My Persona to write the Cover Letter
                </label>
                <label
                  htmlFor="default-radio-2"
                  className={`flex gap-3 items-center rounded-full border-[1px] border-[#353672] px-4 lg:px-6 lg:py-3 py-3 cursor-pointer lg:text-[15px] text-[11px] card-h2 w-[220px] lg:w-[290px] ${
                    selectedOption === "file"
                      ? "border-[1px] border-[#615DFF]"
                      : ""
                  } `}
                >
                  <input
                    id="default-radio-2"
                    type="radio"
                    value="file"
                    // onChange={(e) => {
                    //   setUploadPdfFile(e.target.value);
                    // }}
                    onChange={(e) => {
                      setSelectedFile("");
                      setSelectedOption(e.target.value);
                    }}
                    name="default-radio"
                    className="w-4 h-4 border-[1px]"
                    checked={selectedOption === "file"}
                  />
                  Upload a new PDF Resume
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

              {/* form */}
              <div className="flex flex-col gap-5 justify-between items-start">
                <div className="w-full flex flex-col">
                  <label
                    htmlFor="job-title"
                    className=" font-bold text-md md:text-[24px] card-h2 flex lg:py-[20px] gap-[3px]"
                  >
                    Paste Your Job Description
                    <span className="text-[#F04248] text-[24px]">*</span>
                  </label>
                  <textarea
                    id="job-title"
                    name="jobTitle"
                    rows={6}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Copy the job description for the position you are applying and paste it here to generate a tailor cover letter."
                    className="w-full px-3 lg:px-[26px] rounded-[8px] text-sm text-[#959595] bg-transparent border-[#312E37] border pt-3"
                  />
                </div>

                <button
                  type="button"
                  disabled={
                    msgLoading ||
                    !session?.user?.email ||
                    !aiInputUserData ||
                    selectedOption === "" ||
                    (selectedOption === "file" && selectedFile === "") ||
                    jobDescription === ""
                  }
                  onClick={handleGenerate}
                  className={`dashboard-outline-btn flex flex-row justify-center items-center gap-2 py-3 px-[28px] rounded-full ${
                    (msgLoading ||
                      !session?.user?.email ||
                      !aiInputUserData ||
                      selectedOption === "" ||
                      (selectedOption === "file" && selectedFile === "") ||
                      jobDescription === "") &&
                    "opacity-50 cursor-not-allowed" // Apply these styles when the button is disabled
                  }`}
                >
                  <span className="card-h2 text-[15px] font-semibold">
                    {msgLoading ? (
                      <div className="flex">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className={`w-4 h-4 mr-3 ${
                            msgLoading ? "animate-spin" : ""
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
                          className="w-4 h-4 card-h2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                          />
                        </svg>

                        <span
                          className={`card-h2 ml-3 text-[15px] font-semibold cursor-pointer`}
                        >
                          Generate Cover Letter
                        </span>
                      </div>
                    )}
                  </span>
                </button>
              </div>

              {show && (
                <div className="mt-[40px]">
                  <h1 className="uppercase card-h2 font-bold text-[18px] pb-5">
                    your ai generated cover letter
                  </h1>

                  <div
                    className={`w-[100%] aigeneratedcoverletter flex flex-col gap-4 border-[#312E37] border rounded-[8px] p-[10px] md:[30px] shadow ${
                      msgLoading ? "animate-pulse" : ""
                    }`}
                  >
                    <div ref={componentRef}>
                      {isEditing ? (
                        <div
                          id="editor"
                          contentEditable="true"
                          className="card-h2 "
                          // dangerouslySetInnerHTML={{ __html: editedContent }}
                          // onInput={(e: React.ChangeEvent<HTMLDivElement>) => {
                          //   setEditedContent(e.target.innerHTML);
                          // }}
                        ></div>
                      ) : (
                        <div
                          className="card-h2"
                          dangerouslySetInnerHTML={{ __html: streamedData }}
                        ></div>
                      )}
                    </div>
                  </div>
                  <div className="buttons mt-5 flex flex-col flex-wrap md:flex-row gap-3">
                    {!isNaN(availablePercentageCoverLetter) &&
                      availablePercentageCoverLetter !== 0 && (
                        <button
                          type="button"
                          disabled={
                            msgLoading ||
                            !session?.user?.email ||
                            !aiInputUserData ||
                            selectedOption === "" ||
                            (selectedOption === "file" &&
                              selectedFile === "") ||
                            jobDescription === ""
                          }
                          onClick={handleGenerate}
                          className={`re-generate-btn flex flex-row justify-center items-center gap-2 py-3 px-[28px] rounded-full ${
                            (msgLoading ||
                              !session?.user?.email ||
                              !aiInputUserData ||
                              selectedOption === "" ||
                              (selectedOption === "file" &&
                                selectedFile === "") ||
                              jobDescription === "") &&
                            "opacity-50 cursor-not-allowed" // Apply these styles when the button is disabled
                          }`}
                        >
                          <span className="card-h2 text-[15px] font-semibold">
                            {msgLoading ? (
                              <div className="flex">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className={`w-4 h-4 mr-3 ${
                                    msgLoading ? "animate-spin" : ""
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
                                  className="w-4 h-4 card-h2"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                                  />
                                </svg>
                                <span
                                  className={`card-h2 ml-3 text-[15px] font-semibold cursor-pointer`}
                                >
                                  Re-generate Cover Letter
                                </span>
                              </div>
                            )}
                          </span>
                        </button>
                      )}

                    {/* <button onClick={handleDownload}>Download</button> */}
                    <ReactToPrint
                      trigger={() => (
                        <button
                          type="submit"
                          disabled={
                            !show || msgLoading || !session?.user?.email
                          }
                          className={`flex flex-row justify-center items-center gap-2 py-3 px-[28px] download-pdf-btn rounded-full ${
                            !show || msgLoading || !session?.user?.email
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          } `}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6 green-text"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                            />
                          </svg>

                          <span className="green-text text-[15px] font-semibold">
                            Download in PDF
                          </span>
                        </button>
                      )}
                      content={() => componentRef.current}
                      print={async (printIframe: HTMLIFrameElement) => {
                        const document = componentRef.current;
                        let doc: any = document?.querySelector(".text-white");
                        const clonedDoc = doc.cloneNode(true);
                        clonedDoc.style.color = "black";

                        if (document) {
                          const exporter = new Html2Pdf(clonedDoc);
                          exporter
                            .getPdf(false)
                            .then(async (pdf: any) => {
                              await pdf.save("cover_letter.pdf");
                            })
                            .catch((error: any) => console.log(error));
                        }
                      }}
                    />
                    {show && (
                      <button
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
                        className={` flex flex-row justify-center items-center gap-2 py-3 px-[28px] copy-to-clip-board-btn rounded-full ${
                          msgLoading ||
                          !session?.user?.email ||
                          !aiInputUserData ||
                          selectedOption === "" ||
                          (selectedOption === "file" && selectedFile === "") ||
                          (selectedOption === "aiResume" &&
                            setSelectedResumeId === "") ||
                          !show ||
                          isCoverLetterCopied
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
                          className="w-4 h-4 card-h2"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
                          />
                        </svg>

                        <span className="card-h2 text-[15px] font-semibold">
                          {msgLoading
                            ? "Please wait..."
                            : isCoverLetterCopied
                            ? "Copied"
                            : "Copy to clipboard"}
                        </span>
                      </button>
                    )}
                    {show && (
                      <div>
                        <button
                          type="button"
                          disabled={
                            !show || msgLoading || !session?.user?.email
                          }
                          onClick={handleClick}
                          className={` flex flex-row justify-center items-center gap-2 py-3 px-[28px] edit-btn rounded-full ${
                            !show || msgLoading || !session?.user?.email
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          } `}
                        >
                          <div className="flex flex-row gap-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-6 h-6 yellow-text"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                              />
                            </svg>
                            <span
                              className={`yellow-text text-[15px] font-semibold ${
                                !show || msgLoading || !session?.user?.email
                                  ? "opacity-50 cursor-not-allowed"
                                  : ""
                              } `}
                            >
                              Edit
                            </span>
                          </div>
                        </button>
                      </div>
                    )}

                    {isEditing && (
                      <button
                        type="submit"
                        onClick={handleSave}
                        className="flex flex-row justify-center ml-auto items-center gap-2 py-3 px-3 border-[#312E37] border rounded-full"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6 text-white"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              )}
              {showPopup && (
                <div className="bg-[#18181B] text-red-600 p-2 px-8 rounded-xl absolute top-4 left-1/2 transform -translate-x-1/2">
                  {/* Popup content here */}
                  Credit Limit Reached !
                </div>
              )}
            </div>
          </>
        </div>
      </div>
    </>
  );
}
