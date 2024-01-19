"use client";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

type Feature = string[];
type FeatureTooltip = string[];

type Props = {
  getPackages: () => void;
};

type FeatureFieldType = { id: number; feature: string; tooltip: string };
// Feature Field
export const FeatureRow = ({
  id,
  feature,
  tooltip,
  onChangeFeature,
  onChangeTooltip,
  onBlurFeature,
  onBlurTooltip,
  onFeatureRemove,
}: any) => {
  return (
    <li className="w-full grid grid-cols-2 gap-2 mb-2">
      <input
        required
        id={`feature-${id}`}
        type="text"
        value={feature}
        onChange={(e) => onChangeFeature(e.target.value)}
        placeholder="Feature"
        className="bg-gray-50 border-[1px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
      />
      <div className="flex flex-row gap-2 items-center">
        <input
          required
          id={`tooltip-${id}`}
          type="text"
          value={tooltip}
          onChange={(e) => onChangeTooltip(e.target.value)}
          placeholder="Tooltip"
          className="bg-gray-50 border-[1px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        />

        {id >= 1 && (
          <button
            type="button"
            className="w-8 h-8 bg-rose-500 text-gray-50 rounded-lg px-4 py-2 grid place-content-center"
            onClick={() => {
              onFeatureRemove(id);
            }}
          >
            X
          </button>
        )}
      </div>
    </li>
  );
};

