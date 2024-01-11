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
import useGetSummary from "@/hooks/useGetSummary";
import Regenerate from "@/helpers/regenerate";
import EditableField from "@/components/new-dashboard/common/EditableField";
const ResumeTemplate18 = ({
  streamedJDData,
  saveResumeToDB,
}: {
  streamedJDData: string;
  saveResumeToDB: (data?: any) => Promise<void>;
}) => {
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

  const [streamedSummaryData, setStreamedSummaryData] = useState("")

  const { getSummary } = useGetSummary(setStreamedSummaryData);

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
    <div className="w-full first-page relative text-gray-900">
      <div className="flex absolute text-center top-0 w-full xs:w-8/12 md:w-8/12 items-center  justify-center py-8 xs:py-2 md:py-8">
        <div className="flex flex-col px-1 py-8">
          <h2 className="text-2xl md:text-5xl font-serif text-center font-bold hover:shadow-md hover:bg-gray-100">
            <EditableField
              value={resume?.name ? resume?.name : "FULL NAME"}
              style={{ width: "fit-content" }}
              onSave={(value: string) => {
                dispatch(setField({ name: "name", value: value }));
                saveResumeToDB({ ...resume, name: value });
              }}
            />
          </h2>
          <h3 className="text-[16px] md:text-2xl text-[#008cff] text-center hover:shadow-md mt-2 w-12/12 hover:bg-gray-100">
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
      <div className="flex">
        <div className="w-full flex flex-col px-4 md:px-8 pt-[13rem] xs:pt-[10rem] md:pt-[13rem] ">
          {/* Executive Summary */}
          <span className="border-stylee w-full h-0 my-3 xs:my-0 md:my-3"></span>
          <h3 className="uppercase text-xl xs:text-lg  font-semibold border-[#444440] border-b-2  rounded-sm text-gray-900 w-full py-1">
            EXECUTIVE SUMMARY
          </h3>
          <span className="border-stylee w-full h-0  my-3"></span>

          <Regenerate handler={getSummary}>
            <div className="text-sm hover:shadow-md hover:bg-gray-100">
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
                  <div
                    key={i}
                    className="hover:border-dashed hover:border-gray-500 hover:cursor-move hover:border-2"
                    onMouseEnter={() => setWorkExperienceAddButtonVisible(i)}
                    onMouseLeave={() => setWorkExperienceAddButtonVisible(-1)}
                    onDragStart={(e) =>
                      e.dataTransfer.setData("text/plain", i.toString())
                    }
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => handleDropExperience(e, i)}
                    draggable
                  >
                    <div className="flex">
                      {/* <div className="flex ">
                        <span className="w-4 h-4 bg-[#745237] rounded-full"></span>
                        <span className="h-13 border border-[#745237] mx-2 relative -left-[17px]"></span>
                      </div> */}

                      <div>
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
                                let updatedExp =
                                  resume?.workExperienceArray.map(
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
                                let updatedExp =
                                  resume?.workExperienceArray.map(
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
                                let updatedExp =
                                  resume?.workExperienceArray.map(
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
          {resume?.education && (
            <>
              <span
                className="border-stylee w-full h-0 
           my-3"
              ></span>
              <h3 className="uppercase text-lg flex items-center gap-2 font-semibold border-[#444440] border-b-2  rounded-sm text-gray-900 w-full py-1">
                {educationIcon}
                Education
              </h3>
              <span
                className="border-stylee w-full h-0 
           my-3"
              ></span>
              <ul
                className="pl-0 flex xs:flex-col md:flex-row lg:flex-row flex-wrap xs:px-2 md:px-0 text-gray-800  w-full"
                onMouseEnter={() =>
                  !newEducation && setEducationAddButtonVisible(true)
                }
                onMouseLeave={() =>
                  !newEducation && setEducationAddButtonVisible(false)
                }
              >
                {resume?.education.map((education: Education, ind: number) => (
                  <React.Fragment key={education?.id || ind}>
                    <div className="w-[30%] xs:w-full md:w-[30%] lg:w-[30%] md:m-2  ">
                      <li
                        className=" hover:shadow-md hover:cursor-move 
                  parent hover:border-dashed hover:border-gray-500 hover:border-2 
                   hover:bg-gray-100 font-semibold  hover:text-black flex uppercase text-md   items-center "
                      >
                        <span className="w-1.5 h-1.5 bg-gray-800 rounded-full mr-3"></span>
                        <div className="flex flex-row w-full items-center justify-between">
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
                        </div>
                      </li>
                      <li className="hover:shadow-md uppercase hover:text-black text-gray-800 hover:tet-black hover:bg-gray-100 text-base">
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
                      <li className="hover:shadow-md text-gray-800 hover:text-black hover:bg-gray-100 text-sm ">
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
                      <li className="mb-4 text-xs text-gray-800 ">
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
        <div className=" w-4/12 md:w-1/3 flex flex-col relative inset-0 items-center md:px-6  bg-[#22405c]">
          <span className="w-full bg-[#182d40] absolute md:-mx-6 h-4"></span>
          <div className="border-[.5rem] xs:border-[2px] md:border-[.5rem] border-[#395168]   text-gray-800 mt-[3rem] bg-[#182d40] text-center flex justify-center items-center rounded-md">
            <div className=" w-36 h-36 xs:w-[5.5rem] xs:h-[5.5rem]   md:w-36 lg:h-36 lg:w-36 text-[#F1F1F1] flex justify-center items-center bg-[#182d40]  rounded-md ">
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

          {/* contacts */}
          <span className="border-stylee w-full h-0 my-3"></span>
          <h3 className="uppercase xs:px-2 text-lg xs:text-[14px]  md:text-lg font-semibold w-full  border-b-2 border-white pb-2 text-white  py-1 rounded-sm flex items-center  flex-row gap-2 ">
            {contactIcon}
            Contact
          </h3>
          <span className="border-stylee w-full h-0 my-3"></span>
          <ul className=" flex flex-col xs:px-2 gap-3 w-full mb-4 text-sm text-gray-300 break-all pl-0">
            <li className="hover:shadow-md hover:bg-gray-500 hover:text-black text-xs  flex flex-row gap-1 ">
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
            <li className="hover:shadow-md hover:text-black hover:bg-gray-100 flex flex-row gap-1  items-center text-xs">
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
            <li className="hover:shadow-md hover:text-black hover:bg-gray-100 text-gray-400 flex flex-row gap-1  items-center text-xs">
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
              <span className="border-stylee w-full h-0  my-1"></span>
              <h3 className="uppercase text-lg xs:px-3 md:px-0  xs:text-[14px] md:text-lg font-semibold w-full  border-b-2 border-white pb-2 text-white  py-1 rounded-sm flex items-center  flex-row gap-2 ">
                {sparkleIcon}
                Skills
              </h3>
              <span className="border-stylee w-full h-0  my-1"></span>
              <ul
                className="pl-0 flex  flex-col xs:px-2 md:px-0 gap-1 mb-4 text-gray-300 w-full text-sm "
                onMouseEnter={() =>
                  !newPrimarySkill && setPrimarySkillAddButtonVisible(true)
                }
                onMouseLeave={() =>
                  !newPrimarySkill && setPrimarySkillAddButtonVisible(false)
                }
              >
                {/* <li className="font-semibold  uppercase">primary</li> */}
                {resume?.primarySkills.map((skill: string, i: number) => (
                  <li
                    className="hover:shadow-md hover:cursor-move parent xs:w-12/12 hover:text-black hover:border-dashed hover:border-gray-500 hover:border-2  hover:bg-gray-100 flex items-center  "
                    key={i}
                    onDragStart={(e) =>
                      e.dataTransfer.setData("text/plain", i.toString())
                    }
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => handleDropPrimary(e, i)}
                    draggable
                  >
                    <span className="w-1.5 h-1.5 bg-gray-300 rounded-full mr-3"></span>
                    <div className="flex flex-row w-full items-center justify-between">
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
                    className="border-2 w-full xs:w-full mt-3 sm:w-full  md:w-2/12 lg:w-2/12 border-gray-400 text-center uppercase text-gray-500 cursor-pointer rounded-full py-1  hover:bg-gray-400 hover:text-white transition duration-300 ease-in-out"
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
export default memo(ResumeTemplate18);
function addPrimary(): any {
  throw new Error("Function not implemented.");
}
