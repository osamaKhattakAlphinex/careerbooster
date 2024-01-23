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
  phoneIcon,
  sparkleIcon,
} from "@/helpers/iconsProvider";
import Regenerate from "@/helpers/regenerate";
import useGetSummary from "@/hooks/useGetSummary";
import EditableField from "@/components/new-dashboard/common/EditableField";
import useSingleJDGenerate from "@/hooks/useSingleJDGenerate";
import useSaveResumeToDB from "@/hooks/useSaveToDB";
import useDragAndDrop from "@/hooks/useDragAndDrop";
import useGetPrimarySkills from "@/hooks/useGetPrimarySkills";
import useAddPrimarySkill from "@/hooks/useAddPrimarySkill";
import useUpdateAndSave from "@/hooks/useUpdateAndSave";
const ResumeTemplate4 = () => {
  const dispatch = useDispatch();
  const resume = useSelector((state: any) => state.resume);
  const [newPrimarySkill, setNewPrimarySkill] = useState(false);
  const [newWorkExperience, setNewWorkExperience] = useState<number>();
  const [newAchievement, setNewAchievement] = useState("");
  const [newEducation, setNewEducation] = useState(false);
  const [primarySkillAddButtonVisible, setPrimarySkillAddButtonVisible] =
    useState(false);

  const [regenerating, setRegenerating] = useState(false);
  const { getPrimarySkills } = useGetPrimarySkills(setRegenerating);

  const [regeneratedRecordIndex, setRegeneratedRecordIndex] = useState<
    number | null
  >(null);
  const [streamedSummaryData, setStreamedSummaryData] = useState("");
  const { getSummary } = useGetSummary(setStreamedSummaryData);
  const [streamedJDData, setStreamedJDData] = useState<any>("");
  const { getOneWorkExperienceNew } = useSingleJDGenerate(setStreamedJDData);
  const { saveResumeToDB } = useSaveResumeToDB();

  const [workExperienceAddButtonVisible, setWorkExperienceAddButtonVisible] =
    useState<number>();
  const [educationAddButtonVisible, setEducationAddButtonVisible] =
    useState(false);
  const [primarySkill, setPrimarySkill] = useState<string>("");

  const { handleDropPrimary, handleDropAchievement, handleDropExperience } =
    useDragAndDrop();
  const [insideIndex, setInsideIndex] = useState<number>(0);

  const { addPrimarySkill } = useAddPrimarySkill();
  const {
    updateAndSaveSkill,
    updateAndSaveSummary,
    updateAndSaveWorkExperienceArray,
    updateAndSaveBasicInfo,
    updateAndSaveEducation,
    updateAndSaveName,
    updateAndSaveJobTitle,
  } = useUpdateAndSave();

  useEffect(() => {
    if (streamedJDData === "") {
      setRegeneratedRecordIndex(null);
    }
  }, [streamedJDData]);

  return (
    <div className="first-page ">
      <div className=" flex">
        <div className=" w-4/12 xs:w-1/3 md:w-4/12 flex flex-col pl-3 md:pl-4 bg-[#323B4C] text-gray-100  pr-6 md:pr-4  py-8 h-[1080px] xs:h-auto">
          <div className=" w-32 h-32  xs:w-[72px] xs:h-[72px] sm:w-24 sm:h-24 md:w-32 md:h-32 text-white bg-gray-800 text-center flex justify-center items-center  rounded-full mx-4 xs:mx-0 md:mx-4 mt-4  md:mt-0 md:mr-8 mb-4 md:mb-2">
            <span className="text-3xl xs:text-2xl md:text-3xl hover:shadow-md hover:bg-gray-500">
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
          {/* contacts */}

          <h3 className="uppercase text-lg border-white pb-2  -mr-6 md:-mr-6 border-b-2  xs:text-sm sm:text-sm md:text-md lg:text-lg font-semibold xs:font-medium flex flex-row gap-2 items-center md:mt-4">
            Contact
          </h3>
          <span className=" w-[110%] h-0 mb-3"></span>
          <ul className=" flex flex-col gap-2 mb-4 text-sm break-all pl-0">
            <li className="hover:shadow-md mb-[8px] hover:bg-gray-500  flex flex-row gap-2  items-center">
              <span className="text-gray-100 border border-gray-100 md:w-8 md:h-8 h-6 w-6 flex justify-center items-center">
                {phoneIcon}
              </span>
              <EditableField
                value={
                  resume?.contact?.phone
                    ? resume?.contact?.phone
                    : "(555) 555-1234"
                }
                onSave={(value: string) => {
                  if (value !== resume?.contact?.phone) {
                    updateAndSaveBasicInfo({ phone: value });
                  }
                }}
              />
            </li>

            <li className="hover:shadow-md mb-[8px] hover:bg-gray-500 flex flex-row gap-2  items-center ">
              <span className="text-gray-100 border border-gray-100 md:w-8 md:h-8 h-6 w-6 flex justify-center items-center">
                {emailIcon}
              </span>

              <EditableField
                value={
                  resume?.contact?.email
                    ? resume?.contact?.email
                    : "your@email.com"
                }
                onSave={(value: string) => {
                  if (value !== resume?.contact?.email) {
                    updateAndSaveBasicInfo({ email: value });
                  }
                }}
              />
            </li>

            <li className="hover:shadow-md mb-[8px] hover:bg-gray-500 text-gray-100 flex flex-row gap-2  items-center ">
              <span className="text-gray-100 border border-gray-100 md:w-8 md:h-8 h-6 w-7 flex justify-center items-center">
                in
              </span>
              <EditableField
                value={
                  resume?.contact?.linkedIn
                    ? resume?.contact?.linkedIn
                    : "https://www.linkedin.com/"
                }
                onSave={(value: string) => {
                  if (value !== resume.contact.linkedIn) {
                    updateAndSaveBasicInfo({ linkedIn: value });
                  }
                }}
              />
              {/* </a> */}
            </li>
          </ul>

          {/* Skills */}
          {resume?.primarySkills && resume?.primarySkills.length > 0 && (
            <>
              {resume?.primarySkills && resume?.primarySkills.length > 0 && (
                <>
                  <h3 className="uppercase text-lg xs:text-sm sm:text-sm -mr-6 md:-mr-6  md:text-md lg:text-lg border-b-2 pb-2 border-white font-semibold flex flex-row gap-2 items-center ">
                    Skills
                  </h3>
                  <span className="border-stylee w-full h-0 mb-3"></span>
                </>
              )}
              {resume?.primarySkills &&
              resume?.primarySkills.length > 0 &&
              !regenerating ? (
                <ol
                  className="pl-0 flex list-styled flex-col gap-3 mb-4 text-sm xs:text-[12px] md:text-sm"
                  onMouseEnter={() =>
                    !newPrimarySkill && setPrimarySkillAddButtonVisible(true)
                  }
                  onMouseLeave={() =>
                    !newPrimarySkill && setPrimarySkillAddButtonVisible(false)
                  }
                >
                  <Regenerate
                    handler={getPrimarySkills}
                    custom_style={"absolute right-0 -bottom-10 mt-4 "}
                    custom_style_li={"flex flex-col gap-3"}
                  >
                    {resume?.primarySkills.map((skill: string, i: number) => (
                      <li
                        className="hover:shadow-md hover:cursor-move parent border-transparent border-[1px] hover:border-dashed hover:border-gray-500 hover:border  hover:bg-gray-500 flex justify-between items-center"
                        key={i}
                        onDragStart={(e) =>
                          e.dataTransfer.setData("text/plain", i.toString())
                        }
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => handleDropPrimary(e, i)}
                        draggable
                      >
                        <EditableField
                          value={skill}
                          onSave={(value: string) => {
                            if (value !== resume?.primarySkills[i]) {
                              let updatedSkills = [...resume.primarySkills];
                              updatedSkills.splice(i, 1, value);
                              updateAndSaveSkill(updatedSkills);
                            }
                          }}
                        />
                        <div
                          onClick={() => {
                            const removeSkill = [...resume.primarySkills];
                            removeSkill.splice(i, 1);
                            updateAndSaveSkill(removeSkill);
                          }}
                          className="w-4 h-4  cursor-pointer child"
                        >
                          {crossIcon1}
                        </div>
                      </li>
                    ))}
                  </Regenerate>

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
                      className="border-2 w-1/2 md:w-1/2 lg:w-1/2 border-gray-400 xs:mt-10 md:mt-0 xs:w-full text-center uppercase text-gray-400 cursor-pointer rounded-full py-1 px-4 hover:bg-gray-400 hover:text-white transition duration-300 ease-in-out"
                      onClick={() => {
                        setNewPrimarySkill(true);
                        setPrimarySkillAddButtonVisible(false);
                      }}
                    >
                      + Add
                    </div>
                  ) : null}
                </ol>
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
        <div className="w-full flex flex-wrap flex-col px-4 md:px-8 text-gray-950 pb-10 pt-16">
          <div className="flex flex-col w-10/12 ">
            <h2 className="text-2xl font-bold xs:text-xl md:text-2xl lg:text-2xl hover:shadow-md hover:bg-gray-100">
              <EditableField
                value={resume?.name ? resume?.name : "FULL NAME"}
                style={{ width: "full" }}
                onSave={(value: string) => {
                  if (value !== resume?.name) {
                    updateAndSaveName(value);
                  }
                }}
              />
            </h2>
            <h3 className="text-lg font-medium xs:text-[14px] md:text-xl hover:shadow-md hover:bg-gray-100">
              <EditableField
                value={resume?.jobTitle ? resume?.jobTitle : "JOB TITLE"}
                onSave={(value: string) => {
                  if (value !== resume?.jobTitle) {
                    updateAndSaveJobTitle(value);
                  }
                }}
              />
            </h3>
          </div>
          {/* Executive Summary */}

          <h3 className="uppercase text-lg xs:text-sm sm:text-sm md:text-md lg:text-lg font-semibold mt-8 md:mt-14">
            EXECUTIVE SUMMARY
          </h3>
          <span className="border-stylee w-full h-0 border-[1px] !border-gray-500 mt-2 mb-4"></span>

          <Regenerate
            handler={getSummary}
            custom_style={"absolute bottom-3 right-2 "}
          >
            <div className="text-[16px] hover:shadow-md min-h-[380px] xs:min-h-fit hover:bg-gray-100 group-hover:pb-14">
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
                  updateAndSaveSummary(value);
                }}
              />
            </div>
          </Regenerate>

          {/* Work Experience */}

          <h3 className="uppercase text-lg xs:text-sm sm:text-sm md:text-md lg:text-lg font-semibold mt-7">
            WORK EXPERIENCE
          </h3>
          <span className="border-stylee w-full h-0 border-[1px] !border-gray-500 my-3"></span>

          {resume?.workExperienceArray &&
          resume?.workExperienceArray.length > 0 ? (
            <>
              {resume?.workExperienceArray.map((rec: any, i: number) => {
                return (
                  <div
                    key={i}
                    className={`flex justify-start  ${
                      i > 0
                        ? "w-[100vw] ml-[-234px] xs:ml-0 xs:w-full"
                        : "xs:min-h-fit min-h-[380px]"
                    }`}
                  >
                    <div className="w-[5%] pr-5 xs:pr-0 md:pr-5   pt-2   h-full flex flex-col items-center  gap-1">
                      <div className="p-1 rounded-full bg-gray-100 border-2 border-gray-500 "></div>
                      {resume?.workExperienceArray.length - 1 !== i && (
                        <div className="h-full w-[2px] bg-gray-500"></div>
                      )}
                    </div>
                    <div
                      key={i}
                      className="hover:border-dashed hover:border-gray-500  border-transparent border-2 hover:cursor-move hover:border-2"
                      onMouseEnter={() => setWorkExperienceAddButtonVisible(i)}
                      onMouseLeave={() => setWorkExperienceAddButtonVisible(-1)}
                      onDragStart={(e) =>
                        e.dataTransfer.setData("text/plain", i.toString())
                      }
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => handleDropExperience(e, i)}
                      draggable
                    >
                      <h2 className="hover:shadow-md hover:cursor-text text-[1rem] font-bold leading-8 hover:bg-gray-100">
                        <EditableField
                          value={rec?.title}
                          style={{ width: "100%" }}
                          onSave={(value: string) => {
                            if (
                              value !== resume?.workExperienceArray[i].title
                            ) {
                              let updatedExp = [...resume.workExperienceArray];
                              updatedExp[i] = {
                                ...updatedExp[i],
                                title: value,
                              };
                              updateAndSaveWorkExperienceArray(updatedExp);
                            }
                          }}
                        />
                      </h2>
                      <h2 className="hover:cursor-default text-[15px] leading-relaxed  ">
                        {rec?.fromMonth + " " + rec?.fromYear} -{" "}
                        {rec?.isContinue
                          ? "Present"
                          : `${rec?.toMonth} ${rec?.toYear}`}{" "}
                        |{" "}
                        <span className="hover:shadow-md hover:cursor-text hover:bg-gray-100">
                          <EditableField
                            value={rec?.company}
                            onSave={(value: string) => {
                              if (
                                value !== resume?.workExperienceArray[i].company
                              ) {
                                let updatedExp = [
                                  ...resume.workExperienceArray,
                                ];
                                updatedExp[i] = {
                                  ...updatedExp[i],
                                  company: value,
                                };
                                updateAndSaveWorkExperienceArray(updatedExp);
                              }
                            }}
                          />
                        </span>{" "}
                        |{" "}
                        <span className="hover:shadow-md hover:bg-gray-100">
                          <EditableField
                            value={rec?.cityState}
                            onSave={(value: string) => {
                              if (
                                value !==
                                resume?.workExperienceArray[i].cityState
                              ) {
                                let updatedExp = [
                                  ...resume.workExperienceArray,
                                ];
                                updatedExp[i] = {
                                  ...updatedExp[i],
                                  cityState: value,
                                };
                                updateAndSaveWorkExperienceArray(updatedExp);
                              }
                            }}
                          />
                        </span>{" "}
                        <span className="hover:shadow-md hover:bg-gray-100">
                          <EditableField
                            value={rec?.country}
                            onSave={(value: string) => {
                              if (
                                value !== resume?.workExperienceArray[i].country
                              ) {
                                let updatedExp = [
                                  ...resume.workExperienceArray,
                                ];
                                updatedExp[i] = {
                                  ...updatedExp[i],
                                  country: value,
                                };
                                updateAndSaveWorkExperienceArray(updatedExp);
                              }
                            }}
                          />
                        </span>
                      </h2>
                      <div className="p-4">
                        <Regenerate
                          handler={() => {
                            getOneWorkExperienceNew(rec);
                            setRegeneratedRecordIndex(i);
                          }}
                          custom_style={"absolute mt-0 right-2"}
                        >
                          {rec?.achievements && i !== regeneratedRecordIndex ? (
                            <ul className="pl-0 flex flex-col gap-1 text-sm">
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
                                          let updatedExp: any = [
                                            ...resume.workExperienceArray,
                                          ];
                                          let updatedAchievements = [
                                            ...updatedExp[i].achievements,
                                          ];
                                          updatedAchievements.splice(ind, 1);
                                          updatedExp[i] = {
                                            ...updatedExp[i],
                                            achievements: updatedAchievements,
                                          };
                                          updateAndSaveWorkExperienceArray(
                                            updatedExp
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
                                          if (
                                            value !==
                                            resume?.workExperienceArray[i]
                                              ?.achievements[ind]
                                          ) {
                                            let updatedExp: any = [
                                              ...resume.workExperienceArray,
                                            ];
                                            let updatedAchievements = [
                                              ...updatedExp[i].achievements,
                                            ];
                                            updatedAchievements.splice(
                                              ind,
                                              1,
                                              value
                                            );
                                            updatedExp[i] = {
                                              ...updatedExp[i],
                                              achievements: updatedAchievements,
                                            };
                                            updateAndSaveWorkExperienceArray(
                                              updatedExp
                                            );
                                          }
                                        }}
                                      />
                                      <div
                                        onClick={() => {
                                          let updatedExp: any = [
                                            ...resume.workExperienceArray,
                                          ];
                                          let updatedAchievements = [
                                            ...updatedExp[i].achievements,
                                          ];
                                          updatedAchievements.splice(ind, 1);
                                          updatedExp[i] = {
                                            ...updatedExp[i],
                                            achievements: updatedAchievements,
                                          };
                                          updateAndSaveWorkExperienceArray(
                                            updatedExp
                                          );
                                        }}
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
                        </Regenerate>
                        {newWorkExperience === i ? (
                          <>
                            <div className="w-full gap-1 rounded-md flex flex-wrap h-9.5">
                              <textarea
                                className="w-9/12 xs:w-full md:w-9/12 lg:w-9/12 rounded-l-md border-2  text bg-transparent p-2" // Apply Tailwind CSS classes
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
                                    if (newAchievement !== "") {
                                      let updatedExp: any = [
                                        ...resume.workExperienceArray,
                                      ];
                                      let updatedAchievements = [
                                        ...updatedExp[i].achievements,
                                      ];
                                      updatedAchievements.push(newAchievement);
                                      updatedExp[i] = {
                                        ...updatedExp[i],
                                        achievements: updatedAchievements,
                                      };
                                      updateAndSaveWorkExperienceArray(
                                        updatedExp
                                      );
                                      setNewAchievement("");
                                    }
                                  }
                                }}
                              />
                              <button
                                className="bg-green-500 w-2/12 xs:w-full md:w-2/12 lg:w-2/12 uppercase h-9 px-2 text-white rounded-r-md"
                                onClick={() => {
                                  // Save the new achievement to the state and possibly the database
                                  if (newAchievement !== "") {
                                    let updatedExp: any = [
                                      ...resume.workExperienceArray,
                                    ];
                                    let updatedAchievements = [
                                      ...updatedExp[i].achievements,
                                    ];
                                    updatedAchievements.push(newAchievement);
                                    updatedExp[i] = {
                                      ...updatedExp[i],
                                      achievements: updatedAchievements,
                                    };
                                    updateAndSaveWorkExperienceArray(
                                      updatedExp
                                    );
                                    setNewAchievement("");
                                  }
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
                              className="bg-red-500 w-2/12 xs:w-full md:w-2/12 lg:w-2/12 py-1 px-2 mt-2 text-white rounded-full"
                            >
                              Cancel
                            </button>
                          </>
                        ) : null}
                        {workExperienceAddButtonVisible === i &&
                        newWorkExperience !== i ? (
                          <>
                            <div
                              className="border-2 w-2/12 xs:w-full mt-3 md:w-2/12 lg:w-2/12 border-gray-400 text-center uppercase text-gray-500 cursor-pointer rounded-full py-1  hover:bg-gray-400 hover:text-white transition duration-300 ease-in-out"
                              onClick={() => {
                                setNewWorkExperience(i);
                              }}
                            >
                              + Add
                            </div>
                            <button
                              className="border-2 h-10 w-auto px-3  mb-2 mt-3    xs:mt-12 md:mt-2 lg:mt-2  border-gray-400 text-center uppercase text-gray-500 cursor-pointer rounded-full flex items-center justify-center hover:bg-gray-400 hover:text-white transition duration-300 ease-in-out"
                              onClick={() => {
                                let updatedExp: any = [
                                  ...resume.workExperienceArray,
                                ];
                                let updatedAchievements = [
                                  ...updatedExp[i].achievements,
                                ];
                                updatedAchievements.push(newAchievement);
                                updatedExp[i] = {
                                  ...updatedExp[i],
                                  achievements: updatedAchievements,
                                };
                                updateAndSaveWorkExperienceArray(updatedExp);
                                setNewAchievement("");
                              }}
                            >
                              Add Space
                            </button>
                          </>
                        ) : null}
                      </div>
                    </div>
                  </div>
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
          {/* Education */}

          {resume?.education && (
            <div className=" ml-[-180px]  xs:ml-0">
              <h3 className="uppercase text-lg font-semibold flex flex-row gap-2 items-center ">
                Education
              </h3>
              <span className="border-stylee block h-0 border-[1px] !border-gray-500 my-3"></span>
              <ul
                className="flex xs:flex-col md:flex-row lg:flex-row w-full  flex-wrap pl-0 "
                onMouseEnter={() =>
                  !newEducation && setEducationAddButtonVisible(true)
                }
                onMouseLeave={() =>
                  !newEducation && setEducationAddButtonVisible(false)
                }
              >
                {resume?.education.map((education: Education, ind: number) => (
                  <React.Fragment key={education?.id || ind}>
                    <div className="w-[28%] xs:w-full md:w-[30%] mx-2">
                      <li
                        className=" hover:shadow-md hover:cursor-move border-transparent border-2 
                  parent hover:border-dashed hover:border-gray-500 hover:border-2 
                   hover:bg-gray-100 font-bold flex uppercase text-[15px]  justify-between items-center "
                      >
                        <EditableField
                          type="textarea"
                          rows={2}
                          value={education?.educationLevel}
                          onSave={(value: string) => {
                            if (
                              value !== resume?.education[ind].educationLevel
                            ) {
                              let updatedEducations = [...resume.education];
                              updatedEducations[ind] = {
                                ...updatedEducations[ind],
                                educationLevel: value,
                              };
                              updateAndSaveEducation(updatedEducations);
                            }
                          }}
                        />
                        <div
                          onClick={() => {
                            let updatedEducations = [...resume?.education];
                            updatedEducations.splice(ind, 1);
                            updateAndSaveEducation(updatedEducations);
                          }}
                          className="w-4 h-4  cursor-pointer child"
                        >
                          {crossIcon1}
                        </div>
                      </li>
                      <li className="hover:shadow-md  hover:bg-gray-100 text-[15px] font-medium">
                        <EditableField
                          value={`${education?.fieldOfStudy}`}
                          style={{ width: "100%" }}
                          onSave={(value: string) => {
                            if (value !== resume?.education[ind].fieldOfStudy) {
                              let updatedEducations = [...resume.education];
                              updatedEducations[ind] = {
                                ...updatedEducations[ind],
                                fieldOfStudy: value,
                              };
                              updateAndSaveEducation(updatedEducations);
                            }
                          }}
                        />{" "}
                      </li>
                      <li className="hover:shadow-md hover:bg-gray-100 text-sm italic text-gray-800">
                        <EditableField
                          type="textarea"
                          rows={2}
                          value={`${education?.schoolName}`}
                          onSave={(value: string) => {
                            if (value !== resume?.education[ind].schoolName) {
                              let updatedEducations = [...resume.education];
                              updatedEducations[ind] = {
                                ...updatedEducations[ind],
                                schoolName: value,
                              };
                              updateAndSaveEducation(updatedEducations);
                            }
                          }}
                        />
                      </li>
                      <li className="mb-4 italic text-xs text-gray-700 ">
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
export default memo(ResumeTemplate4);
function addPrimary(): any {
  throw new Error("Function not implemented.");
}
