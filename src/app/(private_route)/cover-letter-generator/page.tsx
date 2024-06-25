"use client";
import React, { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "@/store/userDataSlice";

import copy from "clipboard-copy";
import CoverLetterFileUploader from "@/components/dashboard/cover-letter-generator/CoverLetterFileUploader";
import "@/app/(private_route)/dashboard.css";

import axios from "axios";
import { htmlToPlainText } from "@/helpers/HtmlToPlainText";
import PreviouslyGeneratedList from "@/components/dashboard/PreviouslyGeneratedList";
import { setCoverLetter } from "@/store/coverLetterSlice";

import CoverLetterCardSingle from "@/components/dashboard/cover-letter-generator/CoverLetterCardSingle";
import { EditIcon, boltIcon } from "@/helpers/iconsProvider";
import { makeid } from "@/helpers/makeid";
import DownloadService from "@/helpers/downloadFile";
import { useAppContext } from "@/context/AppContext";
import { showSuccessToast, showErrorToast } from "@/helpers/toast";
import DeleteConfirmationModal from "@/components/common/ConfirmationModal";
import { useRouter } from "next/navigation";
import { getFormattedDate } from "@/helpers/getFormattedDateTime";
import EditableField from "@/components/dashboard/EditableField";
import { useTourContext } from "@/context/TourContext";
import TourBot from "@/components/dashboard/TourBot";
import { RootState } from "@/store/store";

export default function CoverLetterPage() {
  const componentRef = useRef<HTMLDivElement | null>(null);
  const [aiInputUserData, setAiInputUserData] = useState({});
  const [msgLoading, setMsgLoading] = useState<boolean>(false); // msg loading
  const { data: session } = useSession();
  const [show, setShow] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>("profile"); // type
  const [streamedData, setStreamedData] = useState<string>("");
  const [isCoverLetterCopied, setIsCoverLetterCopied] =
    useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<string>("");
  const [jobDescription, setJobDescription] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const {
    setAvailableCredits,
    abortController,
    setAbortController,
    outOfCredits,
    setOutOfCredits,
  } = useAppContext();
  const [confirmationModal, setConfirmationModal] = useState<boolean>(false);
  const creditLimits = useSelector((state: RootState) => state.creditLimits);
  const router = useRouter();

  const handleClick = () => {
    setIsEditing((prevState) => !prevState);
  };

  let date = new Date();

  useEffect(() => {
    if (isEditing) {
      if (componentRef.current) {
        const editorElement: HTMLDivElement | null =
          componentRef.current.querySelector("#editor");
        if (editorElement) {
          editorElement.innerHTML = coverLetter.coverLetterText;
          editorElement.focus(); // Focus on the editable area
        }
      }
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

    setIsEditing(false);
    const payLoad = {
      coverLetterText: _coverLetterText, //editedContent,
      generatedOnDate: coverLetter.generatedOnDate,
      generatedViaOption: coverLetter.generatedViaOption,
      name: coverLetter.name,
      phone: coverLetter.phone,
      email: coverLetter.email,
      address: coverLetter.address,
      date: coverLetter.date,
      id: coverLetter.id,
      jobDescription: coverLetter.jobDescription,
      userEmail: coverLetter.userEmail,
    };

    const updatedCoverLetters = await axios.put(
      `/api/coverLetterBot/${coverLetter.id}`,
      payLoad,
      {
        headers: { "Content-Type": "application/json" },
        signal: abortController?.signal,
      }
    );

    const updatedObject = {
      ...userData,
      coverLetters: updatedCoverLetters.data.results,
    };
    dispatch(setUserData({ ...updatedObject }));
    dispatch(setCoverLetter(payLoad));
    showSuccessToast("Cover Letter Saved");
  };

  // Redux
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.userData);
  const coverLetter = useSelector((state: RootState) => state.coverLetter);
  const handleSingleSave = async (obj: {}) => {
    const [[key, value]] = Object.entries(obj);
    const payload = {
      ...coverLetter,
      [key]: value,
    };
    const updatedCoverLetters = await axios.put(
      `/api/coverLetterBot/${coverLetter.id}`,
      payload,
      {
        headers: { "Content-Type": "application/json" },
        signal: abortController?.signal,
      }
    );

    const updatedObject = {
      ...userData,
      coverLetters: updatedCoverLetters.data.results,
    };
    dispatch(setUserData({ ...updatedObject }));
    dispatch(setCoverLetter(payload));
    showSuccessToast("Cover Letter Saved");
  };

  const handleGenerate = async () => {
    if (session?.user?.email && aiInputUserData) {
      setMsgLoading(true);
      setShow(true);
      setStreamedData("");
      const coverletterId = makeid();
      const obj = {
        coverletterId: coverletterId,
        type: selectedOption,
        name: userData.firstName + " " + userData.lastName,
        phone: userData.phone,
        email: userData.email,
        address:
          userData?.contact?.street +
          " " +
          userData?.contact?.cityState +
          " " +
          userData?.contact?.country +
          " " +
          userData?.contact?.postalCode,
        date: getFormattedDate(date, "MM DD, YYYY"),
        creditsUsed: creditLimits.cover_letter_generation,
        jobDescription,
        trainBotData: {
          userEmail: userData.email,
          fileAddress: userData.uploadedResume.fileName,
        },
        file: "",
        userData: {},
      };

      if (selectedOption === "file") {
        obj.file = selectedFile;
      } else {
        obj.userData = aiInputUserData;
      }

      fetch("/api/coverLetterBot/coverLetterGenerator", {
        method: "POST",
        body: JSON.stringify(obj),
        signal: abortController?.signal,
      })
        .then(async (resp) => {
          if (resp.ok && resp.body) {
            setAvailableCredits(true);
            const reader = resp.body.getReader();
            let tempText = "";
            while (true) {
              const { done, value } = await reader.read();
              if (done) {
                showSuccessToast("Cover letter generated successfully");
                break;
              }
              const text = new TextDecoder().decode(value);
              // const text = response.result;
              setStreamedData((prev) => prev + text);
              tempText += text;
            }
            setStreamedData((prev) => prev.replace("```html", ""));
            setStreamedData((prev) => prev.replace("```", ""));
            const coverLetterResponse = await axios.get(
              "/api/coverLetterBot/getAllCoverLetters",
              { signal: abortController?.signal }
            );

            if (coverLetterResponse.data.success) {
              const updatedObject = {
                ...userData,
                coverLetters: coverLetterResponse.data.result.coverLetters,
              };
              dispatch(setUserData({ ...userData, ...updatedObject }));
              dispatch(
                setCoverLetter(coverLetterResponse.data.result.coverLetters[0])
              );
            }
          } else {
            const res = await resp.json();
            if (resp.status === 429) {
              showErrorToast("You ran out of credits!");
              setOutOfCredits(true);
              setStreamedData(res.result + "! You ran out of Credits");
              // setConfirmationModal(true);
            } else {
              showErrorToast("Failed to generate cover letter");
            }
          }
        })
        .catch((err) => {
          console.log(err);
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

  const onConfirm = () => {
    router.push("/subscribe");
  };
  const copyCoverLetter = async (text: string) => {
    try {
      const coverLetterData = htmlToPlainText(text);
      await copy(coverLetterData);
      setIsCoverLetterCopied(true);
      // Set isHeadlineCopied to false after a delay (e.g., 2000 milliseconds or 2 seconds)
      setTimeout(() => {
        setIsCoverLetterCopied(false);
      }, 1500);
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
    return () => {
      abortController?.abort();
      setAbortController(new AbortController());
    };
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
    Component: (card) => (
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

  const {
    coverLetterElementRef,
    tourBotRef,
    historyCardRef,
    availableCreditsRef,
  } = useTourContext();

  const tourBotConfig = {
    name: "coverLetter",
    audios: [
      {
        url: "/cover-letter-history-card.mp3",
        for: "history",
      },
      {
        url: "/cover-letter-main.mp3",
        for: "tool",
      },
    ],
    toolRefs: [
      {
        ref: historyCardRef,
        for: "history",
      },
      {
        ref: coverLetterElementRef,
        for: "tool",
      },
    ],
  };

  const tourBotConfig2 = {
    name: "resumeBuilder",
    audios: [
      {
        url: "/OutOfCredits.mp3",
        for: "history",
      },
    ],
    toolRefs: [
      {
        ref: availableCreditsRef,
        for: "history",
      },
    ],
  };

  useEffect(() => {
    if (userData && userData?.tours) {
      if (!userData.tours.coverLetter) {
        setTimeout(() => {
          tourBotRef?.current?.click();
        }, 500);
      }
    }
  }, [tourBotRef]);

  useEffect(() => {
    if (outOfCredits) {
      setTimeout(() => {
        tourBotRef?.current?.click();
      }, 500);
    }
  }, [outOfCredits]);

  return (
    <>
      <div className="w-full sm:w-full z-1000">
        <div className="ml-0 lg:ml-[234px] px-[15px] mb-[72px]">
          <PreviouslyGeneratedList {...historyProps} />

          {/* <MainCoverLetterTool /> */}
          <>
            <div
              ref={(ref: HTMLDivElement) =>
                (coverLetterElementRef.current = ref)
              }
              className=" dark:bg-[#17151b] dark:text-white bg-[#00000015] text-gray-950 rounded-lg px-4 lg:px-[30px] py-6  flex flex-col gap-3 "
            >
              {/* header */}
              <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
                <h3 className="text-sm font-bold uppercase md:text-base dark:text-gray-100 text-gray-950">
                  Generate Cover Letter
                </h3>
                {/* <div className="text-sm font-bold uppercase dark:text-gray-100 text-gray-950"></div> */}
              </div>

              {/* option */}

              <div className="text-sm text-[#615DFF] self-start">
                <span className="uppercase text-[11px] md:text-sm font-bold block gro">
                  select options
                </span>
              </div>

              <div className="flex flex-col gap-3 lg:px-0 ">
                <label
                  htmlFor="default-radio-1"
                  className={`flex gap-3 items-center rounded-full   cursor-pointer lg:text-[15px] text-[11px]  w-fit ${
                    selectedOption === "profile"
                      ? "dark:text-[#f0f0f0] text-gray-950"
                      : "dark:text-[#959595] text-[#acabab]"
                  }`}
                >
                  <input
                    id="default-radio-1"
                    type="radio"
                    value="profile"
                    name="default-radio"
                    onChange={(e) => setSelectedOption(e.target.value)}
                    // onChange={(e) => {
                    //   setUploadPdfFile(e.target.value);
                    // }}
                    checked={selectedOption === "profile"}
                    className="h-4 w-fit accent-[#B324D7]"
                  />
                  Use my existing resume/data
                </label>
                <label
                  htmlFor="default-radio-2"
                  className={`flex gap-3 items-center rounded-full    cursor-pointer lg:text-[15px] text-[11px]  w-fit ${
                    selectedOption === "file"
                      ? "dark:text-[#f0f0f0] text-gray-950"
                      : "dark:text-[#959595] text-[#acabab]"
                  } `}
                >
                  <input
                    id="default-radio-2"
                    type="radio"
                    value="file"
                    onChange={(e) => {
                      setSelectedFile("");
                      setSelectedOption(e.target.value);
                    }}
                    name="default-radio"
                    className="w-fit h-4  accent-[#B324D7]"
                    checked={selectedOption === "file"}
                  />
                  Upload a new resume or choose from the uploaded list of files
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
              <div className="flex flex-col items-start justify-between gap-5 ">
                <div className="flex flex-col w-full">
                  <label className="flex items-center justify-between gap-1 mb-1 text-sm xs:font-semibold md:font-bold md:text-lg dark:text-gray-100 text-gray-950/80 lg:pb-4">
                    <span className="text-[10px] md:text-sm dark:text-gray-100 text-gray-950 uppercase font-bold after:content-['*'] after:text-[#F04248] after:ml-1 py-4">
                      Paste Job Description
                    </span>
                    <div className="text-gray-950/80 group relative rounded-full md:ml-3 flex items-center px-2  md:px-4 md:py-2  bg-[#FEB602] text-[10px] sm:text-sm font-semibold">
                      {creditLimits?.cover_letter_generation}
                      <div className="pl-1"> Credits</div>
                      <div className="w-44 bg-gradient-to-r  from-[#B324D7] to-[#615DFF] font-medium xs:text-[10px] md:text-[12px] px-2 absolute xs:-left-32 xs:-top-12  md:-top-14  hidden group-hover:block  xs:rounded-br-none  text-gray-100 xs:mb-7 md:mb-6 shadow-xl rounded-xl py-2  transition-all">
                        {creditLimits?.cover_letter_generation} credits will be
                        used for Cover Letter Generation
                      </div>
                    </div>
                  </label>
                  <textarea
                    id="job-title"
                    name="jobTitle"
                    rows={6}
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Copy the job description for the position you are applying and paste it here to generate a tailor cover letter."
                    className="w-full px-3 lg:px-8 rounded-lg text-xs md:text-sm text-[#959595] bg-transparent border-[#312E37] border-[1px] pt-3"
                  />
                </div>
                <div className="flex justify-end w-full items-center">
                  <button
                    type="button"
                    disabled={
                      selectedOption === "" ||
                      (selectedOption === "file" && selectedFile === "") ||
                      jobDescription === ""
                    }
                    onClick={handleGenerate}
                    className={`w-max flex flex-row transition-all duration-300  group justify-center sm:justify-start lg:px-6 px-4 py-2 rounded-full dark:bg-gradient-to-r from-[#b324d7] to-[#615dff] dark:border-none dark:border-0 border-[1.5px] border-gray-950 bg-transparent ${
                      (selectedOption === "" ||
                        (selectedOption === "file" && selectedFile === "") ||
                        jobDescription === "") &&
                      "opacity-50 cursor-not-allowed" // Apply these styles when the button is disabled
                    }`}
                  >
                    {msgLoading ? (
                      <div className="flex flex-row items-center justify-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className={`w-3 h-3 md:w-4 md:h-4 dark:text-gray-100 text-gray-950 ${
                            msgLoading ? "animate-spin" : ""
                          }`}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                          />
                        </svg>
                        <span className="text-xs capitalize dark:text-gray-300 group-hover:dark:text-gray-200 group-hover:font-semibold text-gray-950 md:text-sm">
                          Please wait...
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-row items-center justify-center gap-2">
                        {boltIcon}

                        <span className="text-xs capitalize dark:text-gray-300 group-hover:dark:text-gray-200 group-hover:font-semibold text-gray-950 md:text-sm">
                          Generate Cover Letter
                        </span>
                      </div>
                    )}
                  </button>
                  <a
                    onClick={() => {
                      setJobDescription("");
                    }}
                    className="cursor-pointer hover:underline ml-auto"
                  >
                    <span className="text-xs capitalize dark:text-gray-300  text-gray-950 md:text-sm">
                      Clear Input
                    </span>
                  </a>
                </div>
              </div>

              {show && (
                <div
                  ref={componentRef}
                  className="w-full px-4 py-6 text-justify whitespace-normal bg-white sm:px-8 rounded-2xl"
                >
                  <div className="pb-2 text-center border-b border-gray-950">
                    <h1 className="flex justify-center text-base font-bold uppercase sm:text-xl md:text-2xl text-gray-950">
                      <EditableField
                        value={
                          coverLetter?.name
                            ? coverLetter.name
                            : userData.firstName + " " + userData.lastName
                        }
                        onSave={(value: string) => {
                          dispatch(
                            setCoverLetter({ ...coverLetter, name: value })
                          );
                          handleSingleSave({ name: value });
                        }}
                      />
                    </h1>
                    <div className="flex flex-col text-sm text-gray-950">
                      <ul className="flex flex-col gap-2">
                        <li className="flex flex-row flex-wrap justify-center gap-2 mt-2">
                          <h2 className=" text-xs sm:text-sm font-semibold before:content-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBjbGFzcz0idy02IGgtNiI+CiAgPHBhdGggc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBkPSJNMi4yNSA2Ljc1YzAgOC4yODQgNi43MTYgMTUgMTUgMTVoMi4yNWEyLjI1IDIuMjUgMCAwIDAgMi4yNS0yLjI1di0xLjM3MmMwLS41MTYtLjM1MS0uOTY2LS44NTItMS4wOTFsLTQuNDIzLTEuMTA2Yy0uNDQtLjExLS45MDIuMDU1LTEuMTczLjQxN2wtLjk3IDEuMjkzYy0uMjgyLjM3Ni0uNzY5LjU0Mi0xLjIxLjM4YTEyLjAzNSAxMi4wMzUgMCAwIDEtNy4xNDMtNy4xNDNjLS4xNjItLjQ0MS4wMDQtLjkyOC4zOC0xLjIxbDEuMjkzLS45N2MuMzYzLS4yNzEuNTI3LS43MzQuNDE3LTEuMTczTDYuOTYzIDMuMTAyYTEuMTI1IDEuMTI1IDAgMCAwLTEuMDkxLS44NTJINC41QTIuMjUgMi4yNSAwIDAgMCAyLjI1IDQuNXYyLjI1WiIgLz4KPC9zdmc+Cg==')] before:w-3 before:h-3 flex before:mr-2">
                            <EditableField
                              value={
                                coverLetter?.phone
                                  ? coverLetter.phone
                                  : userData.phone
                              }
                              onSave={(value: string) => {
                                dispatch(
                                  setCoverLetter({
                                    ...coverLetter,
                                    phone: value,
                                  })
                                );
                                handleSingleSave({ phone: value });
                              }}
                            />
                          </h2>
                          <h2 className="font-semibold text-xs sm:text-sm before:w-3 before:h-3 before:content-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBjbGFzcz0idy02IGgtNiI+CiAgPHBhdGggc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBkPSJNMjEuNzUgNi43NXYxMC41YTIuMjUgMi4yNSAwIDAgMS0yLjI1IDIuMjVoLTE1YTIuMjUgMi4yNSAwIDAgMS0yLjI1LTIuMjVWNi43NW0xOS41IDBBMi4yNSAyLjI1IDAgMCAwIDE5LjUgNC41aC0xNWEyLjI1IDIuMjUgMCAwIDAtMi4yNSAyLjI1bTE5LjUgMHYuMjQzYTIuMjUgMi4yNSAwIDAgMS0xLjA3IDEuOTE2bC03LjUgNC42MTVhMi4yNSAyLjI1IDAgMCAxLTIuMzYgMEwzLjMyIDguOTFhMi4yNSAyLjI1IDAgMCAxLTEuMDctMS45MTZWNi43NSIgLz4KPC9zdmc+Cg==')] flex before:mr-2">
                            <EditableField
                              value={
                                coverLetter?.email
                                  ? coverLetter.email
                                  : userData.email
                              }
                              onSave={(value: string) => {
                                dispatch(
                                  setCoverLetter({
                                    ...coverLetter,
                                    email: value,
                                  })
                                );
                                handleSingleSave({ email: value });
                              }}
                            />
                          </h2>
                        </li>

                        <li>
                          <span className="flex justify-center text-xs font-semibold sm:text-sm ">
                            <EditableField
                              value={
                                coverLetter?.address
                                  ? coverLetter.address
                                  : userData?.contact?.street +
                                    " " +
                                    userData?.contact?.cityState +
                                    " " +
                                    userData?.contact?.country +
                                    " " +
                                    userData?.contact?.postalCode
                              }
                              onSave={(value: string) => {
                                dispatch(
                                  setCoverLetter({
                                    ...coverLetter,
                                    address: value,
                                  })
                                );
                                handleSingleSave({ address: value });
                              }}
                            />
                            {}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <br />
                  <div className="mt-4">
                    <span className="text-xs font-semibold sm:text-sm text-gray-950">
                      <EditableField
                        value={
                          coverLetter?.date
                            ? coverLetter.date
                            : getFormattedDate(date, "MM DD, YYYY")
                        }
                        onSave={(value: string) => {
                          dispatch(
                            setCoverLetter({ ...coverLetter, date: value })
                          );
                          handleSingleSave({ date: value });
                        }}
                      />
                    </span>
                  </div>
                  <br />
                  <br />

                  <div
                    className={`w-[100%] aigeneratedcoverletter flex flex-col gap-4  ${
                      msgLoading ? "animate-pulse" : ""
                    }`}
                  >
                    <div className="text-xs sm:text-sm ">
                      {isEditing ? (
                        <div
                          id="editor"
                          contentEditable={isEditing}
                          className=" text-gray-950 border-[#312E37] border-[1px] rounded-[8px] p-1 sm:p-[10px] "
                          onBlur={() => {
                            setIsEditing(false);
                            handleSave();
                          }}
                        ></div>
                      ) : (
                        <div
                          className=" text-gray-950"
                          dangerouslySetInnerHTML={{ __html: streamedData }}
                        ></div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col flex-wrap gap-3 mt-5 buttons md:flex-row">
                    <DownloadService
                      componentRef={componentRef}
                      type="onPage"
                      fileName="ai-cover-letter"
                    />
                    {show && (
                      <button
                        disabled={
                          msgLoading ||
                          !session?.user?.email ||
                          !aiInputUserData ||
                          selectedOption === "" ||
                          (selectedOption === "file" && selectedFile === "") ||
                          !show ||
                          isCoverLetterCopied
                        }
                        onClick={() => copyCoverLetter(streamedData)}
                        className={`hidden xs:block w-full sm:max-w-max sm:w-48  lg:px-6 px-4 py-2 rounded-full dark:bg-[#18181b]  border-[1.5px] border-gray-950/80 hover:dark:bg-[#2f2f35] transition-all duration-300 group ${
                          msgLoading ||
                          !session?.user?.email ||
                          !aiInputUserData ||
                          selectedOption === "" ||
                          (selectedOption === "file" && selectedFile === "") ||
                          !show ||
                          isCoverLetterCopied
                            ? " cursor-not-allowed"
                            : ""
                        }`}
                      >
                        <div className="flex flex-row items-center justify-center gap-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-3 h-3 text-sm md:w-4 md:h-4 dark:text-gray-300 text-gray-950"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
                            />
                          </svg>

                          <span className="text-xs capitalize dark:text-gray-300 group-hover:dark:text-gray-200 group-hover:font-semibold text-gray-950 md:text-sm">
                            {msgLoading
                              ? "Please wait..."
                              : isCoverLetterCopied
                              ? "Copied"
                              : "Copy to clipboard"}
                          </span>
                        </div>
                      </button>
                    )}
                    {show && (
                      <button
                        type="button"
                        disabled={!show || msgLoading || !session?.user?.email}
                        onClick={handleClick}
                        className={`hidden xs:block w-full sm:max-w-max sm:w-48  lg:px-6 px-4 py-2 rounded-full dark:bg-[#18181b]  border-[1.5px] border-gray-950/80 hover:dark:bg-[#2f2f35] transition-all duration-300 group ${
                          !show || msgLoading || !session?.user?.email
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        } `}
                      >
                        <div className="flex flex-row items-center justify-center gap-2">
                          {EditIcon}
                          <span
                            className={`text-xs capitalize dark:text-gray-300 group-hover:dark:text-gray-200 group-hover:font-semibold text-gray-950 md:text-sm ${
                              !show || msgLoading || !session?.user?.email
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            } `}
                          >
                            Edit
                          </span>
                        </div>
                      </button>
                    )}
                    {isEditing && (
                      <button
                        type="button"
                        onClick={handleSave}
                        className="hidden xs:block w-full sm:max-w-max sm:w-48  lg:px-6 px-4 py-2 rounded-full dark:bg-[#18181b]  border-[1.5px] border-gray-950/80 hover:dark:bg-[#2f2f35] transition-all duration-300 group"
                      >
                        <div className="flex flex-row items-center justify-center gap-2">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 20 24"
                            stroke="currentColor"
                            fill="none"
                            className="w-3 h-3 text-sm md:w-4 md:h-4 dark:text-gray-300 text-gray-950"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M15.7895 21H4.15512C3.71432 21 3.29157 20.7893 2.97988 20.4142C2.66818 20.0391 2.49307 19.5304 2.49307 19V5C2.49307 4.46957 2.66818 3.96086 2.97988 3.58579C3.29157 3.21071 3.71432 3 4.15512 3H13.2964L17.4515 8V19C17.4515 19.5304 17.2764 20.0391 16.9647 20.4142C16.653 20.7893 16.2303 21 15.7895 21Z"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M14.1274 21V13H5.81717V21"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M5.81717 3V8H12.4654"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <span className="text-xs capitalize dark:text-gray-300 group-hover:dark:text-gray-200 group-hover:font-semibold text-gray-950 md:text-sm">
                            Save
                          </span>
                        </div>
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
      {confirmationModal && (
        <DeleteConfirmationModal
          upgrade={true}
          onCancel={() => setConfirmationModal(false)}
          message="Insufficent Credits! you Ran out of the credit."
          onConfirm={() => onConfirm()}
        />
      )}
      <TourBot config={outOfCredits ? tourBotConfig2 : tourBotConfig} />
    </>
  );
}