const AddPackage = ({ getPackages }: Props) => {
  const [features, setFeatures] = useState<Feature[]>([]); // State for Features
  const [featuresToolTips, setFeaturesToolTips] = useState<FeatureTooltip[]>(
    []
  ); // State for Features Tool Tips

  const [featureList, setFeatureList] = useState<FeatureFieldType[]>([
    { id: 0, feature: "", tooltip: "" },
  ]);

  const handleFeatureRemove = (idx: number) => {
    const newFeatures = [...formik.values.features];
    newFeatures.splice(idx, 1);

    const newTooltips = [...formik.values.featuresToolTips];
    newTooltips.splice(idx, 1);

    // Set the updated array back into the form values
    formik.setFieldValue("features", newFeatures);
    formik.setFieldValue("featuresToolTips", newFeatures);
  };

  // const addFeatureToolTip = (toolTip: string[]) => {
  //   setFeaturesToolTips([...featuresToolTips, toolTip]);
  // };
  const [popUpModel, setPopUpModel] = useState(false);
  const formik = useFormik({
    initialValues: {
      title: "",
      type: "monthly",
      amount: "",
      category: "basic",
      status: "active",
      features: ["Feature 1"],
      featuresToolTips: [" Tooltip 1"],
      limit: {
        resumes_generation: "",
        keywords_generation: "",
        headline_generation: "",
        about_generation: "",
        job_desc_generation: "",
        cover_letter_generation: "",
        consulting_bid_generation: "",
        review_resume: "",
        pdf_files_upload: "",
        email_generation: "",
        can_edit_resume: false,
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
      // features: Yup.string().required("Please Enter THe Features"),
      // featuresToolTips: Yup.string().required(
      //   "Please Enter THe Features Tool Tips"
      // ),
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
        about_generation: Yup.number()
          .required("Please Select The Amount of About Generation")
          .min(0, "Minimum Value is 0"),
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
        email_generation: Yup.number()
          .required("Please Select The no of emails can be")
          .min(0, "Minimum Value is 0"),
        can_edit_resume: Yup.boolean().oneOf(
          [true, false],
          "Please select The CheckBox"
        ),
      }),
    }),
    onSubmit: async (values, action) => {
      console.log(values);

      const res = await axios.post("/api/packages", {
        type: values.type,
        title: values.title,
        amount: values.amount,
        status: values.status,
        features: values.features,
        featuresToolTips: values.featuresToolTips,
        //["Feature 1", "Feature 2"],
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
          email_generation: values.limit.email_generation,
        },
      });
      // console.log("api response:", res);
      getPackages();
      action.resetForm();
      setPopUpModel(false);
    },
  });

  return (
    <>
      <div className="md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
        <button
          type="button"
          style={{
            display: "inherit",
            marginBottom: "20px !important",
          }}
          id="createProductModalButton"
          data-modal-target="createProductModal"
          data-modal-toggle="createProductModal"
          onClick={() => {
            setPopUpModel(true);
          }}
          className="flex items-center justify-center btn  theme-outline-btn pb-[20px] "
        >
          <svg
            className="h-3.5 w-3.5 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
            />
          </svg>
          Add New Package
        </button>
      </div>
      <div
        id="createProductModal"
        tabIndex={-1}
        aria-hidden="true"
        className={`overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-[10000] justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full  ${!popUpModel ? "hidden " : "flex"
          } `}
      >
        <div className="relative p-4 w-full max-w-2xl max-h-full ">
          <div className="relative border-2 dark:!border-gray-900 border-white py-4 rounded-lg shadow  dark:!bg-gray-800 bg-white px-10 sm:p-5">
            <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white ">
                Add Package
              </h3>
              <button
                type="button"
                onClick={() => {
                  setPopUpModel(false);
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
                    className="bg-gray-50 border-[1px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
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
                    className="bg-gray-50 border-[1px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="monthly" selected>
                      Monthly
                    </option>
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
                    className="bg-gray-50 border-[1px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
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
                    className="bg-gray-50 border-[1px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    <option value="basic" selected>
                      Basic
                    </option>
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
                    htmlFor="category"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Status
                  </label>
                  <select
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.status}
                    id="category"
                    name="status"
                    className="bg-gray-50 border-[1px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    <option value="active" selected>
                      Active
                    </option>
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
                    className="bg-gray-50 border-[1px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="0"
                    type="number"
                    // value=""
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
                    className="bg-gray-50 border-[1px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
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
                    className="bg-gray-50 border-[1px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
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
                    className="bg-gray-50 border-[1px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
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
                    className="bg-gray-50 border-[1px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
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
                    className="bg-gray-50 border-[1px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
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
                    className="bg-gray-50 border-[1px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
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
                    className="bg-gray-50 border-[1px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
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
                    className="bg-gray-50 border-[1px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
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
                <div>
                  <label
                    htmlFor="no_email_generation"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    No Of Email Generation
                  </label>
                  <input
                    id="no_email_generation"
                    className="bg-gray-50 border-[1px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="0"
                    type="number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.limit.email_generation}
                    name="limit.email_generation"
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

              {/* Features */}
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
                onClick={
                  (e) => {
                    formik.setFieldValue("features", [
                      ...formik.values.features,
                      "",
                    ]);
                    formik.setFieldValue("featuresToolTips", [
                      ...formik.values.featuresToolTips,
                      "",
                    ]);
                  }

                  // addFeatureRow
                }
              >
                + Add more Features
              </button>

              {/* <div className="grid gap-4 mb-4 sm:grid-cols-2">
                <>
                  <div>
                    <label
                      htmlFor="features"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Feature Text
                    </label>
                    <input
                      id="features"
                      type="text"
                      name="features"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.features}
                      className="bg-gray-50 border-[1px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Feature 1"
                    />
                  </div>
                </>
                <button
                  type="button"
                  onClick={() => {
                    const featureToAdd: string[] = formik.values.features;
                    if (featureToAdd) {
                      addFeature(featureToAdd);
                      formik.setFieldValue("features", ""); // Clear the input
                    }
                  }}
                >
                  Add Feature
                </button>
                {features.map((feature: Feature, index: number) => (
                  <div key={index}>{feature}</div>
                ))} */}
              {/* <div>
          <label htmlFor="featuresToolTips" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Features Tool Tips
          </label>
          <input
            id="featuresToolTips"
            type="text"
            name="featuresToolTips"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.featuresToolTips}
            className="bg-gray-50 border-[1px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Features Tool Tip 1"
          />
          <button
            type="button"
            onClick={() => {
              addFeatureToolTip(formik.values.featuresToolTips);
              formik.setFieldValue('featuresToolTips', ''); // Clear the input
            }}
          >
            Add Feature Tool Tip
          </button>
          {featuresToolTips.map((toolTip, index) => (
            <div key={index}>{toolTip}</div>
          )}
        </div> */}
              {/* </div> */}

              <button
                type="submit"
                className="btn theme-outline-btn "
                style={{ display: "flex" }}
              // onClick={() => {
              //   alert("clicked");
              // }}
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
                Add new product
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddPackage;
