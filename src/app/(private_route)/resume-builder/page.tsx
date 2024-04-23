"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import { useSession } from "next-auth/react";
import ResumeTemplate1 from "@/components/dashboard/resume-templates/templates/template_1";
import { useDispatch, useSelector } from "react-redux";
import { Publication, WorkExperience } from "@/store/userDataSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import {
  setBasicInfo,
  setWorkExperience,
  setPrimarySkills,
  setId,
  setState,
  setWorkExperienceArray,
  resetResume,
  setQuantifyingExperience,
  setTrainings,
  setAwards,
  setPublications,
  setReferences,
  setInterests,
  setCertifications,
  setLanguages,
  setProjects,
} from "@/store/resumeSlice";

import {
  checkIconSmall,
  chevronRight,
  crossIcon,
  infoSmallIcon,
  leftArrowIcon,
} from "@/helpers/iconsProvider";
import Confetti from "react-dom-confetti";
import RecentResumeCard from "@/components/dashboard/resume-builder/RecentResumeCard";
import GenerateResume from "@/components/dashboard/resume-builder/GenerateNewResumeCard";
import Link from "next/link";
import { ALL_TEMPLATES } from "@/helpers/templateProvider";
import Image from "next/image";
import useSaveResumeToDB from "@/hooks/useSaveToDB";
import useGetUserData from "@/hooks/useGetUserData";
import useGetSummary from "@/hooks/useGetSummary";
import { fetchLIstOfStrings } from "@/helpers/fetchLIstOfStrings";
import useGetCreditLimits from "@/hooks/useGetCreditLimits";
import { showSuccessToast, showErrorToast } from "@/helpers/toast";
import CreditInfoModal from "@/components/dashboard/resume-builder/CreditsInfoModal";
import TemplateSlider from "@/components/dashboard/resume-templates/templateSlider";
import TourBot from "@/components/dashboard/TourBot";
import { useTourContext } from "@/context/TourContext";
import { formatDate } from "@/helpers/getFormattedDateTime";

