"use client";
import { memo, useEffect, useState } from "react";
import React from "react";
import { useSelector } from "react-redux";

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
import Toolbar from "@/components/dashboard/Toolbar";
import EditableField from "@/components/dashboard/EditableField";
import useSingleJDGenerate from "@/hooks/useSingleJDGenerate";
import useDragAndDrop from "@/hooks/useDragAndDrop";
import useGetPrimarySkills from "@/hooks/useGetPrimarySkills";
import useAddPrimarySkill from "@/hooks/useAddPrimarySkill";
import useUpdateAndSave from "@/hooks/useUpdateAndSave";
import useHandler from "@/hooks/useHandler";
import { ColorResult } from "react-color";
import ColorPicker from "../colorPicker";
import DeleteConfirmationModal from "@/components/common/ConfirmationModal";
import { useColorContext } from "@/context/ResumeColorContext";
import Publication from "./resume-sections/publication";
import {
  award,
  certification,
  customStyle_10,
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
import Summary from "./resume-sections/summary";
import Experience from "./resume-sections/experience";
import Education from "./resume-sections/education";
import Project from "./resume-sections/project";

const ResumeTemplate10 = () => {
  const resume = useSelector((state: any) => state.resume);
  const [newPrimarySkill, setNewPrimarySkill] = useState(false);
  const [newWorkExperience, setNewWorkExperience] = useState<number>();
  const [newAchievement, setNewAchievement] = useState("");

  const { color, setColor, color_second, setColor_second } = useColorContext();
  // const [color, setColor] = useState("#043382");
  // const [color_second, setColor_second] = useState("#1a202c");
  const [primarySkill, setPrimarySkill] = useState<string>("");
  const [regenerating, setRegenerating] = useState(false);
  const { getPrimarySkills } = useGetPrimarySkills(setRegenerating);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [regeneratedRecordIndex, setRegeneratedRecordIndex] = useState<
    number | null
  >(null);
  const [streamedSummaryData, setStreamedSummaryData] = useState("");
  const { getSummary } = useGetSummary(setStreamedSummaryData);
  const [streamedJDData, setStreamedJDData] = useState<any>("");

  //add new code

  const { getOneWorkExperienceNew } = useSingleJDGenerate(setStreamedJDData);
  const { handleDropPrimary, handleDropAchievement, handleDropExperience } =
    useDragAndDrop();

  //New code end

  const [insideIndex, setInsideIndex] = useState<number>(0);
  const { addPrimarySkill } = useAddPrimarySkill();
  const { updateSaveHook } = useUpdateAndSave();
  const { handlers } = useHandler();
  // useEffect(() => {}, [color, color_second]);
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

  // // You can do whatever you need with the selected color here
  // };
  // const saveColor_second = (color: ColorResult) => {
  // // Access the selected color value from the 'color' parameter
  // setColor_second(color.hex);

  // // You can do whatever you need with the selected color here
  // };
  return (
    <div className="relative first-page">
      <div
        className="flex  flex-row absolute top-[30px] bg-[#043382] h-28 z-10 items-center justify-center w-full "
        // style={{ backgroundColor: color }}
      >
        {/* <ColorPicker
          defaultColor="#043382"
          setColor={setColor}
          resetColor="#043382"
          styles_pin="absolute top-2  left-2"
          styles_div="relative top-5 -left-6 "
          secondDefaultColor="#1a202c"
          setColor_second={setColor_second}
          saveColor={saveColor}
        />  */}
        {/* <div className="  z-50 w-40 h-40 xs:w-[120px] xs:h-[80px] sm:w-[120px] sm:h-[80px] border-2 border-[#042B6B] md:w-48 md:h-48 lg:w-48 lg:h-48  text-white bg-gray-800 text-center flex justify-center   rounded-full mx-4  md:mt-0 md:mr-8 items-center ">
          <span className="text-4xl md:text-3xl hover:shadow-md hover:bg-gray-500">
            <EditableField
              value={resume?.shortName ? resume?.shortName : "CPH"}
              style={{ width: "60px" }}
              onSave={(value: string) => {
                dispatch(setField({ name: "shortName", value: value }));
                saveResumeToDB({ ...resume, shortName: value });
              }}
            />
          </span>
        </div> */}
        <div className="flex flex-col ">
          <h2 className="text-4xl font-bold text-gray-100 border-2 border-transparent hover:shadow-md hover:bg-gray-500 hover:border-dashed hover:border-gray-500 flex justify-center">
            <EditableField
              className={`md:w-auto xs:w-fit`}
              value={resume?.name ? resume?.name : "FULL NAME"}
              // style={{ width: "fit-content" }}
              onSave={(value: string) => {
                if (value !== resume?.name) {
                  updateSaveHook.updateAndSaveName(value);
                }
              }}
            />
          </h2>
          <h3 className="flex items-center justify-center text-lg text-gray-100 border-2 border-transparent xs:text-xs md:text-2xl lg:text-2xl hover:shadow-md hover:bg-gray-500 hover:border-dashed hover:border-gray-500">
            <EditableField
              className={` xs:w-fit md:w-[600px] lg:w-[600px]`}
              // style={{ width: "600px" }}
              value={resume?.jobTitle ? resume?.jobTitle : "JOB TITLE"}
              onSave={(value: string) => {
                if (value !== resume?.jobTitle) {
                  updateSaveHook.updateAndSaveJobTitle(value);
                }
              }}
            />
          </h3>
        </div>
      </div>
      <div className="flex ">
        {/* sidebar */}
        <div
          className="z-5 xs:w-4/12 w-3.5/12 bg-[#030712] flex flex-col pl-3 xs:pl-0 sm:pl-0 md:pl-0 lg:pl-3 xs:pr-4 sm:pr-4 md:pr-4 lg:pr-6  text-gray-100  pr-6  pb-8  pt-[160px] h-auto"
          // style={{ backgroundColor: color_second }}
        >
          {/* <div className="absolute top-0 left-0 z-20 xs:w-3/12 ">
            <ColorPicker
              defaultColor="#043382"
              resetColor="#1a202c"
              setColor={setColor}
              styles_pin="relative top-[6px]  left-0"
              styles_div="absolute top-3 left-56 "
              secondDefaultColor="#1a202c"
              setColor_second={setColor_second}
              saveColor={saveColor_second}
            />
          </div>  */}
          {/* contacts */}
          <div
            className="rounded-3xl border-2  border-[#043382] xs:py-2 py-[6px] flex justify-center "
            // style={{ borderColor: color }}
          >
            <h3 className="flex flex-row items-center gap-2 mb-0 text-base font-semibold text-center uppercase border-2 border-transparent hover:border-dashed hover:border-gray-500 ">
              {resumeContactIcon}
              <EditableField
                value={
                  resume?.headings?.contact
                    ? resume.headings.contact
                    : "Contact"
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
          </div>

          <ul className="flex flex-col gap-2 pl-0 mt-4 text-xs break-all ">
            <li className="flex items-center hover:shadow-md mb-[8px] hover:bg-gray-500 text-xs flex-row gap-1 justify-start">
              <div
                className="bg-[#043382] rounded-full p-2 mr-3"
                // style={{ backgroundColor: color }}
              >
                {phoneIcon}
              </div>

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
            <li className="hover:shadow-md mb-[8px] hover:bg-gray-500 flex flex-row gap-1 justify-start  items-center text-xs">
              <div
                className="p-2 mr-3 bg-[#043382] rounded-full "
                // style={{ backgroundColor: color }}
              >
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
                  if (value !== resume?.contact?.email) {
                    updateSaveHook.updateAndSaveBasicInfo({ email: value });
                  }
                }}
              />
            </li>

            <li className="hover:shadow-md mb-[8px] hover:bg-gray-500 text-gray-100 flex flex-row justify-start gap-1  items-center text-xs">
              <div
                className="p-2 mr-3  flex justify-center items-center  bg-[#043382] rounded-full"
                // style={{ backgroundColor: color }}
              >
                <span className="block w-4 h-4 text-center text-white">in</span>
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
            <li className="hover:shadow-md mb-[8px] hover:bg-gray-500 text-gray-100 flex flex-row justify-start gap-1  items-center text-xs ">
              <div
                className="p-2 mr-3 text-white bg-[#043382] rounded-full"
                // style={{ backgroundColor: color }}
              >
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

          {/* Skills */}

          {resume?.primarySkills && resume?.primarySkills.length > 0 && (
            <>
              <div
                className="rounded-3xl border-2 border-[#043382] xs:py-2 py-[6px] my-3  flex justify-center"
                // style={{ borderColor: color }}
              >
                <h3 className="flex flex-row items-center gap-2 mb-0 text-base font-semibold uppercase border-2 border-transparent hover:border-dashed hover:border-gray-500 ">
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
              </div>
              {resume?.primarySkills &&
              resume?.primarySkills.length > 0 &&
              !regenerating ? (
                <Toolbar
                  addSkill={handleAddSkills}
                  regenerateSkills={getPrimarySkills}
                >
                  <ul className="flex flex-col gap-3 mb-4 text-xs border-2 border-transparent hover:border-dashed hover:border-gray-500">
                    {resume?.primarySkills.map((skill: string, i: number) => (
                      <li
                        className="hover:shadow-md hover:cursor-move parent border-transparent border-[1px] hover:border-dashed hover:border-gray-500 hover:border  hover:bg-gray-500 flex gap-2  items-center "
                        key={i}
                        onDragStart={(e) =>
                          e.dataTransfer.setData("text/plain", i.toString())
                        }
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => handleDropPrimary(e, i)}
                        draggable
                      >
                        <span className="bg-gray-100 !block w-1 h-1 rounded-full"></span>
                        <div className="flex justify-between w-full">
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
        <div className="w-full flex flex-wrap flex-col px-4 sm:px-2 xs:px-2 md:px-8 lg:px-8  text-gray-950 pb-10 pt-[140px] ">
          {/* Executive Summary */}
          <Summary
            heading={resume.headings.summary}
            summary={resume.summary}
            styles={summary}
            customStyle={customStyle_10}
          />

          {/* Work Experience */}
          <Experience
            heading={resume.headings.workExperienceArray}
            workExperienceArray={resume.workExperienceArray}
            workExperience={resume.workExperience}
            customStyle={customStyle_10}
            styles={experience}
          />

          {/* Add Custom */}
          {/* <CustomResumeSection /> */}
          {/* Publications */}
          <div className="w-full">
            {resume?.publications && resume?.publications.length > 0 && (
              <Publication
                customStyle={customStyle_10}
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
                customStyle={customStyle_10}
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
                customStyle={customStyle_10}
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
                customStyle={customStyle_10}
                heading={resume.headings.awards}
                awards={resume.awards}
                styles={award}
              />
            )}
          </div>
          {/* Projects */}
          <div className="w-full">
            {resume?.projects && resume?.projects.length > 0 && (
              <Project
                heading={resume.headings.projects}
                projects={resume.projects}
                styles={projectStyles}
                customStyle={customStyle_10}
              />
            )}
          </div>
          {/* Interests & Hobbies */}
          <div className="w-full">
            {resume?.interests && resume?.interests.length > 0 && (
              <Interest
                customStyle={customStyle_10}
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
                customStyle={customStyle_10}
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
                customStyle={customStyle_10}
                heading={resume.headings.languages}
                languages={resume.languages}
                styles={language}
              />
            )}
          </div>
          {/* Education */}
          <div className="w-full  mb-2">
            {resume?.education.length > 0 && (
              <Education
                heading={resume.headings.education}
                educations={resume.education}
                styles={education}
                customStyle={customStyle_10}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default memo(ResumeTemplate10);
