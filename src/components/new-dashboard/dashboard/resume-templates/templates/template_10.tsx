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
  contactIcon,
  crossIcon1,
  emailIcon,
  phoneIcon,
  sparkleIcon,
} from "@/helpers/iconsProvider";
import useGetSummary from "@/hooks/useGetSummary";
import Regenerate from "@/helpers/regenerate";
import EditableField from "@/components/new-dashboard/common/EditableField";
import useSingleJDGenerate from "@/hooks/useSingleJDGenerate";
import useSaveResumeToDB from "@/hooks/useSaveToDB";
import useDragAndDrop from "@/hooks/useDragAndDrop";
const ResumeTemplate10 = () => {
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
  const addPrimarySkill = () => {
    const primarySkills = resume?.primarySkills;
    const updatedSkills = [...primarySkills];
    updatedSkills.push(primarySkill);
    dispatch(setPrimarySkills({ primarySkills: updatedSkills }));
    saveResumeToDB({
      ...resume,
      primarySkills: updatedSkills,
    });
  };

  useEffect(() => {
    if (streamedJDData === "") {
      setRegeneratedRecordIndex(null);
    }
  }, [streamedJDData]);

  //Reorder Redux PrimarySkills array with drag-drop
  // const handleDropPrimary = (e: any, i: number) => {
  //   const draggedIndex = parseInt(e.dataTransfer.getData("text/plain"));
  //   const updatedItems = [...resume.primarySkills];
  //   // Swap the positions of the dragged item and the target item.
  //   [updatedItems[draggedIndex], updatedItems[i]] = [
  //     updatedItems[i],
  //     updatedItems[draggedIndex],
  //   ];
  //   dispatch(
  //     setPrimarySkills({
  //       ...resume,
  //       primarySkills: updatedItems,
  //     })
  //   );
  //   saveResumeToDB({
  //     ...resume,
  //     primarySkills: updatedItems,
  //   });
  // };

  //Reorder Redux handleDropExperience array with drag-drop
  // const handleDropExperience = (e: any, i: number) => {
  //   const draggedIndex = parseInt(e.dataTransfer.getData("text/plain"));
  //   const updatedItems = [...resume?.workExperienceArray];
  //   // Swap the positions of the dragged item and the target item.
  //   [updatedItems[draggedIndex], updatedItems[i]] = [
  //     updatedItems[i],
  //     updatedItems[draggedIndex],
  //   ];
  //   if (draggedIndex !== i) {
  //     dispatch(
  //       setWorkExperienceArray({
  //         ...resume,
  //         workExperienceArray: updatedItems,
  //       })
  //     );
  //     saveResumeToDB({
  //       ...resume,
  //       workExperienceArray: updatedItems,
  //     });
  //   }
  // };

  //Reorder Redux handleDropAchievement array with drag-drop
  // const handleDropAchievement = (i: number, ind: number) => {
  //   let draggedIndex: number;
  //   let updatedItems = [];
  //   draggedIndex = insideIndex;
  //   updatedItems = [...resume?.workExperienceArray];
  //   let achievements = [...updatedItems[i].achievements];
  //   const temp = achievements[draggedIndex];
  //   achievements[draggedIndex] = achievements[ind];
  //   achievements[ind] = temp;
  //   let updatedWorkExperience = {
  //     ...updatedItems[i],
  //   };
  //   updatedWorkExperience.achievements = achievements;
  //   // Update the copy of the workExperience in the updatedItems array
  //   updatedItems[i] = updatedWorkExperience;
  //   if (draggedIndex !== ind) {
  //     dispatch(
  //       setWorkExperienceArray({
  //         ...resume,
  //         workExperienceArray: updatedItems,
  //       })
  //     );
  //     saveResumeToDB({
  //       ...resume,
  //       workExperienceArray: updatedItems,
  //     });
  //   }
  // };

  return (
    <div className="first-page relative">
      <div className="flex flex-row absolute top-[90px] h-36 z-30  bg-[#043382] items-center justify-center    w-full ">
        <div className="  z-50 w-48 h-48 xs:w-[120px] xs:h-[80px] sm:w-[120px] sm:h-[80px] border-2 border-[#042B6B] md:w-48 md:h-48 lg:w-48 lg:h-48  text-white bg-gray-800 text-center flex justify-center   rounded-full mx-4  md:mt-0 md:mr-8 items-center ">
          <span className="text-4xl  hover:shadow-md hover:bg-gray-500">
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
        <div className="flex flex-col">
          <h2 className="text-4xl font-bold xs:font-medium text-gray-100 md:text-6xl hover:shadow-md hover:bg-gray-500">
            <EditableField
              value={resume?.name ? resume?.name : "FULL NAME"}
              style={{ width: "fit-content" }}
              onSave={(value: string) => {
                dispatch(setField({ name: "name", value: value }));
                saveResumeToDB({ ...resume, name: value });
              }}
            />
          </h2>
          <h3 className="text-xl xs:text-[16px] md:text-2xl text-gray-100 hover:shadow-md hover:bg-gray-500">
            <EditableField
              value={resume?.jobTitle ? resume?.jobTitle : "JOB TITLE"}
              onSave={(value: string) => {
                dispatch(setField({ name: "jobTitle", value: value }));
                saveResumeToDB({ ...resume, jobTitle: value });
              }}
            />
          </h3>
        </div>
      </div>
      <div className=" flex">
        {/* sidebar */}
        <div className="z-5    w-5/12  flex flex-col pl-3 xs:pl-0 sm:pl-0 md:pl-0 lg:pl-3 xs:pr-4 sm:pr-4 md:pr-4 lg:pr-6 bg-gray-950 text-gray-100  pr-6  pb-8  pt-[280px] xs:pt-[300px] h-[1030px] xs:h-auto">
          {/* contacts */}
          <div className="rounded-3xl border-2 border-blue-900 p-2">
            <h3 className="uppercase text-lg mb-0 xs:text-sm sm:text-sm md:text-md lg:text-lg font-semibold flex flex-row gap-2 items-center">
              {contactIcon}
              Contact
            </h3>
          </div>

          <ul className=" flex flex-col gap-2 mb-4 text-sm break-all pl-0 mt-6">
            <li className="hover:shadow-md mb-[8px] hover:bg-gray-500 text-xs flex flex-row gap-1  items-center">
              <div className="bg-[#043382] rounded-full p-2 mr-3">
                {" "}
                {phoneIcon}
              </div>

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
            <li className="hover:shadow-md mb-[8px] hover:bg-gray-500 flex flex-row gap-1  items-center text-xs">
              <div className="bg-[#043382] rounded-full p-2 mr-3">
                {" "}
                {emailIcon}
              </div>

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

            <li className="hover:shadow-md mb-[8px] hover:bg-gray-500 text-gray-100 flex flex-row gap-1  items-center text-xs">
              {/* <a
                href={
                  resume?.contact?.linkedIn
                    ? resume?.contact?.linkedIn
                    : "https://www.linkedin.com/"
                }
                target="_blank"
                className="text-blue-600"
              > */}
              <div className="bg-[#043382] rounded-full p-2 mr-3 text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="16"
                  height="16"
                  viewBox="0 0 192 192"
                >
                  {
                    <g
                      fill="none"
                      fill-rule="nonzero"
                      stroke="none"
                      stroke-width="1"
                      stroke-linecap="butt"
                      stroke-linejoin="miter"
                      stroke-miterlimit="10"
                      stroke-dasharray=""
                      stroke-dashoffset="0"
                      font-family="none"
                      font-weight="none"
                      font-size="none"
                      text-anchor="none"
                    >
                      <path d="M0,192v-192h192v192z" fill="none"></path>
                      <g fill="#ffffff">
                        <g id="surface1">
                          <path d="M156,0h-120c-19.875,0 -36,16.125 -36,36v120c0,19.875 16.125,36 36,36h120c19.875,0 36,-16.125 36,-36v-120c0,-19.875 -16.125,-36 -36,-36zM59.36539,162.98077h-29.82693l-0.17307,-89.30769h29.82692zM43.70192,61.99038h-0.17308c-9.75,0 -16.03846,-6.72115 -16.03846,-15.08653c0,-8.56731 6.49039,-15.0577 16.41347,-15.0577c9.92308,0 16.00961,6.49038 16.21153,15.0577c0,8.36538 -6.31731,15.08653 -16.41346,15.08653zM162.77885,162.98077h-30.08654v-48.51923c0,-11.74039 -3.11538,-19.73077 -13.61538,-19.73077c-8.01923,0 -12.34615,5.39423 -14.42308,10.61538c-0.77885,1.875 -0.98077,4.44231 -0.98077,7.06731v50.56731h-30.23077l-0.17308,-89.30769h30.23077l0.17308,12.60577c3.86538,-5.97116 10.29808,-14.42308 25.70192,-14.42308c19.09616,0 33.37501,12.46154 33.37501,39.25961v51.86539z"></path>
                        </g>
                      </g>
                    </g>
                  }
                </svg>
              </div>

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

          {/* Skills */}

          {resume?.primarySkills && resume?.primarySkills.length > 0 && (
            <>
              <div className="rounded-3xl border-2 border-blue-900 p-2 my-3 xs:my-8 md:my-8">
                <h3 className="uppercase text-lg mb-0 xs:text-sm sm:text-sm md:text-md lg:text-lg font-semibold flex flex-row gap-2 items-center ">
                  {sparkleIcon}
                  Skills
                </h3>
              </div>

              <ul
                className="pl-4 flex  flex-col gap-2 mb-4 text-[16px]"
                onMouseEnter={() =>
                  !newPrimarySkill && setPrimarySkillAddButtonVisible(true)
                }
                onMouseLeave={() =>
                  !newPrimarySkill && setPrimarySkillAddButtonVisible(false)
                }
              >
                {resume?.primarySkills.map((skill: string, i: number) => (
                  <li
                    className="hover:shadow-md hover:cursor-move parent hover:border-dashed hover:border-gray-500 hover:border-2  hover:bg-gray-500 flex gap-2 items-center   "
                    key={i}
                    onDragStart={(e) =>
                      e.dataTransfer.setData("text/plain", i.toString())
                    }
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => handleDropPrimary(e, i)}
                    draggable
                  >
                    <span
                      className="bg-gray-100 w-[6px]
                     h-[6px] rounded-full"
                    ></span>
                    <EditableField
                      value={skill}
                      onSave={(value: string) => {
                        let updatedSkills = resume.primarySkills.map(
                          (skill: string, index: number) => {
                            if (index === i) {
                              return value;
                            }
                            return skill;
                          }
                        );
                        dispatch(
                          setPrimarySkills({
                            ...resume,
                            primarySkills: updatedSkills,
                          })
                        );
                        saveResumeToDB({
                          ...resume,
                          primarySkills: updatedSkills,
                        });
                      }}
                    />
                    <div
                      onClick={() => {
                        const removeSkill = resume.primarySkills.filter(
                          (item: any) => item !== skill
                        );
                        dispatch(
                          setPrimarySkills({
                            ...resume,
                            primarySkills: removeSkill,
                          })
                        );
                        saveResumeToDB({
                          ...resume,
                          primarySkills: removeSkill,
                        });
                      }}
                      className="w-4 h-4  cursor-pointer child"
                    >
                      {crossIcon1}
                    </div>
                  </li>
                ))}
                {newPrimarySkill ? (
                  <>
                    <div className="w-full rounded-2xl border border-black flex h-9.5">
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
                              addPrimarySkill();
                              setPrimarySkill("");
                            }
                          }
                        }}
                      />
                      <button
                        className="bg-green-500 uppercase h-9 px-2 text-white rounded-r-2xl"
                        onClick={() => {
                          if (primarySkill.trim() !== "") {
                            addPrimarySkill();
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
                      className="bg-red-500  py-1 px-2 text-white rounded-full"
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
              </ul>
            </>
          )}
        </div>
        <div className="w-full flex flex-wrap flex-col px-8 sm:px-2 xs:px-2 md:px-8 lg:px-8  text-gray-950 pb-10 pt-[280px] xs:pt-[300px]">
          {/* Executive Summary */}
          <div className="rounded-3xl  bg-blue-900 py-2 px-6 xs:px-2 sm:px-2 w-[250px] xs:w-[190px] sm:w-[190px] md:w-[250px] lg:w-[250px] mb-6">
            <h3 className="uppercase text-lg mb-0 text-gray-100 font-semibold xs:text-sm sm:text-sm md:text-md lg:text-lg">
              EXECUTIVE SUMMARY
            </h3>
          </div>

          <Regenerate
            handler={getSummary}
            custom_style={"absolute bottom-3 right-2 "}
          >
            <div className="text-sm hover:shadow-md hover:bg-gray-100 group-hover:pb-14">
              <EditableField
                type="textarea"
                value={
                  resume?.summary !== ""
                    ? resume?.summary
                    : streamedSummaryData && streamedSummaryData
                }
                onSave={(value: string) => {
                  dispatch(setSummary(value));
                  saveResumeToDB({ ...resume, summary: value });
                }}
              />
            </div>
          </Regenerate>

          {/* Work Experience */}
          <div className="rounded-3xl  bg-blue-900 py-2 px-6 my-6 xs:px-2 sm:px-2 md:px-6 lg:px-6 w-[250px] xs:w-[190px] sm:w-[190px] md:w-[250px] lg:w-[250px]">
            <h3 className="uppercase text-lg mb-0 font-semibold text-gray-100 xs:text-sm sm:text-sm md:text-md lg:text-lg">
              WORK EXPERIENCE
            </h3>
          </div>

          {resume?.workExperienceArray &&
          resume?.workExperienceArray.length > 0 ? (
            <>
              {resume?.workExperienceArray.map((rec: any, i: number) => {
                return (
                  <div
                    key={i}
                    className={`flex justify-center items-center ${
                      i > 0 ? " ml-[-200px] xs:ml-0 " : "mb-5"
                    }`}
                  >
                    <div
                      key={i}
                      className="hover:border-dashed hover:border-gray-500 hover:cursor-move hover:border-2  flex flex-col w-full  "
                      onMouseEnter={() => setWorkExperienceAddButtonVisible(i)}
                      onMouseLeave={() => setWorkExperienceAddButtonVisible(-1)}
                      onDragStart={(e) =>
                        e.dataTransfer.setData("text/plain", i.toString())
                      }
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => handleDropExperience(e, i)}
                      draggable
                    >
                      <h2
                        className="text-[1.3rem] xs:text-lg sm:text-lg md:text-[1.3rem] lg:text-[1.3rem] hover:shadow-md hover:cursor-text hover:bg-gray-100"
                        style={{
                          fontWeight: "bold",
                          lineHeight: "2rem",
                        }}
                      >
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
                      <h2
                        className="hover:cursor-default text-[1.1rem] xs:text-sm sm:text-sm md:text-[1.1rem] lg:text-[1.1rem]  "
                        style={{
                          lineHeight: "1.5rem",
                        }}
                      >
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
                                (achievement: any, ind: number) => (
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
                                    className="list-disc hover:border-dashed hover:cursor-move hover:border-gray-500 hover:border-[1px] hover:shadow-md relative parent hover:bg-gray-100"
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
                          ) : (
                            <div
                              dangerouslySetInnerHTML={{
                                __html: streamedJDData,
                              }}
                            ></div>
                          )}
                        </Regenerate>
                        {newWorkExperience === i ? (
                          <>
                            <div className="w-full gap-1 rounded-md flex flex-wrap    xs:ml-0">
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
                                  }
                                }}
                              />
                              <button
                                className="bg-green-500 w-full md:w-2/12 uppercase h-9 px-2 text-white rounded-r-md"
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
                              className="bg-red-500 w-full md:w-2/12 py-1 px-2 mt-2 text-white rounded-full"
                            >
                              Cancel
                            </button>
                          </>
                        ) : null}
                        {workExperienceAddButtonVisible === i &&
                        newWorkExperience !== i ? (
                          <div
                            className="border-2 w-full xs:w-full mt-3 sm:w-full  md:w-2/12 lg:w-2/12 border-gray-400 text-center uppercase text-gray-500 cursor-pointer rounded-full py-1  hover:bg-gray-400 hover:text-white transition duration-300 ease-in-out"
                            onClick={() => {
                              setNewWorkExperience(i);
                            }}
                          >
                            + Add
                          </div>
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
            <div className="ml-[-180px] xs:ml-0">
              <div className="rounded-3xl  bg-blue-900 py-2 px-6 my-6 xs:px-2 sm:px-2 md:px-6 lg:px-6 w-[250px] xs:w-[190px] sm:w-[190px] md:w-[250px] lg:w-[250px]">
                <h3 className="uppercase text-lg mb-0 font-semibold text-gray-100 xs:text-sm sm:text-sm md:text-md lg:text-lg ">
                  Education
                </h3>
              </div>

              <ul
                className="pl-0 flex xs:flex-col md:flex-row lg:flex-row w-full  flex-wrap"
                onMouseEnter={() =>
                  !newEducation && setEducationAddButtonVisible(true)
                }
                onMouseLeave={() =>
                  !newEducation && setEducationAddButtonVisible(false)
                }
              >
                {resume?.education.map((education: Education, ind: number) => (
                  <React.Fragment key={education?.id || ind}>
                    <div className="flex flex-col w-[28%] mr-4 xs:w-full md:w-[30%] md:m-2">
                      <li
                        className=" hover:shadow-md hover:cursor-move 
                  parent hover:border-dashed hover:border-gray-500 hover:border-2 
                   hover:bg-gray-100 font-semibold flex uppercase text-sm xs:text-sm md:text-lg justify-between items-center "
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
                      <li className="hover:shadow-md uppercase hover:bg-gray-100 text-base">
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
                      <li className="hover:shadow-md hover:bg-gray-100 text-sm md:text-lg text-gray-800">
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default memo(ResumeTemplate10);
function addPrimary(): any {
  throw new Error("Function not implemented.");
}
