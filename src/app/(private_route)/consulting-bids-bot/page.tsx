"use client";
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "@/store/userDataSlice";

import CoverLetterFileUploader from "@/components/dashboard/cover-letter-generator/CoverLetterFileUploader";

import axios from "axios";
import { htmlToPlainText } from "@/helpers/HtmlToPlainText";
import copy from "clipboard-copy";
import ConsultingBidCardSingle from "@/components/dashboard/consulting-bids-generator/ConsultingBidCardSingle";
import PreviouslyGeneratedList from "@/components/dashboard/PreviouslyGeneratedList";
import { makeid } from "@/helpers/makeid";
import { setConsultingBid } from "@/store/consultingBidSlice";

import DownloadService from "@/helpers/downloadFile";
import { useAppContext } from "@/context/AppContext";
import { EditIcon } from "@/helpers/iconsProvider";

const ConsultingBidsGenerator = () => {
  const componentRef = useRef<any>(null);
  const [aiInputUserData, setAiInputUserData] = useState<any>();
  const [msgLoading, setMsgLoading] = useState<boolean>(false); // msg loading
  const { data: session } = useSession();
  const [show, setShow] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>("profile"); // type
  const [streamedData, setStreamedData] = useState<string>("");
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string>("");
  const [setSelectedResumeId, setSetSelectedResumeId] = useState<string>("");
  const [jobDescription, setJobDescription] = useState<string>("");
  const [isBidCopied, setIsBidCopied] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState(false);
  const { setAvailableCredits } = useAppContext();

  // limit bars

  // Redux
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.userData);
  const consultingBid = useSelector((state: any) => state.consultingBid);
  console.log(consultingBid);

  const creditLimits = useSelector((state: any) => state.creditLimits);

  const { resumes } = userData;
  const copyBid = async (text: string) => {
    try {
      const consultingBidData = htmlToPlainText(text);
      await copy(consultingBidData);
      setIsBidCopied(true);
      setTimeout(() => {
        setIsBidCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy text: ", error);
    }
  };

  const handleClick = () => {
    // setEditedContent(streamedData);
    setIsEditing(true);
  };

  useEffect(() => {
    if (isEditing) {
      if (componentRef.current) {
        const editorElement = componentRef.current.querySelector("#editor");
        if (editorElement) {
          editorElement.innerHTML = consultingBid.consultingBidText;
        }
      }
    }
    // else {
    //   dispatch(resetConsultingBid());
    // }
  }, [isEditing]);

  const handleGenerate = async () => {
    if (session?.user?.email && aiInputUserData) {
      setMsgLoading(true);
      setShow(true);
      setStreamedData("");
      const consultingBidId = makeid();
      const obj: any = {
        consultingBidId: consultingBidId,
        type: selectedOption,
        email: session?.user?.email,

        creditsUsed: creditLimits.consulting_bids_generation,
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
      fetch("/api/consultingBidBot/ConsultingBidGenerator", {
        method: "POST",
        body: JSON.stringify(obj),
      })
        .then(async (resp: any) => {
          if (resp.ok) {
            setAvailableCredits(true);

            const reader = resp.body.getReader();
            let tempText = "";
            while (true) {
              const { done, value } = await reader.read();
              if (done) {
                break;
              }
              const text = new TextDecoder().decode(value);
              setStreamedData((prev) => prev + text);
              tempText += text;
            }

            // const payload = {
            //   id: makeid(),
            //   jobDescription: jobDescription,
            //   consultingBidText: tempText,
            //   generatedOnDate: new Date().toISOString(),
            //   generatedViaOption: selectedOption,
            //   userEmail: session?.user?.email,
            // };

            const consultingBidResponse = await axios.get(
              "/api/consultingBidBot/getAllConsultingBids"
            );
            console.log(consultingBidResponse);

            const updatedObject = {
              ...userData,
              consultingBids: consultingBidResponse.data.result.consultingBids,
            };
            dispatch(setUserData({ ...userData, ...updatedObject }));
            dispatch(
              setConsultingBid(
                consultingBidResponse.data.result.consultingBids[
                  consultingBidResponse.data.result.consultingBids.length - 1
                ]
              )
            );
          } else {
            const res = await resp.json();
            setStreamedData(res.result + "! You ran out of Credits");
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

  const handleSave = async () => {
    let _consultingBidText = "";

    if (componentRef.current) {
      const editorElement = componentRef.current.querySelector("#editor");
      if (editorElement) {
        _consultingBidText = editorElement.innerHTML;
        editorElement.innerHTML = "";
      }
    }

    // setStreamedData(editedContent);
    setIsEditing(false);
    const payLoad = {
      consultingBidText: _consultingBidText, //editedContent,
      generatedOnDate: consultingBid.generatedOnDate,
      generatedViaOption: consultingBid.generatedViaOption,
      id: consultingBid.id,
      jobDescription: consultingBid.jobDescription,
      userEmail: consultingBid.userEmail,
    };

    const updatedConsultingBids = await axios.put(
      `/api/consultingBidBot/${consultingBid.id}`,
      payLoad,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    const updatedObject = {
      ...userData,
      consultingBids: updatedConsultingBids.data.results,
    };
    dispatch(setUserData({ ...updatedObject }));
    dispatch(setConsultingBid(payLoad));
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
    //   userData.results.consultingBidsGeneration &&
    //   userData.results.consultingBidsGeneration !== ""
    // ) {
    //   setShow(true);
    //   setStreamedData(userData.results.consultingBidsGeneration);
    // }
    if (!streamedData) {
      setStreamedData(consultingBid.consultingBidText);
    }
  }, [userData]);

  useEffect(() => {
    if (consultingBid.id !== "") {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [consultingBid]);

  useEffect(() => {
    setStreamedData(consultingBid.consultingBidText);
  }, [consultingBid.consultingBidText]);
  const historyProps = {
    dataSource: "consultingBids",
    Component: (card: any) => (
      <ConsultingBidCardSingle card={card} componentRef={componentRef} />
    ),
  };

  return (
    <>
      <div className="w-full sm:w-full z-1000 ">
        <div className="ml-0 lg:ml-[234px] px-[15px] mb-[72px] ">
          {/* <Link
            href="/dashboard"
            className="ml-2 my-4 no-underline dark:text-[#b324d7] dark:hover:text-[#e6f85e] text-gray-950 hover:text-[#b324d7] flex flex-row gap-2 items-center ] hover:opacity-80 transition-all"
          >
            {leftArrowIcon}
            Back
          </Link> */}

          {/* <AiGeneratedConsultingBids /> */}
          <PreviouslyGeneratedList {...historyProps} />
          {/* <MainConsultingBidTool /> */}
          <>
            <div className=" dark:bg-[#17151b] dark:text-white bg-[#00000015] text-gray-950  rounded-[20px] px-4  lg:px-[30px] py-[41px] flex flex-col gap-5 ">
              {/* header */}
              <div className="flex flex-col items-center justify-between md:flex-row">
                <h3 className="text-[16px] md:text-sm uppercase dark:text-gray-100 text-gray-950 font-bold">
                  Consulting Bids Generator
                </h3>
                <div className="text-sm font-bold uppercase  dark:text-gray-100 text-gray-950">
                  {/* <LimitCard
                    title="Email Availble"
                    limit={
                      userData?.userPackageData?.limit
                        ?.consulting_bids_generation
                    }
                    used={userData?.userPackageUsed?.consulting_bids_generation}
                    setPercentageCalculated={setPercentageCalculated}
                    availablePercentage={availablePercentage}
                    setAvailablePercentage={setAvailablePercentage}
                  /> */}
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
              <div className="flex flex-col gap-5 lg:px-0">
                <label
                  htmlFor="default-radio-1"
                  className={`flex gap-3 items-center rounded-full border-[1px] border-[#353672] px-4 lg:px-6 lg:py-3 py-3 cursor-pointer lg:text-[15px] text-[11px] dark:text-gray-100 text-gray-950 w-[290px] lg:w-[400px] ${
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
                  Use My Persona to write Consulting Bid
                </label>
                <label
                  htmlFor="default-radio-2"
                  className={`flex gap-3 items-center rounded-full border-[1px] border-[#353672] px-4 lg:px-6 lg:py-3 py-3 cursor-pointer lg:text-[15px] text-[11px] dark:text-gray-100 text-gray-950  w-[220px] lg:w-[290px] ${
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
              <div className="flex flex-col items-start justify-between gap-5">
                <div className="flex flex-col w-full">
                  <label className=" font-bold justify-between items-center text-md md:text-[24px] dark:text-gray-100 text-gray-950 flex py-[20px] gap-[3px]">
                    <div>
                      Paste Your Job Description
                      <span className="text-[#F04248] text-md md:text-[24px]">
                        *
                      </span>
                    </div>
                    <div
                      className={`text-[#000]  group relative rounded-full h-8 md:ml-3 flex  items-center px-[16px] py-[6px]  bg-[#FEB602] xs:text-[10px] md:text-[12px]  font-bold `}
                    >
                      {creditLimits?.consulting_bids_generation} Credits
                      <div className="w-44 bg-gradient-to-r  from-[#B324D7] to-[#615DFF] font-medium xs:text-[10px] md:text-[12px] px-2 absolute xs:-left-32 xs:-top-12  md:-top-14  hidden group-hover:block  xs:rounded-br-none  text-gray-100  mb-6 shadow-xl rounded-xl py-2  transition-all">
                        {creditLimits?.consulting_bids_generation} credits will
                        be used for Bid Generation
                      </div>
                    </div>
                  </label>
                  <textarea
                    id="job-title"
                    name="jobTitle"
                    rows={6}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Copy the job description for the position you are applying and paste it here to generate a tailored consulting bid."
                    className="w-full px-3 lg:px-[26px] rounded-[8px] text-sm text-[#959595] bg-transparent border-[#312E37] border-[1px] pt-3"
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
                  className={`dark:bg-gradient-to-r from-[#b324d7] to-[#615dff] dark:border-none dark:border-0 border-[1px] border-gray-950 bg-transparent s flex flex-row justify-center items-center gap-2 py-3 px-[28px] rounded-full ${
                    (msgLoading ||
                      !session?.user?.email ||
                      !aiInputUserData ||
                      selectedOption === "" ||
                      (selectedOption === "file" && selectedFile === "") ||
                      jobDescription === "") &&
                    "opacity-50 cursor-not-allowed" // Apply these styles when the button is disabled
                  }`}
                >
                  {/* <Image
                  src="/icon/u_bolt-alt.svg"
                  alt="bold icon"
                  height={18}
                  width={18}
                /> */}
                  <span className="dark:text-gray-100 text-gray-950 text-[15px] font-semibold">
                    {msgLoading ? (
                      <div className="flex">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className={`w-4 h-4 mr-3 dark:text-gray-100 text-gray-950 ${
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
                          Generate Bid
                        </span>
                      </div>
                    )}
                  </span>
                </button>
              </div>
              {show && (
                <div className="mt-[40px] ">
                  <h1 className="uppercase dark:text-gray-100 text-gray-950 font-bold text-[18px] pb-5">
                    your ai generated bid
                  </h1>

                  <div
                    className={`w-[100%] aigeneratedconsultingbid flex flex-col gap-4 border-[#312E37] border-[1px] rounded-[8px] p-[10px] md:p-[30px]  shadow ${
                      msgLoading ? "animate-pulse" : ""
                    }`}
                  >
                    <div ref={componentRef}>
                      {isEditing ? (
                        <div
                          id="editor"
                          contentEditable="true"
                          className="dark:text-gray-100 text-gray-950 "
                          // dangerouslySetInnerHTML={{ __html: streamedData }}
                          // onInput={(e: React.ChangeEvent<HTMLDivElement>) => {
                          //   setEditedContent(e.target.innerHTML);
                          // }}
                        ></div>
                      ) : (
                        <div>
                          <div
                            className="dark:text-gray-100 text-gray-950 "
                            dangerouslySetInnerHTML={{ __html: streamedData }}
                          ></div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 mt-5 buttons md:flex-row">
                    <div>
                      <button
                        disabled={
                          msgLoading ||
                          !session?.user?.email ||
                          !aiInputUserData ||
                          selectedOption === "" ||
                          (selectedOption === "file" && selectedFile === "") ||
                          // (selectedOption === "aiResume" &&
                          //   setSelectedResumeId === "") ||
                          jobDescription === ""
                        }
                        onClick={handleGenerate}
                        className={` flex gap-2 items-center  lg:text-sm text-xs lg:px-6 px-3 py-2 rounded-full dark:bg-[#18181b]  text-gray-300 border-[1px] ${
                          (msgLoading ||
                            !session?.user?.email ||
                            !aiInputUserData ||
                            selectedOption === "" ||
                            (selectedOption === "file" &&
                              selectedFile === "") ||
                            jobDescription === "") &&
                          "cursor-not-allowed" // Add this class when the button is disabled
                        }`}
                      >
                        <span className="text-sm dark:text-gray-300 text-gray-950 ">
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
                                className="w-4 h-4 dark:text-gray-100 text-gray-950"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                                />
                              </svg>
                              <span
                                className={`dark:text-gray-300 text-gray-950 ml-3 text-sm  cursor-pointer`}
                              >
                                Re-generate
                              </span>
                            </div>
                          )}
                        </span>
                      </button>
                    </div>
                    <DownloadService
                      componentRef={componentRef}
                      type="onPage"
                      fileName="ai-consulting-bid"
                    />
                    {show && (
                      <div>
                        <button
                          disabled={
                            msgLoading ||
                            !session?.user?.email ||
                            !aiInputUserData ||
                            selectedOption === "" ||
                            (selectedOption === "file" &&
                              selectedFile === "") ||
                            (selectedOption === "aiResume" &&
                              setSelectedResumeId === "") ||
                            !show ||
                            isBidCopied
                          }
                          onClick={() => copyBid(streamedData)}
                          className={`xs:flex-1 flex gap-2 items-center  lg:text-sm text-xs lg:px-6 px-3 py-2 rounded-full dark:bg-[#18181b]  text-gray-300 border-[1px] ${
                            msgLoading ||
                            !session?.user?.email ||
                            !aiInputUserData ||
                            selectedOption === "" ||
                            (selectedOption === "file" &&
                              selectedFile === "") ||
                            (selectedOption === "aiResume" &&
                              setSelectedResumeId === "") ||
                            !show ||
                            isBidCopied
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
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
                            />
                          </svg>

                          <span className="dark:text-gray-100 text-gray-950 text-[15px] ">
                            {msgLoading
                              ? "Please wait..."
                              : isBidCopied
                              ? "Copied"
                              : "Copy to clipboard"}
                          </span>
                        </button>
                      </div>
                    )}
                    {show && (
                      <div>
                        <button
                          type="button"
                          disabled={
                            !show || msgLoading || !session?.user?.email
                          }
                          onClick={handleClick}
                          className={`xs:flex-1 flex gap-2 items-center  lg:text-sm text-xs lg:px-6 px-3 py-2 rounded-full dark:bg-[#18181b]  text-gray-300 border-[1px] ${
                            !show || msgLoading || !session?.user?.email
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                        >
                          {EditIcon}
                          <span className="dark:text-gray-100 text-gray-950 text-[15px] ">
                            Edit
                          </span>
                        </button>
                      </div>
                    )}
                    {isEditing && (
                      <button
                        type="submit"
                        onClick={handleSave}
                        className="flex flex-row justify-center ml-auto items-center gap-2 py-3 px-3 border-[#312E37] border-[1px] rounded-full"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 20 24"
                          fill="none"
                          className="text-gray-950"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M15.7895 21H4.15512C3.71432 21 3.29157 20.7893 2.97988 20.4142C2.66818 20.0391 2.49307 19.5304 2.49307 19V5C2.49307 4.46957 2.66818 3.96086 2.97988 3.58579C3.29157 3.21071 3.71432 3 4.15512 3H13.2964L17.4515 8V19C17.4515 19.5304 17.2764 20.0391 16.9647 20.4142C16.653 20.7893 16.2303 21 15.7895 21Z"
                            stroke="black"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M14.1274 21V13H5.81717V21"
                            stroke="black"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M5.81717 3V8H12.4654"
                            stroke="black"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Save
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
};

export default ConsultingBidsGenerator;
