"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import { useSession } from "next-auth/react";
import ResumeTemplate1 from "@/components/new-dashboard/dashboard/resume-templates/templates/template_1";
import { useDispatch, useSelector } from "react-redux";
import {
  WorkExperience,
} from "@/store/userDataSlice";
import {
  setBasicInfo,

  setWorkExperience,
  setPrimarySkills,
  setId,
  setState,
  setWorkExperienceArray,
  resetResume,
  setQuantifyingExperience,
  // setLoadingState,
} from "@/store/resumeSlice";

import { checkIconSmall, leftArrowIcon } from "@/helpers/iconsProvider";
import Confetti from "react-dom-confetti";
import RecentResumeCard from "@/components/new-dashboard/dashboard/resume-builder/RecentResumeCard";
import GenerateResume from "@/components/new-dashboard/dashboard/resume-builder/GenerateNewResumeCard";
import Link from "next/link";
import { ALL_TEMPLATES } from "@/helpers/templateProvider";
import Image from "next/image";
import { crownIcon } from "@/helpers/newIconsProviders";
import useSaveResumeToDB from "@/hooks/useSaveToDB";
import useGetUserData from "@/hooks/useGetUserData";
import useGetSummary from "@/hooks/useGetSummary";
import { fetchLIstOfStrings } from "@/helpers/fetchLIstOfStrings";

