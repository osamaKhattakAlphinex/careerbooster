"use client";

import { useFormik } from "formik";

import ResumePreviews from "@/components/ResumePreviews";
import React from "react";

type Education = {
  educationLevel: string;
  fieldOfStudy: string;
  schoolName: string;
  schoolLocation: string;
  fromMonth: string;
  fromYear: string;
  isContinue: boolean;
  toMonth: string;
  toYear: string;
};

const WorkExperience = ({ experience, handleChange }: any) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-3 gap-2">
        <div className="">
          <label htmlFor={`workTitle_${experience.index}`}>Job Title:</label>
          <input
            type="text"
            id={`workTitle_${experience.index}`}
            name={`workExperiences[${experience.index}].title`}
            value={experience.title}
            onChange={handleChange}
            className="border p-2 w-full rounded-md bg-gray-300"
          />
        </div>
        <div>
          <label htmlFor={`workCompany_${experience.index}`}>Company:</label>
          <input
            type="text"
            id={`workCompany_${experience.index}`}
            name={`workExperiences[${experience.index}].company`}
            value={experience.company}
            onChange={handleChange}
            className="border p-2 w-full rounded-md bg-gray-300"
          />
        </div>
        <div>
          <label htmlFor={`workCountry_${experience.index}`}>Country:</label>
          <input
            type="text"
            id={`workCountry_${experience.index}`}
            name={`workExperiences[${experience.index}].country`}
            value={experience.country}
            onChange={handleChange}
            className="border p-2 w-full rounded-md bg-gray-300"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div>
          <label htmlFor={`workFromMonth_${experience.index}`}>
            From Month:
          </label>
          <input
            type="text"
            id={`workFromMonth_${experience.index}`}
            name={`workExperiences[${experience.index}].fromMonth`}
            value={experience.fromMonth}
            onChange={handleChange}
            className="border p-2 w-full rounded-md bg-gray-300"
          />
        </div>

        <div>
          <label htmlFor={`workFromYear_${experience.index}`}>From Year:</label>
          <input
            type="text"
            id={`workFromYear_${experience.index}`}
            name={`workExperiences[${experience.index}].fromYear`}
            value={experience.fromYear}
            onChange={handleChange}
            className="border p-2 w-full rounded-md bg-gray-300"
          />
        </div>
        <div>
          <label htmlFor={`workToMonth_${experience.index}`}>To Month:</label>
          <input
            type="text"
            id={`workToMonth_${experience.index}`}
            name={`workExperiences[${experience.index}].toMonth`}
            value={experience.toMonth}
            onChange={handleChange}
            className="border p-2 w-full rounded-md bg-gray-300"
          />
        </div>
        <div>
          <label htmlFor={`workToYear_${experience.index}`}>To Year:</label>
          <input
            type="text"
            id={`workToYear_${experience.index}`}
            name={`workExperiences[${experience.index}].toYear`}
            value={experience.toYear}
            onChange={handleChange}
            className="border p-2 w-full rounded-md bg-gray-300"
          />
        </div>
        <div>
          <label htmlFor={`isContinue_${experience.index}`}>
            Currently Working:
          </label>
          <input
            type="text"
            id={`isContinue_${experience.index}`}
            name={`workExperiences[${experience.index}].isContinue`}
            value={experience.isContinue}
            onChange={handleChange}
            className="border p-2 w-full rounded-md bg-gray-300"
          />
        </div>
      </div>

      <div className="w-full flex flex-col gap-2">
        {experience.achivements &&
          experience.achivements.length > 0 &&
          experience.achivements.map((achivement: string, index: number) => (
            <textarea
              key={index}
              className=" w-full p-1 rounded-md bg-gray-300"
            >
              {achivement}
            </textarea>
          ))}
      </div>
      {/* Add other fields as needed */}
    </div>
  );
};

