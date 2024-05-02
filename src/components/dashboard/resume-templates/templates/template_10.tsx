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

import {
  award,
  certification,
  conditionStyleHeader,
  customStyle_10,
  education,
  experience,
  interest,
  language,
  projectStyles,
  publicationStyles,
  reference,
  summary,
  template_10_styles,
  training,
} from "@/helpers/templateStylesObj";

import Publication from "./resume-sections/publication";
import Header from "./resume-sections/header";
import Contact from "./resume-sections/contact";
import Skill from "./resume-sections/skills";
import Interest from "./resume-sections/interest";
import Language from "./resume-sections/language";
import Summary from "./resume-sections/summary";
import Experience from "./resume-sections/experience";
import Certification from "./resume-sections/certification";
import Training from "./resume-sections/trainings";
import Award from "./resume-sections/award";
import Project from "./resume-sections/project";
import Reference from "./resume-sections/reference";
import Education from "./resume-sections/education";

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
          <Header
            name={resume.name}
            jobTitle={resume.jobTitle}
            styles={template_10_styles}
            conditionStyleHeader={conditionStyleHeader}
          />
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

          <Contact contact={resume.contact} styles={template_10_styles} />

          {/* Skills */}

          <Skill
            heading={resume.headings.primarySkills}
            skills={resume.primarySkills}
            styles={template_10_styles}
            customStyle={{
              customStyle_10,
            }}
            rounded_style="rounded-3xl border-2 border-[#043382] xs:py-2 py-[6px] my-3  flex justify-center"
          />
          {/* Interests & Hobbies */}

          {resume?.interests && resume?.interests.length > 0 && (
            <Interest
              // customStyle={customStyle_4}
              heading={resume.headings.interests}
              interests={resume.interests}
              styles={template_10_styles}
              rounded_style="rounded-3xl border-2 border-[#043382] xs:py-2 py-[6px] my-3  flex justify-center"
            />
          )}
          {/* Languages */}
          {resume?.languages && resume?.languages.length > 0 && (
            <Language
              // customStyle={customStyle_4}

              heading={resume.headings.languages}
              languages={resume.languages}
              styles={template_10_styles}
              rounded_style="rounded-3xl border-2 border-[#043382] xs:py-2 py-[6px] my-3  flex justify-center"
            />
          )}
        </div>
        <div className="w-full flex flex-wrap flex-col px-4 sm:px-2 xs:px-2 md:px-8 lg:px-8  text-gray-950 pb-10 pt-[160px] ">
          {/* Executive Summary */}
          <div className="">
            <Summary
              heading={resume.headings.summary}
              summary={resume.summary}
              styles={template_10_styles}
              customStyle={customStyle_10}
            />
          </div>

          {/* Work Experience */}
          <div className="my-4">
            <Experience
              heading={resume.headings.workExperienceArray}
              workExperienceArray={resume.workExperienceArray}
              workExperience={resume.workExperience}
              customStyle={customStyle_10}
              styles={template_10_styles}
            />
          </div>

          {/* Add Custom */}
          {/* <CustomResumeSection /> */}
          {/* Publications */}
          <div className="w-full">
            {resume?.publications && resume?.publications.length > 0 && (
              <Publication
                customStyle={customStyle_10}
                heading={resume.headings.publications}
                publications={resume.publications}
                styles={template_10_styles}
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
                styles={template_10_styles}
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
                styles={template_10_styles}
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
                styles={template_10_styles}
              />
            )}
          </div>
          {/* Projects */}
          <div className="w-full">
            {resume?.projects && resume?.projects.length > 0 && (
              <Project
                heading={resume.headings.projects}
                projects={resume.projects}
                styles={template_10_styles}
                customStyle={customStyle_10}
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
                styles={template_10_styles}
              />
            )}
          </div>

          {/* Education */}
          <div className="w-full  my-4">
            {resume?.education.length > 0 && (
              <Education
                heading={resume.headings.education}
                educations={resume.education}
                styles={template_10_styles}
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
