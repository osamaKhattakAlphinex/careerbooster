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
  conditionStyleHeader,
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
  template_6_styles,
  training,
} from "@/helpers/templateStylesObj";
import Summary from "./resume-sections/summary";
import Experience from "./resume-sections/experience";
import Education from "./resume-sections/education";
import Project from "./resume-sections/project";
import Skill from "./resume-sections/skills";
import Header from "./resume-sections/header";
import Contact from "./resume-sections/contact";
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
          <Header
            name={resume.name}
            jobTitle={resume.jobTitle}
            styles={template_6_styles}
            conditionStyleHeader={conditionStyleHeader}
          />
          <Contact contact={resume.contact} styles={template_6_styles} />
          {/* EXECUTIVE SUMMARY */}
          <div className="flex flex-col flex-wrap w-full ">
            <Summary
              heading={resume.headings.summary}
              summary={resume.summary}
              styles={summary}
              customStyle={customStyle_6}
            />

            <Skill
              heading={resume.headings.primarySkills}
              skills={resume.primarySkills}
              styles={template_6_styles}
              customStyle={{
                borderTopBottom: true,
                borderBottom: false,
                centeredHeading: false,
              }}
            />
            {/* Work Experience */}
            <Experience
              heading={resume.headings.workExperienceArray}
              workExperienceArray={resume.workExperienceArray}
              workExperience={resume.workExperience}
              customStyle={customStyle_6}
              styles={template_6_styles}
            />

            {/* Add Custom */}
            {/* <CustomResumeSection /> */}
            {/* Publication */}
            {resume?.publications && resume?.publications.length > 0 && (
              <Publication
                heading={resume.headings.publications}
                publications={resume.publications}
                styles={template_6_styles}
                customStyle={customStyle_6}
              />
            )}
            {/* Certification */}
            {resume?.certifications && resume?.certifications.length > 0 && (
              <Certification
                customStyle={customStyle_6}
                heading={resume.headings.certifications}
                certificates={resume.certifications}
                styles={template_6_styles}
              />
            )}
            {/* Trainings */}
            {resume?.trainings && resume?.trainings.length > 0 && (
              <Training
                heading={resume.headings.trainings}
                trainings={resume.trainings}
                styles={template_6_styles}
                customStyle={customStyle_6}
              />
            )}

            {/* Awards */}
            {resume?.awards && resume?.awards.length > 0 && (
              <Award
                heading={resume.headings.awards}
                awards={resume.awards}
                styles={template_6_styles}
                customStyle={customStyle_6}
              />
            )}
            {/* Projects */}
            <div className="w-full">
              {resume?.projects && resume?.projects.length > 0 && (
                <Project
                  heading={resume.headings.projects}
                  projects={resume.projects}
                  styles={template_6_styles}
                  customStyle={customStyle_6}
                />
              )}
            </div>
            {/* Interests & Hobbies */}
            {resume?.interests && resume?.interests.length > 0 && (
              <Interest
                heading={resume.headings.interests}
                interests={resume.interests}
                styles={template_6_styles}
                customStyle={customStyle_6}
              />
            )}

            {/* References */}
            {resume?.references && resume?.references.length > 0 && (
              <Reference
                heading={resume.headings.references}
                references={resume.references}
                styles={template_6_styles}
                customStyle={customStyle_6}
              />
            )}

            {/* Languages */}
            {resume?.languages && resume?.languages.length > 0 && (
              <Language
                heading={resume.headings.languages}
                languages={resume.languages}
                styles={template_6_styles}
                customStyle={customStyle_6}
              />
            )}

            {/* Education */}
            <div className="w-full  mb-2">
              {resume?.education.length > 0 && (
                <Education
                  heading={resume.headings.education}
                  educations={resume.education}
                  styles={template_6_styles}
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
