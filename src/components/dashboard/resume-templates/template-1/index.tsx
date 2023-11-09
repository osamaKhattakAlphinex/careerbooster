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
  crossIcon,
  educationIcon,
  emailIcon,
  linkedInIcon,
  phoneIcon,
  sparkleIcon,
} from "@/helpers/iconsProvider";

const EditableField = ({
  value,
  type,
  rows,
  onSave,
  style,
}: {
  value: string;
  type?: string;
  rows?: number;
  style?: any;
  onSave: (value: string) => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(value);

  const userData = useSelector((state: any) => state.userData);

  const handleBlur = () => {
    setIsEditing(false);
    onSave(editedValue);
  };

  useEffect(() => {
    if (value !== editedValue) {
      setEditedValue(value);
    }
  }, [value]);

  return (
    <span
      onDoubleClick={() => setIsEditing(true)}
      onBlur={handleBlur}
      className=" "
    >
      {userData?.userPackageData?.limit?.can_edit_resume && isEditing ? (
        <>
          {type === "textarea" ? (
            <textarea
              value={editedValue}
              className="bg-transparent w-full  h-auto"
              rows={rows ? rows : 15}
              onChange={(e: any) => setEditedValue(e.target.value)}
              autoFocus
              onBlur={handleBlur}
            />
          ) : (
            <input
              type="text"
              value={editedValue}
              className=" bg-transparent "
              style={style ? style : {}}
              onChange={(e: any) => setEditedValue(e.target.value)}
              autoFocus
              onBlur={handleBlur}
            />
          )}
        </>
      ) : (
        <span>{value}</span>
      )}
    </span>
  );
};

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
  const [newSecondarySkill, setNewSecondarySkill] = useState(false);
  const [newProfessionalSkill, setNewProfessionalSkill] = useState(false);
  const [newWorkExperience, setNewWorkExperience] = useState<number>();
  const [newAchievement, setNewAchievement] = useState("");
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
  const [primarySkill, setPrimarySkill] = useState<string>("");
  const [secondarySkill, setSecondarySkill] = useState<string>("");
  const [professionalSkill, setProfessionalSkill] = useState<string>("");

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

  return (
    <div className="w-full first-page text-gray-900">
      <div className="flex">
        <div className="flex flex-col w-10/12 p-8">
          <h2 className="text-6xl hover:shadow-md hover:bg-gray-100">
            <EditableField
              value={resume?.name ? resume?.name : "FULL NAME"}
              style={{ width: "fit-content" }}
              onSave={(value: string) => {
                dispatch(setField({ name: "name", value: value }));
                saveResumeToDB({ ...resume, name: value });
              }}
            />
          </h2>
          <h3 className="text-2xl hover:shadow-md hover:bg-gray-100">
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
          <div className="w-32 h-32 text-white bg-gray-800 text-center p-10 rounded-full mr-8">
            <span className="text-4xl  hover:shadow-md hover:bg-gray-900">
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
      <div className="flex">
        <div className="w-1/3 flex flex-col pl-8 pr-6 border-r-2">
          {/* contacts */}
          <span className="border-stylee w-full h-0 border !border-gray-500 my-3"></span>
          <h3 className="uppercase text-lg font-semibold flex flex-row gap-2 items-center">
            {contactIcon}
            Contact
          </h3>
          <span className="border-stylee w-full h-0 border !border-gray-500 my-3"></span>
          <ul className=" flex flex-col gap-3 mb-4 text-sm break-all pl-0">
            <li className="hover:shadow-md hover:bg-gray-100 text-xs flex flex-row gap-1  items-center">
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
            <li className="hover:shadow-md hover:bg-gray-100 flex flex-row gap-1  items-center text-xs">
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
            <li className="hover:shadow-md hover:bg-gray-100 text-blue-600 flex flex-row gap-1  items-center text-xs">
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
              <h3 className="uppercase text-lg font-semibold flex flex-row gap-2 items-center">
                {sparkleIcon}
                Skills
              </h3>
              <span className="border-stylee w-full h-0 border !border-gray-500 my-3"></span>
              <ul
                className="pl-0 flex  flex-col gap-1 mb-4 text-sm"
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
                    className="hover:shadow-md parent  hover:bg-gray-100 flex justify-between items-center"
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
                            console.log(index);

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
                      className="w-4 h-4 text-red-500 cursor-pointer child"
                    >
                      {crossIcon}
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
              <span className="w-full h-0 border border-gray-500 my-3 page-break"></span>
              <h3 className="uppercase text-lg font-semibold flex flex-row gap-2 items-center">
                {educationIcon}
                Education
              </h3>
              <span className="border-stylee w-full h-0 border !border-gray-500 my-3"></span>
              <ul className="pl-0 flex flex-col  ">
                {resume?.education.map((education: Education, ind: number) => (
                  <React.Fragment key={education?.id || ind}>
                    <li className="font-semibold  uppercase hover:shadow-md hover:bg-gray-100 text-md">
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
                    <li className="hover:shadow-md hover:bg-gray-100 text-sm text-gray-800">
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

          {/* Skills */}
          {resume?.professionalSkills &&
            resume?.professionalSkills.length > 0 && (
              <>
                <span className="border-stylee w-full h-0 border !border-gray-500 my-3"></span>
                <h3 className="uppercase text-lg font-semibold flex flex-row gap-2 items-center">
                  {sparkleIcon}
                  Skills
                </h3>
                <span className="border-stylee w-full h-0 border !border-gray-500 my-3"></span>
                <ul
                  className="pl-0  flex flex-col gap-1 mb-4 text-sm"
                  onMouseEnter={() =>
                    !newProfessionalSkill &&
                    setProfessionalSkillAddButtonVisible(true)
                  }
                  onMouseLeave={() =>
                    !newProfessionalSkill &&
                    setProfessionalSkillAddButtonVisible(false)
                  }
                >
                  <li className="font-semibold  uppercase ">Professional</li>
                  {resume?.professionalSkills.map(
                    (skill: string, i: number) => (
                      <li
                        key={i}
                        className="hover:shadow-md parent hover:bg-gray-100 flex justify-between items-center"
                        onDragStart={(e) =>
                          e.dataTransfer.setData("text/plain", i.toString())
                        }
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => handleDropProfessional(e, i)}
                        draggable
                      >
                        <EditableField
                          style={{ width: "100%" }}
                          value={skill}
                          onSave={(value: string) => {
                            let updatedSkills = resume.professionalSkills.map(
                              (skill: string, index: number) => {
                                if (index === i) {
                                  return value;
                                }
                                return skill;
                              }
                            );
                            dispatch(
                              setProfessionalSkills({
                                ...resume,
                                professionalSkills: updatedSkills,
                              })
                            );
                            saveResumeToDB({
                              ...resume,
                              professionalSkills: updatedSkills,
                            });
                          }}
                        />
                        <div
                          onClick={() => {
                            const removeProSkill =
                              resume.professionalSkills.filter(
                                (item: any) => item !== skill
                              );
                            dispatch(
                              setProfessionalSkills({
                                ...resume,
                                professionalSkills: removeProSkill,
                              })
                            );
                            saveResumeToDB({
                              ...resume,
                              professionalSkills: removeProSkill,
                            });
                          }}
                          className="w-4 h-4 text-red-500 cursor-pointer child"
                        >
                          {crossIcon}
                        </div>
                      </li>
                    )
                  )}
                  {/* ADD New Professional Skill  */}
                  {newProfessionalSkill ? (
                    <>
                      <div className="w-full rounded-2xl border border-black flex h-9.5">
                        <input
                          type="text"
                          value={professionalSkill}
                          placeholder="Please add Skill"
                          className="bg-white outline-none rounded-2xl px-2 w-full"
                          autoFocus
                          onChange={(e) => setProfessionalSkill(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              if (professionalSkill.trim() !== "") {
                                addProfessionalSkill();
                                setProfessionalSkill("");
                              }
                            }
                          }}
                        />
                        <button
                          className="bg-green-500 uppercase h-9 px-2 text-white rounded-r-2xl"
                          onClick={() => {
                            if (professionalSkill.trim() !== "") {
                              addProfessionalSkill();
                              setProfessionalSkill(""); // Empty the input field
                            }
                          }}
                        >
                          save
                        </button>
                      </div>
                      <button
                        onClick={() => {
                          setNewProfessionalSkill(false);
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
                  {professionalSkillAddButtonVisible ? (
                    <div
                      className="border-2 border-gray-400 text-center uppercase justify-center text-gray-500 cursor-pointer rounded-full py-1 px-4 hover:bg-gray-400 hover:text-white transition duration-300 ease-in-out"
                      onClick={() => {
                        setNewProfessionalSkill(true);
                        setProfessionalSkillAddButtonVisible(false);
                      }}
                    >
                      + Add
                    </div>
                  ) : null}
                </ul>
              </>
            )}

          {/* Skills */}

          {resume?.secondarySkills && resume?.secondarySkills.length > 0 && (
            <>
              <span className="border-stylee w-full h-0 border !border-gray-500 my-3"></span>
              <h3 className="uppercase text-lg font-semibold flex flex-row gap-2 items-center">
                {sparkleIcon}
                Skills
              </h3>
              <span className="border-stylee w-full h-0 border !border-gray-500 my-3"></span>
              <ul
                className="pl-0 flex flex-col gap-1 mb-4 text-sm"
                onMouseEnter={() =>
                  !newSecondarySkill && setSecondarySkillAddButtonVisible(true)
                }
                onMouseLeave={() =>
                  !newSecondarySkill && setSecondarySkillAddButtonVisible(false)
                }
              >
                <li className="font-semibold uppercase">Secondary</li>
                {resume?.secondarySkills.map((skill: string, i: number) => (
                  <li
                    key={i}
                    className="hover:shadow-md parent hover:bg-gray-100 flex justify-between items-center "
                    onDragStart={(e) =>
                      e.dataTransfer.setData("text", i.toString())
                    }
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => handleDropSecondary(e, i)}
                    draggable
                  >
                    {/* {skill} */}
                    <EditableField
                      value={skill}
                      onSave={(value: string) => {
                        let updatedSkills = resume.secondarySkills.map(
                          (skill: string, index: number) => {
                            if (index === i) {
                              return value;
                            }
                            return skill;
                          }
                        );
                        dispatch(
                          setSecondarySkills({
                            ...resume,
                            secondarySkills: updatedSkills,
                          })
                        );
                        saveResumeToDB({
                          ...resume,
                          secondarySkills: updatedSkills,
                        });
                      }}
                    />
                    <div
                      onClick={() => {
                        const removeSecondarySkill =
                          resume.secondarySkills.filter(
                            (item: any) => item !== skill
                          );
                        dispatch(
                          setSecondarySkills({
                            ...resume,
                            secondarySkills: removeSecondarySkill,
                          })
                        );
                        saveResumeToDB({
                          ...resume,
                          secondarySkills: removeSecondarySkill,
                        });
                      }}
                      className="w-4 h-4 text-red-500 cursor-pointer child"
                    >
                      {crossIcon}
                    </div>
                  </li>
                ))}
                {/* ADD New Secondary Skill  */}
                {newSecondarySkill ? (
                  <>
                    <div className="w-full rounded-2xl border border-black flex h-9.5">
                      <input
                        type="text"
                        value={secondarySkill}
                        placeholder="Please add Skill"
                        className="bg-white outline-none rounded-2xl px-2 w-full"
                        autoFocus
                        onChange={(e) => setSecondarySkill(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            if (secondarySkill.trim() !== "") {
                              addSecondarySkill();
                              setSecondarySkill("");
                            }
                          }
                        }}
                      />
                      <button
                        className="bg-green-500 uppercase h-9 px-2 text-white rounded-r-2xl"
                        onClick={() => {
                          if (secondarySkill.trim() !== "") {
                            addSecondarySkill();
                            setSecondarySkill(""); // Empty the input field
                          }
                        }}
                      >
                        save
                      </button>
                    </div>
                    <button
                      onClick={() => {
                        setNewSecondarySkill(false);
                        setSecondarySkillAddButtonVisible(false);
                      }}
                      className="bg-red-500 py-1 px-2  text-white rounded-full"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  " "
                )}
                {secondarySkillAddButtonVisible ? (
                  <div
                    className="border-2 border-gray-400 text-center uppercase text-gray-500 cursor-pointer rounded-full py-1 px-4 hover:bg-gray-400 hover:text-white transition duration-300 ease-in-out"
                    onClick={() => {
                      setNewSecondarySkill(true);
                      setSecondarySkillAddButtonVisible(false);
                    }}
                  >
                    + Add
                  </div>
                ) : null}
              </ul>
            </>
          )}
        </div>
        <div className="w-full flex flex-col px-8">
          {/* Executive Summary */}
          <span className="border-stylee w-full h-0 border !border-gray-500 my-3"></span>
          <h3 className="uppercase text-lg font-semibold">EXECUTIVE SUMMARY</h3>
          <span className="border-stylee w-full h-0 border !border-gray-500 my-3"></span>

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

          {/* Work Experience */}
          <span className="border-stylee w-full h-0 border !border-gray-500 my-3"></span>
          <h3 className="uppercase text-lg font-semibold">WORK EXPERIENCE</h3>
          <span className="border-stylee w-full h-0 border !border-gray-500 my-3"></span>

          {resume?.workExperienceArray &&
          resume?.workExperienceArray.length > 0 ? (
            <>
              {resume?.workExperienceArray.map((rec: any, i: number) => {
                return (
                  <div key={i}>
                    <h2
                      className="hover:shadow-md hover:bg-gray-100"
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
                      <span className="hover:shadow-md hover:bg-gray-100">
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
                    <div
                      className="p-4"
                      onMouseEnter={() => setWorkExperienceAddButtonVisible(i)}
                      onMouseLeave={() => setWorkExperienceAddButtonVisible(-1)}
                    >
                      {rec?.achievements && (
                        <ul className="pl-0 flex flex-col borer-2 gap-1 text-sm">
                          {rec?.achievements.map(
                            (achivement: any, ind: number) => (
                              <li
                                className="list-disc hover:shadow-md relative parent hover:bg-gray-100"
                                key={ind}
                              >
                                <EditableField
                                  type="textarea"
                                  rows={2}
                                  value={achivement}
                                  onSave={(value: string) => {
                                    let updatedExp =
                                      resume?.workExperienceArray.map(
                                        (exp: any, index: number) => {
                                          // get the index of the work experience
                                          if (index === i) {
                                            let updatedAchievements =
                                              exp?.achievements.map(
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
                                  {crossIcon}
                                </div>
                              </li>
                            )
                          )}
                        </ul>
                      )}
                      {newWorkExperience === i ? (
                        <>
                          <div className="w-full rounded-md border flex h-9.5">
                            <textarea
                              className="w-10/12 rounded-l-md text bg-transparent p-2" // Apply Tailwind CSS classes
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
                              className="bg-green-500 w-2/12 uppercase h-9 px-2 text-white rounded-r-md"
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
                            className="bg-red-500 w-2/12 py-1 px-2 mt-2 text-white rounded-full"
                          >
                            Cancel
                          </button>
                        </>
                      ) : null}
                      {workExperienceAddButtonVisible === i &&
                      newWorkExperience !== i ? (
                        <div
                          className="border-2 w-2/12 border-gray-400 text-center uppercase text-gray-500 cursor-pointer rounded-full py-1  hover:bg-gray-400 hover:text-white transition duration-300 ease-in-out"
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