const ResumeBuilder = () => {
  const [confettingRunning, setConfettiRunning] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const confettiConfig = {
    angle: 90,
    spread: 360,
    startVelocity: 40,
    elementCount: 200,
    decay: 0.95,
    duration: 8000,
    width: "25px",
    height: "25px",
  };

  const runConfetti = () => {
    setConfettiRunning(true);
    setTimeout(() => {
      setConfettiRunning(false);
    }, 3000); // Adjust the duration as needed
  };

  const { getUserDataIfNotExists } = useGetUserData()
  const componentRef = useRef<any>(null);
  const { data: session } = useSession();

  // Local States
  const [finished, setFinished] = useState<boolean>(false);
  const [streamedSummaryData, setStreamedSummaryData] = useState("");
  const [streamedJDData, setStreamedJDData] = useState("");
  const [aiInputUserData, setAiInputUserData] = useState<any>();
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [availablePercentage, setAvailablePercentage] = useState<number>(0);
  const { saveResumeToDB } = useSaveResumeToDB()
  // Redux
  const dispatch = useDispatch();
  const resumeData = useSelector((state: any) => state.resume);
  const userData = useSelector((state: any) => state.userData);
  const { getSummary } = useGetSummary(setStreamedSummaryData)

  const handleGenerate = useCallback(
    async (quantifyingExperience: boolean) => {
      await getUserDataIfNotExists();
      // reset resume
      dispatch(resetResume(resumeData.state));
      if (resumeData.state.jobPosition !== "" && session?.user?.email) {
        dispatch(setState({ name: "resumeLoading", value: true }));
        dispatch(setQuantifyingExperience(quantifyingExperience));
        dispatch(setId(""));
        getBasicInfo();
        getSummary();
        getPrimarySkills();
        // getProfessionalSkills();
        // getSecondarySkills();
        await getWorkExperienceNew(quantifyingExperience);
        runConfetti();
      } else {
        setShowPopup(true);

        // Hide the popup after 3 seconds
        setTimeout(() => {
          setShowPopup(false);
        }, 3000);
      }
    },
    [resumeData.state]
  );

  // const makeAPICallWithRetry: any = async (
  //   apiFunction: any,
  //   retriesLeft = 2
  // ) => {
  //   try {
  //     // Attempt the API call
  //     return await apiFunction();
  //   } catch (error) {
  //     // If an error occurs and retries are left, retry the call
  //     if (retriesLeft > 0) {
  //       console.log(
  //         `API call failed. Retrying... Retries left: ${retriesLeft}`
  //       );
  //       return makeAPICallWithRetry(apiFunction, retriesLeft - 1);
  //     } else {
  //       // If no retries are left, handle the error accordingly
  //       console.error("API call failed after multiple retries.", error);
  //       throw new Error("API call failed after multiple retries");
  //     }
  //   }
  // };

  const getBasicInfo = async () => {
    // dispatch(setLoadingState("basicInfo"));
    // return makeAPICallWithRetry(async () => {
    return fetch("/api/resumeBots/getBasicInfo", {
      method: "POST",
      body: JSON.stringify({
        type: "basicDetails",
        inputType: "userData",
        personName: userData.firstName + " " + userData.lastName,

        userData: aiInputUserData,
        jobPosition: resumeData.state.jobPosition,
        trainBotData: {
          userEmail: userData.email,
          // fileAddress: userData.files[0].fileName,
          fileAddress: userData.uploadedResume.fileName,
        },
      }),
    }).then(async (resp: any) => {
      const res = await resp.json();

      if (res.success && res?.result) {
        let myJSON;
        if (typeof res.result === "object") {
          myJSON = res.result;
        } else {
          myJSON = await JSON.parse(res.result);
        }
        const basicObj = {
          ...myJSON,
          name: userData?.firstName + " " + userData?.lastName,
          contact: {
            ...myJSON?.contact,
            email: userData?.email,
            phone: userData?.phone,
          },
          education: userData?.education,
        };
        dispatch(setBasicInfo(basicObj));
      }
    });
    // });
  };

  const getWorkExperienceNew = async (quantifyingExperience: boolean) => {
    // return makeAPICallWithRetry(async () => {
    // dispatch(setLoadingState("workExperience"));
    await getUserDataIfNotExists();

    if (userData.isFetched) {
      // remove ids from experiences
      const experiences = userData.experience.map((item: WorkExperience) => {
        const { id, ...rest } = item;
        return rest;
      });
      setStreamedJDData("");
      dispatch(setWorkExperience(""));
      let temp = "";
      const workExpArr: any = [];
      for (const [index, experience] of experiences.entries()) {
        let workExpArrObj: any = {};
        let html = "";
        html += `<h2 style="font-size: 1.3rem; font-weight: bold; line-height: 2rem; ">${experience?.jobTitle}</h2>`;
        // workExpArrObj.experienceId = experience?.experienceId
        workExpArrObj.title = experience?.jobTitle;

        html += `<h2 style="font-size: 1.1rem; line-height: 1.5rem">
        
        ${experience?.fromMonth} ${experience?.fromYear} - ${experience?.isContinue
            ? "Present"
            : experience?.toMonth + " " + experience?.toYear
          } | ${experience?.company} | 
        ${experience?.cityState} ${experience?.country}
                  </h2>`;
        html += `<div>`;
        workExpArrObj.cityState = experience?.cityState;
        workExpArrObj.country = experience?.country;
        workExpArrObj.company = experience?.company;
        workExpArrObj.fromMonth = experience?.fromMonth;
        workExpArrObj.fromYear = experience?.fromYear;
        workExpArrObj.isContinue = experience?.isContinue;
        workExpArrObj.toMonth = experience?.toMonth;
        workExpArrObj.toYear = experience?.toYear;

        temp += html;
        let achievementTemp = "";
        setStreamedJDData((prev) => prev + html);
        const res: any = await fetch("/api/resumeBots/jdGeneratorSingle", {
          method: "POST",
          body: JSON.stringify({
            quantifyingExperience: quantifyingExperience,
            experience: experience,
            trainBotData: {
              userEmail: userData.email,
              // fileAddress: userData.files[0].fileName,
              fileAddress: userData.uploadedResume.fileName,
            },
            personName: userData.firstName + " " + userData.lastName,
            jobTitle: resumeData.state.jobPosition,
          }),
        });
        // const response = await res.json();
        // console.log("result", result, typeof result);
        if (res.ok) {
          const reader = res.body.getReader();
          while (true) {
            const { done, value } = await reader.read();

            if (done) {
              break;
            }

            const text = new TextDecoder().decode(value);
            // const text = response.result;
            setStreamedJDData((prev) => prev + text);
            temp += text;
            achievementTemp += text;
          }
        }

        setStreamedJDData((prev) => prev + `</div> <br /> `);
        temp += `</div> <br /> `;
        const achivementsArray = fetchLIstOfStrings(achievementTemp);
        workExpArrObj.achievements = achivementsArray;
        workExpArr.push(workExpArrObj);
      }
      setFinished(true);
      dispatch(setWorkExperienceArray({ workExperienceArray: workExpArr }));
      dispatch(setState({ name: "resumeLoading", value: false }));
      dispatch(setWorkExperience(temp));
    }
    // });
  };



  const getPrimarySkills = async () => {
    // return makeAPICallWithRetry(async () => {
    // dispatch(setLoadingState("primarySkills"));
    await getUserDataIfNotExists();
    return fetch("/api/resumeBots/getBasicInfo", {
      method: "POST",
      body: JSON.stringify({
        type: "primarySkills",
        personName: userData?.firstName + " " + userData?.lastName,

        userData: aiInputUserData,
        jobPosition: resumeData.state.jobPosition,
        trainBotData: {
          userEmail: userData.email,
          // fileAddress: userData.files[0].fileName,
          fileAddress: userData.uploadedResume.fileName,
        },
      }),
    }).then(async (resp: any) => {
      const res = await resp.json();
      if (res.success) {
        if (res?.result) {
          let myJSON = JSON.parse(JSON.stringify(res.result));

          myJSON = JSON.parse(myJSON);
          dispatch(setPrimarySkills({ primarySkills: myJSON }));
        }
      }
    });
    // });
  };


  useEffect(() => {
    if (!resumeData.state.resumeLoading && resumeData?.name) {
      saveResumeToDB();
      setFinished(true);
    }
  }, [resumeData?.state?.resumeLoading]);

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

  return (
    <>
      <div className="w-full sm:w-full z-1000 ">
        <div className="ml-0 lg:ml-[234px] px-[15px] lg:mb-[72px]">
          <Link
            href="/dashboard"
            className="ml-2 my-4 no-underline dark:text-[#b324d7] dark:hover:text-[#e6f85e] text-gray-950 hover:text-[#b324d7] flex flex-row gap-2 items-center hover:opacity-80 transition-all"
          >
            {leftArrowIcon}
            Back
          </Link>
          <RecentResumeCard
            source="dashboard"
            componentRef={componentRef}
            setFinished={setFinished}
          />
          {showAlert && (
            <div
              className="fixed bottom-10 right-10 flex flex-row gap-2 justify-center items-center bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-white transition-opacity cursor-pointer"
              onClick={() => setShowAlert(false)}
            >
              {checkIconSmall}
              Auto saved
            </div>
          )}
          <GenerateResume
            handleGenerate={handleGenerate}
            availablePercentage={availablePercentage}
          />
          <div className="flex justify-center items-center">
            <Confetti active={confettingRunning} config={confettiConfig} />
          </div>
          {finished && (
            <div className="text-white space-y-3">
              {/* <p>
                We have generated free text basic resume for you for further
                design templates click here
              </p> */}
              <div className="flex justify-between items-center">
                <h2 className=" text-base font-bold my-3">Design Templates</h2>
                <Link
                  href="/resume-builder/templates"
                  className="no-underline  text-white rounded-lg overflow-hidden"
                >
                  <div
                    className={` font-bold dark:bg-gradient-to-r from-[#b324d7] to-[#615dff] dark:border-none dark:border-0 border border-gray-950 bg-transparent grid gap-2 text-center py-1 px-2`}
                  >
                    All Templates
                  </div>
                </Link>
              </div>
              <div className="flex flex-wrap justify-center gap-4 items-center pl-5">
                {ALL_TEMPLATES.slice(0, 6).map((template, index) => (
                  <div
                    key={`template-${index}`}
                    className="box-border group relative  rounded-lg flex items-center overflow-hidden "
                  >
                    {template.category === "premium" && (
                      <div className="absolute rounded-full right-1 top-1 h-6 w-6 grid place-content-center bg-yellow-600">
                        {crownIcon}
                      </div>
                    )}
                    <Link
                      className="no-underline"
                      href={{
                        pathname: "resume-builder/templates/template",
                        query: { templateId: template.id },
                      }}
                    >
                      <div className=" group-hover:grid hidden bg-slate-600/60 text-white  absolute top-0 left-0 h-full w-full rounded-lg  overflow-hidden  place-content-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-8 h-8"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
                          />
                        </svg>
                      </div>
                      <Image
                        src={template.preview}
                        alt={`template-${index}`}
                        height={200}
                        width={150}
                      />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
          {resumeData &&
            (resumeData?.name ||
              resumeData?.contact?.email ||
              resumeData?.summary) && (

              <div
                className={`my-10 ${resumeData.state.resumeLoading ? "animate-pulse" : ""
                  }`}
              >
                {/* <Link href="#" className="text-black">Preview</Link> */}
                <div
                  className={`bg-white ${resumeData.state.resumeLoading ? "animate-pulse" : ""
                    }`}
                  ref={componentRef}
                >
                  <ResumeTemplate1
                    streamedSummaryData={streamedSummaryData}
                    streamedJDData={streamedJDData}
                    saveResumeToDB={saveResumeToDB}
                  />
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
      </div>
    </>
  );
};
export default ResumeBuilder;
