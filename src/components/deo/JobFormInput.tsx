"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const JobFormInput = () => {
  const validationSchema = Yup.object().shape({
    job: Yup.string().required("Job Title is required"),
    employer: Yup.string().required("Employer is required"),
    location: Yup.string().required("Location is required"),
    category: Yup.string().required("Job Category is required"),
    joblink: Yup.string().required("Job Link is required"),
    skills: Yup.string().required("Skills are required"),
    description: Yup.string().required("Job Description is required"),
  });

  return (
    <div className="w-9/12">
      <h1 className="dark:text-gray-100 text-gray-100 bg-gray-500 px-4 py-3 rounded-lg font-semibold text-lg">
        Add New Job
      </h1>
      <Formik
        initialValues={{
          job: "",
          employer: "",
          location: "",
          category: "",
          joblink: "",
          skills: "",
          description: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          // Handle form submission here
          console.log(values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="grid grid-cols-2 gap-2 mt-2">
            <div className="w-full">
              <label htmlFor="job" className="text-gray-100 py-2 text-lg">
                Job Title
              </label>
              <Field
                type="text"
                id="job"
                name="job"
                placeholder="Enter job title"
                className="bg-gray-500 text-gray-100 w-full px-2 py-3 rounded-lg outline-none"
              />
              <ErrorMessage
                name="job"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="w-full">
              <label htmlFor="employer" className="text-gray-100 py-2 text-lg">
                Employer
              </label>
              <Field
                type="text"
                id="employer"
                name="employer"
                placeholder="Enter employer name"
                className="bg-gray-500 text-gray-100 px-2 py-3 w-full rounded-lg outline-none"
              />
              <ErrorMessage
                name="employer"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="w-full">
              <label htmlFor="location" className="text-gray-100 py-2 text-lg">
                Location
              </label>
              <Field
                type="text"
                id="location"
                name="location"
                placeholder="Location"
                className="bg-gray-500 text-gray-100 px-2 py-3 w-full rounded-lg outline-none"
              />
              <ErrorMessage
                name="location"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="w-full">
              <label htmlFor="category" className="text-gray-100 py-2 text-lg">
                Job Category
              </label>
              <Field
                as="select"
                id="category"
                name="category"
                className="bg-gray-500 text-gray-100 px-2 py-3 pr-8 rounded-lg appearance-none w-full outline-none"
              >
                <option value="">Select Category</option>
                <option value="category1">Category 1</option>
                <option value="category2">Category 2</option>
                <option value="category3">Category 3</option>
              </Field>
              <ErrorMessage
                name="category"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="w-full">
              <label htmlFor="joblink" className="text-gray-100 py-2 text-lg">
                Job Link
              </label>
              <Field
                type="text"
                id="joblink"
                name="joblink"
                placeholder="Job Link"
                className="bg-gray-500 text-gray-100 px-2 py-3 w-full rounded-lg outline-none"
              />
              <ErrorMessage
                name="joblink"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="w-full">
              <label htmlFor="skills" className="text-gray-100 py-2 text-lg">
                Skills
              </label>
              <Field
                type="text"
                id="skills"
                name="skills"
                placeholder="Skills"
                className="bg-gray-500 text-gray-100 px-2 py-3 w-full rounded-lg outline-none"
              />
              <ErrorMessage
                name="skills"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="w-full col-span-2">
              <label
                htmlFor="description"
                className="text-gray-100 py-2 text-lg"
              >
                Job Description
              </label>
              <Field
                as="textarea"
                id="description"
                name="description"
                placeholder="Job Description"
                className="bg-gray-500 text-gray-100 px-2 py-3 w-full rounded-lg outline-none"
                rows={4}
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="flex gap-2 col-span-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="!bg-red-500 w-fit rounded-lg p-3 my-1"
              >
                Save Job
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default JobFormInput;
