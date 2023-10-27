"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const UpdatePackage = () => {
  const [popUpModel, setPopUpModel] = useState(false);
  const [editPopUpModel, setEditPopUpModel] = useState(false);
  const [previewPopUpModel, setPreviewPopUpModel] = useState(false);
  const formik = useFormik({
    initialValues: {
      title: "",
      pkgtype: "",
      amount: "",
      category: "",
      status: "",
      accountLimit: "",
      resume_gen: "",
      keyword_gen: "",
      headline_gen: "",
      about_gen: "",
      job_desc_gen: "",
      cover_letter_gen: "",
      consulting_bid_generation: "",
      review_resume: "",
      no_of_pdf_files_upload: "",
      can_edit_resume: false,
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Please Title/Name Your Package"),
      pkgtype: Yup.string().required("Please Select One Package"),
      amount: Yup.number().required("Please Enter Your Amount"),
      category: Yup.string().required("Please Select at leat one category"),
      active: Yup.string()
        .oneOf(["true"], 'Please select either "Active" or "Inactive"')
        .required('Please select either "Active" or "Inactive"'),
      resume_gen: Yup.string().required("Please Select The Amount of Resume "),
      keyword_gen: Yup.string().required(
        "Please Select The Amount of Keywords "
      ),
      headline_gen: Yup.number().required(
        "Please Select The Amount of Headline "
      ),
      about_gen: Yup.number().required(
        "Please Select The Amount of About Generation "
      ),
      job_desc_gen: Yup.number().required(
        "Please Select The Amount of About Description Generation "
      ),
      cover_letter_gen: Yup.number().required(
        "Please Select The Amount of Cover Letters "
      ),
      consulting_bid_generation: Yup.number().required(
        "Please Select The Amount of consulting bid generation "
      ),
      review_resume: Yup.number().required(
        "Please Select The Amount of resume review "
      ),
      no_of_pdf_files_upload: Yup.number().required(
        "Please Select The no of pdf files upload "
      ),
      can_edit_resume: Yup.string()
        .oneOf(["true"], "Please select The CheckBox")
        .required("Please select The CheckBox"),
    }),
    onSubmit: (values) => {
      console.log(values);
      // formik.handleReset;
    },
  });
  return (
    <>
      <button
        type="button"
        onClick={() => {
          setEditPopUpModel(true);
        }}
        data-modal-target="updateProductModal"
        data-modal-toggle="updateProductModal"
        className="flex w-full items-center py-2 pr-2 hover:text-[#e6f85e]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-4 h-4 mr-3"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
          />
        </svg>
        Edit
      </button>

      <div
        id="updateProductModal"
        tabIndex={-1}
        aria-hidden="true"
        className={`overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full ${
          !editPopUpModel ? "hidden" : "flex"
        }`}
      >
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          {/* <!-- Modal content --> */}
          <div className="relative p-4 rounded-lg shadow bg-white">
            {/* <!-- Modal header --> */}
            <div className="flex justify-between items-center pb-4 mb-4  pt-5rounded-t border-b sm:mb-5 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Update Product
              </h3>
              <button
                onClick={() => {
                  setEditPopUpModel(false);
                }}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="updateProductModal"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* <!-- Modal body --> */}
            <form onSubmit={formik.handleSubmit}>
              <div className="grid gap-4 mb-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Package Title
                  </label>
                  <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.title}
                    type="text"
                    name="title"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Package Title"
                  />
                  {formik.touched.title && formik.errors.title && (
                    <p className="text-red-600 pt-3">{formik.errors.title}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="pkgtype"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Select Package Type
                  </label>
                  <select
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.pkgtype}
                    id="pkgtype"
                    name="pkgtype"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option defaultValue="">Select Package Type</option>
                    <option value="mon">Monthly</option>
                    <option value="year">Yearly</option>
                  </select>
                  {formik.touched.pkgtype && formik.errors.pkgtype && (
                    <p className="text-red-600 pt-3">{formik.errors.pkgtype}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="amount"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Amount
                  </label>
                  <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.amount}
                    type="number"
                    name="amount"
                    id="amount"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="0"
                  />
                  {formik.touched.amount && formik.errors.amount && (
                    <p className="text-red-600 pt-3">{formik.errors.amount}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="category"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Category
                  </label>
                  <select
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.category}
                    id="category"
                    name="category"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    <option>Select Your Category</option>
                    <option value="basic">Basic</option>
                    <option value="standard">Standard</option>
                    <option value="premium">Premium</option>
                  </select>
                  {formik.touched.category && formik.errors.category && (
                    <p className="text-red-600 pt-3">
                      {formik.errors.category}
                    </p>
                  )}
                </div>
                <div className="sm:col-span-2">
                  <div className="flex flex-col  pl-4">
                    <label htmlFor="" className="mb-5 text-black">
                      Status
                    </label>
                    <div className="flex flex-row gap-2 mb-2">
                      <input
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value="active"
                        id="active"
                        type="radio"
                        name="status"
                        className="w-4 h-4"
                      />
                      <label
                        htmlFor="active"
                        className=" text-sm font-medium text-black"
                      >
                        Active
                      </label>
                      {formik.touched.status && formik.errors.status && (
                        <p
                          style={{ display: "contents" }}
                          className="text-red-600 pt-3"
                        >
                          {formik.errors.status}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col  pl-4">
                    <div className="flex flex-row gap-2 mb-2">
                      <input
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.status}
                        id="active"
                        type="radio"
                        name="status"
                        className="w-4 h-4"
                      />
                      <label
                        htmlFor="inactive"
                        className=" text-sm font-medium text-black"
                      >
                        InActive
                      </label>
                      {formik.touched.status && formik.errors.status && (
                        <p
                          style={{ display: "contents" }}
                          className="text-red-600 pt-3"
                        >
                          {formik.errors.status}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="amount"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Resume Generation
                  </label>
                  <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.resume_gen}
                    id="amount"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="0"
                    type="number"
                    // value=""
                    name="resume_gen"
                  />
                  {formik.touched.resume_gen && formik.errors.resume_gen && (
                    <p className="text-red-600 pt-3">
                      {formik.errors.resume_gen}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="amount"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    KeyWords Generation
                  </label>
                  <input
                    id="amount"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="0"
                    type="number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.keyword_gen}
                    name="keywords_gen"
                  />
                  {formik.touched.keyword_gen && formik.errors.keyword_gen && (
                    <p className="text-red-600 pt-3">
                      {formik.errors.keyword_gen}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="amount"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Headline Generation
                  </label>
                  <input
                    id="amount"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="0"
                    type="number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.headline_gen}
                    name="headline_gen"
                  />
                  {formik.touched.headline_gen &&
                    formik.errors.headline_gen && (
                      <p className="text-red-600 pt-3">
                        {formik.errors.headline_gen}
                      </p>
                    )}
                </div>
                <div>
                  <label
                    htmlFor="amount"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    About Generation
                  </label>
                  <input
                    id="amount"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="0"
                    type="number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.about_gen}
                    name="about_gen"
                  />
                  {formik.touched.about_gen && formik.errors.about_gen && (
                    <p className="text-red-600 pt-3">
                      {formik.errors.about_gen}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="amount"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Job Description Generation
                  </label>
                  <input
                    id="amount"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="0"
                    type="number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.job_desc_gen}
                    name="job_desc_gen"
                  />
                  {formik.touched.about_gen && formik.errors.about_gen && (
                    <p className="text-red-600 pt-3">
                      {formik.errors.about_gen}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="amount"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Cover Letters Generation
                  </label>
                  <input
                    id="amount"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="0"
                    type="number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.cover_letter_gen}
                    name="cover-letters_gen"
                  />
                  {formik.touched.cover_letter_gen &&
                    formik.errors.cover_letter_gen && (
                      <p className="text-red-600 pt-3">
                        {formik.errors.cover_letter_gen}
                      </p>
                    )}
                </div>
                <div>
                  <label
                    htmlFor="amount"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Review Resume
                  </label>
                  <input
                    id="amount"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="0"
                    type="number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.review_resume}
                    name="review_resume"
                  />
                  {formik.touched.review_resume &&
                    formik.errors.review_resume && (
                      <p className="text-red-600 pt-3">
                        {formik.errors.review_resume}
                      </p>
                    )}
                </div>
                <div>
                  <label
                    htmlFor="amount"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    No of Pdf Files Upload
                  </label>
                  <input
                    id="amount"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="0"
                    type="number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.no_of_pdf_files_upload}
                    name="no_of_pdf_files_upload"
                  />
                  {formik.touched.no_of_pdf_files_upload &&
                    formik.errors.no_of_pdf_files_upload && (
                      <p className="text-red-600 pt-3">
                        {formik.errors.no_of_pdf_files_upload}
                      </p>
                    )}
                </div>
                <div>
                  <label
                    htmlFor="amount"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Consulting Bid Generations
                  </label>
                  <input
                    id="amount"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="0"
                    type="number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.consulting_bid_generation}
                    name="consulting_bid_generation"
                  />
                  {formik.touched.consulting_bid_generation &&
                    formik.errors.consulting_bid_generation && (
                      <p className="text-red-600 pt-3">
                        {formik.errors.consulting_bid_generation}
                      </p>
                    )}
                </div>
                <div className="block">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    name="can_edit_resume"
                    onChange={formik.handleChange}
                    className=" mt-8 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="default-checkbox"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Can Edit Resume
                  </label>
                  {formik.touched.can_edit_resume &&
                    formik.errors.can_edit_resume && (
                      <p className="text-red-600 pt-3">
                        {formik.errors.can_edit_resume}
                      </p>
                    )}
                </div>
              </div>
              <button
                type="submit"
                className="btn theme-outline-btn"
                style={{ display: "flex" }}
              >
                <svg
                  className="mr-1 -ml-1 w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clip-rule="evenodd"
                  />
                </svg>
                Update The product
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdatePackage;
