"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { FeatureRow } from "./AddPackage";

interface userPackage {
  _id?: string;
  title: string;
  amount: number;
  totalCredits: number;
  status: "active" | "inactive";
  features: string[];
  featuresToolTips: string[];
  category: "basic" | "standard" | "premium";
}

type Props = {
  userPackage: userPackage;
  getPackages: () => void;
};

const UpdatePackage = ({ userPackage, getPackages }: Props) => {
  const [editPopUpModel, setEditPopUpModel] = useState(false);
  const packgeId = userPackage?._id;

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
      amount: userPackage.amount,
      totalCredits: userPackage.totalCredits,
      category: userPackage.category,
      status: userPackage.status,
      features: userPackage.features,
      featuresToolTips: userPackage.featuresToolTips,
    },
    validationSchema: Yup.object().shape({
      title: Yup.string().required("Please Title/Name Your Package"),
      type: Yup.string().required("Please Select One Package"),
      amount: Yup.number()
        .required("Please Enter Your Amount")
        .min(0, "Minimum Value is 0"),
      totalCredits: Yup.number()
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
    }),
    onSubmit: async (values, action) => {
      await axios.put(`/api/packages/${packgeId}`, {
        title: values.title,
        amount: values.amount,
        totalCredits: values.totalCredits,
        status: values.status,
        features: values.features,
        featuresToolTips: values.featuresToolTips,
        category: values.category,
      });

      getPackages();
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
        className="flex w-full items-center py-2 pr-2 dark:hover:text-[#e6f85e] hover:text-blue-400"
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
        className={`overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] z-[10000] max-h-full ${!editPopUpModel ? "hidden" : "flex"
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
                    className="bg-gray-50 border-[1px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Package Title"
                  />
                  {formik.touched.title && formik.errors.title && (
                    <p className="text-red-600 pt-3">{formik.errors.title}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="amount"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Set Number of Credits
                  </label>
                  <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.totalCredits}
                    type="number"
                    name="totalCredits"
                    id="totalCredits"
                    className="bg-gray-50 border-[1px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="0"
                  />
                  {formik.touched.totalCredits && formik.errors.totalCredits && (
                    <p className="text-red-600 pt-3">{formik.errors.totalCredits}</p>
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
                    className="bg-gray-50 border-[1px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>

                  {formik.touched.status && formik.errors.status && (
                    <p className="text-red-600 pt-3">{formik.errors.status}</p>
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
