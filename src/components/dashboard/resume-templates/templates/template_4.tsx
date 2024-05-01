"use client";
import { memo, useEffect, useState } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { TwitterPicker, ColorResult } from "react-color";
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
import Summary from "./resume-sections/summary";
import Toolbar from "@/components/dashboard/Toolbar";
import useGetSummary from "@/hooks/useGetSummary";
import EditableField from "@/components/dashboard/EditableField";
import useSingleJDGenerate from "@/hooks/useSingleJDGenerate";
import useSaveResumeToDB from "@/hooks/useSaveToDB";
import useDragAndDrop from "@/hooks/useDragAndDrop";
import useGetPrimarySkills from "@/hooks/useGetPrimarySkills";
import useAddPrimarySkill from "@/hooks/useAddPrimarySkill";
import useUpdateAndSave from "@/hooks/useUpdateAndSave";

import useHandler from "@/hooks/useHandler";
import ColorPicker from "../colorPicker";
import DeleteConfirmationModal from "@/components/common/ConfirmationModal";
import AddItemToCustomSection from "../../resume-builder/AddItemToCustomSection";
import Publication from "./resume-sections/publication";
import {
  award,
  certification,
  conditionStyleHeader,
  customStyle_16,
  customStyle_4,
  education,
  experience,
  interest,
  language,
  projectStyles,
  publicationStyles,
  reference,
  skill,
  summary,
  template_4_styles,
  training,
} from "@/helpers/templateStylesObj";
import Certification from "./resume-sections/certification";
import Training from "./resume-sections/trainings";
import Award from "./resume-sections/award";
import Interest from "./resume-sections/interest";
import Reference from "./resume-sections/reference";
import Language from "./resume-sections/language";
import Experience from "./resume-sections/experience";
import Education from "./resume-sections/education";
import Project from "./resume-sections/project";
import Skill from "./resume-sections/skills";
import Contact from "./resume-sections/contact";
import Header from "./resume-sections/header";
// import CustomResumeSection from "../../resume-builder/CustomResumeSection";
const ResumeTemplate4 = () => {
  const dispatch = useDispatch();
  const resume = useSelector((state: any) => state.resume);
  const [newPrimarySkill, setNewPrimarySkill] = useState(false);
  const [newWorkExperience, setNewWorkExperience] = useState<number>();

  const [newAchievement, setNewAchievement] = useState("");
  const [regenerating, setRegenerating] = useState(false);
  const { getPrimarySkills } = useGetPrimarySkills(setRegenerating);
  const [regeneratedRecordIndex, setRegeneratedRecordIndex] = useState<
    number | null
  >(null);
  const [streamedSummaryData, setStreamedSummaryData] = useState("");
  const { getSummary } = useGetSummary(setStreamedSummaryData);
  const [streamedJDData, setStreamedJDData] = useState<any>("");
  const { saveResumeToDB } = useSaveResumeToDB();

  const { getOneWorkExperienceNew } = useSingleJDGenerate(setStreamedJDData);
  const { handleDropPrimary, handleDropAchievement, handleDropExperience } =
    useDragAndDrop();

  const [primarySkill, setPrimarySkill] = useState<string>("");

  const [insideIndex, setInsideIndex] = useState<number>(0);

  const { addPrimarySkill } = useAddPrimarySkill();
  const { updateSaveHook } = useUpdateAndSave();
  const { handlers } = useHandler();
  // const [color, setColor] = useState("#323B4C");
  // const [color_second, setColor_second] = useState("#1b1f27");

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
  const [confirmationModal, setConfirmationModal] = useState(false);
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
  // Access the selected color value from the 'color' parameter
  // setColor(color.hex);

  // You can do whatever you need with the selected color here
  // };
  // const saveColor_second = (color: ColorResult) => {
  // Access the selected color value from the 'color' parameter
  // setColor_second(color.hex);

  // You can do whatever you need with the selected color here
  // };
  return (
    <div className="first-page ">
      <div className="flex ">
        <div
          className="flex flex-col w-3/12 bg-[#323B4C] h-auto pt-6 pb-8 pl-3 pr-6 text-gray-100 xs:w-1/3 md:w-3/12 md:pl-4 md:pr-4 xs:pt-2"
          // style={{ backgroundColor: color }}
        >
          {/* <div className="w-full">
            <ColorPicker
              defaultColor="#323B4C"
              resetColor="#323B4C"
              setColor={setColor}
              styles_pin=" relative  right-0"
              styles_div="absolute top-4 left-48"
              secondDefaultColor="#1b1f27"
              setColor_second={setColor_second}
              saveColor={saveColor}
            />
          </div> */}
          <div
            // style={{ backgroundColor: color_second }}
            className=" w-28 h-28 xs:w-[72px] bg-[#111827] relative xs:h-[72px] sm:w-24 sm:h-24 md:w-28 md:h-28 text-white  text-center flex  items-center border-[1px] border-white  rounded-full mx-auto xs:mx-0 md:mx-auto mt-4  md:mt-5 mb-4 justify-center md:mb-2"
          >
            <span className="text-3xl font-semibold border-2 border-transparent xs:text-2xl md:text-3xl hover:shadow-md hover:bg-gray-500 hover:border-dashed hover:border-gray-500 ">
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
              defaultColor="#323B4C"
              resetColor="#1b1f27"
              styles_pin="absolute  top-1 right-1"
              styles_div="absolute top-3 -left-1"
              setColor={setColor}
              secondDefaultColor="#1b1f27"
              setColor_second={setColor_second}
              saveColor={saveColor_second}
            /> */}
          </div>
          {/* contacts */}

          <h3 className="flex flex-row items-center gap-2 mb-2 -mr-6 text-base font-semibold uppercase border-2 border-transparent md:-mr-6 md:mt-4 hover:border-dashed hover:border-gray-500 hover:w-full">
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
          <span className="w-full mb-4 border-b-2 border-gray-500 !block "></span>
          <Contact
            contact={resume.contact}
            styles={template_4_styles}
            iconColor="text-white"
          />

          {/* Skills */}
          <Skill
            heading={resume.headings.primarySkills}
            skills={resume.primarySkills}
            styles={template_4_styles}
            customStyle={{
              borderTopBottom: false,
              borderBottom: true,
              centeredHeading: false,
            }}
          />

          {/* Interests & Hobbies */}

          {resume?.interests && resume?.interests.length > 0 && (
            <Interest
              customStyle={customStyle_4}
              heading={resume.headings.interests}
              interests={resume.interests}
              styles={template_4_styles}
            />
          )}
          {/* Languages */}
          {resume?.languages && resume?.languages.length > 0 && (
            <Language
              customStyle={customStyle_4}
              heading={resume.headings.languages}
              languages={resume.languages}
              styles={template_4_styles}
            />
          )}
        </div>
        <div className="flex flex-col flex-wrap w-9/12 px-4 pt-10 pb-10 md:px-8 text-gray-950 xs:pt-16">
          <div className="flex flex-col ">
            <Header
              name={resume.name}
              jobTitle={resume.jobTitle}
              styles={template_4_styles}
              conditionStyleHeader={conditionStyleHeader}
            />
          </div>
          {/* Executive Summary */}
          <div className="w-full mt-4">
            <Summary
              heading={resume.headings.summary}
              summary={resume.summary}
              styles={summary}
              customStyle={customStyle_4}
            />
          </div>

          {/* work experience */}
          <div className="space-y-2">
            <Experience
              heading={resume.headings.workExperienceArray}
              workExperienceArray={resume.workExperienceArray}
              workExperience={resume.workExperience}
              customStyle={customStyle_4}
              styles={experience}
            />
          </div>

          {/* Add Custom */}
          {/* <CustomResumeSection /> */}
          {/* Publications */}
          <div className="w-full">
            {resume?.publications && resume?.publications.length > 0 && (
              <Publication
                heading={resume.headings.publications}
                publications={resume.publications}
                customStyle={customStyle_4}
                styles={publicationStyles}
              />
            )}
          </div>

          {/* Certificates */}
          <div className="w-full">
            {resume?.certifications && resume?.certifications.length > 0 && (
              <Certification
                customStyle={customStyle_4}
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
                customStyle={customStyle_4}
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
                customStyle={customStyle_4}
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
                customStyle={customStyle_4}
              />
            )}
          </div>

          {/* References */}
          <div className="w-full">
            {resume?.references && resume?.references.length > 0 && (
              <Reference
                customStyle={customStyle_4}
                heading={resume.headings.references}
                references={resume.references}
                styles={reference}
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
                customStyle={customStyle_4}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default memo(ResumeTemplate4);
