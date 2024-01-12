"use client";
import { memo, useEffect, useState } from "react";
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
  linkedInIcon,
  phoneIcon,
  sparkleIcon,
} from "@/helpers/iconsProvider";
import Regenerate from "@/helpers/regenerate";
import useGetSummary from "@/hooks/useGetSummary";
import EditableField from "@/components/new-dashboard/common/EditableField";
import useSingleJDGenerate from "@/hooks/useSingleJDGenerate";
import useSaveResumeToDB from "@/hooks/useSaveToDB";
import useDragAndDrop from "@/hooks/useDragAndDrop";

const ResumeTemplate3 = () => {
  const dispatch = useDispatch();
  const resume = useSelector((state: any) => state.resume);
  const [newPrimarySkill, setNewPrimarySkill] = useState(false);
  const [newWorkExperience, setNewWorkExperience] = useState<number>();
  const [newAchievement, setNewAchievement] = useState("");
  const [primarySkillAddButtonVisible, setPrimarySkillAddButtonVisible] =
    useState(false);

  const [workExperienceAddButtonVisible, setWorkExperienceAddButtonVisible] =
    useState<number>();
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
    <div className="first-page text-gray-900">
      <div className="flex">
        <div className="flex flex-col w-10/12 p-8">
          <h2 className="text-4xl xs:text-2xl md:4xl lg:text-6xl hover:shadow-md hover:bg-gray-100">
            <EditableField
              value={resume?.name ? resume?.name : "FULL NAME"}
              style={{ width: "fit-content" }}
              onSave={(value: string) => {
                dispatch(setField({ name: "name", value: value }));
                saveResumeToDB({ ...resume, name: value });
              }}
            />
          </h2>
          <h3 className="text-sm xs:text-sm md:text-lg lg:text-lg hover:shadow-md hover:bg-gray-100">
            <EditableField
              value={resume?.jobTitle ? resume?.jobTitle : "JOB TITLE"}
              onSave={(value: string) => {
                dispatch(setField({ name: "jobTitle", value: value }));
                saveResumeToDB({ ...resume, jobTitle: value });
              }}
            />
          </h3>
        </div>
        <div>
          <div className="  w-32 h-32 xs:w-24 xs:h-24 md:w-32 md:h-32 text-white bg-gray-800 text-center flex justify-center items-center  rounded-full mx-4 my-4 mr-8 xs:mr-4 md:mr-8 ">
            <span className="text-4xl  hover:shadow-md hover:bg-gray-100">
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
      <div className=" flex  ">
        <div className="w-full flex flex-wrap flex-col px-4 md:px-8  m-2">
          {/* Executive Summary */}
          <span className="border-stylee w-full h-0 border !border-gray-500 my-3"></span>
          <h3 className="uppercase text-sm md:text-lg font-semibold">
            EXECUTIVE SUMMARY
          </h3>
          <span className="border-stylee w-full h-0 border !border-gray-500 my-3"></span>

          <Regenerate handler={getSummary}>
            <div className="text-sm xs:text-sm md:text-lg lg:text-lg hover:shadow-md hover:bg-gray-100">
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
          <span className="border-stylee w-full h-0 border !border-gray-500 my-3"></span>
          <h3 className="uppercase text-sm md:text-lg font-semibold">
            WORK EXPERIENCE
          </h3>
          <span className="border-stylee w-full h-0 border !border-gray-500 my-3"></span>

          {resume?.workExperienceArray &&
          resume?.workExperienceArray.length > 0 ? (
            <>
              {resume?.workExperienceArray.map((rec: any, i: number) => {
                return (
                  <div
                    key={i}
                    className="hover:border-dashed hover:border-gray-500 hover:cursor-move hover:border-2 w-full flex flex-col flex-wrap"
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
                      className="hover:shadow-md hover:cursor-text hover:bg-gray-100"
                      style={{
                        fontSize: "1.3rem",
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
                      className="hover:cursor-default"
                      style={{
                        fontSize: "1.1rem",
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
                      >
                        {rec?.achievements && i !== regeneratedRecordIndex ? (
                          <ul className="pl-0 flex flex-col gap-1 text-sm xs:text-sm md:text-lg lg:text-lg">
                            {rec?.achievements.map(
                              (achievement: any, ind: number) => (
                                <li
                                  onDragStart={(e) => {
                                    setInsideIndex(ind);
                                  }}
                                  onDragOver={(e) => e.preventDefault()}
                                  onDrop={(e) => {
                                    handleDropAchievement(i, ind, insideIndex);
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
                              className="bg-green-500 w-2/12 xs:w-full md:w-2/12 uppercase h-9 px-2 text-white rounded-r-md"
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
                            className="bg-red-500 w-2/12 xs:w-full md:w-2/12 py-1 px-2 mt-2 text-white rounded-full"
                          >
                            Cancel
                          </button>
                        </>
                      ) : null}
                      {workExperienceAddButtonVisible === i &&
                      newWorkExperience !== i ? (
                        <div
                          className="border-2 w-2/12 mt-3 xs:w-full md:w-2/12 border-gray-400 text-center uppercase text-gray-500 cursor-pointer rounded-full py-1  hover:bg-gray-400 hover:text-white transition duration-300 ease-in-out"
                          onClick={() => {
                            setNewWorkExperience(i);
                          }}
                        >
                          + Add
                        </div>
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
        </div>
        <div className=" w-4/12 xs:3/12 md:w-4/12 flex flex-col  pl-2 m-2 h-fit border-red-  pr-2  ">
          {/* contacts */}
          <span className="border-stylee w-full h-0 border !border-gray-500 my-3"></span>
          <h3 className="uppercase text-sm md:text-lg font-semibold flex flex-row gap-2 items-center">
            {contactIcon}
            Contact
          </h3>
          <span className="border-stylee w-full h-0 border !border-gray-500 my-3"></span>
          <ul className=" flex flex-col gap-3 mb-4 text-sm xs:text-sm md:text-lg lg:text-lg break-all pl-0">
            <li className="hover:shadow-md hover:bg-gray-100 text-sm flex flex-row gap-1  items-center">
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
            <li className="hover:shadow-md hover:bg-gray-100 flex flex-row gap-1  items-center text-sm">
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
            <li className="hover:shadow-md hover:bg-gray-100 text-blue-600 flex flex-row gap-1  items-center text-sm">
              {/* <a
                href={
                  resume?.contact?.linkedIn
                    ? resume?.contact?.linkedIn
                    : "https://www.linkedin.com/"
                }
                target="_blank"
                className="text-blue-600"
              > */}
              {linkedInIcon}
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
              <span className="border-stylee w-full h-0 border !border-gray-500 my-3"></span>
              <h3 className="uppercase text-sm md:text-lg font-semibold flex flex-row gap-2 items-center">
                {sparkleIcon}
                Skills
              </h3>
              <span className="border-stylee w-full h-0 border !border-gray-500 my-3"></span>
              <ul
                className="pl-0 flex  flex-col gap-1 mb-4 text-sm xs:text-sm md:text-lg lg:text-lg"
                onMouseEnter={() =>
                  !newPrimarySkill && setPrimarySkillAddButtonVisible(true)
                }
                onMouseLeave={() =>
                  !newPrimarySkill && setPrimarySkillAddButtonVisible(false)
                }
              >
                <li className="font-semibold  uppercase">primary</li>
                {resume?.primarySkills.map((skill: string, i: number) => (
                  <li
                    className="hover:shadow-md hover:cursor-move parent hover:border-dashed hover:border-gray-500 hover:border-2  hover:bg-gray-100 flex justify-between items-center"
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
                    className="border-2 border-gray-400  text-center uppercase text-gray-500 cursor-pointer rounded-full py-1 px-4 hover:bg-gray-400 hover:text-white transition duration-300 ease-in-out"
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
      </div>
    </div>
  );
};
export default memo(ResumeTemplate3);
function addPrimary(): any {
  throw new Error("Function not implemented.");
}
