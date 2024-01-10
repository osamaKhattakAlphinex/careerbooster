"use client";

import { useFormik } from "formik";

import ResumePreviews from "@/components/ResumePreviews";
import React, { useEffect, useState } from "react";
import { WorkExperience } from "@/components/new-dashboard/dashboard/resume-editor/experience";
import { Education } from "@/components/new-dashboard/dashboard/resume-editor/education";
import { useSelector } from "react-redux";
import { current } from "@reduxjs/toolkit";

type Resume = {
  id?: string;
  name?: string;
  contact: {
    linkedIn?: string;
    email?: string;
    phone?: string;
  };
  shortName?: string;
  workExperienceArray: [
    {
      title?: string;
      cityState?: string;
      country?: string;
      company?: string;
      fromMonth?: string;
      fromYear?: string;
      isContinue?: boolean;
      toMonth?: string;
      toYear?: string;
      achivements?: string[];
    }
  ];
  education: [
    {
      educationLevel?: string;
      fieldOfStudy?: string;
      schoolName?: string;
      schoolLocation?: string;
      fromMonth?: string;
      fromYear?: string;
      isContinue?: boolean;
      toMonth?: string;
      toYear?: string;
    }
  ];
  summary?: string;
  jobTitle?: string;
  primarySkills?: string[];
};

const initialValues = {
  name: "",
  contact: {
    linkedIn: "",
    email: "",
    phone: "",
  },
  shortName: "",
  workExperiences: [
    {
      title: "",
      cityState: "",
      country: "",
      company: "",
      fromMonth: "",
      fromYear: "",
      isContinue: true,
      toMonth: "",
      toYear: "",
      achivements: [],
    },
  ],
  education: [
    {
      educationLevel: "",
      fieldOfStudy: "",
      schoolName: "",
      schoolLocation: "",
      fromMonth: "",
      fromYear: "",
      isContinue: false,
      toMonth: "",
      toYear: "",
    },
  ],
  summary: "",
  jobTitle: "",
  primarySkills: [],
};

const getCurrentResume = (resume: Resume, resumes: Resume[]) => {
  if (resume.id !== "") {
    return resume;
  }
  if (resumes?.length > 0) {
    return resumes[0];
  }
};