const Education = ({
  education,
  index,
  handleChange,
}: {
  education: Education;
  index: number;
  handleChange: any;
}) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-3 gap-2">
        <div className="">
          <label htmlFor={`educationLevel_${index}`}>Education Level:</label>
          <input
            type="text"
            id={`educationLevel_${index}`}
            name={`educationLevel[${index}].educationLevel`}
            value={education.educationLevel}
            onChange={handleChange}
            className="border p-2 w-full rounded-md bg-gray-300"
          />
        </div>
        <div>
          <label htmlFor={`fieldOfStudy_${index}`}>Field Of Study:</label>
          <input
            type="text"
            id={`fieldOfStudy_${index}`}
            // name={`educations[${index}].fieldOfStudy`}
            value={education.fieldOfStudy}
            onChange={handleChange}
            className="border p-2 w-full rounded-md bg-gray-300"
          />
        </div>
        <div>
          <label htmlFor={`institute_${index}`}>Institute:</label>
          <input
            type="text"
            id={`institute_${index}`}
            name={`educations[${index}].schoolName`}
            value={education.schoolName}
            onChange={handleChange}
            className="border p-2 w-full rounded-md bg-gray-300"
          />
        </div>
        <div>
          <label htmlFor={`location_${index}`}>Location:</label>
          <input
            type="text"
            id={`location_${index}`}
            name={`educations[${index}].schoolLocation`}
            value={education.schoolLocation}
            onChange={handleChange}
            className="border p-2 w-full rounded-md bg-gray-300"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label htmlFor={`educationFromMonth_${index}`}>From Month:</label>
          <input
            type="text"
            id={`educationFromMonth_${index}`}
            name={`educations[${index}].toMonth`}
            value={education.fromMonth}
            onChange={handleChange}
            className="border p-2 w-full rounded-md bg-gray-300"
          />
        </div>

        <div>
          <label htmlFor={`educationFromYear_${index}`}>From Year:</label>
          <input
            type="text"
            id={`educationFromYear_${index}`}
            name={`educations[${index}].fromYear`}
            value={education.fromYear}
            onChange={handleChange}
            className="border p-2 w-full rounded-md bg-gray-300"
          />
        </div>
        <div>
          <label htmlFor={`educationToMonth_${index}`}>To Month:</label>
          <input
            type="text"
            id={`educationToMonth_${index}`}
            name={`educations[${index}].toMonth`}
            value={education.toMonth}
            onChange={handleChange}
            className="border p-2 w-full rounded-md bg-gray-300"
          />
        </div>
        <div>
          <label htmlFor={`educationToYear_${index}`}>To Year:</label>
          <input
            type="text"
            id={`educationToYear_${index}`}
            name={`educations[${index}].toYear`}
            value={education.toYear}
            onChange={handleChange}
            className="border p-2 w-full rounded-md bg-gray-300"
          />
        </div>
      </div>
    </div>
  );
};

