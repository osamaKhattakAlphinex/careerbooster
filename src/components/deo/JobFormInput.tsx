import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { crossIcon1 } from "@/helpers/iconsProvider";

const JobFormInput = ({ data }: { data?: any }) => {
  const [newSkill, setNewSkill] = useState("");
  const formik = useFormik({
    initialValues: {
      job: "",
      employer: "",
      location: "",
      category: "",
      joblink: "",
      skills: [],
      description: "",
    },
    validationSchema: Yup.object().shape({
      job: Yup.string().required("Job Title is required"),
      employer: Yup.string().required("Employer is required"),
      location: Yup.string().required("Location is required"),
      category: Yup.string().required("Job Category is required"),
      joblink: Yup.string().required("Job Link is required"),
      skills: Yup.array()
        .of(Yup.string())
        .test(
          "atLeastOneValue",
          "At least one value is required",
          function (values) {
            return values && values.length > 0;
          }
        ),
      description: Yup.string().required("Job Description is required"),
    }),
    onSubmit: (values, { setSubmitting }) => {
      // Handle form submission here
      console.log("value", values);
      setSubmitting(false);
    },
  });
  const addSkills = (value: any) => {
    if (!formik.values.skills.includes(value)) {
      formik.setFieldValue("skills", [...formik.values.skills, value]);
      formik.setFieldError("skills", ""); // Clear any existing error
    } else {
      formik.setFieldError("skills", "Skill already exists"); // Set error message
    }
  };
  const removeSkill = (indexToRemove: any) => {
    formik.setFieldValue(
      "skills",
      formik.values.skills.filter((_, index) => index !== indexToRemove)
    );
  };
  return (
    <div className="w-9/12">
      <h1 className="dark:text-gray-100 text-gray-100 bg-gray-500 px-4 py-3 rounded-lg font-semibold text-lg">
        Add New Job
      </h1>
      <form
        className="grid grid-cols-2 gap-2 mt-2"
        onSubmit={formik.handleSubmit}
      >
        <div className="w-full">
          <label htmlFor="job" className="text-gray-100 py-2 text-lg">
            Job Title
          </label>
          <input
            type="text"
            id="job"
            placeholder="Enter job title"
            className="bg-gray-500 text-gray-100 w-full px-2 py-3 rounded-lg outline-none"
            {...formik.getFieldProps("job")}
          />
          {formik.touched.job && formik.errors.job && (
            <div className="text-red-500">{formik.errors.job}</div>
          )}
        </div>
        <div className="w-full">
          <label htmlFor="employer" className="text-gray-100 py-2 text-lg">
            Employer
          </label>
          <input
            type="text"
            id="employer"
            placeholder="Enter employer name"
            className="bg-gray-500 text-gray-100 px-2 py-3 w-full rounded-lg outline-none"
            {...formik.getFieldProps("employer")}
          />
          {formik.touched.employer && formik.errors.employer && (
            <div className="text-red-500">{formik.errors.employer}</div>
          )}
        </div>
        <div className="w-full">
          <label htmlFor="location" className="text-gray-100 py-2 text-lg">
            Location
          </label>
          <input
            type="text"
            id="location"
            placeholder="Enter job location"
            className="bg-gray-500 text-gray-100 w-full px-2 py-3 rounded-lg outline-none"
            {...formik.getFieldProps("location")}
          />
          {formik.touched.location && formik.errors.location && (
            <div className="text-red-500">{formik.errors.location}</div>
          )}
        </div>
        <div className="w-full">
          <label htmlFor="category" className="text-gray-100 py-2 text-lg">
            Job Category
          </label>
          <select
            id="category"
            className="bg-gray-500 text-gray-100 w-full px-2 py-3 rounded-lg outline-none"
            {...formik.getFieldProps("category")}
          >
            <option value="" disabled>
              Select a category
            </option>
            <option value="category1">Category 1</option>
            <option value="category2">Category 2</option>
            <option value="category3">Category 3</option>
          </select>
          {formik.touched.category && formik.errors.category && (
            <div className="text-red-500">{formik.errors.category}</div>
          )}
        </div>

        <div className="w-full">
          <label htmlFor="joblink" className="text-gray-100 py-2 text-lg">
            Job Link
          </label>
          <input
            type="text"
            id="joblink"
            placeholder="Enter job link"
            className="bg-gray-500 text-gray-100 px-2 py-3 w-full rounded-lg outline-none"
            {...formik.getFieldProps("joblink")}
          />
          {formik.touched.joblink && formik.errors.joblink && (
            <div className="text-red-500">{formik.errors.joblink}</div>
          )}
        </div>
        <div className="w-full relative">
          <label htmlFor="skills" className="text-gray-100 py-2 text-lg">
            Skills
          </label>
          <input
            type="text"
            id="skills"
            placeholder="Enter required skills"
            name="skills"
            className="bg-gray-500 text-gray-100 px-2 py-3 w-full rounded-lg outline-none"
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addSkills(newSkill);
              }
            }}
          />
          <div className="absolute top-9 right-1">
            <button
              onClick={() => addSkills(newSkill)}
              className="bg-green-600 py-1 px-1 rounded-sm"
            >
              Add Skill
            </button>
          </div>
          {formik.touched.skills && formik.errors.skills && (
            <div className="text-red-500">{formik.errors.skills}</div>
          )}
          <div className="flex flex-wrap gap-2 mt-2">
            {formik.values.skills.map((skill, index) => (
              <div
                key={index}
                className="!bg-gray-700 text-gray-100  px-2 pr-6 py-2 relative rounded-lg"
              >
                {skill}{" "}
                <button
                  onClick={() => removeSkill(index)}
                  className="ml-2 absolute right-1 top-[1px]"
                >
                  {crossIcon1}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full col-span-2">
          <label htmlFor="description" className="text-gray-100 py-2 text-lg">
            Job Description
          </label>
          <textarea
            id="description"
            placeholder="Enter job description"
            rows={4}
            className="bg-gray-500 text-gray-100 px-2 py-3 w-full rounded-lg outline-none"
            {...formik.getFieldProps("description")}
          />
          {formik.touched.description && formik.errors.description && (
            <div className="text-red-500">{formik.errors.description}</div>
          )}
        </div>
        <div className="flex gap-2 col-span-2">
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="!bg-red-500 w-fit rounded-lg p-3 my-1"
          >
            Save Job
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobFormInput;
