"use client";
import Image from "next/image";
import Svg1 from "@/../public/icon/headline-icon.svg";
import buttonIconSrc from "@/../public/icon/u_bolt-alt.svg";
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { setField, setIsLoading, setUserData } from "@/store/userDataSlice";
import LimitCard from "../LimitCard";
import axios from "axios";
import { htmlToPlainText } from "@/helpers/HtmlToPlainText";
import copy from "clipboard-copy";
import PreviouslyGeneratedList from "@/components/PreviouslyGeneratedList";
import LinkedInAboutCardSingle from "./LinkedInAboutCardSingle";
import { makeid } from "@/helpers/makeid";
import useGetUserData from "@/hooks/useGetUserData";
const SubAboutGenerator = () => {
  const componentRef = useRef<any>(null);
  const [msgLoading, setMsgLoading] = useState<boolean>(false); // msg loading
  const { data: session, status } = useSession();
  const [streamedData, setStreamedData] = useState("");
  const [aiInputUserData, setAiInputUserData] = useState<any>();
  const [option, setOption] = useState<string>("about");
  const [availablePercentage, setAvailablePercentage] = useState<number>(0);
  const [showPopup, setShowPopup] = useState(false);
  const [percentageCalculated, setPercentageCalculated] =
    useState<boolean>(false);
  const [isAboutCopied, setIsAboutCopied] = useState<boolean>(false);
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
  const userData = useSelector((state: any) => state.userData);
  const linkedinAbout = useSelector((state: any) => state.linkedinAbout);
  const { getUserDataIfNotExists: getUserData } = useGetUserData() //using hook function with different name/alias
  const creditLimits = useSelector((state: any) => state.creditLimits);

  useEffect(() => {
    if (
      userData &&
      userData?.email
    ) {
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
    //   userData.results.about &&
    //   userData.results.about !== ""
    // ) {
    //   setStreamedData(userData.results.about);
    // }
    if (streamedData === "") {
      setStreamedData(linkedinAbout.aboutText);
    }
  }, [userData]);

  useEffect(() => {
    setStreamedData(linkedinAbout.aboutText);
  }, [linkedinAbout.aboutText]);

  const handleGenerate = async () => {
    setStreamedData("");
    await getUserDataIfNotExists();
    if (
      session?.user?.email &&
      aiInputUserData
    ) {
      setMsgLoading(true);
      const obj: any = {
        personName: userData.firstName + " " + userData.lastName,
        option: option,
        email: session?.user?.email,
        userCredits: userData.userCredits,
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

            const AboutResponse = await axios.get(
              "/api/linkedInBots/linkedinAboutGenerator/getAllAbout"
            );
            const updatedObject = {
              ...userData,
              linkedInAbouts: AboutResponse.data.result.linkedInAbouts,
              userCredits: userData.userCredits - creditLimits.linkedin_about_generation
            };
            dispatch(setUserData({ ...userData, ...updatedObject }));


          } else {
            const res = await resp.json()
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
        await getUserData()
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
    dataSource: "linkedInAbouts",
    Component: (card: any) => (
      <LinkedInAboutCardSingle card={card} componentRef={componentRef} />
    ),
  };
  return (
    <>
      <PreviouslyGeneratedList {...historyProps} />
      <div className="headline-generator dark:bg-[#222027] dark:text-gray-50 bg-[#ffffff94] text-gray-950 py-8 px-3 md:px-6 flex flex-col md:flex-row md:align-center gap-5 lg:justify-center items-center rounded-[10px] mb-[20px]">
        <div
          className={`icon hidden rounded-full bg-gradient-to-b from-[#26A5C1] to-[#84E1E7] md:flex justify-center items-center w-16 h-16`}
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
              About Generator
            </h1>
            <span
              className={`text-black rounded-full flex justify-center items-center px-[16px] py-[6px] md:mx-2  bg-[#02FF19] text-[12px] uppercase font-bold `}
            >
              free
            </span>
          </div>
          {/* <LimitCard
            title="Available"
            limit={userData?.userPackageData?.limit?.about_generation}
            used={userData?.userPackageUsed?.about_generation}
            setPercentageCalculated={setPercentageCalculated}
            availablePercentage={availablePercentage}
            setAvailablePercentage={setAvailablePercentage}
          /> */}

          <p className="text-[14px] text-[#959595] pr-5">
            Generate impressive about for your linkedin
          </p>
        </div>
        <button
          type="button"
          disabled={msgLoading || !session?.user?.email}
          onClick={() => handleGenerate()}
          className={` bg-gradient-to-r from-[#B324D7] to-[#615DFF] flex flex-row justify-center items-center gap-2 rounded-full px-[32px] py-[12px] md:ml-auto`}
        >
          <span
            className={`dark:text-gray-100 text-gray-950 text-[15px] font-semibold`}
          >
            {msgLoading ? (
              <div className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
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
                <span className={`text-white ml-3 text-[15px] font-semibold`}>
                  Generate About
                </span>
              </div>
            )}
          </span>
        </button>
      </div>
      {streamedData && (
        <div className="rounded border-[1px] border-gray-500 mb-4 p-4">
          <h1 className="text-4xl font-extrabold text-gray-900  mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
              AI Response{" "}
            </span>
          </h1>
          <div
            className="font-sans dark:text-gray-100 text-gray-950 whitespace-pre-wrap break-words"
          // style={{ textW: "auto" }}
          >
            {streamedData}
            <div className="flex flex-row xs:flex-col md:flex-row">
              <button
                disabled={msgLoading}
                onClick={() => copyAbout(streamedData)}
                className={` flex flex-row justify-center items-center gap-2 p-2.5 mt-4 px-[28px] border-[#312E37] border-[1px] rounded-full ${msgLoading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-4 h-4 dark:text-gray-100 text-gray-950"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
                  />
                </svg>

                <span className="dark:text-gray-100 text-gray-950 text-[15px] font-semibold">
                  {msgLoading
                    ? "Please wait..."
                    : isAboutCopied
                      ? "Copied"
                      : "Copy to clipboard"}
                </span>
              </button>
              {option !== "about" && (
                <button
                  type="button"
                  disabled={msgLoading || !session?.user?.email}
                  onClick={() => handleGenerate()}
                  className={` bg-gradient-to-r from-[#B324D7] h-11 xs:py-2  mx-2 mt-4 to-[#615DFF] flex flex-row justify-center items-center gap-2 rounded-full px-[22px]`}
                >
                  <span
                    className={`dark:text-gray-100 text-gray-950 text-[15px] font-semibold`}
                  >
                    {msgLoading ? (
                      <div className="flex">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className={`w-4 h-4 mr-3 ${msgLoading ? "animate-spin" : ""
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
                        <Image
                          src={buttonIconSrc}
                          alt="bold icon"
                          height={18}
                          width={18}
                        />
                        <span
                          className={`text-white ml-3 text-[15px] font-semibold`}
                        >
                          Re-Generate About
                        </span>
                      </div>
                    )}
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      {streamedData && (
        <div className="lg:content-1 md:mt-[36px] mt-[20px] flex flex-col justify-center items-center gap-2 ">
          <h2 className="text-center lg:text-left text-red-600 lg:text-[46px] tex-[28px] lg:px-0 px-[15px]">
            Don{"'"}t Like the results?
          </h2>
          <p className="text-[16px]  lg:text-[24px] lg:text-left text-center">
            Change your preference and regenerate you summary
          </p>
          <div className="flex flex-col gap-4 lg:px-0 px-8">
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
                className="lg:w-5 lg:h-5 w-3 h-3 "
              />
              I need a shorter summary (Not Recommended)
            </label>
            <label
              htmlFor="default-radio-3"
              className="flex gap-3 redio-btn  items-center rounded-full border-2 border-indigo-600 lg:px-8 md:py-4 xs:py-3 py-3 cursor-pointer md:text-[16px] xs:text-[11px]"
            >
              <input
                id="default-radio-3"
                type="radio"
                value="aboutStory"
                name="default-radio"
                onChange={(e) => setOption(e.target.value)}
                className="lg:w-5 lg:h-5 w-3 h-3 "
              />
              Add a captivating story to hook the visitors
            </label>
          </div>

          {/* <Button
            type="button"
            className="flex gap-2 justify-center items-center text-lg text-white mt-6 bg-gradient-to-r from-purple-700 hover:translate-y-[-4px] transition-all duration-200 to-blue-400 px-6 py-3 rounded-full border-[1px] shadow-md hover:shadow-lg"
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
          </Button> */}
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

export default SubAboutGenerator;
