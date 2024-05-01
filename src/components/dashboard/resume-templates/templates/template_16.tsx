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
  conditionStyleHeader,
  customStyle_16,
  education,
  experience,
  interest,
  language,
  projectStyles,
  publicationStyles,
  reference,
  summary,
  template_16_styles,
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
import Header from "./resume-sections/header";
import Contact from "./resume-sections/contact";
import Skill from "./resume-sections/skills";

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
          {/* <span className="w-full h-0 my-3 border border-gray-500"></span> */}
          <h3 className="flex flex-rosw items-center w-full gap-2 my-1 text-base font-semibold text-white uppercase border-2 border-transparent rounded-sm hover:border-dashed hover:border-gray-500">
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
          <span className="w-full mb-4 border border-gray-500 !block"></span>
          <Contact contact={resume.contact} styles={template_16_styles} />

          {/* Skills */}
          <Skill
            heading={resume.headings.primarySkills}
            skills={resume.primarySkills}
            styles={template_16_styles}
            customStyle={{
              borderTopBottom: false,
              borderBottom: true,
              centeredHeading: false,
            }}
          />
          {/* Interests & Hobbies */}
          <div className="w-full">
            {resume?.interests && resume?.interests.length > 0 && (
              <Interest
                customStyle={customStyle_16}
                heading={resume.headings.interests}
                interests={resume.interests}
                styles={template_16_styles}
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
                styles={template_16_styles}
              />
            )}
          </div>
        </div>
        <div className="xs:w-full w-9/12 flex flex-col xs:bg-[#fff] md:bg-[#fff] px-4 md:px-8 pt-[1rem] md:pt-[1rem]">
          <div className="flex flex-col justify-start pb-6 ">
            <Header
              name={resume.name}
              jobTitle={resume.jobTitle}
              styles={template_16_styles}
              conditionStyleHeader={conditionStyleHeader}
            />
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
