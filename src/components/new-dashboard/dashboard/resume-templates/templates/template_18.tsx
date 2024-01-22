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
import useSingleJDGenerate from "@/hooks/useSingleJDGenerate";
import useSaveResumeToDB from "@/hooks/useSaveToDB";
import useDragAndDrop from "@/hooks/useDragAndDrop";
import useGetPrimarySkills from "@/hooks/useGetPrimarySkills";
import useAddPrimarySkill from "@/hooks/useAddPrimarySkill";
import useUpdateAndSave from "@/hooks/useUpdateAndSave";
const ResumeTemplate18 = () => {
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

  const [regenerating, setRegenerating] = useState(false);
  const { getPrimarySkills } = useGetPrimarySkills(setRegenerating);

  const { handleDropPrimary, handleDropAchievement, handleDropExperience } =
    useDragAndDrop();

  const [streamedSummaryData, setStreamedSummaryData] = useState("");

  const { getSummary } = useGetSummary(setStreamedSummaryData);
  const [streamedJDData, setStreamedJDData] = useState<any>("");
  const { saveResumeToDB } = useSaveResumeToDB();

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
  const { addPrimarySkill } = useAddPrimarySkill();
  const { updateAndSaveSkill,
    updateAndSaveSummary,
    updateAndSaveWorkExperienceArray,
    updateAndSaveBasicInfo,
    updateAndSaveEducation, updateAndSaveName, updateAndSaveJobTitle } = useUpdateAndSave()


  return (
    <div className="w-full first-page relative text-gray-900">
      <div className="flex absolute top-0 w-8/12 xs:w-8/12 px-4 md:px-8 xs:left-1  md:w-8/12 items-center  justify-start py-3 xs:py-2 md:py-8">
        <div className="flex flex-col px-1 py-8">
          <h2 className="text-2xl md:text-5xl font-serif  font-bold hover:shadow-md hover:bg-gray-100">
            <EditableField
              value={resume?.name ? resume?.name : "FULL NAME"}
              style={{ width: "fit-content" }}
              onSave={(value: string) => {
                dispatch(setField({ name: "name", value: value }));
                saveResumeToDB({ ...resume, name: value });
              }}
            />
          </h2>
          <h3 className="text-[16px] md:text-2xl text-[#008cff]  hover:shadow-md mt-2 w-12/12 hover:bg-gray-100">
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
        <div className="w-9/12 md:w-full flex flex-col px-4 md:px-8 pt-[8rem] xs:pt-[10rem] md:pt-[13rem] ">
          {/* Executive Summary */}
          <span className="border-stylee w-full h-0  my-3  xs:my-3 md:my-3"></span>
          <h3 className="uppercase text-xl xs:text-lg  font-semibold border-[#444440] border-b-2  rounded-sm text-gray-900 w-full py-1">
            EXECUTIVE SUMMARY
          </h3>
          <span className="border-stylee w-full h-0  my-3"></span>

          <Regenerate
            handler={getSummary}
            custom_style={"absolute bottom-3 right-2 "}
          >
            <div className="text-sm hover:shadow-md hover:bg-gray-100 group-hover:pb-14">
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

          {/* Work Experience */}
          <span
            className="border-stylee w-full h-0 
           my-3"
          ></span>
          <h3 className="uppercase text-lg font-semibold border-[#444440] border-b-2  rounded-sm text-gray-900 w-full py-1">
            WORK EXPERIENCE
          </h3>
          <span className="border-stylee w-full h-0 my-3"></span>

          {resume?.workExperienceArray &&
            resume?.workExperienceArray.length > 0 ? (
            <>
              {resume?.workExperienceArray.map((rec: any, i: number) => {
                return (
                  <div
                    key={i}
                    className="hover:border-dashed hover:border-gray-500 my-2 border-transparent border-2 hover:cursor-move hover:border-2"
                    onMouseEnter={() => setWorkExperienceAddButtonVisible(i)}
                    onMouseLeave={() => setWorkExperienceAddButtonVisible(-1)}
                    onDragStart={(e) =>
                      e.dataTransfer.setData("text/plain", i.toString())
                    }
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => handleDropExperience(e, i)}
                    draggable
                  >
                    <div className="flex flex-col">
                      <h2
                        className="hover:shadow-md hover:cursor-text hover:bg-gray-100"
                        style={{
                          fontSize: "1rem",
                          fontWeight: "bold",
                          lineHeight: "2rem",
                        }}
                      >
                        <EditableField
                          value={rec?.title}
                          style={{ width: "100%" }}
                          onSave={(value: string) => {
                            if (value !== resume?.workExperienceArray[i].title) {
                              let updatedExp = [...resume.workExperienceArray];
                              updatedExp[i] = { ...updatedExp[i], title: value };
                              updateAndSaveWorkExperienceArray(updatedExp)
                            }
                          }}
                        />
                      </h2>
                      <h2 className="hover:cursor-default text-sm">
                        {rec?.fromMonth + " " + rec?.fromYear} -{" "}
                        {rec?.isContinue
                          ? "Present"
                          : `${rec?.toMonth} ${rec?.toYear}`}{" "}
                        |{" "}
                        <span className="hover:shadow-md hover:cursor-text  hover:bg-gray-100">
                          <EditableField
                            value={rec?.company}
                            onSave={(value: string) => {
                              if (value !== resume?.workExperienceArray[i].company) {
                                let updatedExp = [...resume.workExperienceArray];
                                updatedExp[i] = { ...updatedExp[i], company: value };
                                updateAndSaveWorkExperienceArray(updatedExp)
                              }
                            }}
                          />
                        </span>{" "}
                        |{" "}
                        <span className="hover:shadow-md hover:bg-gray-100">
                          <EditableField
                            value={rec?.cityState}
                            onSave={(value: string) => {
                              if (value !== resume?.workExperienceArray[i].cityState) {
                                let updatedExp = [...resume.workExperienceArray];
                                updatedExp[i] = { ...updatedExp[i], cityState: value };
                                updateAndSaveWorkExperienceArray(updatedExp)
                              }
                            }}
                          />
                        </span>{" "}
                        <span className="hover:shadow-md hover:bg-gray-100">
                          <EditableField
                            value={rec?.country}
                            onSave={(value: string) => {
                              if (value !== resume?.workExperienceArray[i].country) {
                                let updatedExp = [...resume.workExperienceArray];
                                updatedExp[i] = { ...updatedExp[i], country: value };
                                updateAndSaveWorkExperienceArray(updatedExp)
                              }
                            }}
                          />
                        </span>
                      </h2>
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
            <div className="w-[100vw] xs:w-auto">
              <span className="border-stylee w-full h-0 my-3"></span>
              <h3 className="uppercase text-lg flex items-center gap-2 font-semibold border-[#444440] border-b-2  rounded-sm text-gray-900 w-full py-1">
                {/* {educationIcon} */}
                Education
              </h3>
              <span className="border-stylee w-full h-0 my-3"></span>
              <ul
                className="pl-0 flex xs:flex-col my-3 md:flex-row lg:flex-row flex-wrap xs:px-2 md:px-0 text-gray-800  w-full"
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
                        className=" hover:shadow-md hover:cursor-move border-transparent border-2 
                  parent hover:border-dashed hover:border-gray-500 hover:border-2 
                   hover:bg-gray-100 font-semibold  hover:text-black flex uppercase text-md   items-center "
                      >
                        <div className="flex flex-row w-full items-center  justify-between">
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
                      <li className="hover:shadow-md uppercase hover:text-black text-gray-800 hover:tet-black hover:bg-gray-100 text-sm font-semibold">
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
                      <li className="hover:shadow-md text-gray-800 hover:text-black hover:bg-gray-100 text-sm">
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
            </div>
          )}
        </div>
        <div className=" w-full md:w-4/12 xs:w-4/12  flex flex-col relative inset-0 items-center px-6 xs:px-0 md:px-6  bg-[#22405c] h-[1080px] xs:h-auto">
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

          <h3 className="uppercase text-lg xs:px-2 md:px-0  xs:text-[14px] md:text-lg font-semibold w-full  border-b-2 border-white pb-2 text-white  py-1 rounded-sm flex items-center  flex-row gap-2 ">
            Contact
          </h3>
          <span className="border-stylee w-full h-0 my-3"></span>
          <ul className=" flex flex-col xs:px-2 gap-3 w-full mb-4 text-sm text-gray-300 break-all pl-0">
            <li className="hover:shadow-md hover:bg-gray-500 hover:text-black text-sm  flex flex-row gap-1 ">
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
            <li className="hover:shadow-md hover:text-black hover:bg-gray-100 flex flex-row gap-1  items-center text-sm">
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
            <li className="hover:shadow-md hover:text-black hover:bg-gray-100 text-gray-400 flex flex-row gap-1  items-center text-sm">
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
              <h3 className="uppercase text-lg xs:px-2 md:px-0  xs:text-[14px] md:text-lg font-semibold w-full  border-b-2 border-white pb-2 text-white  py-1 rounded-sm flex items-center  flex-row gap-2 ">
                Skills
              </h3>

              <span className="border-stylee w-full h-0 my-3"></span>
              {resume?.primarySkills &&
                resume?.primarySkills.length > 0 &&
                !regenerating ? (
                <ul
                  className="pl-0 flex  flex-col xs:px-1 md:px-0 gap-1 mb-4 text-gray-300 w-full text-sm "
                  onMouseEnter={() =>
                    !newPrimarySkill && setPrimarySkillAddButtonVisible(true)
                  }
                  onMouseLeave={() =>
                    !newPrimarySkill && setPrimarySkillAddButtonVisible(false)
                  }
                >
                  {/* <li className="font-semibold  uppercase">primary</li> */}
                  <Regenerate
                    handler={getPrimarySkills}
                    custom_style={"absolute right-0 -bottom-10 "}
                    custom_style_li={"flex flex-col gap-3"}
                  >
                    {resume?.primarySkills.map((skill: string, i: number) => (
                      <li
                        className="hover:shadow-md hover:cursor-move parent xs:w-full hover:text-black hover:border-dashed hover:border-gray-500 hover:border  hover:bg-gray-100 border-transparent border-[1px] flex items-center  "
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
                      className="border-2 w-1/2 xs:w-full justify-center xs:mt-10 flex md:w-1/2 border-gray-400 text-center uppercase text-gray-500 cursor-pointer rounded-full py-1 px-4 hover:bg-gray-400 hover:text-white transition duration-300 ease-in-out"
                      onClick={() => {
                        setNewPrimarySkill(true);
                        setPrimarySkillAddButtonVisible(false);
                      }}
                    >
                      + Add
                    </div>
                  ) : null}
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
        </div>
      </div>
    </div>
  );
};
export default memo(ResumeTemplate18);
function addPrimary(): any {
  throw new Error("Function not implemented.");
}