const Editor = () => {
  const formik = useFormik({
    initialValues: {
      name: "Muhammad Waqas Shaukat",
      contact: {
        linkedIn: "dlsldsd/dkfkdkf/fkdlg",
        email: "132323424",
        phone: "132323424",
      },
      shortName: "WS",
      workExperiences: [
        {
          title: "Sr Software Engineer",
          cityState: "Rawalpindi",
          country: "Paksiatan",
          company: "Elysium Sols",
          fromMonth: "Feb",
          fromYear: "2023",
          isContinue: true,
          toMonth: "Sep",
          toYear: "2023",
          achivements: [
            "Led the development and implementation of React-based solutions for client projects, resulting in a 20% increase in user engagement.",
            "Collaborated with cross-functional teams to architect and design scalable and maintainable front-end systems, improving overall project delivery timelines by 15%.",
            "Mentored and coached junior developers in React best practices, resulting in an improvement of code quality and a reduction in bug-related issues by 30%.",
            "Conducted regular code reviews and provided constructive feedback, leading to a 25% increase in overall code quality and performance.",
            "Successfully resolved complex technical challenges through effective problem-solving and decision-making, ensuring timely project delivery and client satisfaction.",
          ],
        },
      ],
      education: [
        {
          educationLevel: "MS",
          fieldOfStudy: "Software Engineering",
          schoolName: "Bahria University Islamabad",
          schoolLocation: "",
          fromMonth: "",
          fromYear: "2018",
          isContinue: false,
          toMonth: "",
          toYear: "2020",
        },
      ],
      summary:
        "MUHAMMAD WAQAS SHAUKAT is an experienced and accomplished Sr Software Engineer with a strong background in software engineering and development. With a Master's degree in Software Engineering and over 3 years of experience, he has consistently demonstrated exceptional leadership and strategic thinking skills. In his previous role as Sr Software Engineer at Elysium Sols, MUHAMMAD WAQAS SHAUKAT spearheaded successful software development projects, resulting in improved efficiency and client satisfaction. He possesses a deep understanding of various programming languages, frameworks, and databases, including JavaScript, React, Redux, MongoDB, and MySQL. He has a proven track record of delivering high-quality and scalable solutions using best practices and innovative technologies. MUHAMMAD WAQAS SHAUKAT's expertise extends to front-end development, with proficiency in HTML, CSS, and React, as well as strong knowledge of design patterns and REST APIs. He has a keen eye for detail and a passion for creating intuitive and user-friendly interfaces. With his strong vision and strategic mindset, MUHAMMAD WAQAS SHAUKAT is driven to deliver exceptional results in any challenging environment. His dedication, technical prowess, and ability to lead cross-functional teams make him a valuable asset to any organization. MUHAMMAD WAQAS SHAUKAT is ready to bring his expertise and unique services to a new role as a {{jobPosition}}. He is equipped with the skills, knowledge, and passion to drive innovation and achieve outstanding results for his clients or employers.",
      jobTitle: "",
      primarySkills: ["React", "Tailwindcss", "Node"],
    },
    onSubmit: async (values, action) => {
      action.resetForm();
    },
  });

  return (
    <div className="w-full flex flex-row justify-start items-start">
      <div className="w-7/12 p-10 bg-gray-200 text-gray-900">
        <div className="w-full  grid grid-cols-2 gap-6">
          {/* Name and Short Name */}
          <div className="col-span-2 flex flex-row gap-2 ">
            <div className="3/4 w-full text-sm">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                className="border p-2 w-full rounded-md bg-gray-300 bg-gray-300"
              />
            </div>
            <div className=" w-1/4 text-sm">
              <label htmlFor="shortName">Short Name:</label>
              <input
                type="text"
                id="shortName"
                name="shortName"
                value={formik.values.shortName}
                onChange={formik.handleChange}
                className="border p-2 w-full rounded-md bg-gray-300"
              />
            </div>
          </div>

          {/* Job Title */}
          <div className="col-span-2 text-sm">
            <label htmlFor="jobTitle">Job Title:</label>
            <input
              type="text"
              id="jobTitle"
              name="jobTitle"
              value={formik.values.jobTitle}
              onChange={formik.handleChange}
              className="border p-2 w-full rounded-md bg-gray-300"
            />
          </div>

          {/* Contact Information */}
          <div className="col-span-2 flex flex-row justify-between items-center gap-2 text-sm">
            <div>
              <label htmlFor="contact">Contact:</label>
              <input
                type="number"
                id="contact"
                name="contact.phone"
                value={formik.values.contact.phone}
                onChange={formik.handleChange}
                className="border p-2 w-full rounded-md bg-gray-300"
              />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="contact.email"
                value={formik.values.contact.email}
                onChange={formik.handleChange}
                className="border p-2 w-full rounded-md bg-gray-300"
              />
            </div>
            <div>
              <label htmlFor="linkedIn">LinkedIn:</label>
              <input
                type="text"
                id="linkedIn"
                name="contact.linkedIn"
                value={formik.values.contact.linkedIn}
                onChange={formik.handleChange}
                className="border p-2 w-full rounded-md bg-gray-300"
              />
            </div>
          </div>

          {/* Summary */}
          <div className="col-span-2 text-sm">
            <label htmlFor="summary">Summary:</label>
            <textarea
              id="summary"
              name="summary"
              rows={10}
              value={formik.values.summary}
              onChange={formik.handleChange}
              className="border p-2 w-full rounded-md bg-gray-300"
            ></textarea>
          </div>

          {/* Work Experience */}

          <div className=" col-span-2 text-sm">
            {formik.values.workExperiences.map(
              (experience: any, index: number) => (
                <WorkExperience
                  key={index}
                  experience={experience}
                  handleChange={formik.handleChange}
                />
              )
            )}
          </div>
          {/* Educations */}
          <div className=" col-span-2 text-sm">
            {formik.values.education.map((ed: any, index: number) => (
              <Education
                key={index}
                index={index}
                education={ed}
                handleChange={formik.handleChange}
              />
            ))}
          </div>
          {/* Skills */}
          <div className="col-span-2 text-sm">
            {formik.values.primarySkills.map((skill: string, index: number) => (
              <input
                key={index}
                type="text"
                id={`skill-${index}`}
                name="skill"
                value={skill}
                onChange={formik.handleChange}
                className="border p-2 w-full rounded-md bg-gray-300"
              />
            ))}
          </div>
        </div>
      </div>


      <div className="w-5/12 bg-gray-700 h-screen">
        <ResumePreviews />
      </div>
    </div>
  );
};

export default Editor;
