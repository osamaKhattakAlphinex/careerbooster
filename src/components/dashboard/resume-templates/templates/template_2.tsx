"use client";
import { memo, useEffect, useState } from "react";
import React from "react";
import { useSelector } from "react-redux";
import { ColorResult } from "react-color";
import Publication from "./resume-sections/publication";
import Certification from "./resume-sections/certification";
import Language from "./resume-sections/language";
import Reference from "./resume-sections/reference";
import Interest from "./resume-sections/interest";
import Award from "./resume-sections/award";
import Training from "./resume-sections/trainings";
import Contact from "./resume-sections/contact";
import Education from "./resume-sections/education";
import Experience from "./resume-sections/experience";
import Skill from "./resume-sections/skills";
import Summary from "./resume-sections/summary";
import Header from "./resume-sections/header";
import {
  certification,
  publicationStyles,
  template_2,
} from "@/helpers/templateStylesObj";
import Project from "./resume-sections/project";

const ResumeTemplate2 = () => {
  const resume = useSelector((state: any) => state.resume);

  const [color, setColor] = useState("#e9e8e8");
  const [color_second, setColor_second] = useState("#e9e8e8");

  const saveColor = (color: ColorResult) => {
    // Access the selected color value from the 'color' parameter
    setColor(color.hex);

    // You can do whatever you need with the selected color here
  };
  const saveColor_second = (color: ColorResult) => {
    // Access the selected color value from the 'color' parameter
    setColor_second(color.hex);

    // You can do whatever you need with the selected color here
  };
  return (
    <div className="flex flex-col py-2 items-start justify-start w-full px-6 space-y-4 text-gray-900 first-page">
      {/* Name and Title */}
      <div className="flex flex-col items-center w-full px-8 py-4 mt-1 text-center bg-gray-300  rounded-xl">
        <Header
          name={resume.name}
          jobTitle={resume.jobTitle}
          fullNameStyle="fullName-temp-2"
          jobTitleStyle="jobTitle-temp-2"
        />
        {/* <div className="absolute top-0 left-12">
          <ColorPicker
            defaultColor="#e9e8e8"
            resetColor="#e9e8e8"
            setColor={setColor}
            styles_pin="relative top-[6px]  -left-5"
            styles_div="absolute top-3 left-0"
            secondDefaultColor="#e9e8e8"
            setColor_second={setColor_second}
            saveColor={saveColor}
          />
        </div> */}
      </div>
      {/* contacts */}
      <div className="relative w-full py-1">
        <Contact
          contact={resume.contact}
          contactStyle="contact-temp-2"
          contactStyle_li="contact-temp-2-li"
        />
        {/* <div className="absolute top-0 left-12">
          <ColorPicker\


            defaultColor="#e9e8e8"
            resetColor="#e9e8e8"
            setColor={setColor}
            styles_pin="relative top-[18px]  -left-9"
            styles_div="absolute top-3 left-0"
            secondDefaultColor="#e9e8e8"
            setColor_second={setColor_second}
            saveColor={saveColor_second}
          />
        </div> */}
      </div>
      {/* summary objective */}
      <div className="w-full space-y-3 ">
        <Summary
          heading={resume.headings.summary}
          summary={resume.summary}
          headingStyle="summaryHeading-temp-2"
          textStyle="summaryText-temp-2"
        />
      </div>
      {/* Skills  */}
      <div className="w-full space-y-3">
        <Skill
          heading={resume.headings.primarySkills}
          skills={resume.primarySkills}
          skillHeading="skillHeading-temp-2"
          skill_ul="skill-ul-temp-2"
          skill_li="skill-li-temp-2"
          skillNewStyle="skill-New-temp-2"
        />
      </div>

      {/* Work Experience */}
      <div className="flex flex-col w-full space-y-3">
        <Experience
          heading={resume.headings.workExperienceArray}
          workExperienceArray={resume.workExperienceArray}
          workExperience={resume.workExperience}
          styles={template_2}
        />
      </div>

      {/* Publications */}
      <div className="w-full">
        {resume?.publications && resume?.publications.length > 0 && (
          <Publication
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
            heading={resume.headings.trainings}
            trainings={resume.trainings}
          />
        )}
      </div>

      {/* Projects */}
      <div className="w-full">
        {resume?.projects && resume?.projects.length > 0 && (
          <Project
            heading={resume.headings.projects}
            projects={resume.projects}
          />
        )}
      </div>

      {/* Awards */}
      <div className="w-full">
        {resume?.awards && resume?.awards.length > 0 && (
          <Award heading={resume.headings.awards} awards={resume.awards} />
        )}
      </div>

      {/* Interests & Hobbies */}
      <div className="w-full">
        {resume?.interests && resume?.interests.length > 0 && (
          <Interest
            heading={resume.headings.interests}
            interests={resume.interests}
          />
        )}
      </div>

      {/* References */}
      <div className="w-full">
        {resume?.references && resume?.references.length > 0 && (
          <Reference
            heading={resume.headings.references}
            references={resume.references}
          />
        )}
      </div>

      {/* Languages */}
      <div className="w-full">
        {resume?.languages && resume?.languages.length > 0 && (
          <Language
            heading={resume.headings.languages}
            languages={resume.languages}
          />
        )}
      </div>

      {/* Add Custom */}
      {/* <CustomResumeSection /> */}

      {/* Education */}
      <div className="w-full space-y-3 ">
        {resume?.education.length > 0 && (
          <Education
            heading={resume.headings.education}
            educations={resume.education}
          />
        )}
      </div>
    </div>
  );
};
export default memo(ResumeTemplate2);
