"use client";
import { memo, useState } from "react";
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
  conditionStyleHeader,
  customStyle_2,
  template_2_styles,
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
    <div className="flex flex-col py-2 items-start justify-start w-full px-6 space-y-1 text-gray-900 first-page">
      {/* Name and Title */}
      <div className="flex flex-col items-center w-full px-8 py-4 mt-1 text-center bg-gray-300  rounded-xl">
        <Header
          name={resume.name}
          jobTitle={resume.jobTitle}
          styles={template_2_styles}
          conditionStyleHeader={conditionStyleHeader}
        />
      </div>
      {/* contacts */}
      <div className="relative w-full">
        <Contact contact={resume.contact} styles={template_2_styles} />
      </div>
      {/* summary objective */}
      <div className="w-full ">
        <Summary
          heading={resume.headings.summary}
          summary={resume.summary}
          styles={template_2_styles}
          customStyle={customStyle_2}
        />
      </div>
      {/* Skills  */}
      <div className="w-full space-y-3">
        <Skill
          heading={resume.headings.primarySkills}
          skills={resume.primarySkills}
          styles={template_2_styles}
        />
      </div>

      {/* Work Experience */}
      <div className="flex flex-col w-full space-y-3">
        <Experience
          heading={resume.headings.workExperienceArray}
          workExperienceArray={resume.workExperienceArray}
          workExperience={resume.workExperience}
          styles={template_2_styles}
        />
      </div>

      {/* Publications */}
      {resume?.publications && resume?.publications.length > 0 && (
        <div className="w-full">
          <Publication
            heading={resume.headings.publications}
            publications={resume.publications}
            styles={template_2_styles}
          />
        </div>
      )}

      {/* Certificates */}
      {resume?.certifications && resume?.certifications.length > 0 && (
        <div className="w-full">
          <Certification
            heading={resume.headings.certifications}
            certificates={resume.certifications}
            styles={template_2_styles}
          />
        </div>
      )}

      {/* Trainings */}
      {resume?.trainings && resume?.trainings.length > 0 && (
        <div className="w-full">
          <Training
            heading={resume.headings.trainings}
            trainings={resume.trainings}
            styles={template_2_styles}
          />
        </div>
      )}

      {/* Awards */}
      {resume?.awards && resume?.awards.length > 0 && (
        <div className="w-full">
          <Award
            heading={resume.headings.awards}
            awards={resume.awards}
            styles={template_2_styles}
          />
        </div>
      )}
      {/* Projects */}
      {resume?.projects && resume?.projects.length > 0 && (
        <div className="w-full">
          <Project
            heading={resume.headings.projects}
            projects={resume.projects}
            styles={template_2_styles}
            customStyle={customStyle_2}
          />
        </div>
      )}

      {/* Projects */}
      {resume?.projects && resume?.projects.length > 0 && (
        <div className="w-full">
          <Project
            heading={resume.headings.projects}
            projects={resume.projects}
            styles={template_2_styles}
          />
        </div>
      )}

      {/* Interests & Hobbies */}
      {resume?.interests && resume?.interests.length > 0 && (
        <div className="w-full">
          <Interest
            heading={resume.headings.interests}
            interests={resume.interests}
            styles={template_2_styles}
            customStyle={customStyle_2}
          />
        </div>
      )}

      {/* References */}
      {resume?.references && resume?.references.length > 0 && (
        <div className="w-full">
          <Reference
            heading={resume.headings.references}
            references={resume.references}
            styles={template_2_styles}
          />
        </div>
      )}

      {/* Languages */}
      {resume?.languages && resume?.languages.length > 0 && (
        <div className="w-full">
          <Language
            heading={resume.headings.languages}
            languages={resume.languages}
            styles={template_2_styles}
          />
        </div>
      )}

      {/* Add Custom */}
      {/* <CustomResumeSection /> */}

      {/* Education */}
      <div className="w-full space-y-3 ">
        {resume?.education.length > 0 && (
          <Education
            heading={resume.headings.education}
            educations={resume.education}
            styles={template_2_styles}
            customStyle={customStyle_2}
          />
        )}
      </div>
    </div>
  );
};
export default memo(ResumeTemplate2);
