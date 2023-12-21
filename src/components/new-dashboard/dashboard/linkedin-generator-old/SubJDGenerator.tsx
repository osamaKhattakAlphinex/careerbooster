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
import LimitCard from "../LimitCard";
import axios from "axios";
import buttonIconSrc from "@/../public/icon/u_bolt-alt.svg";
import { htmlToPlainText } from "@/helpers/HtmlToPlainText";
import copy from "clipboard-copy";
import PreviouslyGeneratedList from "@/components/PreviouslyGeneratedList";
import LinkedInJDCardSingle from "./LinkedInJDCardSingle";
import { makeid } from "@/helpers/makeid";
const SubJDGenerator = () => {
  const componentRef = useRef<any>(null);
  // local States
  const [msgLoading, setMsgLoading] = useState<boolean>(false); // msg loading
  const { data: session, status } = useSession();
  const [streamedData, setStreamedData] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const [availablePercentage, setAvailablePercentage] = useState<number>(0);
  const [percentageCalculated, setPercentageCalculated] =
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
  const userData = useSelector((state: any) => state.userData);
  const linkedinJD = useSelector((state: any) => state.linkedinJobDesc);

  // useEffect(() => {
  //   setJobDesc(streamedData);
  // }, [streamedData]);

  useEffect(() => {
    // if (
    //   userData.results &&
    //   userData.results.jobDescription &&
    //   userData.results.jobDescription !== ""
    // ) {
    //   setStreamedData(userData.results.jobDescription);
    // }
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
    if (
      userData.isFetched &&
      !isNaN(availablePercentage) &&
      availablePercentage !== 0
    ) {
      // remove ids from experiences
      const experiences = userData.experience.map((item: WorkExperience) => {
        const { id, ...rest } = item;
        return rest;
      });

      let tempText = "";
      for (const [index, experience] of experiences.entries()) {
        let dataForSaving = "";
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
        dataForSaving += html;
        setMsgLoading(true);
        const jobDescriptionId = makeid();
        const obj: any = {
          jobDescriptionId: jobDescriptionId,
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
            dataForSaving += text;
          }
        }
        setStreamedData((prev) => prev + `</p> <br /> `);
        setMsgLoading(false);
        await saveToDB(obj, dataForSaving);
      }

      fetch("/api/users/updateUserLimit", {
        method: "POST",
        body: JSON.stringify({
          email: session?.user?.email,
          type: "job_desc_generation",
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
          const JDResponse = await axios.get(
            "/api/linkedInBots/jdGeneratorSingle/getAllJD"
          );
          const updatedObject = {
            ...userData,
            userPackageUsed: {
              ...userData.userPackageUsed,
              job_desc_generation: user.userPackageUsed.job_desc_generation,
            },
            linkedInJobDescriptions:
              JDResponse.data.result.linkedInJobDescriptions,
          };
          dispatch(setUserData({ ...userData, ...updatedObject }));
        }
      });
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
      dispatch(setIsLoading(true));
      try {
        // Fetch userdata if not exists in Redux
        const res: any = await fetch(
          `/api/users/getOneByEmail?email=${session?.user?.email}`
        );
        let response;
        if (typeof res?.result === "object") {
          response = res;
        } else {
          response = await res.json();
        }

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
    dataSource: "linkedInJobDescriptions",
    Component: (card: any) => (
      <LinkedInJDCardSingle card={card} componentRef={componentRef} />
    ),
  };
  return (
    <>
      <PreviouslyGeneratedList {...historyProps} />
      <>
        <div className="headline-generator single-service-card-bg py-8 px-3 md:px-6 flex flex-col md:flex-row md:align-center gap-5 lg:justify-center items-center rounded-[10px] mb-[20px]">
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
              <h1 className="text-[16px] card-h2 font-bold">
                Job Description Generator
              </h1>
              <span
                className={`text-black rounded-full h-8 md:ml-3 flex justify-center items-center px-[16px] py-[6px]  bg-[#FEB602] text-[12px] uppercase font-bold `}
              >
                {iconOfPackageBadge ? (
                  <Image
                    src={iconOfPackageBadge}
                    alt="bold icon"
                    height={18}
                    width={18}
                    className="mr-2"
                  />
                ) : null}
                Premium
              </span>
            </div>
            <LimitCard
              title="Available"
              limit={userData?.userPackageData?.limit?.job_desc_generation}
              used={userData?.userPackageUsed?.job_desc_generation}
              setPercentageCalculated={setPercentageCalculated}
              availablePercentage={availablePercentage}
              setAvailablePercentage={setAvailablePercentage}
            />
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
            <span className={`card-h2 text-[15px] font-semibold`}>
              {msgLoading ? (
                <div className="flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
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
                  <Image
                    src={buttonIconSrc}
                    alt="bold icon"
                    height={18}
                    width={18}
                  />
                  <span className="card-h2 ml-3 text-[15px] font-semibold">
                    Generate Description
                  </span>
                </div>
              )}
            </span>
          </button>
        </div>
        {streamedData && (
          <div className="mb-4 border-gray-500  rounded border p-4">
            <h1 className="text-4xl font-extrabold text-gray-900  mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                AI Response{" "}
              </span>
            </h1>
            <div
              className="font-sans text-gray-300 whitespace-pre-wrap break-words"
              // style={{ textW: "auto" }}
            >
              <div
                className="list-disc"
                dangerouslySetInnerHTML={{ __html: streamedData }}
              ></div>
              <button
                disabled={msgLoading}
                onClick={() => copyJD(streamedData)}
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
