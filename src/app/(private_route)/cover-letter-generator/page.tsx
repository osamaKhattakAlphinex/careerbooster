"use client";
import React, { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { setField, setIsLoading, setUserData } from "@/store/userDataSlice";
import ReactToPrint from "react-to-print";
import Link from "next/link";
import { leftArrowIcon } from "@/helpers/iconsProvider";
import copy from "clipboard-copy";
import CoverLetterFileUploader from "@/components/new-dashboard/dashboard/cover-letter-generator/CoverLetterFileUploader";
import CoverLetterResumeSelector from "@/components/dashboard/cover-letter-bot/CoverLetterResumeSelector";
import Button from "@/components/utilities/form-elements/Button";
import LimitCard from "@/components/new-dashboard/dashboard/LimitCard";
import axios from "axios";
import { htmlToPlainText } from "@/helpers/HtmlToPlainText";
import PreviouslyGeneratedList from "@/components/PreviouslyGeneratedList";
import { makeid } from "@/helpers/makeid";
import { resetCoverLetter, setCoverLetter } from "@/store/coverLetterSlice";

import AiGeneratedCoverLetters from "@/components/new-dashboard/dashboard/cover-letter-generator/AiGeneratedCoverLetters";
import CoverLetterCardSingle from "@/components/new-dashboard/dashboard/cover-letter-generator/CoverLetterCardSingle";
import MainCoverLetterTool from "@/components/new-dashboard/dashboard/cover-letter-generator/MainCoverLetterTool";
import Image from "next/image";

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
  const [editedContent, setEditedContent] = useState<string>("");

  // Function to toggle editing mode on double-click
  const handleClick: any = () => {
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

              // Save cover letter to the DB
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
    Component: (card: any) => (
      <CoverLetterCardSingle
        card={card}
        source="dashboard"
        componentRef={componentRef}
      />
    ),
  };

  useEffect(() => {
    setStreamedData(coverLetter.coverLetterText);
  }, [coverLetter.coverLetterText]);
  const [uploadPdfFile, setUploadPdfFile] = useState<string>("useYourPersona");
  return (
    <>
      <div className="w-full sm:w-full z-1000 ">
        <div className="ml-[244px] px-[15px] mb-[72px] ">
          {/* <AiGeneratedCoverLetters /> */}
          <PreviouslyGeneratedList {...historyProps} />
          {/* <MainCoverLetterTool /> */}
          <>
            <div className=" bg-[#17151B] rounded-[20px]  px-[30px] py-[41px] flex flex-col gap-5 ">
              {/* header */}
              <div className="flex flex-row justify-between items-center">
                <h3 className=" text-sm uppercase text-white font-bold">
                  Generate Cover Letter
                </h3>
                <div className=" text-sm text-white uppercase font-bold">
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
                <span className="uppercase font-bold block gro">
                  select options
                </span>
              </div>

              <div className="flex flex-col gap-5 lg:px-0 px-8">
                <label
                  htmlFor="default-radio-1"
                  className={`flex gap-3 items-center rounded-full border-[1px] border-[#353672] lg:px-6 lg:py-3 py-3 cursor-pointer lg:text-[15px] text-[11px] text-white w-[400px] ${
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
                  className={`flex gap-3 items-center rounded-full border-[1px] border-[#353672] lg:px-6 lg:py-3 py-3 cursor-pointer lg:text-[15px] text-[11px] text-white w-[290px] ${
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
                    className=" font-bold text-[23px] text-white flex py-[20px] gap-[3px]"
                  >
                    Paste Your Job Description
                    <span className="text-[#F04248] text-[19px]">*</span>
                  </label>
                  <textarea
                    id="job-title"
                    name="jobTitle"
                    rows={6}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Copy the job description for the position you are applying and paste it here to generate a tailor cover letter."
                    className="w-full  px-[26px] rounded-[8px] text-sm text-[#959595] bg-transparent border-[#312E37] border pt-3"
                  />
                </div>
                {!isNaN(availablePercentageCoverLetter) &&
                  availablePercentageCoverLetter !== 0 && (
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
                      className={`bg-gradient-to-r from-[#B324D7] to-[#615DFF] flex flex-row justify-center items-center gap-2 py-3 px-[28px] rounded-full ${
                        (msgLoading ||
                          !session?.user?.email ||
                          !aiInputUserData ||
                          selectedOption === "" ||
                          (selectedOption === "file" && selectedFile === "") ||
                          jobDescription === "") &&
                        "opacity-50 cursor-not-allowed" // Apply these styles when the button is disabled
                      }`}
                    >
                      <Image
                        src="/icon/u_bolt-alt.svg"
                        alt="bold icon"
                        height={18}
                        width={18}
                      />
                      <span className="text-white text-[15px] font-semibold">
                        {msgLoading
                          ? "Please wait..."
                          : "Generate Cover Letter"}
                      </span>
                    </button>
                  )}
              </div>

              {show && (
                <div className="mt-[40px] ">
                  <h1 className="uppercase text-white font-bold text-[18px] pb-5">
                    your ai generated cover letter
                  </h1>
                  {/* <div className="aigeneratedcoverletter flex flex-col gap-4 border-[#312E37] border rounded-[8px] p-[30px]">
                    <div
                      className={`w-[100%] text-white ${
                        msgLoading ? "animate-pulse" : ""
                      }`}
                    >
                      <div ref={componentRef}>
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
                              className="text-white text-color"
                              dangerouslySetInnerHTML={{ __html: streamedData }}
                            ></div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div> */}
                  <div
                    className={`w-[90%] aigeneratedcoverletter flex flex-col gap-4 border-[#312E37] border rounded-[8px] p-[30px] shadow ${
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
                    <div ref={componentRef}>
                      {isEditing ? (
                        <div
                          id="editor"
                          contentEditable="true"
                          className="text-white "
                          // dangerouslySetInnerHTML={{ __html: editedContent }}
                          // onInput={(e: React.ChangeEvent<HTMLDivElement>) => {
                          //   setEditedContent(e.target.innerHTML);
                          // }}
                        ></div>
                      ) : (
                        <div
                          className="text-white "
                          dangerouslySetInnerHTML={{ __html: streamedData }}
                        ></div>
                      )}
                    </div>
                  </div>
                  <div className="buttons mt-5 flex gap-3">
                    {!isNaN(availablePercentageCoverLetter) &&
                      availablePercentageCoverLetter !== 0 && (
                        <button
                          disabled={
                            msgLoading ||
                            !session?.user?.email ||
                            !aiInputUserData ||
                            selectedOption === "" ||
                            (selectedOption === "file" &&
                              selectedFile === "") ||
                            // (selectedOption === "aiResume" &&
                            //   setSelectedResumeId === "") ||
                            jobDescription === ""
                          }
                          onClick={handleGenerate}
                          className={`flex flex-row justify-center items-center gap-2 py-3 px-[28px] border-[#B324D7] border rounded-full ${
                            (msgLoading ||
                              !session?.user?.email ||
                              !aiInputUserData ||
                              selectedOption === "" ||
                              (selectedOption === "file" &&
                                selectedFile === "") ||
                              jobDescription === "") &&
                            "opacity-50 cursor-not-allowed" // Add this class when the button is disabled
                          }`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="w-4 h-4 text-white"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                            />
                          </svg>
                          <span className="text-white text-[15px] font-semibold">
                            Re-generate Cover Letter
                          </span>
                        </button>
                      )}

                    <ReactToPrint
                      trigger={() => (
                        <button
                          type="submit"
                          disabled={
                            !show || msgLoading || !session?.user?.email
                          }
                          className={`flex flex-row justify-center items-center gap-2 py-3 px-[28px] border-[#37B944] border rounded-full ${
                            !show || msgLoading || !session?.user?.email
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          } `}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="w-6 h-6 text-[#37B944]"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                            />
                          </svg>

                          <span className="text-[#37B944] text-[15px] font-semibold">
                            Download in PDF
                          </span>
                        </button>
                      )}
                      content={() => componentRef.current}
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
                        className={` flex flex-row justify-center items-center gap-2 py-3 px-[28px] border-[#312E37] border rounded-full ${
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
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-4 h-4 text-white"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
                          />
                        </svg>

                        <span className="text-white text-[15px] font-semibold">
                          {msgLoading ? "Please wait..." : "Copy to clipboard"}
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
                          className={` flex flex-row justify-center items-center gap-2 py-3 px-[28px] border-[#312E37] border rounded-full `}
                        >
                          <div className="flex flex-row gap-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              className="w-6 h-6 text-yellow-200"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                              />
                            </svg>
                            <span className="text-yellow-200 text-[15px] font-semibold">
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
            </div>
          </>
        </div>
      </div>
    </>
  );
}
