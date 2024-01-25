"use client";
import Image from "next/image";
import Svg1 from "@/../public/icon/headline-icon.svg";
import iconOfPackageBadge from "@/../public/icon/crown.svg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { setField, setIsLoading, setUserData } from "@/store/userDataSlice";
import Button from "@/components/Button";
import axios from "axios";
import buttonIconSrc from "@/../public/icon/u_bolt-alt.svg";
import { htmlToPlainText } from "@/helpers/HtmlToPlainText";
import copy from "clipboard-copy";
import CoverLetterCardSingle from "../cover-letter-generator/CoverLetterCardSingle";
import PreviouslyGeneratedList from "@/components/dashboard/PreviouslyGeneratedList";
import LinkedInHKeywordsCardSingle from "./LinkedInKeywordsCardSingle";
import { makeid } from "@/helpers/makeid";
import useGetUserData from "@/hooks/useGetUserData";

const SubKeywordsGenerator = () => {
  const [keywords, setKeywords] = useState<string>("");
  const componentRef = useRef<any>(null);
  const [msgLoading, setMsgLoading] = useState<boolean>(false); // msg loading
  const { data: session, status } = useSession();
  const [streamedData, setStreamedData] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const [aiInputUserData, setAiInputUserData] = useState<any>();

  const [availablePercentage, setAvailablePercentage] = useState<number>(0);
  const [percentageCalculated, setPercentageCalculated] =
    useState<boolean>(false);
  const [isKeywordsCopied, setIsKeywordsCopied] = useState<boolean>(false);
  const { getUserDataIfNotExists: getUserData } = useGetUserData(); //using hook function with different name/alias

  const copyKeyword = async (text: string) => {
    try {
      const keywordData = await htmlToPlainText(text);
      await copy(keywordData);
      setIsKeywordsCopied(true);
      // Set isHeadlineCopied to false after a delay (e.g., 2000 milliseconds or 2 seconds)
      setTimeout(() => {
        setIsKeywordsCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy text: ", error);
    }
  };
  // Redux
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.userData);
  const linkedinKeywords = useSelector((state: any) => state.linkedinKeywords);
  const creditLimits = useSelector((state: any) => state.creditLimits);

  // useEffect(() => {
  //   setKeywords(streamedData);
  // }, [streamedData]);

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
    //   userData.results.keywords &&
    //   userData.results.keywords !== ""
    // ) {
    //   setStreamedData(userData.results.keywords);
    // }
    if (streamedData === "") {
      setStreamedData(linkedinKeywords.keywordsText);
    }
  }, [userData]);
  useEffect(() => {
    setStreamedData(linkedinKeywords.keywordsText);
  }, [linkedinKeywords.keywordsText]);

  const handleGenerate: any = async () => {
    setStreamedData("");
    await getUserDataIfNotExists();
    //change condition
    if (session?.user?.email && userData.isFetched) {
      setMsgLoading(true);
      const obj: any = {
        personName: userData.firstName + " " + userData.lastName,

        creditsUsed: creditLimits.linkedin_keywords_generation,
        email: session?.user?.email,
        trainBotData: {
          userEmail: userData.email,
          fileAddress: userData.uploadedResume.fileName,
        },
        userData: aiInputUserData,
      };
      fetch("/api/linkedInBots/keywordsGenerator", {
        method: "POST",
        body: JSON.stringify(obj),
      })
        .then(async (resp: any) => {
          if (resp.ok) {
            const reader = resp.body.getReader();
            let tempText = "";
            while (true) {
              const { done, value } = await reader.read();
              if (done) {
                break;
              }
              const text = new TextDecoder().decode(value);
              tempText += text;
              setStreamedData((prev) => prev + text);
            }

            const KeywordsResponse = await axios.get(
              "/api/linkedInBots/keywordsGenerator/getAllLinkedInKeyword"
            );
            const updatedObject = {
              ...userData,
              linkedInKeywords: KeywordsResponse.data.result.linkedInKeywords,
            };
            dispatch(setUserData({ ...userData, ...updatedObject }));
          } else {
            const res = await resp.json();
            setStreamedData(res.result + "! You ran out of Credits");
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

  const getUserDataIfNotExists = async () => {
    if (!userData.isLoading && !userData.isFetched) {
      try {
        await getUserData();
      } catch (err) {
        setStreamedData("Something went wrong!");
      }
    }
  };

  // when page (session) loads, fetch user data if not exists
  useEffect(() => {
    if (session?.user?.email) {
      getUserDataIfNotExists();
    }
  }, [session?.user?.email]);
  const historyProps = {
    dataSource: "linkedInKeywords",
    Component: (card: any) => (
      <LinkedInHKeywordsCardSingle card={card} componentRef={componentRef} />
    ),
  };
  return (
    <>
      <PreviouslyGeneratedList {...historyProps} />
      <div className="headline-generator dark:bg-[#222027] dark:text-gray-50 bg-[#ffffff94] text-gray-950 py-8 px-3 md:px-6 flex flex-col md:flex-row md:align-center gap-5 lg:justify-center items-center rounded-[10px] mb-[20px]">
        <div
          className={`icon hidden rounded-full  bg-gradient-to-b from-[#20AA89] to-[#65D4AC]  md:flex justify-center items-center w-16 h-16`}
        >
          <Image
            alt="Svg1"
            src={Svg1}
            width={32}
            height={32}
            className="z-[10000px]"
          />
        </div>
        <div className="linkedintooltext flex flex-col lg:w-[24.0625rem] gap-2 ml-2">
          <div className=" flex items-center xs:justify-between sm:justify-between gap-4 md:justify-start flex-row">
            <h1 className="text-[16px] dark:text-gray-100 text-gray-950 font-bold">
              Keywords Generator
            </h1>
            <span
              className={`text-[#000] rounded-full h-8 md:ml-3 cursor-pointer flex justify-center items-center px-[16px] py-[6px]  bg-[#FEB602] text-[12px]  font-bold `}
              title={"50 credits will Be used for Keyword Generation "}
            >
              {creditLimits?.linkedin_keywords_generation}
              <p className="pl-1"> Credits</p>
            </span>
          </div>
          {/* <LimitCard
            title="Available"
            limit={userData?.userPackageData?.limit?.keywords_generation}
            used={userData?.userPackageUsed?.keywords_generation}
            setPercentageCalculated={setPercentageCalculated}
            availablePercentage={availablePercentage}
            setAvailablePercentage={setAvailablePercentage}
          /> */}
          <p className="text-[14px] text-[#959595] pr-5">
            Generator popular keywords for your linkedin profile
          </p>
        </div>
        <button
          type="button"
          disabled={msgLoading || !session?.user?.email}
          onClick={() => handleGenerate()}
          className={` bg-gradient-to-r  from-[#B324D7] to-[#615DFF] flex md:w-52 flex-row justify-center items-center gap-2 rounded-full md:px-[5px] px-[32px] py-[12px] md:ml-auto`}

          // className={` bg-[#FEB602] flex flex-row justify-center items-center gap-2 rounded-full px-[32px] py-[12px] lg:ml-auto`}
        >
          <span className={`text-white text-[15px] font-semibold`}>
            {msgLoading ? (
              <div className="flex">
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
              <div className="flex">
                <Image
                  src={buttonIconSrc}
                  alt="bold icon"
                  height={18}
                  width={18}
                />
                <span
                  className="text-white ml-3 text-[15px] font-semibold"
                  // className={`text-black text-[15px] font-semibold`}
                >
                  {/* Upgrade Plan */}
                  Generate Keywords
                </span>
              </div>
            )}
          </span>
        </button>
      </div>
      {streamedData && (
        <div className="mb-4  rounded border-gray-500 border-[1px] p-4">
          <h1 className="text-4xl font-extrabold text-gray-900  mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
              AI Response{" "}
            </span>
          </h1>
          <div className="font-sans dark:text-gray-100 text-gray-950 whitespace-pre-wrap break-words">
            {streamedData}
            <button
              disabled={msgLoading}
              onClick={() => copyKeyword(streamedData)}
              className={` flex flex-row justify-center items-center gap-2 p-2.5 mt-4 px-[28px] border-[#312E37] border-[1px] rounded-full ${
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

              <span className="dark:text-gray-100 text-gray-950 text-[15px] font-semibold">
                {msgLoading
                  ? "Please wait..."
                  : isKeywordsCopied
                  ? "Copied"
                  : "Copy to clipboard"}
              </span>
            </button>
          </div>
        </div>
      )}
      {showPopup && (
        <div className="bg-[#18181B] text-red-600 p-2 px-8 rounded-xl absolute top-4 left-1/2 transform -translate-x-1/2">
          {/* Popup content here */}
          Credit Limit Reached !
        </div>
      )}
    </>
  );
};

export default SubKeywordsGenerator;
