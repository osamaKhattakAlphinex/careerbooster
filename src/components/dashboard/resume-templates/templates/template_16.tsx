"use client";
import { memo, useEffect, useState } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { setField } from "@/store/resumeSlice";
import {
  crossIcon1,
  emailIcon,
  phoneIcon,
  resumeContactIcon,
  resumeEductionIcon,
  resumeSkillsIcon,
  resumeSummaryIcon,
  resumeWorkExpIcon,
} from "@/helpers/iconsProvider";
import Loader from "@/components/common/Loader";

import useGetSummary from "@/hooks/useGetSummary";
import EditableField from "@/components/dashboard/EditableField";
import useSingleJDGenerate from "@/hooks/useSingleJDGenerate";
import useSaveResumeToDB from "@/hooks/useSaveToDB";
import Toolbar from "@/components/dashboard/Toolbar";
import useDragAndDrop from "@/hooks/useDragAndDrop";
import useGetPrimarySkills from "@/hooks/useGetPrimarySkills";
import useAddPrimarySkill from "@/hooks/useAddPrimarySkill";
import useUpdateAndSave from "@/hooks/useUpdateAndSave";
import useHandler from "@/hooks/useHandler";
import { ColorResult } from "react-color";
import ColorPicker from "../colorPicker";
import DeleteConfirmationModal from "@/components/common/ConfirmationModal";
import Publication from "./resume-sections/publication";
import {
  award,
  certification,
  customStyle_16,
  education,
  experience,
  interest,
  language,
  projectStyles,
  publicationStyles,
  reference,
  summary,
  training,
} from "@/helpers/templateStylesObj";
import Certification from "./resume-sections/certification";
import Training from "./resume-sections/trainings";
import Award from "./resume-sections/award";
import Interest from "./resume-sections/interest";
import Reference from "./resume-sections/reference";
import Language from "./resume-sections/language";
import Education from "./resume-sections/education";
import Summary from "./resume-sections/summary";
import Experience from "./resume-sections/experience";
import Project from "./resume-sections/project";