const Editor = () => {
  const { resume, userData } = useSelector((state: any) => state);

  const [currentResume, setCurrentResume] = useState<Resume | undefined>(
    getCurrentResume(resume, userData.resumes)
  );

  console.log(currentResume);

  useEffect(() => { }, [currentResume]);

  const formik = useFormik({
    initialValues: {
      name: currentResume?.name || "",
      contact: {
        linkedIn: currentResume?.contact?.linkedIn || "",
        email: currentResume?.contact?.email || "",
        phone: currentResume?.contact?.phone || "",
      },
      shortName: currentResume?.shortName || "",
      workExperiences: currentResume?.workExperienceArray || [],
      education: currentResume?.education || [],
      summary: currentResume?.summary || "",
      jobTitle: currentResume?.jobTitle || "",
      primarySkills: currentResume?.primarySkills || [],
    },

    onSubmit: async (values, action) => {
      action.resetForm();
    },
  });

  return (
    <div className="w-full h-screen">
      <ResumePreviews />
    </div>
    // <div className="w-full flex flex-row justify-start items-start">
    //   <div className="w-7/12 p-10 bg-gray-200 text-gray-900">
    //     <div className="w-full  grid grid-cols-2 gap-6">
    //       Name and Short Name
    //       <div className="col-span-2 flex flex-row gap-2 ">
    //         <div className="3/4 w-full text-sm">
    //           <label htmlFor="name">Name:</label>
    //           <input
    //             type="text"
    //             id="name"
    //             name="name"
    //             value={formik.values.name}
    //             onChange={formik.handleChange}
    //             className="p-2 w-full rounded-md bg-gray-100 text-gray-600"
    //           />
    //         </div>
    //         <div className=" w-1/4 text-sm">
    //           <label htmlFor="shortName">Short Name:</label>
    //           <input
    //             type="text"
    //             id="shortName"
    //             name="shortName"
    //             value={formik.values.shortName}
    //             onChange={formik.handleChange}
    //             className="p-2 w-full rounded-md bg-gray-100 text-gray-600"
    //           />
    //         </div>
    //       </div>

    //       Job Title
    //       <div className="col-span-2 text-sm">
    //         <label htmlFor="jobTitle">Job Title:</label>
    //         <input
    //           type="text"
    //           id="jobTitle"
    //           name="jobTitle"
    //           value={formik.values.jobTitle}
    //           onChange={formik.handleChange}
    //           className="p-2 w-full rounded-md bg-gray-100 text-gray-600"
    //         />
    //       </div>

    //       Contact Information
    //       <div className="col-span-2 flex flex-row justify-between items-center gap-2 text-sm">
    //         <div>
    //           <label htmlFor="contact">Contact:</label>
    //           <input
    //             type="number"
    //             id="contact"
    //             name="contact.phone"
    //             value={formik.values.contact?.phone}
    //             onChange={formik.handleChange}
    //             className="p-2 w-full rounded-md bg-gray-100 text-gray-600"
    //           />
    //         </div>
    //         <div>
    //           <label htmlFor="email">Email:</label>
    //           <input
    //             type="email"
    //             id="email"
    //             name="contact.email"
    //             value={formik.values.contact?.email}
    //             onChange={formik.handleChange}
    //             className="p-2 w-full rounded-md bg-gray-100 text-gray-600"
    //           />
    //         </div>
    //         <div>
    //           <label htmlFor="linkedIn">LinkedIn:</label>
    //           <input
    //             type="text"
    //             id="linkedIn"
    //             name="contact.linkedIn"
    //             value={formik.values.contact?.linkedIn}
    //             onChange={formik.handleChange}
    //             className="p-2 w-full rounded-md bg-gray-100 text-gray-600"
    //           />
    //         </div>
    //       </div>

    //       Summary
    //       <div className="col-span-2 text-sm">
    //         <label htmlFor="summary">Summary:</label>
    //         <textarea
    //           id="summary"
    //           name="summary"
    //           rows={10}
    //           value={formik.values.summary}
    //           onChange={formik.handleChange}
    //           className="p-2 w-full rounded-md bg-gray-100 text-gray-600"
    //         ></textarea>
    //       </div>

    //       Work Experience

    //       <div className=" col-span-2 text-sm  space-y-2">
    //         <h2 className="text-base font-bold mb-2 ">Work Experience</h2>

    //         {formik.values.workExperiences?.map(
    //           (experience: any, index: number) => (
    //             <WorkExperience
    //               key={index}
    //               experience={experience}
    //               handleChange={formik.handleChange}
    //             />
    //           )
    //         )}
    //       </div>
    //       Educations
    //       <div className=" col-span-2 text-sm  space-y-2">
    //         <h2 className="text-base font-bold mb-2 ">Education</h2>
    //         {formik.values.education?.map((ed: any, index: number) => (
    //           <Education
    //             key={index}
    //             index={index}
    //             education={ed}
    //             handleChange={formik.handleChange}
    //           />
    //         ))}
    //       </div>
    //       Skills
    //       <div className="col-span-2 text-sm  ">
    //         <h2 className="text-base font-bold mb-2 ">Skills</h2>
    //         <div className="grid grid-cols-2 gap-2">
    //           {formik.values.primarySkills?.map(
    //             (skill: string, index: number) => (
    //               <input
    //                 key={index}
    //                 type="text"
    //                 id={`skill-${index}`}
    //                 name="skill"
    //                 value={skill}
    //                 onChange={formik.handleChange}
    //                 className="p-2 w-full rounded-sm text-sm  bg-gray-100 text-gray-600"
    //               />
    //             )
    //           )}
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Editor;
