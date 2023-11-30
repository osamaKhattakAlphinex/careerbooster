"use client";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { makeid } from "@/helpers/makeid";
import { loadStripe } from "@stripe/stripe-js";
import { stripe } from "@/lib/stripe";

type Props = {
  getCoupons: () => void;
};
// Feature Field
export const FeatureRow = ({
  id,
  feature,
  tooltip,
  onChangeFeature,
  onChangeTooltip,
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
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
      />
      <div className="flex flex-row gap-2 items-center">
        <input
          required
          id={`tooltip-${id}`}
          type="text"
          value={tooltip}
          onChange={(e) => onChangeTooltip(e.target.value)}
          placeholder="Tooltip"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
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

const addCouponToStripe = async (data: any) => {
  const STRIPE_PK = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!;
  // const stripe: any = await loadStripe(STRIPE_PK);
  // console.log(stripe);

  const couponDetails = await stripe.coupons.create({
    id: data.name,
    // object:"coupon",
    amount_off: data.amount_off,
    currency: data.currency,
    duration: data.duration,
    duration_in_months: data.duration_in_months,
    name: "coupon first",
    percent_off: 20,
  });
  console.log(couponDetails);
};
const AddCoupon = ({ getCoupons }: Props) => {
  // const addFeatureToolTip = (toolTip: string[]) => {
  //   setFeaturesToolTips([...featuresToolTips, toolTip]);
  // };

  const [popUpModel, setPopUpModel] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: "",
      amount_off: "",
      category: "standard",
      status: "active",
      duration: "once",
      currency: "usd",
      duration_in_months: 0,
      expiryDate: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Please Name Your Coupon"),
      category: Yup.string().required("Please Select One Package"),
      amount_off: Yup.number()
        .required("Please Enter Your Amount")
        .min(0, "Minimum Value is 0"),
      duration_in_months: Yup.number()
        .required("Please Enter Your Amount")
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
      const data = {
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
        times_redeemed: 0,
      };
      const res = await axios.post("/api/coupons", {
        ...data,
      });
      // console.log("api response:", res);
      // addCouponToStripe(data);
      getCoupons();
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
          Add New Coupon
        </button>
      </div>
      <div
        id="createProductModal"
        tabIndex={-1}
        aria-hidden="true"
        className={`overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-[10000] justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full  ${
          !popUpModel ? "hidden " : "flex"
        } `}
      >
        <div className="relative p-4 w-full max-w-2xl max-h-full ">
          <div className="relative border-2 dark:!border-gray-900 border-white py-4 rounded-lg shadow  dark:!bg-gray-800 bg-white px-10 sm:p-5">
            <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white ">
                Add Coupon
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
                    htmlFor="type"
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
                    htmlFor="amount"
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
                    htmlFor="type"
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
                    htmlFor="amount"
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
                    htmlFor="type"
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
                Add Coupon
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCoupon;
