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
import Image from "next/image";
import Regenerate from "@/helpers/regenerate";
import useGetSummary from "@/hooks/useGetSummary";
import EditableField from "@/components/new-dashboard/common/EditableField";

const ResumeTemplate1 = ({
  streamedSummaryData,
  streamedJDData,
  saveResumeToDB,
}: {
  streamedSummaryData: string;
  streamedJDData: string;
  saveResumeToDB: (data?: any) => Promise<void>;
}) => {
  const dispatch = useDispatch();
  const resume = useSelector((state: any) => state.resume);
  const [newPrimarySkill, setNewPrimarySkill] = useState(false);
  const [newWorkExperience, setNewWorkExperience] = useState<number>();
  const [newAchievement, setNewAchievement] = useState("");
  const [newEducation, setNewEducation] = useState(false);
  const [primarySkillAddButtonVisible, setPrimarySkillAddButtonVisible] =
    useState(false);
  const [secondarySkillAddButtonVisible, setSecondarySkillAddButtonVisible] =
    useState(false);
  const { getSummary } = useGetSummary({});

  const [
    professionalSkillAddButtonVisible,
    setProfessionalSkillAddButtonVisible,
  ] = useState(false);
  const imageRef = useRef<any>();

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

  const [image, setImage] = useState<any>(null);

  const handleImageChange = (e: any) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 1048576) {
        // Check if file size is more than 1MB
        alert("File size exceeds the limit of 1MB.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image: any = reader.result; // Convert the image blob to base64
        setImage(base64Image); // Set the base64 image in the state
      };
      reader.readAsDataURL(selectedFile); // Read the file as a data URL (base64)
    }
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

  const triggerInputClick = () => {
    if (imageRef.current) {
      imageRef.current.click();
    }
  };

  return (
    <div className="w-full first-page  text-gray-900">
      <div className="flex">
        <div className="flex flex-col w-10/12 p-8">
          <h2 className="text-4xl xs:text-2xl md:4xl lg:text-6xl  hover:shadow-md hover:bg-gray-100">
            <EditableField
              value={resume?.name ? resume?.name : "FULL NAME"}
              style={{ width: "fit-content" }}
              onSave={(value: string) => {
                dispatch(setField({ name: "name", value: value }));
                saveResumeToDB({ ...resume, name: value });
              }}
            />
          </h2>
          <h3 className="text-2xl xs:text-[16px] md:text-2xl lg:text-2xl hover:shadow-md hover:bg-gray-100">
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
          {/* <div onClick={triggerInputClick} className="  w-32 h-32 xs:w-24 xs:h-24 md:w-32 md:h-32 text-white bg-gray-800 text-center flex justify-center items-center  rounded-full mx-4 my-4 mr-8 xs:mr-4 md:mr-8 ">
            <span className="text-4xl  hover:shadow-md hover:bg-gray-100">
              <input ref={imageRef} className="hidden" type="file" accept="image/*" onChange={handleImageChange} />
              {image && <Image src={image} width={100} height={100} alt="Uploaded" />}

            </span>
          </div> */}
          {/* <button onClick={triggerInputClick} >
            <input ref={imageRef} className="hidden" type="file" accept="image/*" onChange={handleImageChange} />
            Uplaod
          </button> */}
        </div>
      </div>
      <div className="">
        <div className=" w-full flex flex-col pl-8 xs:pl-3 md:pl-8 lg:pl-8 pr-6">
          {/* contacts */}
          <h3 className="uppercase text-lg font-semibold flex flex-row gap-2 items-center">
            {contactIcon}
            Contact
          </h3>
          <ul className=" flex flex-row xs:flex-col md:flex-row justify-between mb-4 text-lg xs:text-sm md:text-lg lg:text-lg break-all pl-0">
            <li className="hover:shadow-md hover:bg-gray-100  text-sm flex flex-row gap-1  items-center">
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
              <h3 className="uppercase text-lg font-semibold flex flex-row gap-2 items-center">
                {sparkleIcon}
                Skills
              </h3>
              <ul
                className="pl-0 flex flex-col gap-1 mb-4 text-lg xs:text-sm md:text-lg lg:text-lg"
                onMouseEnter={() =>
                  !newPrimarySkill && setPrimarySkillAddButtonVisible(true)
                }
                onMouseLeave={() =>
                  !newPrimarySkill && setPrimarySkillAddButtonVisible(false)
                }
              >
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

          {/* Education */}
          {resume?.education && (
            <>
              <h3 className="uppercase text-lg font-semibold flex flex-row gap-2 items-center">
                {educationIcon}
                Education
              </h3>
              <ul
                className="pl-0 flex flex-col"
                onMouseEnter={() =>
                  !newEducation && setEducationAddButtonVisible(true)
                }
                onMouseLeave={() =>
                  !newEducation && setEducationAddButtonVisible(false)
                }
              >
                {resume?.education.map((education: Education, ind: number) => (
                  <React.Fragment key={education?.id || ind}>
                    <li
                      className=" hover:shadow-md hover:cursor-move 
                  parent hover:border-dashed hover:border-gray-500 hover:border-2 
                   hover:bg-gray-100 font-semibold flex uppercase text-md  justify-between items-center "
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
                    <li className="hover:shadow-md hover:bg-gray-100 text-lg xs:text-sm md:text-lg lg:text-lg text-gray-800">
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
                  </React.Fragment>
                ))}
              </ul>
            </>
          )}
        </div>
        <div className="w-full flex flex-col px-8 xs:px-4 md:px-8 lg:px-8">
          {/* Executive Summary */}
          <h3 className="uppercase text-lg font-semibold">EXECUTIVE SUMMARY</h3>
          <span className="border-stylee w-full h-0 border !border-gray-500 my-3"></span>
          <Regenerate handler={getSummary}>
            <div className="text-lg xs:text-sm md:text-lg lg:text-lg  hover:shadow-md hover:bg-gray-100">
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
          <h3 className="uppercase text-lg font-semibold">WORK EXPERIENCE</h3>
          <span className="border-stylee w-full h-0 border !border-gray-500 my-3"></span>

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
                      {rec?.achievements && (
                        <ul className="pl-0 flex flex-col gap-1 text-lg xs:text-sm md:text-lg lg:text-lg">
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
                                                (ach: any, achInd: number) => {
                                                  if (achInd === ind) {
                                                    return value;
                                                  }
                                                  return ach;
                                                }
                                              );
                                            return {
                                              ...exp,
                                              achievements: updatedAchievements,
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
                                      workExperienceArray: workExperienceArray,
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
                        <div
                          className="border-2 w-2/12 mt-3 xs:w-full md:w-2/12 lg:w-2/12 border-gray-400 text-center uppercase text-gray-500 cursor-pointer rounded-full py-1  hover:bg-gray-400 hover:text-white transition duration-300 ease-in-out"
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
      </div>
    </div>
  );
};
export default memo(ResumeTemplate1);
function addPrimary(): any {
  throw new Error("Function not implemented.");
}
