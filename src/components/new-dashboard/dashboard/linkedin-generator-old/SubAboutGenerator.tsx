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
import CoverLetterCardSingle from "../cover-letter-generator/CoverLetterCardSingle";
import LinkedInAboutCardSingle from "./LinkedInAboutCardSingle";
const SubAboutGenerator = () => {
  const componentRef = useRef<any>(null);
  const [about, setAbout] = useState<string>("");
  const [msgLoading, setMsgLoading] = useState<boolean>(false); // msg loading
  const { data: session, status } = useSession();
  const [streamedData, setStreamedData] = useState("");
  const [aiInputUserData, setAiInputUserData] = useState<any>();
  const [availablePercentage, setAvailablePercentage] = useState<number>(0);
  const [showPopup, setShowPopup] = useState(false);

  const [percentageCalculated, setPercentageCalculated] =
    useState<boolean>(false);
  const [isAboutCopied, setIsAboutCopied] = useState<boolean>(false);
  const copyAbout = async (text: string) => {
    try {
      const aboutData = await htmlToPlainText(text);
      await copy(aboutData);
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

  useEffect(() => {
    if (
      userData &&
      userData?.email &&
      !isNaN(availablePercentage) &&
      availablePercentage !== 0
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
    if (streamedData !== "") {
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
      !isNaN(availablePercentage) &&
      availablePercentage !== 0
    ) {
      setMsgLoading(true);
      fetch("/api/linkedInBots/aboutGenerator", {
        method: "POST",
        body: JSON.stringify({
          userData: aiInputUserData,
          trainBotData: {
            userEmail: userData.email,
            fileAddress: userData.defaultResumeFile,
          },
        }),
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
            await saveToDB(tempText);
            fetch("/api/users/updateUserLimit", {
              method: "POST",
              body: JSON.stringify({
                email: session?.user?.email,
                type: "about_generation",
              }),
            }).then(async (resp: any) => {
              const res = await resp.json();
              let user;
              if (typeof res?.result === "object") {
                user = res.result;
              } else {
                user = await JSON.parse(res.result);
              }
              if (res.success) {
                const AboutResponse = await axios.get(
                  "/api/linkedInBots/linkedinAboutGenerator/getAllAbout"
                );
                const updatedObject = {
                  ...userData,
                  userPackageUsed: {
                    ...userData.userPackageUsed,
                    about_generation: user.userPackageUsed.about_generation,
                  },
                  linkedInAbouts: AboutResponse.data.result.linkedInAbouts,
                };
                dispatch(setUserData({ ...userData, ...updatedObject }));
              }
            });
          } else {
            setStreamedData("Error! Something went wrong");
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

  const saveToDB = async (tempText: string) => {
    try {
      const response: any = await axios.post("/api/users/updateUserData", {
        data: {
          email: session?.user?.email,
          results: {
            ...userData.results,
            about: tempText,
          },
        },
      });
      const res = await response.json();
      if (res.success) {
        console.log("about saved to DB");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUserDataIfNotExists = async () => {
    if (!userData.isLoading && !userData.isFetched) {
      dispatch(setIsLoading(true));
      try {
        // Fetch userdata if not exists in Redux
        const res = await fetch(
          `/api/users/getOneByEmail?email=${session?.user?.email}`
        );
        const response = await res.json();
        console.log(
          "first response: " + response.result,
          typeof response.result
        );

        dispatch(setUserData(response.result));
        dispatch(setIsLoading(false));
        dispatch(setField({ name: "isFetched", value: true }));
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
      <div className="headline-generator bg-[#17151B] py-8 px-3 md:px-6 flex flex-col md:flex-row md:align-center gap-5 lg:justify-center items-center rounded-[10px] mb-[20px]">
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
            <h1 className="text-[16px] text-white font-bold">
              About Generator
            </h1>
            <span
              className={`text-black rounded-full flex justify-center items-center px-[16px] py-[6px] md:mx-2  bg-[#02FF19] text-[12px] uppercase font-bold `}
            >
              free
            </span>
          </div>
          <LimitCard
            title="Available"
            limit={userData?.userPackageData?.limit?.about_generation}
            used={userData?.userPackageUsed?.about_generation}
            setPercentageCalculated={setPercentageCalculated}
            availablePercentage={availablePercentage}
            setAvailablePercentage={setAvailablePercentage}
          />

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
          <span className={`text-white text-[15px] font-semibold`}>
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
        <div className="rounded border border-gray-500 mb-4 p-4">
          <h1 className="text-4xl font-extrabold text-gray-900  mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
              AI Response{" "}
            </span>
          </h1>
          <div
            className="font-sans text-gray-300 whitespace-pre-wrap break-words"
            // style={{ textW: "auto" }}
          >
            {streamedData}
            <button
              disabled={msgLoading}
              onClick={() => copyAbout(streamedData)}
              className={` flex flex-row justify-center items-center gap-2 p-2.5 mt-4 px-[28px] border-[#312E37] border rounded-full ${
                msgLoading ? "opacity-50 cursor-not-allowed" : ""
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
                {msgLoading
                  ? "Please wait..."
                  : isAboutCopied
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

export default SubAboutGenerator;
