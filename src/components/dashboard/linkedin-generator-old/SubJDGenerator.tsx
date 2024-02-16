"use client";
import Image from "next/image";
import Svg1 from "@/../public/icon/headline-icon.svg";
import iconOfPackageBadge from "@/../public/icon/crown.svg";
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import {
  WorkExperience,
  setField,
  setIsLoading,
  setUserData,
} from "@/store/userDataSlice";
import axios from "axios";
import buttonIconSrc from "@/../public/icon/u_bolt-alt.svg";
import { htmlToPlainText } from "@/helpers/HtmlToPlainText";
import copy from "clipboard-copy";
import PreviouslyGeneratedList from "@/components/dashboard/PreviouslyGeneratedList";
import LinkedInJDCardSingle from "./LinkedInJDCardSingle";
import { makeid } from "@/helpers/makeid";
import useGetUserData from "@/hooks/useGetUserData";
import useGetCreditLimits from "@/hooks/useGetCreditLimits";
const SubJDGenerator = () => {
  const componentRef = useRef<any>(null);
  const creditLimits = useSelector((state: any) => state.creditLimits);
  // local States
  const [msgLoading, setMsgLoading] = useState<boolean>(false); // msg loading
  const { data: session, status } = useSession();
  const [streamedData, setStreamedData] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  useState<boolean>(false);
  const [isJDCopied, setIsJDCopied] = useState<boolean>(false);
  const copyJD = async (text: string) => {
    try {
      const jD_Data = await htmlToPlainText(text);
      await copy(jD_Data);
      setIsJDCopied(true);
      // Set isHeadlineCopied to false after a delay (e.g., 2000 milliseconds or 2 seconds)
      setTimeout(() => {
        setIsJDCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy text: ", error);
    }
  };
  // Redux
  const dispatch = useDispatch();
  let userData = useSelector((state: any) => state.userData);
  const linkedinJD = useSelector((state: any) => state.linkedinJobDesc);
  const { getUserDataIfNotExists: getUserData } = useGetUserData(); //using hook function with different name/alias
  const { getCreditLimitsIfNotExists } = useGetCreditLimits();

  useEffect(() => {
    if (streamedData === "") {
      setStreamedData(linkedinJD.jobDescriptionText);
    }
  }, [userData]);

  useEffect(() => {
    setStreamedData(linkedinJD.jobDescriptionText);
  }, [linkedinJD.jobDescriptionText]);

  const handleGenerate = async () => {
    setStreamedData("");
    await getUserDataIfNotExists();
    //change condition
    if (session?.user?.email && userData.isFetched) {
      // remove ids from experiences
      const experiences = userData.experience.map((item: WorkExperience) => {
        const { id, ...rest } = item;
        return rest;
      });

      let tempText = "";
      for (const [index, experience] of experiences.entries()) {
        let html = "";
        html += `<h4><strong>${experience?.jobTitle}</strong></h4>`;
        html += `<h5>${experience?.company} | ${experience?.cityState} ${experience?.country}</h5>`;
        html += `<p style=' margin-bottom: 10px'>${experience?.fromMonth} ${
          experience?.fromYear
        } to ${
          experience?.isContinue
            ? "Present"
            : experience?.toMonth + " " + experience?.toYear
        }</p>`;
        html += `<p>`;
        setStreamedData((prev) => prev + html);
        tempText += html;
        setMsgLoading(true);
        const obj: any = {
          personName: userData.firstName + " " + userData.lastName,

          creditsUsed: creditLimits.linkedin_individualWorkExperience,
          email: session?.user?.email,
          trainBotData: {
            userEmail: userData.email,
            fileAddress: userData.uploadedResume.fileName,
          },
          experience: experience,
        };
        const res: any = await fetch("/api/linkedInBots/jdGeneratorSingle", {
          method: "POST",
          body: JSON.stringify(obj),
        });

        if (res.ok) {
          const reader = res.body.getReader();
          while (true) {
            const { done, value } = await reader.read();
            if (done) {
              break;
            }
            const text = new TextDecoder().decode(value);

            setStreamedData((prev) => prev + text);
            tempText += text;
          }
        }
        tempText += `
        
        /n

        `;
        setStreamedData((prev) => prev + `</p> <br /> `);
        setMsgLoading(false);

        if (index === experiences.length - 1) {
          const jobDescriptionId = makeid();
          const jdObj = {
            jobDescriptionId: jobDescriptionId,
            personName: userData.firstName + " " + userData.lastName,

            email: userData?.email,
            trainBotData: {
              userEmail: userData.email,
              fileAddress: userData.uploadedResume.fileName,
            },
            experiences: experiences,
          };
          await fetch("/api/linkedInBots/jdGeneratorSave", {
            method: "POST",
            body: JSON.stringify(jdObj),
          }).then(async (response: any) => {
            const res = await response.json();
            if (res.success) {
              await saveToDB(jdObj, tempText);
            }
          });
        }
      }

      const JDResponse = await axios.get(
        "/api/linkedInBots/jdGeneratorSingle/getAllJD"
      );
      const updatedObject = {
        ...userData,
        linkedInJobDescriptions: JDResponse.data.result.linkedInJobDescriptions,
      };
      dispatch(setUserData({ ...userData, ...updatedObject }));
    } else {
      setShowPopup(true);

      // Hide the popup after 3 seconds
      setTimeout(() => {
        setShowPopup(false);
      }, 3000);
    }
  };

  const saveToDB = async (obj: any, text: any) => {
    const id = obj?.jobDescriptionId;
    const email = obj?.email;
    const payload: any = {
      id,
      email,
      text,
    };

    await fetch("/api/linkedInBots/jdGeneratorSingle/linkedInJobDescription", {
      method: "POST",
      body: JSON.stringify(payload),
    });
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
    dataSource: "linkedInJobDescriptions",
    Component: (card: any) => (
      <LinkedInJDCardSingle card={card} componentRef={componentRef} />
    ),
  };
  return (
    <>
      <PreviouslyGeneratedList {...historyProps} />
      <>
        <div className="headline-generator dark:bg-[#222027] dark:text-gray-50 bg-[#ffffff94] text-gray-950 py-8 px-3 md:px-6 flex flex-col md:flex-row md:align-center gap-5 lg:justify-center items-center rounded-[10px] mb-[20px]">
          <div
            className={`icon hidden rounded-full bg-gradient-to-b from-[#255CE7] to-[#7FA0E0] md:flex justify-center items-center w-16 h-16`}
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
            <div className=" flex items-center xs:justify-between sm:justify-between gap-4 md:justify-start flex-row ">
              <h1 className="text-[16px] dark:text-gray-100 text-gray-950 font-bold">
                Job Description Generator
              </h1>
              {/* <div
                className={`text-[#000] rounded-full group relative h-8 md:ml-3 flex justify-center items-center px-[16px] py-[6px]  bg-[#FEB602] xs:text-[10px] md:text-[12px]  font-bold `}
              >
                <div className="mr-1">
                  {creditLimits?.linkedin_individualWorkExperience}
                </div>{" "}
                Credits
                <div className="w-44 bg-gradient-to-r  from-[#B324D7] to-[#615DFF] font-medium xs:text-[10px] md:text-[12px] px-2 absolute xs:-left-32 md:left-10 xs:-top-12 md:-top-14  hidden group-hover:block md:rounded-bl-none xs:rounded-br-none md:rounded-br-xl text-gray-100  mb-6 shadow-xl rounded-xl py-2  transition-all">
                  {creditLimits?.linkedin_individualWorkExperience} credits will
                  be used for Job Description
                </div>
              </div> */}
            </div>
            {/* <LimitCard
              title="Available"
              limit={userData?.userPackageData?.limit?.job_desc_generation}
              used={userData?.userPackageUsed?.job_desc_generation}
              setPercentageCalculated={setPercentageCalculated}
              availablePercentage={availablePercentage}
              setAvailablePercentage={setAvailablePercentage}
            /> */}
            <p className="text-[14px] text-[#959595] pr-5">
              Get job descriptions with respect to each job
            </p>
          </div>
          <button
            type="button"
            disabled={msgLoading || !session?.user?.email}
            onClick={() => handleGenerate()}
            className={` bg-gradient-to-r from-[#B324D7] to-[#615DFF] flex flex-row justify-center items-center gap-2 rounded-full px-[32px] py-[12px] md:ml-auto`}

            // className={` bg-[#FEB602] flex flex-row justify-center items-center gap-2 rounded-full px-[32px] py-[12px] mx-2 lg:ml-auto`}
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
                  className={` bg-gradient-to-r  from-[#B324D7] to-[#615DFF] flex md:w-52 flex-row justify-center items-center gap-2 rounded-full md:px-[5px] px-[32px] py-[12px] md:ml-auto`}
                >
                  <Image
                    src={buttonIconSrc}
                    alt="bold icon"
                    height={18}
                    width={18}
                  />
                  <span className="text-white ml-3 text-[15px] font-semibold">
                    Generate Description
                  </span>
                </div>
              )}
            </span>
          </button>
        </div>
        {streamedData && (
          <div className=" mb-4 border-gray-500  rounded border-[1px] p-4">
            <h1 className="text-4xl font-extrabold text-gray-900  mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                AI Response{" "}
              </span>
            </h1>
            <div
              className="ml-2 font-sans text-gray-300  break-words"
              // style={{ textW: "auto" }}
            >
              <div
                className="list-disc"
                dangerouslySetInnerHTML={{ __html: streamedData }}
              ></div>
              <button
                disabled={msgLoading}
                onClick={() => copyJD(streamedData)}
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
                    : isJDCopied
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
    </>
  );
};

export default SubJDGenerator;
