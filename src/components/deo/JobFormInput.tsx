"use client";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { crossIcon1 } from "@/helpers/iconsProvider";
import axios from "axios";

const JobFormInput = ({ deoId, setOpen, singleRec }: any) => {
  const [jobCategories, setJobCategories] = useState<any>([]);
  const [updateJob, setUpdateJob] = useState<boolean>(false);
  const [rewritingJob, setRewritingJob] = useState(false);

  useEffect(() => {
    fetch("/api/deo/jobCategories", {
      method: "GET",
    }).then(async (response) => {
      const res = await response.json();
      if (res.success) {
        setJobCategories(res.data);
      }
    });
    if (singleRec) {
      formik.setFieldValue("category", singleRec.category);
      formik.setFieldValue("joblink", singleRec.link);
      formik.setFieldValue("skills", singleRec.skills);
      formik.setFieldValue("description", singleRec.jobDescription);
      formik.setFieldValue("employer", singleRec.employer);
      formik.setFieldValue("job", singleRec.jobTitle);
      formik.setFieldValue("location", singleRec.location);
      setUpdateJob(true);
    }
  }, []);
  const rewriteJob = () => {
    setRewritingJob(true);
    fetch("/api/deo/rewriteJob", {
      method: "POST",
      body: JSON.stringify({ content: formik.values.description }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (resp: any) => {
        const res = await resp.json();
        if (res.success && res?.result) {
          let myJSON;
          if (typeof res.result === "object") {
            myJSON = res.result;
          } else {
            myJSON = await JSON.parse(res.result);
          }
          formik.setFieldValue("description", myJSON.jobDescription);
          formik.setFieldValue("skills", myJSON.skills);
        }
      })
      .catch((error) => setRewritingJob(false))
      .finally(() => setRewritingJob(false));
  };
  const [newSkill, setNewSkill] = useState("");
  const formik = useFormik({
    initialValues: {
      job: "",
      employer: "",
      location: "",
      category: "",
      joblink: "",
      skills: [] as string[], // Specify the type as string[]
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
    onSubmit: async (values) => {
      // Handle form submission here
      if (updateJob) {
        const formData = {
          ...singleRec,
          jobTitle: values.job,
          location: values.location,
          employer: values.employer,
          category: values.category,
          jobDescription: values.description,
          link: values.joblink,
          skills: values.skills,
        };
        const upadteJob = await axios.put(`/api/deo?jobId=${singleRec._id}`, {
          ...formData,
        });
        if (upadteJob.data.success) {
          formik.resetForm();
          setOpen(false);
        } else {
          console.log("Something went wrong");
        }
      } else {
        const formData = {
          jobTitle: values.job,
          location: values.location,
          employer: values.employer,
          category: values.category,
          jobDescription: values.description,
          addedByUserId: deoId,
          link: values.joblink,
          skills: values.skills,
          status: "active",
        };
        const addJob = await axios.post("/api/deo", {
          payload: formData,
        });
        if (addJob.data.success) {
          formik.resetForm();
          setOpen(false);
        } else {
          console.log("Something went wrong");
        }
      }
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
      <h1 className="py-2 text-sm font-semibold text-gray-900 dark:text-gray-100">
        Add New Job
      </h1>
      <form
        className="grid grid-cols-2 gap-2 mt-2"
        onSubmit={formik.handleSubmit}
      >
        <div className="w-full">
          <label htmlFor="job" className="py-2 text-sm text-gray-100">
            Job Title
          </label>
          <input
            type="text"
            id="job"
            placeholder="Enter job title"
            className="w-full px-2 py-1 text-sm text-gray-100 bg-gray-500 rounded-sm outline-none placeholder:text-gray-200"
            {...formik.getFieldProps("job")}
          />
          {formik.touched.job && formik.errors.job && (
            <div className="text-red-500">{formik.errors.job}</div>
          )}
        </div>
        <div className="w-full">
          <label htmlFor="employer" className="py-2 text-sm text-gray-100">
            Employer
          </label>
          <input
            type="text"
            id="employer"
            placeholder="Enter employer name"
            className="w-full px-2 py-1 text-sm text-gray-100 bg-gray-500 rounded-sm outline-none placeholder:text-gray-200"
            {...formik.getFieldProps("employer")}
          />
          {formik.touched.employer && formik.errors.employer && (
            <div className="text-red-500">{formik.errors.employer}</div>
          )}
        </div>
        <div className="w-full">
          <label htmlFor="location" className="py-2 text-sm text-gray-100">
            Location
          </label>
          <input
            type="text"
            id="location"
            placeholder="Enter job location"
            className="w-full px-2 py-1 text-sm text-gray-100 bg-gray-500 rounded-sm outline-none placeholder:text-gray-200"
            {...formik.getFieldProps("location")}
          />
          {formik.touched.location && formik.errors.location && (
            <div className="text-red-500">{formik.errors.location}</div>
          )}
        </div>
        <div className="w-full">
          <label htmlFor="category" className="py-2 text-sm text-gray-100">
            Job Category
          </label>
          <select
            id="category"
            className="w-full px-2 py-1 text-sm text-gray-100 bg-gray-500 rounded-sm outline-none placeholder:text-gray-200"
            {...formik.getFieldProps("category")}
          >
            {/* <option value="" disabled>
              Select a category
            </option> */}
            {jobCategories.map((category: any) => {
              return (
                <option
                  key={category._id}
                  value={category.name}
                  className="space-y-1"
                >
                  {category.name}
                </option>
              );
            })}
          </select>
          {formik.touched.category && formik.errors.category && (
            <div className="text-red-500">{formik.errors.category}</div>
          )}
        </div>

        <div className="w-full">
          <label htmlFor="joblink" className="py-2 text-sm text-gray-100">
            Job Link
          </label>
          <input
            type="text"
            id="joblink"
            placeholder="Enter job link"
            className="w-full px-2 py-1 text-sm text-gray-100 bg-gray-500 rounded-sm outline-none placeholder:text-gray-200"
            {...formik.getFieldProps("joblink")}
          />
          {formik.touched.joblink && formik.errors.joblink && (
            <div className="text-red-500">{formik.errors.joblink}</div>
          )}
        </div>
        <div className="flex flex-row items-end justify-between gap-2">
          <div className="flex-1 w-full">
            <label htmlFor="skills" className="py-2 text-sm text-gray-100">
              Skills
            </label>
            <input
              type="text"
              id="skills"
              placeholder="Enter required skills"
              name="skills"
              className="w-full px-2 py-1 text-sm text-gray-100 bg-gray-500 rounded-sm outline-none placeholder:text-gray-200"
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addSkills(newSkill);
                }
              }}
            />
          </div>
          <div className="">
            <button
              onClick={(e) => {
                e.preventDefault();
                addSkills(newSkill);
              }}
              className="h-full px-3 py-1 text-sm text-gray-100 bg-green-600 rounded-sm"
            >
              Add Skill
            </button>
          </div>
          {formik.touched.skills && formik.errors.skills && (
            <div className="text-red-500">{formik.errors.skills}</div>
          )}
        </div>
        <div className="col-span-2 flex flex-wrap  gap-2 mt-2">
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
        <div className="w-full col-span-2 space-y-1">
          <label htmlFor="description" className="py-2 text-sm text-gray-100">
            Job Description
          </label>
          <textarea
            id="description"
            placeholder="Enter job description"
            rows={4}
            className="w-full px-2 py-1 text-sm text-gray-100 bg-gray-500 rounded-sm outline-none placeholder:text-gray-200"
            {...formik.getFieldProps("description")}
          />
          {formik.touched.description && formik.errors.description && (
            <div className="text-red-500">{formik.errors.description}</div>
          )}
        </div>
        <div className="flex col-span-2 gap-2">
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="!bg-red-500 w-fit rounded-sm py-1 px-2  cursor-pointer text-gray-100 text-sm"
          >
            {updateJob ? "Update Job" : "Save Job"}
          </button>
          <button
            onClick={rewriteJob}
            className="!bg-blue-500 w-fit rounded-sm py-1 px-2  cursor-pointer text-gray-100 text-sm"
          >
            {rewritingJob ? " Please wait..." : "Rewrite Job with AI"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobFormInput;
