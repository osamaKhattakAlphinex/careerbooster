"use client";
import Image from "next/image";
import Svg1 from "@/../public/icon/headline-icon.svg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { setUserData } from "@/store/userDataSlice";
import axios from "axios";
import { htmlToPlainText } from "@/helpers/HtmlToPlainText";
import copy from "clipboard-copy";
import PreviouslyGeneratedList from "@/components/dashboard/PreviouslyGeneratedList";
import LinkedInHeadlineCardSingle from "./LinkedInHeadeLineCardSingle";
import useGetUserData from "@/hooks/useGetUserData";
import { useAppContext } from "@/context/AppContext";
import { showSuccessToast, showErrorToast } from "@/helpers/toast";
import DownloadService from "@/helpers/downloadFile";
import { EditIcon, newViewIcon } from "@/helpers/iconsProvider";
import { setLinkedInHeadline } from "@/store/linkedInHeadLineSlice";
import TourBot from "../TourBot";
import { useTourContext } from "@/context/TourContext";

const SubHeadlineGenerator = () => {
  const [msgLoading, setMsgLoading] = useState<boolean>(false); // msg loading
  const { data: session } = useSession();
  const [streamedData, setStreamedData] = useState("");
  const [aiInputUserData, setAiInputUserData] = useState<any>(null);
  const [showPopup, setShowPopup] = useState(false);
  const componentRef = useRef<any>();
  const { setAvailableCredits } = useAppContext();
  const [isEditing, setIsEditing] = useState(false);
  const [outOfCredits, setOutOfCredits] = useState<boolean>(false);

  const [isHeadlineCopied, setIsHeadlineCopied] = useState<boolean>(false);
  const copyHeadline = async (text: string) => {
    try {
      const headlineData = htmlToPlainText(text);
      await copy(headlineData);
      setIsHeadlineCopied(true);
      // Set isHeadlineCopied to false after a delay (e.g., 2000 milliseconds or 2 seconds)
      setTimeout(() => {
        setIsHeadlineCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy text: ", error);
    }
  };
  // Redux
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.userData);
  const linkedinHeadline = useSelector((state: any) => state.linkedinHeadline);
  const { tourBotRef, availableCreditsRef } = useTourContext();

  const creditLimits = useSelector((state: any) => state.creditLimits);

  const { getUserDataIfNotExists: getUserData } = useGetUserData(); //using hook function with different name/alias

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
    if (outOfCredits) {
      setTimeout(() => {
        tourBotRef?.current?.click();
      }, 500);
    }
  }, [outOfCredits]);

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

  const handleGenerate = async () => {
    setStreamedData("");

    // await getUserDataIfNotExists();
    //change condition
    if (session?.user?.email && aiInputUserData) {
      setMsgLoading(true);
      const obj: any = {
        personName: userData.firstName + " " + userData.lastName,
        email: session?.user?.email,

        creditsUsed: creditLimits.linkedin_headline_generation,
        trainBotData: {
          userEmail: userData.email,
          fileAddress: userData.uploadedResume.fileName,
        },
        userData: aiInputUserData,
      };
      fetch("/api/linkedInBots/headlineGenerator", {
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
                showSuccessToast("Headline generated successfully");
                break;
              }
              const text = new TextDecoder().decode(value);
              setStreamedData((prev) => prev + text);
              tempText += text;
            }

            const HeadlineResponse = await axios.get(
              "/api/linkedInBots/linkedinHeadlineGenerator/getAllHeadlines"
            );
            const updatedObject = {
              ...userData,
              linkedInHeadlines: HeadlineResponse.data.result.linkedInHeadlines,
            };
            dispatch(setUserData({ ...userData, ...updatedObject }));
            dispatch(
              setLinkedInHeadline(
                HeadlineResponse.data.result.linkedInHeadlines[0]
              )
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
  const handleClick = () => {
    setIsEditing((prevState) => !prevState);
  };

  const handleSave = async () => {
    let _linkedinHeadlineText = "";

    if (componentRef.current) {
      const editorElement = componentRef.current.querySelector("#editor");
      if (editorElement) {
        _linkedinHeadlineText = editorElement.innerHTML;
        editorElement.innerHTML = "";
      }
    }

    // setStreamedData(editedContent);
    setIsEditing(false);
    const payLoad = {
      id: linkedinHeadline.id,
      text: _linkedinHeadlineText, //editedContent,
      email: linkedinHeadline.userEmail,
    };

    await axios.post(
      `/api/linkedInBots/headlineGenerator/linkedInHeadline`,
      payLoad,
      { headers: { "Content-Type": "application/json" } }
    );

    const HeadlineResponse = await axios.get(
      "/api/linkedInBots/linkedinHeadlineGenerator/getAllHeadlines"
    );
    const updatedObject = {
      ...userData,
      linkedInHeadlines: HeadlineResponse.data.result.linkedInHeadlines,
    };
    dispatch(setUserData({ ...userData, ...updatedObject }));
    dispatch(
      setLinkedInHeadline({
        ...linkedinHeadline,
        headlineText: _linkedinHeadlineText,
      })
    );
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
        const editorElement = componentRef.current.querySelector("#editor");
        if (editorElement) {
          editorElement.innerHTML = linkedinHeadline.headlineText;
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
    dataSource: "linkedInHeadlines",
    Component: (card: any) => (
      <LinkedInHeadlineCardSingle card={card} componentRef={componentRef} />
    ),
  };
  useEffect(() => {
    setStreamedData(linkedinHeadline.headlineText);
  }, [linkedinHeadline.headlineText]);
  return (
    <>
      <PreviouslyGeneratedList {...historyProps} />
      <div className=" dark:bg-[#222027] dark:text-gray-50 bg-[#ffffff94] md:justify-between text-gray-950 p-5 sm:p-8 flex flex-col md:flex-row md:align-center xs:gap-3 justify-center items-center rounded-lg">
        <div className="hidden aspect-square rounded-full bg-gradient-to-b from-[#255CE7] to-[#7FA0E0] md:flex justify-center items-center w-16 h-16">
          <Image alt="Svg1" src={Svg1} width={24} height={24} />
        </div>
        <div className="flex flex-col w-full gap-2 ml-2 md:w-10/12">
          <div className="flex flex-row items-center gap-4 xs:justify-between sm:justify-between md:justify-start">
            <h1 className="text-[16px] dark:text-gray-100 text-gray-950 font-bold">
              Headline Generator
            </h1>
            {/* <div
              className={`text-[#000] group relative rounded-full flex justify-center items-center px-[16px] py-[6px] md:mx-2  bg-[#FEB602] xs:text-[10px] md:text-[12px]  font-bold `}
            >
              {creditLimits?.linkedin_headline_generation} Credits
              <div className="w-44 bg-gradient-to-r  from-[#B324D7] to-[#615DFF] font-medium xs:text-[10px] md:text-[12px] px-2 absolute xs:-left-32 md:left-10 xs:-top-12 md:-top-14  hidden group-hover:block md:rounded-bl-none xs:rounded-br-none md:rounded-br-xl text-gray-100  mb-6 shadow-xl rounded-xl py-2  transition-all">
                {creditLimits?.linkedin_headline_generation} credits will be
                used for Headline Generation
              </div>
            </div> */}
          </div>

          <p className="text-xs md:text-sm text-[#959595]">
            Generate keyword-rich headline for your LinkedIn to elevate your
            ranking in recruiter searches.
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
                  className={`text-white ml-3 text-[15px] font-semibold whitespace-nowrap cursor-pointer`}
                >
                  Generate Headline
                </span>
              </div>
            )}
          </span> */}
        </button>
      </div>

      {streamedData !== "" && (
        <div className="bg-white text-gray-900 rounded border-[1px] border-gray-500 p-4 mb-4">
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
              fileName="Linkedin-Headline"
            />
            <button
              disabled={msgLoading}
              onClick={() => copyHeadline(streamedData)}
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
                  : isHeadlineCopied
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
              <div className="flex flex-row items-center justify-center gap-2 text-white">
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
      {showPopup && (
        <div className="bg-[#18181B] text-red-600 p-2 px-8 rounded-xl absolute top-4 left-1/2 transform -translate-x-1/2">
          {/* Popup content here */}
          Credit Limit Reached !
        </div>
      )}
      {outOfCredits && (
        <TourBot config={tourBotConfig2} setOutOfCredits={setOutOfCredits} />
      )}
    </>
  );
};

export default SubHeadlineGenerator;
