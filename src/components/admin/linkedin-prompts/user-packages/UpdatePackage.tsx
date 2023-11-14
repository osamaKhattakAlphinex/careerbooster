"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { FeatureRow } from "./AddPackage";

interface userPackage {
  _id?: string;
  type: "monthly" | "yearly";
  title: string;
  amount: number;
  status: "active" | "inactive";
  features: string[];
  featuresToolTips: string[];
  category: "basic" | "standard" | "premium";
  limit: {
    resumes_generation: number;
    can_edit_resume: boolean;
    keywords_generation: number;
    headline_generation: number;
    about_generation: number;
    job_desc_generation: number;
    cover_letter_generation: number;
    email_generation: number;
    pdf_files_upload: number;
    review_resume: number;
    consulting_bids_generation: number;
  };
}

type Props = {
  userPackage: userPackage;
  getPackages: () => void;
};

const UpdatePackage = ({ userPackage, getPackages }: Props) => {
  const [popUpModel, setPopUpModel] = useState(false);
  const [editPopUpModel, setEditPopUpModel] = useState(false);
  // const [previewPopUpModel, setPreviewPopUpModel] = useState(false);
  const packgeId = userPackage._id;

  const handleFeatureRemove = (idx: number) => {
    const newFeatures = [...formik.values.features];
    newFeatures.splice(idx, 1);

    const newTooltips = [...formik.values.featuresToolTips];
    newTooltips.splice(idx, 1);

    formik.setFieldValue("features", newFeatures);
    formik.setFieldValue("featuresToolTips", newFeatures);
  };

  const formik = useFormik({
    initialValues: {
      title: userPackage.title,
      type: userPackage.type,
      amount: userPackage.amount,
      category: userPackage.category,
      status: userPackage.status,
      features: userPackage.features,
      featuresToolTips: userPackage.featuresToolTips,
      limit: {
        resumes_generation: userPackage.limit.resumes_generation,
        keywords_generation: userPackage.limit.keywords_generation,
        headline_generation: userPackage.limit.headline_generation,
        about_generation: userPackage.limit.about_generation,
        job_desc_generation: userPackage.limit.job_desc_generation,
        cover_letter_generation: userPackage.limit.cover_letter_generation,
        consulting_bid_generation: userPackage.limit.consulting_bids_generation,
        review_resume: userPackage.limit.review_resume,
        pdf_files_upload: userPackage.limit.pdf_files_upload,
        can_edit_resume: userPackage.limit.can_edit_resume,
      },
    },
    validationSchema: Yup.object().shape({
      title: Yup.string().required("Please Title/Name Your Package"),
      type: Yup.string().required("Please Select One Package"),
      amount: Yup.number()
        .required("Please Enter Your Amount")
        .min(0, "Minimum Value is 0"),
      category: Yup.string().required("Please Select at least one category"),
      status: Yup.string().required(
        'Please select either "Active" or "Inactive"'
      ),

      features: Yup.array(Yup.string())
        .required("Please Enter THe Features")
        .min(1, "Please Provide atleast 1 feature"),
      featuresToolTips: Yup.array(Yup.string())
        .required("Please Enter THe Features Tooltip")
        .min(1, "Please Provide atleast 1 feature tooltip"),

      limit: Yup.object().shape({
        resumes_generation: Yup.number()
          .required("Please Select The Amount of Resume")
          .min(0, "Minimum Value is 0"),
        keywords_generation: Yup.number()
          .required("Please Select The Amount of Keywords")
          .min(0, "Minimum Value is 0"),
        headline_generation: Yup.number()
          .required("Please Select The Amount of Headline")
          .min(0, "Minimum Value is 0"),
        about_generation: Yup.number().required(
          "Please Select The Amount of About Generation"
        ),
        job_desc_generation: Yup.number()
          .required("Please Select The Amount of About Description Generation")
          .min(0, "Minimum Value is 0"),
        cover_letter_generation: Yup.number()
          .required("Please Select The Amount of Cover Letters")
          .min(0, "Minimum Value is 0"),
        consulting_bid_generation: Yup.number()
          .required("Please Select The Amount of consulting bid generation")
          .min(0, "Minimum Value is 0"),
        review_resume: Yup.number()
          .required("Please Select The Amount of resume review")
          .min(0, "Minimum Value is 0"),
        pdf_files_upload: Yup.number()
          .required("Please Select The no of pdf files upload")
          .min(0, "Minimum Value is 0"),
        can_edit_resume: Yup.boolean().oneOf(
          [true, false],
          "Please select The CheckBox"
        ),
      }),
    }),
    onSubmit: async (values, action) => {
      console.log(values);
      const res = await axios.put(`/api/packages/${packgeId}`, {
        type: values.type,
        title: values.title,
        amount: values.amount,
        status: values.status,
        features: values.features,
        featuresToolTips: values.featuresToolTips,
        category: values.category,
        limit: {
          resumes_generation: values.limit.resumes_generation,
          can_edit_resume: values.limit.can_edit_resume,
          keywords_generation: values.limit.keywords_generation,
          headline_generation: values.limit.headline_generation,
          about_generation: values.limit.about_generation,
          job_desc_generation: values.limit.job_desc_generation,
          cover_letter_generation: values.limit.cover_letter_generation,
          pdf_files_upload: values.limit.pdf_files_upload,
          review_resume: values.limit.review_resume,
          consulting_bids_generation: values.limit.consulting_bid_generation,
        },
      });

      getPackages();
      // console.log("api response:", res);
      action.resetForm();
      setEditPopUpModel(false);
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
        className={`overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] z-[10000] max-h-full ${
          !editPopUpModel ? "hidden" : "flex"
        }`}
      >
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          {/* <!-- Modal content --> */}
          <div className="relative p-4 rounded-lg shadow dark:!border-gray-900 border-white dark:!bg-gray-800 bg-white">
            {/* <!-- Modal header --> */}
            <div className="flex justify-between items-center pb-4 mb-4  pt-5rounded-t border-b sm:mb-5 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Update Product
              </h3>
              <button
                type="button"
                onClick={() => {
                  setEditPopUpModel(false);
                }}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
                data-modal-target="createProductModal"
                data-modal-toggle="createProductModal"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

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
                    htmlFor="type"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Select Package Type
                  </label>
                  <select
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.type}
                    id="type"
                    name="type"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option defaultValue="">Select Package Type</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                  {formik.touched.type && formik.errors.type && (
                    <p className="text-red-600 pt-3">{formik.errors.type}</p>
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

                <div>
                  <label
                    htmlFor="status"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Status
                  </label>
                  <select
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.status}
                    id="status"
                    name="status"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>

                  {formik.touched.status && formik.errors.status && (
                    <p className="text-red-600 pt-3">{formik.errors.status}</p>
                  )}
                </div>
              </div>

              {/* Limitations */}
              <div className="mb-4 w-ful">
                <span className="text-xl">Limitations</span>
                <div className="flex pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600"></div>
              </div>
              <div className="grid gap-4 mb-4 sm:grid-cols-2">
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
                    value={formik.values.limit.resumes_generation}
                    id="amount"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="0"
                    type="number"
                    name="limit.resumes_generation"
                  />
                  {formik.touched.limit &&
                    formik.touched.limit.resumes_generation &&
                    formik.errors.limit &&
                    formik.errors.limit.resumes_generation && (
                      <p className="text-red-600 pt-3">
                        {formik.errors.limit.resumes_generation}
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
                    value={formik.values.limit.keywords_generation}
                    name="limit.keywords_generation"
                  />
                  {formik.touched.limit?.keywords_generation &&
                    formik.errors.limit?.keywords_generation && (
                      <p className="text-red-600 pt-3">
                        {formik.errors.limit.keywords_generation}
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
                    value={formik.values.limit.headline_generation}
                    name="limit.headline_generation"
                  />
                  {formik.touched.limit?.headline_generation &&
                    formik.errors.limit?.headline_generation && (
                      <p className="text-red-600 pt-3">
                        {formik.errors.limit?.headline_generation}
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
                    value={formik.values.limit.about_generation}
                    name="limit.about_generation"
                  />
                  {formik.touched.limit?.about_generation &&
                    formik.errors.limit?.about_generation && (
                      <p className="text-red-600 pt-3">
                        {formik.errors.limit?.about_generation}
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
                    value={formik.values.limit.job_desc_generation}
                    name="limit.job_desc_generation"
                  />
                  {formik.touched.limit?.job_desc_generation &&
                    formik.errors.limit?.job_desc_generation && (
                      <p className="text-red-600 pt-3">
                        {formik.errors.limit?.job_desc_generation}
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
                    value={formik.values.limit.cover_letter_generation}
                    name="limit.cover_letter_generation"
                  />
                  {formik.touched.limit?.cover_letter_generation &&
                    formik.errors.limit?.cover_letter_generation && (
                      <p className="text-red-600 pt-3">
                        {formik.errors.limit?.cover_letter_generation}
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
                    value={formik.values.limit.review_resume}
                    name="limit.review_resume"
                  />
                  {formik.touched.limit?.review_resume &&
                    formik.errors.limit?.review_resume && (
                      <p className="text-red-600 pt-3">
                        {formik.errors.limit?.review_resume}
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
                    value={formik.values.limit.pdf_files_upload}
                    name="limit.pdf_files_upload"
                  />
                  {formik.touched.limit?.pdf_files_upload &&
                    formik.errors.limit?.pdf_files_upload && (
                      <p className="text-red-600 pt-3">
                        {formik.errors.limit?.pdf_files_upload}
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
                    value={formik.values.limit.consulting_bid_generation}
                    name="limit.consulting_bid_generation"
                  />
                  {formik.touched.limit?.consulting_bid_generation &&
                    formik.errors.limit?.consulting_bid_generation && (
                      <p className="text-red-600 pt-3">
                        {formik.errors.limit?.consulting_bid_generation}
                      </p>
                    )}
                </div>
                <div className="block">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    name="limit.can_edit_resume"
                    onChange={formik.handleChange}
                    className=" mt-8 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="default-checkbox"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Can Edit Resume
                  </label>
                  {formik.touched.limit?.can_edit_resume &&
                    formik.errors.limit?.can_edit_resume && (
                      <p className="text-red-600 pt-3">
                        {formik.errors.limit?.can_edit_resume}
                      </p>
                    )}
                </div>
              </div>
              <div className="mb-4 w-ful">
                <span className="text-xl">Features</span>
                <div className="flex pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600"></div>
              </div>
              {formik.values.features.map((_, index) => (
                <FeatureRow
                  id={index}
                  feature={formik.values.features[index]}
                  tooltip={formik.values.featuresToolTips[index]}
                  key={`feature-row-${index}`}
                  onChangeFeature={(feature: string) => {
                    formik.setFieldValue(`features[${index}]`, feature);
                  }}
                  onChangeTooltip={(tooltip: string) => {
                    formik.setFieldValue(`featuresToolTips[${index}]`, tooltip);
                  }}
                  onBlurFeature={formik.handleBlur}
                  onBlurTooltip={formik.handleBlur}
                  onFeatureRemove={(idx: number) => handleFeatureRemove(idx)}
                />
              ))}

              <button
                className="mt-2 mb-5"
                type="button"
                onClick={(e) => {
                  formik.setFieldValue("features", [
                    ...formik.values.features,
                    "",
                  ]);
                  formik.setFieldValue("featuresToolTips", [
                    ...formik.values.featuresToolTips,
                    "",
                  ]);
                }}
              >
                + Add More Feature
              </button>

              <button
                type="submit"
                className="btn theme-outline-btn "
                style={{ display: "flex" }}
              >
                <svg
                  className="mr-1 -ml-1 w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Update Package
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdatePackage;

// -------------Old Code-----------

//  <div className="relative p-4 w-full max-w-2xl max-h-full">
//    {/* <!-- Modal content --> */}
//    <div className="relative p-4 rounded-lg shadow bg-white">
//      {/* <!-- Modal header --> */}
//      <div className="flex justify-between items-center pb-4 mb-4  pt-5rounded-t border-b sm:mb-5 dark:border-gray-600">
//        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//          Update Product
//        </h3>
//        <button
//          onClick={() => {
//            setEditPopUpModel(false);
//          }}
//          type="button"
//          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
//          data-modal-toggle="updateProductModal"
//        >
//          <svg
//            aria-hidden="true"
//            className="w-5 h-5"
//            fill="currentColor"
//            viewBox="0 0 20 20"
//            xmlns="http://www.w3.org/2000/svg"
//          >
//            <path
//              fill-rule="evenodd"
//              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
//              clip-rule="evenodd"
//            />
//          </svg>
//          <span className="sr-only">Close modal</span>
//        </button>
//      </div>
//      {/* <!-- Modal body --> */}
//      <form onSubmit={formik.handleSubmit}>
//        <div className="grid gap-4 mb-4 sm:grid-cols-2">
//          <div>
//            <label
//              htmlFor="name"
//              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//            >
//              Package Title
//            </label>
//            <input
//              onChange={formik.handleChange}
//              onBlur={formik.handleBlur}
//              value={formik.values.title}
//              type="text"
//              name="title"
//              id="name"
//              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
//              placeholder="Package Title"
//            />
//            {formik.touched.title && formik.errors.title && (
//              <p className="text-red-600 pt-3">{formik.errors.title}</p>
//            )}
//          </div>
//          <div>
//            <label
//              htmlFor="pkgtype"
//              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//            >
//              Select Package Type
//            </label>
//            <select
//              onChange={formik.handleChange}
//              onBlur={formik.handleBlur}
//              value={formik.values.pkgtype}
//              id="pkgtype"
//              name="pkgtype"
//              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//            >
//              <option defaultValue="">Select Package Type</option>
//              <option value="mon">Monthly</option>
//              <option value="year">Yearly</option>
//            </select>
//            {formik.touched.pkgtype && formik.errors.pkgtype && (
//              <p className="text-red-600 pt-3">{formik.errors.pkgtype}</p>
//            )}
//          </div>
//          <div>
//            <label
//              htmlFor="amount"
//              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//            >
//              Amount
//            </label>
//            <input
//              onChange={formik.handleChange}
//              onBlur={formik.handleBlur}
//              value={formik.values.amount}
//              type="number"
//              name="amount"
//              id="amount"
//              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
//              placeholder="0"
//            />
//            {formik.touched.amount && formik.errors.amount && (
//              <p className="text-red-600 pt-3">{formik.errors.amount}</p>
//            )}
//          </div>
//          <div>
//            <label
//              htmlFor="category"
//              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//            >
//              Category
//            </label>
//            <select
//              onChange={formik.handleChange}
//              onBlur={formik.handleBlur}
//              value={formik.values.category}
//              id="category"
//              name="category"
//              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
//            >
//              <option>Select Your Category</option>
//              <option value="basic">Basic</option>
//              <option value="standard">Standard</option>
//              <option value="premium">Premium</option>
//            </select>
//            {formik.touched.category && formik.errors.category && (
//              <p className="text-red-600 pt-3">{formik.errors.category}</p>
//            )}
//          </div>
//          <div className="sm:col-span-2">
//            <div className="flex flex-col  pl-4">
//              <label htmlFor="" className="mb-5 text-black">
//                Status
//              </label>
//              <div className="flex flex-row gap-2 mb-2">
//                <input
//                  onChange={formik.handleChange}
//                  onBlur={formik.handleBlur}
//                  value="active"
//                  id="active"
//                  type="radio"
//                  name="status"
//                  className="w-4 h-4"
//                />
//                <label
//                  htmlFor="active"
//                  className=" text-sm font-medium text-black"
//                >
//                  Active
//                </label>
//                {formik.touched.status && formik.errors.status && (
//                  <p
//                    style={{ display: "contents" }}
//                    className="text-red-600 pt-3"
//                  >
//                    {formik.errors.status}
//                  </p>
//                )}
//              </div>
//            </div>
//            <div className="flex flex-col  pl-4">
//              <div className="flex flex-row gap-2 mb-2">
//                <input
//                  onChange={formik.handleChange}
//                  onBlur={formik.handleBlur}
//                  value={formik.values.status}
//                  id="active"
//                  type="radio"
//                  name="status"
//                  className="w-4 h-4"
//                />
//                <label
//                  htmlFor="inactive"
//                  className=" text-sm font-medium text-black"
//                >
//                  InActive
//                </label>
//                {formik.touched.status && formik.errors.status && (
//                  <p
//                    style={{ display: "contents" }}
//                    className="text-red-600 pt-3"
//                  >
//                    {formik.errors.status}
//                  </p>
//                )}
//              </div>
//            </div>
//          </div>
//          <div>
//            <label
//              htmlFor="amount"
//              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//            >
//              Resume Generation
//            </label>
//            <input
//              onChange={formik.handleChange}
//              onBlur={formik.handleBlur}
//              value={formik.values.resume_gen}
//              id="amount"
//              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
//              placeholder="0"
//              type="number"
//              // value=""
//              name="resume_gen"
//            />
//            {formik.touched.resume_gen && formik.errors.resume_gen && (
//              <p className="text-red-600 pt-3">{formik.errors.resume_gen}</p>
//            )}
//          </div>
//          <div>
//            <label
//              htmlFor="amount"
//              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//            >
//              KeyWords Generation
//            </label>
//            <input
//              id="amount"
//              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
//              placeholder="0"
//              type="number"
//              onChange={formik.handleChange}
//              onBlur={formik.handleBlur}
//              value={formik.values.keyword_gen}
//              name="keywords_gen"
//            />
//            {formik.touched.keyword_gen && formik.errors.keyword_gen && (
//              <p className="text-red-600 pt-3">{formik.errors.keyword_gen}</p>
//            )}
//          </div>
//          <div>
//            <label
//              htmlFor="amount"
//              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//            >
//              Headline Generation
//            </label>
//            <input
//              id="amount"
//              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
//              placeholder="0"
//              type="number"
//              onChange={formik.handleChange}
//              onBlur={formik.handleBlur}
//              value={formik.values.headline_gen}
//              name="headline_gen"
//            />
//            {formik.touched.headline_gen && formik.errors.headline_gen && (
//              <p className="text-red-600 pt-3">{formik.errors.headline_gen}</p>
//            )}
//          </div>
//          <div>
//            <label
//              htmlFor="amount"
//              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//            >
//              About Generation
//            </label>
//            <input
//              id="amount"
//              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
//              placeholder="0"
//              type="number"
//              onChange={formik.handleChange}
//              onBlur={formik.handleBlur}
//              value={formik.values.about_gen}
//              name="about_gen"
//            />
//            {formik.touched.about_gen && formik.errors.about_gen && (
//              <p className="text-red-600 pt-3">{formik.errors.about_gen}</p>
//            )}
//          </div>
//          <div>
//            <label
//              htmlFor="amount"
//              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//            >
//              Job Description Generation
//            </label>
//            <input
//              id="amount"
//              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
//              placeholder="0"
//              type="number"
//              onChange={formik.handleChange}
//              onBlur={formik.handleBlur}
//              value={formik.values.job_desc_gen}
//              name="job_desc_gen"
//            />
//            {formik.touched.about_gen && formik.errors.about_gen && (
//              <p className="text-red-600 pt-3">{formik.errors.about_gen}</p>
//            )}
//          </div>
//          <div>
//            <label
//              htmlFor="amount"
//              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//            >
//              Cover Letters Generation
//            </label>
//            <input
//              id="amount"
//              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
//              placeholder="0"
//              type="number"
//              onChange={formik.handleChange}
//              onBlur={formik.handleBlur}
//              value={formik.values.cover_letter_gen}
//              name="cover-letters_gen"
//            />
//            {formik.touched.cover_letter_gen &&
//              formik.errors.cover_letter_gen && (
//                <p className="text-red-600 pt-3">
//                  {formik.errors.cover_letter_gen}
//                </p>
//              )}
//          </div>
//          <div>
//            <label
//              htmlFor="amount"
//              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//            >
//              Review Resume
//            </label>
//            <input
//              id="amount"
//              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
//              placeholder="0"
//              type="number"
//              onChange={formik.handleChange}
//              onBlur={formik.handleBlur}
//              value={formik.values.review_resume}
//              name="review_resume"
//            />
//            {formik.touched.review_resume && formik.errors.review_resume && (
//              <p className="text-red-600 pt-3">{formik.errors.review_resume}</p>
//            )}
//          </div>
//          <div>
//            <label
//              htmlFor="amount"
//              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//            >
//              No of Pdf Files Upload
//            </label>
//            <input
//              id="amount"
//              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
//              placeholder="0"
//              type="number"
//              onChange={formik.handleChange}
//              onBlur={formik.handleBlur}
//              value={formik.values.no_of_pdf_files_upload}
//              name="no_of_pdf_files_upload"
//            />
//            {formik.touched.no_of_pdf_files_upload &&
//              formik.errors.no_of_pdf_files_upload && (
//                <p className="text-red-600 pt-3">
//                  {formik.errors.no_of_pdf_files_upload}
//                </p>
//              )}
//          </div>
//          <div>
//            <label
//              htmlFor="amount"
//              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//            >
//              Consulting Bid Generations
//            </label>
//            <input
//              id="amount"
//              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
//              placeholder="0"
//              type="number"
//              onChange={formik.handleChange}
//              onBlur={formik.handleBlur}
//              value={formik.values.consulting_bid_generation}
//              name="consulting_bid_generation"
//            />
//            {formik.touched.consulting_bid_generation &&
//              formik.errors.consulting_bid_generation && (
//                <p className="text-red-600 pt-3">
//                  {formik.errors.consulting_bid_generation}
//                </p>
//              )}
//          </div>
//          <div className="block">
//            <input
//              id="default-checkbox"
//              type="checkbox"
//              name="can_edit_resume"
//              onChange={formik.handleChange}
//              className=" mt-8 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
//            />
//            <label
//              htmlFor="default-checkbox"
//              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
//            >
//              Can Edit Resume
//            </label>
//            {formik.touched.can_edit_resume && formik.errors.can_edit_resume && (
//              <p className="text-red-600 pt-3">
//                {formik.errors.can_edit_resume}
//              </p>
//            )}
//          </div>
//        </div>
//        <button
//          type="submit"
//          className="btn theme-outline-btn"
//          style={{ display: "flex" }}
//        >
//          <svg
//            className="mr-1 -ml-1 w-6 h-6"
//            fill="currentColor"
//            viewBox="0 0 20 20"
//            xmlns="http://www.w3.org/2000/svg"
//          >
//            <path
//              fill-rule="evenodd"
//              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
//              clip-rule="evenodd"
//            />
//          </svg>
//          Update The product
//        </button>
//      </form>
//    </div>
//  </div>;
