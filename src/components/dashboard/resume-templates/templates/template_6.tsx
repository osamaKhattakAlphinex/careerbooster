"use client";
import { memo, useEffect, useState } from "react";
import React from "react";
import { TwitterPicker, ColorResult } from "react-color";
import { useDispatch, useSelector } from "react-redux";
import {
  crossIcon1,
  emailIcon,
  phoneIcon,
  resumeEductionIcon,
  resumeSkillsIcon,
  resumeSummaryIcon,
  resumeWorkExpIcon,
} from "@/helpers/iconsProvider";
import Loader from "@/components/common/Loader";
import useGetSummary from "@/hooks/useGetSummary";
import Toolbar from "@/components/dashboard/Toolbar";
import EditableField from "@/components/dashboard/EditableField";
import useSingleJDGenerate from "@/hooks/useSingleJDGenerate";
import useDragAndDrop from "@/hooks/useDragAndDrop";
import useGetPrimarySkills from "@/hooks/useGetPrimarySkills";
import useAddPrimarySkill from "@/hooks/useAddPrimarySkill";
import useUpdateAndSave from "@/hooks/useUpdateAndSave";
import useHandler from "@/hooks/useHandler";
import ColorPicker from "../colorPicker";
import DeleteConfirmationModal from "@/components/common/ConfirmationModal";
import Link from "next/link";
import { useColorContext } from "@/context/ResumeColorContext";
import Publication from "./resume-sections/publication";
import Certification from "./resume-sections/certification";
import Training from "./resume-sections/trainings";
import Award from "./resume-sections/award";
import Interest from "./resume-sections/interest";
import Reference from "./resume-sections/reference";
import Language from "./resume-sections/language";
import {
  award,
  certification,
  customStyle_4,
  customStyle_6,
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
import Summary from "./resume-sections/summary";
import Experience from "./resume-sections/experience";
import Education from "./resume-sections/education";
import Project from "./resume-sections/project";
const ResumeTemplate6 = () => {
  const resume = useSelector((state: any) => state.resume);
  const userData = useSelector((state: any) => state.userData);
  const [newPrimarySkill, setNewPrimarySkill] = useState(false);
  const [newWorkExperience, setNewWorkExperience] = useState<number>();

  const [newAchievement, setNewAchievement] = useState("");
  const [streamedSummaryData, setStreamedSummaryData] = useState("");
  const [streamedJDData, setStreamedJDData] = useState<any>("");

  const { color, setColor } = useColorContext();
  // const [color, setColor] = useState("#e04127");
  const [primarySkill, setPrimarySkill] = useState<string>("");
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [regenerating, setRegenerating] = useState(false);
  const { getPrimarySkills } = useGetPrimarySkills(setRegenerating);
  const [regeneratedRecordIndex, setRegeneratedRecordIndex] = useState<
    number | null
  >(null);
  // const [streamedSummaryData, setStreamedSummaryData] = useState("");
  const { getSummary } = useGetSummary(setStreamedSummaryData);
  // const [streamedJDData, setStreamedJDData] = useState<any>("");
  //add new code
  const { getOneWorkExperienceNew } = useSingleJDGenerate(setStreamedJDData);
  const { handleDropPrimary, handleDropAchievement, handleDropExperience } =
    useDragAndDrop();

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
  // // Access the selected color value from the 'color' parameter
  // setColor(color.hex);
  // document.documentElement.style.setProperty('--decor-color', color.hex);
  // // You can do whatever you need with the selected color here
  // };

  return (
    <div className="flex flex-row text-gray-900 ">
      <div
        className={`relative flex bg-[#e04127]  w-[5%]`}
        // style={{ backgroundColor: color }}
      >
        {/* <ColorPicker
          defaultColor="#e04127"
          resetColor="#e04127"
          setColor={setColor}
          styles_pin="absolute text-white top-0 right-0 "
          styles_div="absolute top-3 -left-1"
          // saveColor={saveColor}
        /> */}
      </div>

      <div className="w-full">
        <div className="flex flex-col py-8 pl-6 pr-8 w-12/12">
          <h2 className="text-4xl font-bold border-2 border-transparent xs:text-2xl md:4xl lg:text-4xl hover:shadow-md hover:bg-gray-100 hover:border-dashed hover:border-gray-500 ">
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
          <h3 className="w-full text-lg border-2 border-transparent xs:text-xs md:text-2xl lg:text-2xl xs:leading-none hover:shadow-md hover:bg-gray-100 hover:border-dashed hover:border-gray-500 ">
            <EditableField
              value={resume?.jobTitle ? resume?.jobTitle : "JOB TITLE"}
              onSave={(value: string) => {
                if (value !== resume?.jobTitle) {
                  updateSaveHook.updateAndSaveJobTitle(value);
                }
              }}
            />
          </h3>
          <ul className="flex  flex-col xs:flex-col justify-between  pl-0 my-2 text-xs break-all md:flex-row">
            <li className="hover:shadow-md hover:bg-gray-100 text-xs   flex flex-row gap-1  items-center justify-start md:w-[20%] xs:w-full ">
              <div className="p-1">{phoneIcon}</div>
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
            <li className="md:w-[25%] xs:w-full hover:shadow-md hover:bg-gray-100 flex flex-row gap-1  items-center justify-start text-xs ">
              <div className="p-1">{emailIcon}</div>
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
            <li className=" md:w-[25%] xs:w-full flex flex-row items-center justify-start gap-1 text-xs hover:shadow-md hover:bg-gray-100">
              <div className="p-1">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 19 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.5 18.4C14.4153 18.4 18.4 14.4153 18.4 9.5C18.4 4.58467 14.4153 0.6 9.5 0.6C4.58467 0.6 0.6 4.58467 0.6 9.5C0.6 14.4153 4.58467 18.4 9.5 18.4Z"
                    stroke="black"
                    strokeWidth="0.8"
                  />
                  <path
                    d="M6.15572 13V7.54545H6.99379V13H6.15572ZM6.58185 6.63636C6.4185 6.63636 6.27764 6.58073 6.15927 6.46946C6.04326 6.35819 5.98526 6.22443 5.98526 6.06818C5.98526 5.91193 6.04326 5.77817 6.15927 5.6669C6.27764 5.55563 6.4185 5.5 6.58185 5.5C6.74521 5.5 6.88488 5.55563 7.00089 5.6669C7.11926 5.77817 7.17844 5.91193 7.17844 6.06818C7.17844 6.22443 7.11926 6.35819 7.00089 6.46946C6.88488 6.58073 6.74521 6.63636 6.58185 6.63636ZM9.36683 9.71875V13H8.52876V7.54545H9.33842V8.39773H9.40945C9.53729 8.12074 9.73142 7.8982 9.99183 7.73011C10.2522 7.55966 10.5884 7.47443 11.0004 7.47443C11.3697 7.47443 11.6928 7.55019 11.9698 7.7017C12.2468 7.85085 12.4622 8.07812 12.6161 8.38352C12.77 8.68655 12.8469 9.07008 12.8469 9.53409V13H12.0089V9.59091C12.0089 9.16241 11.8976 8.8286 11.6751 8.58949C11.4525 8.34801 11.1471 8.22727 10.7589 8.22727C10.4914 8.22727 10.2522 8.28527 10.0415 8.40128C9.83321 8.51728 9.66868 8.68655 9.54794 8.90909C9.4272 9.13163 9.36683 9.40152 9.36683 9.71875Z"
                    fill="black"
                  />
                </svg>
              </div>

              <EditableField
                value={
                  resume?.contact?.linkedIn !== ""
                    ? resume?.contact?.linkedIn
                    : userData?.linkedin
                    ? userData?.linkedin
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
            <li className="  md:w-[25%] xs:w-full flex flex-row items-center justify-start gap-1 text-xs hover:shadow-md hover:bg-gray-100">
              <div className="p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
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
          {/* EXECUTIVE SUMMARY */}
          <div className="flex flex-col flex-wrap w-full ">
            <Summary
              heading={resume.headings.summary}
              summary={resume.summary}
              styles={summary}
              customStyle={customStyle_6}
            />

            {resume?.primarySkills && resume?.primarySkills.length > 0 && (
              <>
                <span className="!block border-stylee w-full h-0 border-[1px] !border-gray-500 mt-3"></span>
                <h3 className="flex flex-row flex-wrap items-center gap-2 my-1 text-base font-semibold uppercase border-2 border-transparent hover:border-dashed hover:border-gray-500">
                  {resumeSkillsIcon}
                  <EditableField
                    value={
                      resume?.headings?.primarySkills
                        ? resume.headings.primarySkills
                        : " skills"
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
                <span className="!block border-stylee w-full h-0 border-[1px] !border-gray-500 mb-2"></span>
                {resume?.primarySkills &&
                resume?.primarySkills.length > 0 &&
                !regenerating ? (
                  <Toolbar
                    addSkill={handleAddSkills}
                    regenerateSkills={getPrimarySkills}
                  >
                    <ul className="border-2 border-transparent hover:border-dashed hover:border-gray-500  pl-0 flex flex-row  flex-wrap gap-1 h-[20%] text-xs ">
                      {" "}
                      {/* <li className="font-semibold uppercase">primary</li> */}
                      {resume?.primarySkills.map((skill: string, i: number) => (
                        <li
                          className="hover:shadow-md  w-[32%]  sm:w-[32%]  hover:cursor-move parent hover:border-dashed hover:border-gray-500 hover:border  hover:bg-gray-100 border-transparent border-[1px] flex  items-center"
                          key={i}
                          onDragStart={(e) =>
                            e.dataTransfer.setData("text/plain", i.toString())
                          }
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={(e) => handleDropPrimary(e, i)}
                          draggable
                        >
                          <div className="!w-1 !h-1 !mr-3 !bg-black !rounded-full"></div>
                          <div className="flex items-center justify-between w-full">
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
            {/* Work Experience */}
            <Experience
              heading={resume.headings.workExperienceArray}
              workExperienceArray={resume.workExperienceArray}
              workExperience={resume.workExperience}
              customStyle={customStyle_6}
              styles={experience}
            />

            {/* Add Custom */}
            {/* <CustomResumeSection /> */}
            {/* Publication */}
            {resume?.publications && resume?.publications.length > 0 && (
              <Publication
                heading={resume.headings.publications}
                publications={resume.publications}
                styles={publicationStyles}
                customStyle={customStyle_6}
              />
            )}
            {/* Certification */}
            {resume?.certifications && resume?.certifications.length > 0 && (
              <Certification
                customStyle={customStyle_6}
                heading={resume.headings.certifications}
                certificates={resume.certifications}
                styles={certification}
              />
            )}
            {/* Trainings */}
            {resume?.trainings && resume?.trainings.length > 0 && (
              <Training
                heading={resume.headings.trainings}
                trainings={resume.trainings}
                styles={training}
                customStyle={customStyle_6}
              />
            )}

            {/* Awards */}
            {resume?.awards && resume?.awards.length > 0 && (
              <Award
                heading={resume.headings.awards}
                awards={resume.awards}
                styles={award}
                customStyle={customStyle_6}
              />
            )}
            {/* Projects */}
            <div className="w-full">
              {resume?.projects && resume?.projects.length > 0 && (
                <Project
                  heading={resume.headings.projects}
                  projects={resume.projects}
                  styles={projectStyles}
                  customStyle={customStyle_6}
                />
              )}
            </div>
            {/* Interests & Hobbies */}
            {resume?.interests && resume?.interests.length > 0 && (
              <Interest
                heading={resume.headings.interests}
                interests={resume.interests}
                styles={interest}
                customStyle={customStyle_6}
              />
            )}

            {/* References */}
            {resume?.references && resume?.references.length > 0 && (
              <Reference
                heading={resume.headings.references}
                references={resume.references}
                styles={reference}
                customStyle={customStyle_6}
              />
            )}

            {/* Languages */}
            {resume?.languages && resume?.languages.length > 0 && (
              <Language
                heading={resume.headings.languages}
                languages={resume.languages}
                styles={language}
                customStyle={customStyle_6}
              />
            )}

            {/* Education */}
            <div className="w-full  mb-2">
              {resume?.education.length > 0 && (
                <Education
                  heading={resume.headings.education}
                  educations={resume.education}
                  styles={education}
                  customStyle={customStyle_6}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default memo(ResumeTemplate6);
