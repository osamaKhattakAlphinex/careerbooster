"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { FeatureRow } from "./AddCoupon";

type Coupon = {
  _id?: string;
  name: string;
  code: string;
  amount_off: number;
  currency: string;
  duration: "once" | "repeating" | "forever";
  duration_in_months: number;
  livemode: boolean;
  percent_off: number;
  forUserPackageCategory: "basic" | "standard" | "premium";
  expiresAt: Date;
  valid: boolean;
  times_redeemed: number;
  status: "active" | "inactive";
};

type Props = {
  userCoupon: Coupon;
  getCoupons: () => void;
};
function formatDate(isoDate: any) {
  const date = new Date(isoDate);
  const day = date.getUTCDate().toString().padStart(2, "0");
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const year = date.getUTCFullYear();

  return `${day}/${month}/${year}`;
}
const UpdatePackage = ({ userCoupon, getCoupons }: Props) => {
  const [popUpModel, setPopUpModel] = useState(false);
  const [editPopUpModel, setEditPopUpModel] = useState(false);
  // const [previewPopUpModel, setPreviewPopUpModel] = useState(false);
  const couponId = userCoupon._id;
  const expiryDate = new Date(userCoupon.expiresAt); // Convert string to Date object
  const isoExpiryDate = formatDate(expiryDate.toISOString()); // Convert Date object to ISO string
  const formik = useFormik({
    initialValues: {
      name: userCoupon.name,
      amount_off: userCoupon.amount_off,
      category: userCoupon.forUserPackageCategory,
      status: userCoupon.status,
      duration: userCoupon.duration,
      currency: userCoupon.currency,
      duration_in_months: userCoupon.duration_in_months,
      expiryDate: isoExpiryDate,
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Please Name Your Coupon"),
      category: Yup.string().required("Please Select One Package"),
      amount_off: Yup.number()
        .required("Please Enter Your Amount")
        .min(0, "Minimum Value is 0"),
      duration_in_months: Yup.number()
        .required("Please Enter Duration in Months")
        .min(0, "Minimum Value is 0"),
      duration: Yup.string().required("Please Select duration"),
      status: Yup.string().required(
        'Please select either "Active" or "Inactive"'
      ),
      currency: Yup.string().required("Please select currency"),
      expiryDate: Yup.string()
        .required("Please enter the expiry date")
        .matches(
          /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
          "Please use the format DD/MM/YYYY"
        ),
    }),
    onSubmit: async (values, action) => {
      const res = await axios.put(`/api/coupons/${couponId}`, {
        name: values.name,
        amount_off: values.amount_off,
        duration: values.duration,
        status: values.status,
        duration_in_months:
          values.duration === "repeating" ? values.duration_in_months : null,
        currency: values.currency,
        livemode: false,
        // percent_off: null,
        forUserPackageCategory: values.category,
        expiresAt: new Date(values.expiryDate),
        valid: values.status === "active" ? true : false,
        // times_redeemed: 0,
        // type: values.type,
        // title: values.title,
        // amount: values.amount,
        // status: values.status,
        // features: values.features,
        // featuresToolTips: values.featuresToolTips,
        // category: values.category,
        // limit: {
        //   resumes_generation: values.limit.resumes_generation,
        //   can_edit_resume: values.limit.can_edit_resume,
        //   keywords_generation: values.limit.keywords_generation,
        //   headline_generation: values.limit.headline_generation,
        //   about_generation: values.limit.about_generation,
        //   job_desc_generation: values.limit.job_desc_generation,
        //   cover_letter_generation: values.limit.cover_letter_generation,
        //   pdf_files_upload: values.limit.pdf_files_upload,
        //   review_resume: values.limit.review_resume,
        //   consulting_bids_generation: values.limit.consulting_bid_generation,
        //   email_generation: values.limit.email_generation,
        // },
      });

      getCoupons();
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
        className="flex w-full items-center py-2 pr-2 dark:hover:text-[#e6f85e] hover:text-blue-400"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
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
                    Coupon Code
                  </label>
                  <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Coupon Code"
                  />
                  {formik.touched.name && formik.errors.name && (
                    <p className="text-red-600 pt-3">{formik.errors.name}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="category"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Select For Category
                  </label>
                  <select
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.category}
                    id="category"
                    name="category"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="standard" selected>
                      Standard
                    </option>
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
                    htmlFor="amount_off"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Amount-Off
                  </label>
                  <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.amount_off}
                    type="number"
                    name="amount_off"
                    id="amount_off"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="0"
                  />
                  {formik.touched.amount_off && formik.errors.amount_off && (
                    <p className="text-red-600 pt-3">
                      {formik.errors.amount_off}
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

              <div className="grid gap-4 mb-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="duration"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Duration
                  </label>
                  <select
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.duration}
                    id="duration"
                    name="duration"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="once" selected>
                      Once
                    </option>
                    <option value="repeating">Repeating</option>
                    <option value="forever">Forever</option>
                  </select>
                  {formik.touched.duration && formik.errors.duration && (
                    <p className="text-red-600 pt-3">
                      {formik.errors.duration}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="duration_in_months"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Duration In Months
                  </label>
                  <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.duration_in_months}
                    type="number"
                    name="duration_in_months"
                    id="duration_in_months"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="0"
                  />
                  {formik.touched.duration_in_months &&
                    formik.errors.duration_in_months && (
                      <p className="text-red-600 pt-3">
                        {formik.errors.duration_in_months}
                      </p>
                    )}
                </div>
                <div>
                  <label
                    htmlFor="currency"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Currency
                  </label>
                  <select
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.currency}
                    id="currency"
                    name="currency"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="usd" selected>
                      USD
                    </option>
                  </select>
                  {formik.touched.currency && formik.errors.currency && (
                    <p className="text-red-600 pt-3">
                      {formik.errors.currency}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="expiryDate"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Expiry Date (DD/MM/YYYY)
                  </label>
                  <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.expiryDate}
                    type="text"
                    name="expiryDate"
                    id="expiryDate"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="DD/MM/YYYY"
                  />
                  {formik.touched.expiryDate && formik.errors.expiryDate && (
                    <p className="text-red-600 pt-3">
                      {formik.errors.expiryDate}
                    </p>
                  )}
                </div>
              </div>

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
                Update Coupon
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdatePackage;
