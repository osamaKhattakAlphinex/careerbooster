"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import { useSession } from "next-auth/react";
import ResumeTemplate1 from "@/components/new-dashboard/dashboard/resume-templates/templates/template_1";
import iconOfPackageBadge from "@/../public/icon/crown.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  WorkExperience,
  setField,
  setIsLoading,
  setUserData,
} from "@/store/userDataSlice";
import {
  setBasicInfo,
  setSummary,
  setWorkExperience,
  setPrimarySkills,
  setSecondarySkills,
  setProfessionalSkills,
  setId,
  setState,
  setWorkExperienceArray,
  resetResume,
  // setLoadingState,
} from "@/store/resumeSlice";
// import { exitFullScreenIcon, fullScreenIcon } from "@/helpers/iconsProvider";
import axios from "axios";
import { makeid } from "@/helpers/makeid";
import { checkIconSmall, leftArrowIcon } from "@/helpers/iconsProvider";
import Confetti from "react-dom-confetti";
import useTheme from "@/lib/useTheme";
import RecentResumeCard from "@/components/new-dashboard/dashboard/resume-builder/RecentResumeCard";
import GenerateResume from "@/components/new-dashboard/dashboard/resume-builder/GenerateNewResumeCard";
import Link from "next/link";
import { ALL_TEMPLATES } from "@/helpers/templateProvider";
import Image from "next/image";
import { crownIcon } from "@/helpers/newIconsProviders";

