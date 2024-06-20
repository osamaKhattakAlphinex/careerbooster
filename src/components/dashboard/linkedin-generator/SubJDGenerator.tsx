"use client";
import Image from "next/image";
import Svg1 from "@/../public/icon/headline-icon.svg";
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { WorkExperience, setUserData } from "@/store/userDataSlice";
import axios from "axios";
import { htmlToPlainText } from "@/helpers/HtmlToPlainText";
import copy from "clipboard-copy";
import PreviouslyGeneratedList from "@/components/dashboard/PreviouslyGeneratedList";
import LinkedInJDCardSingle from "./LinkedInJDCardSingle";
import { makeid } from "@/helpers/makeid";
import useGetUserData from "@/hooks/useGetUserData";
import { useAppContext } from "@/context/AppContext";
import { showSuccessToast, showErrorToast } from "@/helpers/toast";
import Toolbar from "../Toolbar";
import { newViewIcon } from "@/helpers/iconsProvider";

import Loader from "@/components/common/Loader";
import { setLinkedInJobDescription } from "@/store/linkedInJobDescriptionSlice";
import DownloadService from "@/helpers/downloadFile";
import { useTourContext } from "@/context/TourContext";
import TourBot from "../TourBot";
import { RootState } from "@/store/store";

const SubJDGenerator = () => {
  const componentRef = useRef<HTMLDivElement | null>(null);
  const creditLimits = useSelector((state: RootState) => state.creditLimits);
  const [msgLoading, setMsgLoading] = useState<boolean>(false); // msg loading
  const { data: session } = useSession();
  const [streamedData, setStreamedData] = useState<string>("");
  const [showPopup, setShowPopup] = useState(false);
  const { setAvailableCredits, abortController, setAbortController, outOfCredits, setOutOfCredits } = useAppContext();
  const [existingJDId, setExistingJDId] = useState("");
  const [isEditing, setIsEditing] = useState({ isEdit: false, editIndex: -1 });
  const { tourBotRef, availableCreditsRef } = useTourContext();

  const [generatedWorkExperience, setGeneratedWorkExperience] = useState<
    string[]
  >([]);

  useEffect(() => {
    return (() => {
      abortController?.abort();
      setAbortController(new AbortController())
    });
  }, []);
  const handleClick = (experienceIndex: any) => {
    setIsEditing({ isEdit: true, editIndex: experienceIndex });
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

  const deleteExperience = async (experienceIndex: any) => {
    let tempText = [...generatedWorkExperience];

    tempText.splice(experienceIndex, 1);

    const jdObj = {
      jobDescriptionId: existingJDId,
      email: userData?.email,
    };

    await saveToDB(jdObj, tempText);

    const JDResponse = await axios.get(
      "/api/linkedInBots/jdGeneratorSingle/getAllJD",{signal: abortController?.signal}
    );
    const updatedObject = {
      ...userData,
      linkedInJobDescriptions: JDResponse.data.result.linkedInJobDescriptions,
    };
    dispatch(setUserData({ ...userData, ...updatedObject }));
    dispatch(
      setLinkedInJobDescription({ ...linkedinJD, jobDescriptionText: tempText })
    );
    setIsEditing({ editIndex: -1, isEdit: false });
    showSuccessToast("Deleted Successfully");
  };
  const handleSave = async (experienceIndex: any) => {
    let tempText = [...generatedWorkExperience];
    let _linkedinJDText = "";
    if (componentRef.current) {
      const editorElement = componentRef.current.querySelector("#editor");
      if (editorElement) {
        _linkedinJDText = editorElement.innerHTML;
        editorElement.innerHTML = "";
      }
    }
    tempText[experienceIndex] = _linkedinJDText;

    const jdObj = {
      jobDescriptionId: existingJDId,
      email: userData?.email,
    };

    await saveToDB(jdObj, tempText);

    const JDResponse = await axios.get(
      "/api/linkedInBots/jdGeneratorSingle/getAllJD",{signal: abortController?.signal}
    );
    const updatedObject = {
      ...userData,
      linkedInJobDescriptions: JDResponse.data.result.linkedInJobDescriptions,
    };
    dispatch(setUserData({ ...userData, ...updatedObject }));
    dispatch(
      setLinkedInJobDescription({ ...linkedinJD, jobDescriptionText: tempText })
    );
    setIsEditing({ editIndex: -1, isEdit: false });
    showSuccessToast("Saved Successfully");
  };

  useEffect(() => {
    if (isEditing.isEdit) {
      if (componentRef.current) {
        const editorElement: HTMLDivElement | null = componentRef.current.querySelector("#editor");
        if (editorElement) {
          editorElement.innerHTML =
            linkedinJD.jobDescriptionText[isEditing.editIndex];
          editorElement.focus(); // Focus on the editable area
        }
      }
    }
  }, [isEditing]);

  useEffect(() => {
    if (outOfCredits) {
      setTimeout(() => {
        tourBotRef?.current?.click();
      }, 500);
    }
  }, [outOfCredits]);
  const copyJD = async (text: string) => {
    try {
      const jD_Data = htmlToPlainText(text);
      await copy(jD_Data);
    } catch (error) {
      console.error("Failed to copy text: ", error);
    }
  };
  // Redux
  const dispatch = useDispatch();
  let userData = useSelector((state: RootState) => state.userData);
  const linkedinJD = useSelector((state: RootState) => state.linkedinJobDesc);
  const { getUserDataIfNotExists: getUserData } = useGetUserData(); //using hook function with different name/alias

  useEffect(() => {
    setExistingJDId(linkedinJD.id);
    setGeneratedWorkExperience(linkedinJD.jobDescriptionText);
  }, [linkedinJD.jobDescriptionText]);

  const workExperienceGenerator = async (experienceIndex: any) => {
    if(userData.experience){

      let experience = userData.experience[experienceIndex];
      let tempText = [...generatedWorkExperience];
      let singleGenerated = "";
      tempText[experienceIndex] = singleGenerated;
      setGeneratedWorkExperience(tempText);
      let html = "";
      html += `<h2 class="text-base font-bold leading-8 hover:shadow-md hover:cursor-text hover:bg-gray-100">${experience?.jobTitle}</h2>`;
      html += `<h3 class="text-base font-semibold">${experience?.company} | ${experience?.cityState} ${experience?.country}</h3>`;
      html += `<p class="text-sm font-semibold">${experience?.fromMonth} ${
        experience?.fromYear
      } to ${
        experience?.isContinue
          ? "Present"
          : experience?.toMonth + " " + experience?.toYear
      }</p>`;
      html += `<br/><div>`;
  
      singleGenerated += html;
      setMsgLoading(true);
      const jobDescriptionId = makeid();
      const obj = {
        jobDescriptionId: jobDescriptionId,
        personName: userData.firstName + " " + userData.lastName,
        creditsUsed: creditLimits.linkedin_individualWorkExperience,
        email: session?.user?.email,
        trainBotData: {
          userEmail: userData.email,
          fileAddress: userData.uploadedResume.fileName,
        },
        experience: experience,
      };
      const res = await fetch("/api/linkedInBots/jdGeneratorSingle", {
        method: "POST",
        body: JSON.stringify(obj),
        signal: abortController?.signal
      });
  
      if (res.ok && res.body) {
        tempText[experienceIndex] = singleGenerated;
        setGeneratedWorkExperience(tempText);
        setAvailableCredits(true);
  
        const reader = res.body.getReader();
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            break;
          }
          const text = new TextDecoder().decode(value);
  
          singleGenerated += text;
        }
  
        singleGenerated += `</div><br/>`;
        singleGenerated = singleGenerated.replace("```html", "");
        singleGenerated = singleGenerated.replace("```", "");
        setGeneratedWorkExperience((prevExperience) => {
          // Predefined index to insert the new item
          const newArray = [...prevExperience];
          newArray.splice(experienceIndex, 1, singleGenerated);
          return newArray;
        });
        tempText[experienceIndex] = singleGenerated;
  
        setMsgLoading(false);
        const jdObj = {
          jobDescriptionId: existingJDId,
          email: userData?.email,
        };
  
        await saveToDB(jdObj, tempText);
      }
      const JDResponse = await axios.get(
        "/api/linkedInBots/jdGeneratorSingle/getAllJD",{signal: abortController?.signal}
      );
      const updatedObject = {
        ...userData,
        linkedInJobDescriptions: JDResponse.data.result.linkedInJobDescriptions,
      };
      dispatch(setUserData({ ...userData, ...updatedObject }));
      dispatch(
        setLinkedInJobDescription({ ...linkedinJD, jobDescriptionText: tempText })
      );
      showSuccessToast("Job Description Generated Successfully");
    }
  };

  const handleGenerate = async () => {
    setGeneratedWorkExperience([]);

    await getUserDataIfNotExists();
    //change condition
    if (session?.user?.email && userData.isFetched && userData.experience) {
      // remove ids from experiences
      const experiences: any = userData.experience.map((item: WorkExperience) => {
        const { id, ...rest } = item;
        return rest;
      });

      let tempText: any = [];
      for (const [index, experience] of experiences.entries()) {
        setStreamedData("");
        let singleGenerated = "";
        let html = "";
        html += `<h2 class="text-base font-bold leading-8 hover:shadow-md hover:cursor-text hover:bg-gray-100">${experience?.jobTitle}</h2>`;
        html += `<h3 class="text-base font-semibold">${experience?.company} | ${experience?.cityState} ${experience?.country}</h3>`;
        html += `<p class="text-sm font-semibold">${experience?.fromMonth} ${
          experience?.fromYear
        } to ${
          experience?.isContinue
            ? "Present"
            : experience?.toMonth + " " + experience?.toYear
        }</p>`;
        html += `<br/><div>`;
        setStreamedData((prev) => prev + html);

        singleGenerated += html;
        setMsgLoading(true);
        const jobDescriptionId = makeid();
        const obj = {
          jobDescriptionId: jobDescriptionId,

          personName: userData.firstName + " " + userData.lastName,

          creditsUsed: creditLimits.linkedin_individualWorkExperience,
          email: session?.user?.email,
          trainBotData: {
            userEmail: userData.email,
            fileAddress: userData.uploadedResume.fileName,
          },
          experience: experience,
        };
        const res = await fetch("/api/linkedInBots/jdGeneratorSingle", {
          method: "POST",
          body: JSON.stringify(obj),
          signal: abortController?.signal
        });

        if (res.ok && res.body) {
          setAvailableCredits(true);

          const reader = res.body.getReader();
          while (true) {
            const { done, value } = await reader.read();
            if (done) {
              break;
            }
            const text = new TextDecoder().decode(value);

            setStreamedData((prev) => prev + text);
            // tempText += text;
            singleGenerated += text;
          }

          if (index === experiences.length - 1) {
            showSuccessToast("Job Description generated successfully");
          }
        } else {
          if (res.status === 429) {
            setStreamedData(" You ran out of Credits");
            showErrorToast("You ran out of Credits!");
            setOutOfCredits(true);
          } else {
            showErrorToast("Failed to generate linkedin Headline");
          }
          setMsgLoading(false);
          break;
        }

        setStreamedData((prev) => prev + `</div> <br /> `);
        setStreamedData((prev) => prev.replace("```html", ""));
        setStreamedData((prev) => prev.replace("```", ""));

        singleGenerated += `</div><br/>`;
        singleGenerated = singleGenerated.replace("```html", "");
        singleGenerated = singleGenerated.replace("```", "");
        tempText.push(singleGenerated);

        setGeneratedWorkExperience((prevExperience) => [
          ...prevExperience,
          singleGenerated,
        ]);
        setMsgLoading(false);

        if (index === experiences.length - 1) {
          setStreamedData("");
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
            signal: abortController?.signal
          }).then(async (response) => {
            const res = await response.json();
            if (res.success) {
              await saveToDB(jdObj, tempText);
            }
          }).catch(error => {});
        }
      }

      const JDResponse = await axios.get(
        "/api/linkedInBots/jdGeneratorSingle/getAllJD",{signal: abortController?.signal}
      );

      const updatedObject = {
        ...userData,
        linkedInJobDescriptions: JDResponse.data.result.linkedInJobDescriptions,
      };
      dispatch(setUserData({ ...userData, ...updatedObject }));
      dispatch(
        setLinkedInJobDescription(
          JDResponse.data.result.linkedInJobDescriptions[0]
        )
      );
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
      signal: abortController?.signal,
    });
  };

  const getUserDataIfNotExists = async () => {
    if (!userData.isLoading && !userData.isFetched) {
      try {
        await getUserData();
      } catch (err) {
        setStreamedData("Something went wrong!");
        showErrorToast("Failed to generate Linkedin Job Description");
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
        <div className=" dark:bg-[#222027] dark:text-gray-50 bg-[#ffffff94] md:justify-between text-gray-950 p-5 sm:p-8 flex flex-col md:flex-row md:align-center xs:gap-3 justify-center items-center rounded-lg">
          <div className="hidden aspect-square rounded-full bg-gradient-to-b from-[#255CE7] to-[#7FA0E0] md:flex justify-center items-center w-16 h-16">
            <Image alt="Svg1" src={Svg1} width={24} height={24} />
          </div>
          <div className="flex flex-col w-full gap-2 p-2 ml-2 md:w-10/12">
            <div className="flex flex-row items-center gap-4 xs:justify-between sm:justify-between md:justify-start">
              <h1 className="text-sm font-semibold md:text-base dark:text-gray-100 text-gray-950">
                Job Description Generator
              </h1>
            </div>

            <p className="text-xs md:text-sm text-[#959595]">
              Transform your existing work experience into an impactful
              narrative that highlights your key achievements.
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
                ) : (
                  newViewIcon
                )}
              </span>
              <span className="text-xs font-semibold md:text-sm ">
                {msgLoading ? "Generating..." : "Generate"}
              </span>
            </div>
            {/* <span className="dark:text-gray-100 text-gray-950 text-[15px] font-semibold">
              {msgLoading ? (
                <div
                // className="bg-gradient-to-r  from-[#B324D7] to-[#615DFF] flex md:w-44 flex-row justify-center items-center gap-2 rounded-full md:px-[5px] px-[20px] py-[12px] md:ml-auto"
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
                // className="bg-gradient-to-r hover:from-purple-800 hover:to-pink-600 from-[#B324D7] to-[#615DFF] flex md:w-52 flex-row justify-center items-center gap-2 rounded-full md:px-[5px] px-[32px] py-[12px] md:ml-auto"
                >
                  <span className="text-white ml-3 text-[15px] font-semibold whitespace-nowrap">
                    Generate Description
                  </span>
                </div>
              )}
            </span> */}
          </button>
        </div>
        {(generatedWorkExperience?.length > 0 || streamedData !== "") && (
          <div className=" bg-white text-gray-900 mb-4 border-gray-500  rounded border-[1px] md:p-8">
            <h1 className="mb-4 text-4xl font-bold text-gray-900">
              <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                AI Response{" "}
              </span>
            </h1>
            <div className="ml-2 font-sansbreak-words">
              <div className="font-sans text-gray-950" ref={componentRef}>
                {generatedWorkExperience?.map((workExperience, index) => {
                  return (
                    <>
                      {workExperience === "" ? (
                        <div className="text-center">
                          <div role="status">
                            <Loader />
                          </div>
                        </div>
                      ) : (
                        <Toolbar
                          key={index}
                          regenrateAchivements={() =>
                            workExperienceGenerator(index)
                          }
                          deleteExperience={() => deleteExperience(index)}
                          editWorkExperience={() => handleClick(index)}
                          copyToClipBoard={() => copyJD(workExperience)}
                        >
                          {isEditing.isEdit && isEditing.editIndex === index ? (
                            <div
                              id="editor"
                              contentEditable={isEditing.isEdit}
                              className=" text-gray-950 border-[#312E37] text-justify border-[1px] rounded-[8px]  sm:p-[10px] "
                              onBlur={() => {
                                setIsEditing({ ...isEditing, isEdit: false });
                                handleSave(index);
                              }}
                            ></div>
                          ) : (
                            <div
                              className="list-disc border-2 border-transparent hover:border-dashed hover:border-gray-500 text-gray-950"
                              dangerouslySetInnerHTML={{
                                __html: workExperience,
                              }}
                            ></div>
                          )}
                        </Toolbar>
                      )}
                    </>
                  );
                })}
              </div>
              {streamedData !== "" && (
                <div className="ml-2 text-justify font-sansbreak-words">
                  <div
                    className="list-disc"
                    dangerouslySetInnerHTML={{ __html: streamedData }}
                  ></div>
                </div>
              )}
            </div>
            <div className="px-2 mt-4 xs:mb-1 md:mb-0">
              <DownloadService
                componentRef={componentRef}
                type="onPage"
                fileName="Linkedin-Job-Descriptions"
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
        {outOfCredits && (
          <TourBot config={tourBotConfig2} />
        )}
      </>
    </>
  );
};

export default SubJDGenerator;
