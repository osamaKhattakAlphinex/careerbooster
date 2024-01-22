"use client";
import { memo, useEffect, useState } from "react";
import { Education } from "@/store/userDataSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  contactIcon,
  crossIcon1,
  educationIcon,
  emailIcon,
  linkedInIcon,
  phoneIcon,
  sparkleIcon,
} from "@/helpers/iconsProvider";
import useGetSummary from "@/hooks/useGetSummary";
import Regenerate from "@/helpers/regenerate";
import EditableField from "@/components/new-dashboard/common/EditableField";
import useSaveResumeToDB from "@/hooks/useSaveToDB";
import useSingleJDGenerate from "@/hooks/useSingleJDGenerate";
import useDragAndDrop from "@/hooks/useDragAndDrop";
import useGetPrimarySkills from "@/hooks/useGetPrimarySkills";
import useAddPrimarySkill from "@/hooks/useAddPrimarySkill";
import useUpdateAndSave from "@/hooks/useUpdateAndSave";

const ResumeTemplate2 = () => {
  const dispatch = useDispatch();
  const resume = useSelector((state: any) => state.resume);
  const [newPrimarySkill, setNewPrimarySkill] = useState(false);
  const [newWorkExperience, setNewWorkExperience] = useState<number>();
  const [newAchievement, setNewAchievement] = useState("");
  const [newEducation, setNewEducation] = useState(false);
  const [primarySkillAddButtonVisible, setPrimarySkillAddButtonVisible] =
    useState(false);
  const [workExperienceAddButtonVisible, setWorkExperienceAddButtonVisible] =
    useState<number>();
  const [educationAddButtonVisible, setEducationAddButtonVisible] =
    useState(false);
  const [primarySkill, setPrimarySkill] = useState<string>("");

  const [regenerating, setRegenerating] = useState(false);
  const { getPrimarySkills } = useGetPrimarySkills(setRegenerating);

  const [insideIndex, setInsideIndex] = useState<number>(0);

  const [regeneratedRecordIndex, setRegeneratedRecordIndex] = useState<
    number | null
  >(null);
  const [streamedSummaryData, setStreamedSummaryData] = useState("");
  const { getSummary } = useGetSummary(setStreamedSummaryData);
  const [streamedJDData, setStreamedJDData] = useState<any>("");
  const { getOneWorkExperienceNew } = useSingleJDGenerate(setStreamedJDData);
  const { saveResumeToDB } = useSaveResumeToDB();
  const { handleDropPrimary, handleDropAchievement, handleDropExperience } =
    useDragAndDrop();
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
    <div className="w-full first-page  text-gray-900 flex flex-col justify-start space-y-4 items-start px-6">
      {/* Name and Title */}
      <div className="flex flex-col w-full text-center bg-gray-100 rounded-3xl  p-8">
        <h2 className="text-4xl xs:text-2xl md:4xl lg:text-6xl font-bold hover:shadow-md hover:bg-gray-100">
          <EditableField
            value={resume?.name ? resume?.name : "FULL NAME"}
            style={{ width: "fit-content" }}
            onSave={(value: string) => {
              if (value !== resume?.name) {
                updateAndSaveName(value);
              }
            }}
          />
        </h2>
        <h3 className="text-sm xs:text-sm md:text-lg lg:text-lg  hover:shadow-md hover:bg-gray-100">
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
      {/* contacts */}
      <div className="w-full py-3">
        <ul className="flex flex-row xs:flex-col md:flex-row justify-around items-center p-4  bg-black rounded-2xl">
          <li className="hover:shadow-md text-white hover:bg-gray-700 text-sm xs:text-sm md:text-lg lg:text-lg flex flex-row gap-1  items-center">
            {phoneIcon}
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
          <li className="hover:shadow-md text-sm xs:text-sm md:text-lg lg:text-lg text-white hover:bg-gray-700 flex flex-row gap-1  items-center">
            {emailIcon}
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
          <li className="hover:shadow-md text-white text-sm xs:text-sm md:text-lg lg:text-lg hover:bg-gray-700 flex flex-row gap-1  items-center">
            {linkedInIcon}
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
      </div>
      {/* summary objective */}
      <div className="w-full space-y-3 ">
        <h2 className="uppercase text-sm xs:text-sm md:text-lg pb-2 lg:text-lg font-bold">
          About Me
        </h2>
        <Regenerate
          handler={getSummary}
          custom_style={
            "absolute  bottom-3 xs:bottom-0 md:bottom-3 lg:bottom-3 right-2 mt-2"
          }
        >
          <div className="text-sm xs:text-sm md:text-lg lg:text-lg hover:shadow-md hover:bg-gray-100 group-hover:pb-14">
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
      </div>
      {/* Skills  */}
      <div className=" w-full space-y-3">
        {resume?.primarySkills && resume?.primarySkills.length > 0 && (
          <h2 className="uppercase text-sm xs:text-sm md:text-lg lg:text-lg pb-2 font-bold">
            Skills
          </h2>
        )}
        {resume?.primarySkills &&
        resume?.primarySkills.length > 0 &&
        !regenerating ? (
          <>
            <ul
              className="flex flex-row flex-wrap gap-1 text-sm xs:text-sm md:text-lg lg:text-lg"
              onMouseEnter={() =>
                !newPrimarySkill && setPrimarySkillAddButtonVisible(true)
              }
              onMouseLeave={() =>
                !newPrimarySkill && setPrimarySkillAddButtonVisible(false)
              }
            >
              <Regenerate
                handler={getPrimarySkills}
                custom_style={"absolute right-0 bottom-0"}
                custom_style_li={"flex flex-row  flex-wrap gap-1"}
              >
                {resume?.primarySkills.map((skill: string, i: number) => (
                  <li
                    className=" px-4 py-2 bg-slate-100 border-transparent border-[1px] rounded-full hover:shadow-md hover:cursor-move parent hover:border-dashed hover:border-gray-500 hover:border  hover:bg-gray-100 flex justify-between items-center"
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
                {newPrimarySkill ? (
                  <>
                    <div className="w-full rounded-2xl  border-[1px] border-black flex h-9.5">
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
                    className="border-2 w-2/12 xs:w-1/2 md:w-2/12 lg:w-2/12 h-10  border-gray-400 text-center uppercase text-gray-500 cursor-pointer items-center flex justify-center rounded-full hover:bg-gray-400 hover:text-white transition duration-300 ease-in-out"
                    onClick={() => {
                      setNewPrimarySkill(true);
                      setPrimarySkillAddButtonVisible(false);
                    }}
                  >
                    + Add
                  </div>
                ) : null}
              </Regenerate>
            </ul>
          </>
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
      </div>

      {/* Work Experience */}
      <div className="w-full flex flex-col space-y-3">
        <h2 className="uppercase text-sm xs:text-sm md:text-lg lg:text-lg bp-2 font-bold">
          WORK EXPERIENCE
        </h2>
        {resume?.workExperienceArray &&
        resume?.workExperienceArray.length > 0 ? (
          <>
            {resume?.workExperienceArray.map((rec: any, i: number) => {
              return (
                <div
                  key={i}
                  className={`${
                    i === resume?.workExperienceArray.length - 1
                      ? ""
                      : "border-b border-gray-200"
                  } grid border-transparent border-2 grid-cols-6 gap-6  hover:border-dashed hover:border-gray-500 hover:cursor-move hover:border-2`}
                  onMouseEnter={() => setWorkExperienceAddButtonVisible(i)}
                  onMouseLeave={() => setWorkExperienceAddButtonVisible(-1)}
                  onDragStart={(e) =>
                    e.dataTransfer.setData("text/plain", i.toString())
                  }
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => handleDropExperience(e, i)}
                  draggable
                >
                  {/* start end */}
                  <h2 className="hover:cursor-default text-center bg-transparent xs:bg-slate-100 p-0 col-span-1 xs:col-span-6 md:col-span-1 xs:p-2 md:p-0 md:bg-transparent  text-sm xs:text-sm md:text-lg lg:text-lg font-semibold">
                    {rec?.fromMonth + " " + rec?.fromYear} -{" "}
                    {rec?.isContinue
                      ? "Present"
                      : `${rec?.toMonth} ${rec?.toYear}`}{" "}
                  </h2>

                  <div className=" col-span-5 xs:col-span-6 md:col-span-5">
                    {/* Title */}
                    <h2 className="hover:shadow-md hover:cursor-text hover:bg-gray-100 text-base font-bold">
                      <EditableField
                        value={rec?.title}
                        style={{ width: "100%" }}
                        onSave={(value: string) => {
                          if (value !== resume?.workExperienceArray[i].title) {
                            let updatedExp = [...resume.workExperienceArray];
                            updatedExp[i] = { ...updatedExp[i], title: value };
                            updateAndSaveWorkExperienceArray(updatedExp);
                          }
                        }}
                      />
                    </h2>
                    <span className="hover:shadow-md hover:cursor-text hover:bg-gray-100 text-sm xs:text-sm md:text-lg lg:text-lg">
                      <EditableField
                        value={rec?.company}
                        onSave={(value: string) => {
                          if (
                            value !== resume?.workExperienceArray[i].company
                          ) {
                            let updatedExp = [...resume.workExperienceArray];
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
                            value !== resume?.workExperienceArray[i].cityState
                          ) {
                            let updatedExp = [...resume.workExperienceArray];
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
                            let updatedExp = [...resume.workExperienceArray];
                            updatedExp[i] = {
                              ...updatedExp[i],
                              country: value,
                            };
                            updateAndSaveWorkExperienceArray(updatedExp);
                          }
                        }}
                      />
                    </span>
                    <div className="p-4">
                      <Regenerate
                        handler={() => {
                          getOneWorkExperienceNew(rec);
                          setRegeneratedRecordIndex(i);
                        }}
                        custom_style={"absolute mt-0 right-0"}
                      >
                        {rec?.achievements && i !== regeneratedRecordIndex ? (
                          <ul className="pl-0 flex flex-col gap-1 text-sm xs:text-sm md:text-lg lg:text-lg">
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
                              className="w-9/12 xs:w-full md:w-9/12 rounded-l-md border-2  text bg-transparent p-2" // Apply Tailwind CSS classes
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
                              className="bg-green-500 w-2/12 xs:w-full md:w-2/12 uppercase h-9 px-2 text-white rounded-r-md"
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
                                  updateAndSaveWorkExperienceArray(updatedExp);
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
                            className="bg-red-500 w-2/12 xs:w-full md:w-2/12 py-1 px-2 mt-2 text-white rounded-full"
                          >
                            Cancel
                          </button>
                        </>
                      ) : null}
                      {workExperienceAddButtonVisible === i &&
                      newWorkExperience !== i ? (
                        <>
                          {" "}
                          <div
                            className="border-2 h-10 w-2/12 mb-2 mt-3 xs:w-full md:w-2/12 lg:2/12 xs:mt-12 md:mt-2 lg:mt-2  border-gray-400 text-center uppercase text-gray-500 cursor-pointer rounded-full flex items-center justify-center hover:bg-gray-400 hover:text-white transition duration-300 ease-in-out"
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
      </div>
      {/* Education */}
      <div className="w-full space-y-3">
        {resume?.education && (
          <>
            {/* <span className="w-full h-0 border-[1px] border-gray-500 my-3 page-break"></span> */}
            <h3 className="uppercase text-sm md:text-lg font-semibold flex flex-row gap-2 items-center">
              {educationIcon}
              Education
            </h3>
            {/* <span className="border-stylee w-full h-0 border-[1px] !border-gray-500 my-3"></span> */}
            <ul
              className="grid grid-cols-3 xs:grid-cols-1 md:grid-cols-3 gap-2"
              onMouseEnter={() =>
                !newEducation && setEducationAddButtonVisible(true)
              }
              onMouseLeave={() =>
                !newEducation && setEducationAddButtonVisible(false)
              }
            >
              {resume?.education.map((education: Education, ind: number) => (
                <React.Fragment key={education?.id || ind}>
                  <div className="bg-gray-100 px-4 py-2">
                    <li
                      className=" hover:shadow-md hover:cursor-move border-transparent border-2 
                  parent hover:border-dashed hover:border-gray-500 hover:border-2 
                   hover:bg-gray-100 font-semibold flex uppercase text-sm xs:text-sm md:text-lg lg:text-lg  justify-between items-center "
                    >
                      <EditableField
                        rows={2}
                        value={education?.educationLevel}
                        onSave={(value: string) => {
                          if (value !== resume?.education[ind].educationLevel) {
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
                    <li className="hover:shadow-md uppercase hover:bg-gray-100 text-base">
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
                    <li className="hover:shadow-md hover:bg-gray-100 text-sm xs:text-sm md:text-lg lg:text-lg text-gray-800">
                      <EditableField
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
                    <li className="mb-4 text-xs text-gray-700 ">
                      {education?.fromMonth + " " + education.fromYear} -{" "}
                      {education?.isContinue
                        ? "Present"
                        : education?.toMonth + " " + education.toYear}
                    </li>
                  </div>
                </React.Fragment>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};
export default memo(ResumeTemplate2);
function addPrimary(): any {
  throw new Error("Function not implemented.");
}
