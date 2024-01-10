"use client";
import { memo, useEffect, useRef, useState } from "react";
import { Education } from "@/store/userDataSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  setBasicInfo,
  setField,
  setPrimarySkills,
  setProfessionalSkills,
  setSecondarySkills,
  setSummary,
  setWorkExperienceArray,
} from "@/store/resumeSlice";
import {
  contactIcon,
  crossIcon1,
  educationIcon,
  emailIcon,
  linkedInIcon,
  phoneIcon,
  sparkleIcon,
} from "@/helpers/iconsProvider";
import useGetSummary from "@/helpers/useGetSummary";
import Regenerate from "@/helpers/regenerate";
import EditableField from "@/components/new-dashboard/common/EditableField";
const ResumeTemplate11 = ({
  streamedSummaryData,
  streamedJDData,
  saveResumeToDB,
}: {
  streamedSummaryData: string;
  streamedJDData: string;
  saveResumeToDB: (data?: any) => Promise<void>;
}) => {
  const { getSummary } = useGetSummary();

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
  const addSecondarySkill = () => {
    const secondarySkills = resume?.secondarySkills;
    const updatedSkills = [...secondarySkills];
    updatedSkills.push(secondarySkill);
    dispatch(setSecondarySkills({ secondarySkills: updatedSkills }));
    saveResumeToDB({
      ...resume,
      secondarySkills: updatedSkills,
    });
  };
  const addProfessionalSkill = () => {
    const professionalSkills = resume?.professionalSkills;
    const updatedSkills = [...professionalSkills];
    updatedSkills.push(professionalSkill);

    dispatch(setProfessionalSkills({ professionalSkills: updatedSkills }));
    saveResumeToDB({
      ...resume,
      professionalSkills: updatedSkills,
    });
  };
  //Reorder Redux PrimarySkills array with drag-drop
  const handleDropPrimary = (e: any, i: number) => {
    const draggedIndex = parseInt(e.dataTransfer.getData("text/plain"));
    const updatedItems = [...resume.primarySkills];
    // Swap the positions of the dragged item and the target item.
    [updatedItems[draggedIndex], updatedItems[i]] = [
      updatedItems[i],
      updatedItems[draggedIndex],
    ];
    dispatch(
      setPrimarySkills({
        ...resume,
        primarySkills: updatedItems,
      })
    );
    saveResumeToDB({
      ...resume,
      primarySkills: updatedItems,
    });
  };
  //Reorder Redux SecondarySkills array with drag-drop
  const handleDropSecondary = (e: any, i: number) => {
    const draggedIndex = parseInt(e.dataTransfer.getData("text"));
    const updatedItems = [...resume.secondarySkills];
    // Swap the positions of the dragged item and the target item.
    [updatedItems[draggedIndex], updatedItems[i]] = [
      updatedItems[i],
      updatedItems[draggedIndex],
    ];
    dispatch(
      setSecondarySkills({
        ...resume,
        secondarySkills: updatedItems,
      })
    );
    saveResumeToDB({
      ...resume,
      secondarySkills: updatedItems,
    });
  };
  //Reorder Redux ProfessionalSkills array with drag-drop
  const handleDropProfessional = (e: any, i: number) => {
    const draggedIndex = parseInt(e.dataTransfer.getData("text/plain"));
    const updatedItems = [...resume.professionalSkills];
    // Swap the positions of the dragged item and the target item.
    [updatedItems[draggedIndex], updatedItems[i]] = [
      updatedItems[i],
      updatedItems[draggedIndex],
    ];
    dispatch(
      setProfessionalSkills({
        ...resume,
        professionalSkills: updatedItems,
      })
    );
    saveResumeToDB({
      ...resume,
      professionalSkills: updatedItems,
    });
  };
  //Reorder Redux handleDropExperience array with drag-drop
  const handleDropExperience = (e: any, i: number) => {
    const draggedIndex = parseInt(e.dataTransfer.getData("text/plain"));
    const updatedItems = [...resume?.workExperienceArray];
    // Swap the positions of the dragged item and the target item.
    [updatedItems[draggedIndex], updatedItems[i]] = [
      updatedItems[i],
      updatedItems[draggedIndex],
    ];
    if (draggedIndex !== i) {
      dispatch(
        setWorkExperienceArray({
          ...resume,
          workExperienceArray: updatedItems,
        })
      );
      saveResumeToDB({
        ...resume,
        workExperienceArray: updatedItems,
      });
    }
  };
  //Reorder Redux handleDropEducation array with drag-drop
  const handleDropEducation = (e: any, i: number) => {
    // const draggedIndex = parseInt(e.dataTransfer.getData("text/plain"));
    // const updatedItems = [...resume?.educationArray];
    // // Swap the positions of the dragged item and the target item.
    // [updatedItems[draggedIndex], updatedItems[i]] = [
    //   updatedItems[i],
    //   updatedItems[draggedIndex],
    // ];
    // if (draggedIndex !== i) {
    //   // dispatch(
    //   //   setEducationArray({
    //   //     ...resume,
    //   //     educationArray: updatedItems,
    //   //   })
    //   // );
    //   saveResumeToDB({
    //     ...resume,
    //     educationArray: updatedItems,
    //   });
    // }
  };
  //Reorder Redux handleDropAchievement array with drag-drop
  const handleDropAchievement = (i: number, ind: number) => {
    let draggedIndex: number;
    let updatedItems = [];
    draggedIndex = insideIndex;
    updatedItems = [...resume?.workExperienceArray];
    let achievements = [...updatedItems[i].achievements];
    const temp = achievements[draggedIndex];
    achievements[draggedIndex] = achievements[ind];
    achievements[ind] = temp;
    let updatedWorkExperience = {
      ...updatedItems[i],
    };
    updatedWorkExperience.achievements = achievements;
    // Update the copy of the workExperience in the updatedItems array
    updatedItems[i] = updatedWorkExperience;
    if (draggedIndex !== ind) {
      dispatch(
        setWorkExperienceArray({
          ...resume,
          workExperienceArray: updatedItems,
        })
      );
      saveResumeToDB({
        ...resume,
        workExperienceArray: updatedItems,
      });
    }
  };

  return (
    <div className="first-page relative">
      <div className="flex flex-row absolute top-[90px] xs:top-[50px] sm:top-[50px] md:top-[90px] lg:top-[90px]  h-[168px] xs:h-[114px] sm:h-[114px] md:h-[168px] lg:h-[168px]  bg-[#F4D644] items-center justify-center    w-[85%]  left-[150px] xs:left-[141px] sm:left-[141px] md:left-[150px] lg:left-[150px] xs:w-[58%] sm:w-[58%] md:w-[85%] lg:w-[85%]">
        <div className="flex flex-col">
          <h2 className="text-4xl xs:text-lg sm:text-lg md:text-4xl   hover:shadow-md font-bold pb-2 text-gray-950 hover:bg-gray-100">
            <EditableField
              value={resume?.name ? resume?.name : "FULL NAME"}
              style={{ width: "fit-content" }}
              onSave={(value: string) => {
                dispatch(setField({ name: "name", value: value }));
                saveResumeToDB({ ...resume, name: value });
              }}
            />
          </h2>
          <h3 className="text-[20px] xs:text-sm sm:text-sm md:text-[20px]  hover:shadow-md hover:bg-gray-100 text-gray-950">
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

        <div className="  w-5/12 md:w-1/3 flex flex-col pl-3 md:pl-8 bg-[#2A2E36] text-gray-100  pr-6  py-8 h-[1130px] xs:h-auto  pt-[40px] item">
          <div className="  z-50 w-48 h-60 xs:w-[8rem] xs:h-[8rem] sm:w-[8rem] sm:h-[8rem] md:w-48 md:h-60  lg:w-48 lg:h-60 border-[8px] border-gray-100  text-white bg-gray-800 text-center flex justify-center   mx-4 xs:mx-0 sm:mx-0 md:mx-4 lg:mx-4  md:mt-0 md:mr-8 items-center mb-10">
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
          {/* contacts */}

          <h3 className="uppercase text-lg font-bold flex flex-row gap-2 items-center">
            Contact
          </h3>
          <span className="border border-[#F4D644] w-[110%] mt-2"></span>

          <ul className=" flex flex-col gap-2 mb-4 text-sm break-all pl-0 mt-6">
            <li className="hover:shadow-md mb-[8px] hover:bg-gray-500 text-xs flex flex-row gap-1  items-center">
              <div className="bg-[#F4D644]  p-2 mr-3 text-gray-950">
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
              <div className="bg-[#F4D644] text-gray-950  p-2 mr-3">
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

            <li className="hover:shadow-md mb-[8px] hover:bg-gray-500 text-blue-600 flex flex-row gap-1  items-center text-xs">
              {/* <a
                href={
                  resume?.contact?.linkedIn
                    ? resume?.contact?.linkedIn
                    : "https://www.linkedin.com/"
                }
                target="_blank"
                className="text-blue-600"
              > */}
              <div className="bg-[#F4D644]  p-2 mr-3 text-white">
                {linkedInIcon}
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
              <div className="mt-4 mb-4 flex flex-col">
                <h3 className="uppercase text-lg  flex flex-row gap-2 items-center font-bold">
                  Skills
                </h3>
                <span className="border border-[#F4D644] w-[110%] mt-2"></span>
              </div>

              <ul
                className="pl-0 flex  flex-col gap-4 mb-4 text-sm"
                onMouseEnter={() =>
                  !newPrimarySkill && setPrimarySkillAddButtonVisible(true)
                }
                onMouseLeave={() =>
                  !newPrimarySkill && setPrimarySkillAddButtonVisible(false)
                }
              >
                {resume?.primarySkills.map((skill: string, i: number) => (
                  <li
                    className="hover:shadow-md hover:cursor-move parent hover:border-dashed hover:border-gray-500 hover:border-2  hover:bg-gray-500 flex  items-center   "
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
        <div className="w-full flex flex-wrap flex-col px-8 xs:px-2 sm:px-2 md:px-8 lg:px-8  text-gray-950 pb-10 pt-[300px] xs:pt-[154px] sm:pt-[154px] md:pt-[300px] lg:pt-[300px]  ">
          {/* Executive Summary */}
          <div className=" flex flex-col w-full  my-6">
            <h3 className="uppercase text-lg xs:text-[14px] sm:text[14px] md:text-lg lg:text-lg font-bold">
              EXECUTIVE SUMMARY
            </h3>
            <span className="border border-[#F4D644]  mt-2"></span>
          </div>

          <Regenerate handler={getSummary}>
            <div className="text-sm  hover:shadow-md hover:bg-gray-100">
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
          <div className="flex flex-col my-6 w-full">
            <h3 className="uppercase text-lg xs:text-[14px] sm:text[14px] md:text-lg lg:text-lg font-bold text-gray-950">
              WORK EXPERIENCE
            </h3>
            <span className="border border-[#F4D644]  mt-2"></span>
          </div>

          {resume?.workExperienceArray &&
          resume?.workExperienceArray.length > 0 ? (
            <>
              {resume?.workExperienceArray.map((rec: any, i: number) => {
                return (
                  <div
                    key={i}
                    className={`flex justify-center items-center ${
                      i > 0
                        ? "w-[100vw] ml-[-250px] xs:ml-0 xs:w-full mt-8"
                        : "mb-5"
                    }`}
                  >
                    <div className="w-[5%] pr-5 xs:pr-0 sm:pr-0 md:pr-5 lg:pr-5  lg:-mx-5 pt-2   h-full flex flex-col items-center  gap-1">
                      <div className="p-1 rounded-full bg-gray-100 border-2 border-gray-500 "></div>
                      {resume?.workExperienceArray.length - 1 !== i && (
                        <div className="h-full w-[2px] bg-gray-500"></div>
                      )}
                    </div>
                    <div
                      key={i}
                      className="hover:border-dashed hover:border-gray-500 hover:cursor-move hover:border-2  flex flex-col w-[95%] ml-[16px] xs:ml-[10px] sm:ml-[10px] md:ml-[16px] lg:ml-[16px]"
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
                        className="hover:shadow-md hover:cursor-text hover:bg-gray-100 text-[1.3rem] xs:text-[1rem] sm:text[1rem] md:text-[1.3rem] lg:text-[1.3rem] font-bold"
                        style={{
                          // fontSize: "1.3rem",
                          fontWeight: "bold",
                          // lineHeight: "2rem",
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
                      <h2 className="hover:cursor-default text-[1.1rem] xs:text-[0.8rem] sm:text[0.8rem] md:text-[1.1rem] lg:text-[1.1rem]">
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
                        {rec?.achievements && (
                          <ul className="pl-0 flex flex-col gap-1 text-sm  xs:text-[12px] sm:text[12px] md:text-sm lg:text-sm">
                            {rec?.achievements.map(
                              (achievement: any, ind: number) => (
                                <li
                                  onDragStart={(e) => {
                                    setInsideIndex(ind);
                                  }}
                                  onDragOver={(e) => e.preventDefault()}
                                  onDrop={(e) => {
                                    handleDropAchievement(i, ind);
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
            <div className="ml-[-200px] xs:ml-0">
              <div className="flex flex-col my-6">
                <h3 className="uppercase text-lg font-semibold flex flex-row gap-2 items-center text-gray-950 ">
                  Education
                </h3>
                <span className="border border-[#F4D644] mt-2"></span>
              </div>

              <ul
                className="flex xs:flex-col md:flex-row lg:flex-row w-full  flex-wrap pl-0"
                onMouseEnter={() =>
                  !newEducation && setEducationAddButtonVisible(true)
                }
                onMouseLeave={() =>
                  !newEducation && setEducationAddButtonVisible(false)
                }
              >
                {resume?.education.map((education: Education, ind: number) => (
                  <React.Fragment key={education?.id || ind}>
                    <div className="flex flex-col w-[30%] xs:w-full md:w-[30%]">
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
                      <li className="hover:shadow-md uppercase hover:bg-gray-100 text-base xs:text-[13px] sm:text[13px] md:text-base lg:text-base ">
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
                      <li className="hover:shadow-md hover:bg-gray-100 text-sm xs:text-[11px] sm:text[11px] md:text-sm lg:text-sm text-gray-500">
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
                      <li className="mb-4 text-xs text-gray-500 ">
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
export default memo(ResumeTemplate11);
function addPrimary(): any {
  throw new Error("Function not implemented.");
}
