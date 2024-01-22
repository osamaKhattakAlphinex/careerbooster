"use client";
import { memo, useEffect, useState } from "react";
import { Education } from "@/store/userDataSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  setBasicInfo,
  setField,
  setPrimarySkills,
  setSummary,
  setWorkExperienceArray,
} from "@/store/resumeSlice";
import {
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
import useSingleJDGenerate from "@/hooks/useSingleJDGenerate";
import useSaveResumeToDB from "@/hooks/useSaveToDB";
import useDragAndDrop from "@/hooks/useDragAndDrop";
import useGetPrimarySkills from "@/hooks/useGetPrimarySkills";
import useAddPrimarySkill from "@/hooks/useAddPrimarySkill";
import useUpdateAndSave from "@/hooks/useUpdateAndSave";
const ResumeTemplate6 = () => {
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

  const [insideIndex, setInsideIndex] = useState<number>(0);
  const { addPrimarySkill } = useAddPrimarySkill();
  const { updateAndSaveSkill,
    updateAndSaveSummary,
    updateAndSaveWorkExperienceArray,
    updateAndSaveBasicInfo,
    updateAndSaveEducation, updateAndSaveName, updateAndSaveJobTitle } = useUpdateAndSave()


  useEffect(() => {
    if (streamedJDData === "") {
      setRegeneratedRecordIndex(null);
    }
  }, [streamedJDData]);

  return (
    <div className=" text-gray-900  flex flex-row">
      <div className=" flex  w-[8%] bg-[#e04127]"></div>
      <div className="w-full pl-5">
        <div className="flex flex-col w-12/12 p-8">
          <h2 className="text-2xl font-bold xs:text-xl md:text-2xl lg:text-2xl hover:shadow-md hover:bg-gray-100">
            <EditableField
              value={resume?.name ? resume?.name : "FULL NAME"}
              style={{ width: "fit-content" }}
              onSave={(value: string) => {
                dispatch(setField({ name: "name", value: value }));
                saveResumeToDB({ ...resume, name: value });
              }}
            />
          </h2>
          <h3 className="text-xl xs:text-[14px] md:text-xl xs:leading-none w-full font-medium  hover:shadow-md hover:bg-gray-100 ">
            <EditableField
              value={resume?.jobTitle ? resume?.jobTitle : "JOB TITLE"}
              onSave={(value: string) => {
                dispatch(setField({ name: "jobTitle", value: value }));
                saveResumeToDB({ ...resume, jobTitle: value });
              }}
            />
          </h3>
          <ul className=" flex flex-row xs:flex-col md:flex-row gap-3 my-4 justify-between text-sm  break-all pl-0">
            <li className="hover:shadow-md hover:bg-gray-100 text-sm   flex flex-row gap-1  items-center">
              {phoneIcon}
              <EditableField
                value={
                  resume?.contact?.phone
                    ? resume?.contact?.phone
                    : "(555) 555-1234"
                }
                onSave={(value: string) => {
                  dispatch(
                    setBasicInfo({
                      ...resume,
                      contact: { ...resume.contact, phone: value },
                    })
                  );
                  saveResumeToDB({
                    ...resume,
                    contact: { ...resume.contact, phone: value },
                  });
                }}
              />
            </li>
            <li className="hover:shadow-md hover:bg-gray-100 flex flex-row gap-1  items-center text-sm ">
              {emailIcon}
              <EditableField
                value={
                  resume?.contact?.email
                    ? resume?.contact?.email
                    : "your@email.com"
                }
                onSave={(value: string) => {
                  dispatch(
                    setBasicInfo({
                      ...resume,
                      contact: { ...resume.contact, email: value },
                    })
                  );
                  saveResumeToDB({
                    ...resume,
                    contact: { ...resume.contact, email: value },
                  });
                }}
              />
            </li>
            <li className="hover:shadow-md hover:bg-gray-100  flex flex-row gap-1  items-center text-sm ">
              <span className="text-gray-950  px-1 font-bold  border border-gray-950">
                in
              </span>
              <EditableField
                value={
                  resume?.contact?.linkedIn
                    ? resume?.contact?.linkedIn
                    : "https://www.linkedin.com/"
                }
                onSave={(value: string) => {
                  dispatch(
                    setBasicInfo({
                      ...resume,
                      contact: { ...resume.contact, linkedIn: value },
                    })
                  );
                  saveResumeToDB({
                    ...resume,
                    contact: { ...resume.contact, linkedIn: value },
                  });
                }}
              />
              {/* </a> */}
            </li>
          </ul>
          {/* EXECUTIVE SUMMARY */}
          <div className="w-full flex flex-wrap flex-col ">
            <span className="border-stylee w-full h-0 border-[1px] !border-gray-500 mt-3"></span>
            <h3 className="uppercase text-lg font-semibold my-3">
              EXECUTIVE SUMMARY
            </h3>
            <span className="border-stylee w-full h-0 border-[1px] !border-gray-500"></span>

            <Regenerate
              handler={getSummary}
              custom_style={
                "absolute  bottom-3 xs:bottom-0 md:bottom-3 lg:bottom-3 right-2 mt-2"
              }
            >
              <div className="text-sm  hover:shadow-md my-2 hover:bg-gray-100 group-hover:pb-14">
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
                    updateAndSaveSummary(value)
                  }}
                />
              </div>
            </Regenerate>
            {/* Skills */}

            {resume?.primarySkills && resume?.primarySkills.length > 0 && (
              <>
                <span className="border-stylee w-full h-0 border-[1px] !border-gray-500 mt-3"></span>
                <h3 className="uppercase text-lg font-semibold flex flex-row gap-2 items-center py-3">
                  Skills
                </h3>
                <span className="border-stylee w-full h-0 border-[1px] !border-gray-500 mb-2"></span>
                {resume?.primarySkills &&
                  resume?.primarySkills.length > 0 &&
                  !regenerating ? (
                  <ul
                    className="pl-0 flex flex-row  flex-wrap gap-1 h-[20%] text-sm "
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
                      {" "}
                      {/* <li className="font-semibold  uppercase">primary</li> */}
                      {resume?.primarySkills.map((skill: string, i: number) => (
                        <li
                          className="hover:shadow-md  w-[45%] xs:w-full sm:w-[45%]  hover:cursor-move parent hover:border-dashed hover:border-gray-500 hover:border  hover:bg-gray-100 border-transparent border-[1px] flex  items-center"
                          key={i}
                          onDragStart={(e) =>
                            e.dataTransfer.setData("text/plain", i.toString())
                          }
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={(e) => handleDropPrimary(e, i)}
                          draggable
                        >
                          <span className="w-1 h-1 bg-black rounded-full mr-3"></span>
                          <div className="flex justify-between items-center w-full">
                            <EditableField
                              value={skill}
                              onSave={(value: string) => {
                                if (value !== resume?.primarySkills[i]) {
                                  let updatedSkills = [...resume.primarySkills]
                                  updatedSkills.splice(i, 1, value)
                                  updateAndSaveSkill(updatedSkills)
                                }
                              }}
                            />
                            <div
                              onClick={() => {
                                const removeSkill = [...resume.primarySkills]
                                removeSkill.splice(i, 1)
                                updateAndSaveSkill(removeSkill)
                              }}
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
                          className="border-2 border-gray-400 text-center uppercase text-gray-500 cursor-pointer rounded-full py-1 px-4 hover:bg-gray-400 hover:text-white transition duration-300 ease-in-out"
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
            {/* Work Experience */}
            <span className="border-stylee w-full h-0 border-[1px] !border-gray-500 mt-3"></span>
            <h3 className="uppercase text-lg font-semibold py-3">
              WORK EXPERIENCE
            </h3>
            <span className="border-stylee w-full h-0 border-[1px] !border-gray-500"></span>

            {resume?.workExperienceArray &&
              resume?.workExperienceArray.length > 0 ? (
              <>
                {resume?.workExperienceArray.map((rec: any, i: number) => {
                  return (
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
                            let updatedExp = resume?.workExperienceArray.map(
                              (exp: any, index: number) => {
                                if (index === i) {
                                  return {
                                    ...exp,
                                    title: value,
                                  };
                                }
                                return exp;
                              }
                            );
                            dispatch(
                              setWorkExperienceArray({
                                workExperienceArray: updatedExp,
                              })
                            );
                            saveResumeToDB({
                              ...resume,
                              workExperienceArray: updatedExp,
                            });
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
                              let updatedExp = resume?.workExperienceArray.map(
                                (exp: any, index: number) => {
                                  if (index === i) {
                                    return {
                                      ...exp,
                                      company: value,
                                    };
                                  }
                                  return exp;
                                }
                              );
                              dispatch(
                                setWorkExperienceArray({
                                  workExperienceArray: updatedExp,
                                })
                              );
                              saveResumeToDB({
                                ...resume,
                                workExperienceArray: updatedExp,
                              });
                            }}
                          />
                        </span>{" "}
                        |{" "}
                        <span className="hover:shadow-md hover:bg-gray-100">
                          <EditableField
                            value={rec?.cityState}
                            onSave={(value: string) => {
                              let updatedExp = resume?.workExperienceArray.map(
                                (exp: any, index: number) => {
                                  if (index === i) {
                                    return {
                                      ...exp,
                                      cityState: value,
                                    };
                                  }
                                  return exp;
                                }
                              );
                              dispatch(
                                setWorkExperienceArray({
                                  workExperienceArray: updatedExp,
                                })
                              );
                              saveResumeToDB({
                                ...resume,
                                workExperienceArray: updatedExp,
                              });
                            }}
                          />
                        </span>{" "}
                        <span className="hover:shadow-md hover:bg-gray-100">
                          <EditableField
                            value={rec?.country}
                            onSave={(value: string) => {
                              let updatedExp = resume?.workExperienceArray.map(
                                (exp: any, index: number) => {
                                  if (index === i) {
                                    return {
                                      ...exp,
                                      country: value,
                                    };
                                  }
                                  return exp;
                                }
                              );
                              dispatch(
                                setWorkExperienceArray({
                                  workExperienceArray: updatedExp,
                                })
                              );
                              saveResumeToDB({
                                ...resume,
                                workExperienceArray: updatedExp,
                              });
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
                                          const workExperienceArray =
                                            resume.workExperienceArray.map(
                                              (rec: any, index: number) => {
                                                if (index === i) {
                                                  return {
                                                    ...rec,
                                                    achievements:
                                                      rec.achievements.filter(
                                                        (
                                                          ach: any,
                                                          achIndex: number
                                                        ) => achIndex !== ind
                                                      ),
                                                  };
                                                }
                                                return rec;
                                              }
                                            );
                                          dispatch(
                                            setWorkExperienceArray({
                                              workExperienceArray:
                                                workExperienceArray,
                                            })
                                          );
                                          saveResumeToDB({
                                            ...resume,
                                            workExperienceArray:
                                              workExperienceArray,
                                          });
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
                                          let updatedExp =
                                            resume?.workExperienceArray.map(
                                              (exp: any, index: number) => {
                                                // get the index of the work experience
                                                if (index === i) {
                                                  let updatedAchievements =
                                                    exp?.achievements?.map(
                                                      (
                                                        ach: any,
                                                        achInd: number
                                                      ) => {
                                                        if (achInd === ind) {
                                                          return value;
                                                        }
                                                        return ach;
                                                      }
                                                    );
                                                  return {
                                                    ...exp,
                                                    achievements:
                                                      updatedAchievements,
                                                  };
                                                }
                                                return exp;
                                              }
                                            );
                                          dispatch(
                                            setWorkExperienceArray({
                                              workExperienceArray: updatedExp,
                                            })
                                          );
                                          saveResumeToDB({
                                            ...resume,
                                            workExperienceArray: updatedExp,
                                          });
                                        }}
                                      />
                                      <div
                                        onClick={() => {
                                          const workExperienceArray =
                                            resume.workExperienceArray.map(
                                              (rec: any, index: number) => {
                                                if (index === i) {
                                                  return {
                                                    ...rec,
                                                    achievements:
                                                      rec.achievements.filter(
                                                        (
                                                          ach: any,
                                                          achIndex: number
                                                        ) => achIndex !== ind
                                                      ),
                                                  };
                                                }
                                                return rec;
                                              }
                                            );
                                          dispatch(
                                            setWorkExperienceArray({
                                              workExperienceArray:
                                                workExperienceArray,
                                            })
                                          );
                                          saveResumeToDB({
                                            ...resume,
                                            workExperienceArray:
                                              workExperienceArray,
                                          });
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
                                    // if (newAchievement !== "") {
                                    let updatedExp =
                                      resume?.workExperienceArray.map(
                                        (exp: any, index: number) => {
                                          if (index === i) {
                                            return {
                                              ...exp,
                                              achievements: [
                                                ...exp?.achievements,
                                                newAchievement,
                                              ],
                                            };
                                          }
                                          return exp;
                                        }
                                      );
                                    dispatch(
                                      setWorkExperienceArray({
                                        workExperienceArray: updatedExp,
                                      })
                                    );
                                    saveResumeToDB({
                                      ...resume,
                                      workExperienceArray: updatedExp,
                                    });
                                    setNewAchievement("");
                                  }
                                  // }
                                }}
                              />
                              <button
                                className="bg-green-500 w-2/12 xs:w-full md:w-2/12 lg:w-2/12 uppercase h-9 px-2 text-white rounded-r-md"
                                onClick={() => {
                                  // Save the new achievement to the state and possibly the database
                                  if (newAchievement !== "") {
                                    let updatedExp =
                                      resume?.workExperienceArray.map(
                                        (exp: any, index: number) => {
                                          if (index === i) {
                                            return {
                                              ...exp,
                                              achievements: [
                                                ...exp?.achievements,
                                                newAchievement,
                                              ],
                                            };
                                          }
                                          return exp;
                                        }
                                      );
                                    dispatch(
                                      setWorkExperienceArray({
                                        workExperienceArray: updatedExp,
                                      })
                                    );
                                    saveResumeToDB({
                                      ...resume,
                                      workExperienceArray: updatedExp,
                                    });
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
                                let updatedExp =
                                  resume?.workExperienceArray.map(
                                    (exp: any, index: number) => {
                                      if (index === i) {
                                        return {
                                          ...exp,
                                          achievements: [
                                            ...exp?.achievements,
                                            newAchievement,
                                          ],
                                        };
                                      }
                                      return exp;
                                    }
                                  );
                                dispatch(
                                  setWorkExperienceArray({
                                    workExperienceArray: updatedExp,
                                  })
                                );
                                saveResumeToDB({
                                  ...resume,
                                  workExperienceArray: updatedExp,
                                });
                                setNewAchievement("");
                              }}
                            >
                              Add Space
                            </button>
                          </>
                        ) : null}
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
              <>
                <span className="w-full h-0 border-[1px] border-gray-500 my-3 page-break"></span>
                <h3 className="uppercase text-lg font-semibold flex flex-row gap-2 items-center">
                  Education
                </h3>
                <span className="border-stylee w-full h-0 border-[1px] !border-gray-500 my-3"></span>
                <ul
                  className="flex xs:flex-col md:flex-row lg:flex-row w-full  flex-wrap pl-0 "
                  onMouseEnter={() =>
                    !newEducation && setEducationAddButtonVisible(true)
                  }
                  onMouseLeave={() =>
                    !newEducation && setEducationAddButtonVisible(false)
                  }
                >
                  {resume?.education.map(
                    (education: Education, ind: number) => (
                      <React.Fragment key={education?.id || ind}>
                        <div className="w-[28%] xs:w-full md:w-[30%] m-2">
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
                                let updatedEducations = resume?.education.map(
                                  (edu: any, index: number) => {
                                    if (index === ind) {
                                      return {
                                        ...edu,
                                        educationLevel: value,
                                      };
                                    }
                                    return edu;
                                  }
                                );
                                dispatch(
                                  setField({
                                    name: "education",
                                    value: updatedEducations,
                                  })
                                );
                                saveResumeToDB({
                                  ...resume,
                                  education: updatedEducations,
                                });
                              }}
                            />
                            <div
                              onClick={() => {
                                const removeEducation = resume.education.filter(
                                  (item: any) => item !== education
                                );
                                dispatch(
                                  setField({
                                    name: "education",
                                    value: removeEducation,
                                  })
                                );
                                saveResumeToDB({
                                  ...resume,
                                  education: removeEducation,
                                });
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
                                let updatedEducations = resume?.education.map(
                                  (edu: any, index: number) => {
                                    if (index === ind) {
                                      return {
                                        ...edu,
                                        fieldOfStudy: value,
                                      };
                                    }
                                    return edu;
                                  }
                                );
                                dispatch(
                                  setField({
                                    name: "education",
                                    value: updatedEducations,
                                  })
                                );
                                saveResumeToDB({
                                  ...resume,
                                  education: updatedEducations,
                                });
                              }}
                            />{" "}
                          </li>
                          <li className="hover:shadow-md hover:bg-gray-100 text-sm italic text-gray-800">
                            <EditableField
                              type="textarea"
                              rows={2}
                              value={`${education?.schoolName}`}
                              onSave={(value: string) => {
                                let updatedEducations = resume?.education.map(
                                  (edu: any, index: number) => {
                                    if (index === ind) {
                                      return {
                                        ...edu,
                                        schoolName: value,
                                      };
                                    }
                                    return edu;
                                  }
                                );
                                dispatch(
                                  setField({
                                    name: "education",
                                    value: updatedEducations,
                                  })
                                );
                                saveResumeToDB({
                                  ...resume,
                                  education: updatedEducations,
                                });
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
                    )
                  )}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default memo(ResumeTemplate6);
function addPrimary(): any {
  throw new Error("Function not implemented.");
}