const ResumeTemplate16 = () => {
  const dispatch = useDispatch();
  const resume = useSelector((state: any) => state.resume);
  const [newPrimarySkill, setNewPrimarySkill] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [newWorkExperience, setNewWorkExperience] = useState<number>();
  const [newAchievement, setNewAchievement] = useState("");
  const [streamedSummaryData, setStreamedSummaryData] = useState("");

  const [regenerating, setRegenerating] = useState(false);
  const { getPrimarySkills } = useGetPrimarySkills(setRegenerating);

  const [regeneratedRecordIndex, setRegeneratedRecordIndex] = useState<
    number | null
  >(null);
  const { getSummary } = useGetSummary(setStreamedSummaryData);
  const [streamedJDData, setStreamedJDData] = useState<any>("");
  const { saveResumeToDB } = useSaveResumeToDB();
  // const [color, setColor] = useState("#1F1E1E");
  // const [color_second, setColor_second] = useState("#383636");

  //add new code

  const { getOneWorkExperienceNew } = useSingleJDGenerate(setStreamedJDData);
  const { handleDropPrimary, handleDropAchievement, handleDropExperience } =
    useDragAndDrop();

  //New code end
  const [primarySkill, setPrimarySkill] = useState<string>("");

  const [insideIndex, setInsideIndex] = useState<number>(0);
  const { addPrimarySkill } = useAddPrimarySkill();
  const { updateSaveHook } = useUpdateAndSave();
  const { handlers } = useHandler();

  useEffect(() => {
    if (streamedJDData === "") {
      setStreamedJDData(null);
      setRegeneratedRecordIndex(null);
    }
  }, [streamedJDData]);

  // handle regenrate
  const handleRegenrate = (rec: any, i: number) => {
    getOneWorkExperienceNew(rec);
    setRegeneratedRecordIndex(i);
  };

  //add Skills
  const handleAddSkills = () => {
    setNewPrimarySkill(true);
  };

  //save skills
  const handleSaveSkills = () => {
    if (primarySkill.trim() !== "") {
      addPrimarySkill(primarySkill);
      setPrimarySkill("");
    }
  };
  // const saveColor = (color: ColorResult) => {
  //   setColor(color.hex);

  // };
  // const saveColor_second = (color: ColorResult) => {
  //   setColor_second(color.hex);

  // };
  return (
    <div className="relative w-full text-gray-900 first-page">
      <div className="flex">
        <div
          className=" w-3/12 xs:w-4/12 md:w-4/12 flex flex-col  bg-[#1F1E1E]  px-4  xs:px-1 md:px-9 pt-[2rem] "
          // style={{ backgroundColor: color }}
        >
          <div className="flex justify-center xs:mb-6">
            <div className=" w-32 h-32 xs:w-24 xs:h-24 md:w-32 md:h-32 border-[2px] xs:border-[2px] md:border-[.5rem] border-[##F1F1F1]   text-gray-800 bg-[#FFFFFF]  text-center flex justify-center items-center  rounded-full ">
              <div
                className=" w-28 relative h-28 xs:h-[88px] xs:w-[] bg-[#383636] md:w-28 md:h-28 text-[#F1F1F1] flex justify-center items-center    rounded-full "
                // style={{ backgroundColor: color_second }}
              >
                <span className="text-4xl font-semibold xs:text-lg md:text-4xl text-bold hover:shadow-md hover:text-black hover:bg-gray-100">
                  <EditableField
                    value={resume?.shortName ? resume?.shortName : "CPH"}
                    style={{ width: "60px" }}
                    onSave={(value: string) => {
                      dispatch(setField({ name: "shortName", value: value }));
                      saveResumeToDB({ ...resume, shortName: value });
                    }}
                  />
                </span>
                {/* <ColorPicker
                  defaultColor="#1F1E1E"
                  resetColor="#383636"
                  styles_pin="absolute text-white top-5 right-5"
                  styles_div="absolute top-3 -left-1"
                  setColor={setColor}
                  secondDefaultColor="#383636"
                  setColor_second={setColor_second}
                  saveColor={saveColor_second}
                /> */}
              </div>
            </div>
          </div>
          {/* <div className="absolute top-0 -left-12 xs:w-4/12">
            <div className="flex justify-end">
              <ColorPicker
                defaultColor="#1F1E1E"
                resetColor="#1F1E1E"
                setColor={setColor}
                styles_pin="relative text-white top-[6px]  -left-9"
                styles_div="absolute top-3 left-0"
                secondDefaultColor="#383636"
                setColor_second={setColor_second}
                saveColor={saveColor}
              />
            </div>
          </div> */}
          {/* contacts */}
          <span className="w-full h-0 my-3 border-stylee"></span>
          <h3 className="flex flex-row items-center w-full gap-2 my-1 text-base font-semibold text-white uppercase border-2 border-transparent rounded-sm hover:border-dashed hover:border-gray-500">
            {resumeContactIcon}
            <EditableField
              value={
                resume?.headings?.contact ? resume.headings.contact : "contact"
              }
              style={{ width: "fit-content" }}
              onSave={(value: string) => {
                if (value !== resume?.headings?.contact) {
                  updateSaveHook.updateAndSaveHeadings({
                    contact: value,
                  });
                }
              }}
            />
          </h3>
          <span className="w-full mb-4 border-b-2 border-white !block"></span>
          <ul className="flex flex-col w-full gap-3 pl-0 mb-4 text-xs text-gray-300 break-all ">
            <li className="flex flex-row items-center justify-start gap-3 hover:shadow-md hover:text-black hover:bg-gray-100 ">
              <span className="w-7 h-7 xs:w-5 xs:p-[2px] md:px-0 xs:h-5 md:w-7 md:h-7  flex items-center justify-center border-[1px] border-gray-300 rounded-full">
                {phoneIcon}
              </span>
              <EditableField
                value={
                  resume?.contact?.phone
                    ? resume?.contact?.phone
                    : "(555) 555-1234"
                }
                onSave={(value: string) => {
                  if (value !== resume?.contact?.phone) {
                    updateSaveHook.updateAndSaveBasicInfo({ phone: value });
                  }
                }}
              />
            </li>
            <li className="flex flex-row items-center justify-start gap-3 hover:shadow-md hover:text-black hover:bg-gray-100 ">
              <span className="w-7 h-7 xs:w-5 xs:p-[2px] md:px-0 xs:h-5 md:w-7  md:h-7  flex items-center justify-center border-[1px] border-gray-300 rounded-full">
                {emailIcon}
              </span>
              <EditableField
                value={
                  resume?.contact?.email
                    ? resume?.contact?.email
                    : "your@email.com"
                }
                onSave={(value: string) => {
                  if (value !== resume?.contact?.email) {
                    updateSaveHook.updateAndSaveBasicInfo({ email: value });
                  }
                }}
              />
            </li>
            <li className="flex flex-row items-center justify-start gap-2 text-gray-300 hover:shadow-md hover:text-black group hover:bg-gray-100 ">
              <div>
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="0.8"
                  className="w-8 h-8"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.5 18.4C14.4153 18.4 18.4 14.4153 18.4 9.5C18.4 4.58467 14.4153 0.6 9.5 0.6C4.58467 0.6 0.6 4.58467 0.6 9.5C0.6 14.4153 4.58467 18.4 9.5 18.4Z"
                    strokeWidth="0.8"
                  />
                  <path
                    d="M5.83889 13V7.54545H6.47454V13H5.83889ZM6.16204 6.60795C6.03183 6.60795 5.92056 6.56416 5.82823 6.47656C5.7359 6.3866 5.68974 6.27888 5.68974 6.15341C5.68974 6.02794 5.7359 5.9214 5.82823 5.83381C5.92056 5.74384 6.03183 5.69886 6.16204 5.69886C6.29225 5.69886 6.40352 5.74384 6.49585 5.83381C6.58817 5.9214 6.63434 6.02794 6.63434 6.15341C6.63434 6.27888 6.58817 6.3866 6.49585 6.47656C6.40352 6.56416 6.29225 6.60795 6.16204 6.60795ZM9.67834 9.59091V13H9.04624V7.54545H9.66058V8.40128H9.7174C9.84524 8.12192 10.0441 7.8982 10.314 7.73011C10.5862 7.55966 10.9224 7.47443 11.3225 7.47443C11.6895 7.47443 12.0114 7.55137 12.2884 7.70526C12.5678 7.85677 12.7844 8.08049 12.9383 8.37642C13.0945 8.67235 13.1727 9.03575 13.1727 9.46662V13H12.5406V9.50568C12.5406 9.05824 12.4151 8.70431 12.1641 8.44389C11.9156 8.18348 11.5817 8.05327 11.1627 8.05327C10.8763 8.05327 10.6218 8.11482 10.3992 8.23793C10.1767 8.36103 10.0003 8.53859 9.8701 8.7706C9.74226 9.00024 9.67834 9.27367 9.67834 9.59091Z"
                    fill="black"
                  />
                </svg>
              </div>
              <EditableField
                value={
                  resume?.contact?.linkedIn
                    ? resume?.contact?.linkedIn
                    : "https://www.linkedin.com/"
                }
                onSave={(value: string) => {
                  if (value !== resume.contact.linkedIn) {
                    updateSaveHook.updateAndSaveBasicInfo({ linkedIn: value });
                  }
                }}
              />
              {/* </a> */}
            </li>
            <li className="flex flex-row items-center justify-start gap-2 text-gray-300 hover:shadow-md hover:text-black group hover:bg-gray-100">
              <div className="w-7 h-7 aspect-square xs:w-5 xs:p-[2px] md:px-0 xs:h-5 md:w-7 md:h-7  flex items-center justify-center border-[1px] border-gray-300 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  />
                </svg>
              </div>
              <EditableField
                value={resume?.contact?.address ? resume.contact.address : ""}
                onSave={(value: string) => {
                  if (value !== resume.contact.address) {
                    updateSaveHook.updateAndSaveBasicInfo({ address: value });
                  }
                }}
              />
            </li>
          </ul>

          {/* Skills */}
          {resume?.primarySkills && resume?.primarySkills.length > 0 && (
            <>
              <span className="w-full h-0 my-1 border-stylee"></span>
              <h3 className="flex flex-row items-center w-full gap-2 my-1 text-base font-semibold text-white uppercase border-2 border-transparent rounded-sm hover:border-dashed hover:border-gray-500">
                {resumeSkillsIcon}
                <EditableField
                  value={
                    resume?.headings?.primarySkills
                      ? resume.headings.primarySkills
                      : "skills"
                  }
                  style={{ width: "fit-content" }}
                  onSave={(value: string) => {
                    if (value !== resume?.headings?.primarySkills) {
                      updateSaveHook.updateAndSaveHeadings({
                        primarySkills: value,
                      });
                    }
                  }}
                />
              </h3>
              <span className="w-full mb-4 border-b-2 border-white !block"></span>
              {resume?.primarySkills &&
              resume?.primarySkills.length > 0 &&
              !regenerating ? (
                <Toolbar
                  addSkill={handleAddSkills}
                  regenerateSkills={getPrimarySkills}
                >
                  <ul className="flex flex-col w-full gap-1 pl-0 mb-4 text-xs text-gray-300 border-2 border-transparent hover:border-dashed hover:border-gray-500">
                    {resume?.primarySkills.map((skill: string, i: number) => (
                      <li
                        className="hover:shadow-md hover:cursor-move parent hover:text-black hover:border-dashed hover:border-gray-500 hover:border  hover:bg-gray-100 border-transparent border-[1px] flex items-center"
                        key={i}
                        onDragStart={(e) =>
                          e.dataTransfer.setData("text/plain", i.toString())
                        }
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => handleDropPrimary(e, i)}
                        draggable
                      >
                        <span className="w-1 !block h-1 bg-gray-300 rounded-full mr-3"></span>
                        <div className="flex flex-row items-center justify-between w-full">
                          <EditableField
                            value={skill}
                            onSave={(value: string) => {
                              handlers.handleUpdateSkill(value, i);
                            }}
                          />
                          <div
                            onClick={() => handlers.handleDeleteSkill(i)}
                            className="w-4 h-4 cursor-pointer child"
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
                            className="w-full px-2 bg-white outline-none rounded-2xl"
                            autoFocus
                            onChange={(e) => setPrimarySkill(e.target.value)}
                            onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                handleSaveSkills();
                              }
                            }}
                          />
                          <button
                            className="px-2 text-white uppercase bg-green-500 h-9 rounded-r-2xl"
                            onClick={handleSaveSkills}
                          >
                            save
                          </button>
                        </div>
                        <button
                          onClick={() => {
                            setNewPrimarySkill(false);
                          }}
                          className="px-2 py-1 text-white bg-red-500 rounded-full"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      " "
                    )}
                  </ul>
                </Toolbar>
              ) : (
                <div className="text-center">
                  <div role="status">
                    <Loader />
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        <div className="xs:w-full w-9/12 flex flex-col xs:bg-[#fff] md:bg-[#fff] px-4 md:px-8 pt-[1rem] md:pt-[1rem]">
          <div className="flex flex-col justify-start pb-6 ">
            <h2 className="text-4xl font-bold text-center border-2 border-transparent w-fit xs:text-2xl md:text-4xl hover:shadow-md hover:bg-gray-100 hover:border-dashed hover:border-gray-500">
              <EditableField
                value={resume?.name ? resume?.name : "FULL NAME"}
                style={{ width: "fit-content" }}
                onSave={(value: string) => {
                  if (value !== resume?.name) {
                    updateSaveHook.updateAndSaveName(value);
                  }
                }}
              />
            </h2>
            <h3 className="text-xl w-fit xs:text-[16px] md:text-xl text-center hover:shadow-md mt-2 hover:bg-gray-100 border-2 border-transparent hover:border-dashed hover:border-gray-500">
              <EditableField
                value={resume?.jobTitle ? resume?.jobTitle : "JOB TITLE"}
                onSave={(value: string) => {
                  if (value !== resume?.jobTitle) {
                    updateSaveHook.updateAndSaveJobTitle(value);
                  }
                }}
              />
            </h3>
          </div>

          {/* Executive Summary */}

          <Summary
            heading={resume.headings.summary}
            summary={resume.summary}
            styles={summary}
            customStyle={customStyle_16}
          />

          {/* Work Experience */}
          <div className="space-y-1">
            <Experience
              heading={resume.headings.workExperienceArray}
              workExperienceArray={resume.workExperienceArray}
              workExperience={resume.workExperience}
              customStyle={customStyle_16}
              styles={experience}
            />
          </div>
          {/* Custom section */}

          {/* Add Custom */}
          {/* <CustomResumeSection /> */}
          {/* Publications */}
          <div className="w-full">
            {resume?.publications && resume?.publications.length > 0 && (
              <Publication
                customStyle={customStyle_16}
                heading={resume.headings.publications}
                publications={resume.publications}
                styles={publicationStyles}
              />
            )}
          </div>

          {/* Certificates */}
          <div className="w-full">
            {resume?.certifications && resume?.certifications.length > 0 && (
              <Certification
                customStyle={customStyle_16}
                heading={resume.headings.certifications}
                certificates={resume.certifications}
                styles={certification}
              />
            )}
          </div>

          {/* Trainings */}
          <div className="w-full">
            {resume?.trainings && resume?.trainings.length > 0 && (
              <Training
                customStyle={customStyle_16}
                heading={resume.headings.trainings}
                trainings={resume.trainings}
                styles={training}
              />
            )}
          </div>

          {/* Awards */}
          <div className="w-full">
            {resume?.awards && resume?.awards.length > 0 && (
              <Award
                customStyle={customStyle_16}
                heading={resume.headings.awards}
                awards={resume.awards}
                styles={award}
              />
            )}
          </div>
          {/* Project */}
          <div className="w-full">
            {resume?.projects && resume?.projects.length > 0 && (
              <Project
                heading={resume.headings.projects}
                projects={resume.projects}
                styles={projectStyles}
                customStyle={customStyle_16}
              />
            )}
          </div>
          {/* Interests & Hobbies */}
          <div className="w-full">
            {resume?.interests && resume?.interests.length > 0 && (
              <Interest
                customStyle={customStyle_16}
                heading={resume.headings.interests}
                interests={resume.interests}
                styles={interest}
              />
            )}
          </div>

          {/* References */}
          <div className="w-full">
            {resume?.references && resume?.references.length > 0 && (
              <Reference
                customStyle={customStyle_16}
                heading={resume.headings.references}
                references={resume.references}
                styles={reference}
              />
            )}
          </div>

          {/* Languages */}
          <div className="w-full">
            {resume?.languages && resume?.languages.length > 0 && (
              <Language
                customStyle={customStyle_16}
                heading={resume.headings.languages}
                languages={resume.languages}
                styles={language}
              />
            )}
          </div>

          {/* education */}
          <div className="w-full  mb-2">
            {resume?.education.length > 0 && (
              <Education
                heading={resume.headings.education}
                educations={resume.education}
                styles={education}
                customStyle={customStyle_16}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default memo(ResumeTemplate16);
