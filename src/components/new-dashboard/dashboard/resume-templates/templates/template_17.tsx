"use client";
import { memo, useEffect, useState } from "react";
import { Education } from "@/store/userDataSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { setField } from "@/store/resumeSlice";
import {
  contactIcon,
  crossIcon1,
  educationIcon,
  emailIcon,
  linkedInIcon,
  newLinkedInIcon,
  phoneIcon,
  sparkleIcon,
} from "@/helpers/iconsProvider";
import useGetSummary from "@/hooks/useGetSummary";
import EditableField from "@/components/new-dashboard/common/EditableField";
import useSingleJDGenerate from "@/hooks/useSingleJDGenerate";
import useSaveResumeToDB from "@/hooks/useSaveToDB";
import Toolbar from "@/components/new-dashboard/common/Toolbar";
import useDragAndDrop from "@/hooks/useDragAndDrop";
import useGetPrimarySkills from "@/hooks/useGetPrimarySkills";
import useAddPrimarySkill from "@/hooks/useAddPrimarySkill";
import useUpdateAndSave from "@/hooks/useUpdateAndSave";
import useHandler from "@/hooks/useHandler";
const ResumeTemplate17 = () => {
  const dispatch = useDispatch();
  const resume = useSelector((state: any) => state.resume);
  const [newPrimarySkill, setNewPrimarySkill] = useState(false);
  const [newSecondarySkill, setNewSecondarySkill] = useState(false);
  const [newProfessionalSkill, setNewProfessionalSkill] = useState(false);
  const [newWorkExperience, setNewWorkExperience] = useState<number>();
  const [newAchievement, setNewAchievement] = useState("");
  const [newEducation, setNewEducation] = useState(false);
  const [primarySkillAddButtonVisible, setPrimarySkillAddButtonVisible] =
    useState(false);
  const [secondarySkillAddButtonVisible, setSecondarySkillAddButtonVisible] =
    useState(false);

  const { handleDropPrimary, handleDropAchievement, handleDropExperience } =
    useDragAndDrop();

  const [streamedSummaryData, setStreamedSummaryData] = useState("");

  const { getSummary } = useGetSummary(setStreamedSummaryData);
  const [streamedJDData, setStreamedJDData] = useState<any>("");
  const { getOneWorkExperienceNew } = useSingleJDGenerate(setStreamedJDData);
  const { saveResumeToDB } = useSaveResumeToDB();

  const [
    professionalSkillAddButtonVisible,
    setProfessionalSkillAddButtonVisible,
  ] = useState(false);
  const [workExperienceAddButtonVisible, setWorkExperienceAddButtonVisible] =
    useState<number>();
  const [educationAddButtonVisible, setEducationAddButtonVisible] =
    useState(false);
  const [primarySkill, setPrimarySkill] = useState<string>("");
  const [secondarySkill, setSecondarySkill] = useState<string>("");
  const [professionalSkill, setProfessionalSkill] = useState<string>("");

  const [regenerating, setRegenerating] = useState(false);
  const { getPrimarySkills } = useGetPrimarySkills(setRegenerating);

  const [regeneratedRecordIndex, setRegeneratedRecordIndex] = useState<
    number | null
  >(null);

  const [insideIndex, setInsideIndex] = useState<number>(0);
  const { addPrimarySkill } = useAddPrimarySkill();
  const { updateSaveHook } = useUpdateAndSave();
  const { handlers } = useHandler();

  useEffect(() => {
    if (streamedJDData === "") {
      setRegeneratedRecordIndex(null);
    }
  }, [streamedJDData]);

  // handle regenrate
  const handleRegenrate = (rec: any, i: number) => {
    getOneWorkExperienceNew(rec);
    setRegeneratedRecordIndex(i);
  };

  //add Skills
  const handleAddSkills = () => {
    setNewPrimarySkill(true);
  };

  //save skills
  const handleSaveSkills = () => {
    if (primarySkill.trim() !== "") {
      addPrimarySkill(primarySkill);
      setPrimarySkill("");
    }
  };

  return (
    <div className="w-full first-page relative text-gray-900">
      <div className="flex">
        <div className=" w-[35%] md:w-1/3 flex flex-col  items-center  bg-[#323b4c] px-9 xs:px-2 md:px-4   pt-[2rem] h-[1200px] xs:h-auto ">
          <div className="border-[.5rem] border-[#ae9243]   text-gray-800 bg-[#ae9243]  text-center flex justify-center items-center  rounded-full ">
            <div className=" w-44 h-44 xs:w-20 xs:h-20 md:w-44 md:h-44 border-[.5rem] border-[#323b4c]   text-gray-800 bg-[#ae9243]  text-center flex justify-center items-center  rounded-full ">
              <div className=" w-40 h-40 xs:w-16 xs:h-16 md:w-40 md:h-40 text-[#F1F1F1] flex justify-center items-center bg-[#ae9243]  rounded-full ">
                <span className="text-4xl text-bold hover:shadow-md hover:text-black hover:bg-gray-100">
                  <EditableField
                    value={resume?.shortName ? resume?.shortName : "CPH"}
                    style={{ width: "60px" }}
                    onSave={(value: string) => {
                      dispatch(setField({ name: "shortName", value: value }));
                      saveResumeToDB({ ...resume, shortName: value });
                    }}
                  />
                </span>
              </div>
            </div>
          </div>

          {/* contacts */}
          <span className="border-stylee w-full h-0 my-3"></span>
          <h3 className="uppercase text-lg xs:text-[14px] md:text-lg font-semibold w-full  border-b-2 border-white pb-2 text-white  py-1 rounded-sm flex items-center  flex-row gap-2 ">
            Contact
          </h3>
          <span className="border-stylee w-full h-0 my-3"></span>
          <ul className=" flex flex-col gap-3 w-full mb-4 text-[16px] text-gray-300 break-all pl-0">
            <li className="hover:shadow-md group hover:text-black hover:bg-gray-100 text-gray-300 flex flex-row gap-3  items-center ">
              {phoneIcon}
              <EditableField
                value={
                  resume?.contact?.phone
                    ? resume?.contact?.phone
                    : "(555) 555-1234"
                }
                onSave={(value: string) => {
                  if (value !== resume?.contact?.phone) {
                    updateSaveHook.updateAndSaveBasicInfo({ phone: value });
                  }
                }}
              />
            </li>
            <li className="hover:shadow-md hover:text-black hover:bg-gray-100 flex flex-row gap-3  items-center ">
              {emailIcon}

              <EditableField
                value={
                  resume?.contact?.email
                    ? resume?.contact?.email
                    : "your@email.com"
                }
                onSave={(value: string) => {
                  if (value !== resume?.contact?.email) {
                    updateSaveHook.updateAndSaveBasicInfo({ email: value });
                  }
                }}
              />
            </li>
            <li className="hover:shadow-md group hover:text-black hover:bg-gray-100 text-gray-300 flex flex-row gap-2  items-center ">
              {/* <a
                href={
                  resume?.contact?.linkedIn
                    ? resume?.contact?.linkedIn
                    : "https://www.linkedin.com/"
                }
                target="_blank"
                className="text-blue-600"
              > */}
              <svg
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="0.8"
                width="24"
                height="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.5 18.4C14.4153 18.4 18.4 14.4153 18.4 9.5C18.4 4.58467 14.4153 0.6 9.5 0.6C4.58467 0.6 0.6 4.58467 0.6 9.5C0.6 14.4153 4.58467 18.4 9.5 18.4Z" />
                <path
                  d="M5.83889 13V7.54545H6.47454V13H5.83889ZM6.16204 6.60795C6.03183 6.60795 5.92056 6.56416 5.82823 6.47656C5.7359 6.3866 5.68974 6.27888 5.68974 6.15341C5.68974 6.02794 5.7359 5.9214 5.82823 5.83381C5.92056 5.74384 6.03183 5.69886 6.16204 5.69886C6.29225 5.69886 6.40352 5.74384 6.49585 5.83381C6.58817 5.9214 6.63434 6.02794 6.63434 6.15341C6.63434 6.27888 6.58817 6.3866 6.49585 6.47656C6.40352 6.56416 6.29225 6.60795 6.16204 6.60795ZM9.67834 9.59091V13H9.04624V7.54545H9.66058V8.40128H9.7174C9.84524 8.12192 10.0441 7.8982 10.314 7.73011C10.5862 7.55966 10.9224 7.47443 11.3225 7.47443C11.6895 7.47443 12.0114 7.55137 12.2884 7.70526C12.5678 7.85677 12.7844 8.08049 12.9383 8.37642C13.0945 8.67235 13.1727 9.03575 13.1727 9.46662V13H12.5406V9.50568C12.5406 9.05824 12.4151 8.70431 12.1641 8.44389C11.9156 8.18348 11.5817 8.05327 11.1627 8.05327C10.8763 8.05327 10.6218 8.11482 10.3992 8.23793C10.1767 8.36103 10.0003 8.53859 9.8701 8.7706C9.74226 9.00024 9.67834 9.27367 9.67834 9.59091Z"
                  fill="black"
                />
              </svg>

              <EditableField
                value={
                  resume?.contact?.linkedIn
                    ? resume?.contact?.linkedIn
                    : "https://www.linkedin.com/"
                }
                onSave={(value: string) => {
                  if (value !== resume.contact.linkedIn) {
                    updateSaveHook.updateAndSaveBasicInfo({ linkedIn: value });
                  }
                }}
              />
              {/* </a> */}
            </li>
          </ul>
          {/* Skills */}
          {resume?.primarySkills && resume?.primarySkills.length > 0 && (
            <>
              <span className="border-stylee w-full h-0  my-1"></span>
              <h3 className="uppercase text-lg xs:text-[14px] md:text-lg font-semibold w-full  border-b-2 border-white pb-2 text-white  py-1 rounded-sm flex items-center  flex-row gap-2 ">
                Skills
              </h3>
              <span className="border-stylee w-full h-0  my-3"></span>
              {resume?.primarySkills &&
              resume?.primarySkills.length > 0 &&
              !regenerating ? (
                <Toolbar
                  addSkill={handleAddSkills}
                  regenerateSkills={getPrimarySkills}
                >
                  <ul
                    className="pl-0 flex  flex-col gap-1 mb-4 text-gray-300 w-full text-[16px] "
                    onMouseEnter={() =>
                      !newPrimarySkill && setPrimarySkillAddButtonVisible(true)
                    }
                    onMouseLeave={() =>
                      !newPrimarySkill && setPrimarySkillAddButtonVisible(false)
                    }
                  >
                    {resume?.primarySkills.map((skill: string, i: number) => (
                      <li
                        className="hover:shadow-md hover:cursor-move parent xs:w-12/12 hover:text-black hover:border-dashed hover:border-gray-500 hover:border  hover:bg-gray-100 border-transparent border-[1px] flex items-center  "
                        key={i}
                        onDragStart={(e) =>
                          e.dataTransfer.setData("text/plain", i.toString())
                        }
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => handleDropPrimary(e, i)}
                        draggable
                      >
                        <span className="w-1.5 h-1.5 bg-gray-300 rounded-full xs:hidden flex md:flex mr-3"></span>
                        <div className="flex flex-row w-full items-center justify-between">
                          <EditableField
                            value={skill}
                            onSave={(value: string) => {
                              handlers.handleUpdateSkill(value, i);
                            }}
                          />
                          <div
                            onClick={() => handlers.handleDeleteSkill(i)}
                            className="w-4 h-4  cursor-pointer child"
                          >
                            {crossIcon1}
                          </div>
                        </div>
                      </li>
                    ))}
                    {newPrimarySkill ? (
                      <>
                        <div className="w-full rounded-2xl border-[1px] border-black flex h-9.5">
                          <input
                            type="text"
                            value={primarySkill}
                            placeholder="Please add Skill"
                            className="bg-white outline-none rounded-2xl px-2 w-full"
                            autoFocus
                            onChange={(e) => setPrimarySkill(e.target.value)}
                            onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                if (primarySkill.trim() !== "") {
                                  addPrimarySkill(primarySkill);
                                  setPrimarySkill("");
                                }
                              }
                            }}
                          />
                          <button
                            className="bg-green-500 uppercase h-9 px-2 text-white rounded-r-2xl"
                            onClick={() => {
                              if (primarySkill.trim() !== "") {
                                addPrimarySkill(primarySkill);
                                setPrimarySkill(""); // Empty the input field
                              }
                            }}
                          >
                            save
                          </button>
                        </div>
                        <button
                          onClick={() => {
                            setNewPrimarySkill(false);
                            setPrimarySkillAddButtonVisible(false);
                          }}
                          className="bg-red-500 py-1 px-2 text-white rounded-full"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      " "
                    )}
                    {primarySkillAddButtonVisible ? (
                      <div
                        className="border-2 w-1/2 xs:w-full justify-center xs:mt-10 flex md:w-1/2 border-gray-400 text-center uppercase text-gray-500 cursor-pointer rounded-full py-1 px-4 hover:bg-gray-400 hover:text-white transition duration-300 ease-in-out"
                        onClick={() => {
                          setNewPrimarySkill(true);
                          setPrimarySkillAddButtonVisible(false);
                        }}
                      >
                        + Add
                      </div>
                    ) : null}
                  </ul>
                </Toolbar>
              ) : (
                <div className="text-center">
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-pink-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        <div className="w-full flex flex-col xs:mt-36 md:mt-1 px-4 md:px-8 pt-[1rem] xs:pt-[10rem] md:pt-[2rem] ">
          {/* Executive Summary */}
          <div className="flex ">
            <div className="flex flex-col  py-8">
              <h2 className="text-4xl md:text-4xl  font-bold hover:shadow-md hover:bg-gray-100">
                <EditableField
                  value={resume?.name ? resume?.name : "FULL NAME"}
                  style={{ width: "fit-content" }}
                  onSave={(value: string) => {
                    if (value !== resume?.name) {
                      updateSaveHook.updateAndSaveName(value);
                    }
                  }}
                />
              </h2>
              <h3 className="text-xl md:text-xl  hover:shadow-md mt-2 hover:bg-gray-100">
                <EditableField
                  value={resume?.jobTitle ? resume?.jobTitle : "JOB TITLE"}
                  onSave={(value: string) => {
                    if (value !== resume?.jobTitle) {
                      updateSaveHook.updateAndSaveJobTitle(value);
                    }
                  }}
                />
              </h3>
            </div>
          </div>
          <span className="border-stylee w-full h-0 my-1 xs:my-0 md:my-1"></span>
          <h3 className="uppercase text-xl xs:text-lg  font-semibold border-[#444440] border-b-2  rounded-sm text-gray-900 w-full py-1">
            EXECUTIVE SUMMARY
          </h3>
          <span className="border-stylee w-full h-0  my-3"></span>
          <Toolbar regenrateSummary={getSummary}>
            <div className="text-[16px] hover:shadow-md min-h-[450px] xs:min-h-fit hover:bg-gray-100 group-hover:pb-14">
              <EditableField
                type="textarea"
                value={
                  resume?.summary !== "" ? (
                    resume?.summary
                  ) : streamedSummaryData ? (
                    streamedSummaryData
                  ) : (
                    <div className="text-center">
                      <div role="status">
                        <svg
                          aria-hidden="true"
                          className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-pink-600"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  )
                }
                onSave={(value: string) => {
                  updateSaveHook.updateAndSaveSummary(value);
                }}
              />
            </div>
          </Toolbar>

          {/* Work Experience */}
          <span
            className="border-stylee w-full h-0 
           my-3"
          ></span>
          <h3 className="uppercase text-lg font-semibold border-[#444440] border-b-2  rounded-sm text-gray-900 w-full py-1">
            WORK EXPERIENCE
          </h3>
          <span
            className="border-stylee w-full h-0 
           my-3"
          ></span>

          {resume?.workExperienceArray &&
          resume?.workExperienceArray.length > 0 ? (
            <>
              {resume?.workExperienceArray.map((rec: any, i: number) => {
                return (
                  <Toolbar
                    key={i}
                    addAchivement={() => setNewWorkExperience(i)}
                    regenrateAchivements={() => handleRegenrate(rec, i)}
                    addNewLine={() => {
                      handlers.handleAddSpace(i, newAchievement);
                      setNewAchievement("");
                    }}
                  >
                    <div
                      key={i}
                      className={`flex justify-start items-start ${
                        i > 0
                          ? "w-[100vw] ml-[-200px] xs:ml-0 xs:w-full "
                          : "min-h-[470px] xs:min-h-fit "
                      }`}
                    >
                      <div
                        key={i}
                        className="hover:border-dashed hover:border-gray-500  border-transparent border-2 hover:cursor-move hover:border-2"
                        onMouseEnter={() =>
                          setWorkExperienceAddButtonVisible(i)
                        }
                        onMouseLeave={() =>
                          setWorkExperienceAddButtonVisible(-1)
                        }
                        onDragStart={(e) =>
                          e.dataTransfer.setData("text/plain", i.toString())
                        }
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => handleDropExperience(e, i)}
                        draggable
                      >
                        <div className="flex flex-col">
                          {/* <div className="flex ">
                        <span className="w-4 h-4 bg-[#745237] rounded-full"></span>
                        <span className="h-13 border-[1px] border-[#745237] mx-2 relative -left-[17px]"></span>
                      </div> */}

                          <h2
                            className="hover:shadow-md hover:cursor-text hover:bg-gray-100"
                            style={{
                              fontSize: "1rem",
                              fontWeight: "bold",
                            }}
                          >
                            <EditableField
                              value={rec?.title}
                              style={{ width: "100%" }}
                              onSave={(value: string) => {
                                handlers.handleSaveExperienceDetail(
                                  { title: value },
                                  i
                                );
                              }}
                            />
                          </h2>
                          <h2 className="hover:cursor-default text-sm ">
                            {rec?.fromMonth + " " + rec?.fromYear} -{" "}
                            {rec?.isContinue
                              ? "Present"
                              : `${rec?.toMonth} ${rec?.toYear}`}{" "}
                            |{" "}
                            <span className="hover:shadow-md hover:cursor-text hover:bg-gray-100">
                              <EditableField
                                value={rec?.company}
                                onSave={(value: string) => {
                                  handlers.handleSaveExperienceDetail(
                                    { company: value },
                                    i
                                  );
                                }}
                              />
                            </span>{" "}
                            |{" "}
                            <span className="hover:shadow-md hover:bg-gray-100">
                              <EditableField
                                value={rec?.cityState}
                                onSave={(value: string) => {
                                  handlers.handleSaveExperienceDetail(
                                    { cityState: value },
                                    i
                                  );
                                }}
                              />
                            </span>{" "}
                            <span className="hover:shadow-md hover:bg-gray-100">
                              <EditableField
                                value={rec?.country}
                                onSave={(value: string) => {
                                  handlers.handleSaveExperienceDetail(
                                    { country: value },
                                    i
                                  );
                                }}
                              />
                            </span>
                          </h2>
                        </div>
                        <div className="p-4">
                          {rec?.achievements && i !== regeneratedRecordIndex ? (
                            <ul className="pl-0 flex flex-col gap-1 text-[16px]">
                              {rec?.achievements.map(
                                (achievement: any, ind: number) =>
                                  achievement === "" ? (
                                    <li
                                      key={ind}
                                      onDragStart={(e) => {
                                        setInsideIndex(ind);
                                      }}
                                      onDragOver={(e) => e.preventDefault()}
                                      onDrop={(e) => {
                                        handleDropAchievement(
                                          i,
                                          ind,
                                          insideIndex
                                        );
                                      }}
                                      draggable
                                      className="h-8 hover:bg-slate-200 group flex flex-row justify-center items-center"
                                    >
                                      <div
                                        className="group-hover:block hidden font-medium text-xs uppercase   text-gray-500 cursor-pointer"
                                        onClick={() => {
                                          handlers.handleRemoveExtraSpace(
                                            i,
                                            ind
                                          );
                                        }}
                                      >
                                        Remove This Extra Space
                                      </div>
                                    </li>
                                  ) : (
                                    <li
                                      onDragStart={(e) => {
                                        setInsideIndex(ind);
                                      }}
                                      onDragOver={(e) => e.preventDefault()}
                                      onDrop={(e) => {
                                        handleDropAchievement(
                                          i,
                                          ind,
                                          insideIndex
                                        );
                                      }}
                                      draggable
                                      className="list-disc hover:border-dashed hover:cursor-move hover:border-gray-500 border-[1px] hover:border-[1px] border-transparent hover:shadow-md relative parent hover:bg-gray-100"
                                      key={ind}
                                    >
                                      <EditableField
                                        type="textarea"
                                        rows={2}
                                        value={achievement}
                                        onSave={(value: string) => {
                                          handlers.handleUpdateAchivement(
                                            i,
                                            ind,
                                            value
                                          );
                                        }}
                                      />
                                      <div
                                        onClick={() =>
                                          handlers.handleDeleteAchivement(
                                            i,
                                            ind
                                          )
                                        }
                                        className="w-4 h-4 absolute right-0.5 top-0.5 text-red-500 cursor-pointer child"
                                      >
                                        {crossIcon1}
                                      </div>
                                    </li>
                                  )
                              )}
                            </ul>
                          ) : streamedJDData ? (
                            <div
                              dangerouslySetInnerHTML={{
                                __html: streamedJDData,
                              }}
                            ></div>
                          ) : (
                            <div className="text-center">
                              <div role="status">
                                <svg
                                  aria-hidden="true"
                                  className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-pink-600"
                                  viewBox="0 0 100 101"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor"
                                  />
                                  <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentFill"
                                  />
                                </svg>
                                <span className="sr-only">Loading...</span>
                              </div>
                            </div>
                          )}

                          {newWorkExperience === i ? (
                            <>
                              <div className="w-full gap-1 rounded-md flex flex-wrap h-9.5">
                                <textarea
                                  className="w-full md:w-9/12 rounded-l-md border-2  text bg-transparent p-2" // Apply Tailwind CSS classes
                                  onChange={(e) =>
                                    setNewAchievement(e.target.value)
                                  }
                                  value={newAchievement}
                                  rows={1}
                                  cols={1}
                                  name="newAchievement"
                                  id="newAchievement"
                                  autoComplete="off"
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                      e.preventDefault(); // Prevent the default Enter key behavior (typically adding a new line)
                                      // Save the new achievement to the state and possibly the database
                                      handlers.handleAddAchivement(
                                        i,
                                        newAchievement
                                      );
                                      setNewAchievement("");
                                    }
                                  }}
                                />
                                <button
                                  className="bg-green-500 w-full md:w-2/12 uppercase h-9 px-2 text-white rounded-r-md"
                                  onClick={() => {
                                    // Save the new achievement to the state and possibly the database
                                    handlers.handleAddAchivement(
                                      i,
                                      newAchievement
                                    );
                                    setNewAchievement("");
                                  }}
                                >
                                  Save
                                </button>
                              </div>
                              <button
                                onClick={() => {
                                  setNewAchievement("");
                                  setNewWorkExperience(-1);
                                  setWorkExperienceAddButtonVisible(-1);
                                }}
                                className="bg-red-500 w-full md:w-2/12 py-1 px-2 mt-2 text-white rounded-full"
                              >
                                Cancel
                              </button>
                            </>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </Toolbar>
                );
              })}
            </>
          ) : (
            <div
              className="list-disc "
              dangerouslySetInnerHTML={{
                __html:
                  resume?.workExperience !== ""
                    ? resume?.workExperience
                    : streamedJDData,
              }}
            ></div>
          )}
          {/* education */}
          {resume?.education.length > 0 && (
            <div className="ml-[-200px] xs:ml-0">
              <span className="border-stylee w-full h-0  my-3"></span>
              <h3 className="uppercase text-lg flex items-center gap-2 font-semibold border-[#444440] border-b-2  rounded-sm text-gray-900 w-full py-1">
                education
              </h3>
              <span className="border-stylee w-full h-0 my-3"></span>
              <ul
                className="pl-0 flex flex-row xs:flex-col pt-2 md:flex-row lg:flex-row flex-wrap text-gray-800  w-full"
                onMouseEnter={() =>
                  !newEducation && setEducationAddButtonVisible(true)
                }
                onMouseLeave={() =>
                  !newEducation && setEducationAddButtonVisible(false)
                }
              >
                {resume?.education.map((education: Education, ind: number) => (
                  <React.Fragment key={education?.id || ind}>
                    <div className=" md:m-2 w-[30%] xs:w-full md:w-[30%] lg:w-[30%] ">
                      <li
                        className=" hover:shadow-md hover:cursor-move border-transparent border-2 
                  parent hover:border-dashed hover:border-gray-500 hover:border-2 
                   hover:bg-gray-100 font-bold  hover:text-black flex uppercase text-[16px]   items-center "
                      >
                        <div className="flex flex-row w-full items-center justify-between">
                          <EditableField
                            type="textarea"
                            rows={2}
                            value={education?.educationLevel}
                            onSave={(value: string) => {
                              handlers.handleSaveEductionDetail(
                                { educationLevel: value },
                                ind
                              );
                            }}
                          />
                          <div
                            onClick={() =>
                              handlers.handleDeleteEductionDetail(ind)
                            }
                            className="w-4 h-4  cursor-pointer child"
                          >
                            {crossIcon1}
                          </div>
                        </div>
                      </li>
                      <li className="hover:shadow-md font-medium hover:text-black text-gray-800 hover:tet-black hover:bg-gray-100 text-[15px]">
                        <EditableField
                          value={`${education?.fieldOfStudy}`}
                          style={{ width: "100%" }}
                          onSave={(value: string) => {
                            handlers.handleSaveEductionDetail(
                              { fieldOfStudy: value },
                              ind
                            );
                          }}
                        />{" "}
                      </li>
                      <li className="hover:shadow-md italic text-gray-800 hover:text-black hover:bg-gray-100 text-sm ">
                        <EditableField
                          type="textarea"
                          rows={2}
                          value={`${education?.schoolName}`}
                          onSave={(value: string) => {
                            handlers.handleSaveEductionDetail(
                              { schoolName: value },
                              ind
                            );
                          }}
                        />
                      </li>
                      <li className="mb-4 text-xs text-gray-800 italic">
                        {education?.fromMonth + " " + education.fromYear} -{" "}
                        {education?.isContinue
                          ? "Present"
                          : education?.toMonth + " " + education.toYear}
                      </li>
                    </div>
                  </React.Fragment>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default memo(ResumeTemplate17);
