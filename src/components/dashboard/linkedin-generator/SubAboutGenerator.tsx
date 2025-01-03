"use client";
import Image from "next/image";
import Svg1 from "@/../public/icon/headline-icon.svg";
import buttonIconSrc from "@/../public/icon/u_bolt-alt.svg";
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "@/store/userDataSlice";
import axios from "axios";
import { htmlToPlainText } from "@/helpers/HtmlToPlainText";
import copy from "clipboard-copy";
import PreviouslyGeneratedList from "@/components/dashboard/PreviouslyGeneratedList";
import LinkedInAboutCardSingle from "./LinkedInAboutCardSingle";
import useGetUserData from "@/hooks/useGetUserData";
import { useAppContext } from "@/context/AppContext";
import { showSuccessToast, showErrorToast } from "@/helpers/toast";
import { setLinkedInAbout } from "@/store/linkedInAboutSlice";
import DownloadService from "@/helpers/downloadFile";
import { EditIcon, newViewIcon } from "@/helpers/iconsProvider";
import { useTourContext } from "@/context/TourContext";
import TourBot from "../TourBot";
import { RootState } from "@/store/store";
const SubAboutGenerator = () => {
  const componentRef = useRef<HTMLDivElement | null>(null);
  const [msgLoading, setMsgLoading] = useState<boolean>(false); // msg loading
  const { data: session } = useSession();
  const [streamedData, setStreamedData] = useState<string>("");
  const [aiInputUserData, setAiInputUserData] = useState({});
  const [option, setOption] = useState<string>("about");
  const [showPopup, setShowPopup] = useState(false);
  const { setAvailableCredits, abortController,setAbortController, outOfCredits, setOutOfCredits } = useAppContext();
  const [isAboutCopied, setIsAboutCopied] = useState<boolean>(false);
  useEffect(() => {
    return (() => {
      abortController?.abort();
      setAbortController(new AbortController())
    });
  }, []);

  const copyAbout = async (text: string) => {
    try {
      const option = htmlToPlainText(text);
      await copy(option);
      setIsAboutCopied(true);
      // Set isHeadlineCopied to false after a delay (e.g., 2000 milliseconds or 2 seconds)
      setTimeout(() => {
        setIsAboutCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy text: ", error);
    }
  };
  // Redux
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.userData);
  const linkedinAbout = useSelector((state: RootState) => state.linkedinAbout);
  const { getUserDataIfNotExists: getUserData } = useGetUserData(); //using hook function with different name/alias
  const creditLimits = useSelector((state: RootState) => state.creditLimits);
  const [isEditing, setIsEditing] = useState(false);
  const { tourBotRef, availableCreditsRef } = useTourContext();

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

  const handleClick = () => {
    setIsEditing((prevState) => !prevState);
  };

  const handleSave = async () => {
    let _linkedinAboutText = "";

    if (componentRef.current) {
      const editorElement = componentRef.current.querySelector("#editor");
      if (editorElement) {
        _linkedinAboutText = editorElement.innerHTML;
        editorElement.innerHTML = "";
      }
    }

    // setStreamedData(editedContent);
    setIsEditing(false);
    const payLoad = {
      id: linkedinAbout.id,
      text: _linkedinAboutText, //editedContent,
      email: linkedinAbout.userEmail,
    };

    await axios.post(
      `/api/linkedInBots/aboutGenerator/linkedInAbout`,
      payLoad,
      { headers: { "Content-Type": "application/json" },signal: abortController?.signal }
    );

    const AboutResponse = await axios.get(
      "/api/linkedInBots/linkedinAboutGenerator/getAllAbout", {signal: abortController?.signal}
    );
    const updatedObject = {
      ...userData,
      linkedInAbouts: AboutResponse.data.result.linkedInAbouts,
    };
    dispatch(setUserData({ ...userData, ...updatedObject }));
    dispatch(
      setLinkedInAbout({ ...linkedinAbout, aboutText: _linkedinAboutText })
    );
  };

  useEffect(() => {
    setStreamedData(linkedinAbout.aboutText);
  }, [linkedinAbout.aboutText]);

  useEffect(() => {
    if (outOfCredits) {
      setTimeout(() => {
        tourBotRef?.current?.click();
      }, 500);
    }
  }, [outOfCredits]);

  const handleGenerate = async () => {
    setStreamedData("");

    await getUserDataIfNotExists();
    if (session?.user?.email && aiInputUserData) {
      setMsgLoading(true);
      const obj: any = {
        personName: userData.firstName + " " + userData.lastName,
        option: option,
        email: session?.user?.email,

        creditsUsed: creditLimits.linkedin_about_generation,
        userData: aiInputUserData,
        trainBotData: {
          userEmail: userData.email,
          fileAddress: userData.uploadedResume.fileName,
        },
      };
      fetch("/api/linkedInBots/aboutGenerator", {
        method: "POST",
        body: JSON.stringify(obj),
        signal: abortController?.signal,
      })
        .then(async (resp: any) => {
          if (resp.ok) {
            setAvailableCredits(true);

            const reader = resp.body.getReader();
            let tempText = "";
            while (true) {
              const { done, value } = await reader.read();

              if (done) {
                showSuccessToast("About generated successfully");
                break;
              }

              const text = new TextDecoder().decode(value);
              tempText += text;
              setStreamedData((prev) => prev + text);
            }

            const AboutResponse = await axios.get(
              "/api/linkedInBots/linkedinAboutGenerator/getAllAbout", {signal: abortController?.signal}
            );
            const updatedObject = {
              ...userData,
              linkedInAbouts: AboutResponse.data.result.linkedInAbouts,
            };
            dispatch(setUserData({ ...userData, ...updatedObject }));
            dispatch(
              setLinkedInAbout(AboutResponse.data.result.linkedInAbouts[0])
            );
          } else {
            const res = await resp.json();
            if (resp.status === 429) {
              setStreamedData(res.result + "! You ran out of Credits");
              showErrorToast("You ran out of Credits!");
              setOutOfCredits(true);
            } else {
              showErrorToast("Failed to generate linkedin Headline");
            }
          }
          setMsgLoading(false);
        })
        .catch((error) => {
          console.log("Error encountered");
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
  const getUserDataIfNotExists = async () => {
    if (!userData.isLoading && !userData.isFetched) {
      try {
        await getUserData();
      } catch (err) {
        setStreamedData("Something went wrong!");
      }
    }
  };
  useEffect(() => {
    if (isEditing) {
      if (componentRef.current) {
        const editorElement: HTMLDivElement | null = componentRef.current.querySelector("#editor");
        if (editorElement) {
          editorElement.innerHTML = linkedinAbout.aboutText;
          editorElement.focus(); // Focus on the editable area
        }
      }
    }
  }, [isEditing]);

  // when page (session) loads, fetch user data if not exists
  useEffect(() => {
    if (session?.user?.email) {
      getUserDataIfNotExists();
    }
  }, [session?.user?.email]);
  const historyProps = {
    dataSource: "linkedInAbouts",
    Component: (card: any) => (
      <LinkedInAboutCardSingle card={card} componentRef={componentRef} />
    ),
  };
  return (
    <>
      <PreviouslyGeneratedList {...historyProps} />
      <div className=" dark:bg-[#222027] dark:text-gray-50 bg-[#ffffff94] text-gray-950 py-8 px-3 md:px-6 flex flex-col md:flex-row md:align-center gap-5 lg:justify-center items-center rounded-lg mb-[20px]">
        <div
          className={`icon hidden rounded-full bg-gradient-to-b from-[#26A5C1] to-[#84E1E7] md:flex justify-center items-center w-16 h-16`}
        >
          <Image alt="Svg1" src={Svg1} width={24} height={24} />
        </div>
        <div className="flex flex-col w-full gap-2 ml-2 md:w-10/12">
          <div className="flex flex-row items-center gap-4 xs:justify-between sm:justify-between md:justify-start">
            <h1 className="text-[16px] dark:text-gray-100 text-gray-950 font-bold">
              About Generator
            </h1>
            {/* <div
              className={`text-[#000] group relative  rounded-full h-8 md:ml-3 flex justify-center items-center px-[16px] py-[6px]  bg-[#FEB602] xs:text-[10px] md:text-[12px]  font-bold `}
            >
              {creditLimits?.linkedin_about_generation} Credits
              <div className="w-44 bg-gradient-to-r  from-[#B324D7] to-[#615DFF] font-medium xs:text-[10px] md:text-[12px] px-2 absolute xs:-left-32 md:left-10 xs:-top-12 md:-top-14  hidden group-hover:block md:rounded-bl-none xs:rounded-br-none md:rounded-br-xl text-gray-100  mb-6 shadow-xl rounded-xl py-2  transition-all">
                {creditLimits?.linkedin_about_generation} credits will be used
                for About Generation
              </div>
            </div> */}
          </div>
          <p className="text-[14px] text-[#959595] pr-5">
            Transform your career journey into a compelling story that captures
            recruiters{"'"} attention and enhances your LinkedIn profile{"'"}s
            visibility.
          </p>
        </div>
        <button
          type="button"
          disabled={msgLoading || !session?.user?.email}
          onClick={() => handleGenerate()}
          className="rounded-full"
        >
          <div className="bg-gradient-to-r px-6 py-2 from-[#B324D7] to-[#615DFF] flex  flex-row justify-center items-center gap-2 rounded-full">
            <span className="bg-transparent ">
              {msgLoading ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className={`w-4 h-4 mr-3 ${msgLoading ? "animate-spin" : ""}`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
              ) : (
                newViewIcon
              )}
            </span>
            <span className="text-xs font-semibold md:text-sm ">
              {msgLoading ? "Generating..." : "Generate"}
            </span>
          </div>
          {/* <span
            className={`dark:text-gray-100 text-gray-950 text-[15px] font-semibold`}
          >
            {msgLoading ? (
              <div
                className={` bg-gradient-to-r  from-[#B324D7] to-[#615DFF] flex md:w-44 flex-row justify-center items-center gap-2 rounded-full md:px-[5px] px-[20px] py-[12px] md:ml-auto`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className={`w-4 h-4 mr-3 ${msgLoading ? "animate-spin" : ""}`}
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
              <div
                className={` bg-gradient-to-r hover:from-purple-800 hover:to-pink-600 from-[#B324D7] to-[#615DFF] flex md:w-52 flex-row justify-center items-center gap-2 rounded-full md:px-[5px] px-[32px] py-[12px] md:ml-auto`}
              >
                <Image
                  src={buttonIconSrc}
                  alt="bold icon"
                  height={18}
                  width={18}
                />
                <span
                  className={`text-white ml-3 text-[15px] font-semibold whitespace-nowrap`}
                >
                  Generate About
                </span>
              </div>
            )}
          </span> */}
        </button>
      </div>
      {streamedData && (
        <div className="bg-white text-gray-900 rounded border-[1px] border-gray-500 mb-4 p-4">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
              AI Response{" "}
            </span>
          </h1>
          <div
            className="font-sans break-words whitespace-pre-wrap text-gray-950"
            ref={componentRef}
            // style={{ textW: "auto" }}
          >
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
                className="text-justify text-gray-950"
                dangerouslySetInnerHTML={{ __html: streamedData }}
              ></div>
            )}
          </div>

          <div className="flex flex-col flex-wrap gap-3 mt-5 buttons md:flex-row">
            <DownloadService
              componentRef={componentRef}
              type="onPage"
              fileName="Linkedin-About"
            />
            <button
              disabled={msgLoading}
              onClick={() => copyAbout(streamedData)}
              className={` flex gap-2 w-full md:w-fit items-center justify-center  hover:opacity-80 lg:text-sm text-xs lg:px-6 px-3 py-2 rounded-full dark:bg-[#18181b]  text-gray-300 border-[1px] ${
                msgLoading ? "opacity-50 cursor-not-allowed" : ""
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

              <span className="px-2 text-xs dark:text-gray-100 text-gray-950 md:text-sm ">
                {msgLoading
                  ? "Please wait..."
                  : isAboutCopied
                  ? "Copied"
                  : "Copy to clipboard"}
              </span>
            </button>

            <button
              type="button"
              disabled={msgLoading || !session?.user?.email}
              onClick={handleClick}
              className={`w-full sm:max-w-max sm:w-48  lg:px-6 px-4 py-2 rounded-full dark:bg-[#18181b]  border-[1.5px] border-gray-950/80 hover:dark:bg-[#2f2f35] transition-all duration-300 group ${
                msgLoading || !session?.user?.email
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              } `}
            >
              <div className="flex flex-row items-center justify-center gap-2 text-gray-100">
                {EditIcon}
                <span
                  className={`text-xs capitalize dark:text-gray-300 group-hover:dark:text-gray-200 group-hover:font-semibold text-gray-950 md:text-sm ${
                    msgLoading || !session?.user?.email
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  } `}
                >
                  Edit
                </span>
              </div>
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={handleSave}
                className="w-full sm:max-w-max sm:w-48  lg:px-6 px-4 py-2 rounded-full dark:bg-[#18181b]  border-[1.5px] border-gray-950/80 hover:dark:bg-[#2f2f35] transition-all duration-300 group"
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
      {streamedData && (
        <div className="lg:content-1 md:mt-[36px] mt-[20px] flex flex-col justify-center items-center gap-2 ">
          <h2 className="text-center lg:text-left text-red-600 lg:text-[46px] tex-[28px] lg:px-0 px-[15px]">
            Don{"'"}t Like the results?
          </h2>
          <p className="text-[16px]  lg:text-[24px] lg:text-left text-center">
            Change your preference and regenerate your summary
          </p>
          <div className="flex flex-col gap-4 px-8 lg:px-0">
            <label
              htmlFor="default-radio-3"
              className="flex gap-3 redio-btn  items-center rounded-full border-2 border-indigo-600 lg:px-8 md:py-4 xs:py-3 py-3 cursor-pointer md:text-[16px] xs:text-[11px]"
            >
              <input
                id="default-radio-3"
                type="radio"
                value="about"
                name="default-radio"
                onChange={(e) => setOption(e.target.value)}
                className="w-3 h-3 lg:w-5 lg:h-5 "
                checked={option === "about"}
              />
              Regenerate about again to get more results
            </label>
            <label
              htmlFor="default-radio-2"
              className="flex gap-3 redio-btn  items-center rounded-full border-2 border-indigo-600 lg:px-8 xs:py-3 py-3 md:py-4 cursor-pointer md:text-[16px] xs:text-[11px]"
            >
              <input
                id="default-radio-2"
                type="radio"
                value="aboutShort"
                name="default-radio"
                onChange={(e) => setOption(e.target.value)}
                className="w-3 h-3 lg:w-5 lg:h-5 "
              />
              I need a shorter summary (Not Recommended)
            </label>
          </div>

          <button
            type="button"
            disabled={msgLoading || !session?.user?.email}
            onClick={() => handleGenerate()}
            className={` bg-gradient-to-r from-[#B324D7] to-[#615DFF] flex flex-row justify-center items-center gap-2 rounded-full px-[32px] py-[12px] `}
          >
            <span
              className={`dark:text-gray-100 text-gray-950 text-[15px] font-semibold`}
            >
              {msgLoading ? (
                <div
                  className={` bg-gradient-to-r  from-[#B324D7] to-[#615DFF] flex md:w-44 flex-row justify-center items-center gap-2 rounded-full md:px-[5px] px-[20px] py-[12px] md:ml-auto`}
                >
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
                <div
                  className={` bg-gradient-to-r hover:from-purple-800 hover:to-pink-600 from-[#B324D7] to-[#615DFF] flex md:w-44 flex-row justify-center items-center gap-2 rounded-full md:px-[5px] px-[32px] py-[12px] md:ml-auto`}
                >
                  <Image
                    src={buttonIconSrc}
                    alt="bold icon"
                    height={18}
                    width={18}
                  />
                  <span
                    className={`text-white text-[15px] font-semibold whitespace-nowrap`}
                  >
                    Generate
                  </span>
                </div>
              )}
            </span>
          </button>
        </div>
      )}
      {showPopup && (
        <div className="bg-[#18181B] text-red-600 p-2 px-8 rounded-xl absolute top-4 left-1/2 transform -translate-x-1/2">
          {/* Popup content here */}
          Credit Limit Reached !
        </div>
      )}
      {outOfCredits && (
        <TourBot config={tourBotConfig2} />
      )}
    </>
  );
};

export default SubAboutGenerator;
