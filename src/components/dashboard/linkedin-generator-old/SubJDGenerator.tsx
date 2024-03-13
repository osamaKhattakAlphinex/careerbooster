"use client";
import Image from "next/image";
import Svg1 from "@/../public/icon/headline-icon.svg";
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { WorkExperience, setUserData } from "@/store/userDataSlice";
import axios from "axios";
import buttonIconSrc from "@/../public/icon/u_bolt-alt.svg";
import { htmlToPlainText } from "@/helpers/HtmlToPlainText";
import copy from "clipboard-copy";
import PreviouslyGeneratedList from "@/components/dashboard/PreviouslyGeneratedList";
import LinkedInJDCardSingle from "./LinkedInJDCardSingle";
import { makeid } from "@/helpers/makeid";
import useGetUserData from "@/hooks/useGetUserData";
import { useAppContext } from "@/context/AppContext";
import { showSuccessToast, showErrorToast } from "@/helpers/toast";
import Toolbar from "../Toolbar";
import Loader from "@/components/common/Loader";
import { setLinkedInJobDescription } from "@/store/linkedInJobDescriptionSlice";

const SubJDGenerator = () => {
  const componentRef = useRef<any>(null);
  const creditLimits = useSelector((state: any) => state.creditLimits);
  const [msgLoading, setMsgLoading] = useState<boolean>(false); // msg loading
  const { data: session } = useSession();
  const [streamedData, setStreamedData] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const { setAvailableCredits } = useAppContext();
  const [existingJDId, setExistingJDId] = useState("");
  const [generatedWorkExperience, setGeneratedWorkExperience] = useState<
    string[]
  >([]);

  const copyJD = async (text: string) => {
    try {
      const jD_Data = await htmlToPlainText(text);
      await copy(jD_Data);
    } catch (error) {
      console.error("Failed to copy text: ", error);
    }
  };
  // Redux
  const dispatch = useDispatch();
  let userData = useSelector((state: any) => state.userData);
  const linkedinJD = useSelector((state: any) => state.linkedinJobDesc);
  const { getUserDataIfNotExists: getUserData } = useGetUserData(); //using hook function with different name/alias

  useEffect(() => {
    if (streamedData === "") {
      setExistingJDId(linkedinJD.id);
      setGeneratedWorkExperience(linkedinJD.jobDescriptionText);
    }
  }, [userData]);

  useEffect(() => {
    setExistingJDId(linkedinJD.id);
    setGeneratedWorkExperience(linkedinJD.jobDescriptionText);
  }, [linkedinJD.jobDescriptionText]);

  const workExperienceGenerator = async (experienceIndex: any) => {
    let experience = userData.experience[experienceIndex];
    let tempText = [...generatedWorkExperience];
    let singleGenerated = "";
    tempText[experienceIndex] = singleGenerated;
    setGeneratedWorkExperience(tempText)
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
    const obj: any = {
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
    const res: any = await fetch("/api/linkedInBots/jdGeneratorSingle", {
      method: "POST",
      body: JSON.stringify(obj),
    });

    if (res.ok) {
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
      "/api/linkedInBots/jdGeneratorSingle/getAllJD"
    );
    const updatedObject = {
      ...userData,
      linkedInJobDescriptions: JDResponse.data.result.linkedInJobDescriptions,
    };
    dispatch(setUserData({ ...userData, ...updatedObject }));
    // dispatch(setLinkedInJobDescription(tempText));
  };

  const handleGenerate = async () => {
    setGeneratedWorkExperience([]);
    await getUserDataIfNotExists();
    //change condition
    if (session?.user?.email && userData.isFetched) {
      // remove ids from experiences
      const experiences = userData.experience.map((item: WorkExperience) => {
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
        const obj: any = {
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
        const res: any = await fetch("/api/linkedInBots/jdGeneratorSingle", {
          method: "POST",
          body: JSON.stringify(obj),
        });

        if (res.ok) {
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
          showErrorToast("You ran out of credits!");
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
            <div className="flex flex-row items-center gap-4 xs:justify-between sm:justify-between md:justify-start">
              <h1 className="text-[16px] dark:text-gray-100 text-gray-950 font-bold">
                Job Description Generator
              </h1>
            </div>

            <p className="text-[14px] text-[#959595] pr-5">
              Transform your existing work experience into an impactful
              narrative that highlights your key achievements.
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
                  className={` bg-gradient-to-r hover:from-purple-800 hover:to-pink-600 from-[#B324D7] to-[#615DFF] flex md:w-52 flex-row justify-center items-center gap-2 rounded-full md:px-[5px] px-[32px] py-[12px] md:ml-auto`}
                >
                  <Image
                    src={buttonIconSrc}
                    alt="bold icon"
                    height={18}
                    width={18}
                  />
                  <span className="text-white ml-3 text-[15px] font-semibold whitespace-nowrap">
                    Generate Description
                  </span>
                </div>
              )}
            </span>
          </button>
        </div>
        {(generatedWorkExperience?.length > 0 || streamedData !== "") && (
          <div className=" bg-white text-gray-900 mb-4 border-gray-500  rounded border-[1px] p-8">
            <h1 className="mb-4 text-4xl font-bold text-gray-900">
              <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                AI Response{" "}
              </span>
            </h1>
            <div className="ml-2 font-sansbreak-words">
              {generatedWorkExperience.map((workExperience, index) => {
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
                        copyToClipBoard={() => copyJD(workExperience)}
                      >
                        <div
                          className="list-disc border-2 border-transparent hover:border-dashed hover:border-gray-500"
                          dangerouslySetInnerHTML={{ __html: workExperience }}
                        ></div>
                      </Toolbar>
                    )}
                  </>
                );
              })}
              {streamedData !== "" && (
                <div
                  className="ml-2 font-sansbreak-words"
                  // style={{ textW: "auto" }}
                >
                  <div
                    className="list-disc"
                    dangerouslySetInnerHTML={{ __html: streamedData }}
                  ></div>
                </div>
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
      </>
    </>
  );
};

export default SubJDGenerator;
