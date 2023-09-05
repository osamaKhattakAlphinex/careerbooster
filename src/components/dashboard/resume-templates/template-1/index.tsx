"use client";
import { useState } from "react";
import { Education } from "@/store/userDataSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setBasicInfo,
  setField,
  setPrimarySkills,
  setProfessionalSkills,
  setSecondarySkills,
  setWorkExperienceArray,
} from "@/store/resumeSlice";
import {
  contactIcon,
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

  const handleBlur = () => {
    setIsEditing(false);
    onSave(editedValue);
  };

  return (
    <span
      onDoubleClick={() => setIsEditing(true)}
      onBlur={handleBlur}
      className=" "
    >
      {isEditing ? (
        <>
          {type === "textarea" ? (
            <textarea
              value={editedValue}
              className="w-full text-black h-auto"
              rows={rows ? rows : 15}
              onChange={(e: any) => setEditedValue(e.target.value)}
              autoFocus
              onBlur={handleBlur}
            />
          ) : (
            <input
              type="text"
              value={editedValue}
              className=" text-black"
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

  return (
    <div className="w-full first-page">
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
          <div className="w-32 h-32 bg-gray-800 text-center p-10 rounded-full mr-8">
            <span className="text-4xl text-white hover:shadow-md hover:bg-gray-900">
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
          <span className="w-full h-0 border border-gray-500 my-3"></span>
          <h3 className="uppercase text-lg font-semibold flex flex-row gap-2 items-center">
            {contactIcon}
            Contacts
          </h3>
          <span className="w-full h-0 border border-gray-500 my-3"></span>
          <ul className="flex flex-col gap-3 mb-4 text-sm break-all">
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
              <span className="w-full h-0 border border-gray-500 my-3"></span>
              <h3 className="uppercase text-lg font-semibold flex flex-row gap-2 items-center">
                {sparkleIcon}
                Skills
              </h3>
              <span className="w-full h-0 border border-gray-500 my-3"></span>
              <ul className="flex flex-col gap-1 mb-4 text-sm">
                <li className="font-semibold uppercase">primary</li>
                {resume?.primarySkills.map((skill: string, i: number) => (
                  <li className="hover:shadow-md hover:bg-gray-100" key={i}>
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
                  </li>
                ))}
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
              <span className="w-full h-0 border border-gray-500 my-3"></span>
              <ul className="flex flex-col  ">
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
                <span className="w-full h-0 border border-gray-500 my-3"></span>
                <h3 className="uppercase text-lg font-semibold flex flex-row gap-2 items-center">
                  {sparkleIcon}
                  Skills
                </h3>
                <span className="w-full h-0 border border-gray-500 my-3"></span>
                <ul className="flex flex-col gap-1 mb-4 text-sm">
                  <li className="font-semibold uppercase ">Professional</li>
                  {resume?.professionalSkills.map(
                    (skill: string, i: number) => (
                      <li key={i} className="hover:shadow-md hover:bg-gray-100">
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
                      </li>
                    )
                  )}
                </ul>
              </>
            )}

          {/* Skills */}

          {resume?.secondarySkills && resume?.secondarySkills.length > 0 && (
            <>
              <span className="w-full h-0 border border-gray-500 my-3"></span>
              <h3 className="uppercase text-lg font-semibold flex flex-row gap-2 items-center">
                {sparkleIcon}
                Skills
              </h3>
              <span className="w-full h-0 border border-gray-500 my-3"></span>
              <ul className="flex flex-col gap-1 mb-4 text-sm">
                <li className="font-semibold uppercase">Secondary</li>
                {resume?.secondarySkills.map((skill: string, i: number) => (
                  <li key={i} className="hover:shadow-md hover:bg-gray-100">
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
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
        <div className="w-full flex flex-col px-8">
          {/* Executive Summary */}
          <span className="w-full h-0 border border-gray-500 my-3"></span>
          <h3 className="uppercase text-lg font-semibold">EXECUTIVE SUMMARY</h3>
          <span className="w-full h-0 border border-gray-500 my-3"></span>

          <div className="text-sm hover:shadow-md hover:bg-gray-100">
            <EditableField
              type="textarea"
              value={
                resume?.summary !== ""
                  ? resume?.summary
                  : streamedSummaryData && streamedSummaryData
              }
              onSave={(value: string) => {
                dispatch(setField({ name: "summary", value: value }));
                saveResumeToDB({ ...resume, summary: value });
              }}
            />
          </div>

          {/* Work Experience */}
          <span className="w-full h-0 border border-gray-500 my-3"></span>
          <h3 className="uppercase text-lg font-semibold">WORK EXPERIENCE</h3>
          <span className="w-full h-0 border border-gray-500 my-3"></span>

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
                    <div className="p-4">
                      {rec?.achievements && (
                        <ul className="flex flex-col gap-1 text-sm">
                          {rec?.achievements.map(
                            (achivement: any, ind: number) => (
                              <li
                                className="list-disc hover:shadow-md hover:bg-gray-100"
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
                              </li>
                            )
                          )}
                        </ul>
                      )}
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
export default ResumeTemplate1;