const ResumeBuilder = () => {
  const [theme] = useTheme();
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

  const componentRef = useRef<any>(null);
  const { data: session } = useSession();

  // Local States
  const [finished, setFinished] = useState<boolean>(false);
  const [streamedSummaryData, setStreamedSummaryData] = useState("");
  const [streamedJDData, setStreamedJDData] = useState("");
  const [aiInputUserData, setAiInputUserData] = useState<any>();
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [availablePercentage, setAvailablePercentage] = useState<number>(0);
  const [quantifyingExperience, setQuantifyingExperience] =
    useState<boolean>(true);

  // Redux
  const dispatch = useDispatch();
  const resumeData = useSelector((state: any) => state.resume);
  const userData = useSelector((state: any) => state.userData);
  const handleGenerate = useCallback(async () => {
    await getUserDataIfNotExists();
    // reset resume
    dispatch(resetResume(resumeData.state));

    if (resumeData.state.jobPosition !== "" && session?.user?.email) {
      dispatch(setState({ name: "resumeLoading", value: true }));
      dispatch(setId(""));
      getBasicInfo();
      getSummary();
      getPrimarySkills();
      getProfessionalSkills();
      getSecondarySkills();
      await getWorkExperienceNew();
      runConfetti();
    } else {
      setShowPopup(true);

      // Hide the popup after 3 seconds
      setTimeout(() => {
        setShowPopup(false);
      }, 3000);
    }
  }, [resumeData.state]);

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

  const getSummary = async () => {
    // return makeAPICallWithRetry(async () => {
    await getUserDataIfNotExists();
    setStreamedSummaryData("");
    dispatch(setSummary(""));
    // dispatch(setLoadingState("summary"));
    return fetch("/api/resumeBots/getBasicInfo", {
      method: "POST",
      body: JSON.stringify({
        type: "summary",
        jobPosition: resumeData.state.jobPosition,
        trainBotData: {
          userEmail: userData.email,
          // fileAddress: userData.files[0].fileName,
          fileAddress: userData.uploadedResume.fileName,
        },
      }),
    }).then(async (resp: any) => {
      // const res = await resp.json();

      if (resp.ok) {
        const reader = resp.body.getReader();
        let summaryTemp = "";
        while (true) {
          const { done, value } = await reader.read();

          if (done) {
            break;
          }

          const text = new TextDecoder().decode(value);
          setStreamedSummaryData((prev) => prev + text);
          summaryTemp += text;
        }

        dispatch(setSummary(summaryTemp));
      } else {
        setStreamedSummaryData("Error! Something went wrong");
      }
    });
    // });
  };

  const getWorkExperienceNew = async () => {
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
        workExpArrObj.title = experience?.jobTitle;

        html += `<h2 style="font-size: 1.1rem; line-height: 1.5rem">
        
        ${experience?.fromMonth} ${experience?.fromYear} - ${
          experience?.isContinue
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
            personName: userData.firstName +" "+ userData.lastName,
            jobTitle: resumeData.state.jobPosition
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

  const fetchLIstOfStrings = (text: string) => {
    // Create a new DOMParser
    const parser = new DOMParser();

    // Parse the HTML string into a DOM document
    const doc = parser.parseFromString(text, "text/html");

    // Get the <ul> element
    const ulElement = doc.querySelector("ul");
    if (ulElement) {
      // Get an array of <li> elements
      const liElements = ulElement.querySelectorAll("li");

      // Initialize an array to store the values of <li> elements
      const valuesArray: any = [];

      // Loop through the <li> elements and extract their text content
      liElements.forEach((liElement: any) => {
        valuesArray.push(liElement.textContent.trim());
      });
      return valuesArray;
    }

    return [];
  };

  // const getWorkExperience = async () => {
  //   await getUserDataIfNotExists();
  //   // dispatch(setLoadingState("workExperience"));
  //   return fetch("/api/resumeBots/getBasicInfo", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       type: "workExperience",
  //       jobPosition: resumeData.state.jobPosition,
  //     }),
  //   }).then(async (resp: any) => {
  //     const res = await resp.json();
  //     if (res.success) {
  //       console.clear();
  //       if (res?.data?.text) {
  //         const tSon = JSON.stringify(res?.data?.text);
  //         const myJSON = JSON.parse(tSon);
  //         console.log("myJSON1: ", myJSON);
  //         dispatch(setWorkExperience(myJSON));
  //       } else if (res?.data) {
  //         const myJSON = JSON.parse(res.data);
  //         console.log("myJSON2: ", myJSON);
  //         dispatch(setWorkExperience(myJSON));
  //       }
  //     }
  //   });
  // };

  const getPrimarySkills = async () => {
    // return makeAPICallWithRetry(async () => {
    // dispatch(setLoadingState("primarySkills"));
    await getUserDataIfNotExists();
    return fetch("/api/resumeBots/getBasicInfo", {
      method: "POST",
      body: JSON.stringify({
        type: "primarySkills",
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

  const getProfessionalSkills = async () => {
    // return makeAPICallWithRetry(async () => {
    // dispatch(setLoadingState("professionalSkills"));
    return fetch("/api/resumeBots/getBasicInfo", {
      method: "POST",
      body: JSON.stringify({
        type: "professionalSkills",
        email: session?.user?.email,
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
          dispatch(setProfessionalSkills({ professionalSkills: myJSON }));
        }
      }
    });
    // });
  };

  const getSecondarySkills = async () => {
    // return makeAPICallWithRetry(async () => {
    // dispatch(setLoadingState("secondarySkills"));
    return fetch("/api/resumeBots/getBasicInfo", {
      method: "POST",
      body: JSON.stringify({
        type: "secondarySkills",
        email: session?.user?.email,
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
          dispatch(setSecondarySkills({ secondarySkills: myJSON }));
        }
      }
    });
    // });
  };

  const getUserDataIfNotExists = async () => {
    // return makeAPICallWithRetry(async () => {
    if (!userData.isLoading && !userData.isFetched) {
      dispatch(setIsLoading(true));
      // Fetch userdata if not exists in Redux
      const res = await fetch(
        `/api/users/getOneByEmail?email=${session?.user?.email}`
      );

      const response = await res.json();

      dispatch(setUserData(response.result));
      dispatch(setIsLoading(false));
      dispatch(setField({ name: "isFetched", value: true }));
    }
    // });
  };

  const saveResumeToDB = async (data: any = "") => {
    // return makeAPICallWithRetry(async () => {
    const source = data === "" ? resumeData : data;
    let obj = source;
    if (!source.id || source.id === "") {
      obj = { ...source, id: makeid(), dateTime: new Date() };
    }

    axios
      .post("/api/resumeBots/saveResumeToDB", {
        email: session?.user?.email,
        resumeData: obj,
      })
      .then(async (resp) => {
        dispatch(setId(obj.id));
        // update user in redux
        const res = await fetch(
          `/api/users/getOneByEmail?email=${session?.user?.email}`
        );

        const response = await res.json();
        const user = response.result;
        dispatch(setUserData(user));
        // get user package details
        const res2 = await fetch(
          `/api/users/getUserPackageDetails?id=${user?.userPackage}`
        );
        const data = await res2.json();
        if (data.success) {
          const userPackage = data.result;
          // set user package details to redux
          dispatch(setField({ name: "userPackageData", value: userPackage }));
        }

        // show alert for 2 seconds using setTimeout
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 1000);
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
        <div className="ml-0 lg:ml-[234px] px-[15px] lg:mb-[72px] ">
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
            quantifyingExperience={quantifyingExperience}
            setQuantifyingExperience={setQuantifyingExperience}
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

              <h2 className=" text-base font-bold my-3">Design Templates</h2>

              <div className="flex flex-row justify-between items-center pl-5">
                {ALL_TEMPLATES.slice(0, 5).map((template, index) => (
                  <div
                    key={`template-${index}`}
                    className="box-border group relative  rounded-lg flex items-center overflow-hidden"
                  >
                    {template.category === "premium" && (
                      <div className="absolute rounded-full right-1 top-1 h-6 w-6 grid place-content-center bg-yellow-600">
                        {crownIcon}
                        {/* <Image
                          src={iconOfPackageBadge}
                          alt="bold icon"
                          height={16}
                          width={16}
                          className=""
                        /> */}
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

                <Link
                  href="/resume-builder/templates"
                  className="no-underline text-white rounded-lg overflow-hidden"
                >
                  <div
                    className={` font-bold dark:bg-gradient-to-r from-[#b324d7] to-[#615dff] dark:border-none dark:border-0 border border-gray-950 bg-transparent grid gap-2 text-center py-2 px-4`}
                  >
                    Explore More Templates
                  </div>
                </Link>
              </div>
            </div>
          )}
          {resumeData &&
            (resumeData?.name ||
              resumeData?.contact?.email ||
              resumeData?.summary) && (
              <>
                <div className={`my-10  w-[100%] bg-white`}>
                  <div
                    className={`w-full  ${
                      resumeData.state.resumeLoading ? "animate-pulse" : ""
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
              </>
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
