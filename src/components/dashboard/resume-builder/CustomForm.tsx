"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getYearsList, months } from "@/helpers/listsProvider";
import { useSelector } from "react-redux";
import useUpdateAndSave from "@/hooks/useUpdateAndSave";
const years = getYearsList();
const CustomForm = ({ setShowCustomForm, index }: any) => {
  //form handling
  const resume = useSelector((state: any) => state.resume);
  const { updateSaveHook } = useUpdateAndSave();

  const formik = useFormik({
    initialValues: {
      title: "",
      country: "",
      cityState: "",
      fromMonth: "",
      fromYear: "",
      isContinue: false,
      toMonth: "",
      toYear: "",
      achievements: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Job Title is required"),
    }),
    onSubmit: async (values) => {
      // Splitting the description by newline character and trimming each line
      const descriptionArray = values.achievements
        .split("\n")
        .map((line) => line.trim());

      // Updating the form values with the array of descriptions
      const updatedValues = { ...values, achievements: descriptionArray };
      // Handle form submission here
      let updatedCustomExp: any = [...resume.customExperienceArray];
      let newUpdatedCustomExp: any = { ...updatedCustomExp[index] };
      let newUpdatedCustomExpEntries: any = [...newUpdatedCustomExp.entries];
      newUpdatedCustomExpEntries.push(updatedValues);
      newUpdatedCustomExp.entries = newUpdatedCustomExpEntries;
      updatedCustomExp[index] = newUpdatedCustomExp;
      updateSaveHook.updateAndSaveCustomExperienceArray(updatedCustomExp);
      setShowCustomForm(false);
    },
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    formik.handleSubmit();
  };
  return (
    <div className="my-2">
      <form
        onSubmit={handleSubmit}
        className="border rounded-lg shadow-md p-6 space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex flex-col">
            <span className="text-sm">
              Job Title / Activity Name etc.
              <span className="text-red-500">*</span>
            </span>
            <input
              type="text"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              className="py-2 px-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300 bg-gray-200 focus:border-[1px]"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-sm">Country:</span>
            <input
              type="text"
              name="country"
              value={formik.values.country}
              onChange={formik.handleChange}
              className="py-2 px-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300 bg-gray-200 focus:border-[1px]"
            />
          </label>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex flex-col">
            <span className="text-sm">City / State:</span>
            <input
              type="text"
              name="cityState"
              value={formik.values.cityState}
              onChange={formik.handleChange}
              className="py-2 px-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300 bg-gray-200 focus:border-[1px]"
            />
          </label>
        </div>
        <div className="">
          <label className="block text-sm font-medium">Time Period</label>
          <div className="flex space-x-4 mt-4">
            <div className="w-1/2">
              <label className="block text-xs text-gray-950">From Month</label>
              <select
                className="py-2 px-3 mt-1 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300 bg-gray-200 focus:border-[1px]"
                name="fromMonth"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.fromMonth}
              >
                <option value="" className="text-gray-950">
                  -- select --
                </option>
                {months.map((month) => (
                  <option className="text-gray-950" key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-1/2">
              <label className="block text-xs text-gray-500">From Year</label>

              <select
                className="py-2 px-3 mt-1 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300 bg-gray-200 focus:border-[1px]"
                name="fromYear"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.fromYear}
              >
                <option value="" className="text-gray-950">
                  -- select --
                </option>
                {years.map((year) => (
                  <option className="text-gray-950" key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {!formik.values.isContinue && (
            <div className="flex space-x-4 mt-4">
              <div className="w-1/2">
                <label className="block text-xs text-gray-500">To Month</label>
                <select
                  className="py-2 px-3 mt-1 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300 bg-gray-200 focus:border-[1px]"
                  name="toMonth"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.toMonth}
                >
                  <option value="" className="text-gray-950">
                    -- select --
                  </option>
                  {months.map((month) => (
                    <option className="text-gray-950" key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-1/2">
                <label className="block text-xs text-gray-500">To Year</label>
                <select
                  className="py-2 px-3 mt-1 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300 bg-gray-200 focus:border-[1px]"
                  name="toYear"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.toYear}
                >
                  <option value="" className="text-gray-950">
                    -- select --
                  </option>
                  {years.map((year) => (
                    <option className="text-gray-950" key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          <div className="mt-2">
            <input
              type="checkbox"
              id="currentlyWorking"
              className="mr-2 bg-gray-200 dark:bg-gray-200"
              name="isContinue"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              checked={formik.values.isContinue}
            />
            <label htmlFor="currentlyWorking" className="text-sm">
              Present
            </label>
          </div>
        </div>

        <label className="flex flex-col">
          <span className="text-sm">Description:</span>
          <textarea
            name="achievements"
            value={formik.values.achievements}
            onChange={formik.handleChange}
            className="py-2 px-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300 bg-gray-200 focus:border-[1px]"
          />
        </label>

        <div className="w-full">
          <button
            type="submit"
            disabled={String(formik.errors.title) !== "undefined"}
            className=" px-4 !bg-blue-500 text-white xs:my-3 md:my-0  rounded-md py-2 hover:!bg-blue-600 mr-4 disabled:bg-blue-300"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => setShowCustomForm(false)}
            className=" px-4 !bg-gray-500 text-white rounded-md py-2 hover:!bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomForm;