const ResumeBuilder = () => {
  const [confettingRunning, setConfettiRunning] = useState(false);
  const [showConfettiRunning, setShowConfettiRunning] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [showTemplatePopup, setShowTemplatePopup] = useState(false);
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

  const creditsInfoRef: React.MutableRefObject<any> = useRef(null);

  const { resumeElementRef, tourBotRef, historyCardRef, availableCreditsRef } =
    useTourContext();

  const runConfetti = () => {
    if (showConfettiRunning) {
      showSuccessToast("Generated Successfully");
      setConfettiRunning(true);
      setTimeout(() => {
        setConfettiRunning(false);
        setShowTemplatePopup(true);
      }, 3000); // Adjust the duration as needed
    }
  };

  const { getUserDataIfNotExists } = useGetUserData();
  const componentRef = useRef<any>(null);
  const { data: session } = useSession();

  // Local States
  const [finished, setFinished] = useState<boolean>(false);
  const [streamedSummaryData, setStreamedSummaryData] = useState("");
  const [streamedJDData, setStreamedJDData] = useState<any>("");
  const [streamedPublicationData, setStreamedPublicationData] =
    useState<any>("");
  const [outOfCredits, setOutOfCredits] = useState<boolean>(false);
  const [aiInputUserData, setAiInputUserData] = useState<any>();
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [resumeGenerated, setResumeGenerated] = useState<boolean>(false);
  const { saveResumeToDB } = useSaveResumeToDB();
  // const { createAbortController, abort } = useAbortController();
  // Redux
  const dispatch = useDispatch();
  const resumeData = useSelector((state: any) => state.resume);
  const userData = useSelector((state: any) => state.userData);
  const creditLimits = useSelector((state: any) => state.creditLimits);
  const { getCreditLimitsIfNotExists } = useGetCreditLimits();

  const { getSummary } = useGetSummary(setStreamedSummaryData, setOutOfCredits);

  const getConsent = () => {
    if (creditsInfoRef.current) {
      creditsInfoRef.current.openModal(true);
    }
  };

  const handleGenerate = useCallback(
    async (quantifyingExperience: boolean) => {
      await getUserDataIfNotExists();
      await getCreditLimitsIfNotExists();

      // reset resume
      dispatch(resetResume(resumeData.state));

      if (session?.user?.email) {
        setResumeGenerated(false);
        dispatch(setState({ name: "resumeLoading", value: true }));
        dispatch(setQuantifyingExperience(quantifyingExperience));
        dispatch(setTrainings({ trainings: userData.trainings }));
        dispatch(setProjects({ projects: userData.projects }));
        dispatch(setAwards({ awards: userData.awards }));
        dispatch(setPublications({ publications: userData.publications }));
        dispatch(setReferences({ references: userData.references }));
        dispatch(setInterests({ interests: userData.interests }));
        dispatch(
          setCertifications({ certifications: userData.certifications })
        );
        dispatch(setLanguages({ languages: userData.languages }));

        dispatch(setId(""));
        await getBasicInfo();

        await getSummary();
        await getPrimarySkills();
        await getWorkExperienceNew(quantifyingExperience);

        // await getPublications();
        // await addCustomSection();
        // adding custom sections
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
    // return makeAPICallWithRetry(async () => {
    return fetch("/api/resumeBots/getBasicInfo", {
      method: "POST",
      body: JSON.stringify({
        type: "basicDetails",
        inputType: "userData",
        personName: userData.firstName + " " + userData.lastName,

        creditsUsed: creditLimits.resume_basicInfo,
        userData: aiInputUserData,

        resumeType: resumeData.state.resumeType,
        jobPosition: resumeData.state.jobPosition,
        jobDescription: resumeData.state.jobDescription,

        trainBotData: {
          userEmail: userData.email,
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
            address:
              userData?.contact?.street +
              " " +
              userData?.contact?.cityState +
              " " +
              userData?.contact?.country +
              " " +
              userData?.contact?.postalCode,
          },
          education: userData?.education,
        };
        dispatch(setBasicInfo(basicObj));
      } else {
        setShowConfettiRunning(false);

        showErrorToast("Something Went Wrong");
      }
    });
    // });
  };

  const getWorkExperienceNew = async (quantifyingExperience: boolean) => {
    // return makeAPICallWithRetry(async () => {
    await getCreditLimitsIfNotExists();
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
        setStreamedJDData((prev: any) => prev + html);

        const res: any = await fetch("/api/resumeBots/jdGeneratorSingle", {
          method: "POST",
          body: JSON.stringify({
            quantifyingExperience: quantifyingExperience,
            experience: experience,

            creditsUsed: creditLimits.resume_individualWorkExperience,
            trainBotData: {
              userEmail: userData.email,
              // fileAddress: userData.files[0].fileName,
              fileAddress: userData.uploadedResume.fileName,
            },
            personName: userData.firstName + " " + userData.lastName,
            jobTitle: resumeData.state.jobPosition,
          }),
        });

        if (res.ok) {
          const reader = res.body.getReader();
          while (true) {
            const { done, value } = await reader.read();

            if (done) {
              break;
            }

            const text = new TextDecoder().decode(value);
            setStreamedJDData((prev: any) => prev + text);
            temp += text;
            achievementTemp += text;
          }

          setStreamedJDData((prev: any) => prev + `</div> <br /> `);
          temp += `</div> <br /> `;
          const achivementsArray = fetchLIstOfStrings(achievementTemp);
          workExpArrObj.achievements = achivementsArray;
          workExpArr.push(workExpArrObj);
        } else {
          setShowConfettiRunning(false);
          setStreamedJDData("You ran out of credits!");
        }
      }
      setFinished(true);
      dispatch(setWorkExperienceArray({ workExperienceArray: workExpArr }));
      dispatch(setState({ name: "resumeLoading", value: false }));
      setResumeGenerated(true);
      dispatch(setWorkExperience(temp));
    }
    // });
  };

  const getPublications = async () => {
    // return makeAPICallWithRetry(async () => {
    await getCreditLimitsIfNotExists();
    await getUserDataIfNotExists();

    if (userData.isFetched) {
      // remove ids from experiences
      const publications = userData.publications.map((item: Publication) => {
        const { id, ...rest } = item;
        return rest;
      });
      setStreamedPublicationData("");
      let temp = "";
      const publicationArr: any = [];
      for (const [index, publication] of publications.entries()) {
        let publicationArrObj: any = {};
        let html = "";
        html += `<h2 style="font-size: 1.3rem; font-weight: bold; line-height: 2rem; ">${publication?.title}</h2>`;
        publicationArrObj.title = publication?.title;

        html += `<h2 style="font-size: 1.1rem; line-height: 1.5rem">
        
        ${formatDate(publication?.date)}
                  </h2>`;
        html += `<div>`;
        publicationArrObj.date = formatDate(publication?.date);

        temp += html;
        let achievementTemp = "";
        setStreamedPublicationData((prev: any) => prev + html);

        const res: any = await fetch(
          "/api/resumeBots/publicationsGeneratorSingle",
          {
            method: "POST",
            body: JSON.stringify({
              publication: publication,

              creditsUsed: creditLimits.resume_individualPublication,
              trainBotData: {
                userEmail: userData.email,
                // fileAddress: userData.files[0].fileName,
                fileAddress: userData.uploadedResume.fileName,
              },
              personName: userData.firstName + " " + userData.lastName,
              jobTitle: resumeData.state.jobPosition,
            }),
          }
        );

        if (res.ok) {
          const reader = res.body.getReader();
          while (true) {
            const { done, value } = await reader.read();

            if (done) {
              break;
            }

            const text = new TextDecoder().decode(value);
            setStreamedPublicationData((prev: any) => prev + text);
            temp += text;
            achievementTemp += text;
          }

          setStreamedJDData((prev: any) => prev + `</div> <br /> `);
          temp += `</div> <br /> `;
          const achivementsArray = fetchLIstOfStrings(achievementTemp);
          publicationArrObj.description = achivementsArray;
          publicationArr.push(publicationArrObj);
        } else {
          setShowConfettiRunning(false);
          setStreamedPublicationData("You ran out of credits!");
        }
      }
      setFinished(true);
      dispatch(setPublications({ publications: publicationArr }));
      setResumeGenerated(true);
      dispatch(setState({ name: "resumeLoading", value: false }));
    }
    // });
  };

  const getPrimarySkills = async () => {
    // return makeAPICallWithRetry(async () => {
    await getUserDataIfNotExists();
    await getCreditLimitsIfNotExists();
    return fetch("/api/resumeBots/getBasicInfo", {
      method: "POST",
      body: JSON.stringify({
        type: "primarySkills",
        personName: userData?.firstName + " " + userData?.lastName,

        resumeType: resumeData.state.resumeType,
        jobPosition: resumeData.state.jobPosition,
        jobDescription: resumeData.state.jobDescription,

        creditsUsed: creditLimits.resume_skills,
        userData: aiInputUserData,

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
      } else {
        setShowConfettiRunning(false);
      }
    });
    // });
  };

  useEffect(() => {
    if (!resumeData.state.resumeLoading && resumeData?.name) {
      setFinished(true);
    }
    if (
      resumeGenerated &&
      !resumeData.state.resumeLoading &&
      resumeData?.name &&
      !outOfCredits
    ) {
      saveResumeToDB();
    }
  }, [resumeData?.state?.resumeLoading]);

  useEffect(() => {
    if (userData && userData?.email) {
      setAiInputUserData({
        contact: userData?.contact,
        linkedin: userData?.linkedin,
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

  useEffect(() => {
    if (userData && userData?.tours) {
      if (!userData.tours.resumeBuilder) {
        setTimeout(() => {
          tourBotRef?.current?.click();
        }, 500);
      }
    }
  }, [tourBotRef]);

  useEffect(() => {
    if (outOfCredits) {
      setShowConfettiRunning(false);
      setTimeout(() => {
        tourBotRef?.current?.click();
      }, 500);
    }
  }, [outOfCredits]);

  const tourBotConfig = {
    name: "resumeBuilder",
    audios: [
      {
        url: "/resume-history-card.mp3",
        for: "history",
      },
      {
        url: "/resume-builder-main.mp3",
        for: "tool",
      },
    ],
    toolRefs: [
      {
        ref: historyCardRef,
        for: "history",
      },
      {
        ref: resumeElementRef,
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

  return (
    <>
      <CreditInfoModal ref={creditsInfoRef} handleGenerate={handleGenerate} />
      {showTemplatePopup && (
        <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen bg-black/90">
          <div className="flex flex-col items-center gap-4 py-4 bg-gray-800 rounded-lg">
            <div className="flex items-center justify-between w-full px-4">
              <h1 className="font-semibold xs:text-xl md:text-2xl ">
                Select a Design for your Resume
              </h1>
              <h1
                className="font-semibold cursor-pointer xs:text-xl md:text-2xl"
                onClick={() => setShowTemplatePopup(false)}
              >
                {crossIcon}
              </h1>
            </div>
            <div className="flex justify-start w-full px-4">
              <p>Pick a template that aligns with your professional image.</p>
            </div>
            <div className=" xs:w-[300px] md:w-[44rem] lg:w-[55rem] xl:w-[55rem] rounded-xl z-50">
              <TemplateSlider
                templates={ALL_TEMPLATES.filter((template) => template.active)}
              />
            </div>
          </div>
        </div>
      )}

      <div className="w-full sm:w-full z-1000 ">
        <div className="ml-0 lg:ml-[234px] px-[15px] lg:mb-[72px]">
          <RecentResumeCard
            source="dashboard"
            componentRef={componentRef}
            setFinished={setFinished}
          />
          {showAlert && (
            <div
              className="fixed flex flex-row items-center justify-center gap-2 px-4 py-2 text-white transition-opacity bg-green-600 rounded-lg cursor-pointer bottom-10 right-10 hover:bg-green-700"
              onClick={() => setShowAlert(false)}
            >
              {checkIconSmall}
              Auto saved
            </div>
          )}
          <div>
            <GenerateResume getConsent={getConsent} />
          </div>
          <div className="fixed bottom-0 flex items-center justify-center">
            <Confetti active={confettingRunning} config={confettiConfig} />
          </div>
          {finished && (
            <div className="space-y-3 text-white">
              {/* <p>
                We have generated free text basic resume for you for further
                design templates click here
              </p> */}
              <div className="flex items-center justify-between gap-3 xs:flex-col md:flex-row">
                <div className="flex items-center gaap-3">
                  <h2 className="flex items-center my-3 text-base font-bold dark:text-gray-100 text-gray-950">
                    Template Selection{" "}
                  </h2>
                  <div className="relative inset-0 ml-1 cursor-pointer group">
                    {infoSmallIcon}
                    <div className="w-40 md:w-44 bg-gradient-to-r  from-[#B324D7] to-[#615DFF] font-medium xs:text-[10px] md:text-[12px] px-2 absolute xs:left-1 md:left-[10px] xs:-top-[92px]  md:-top-[4.8rem]  hidden group-hover:block md:rounded-bl-none xs:rounded-bl-none md:rounded-br-xl text-gray-100  mb-6 shadow-xl rounded-xl py-2  transition-all">
                      Select any template below to instantly update your resume
                      design.
                    </div>
                  </div>
                </div>

                <Link
                  href="/resume-builder/templates"
                  className="overflow-hidden text-white no-underline rounded-lg md:mt-3"
                >
                  <div
                    className={` font-bold bg-gradient-to-r hover:from-purple-800 hover:to-pink-600 text-[15px]  from-[#b324d7] to-[#615dff] dark:border-none dark:border-0 border-[1px] dark:border-gray-950 bg-transparent flex items-center gap-2 text-center py-2 px-3`}
                  >
                    View All Templates
                    <i className=""> {chevronRight}</i>
                  </div>
                </Link>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-4 ">
                <Swiper
                  slidesPerView={5}
                  spaceBetween={10}
                  rewind={true}
                  speed={1200}
                  navigation={true}
                  autoplay={{ delay: 8500, disableOnInteraction: false }}
                  modules={[Autoplay, Navigation]}
                  className=""
                  loop={true}
                  breakpoints={{
                    0: {
                      slidesPerView: 2,
                    },
                    425: {
                      slidesPerView: 3,
                    },
                    640: {
                      slidesPerView: 4,
                    },
                    768: {
                      slidesPerView: 5,
                    },
                    1080: {
                      slidesPerView: 6,
                    },
                    1280: {
                      slidesPerView: 6,
                    },
                  }}
                >
                  {ALL_TEMPLATES.filter((template) => template.active)
                    .slice(0, 6)
                    .map((template, index) => (
                      <SwiperSlide key={`template-${index}`}>
                        <div
                          key={`template-${index}`}
                          className="box-border relative flex items-center overflow-hidden rounded-lg group"
                        >
                          <Link
                            className="no-underline"
                            href={{
                              pathname: "resume-builder/templates/template",
                              query: { templateId: template.id },
                            }}
                          >
                            <div className="absolute top-0 left-0 hidden w-full h-full overflow-hidden text-white rounded-lg group-hover:grid bg-slate-600/60 place-content-center">
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
                              className="rounded-lg "
                            />
                          </Link>
                        </div>
                      </SwiperSlide>
                    ))}
                </Swiper>
              </div>
            </div>
          )}
          {resumeData &&
            (resumeData?.name ||
              resumeData?.contact?.email ||
              resumeData?.summary) && (
              <div
                className={`my-10 ${
                  resumeData.state.resumeLoading ? "animate-pulse" : ""
                }`}
              >
                {/* <Link href="#" className="text-black">Preview</Link> */}
                <div
                  className={`bg-white ${
                    resumeData.state.resumeLoading ? "animate-pulse" : ""
                  }`}
                  ref={componentRef}
                >
                  <ResumeTemplate1
                    streamedSummaryData={streamedSummaryData}
                    streamedJDData={streamedJDData}
                    setStreamedJDData={setStreamedJDData}
                    setStreamedSummaryData={setStreamedSummaryData}
                    setOutOfCredits={setOutOfCredits}
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
      <TourBot
        config={outOfCredits ? tourBotConfig2 : tourBotConfig}
        setOutOfCredits={setOutOfCredits}
      />
    </>
  );
};
export default ResumeBuilder;
