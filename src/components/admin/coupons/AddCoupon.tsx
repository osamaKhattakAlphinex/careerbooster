"use client";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

type Coupon = {
  name?: string;
  amount_off?: number;
  currency?: string;
  duration: "once" | "repeating" | "forever";
  duration_in_months: number;
  percent_off?: number;
  redeem_by: string; // timestamp - expiration
  valid?: "true" | "false";
  // these are not specific to the coupan itself.
  discount_type: "amount_off" | "percent_off";
  expirable: "true" | "false";
};

type Props = {
  getCoupons: () => void;
};
const AddCoupon = ({ getCoupons }: Props) => {
  const initailsValues: Coupon = {
    name: "",
    amount_off: 0,
    currency: "usd",
    duration: "once",
    duration_in_months: 0,
    percent_off: 0,
    redeem_by: new Date().toDateString(),
    valid: "true",
    discount_type: "amount_off",
    expirable: "false",
  };

  const [popUpModel, setPopUpModel] = useState(false);
  const formik = useFormik({
    initialValues: initailsValues,
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Name for coupon is required"),
      percent_off: Yup.number().when("discount_type", {
        is: "percent_off",
        then: () =>
          Yup.number()
            .required("Please Enter Your percent_off percent")
            .min(0, "Minimum Value is 0"),
      }),

      amount_off: Yup.number().when("discount_type", {
        is: "amount_off",
        then: () =>
          Yup.number()
            .required("Please Enter Your amount_off amount")
            .min(0, "Minimum Value is 0"),
      }),

      duration_in_months: Yup.number().when("duration", {
        is: "repeating",
        then: () =>
          Yup.number()
            .required("Please Enter repeating month in numbers")
            .min(1, "Minimum Value is 1"),
      }),

      duration: Yup.string().required("Please Select duration"),
      currency: Yup.string().when("discount_type", {
        is: "amount_off",
        then: () => Yup.string().required("Please select currency"),
      }),
      redeem_by: Yup.date().when("expirable", {
        is: "true",
        then: () =>
          Yup.date().min(new Date(), "Please choose future expiry date"),
      }),
    }),
    onSubmit: async (values, action) => {
      const payload = {
        name: values.name,
        [values.discount_type]: values[values.discount_type],
        duration: values.duration,
        // valid: values.valid,
      };

      if (values.discount_type === "amount_off") {
        if (values.amount_off) {
          payload.amount_off = 100 * values.amount_off;
        }
      } else {
        if (values.percent_off) {
          payload.percent_off = values.percent_off;
        }
      }
      if (values.discount_type === "amount_off") {
        payload.currency = values.currency;
      }
      if (values.expirable === "true") {
        const expiryDate = new Date(values.redeem_by);
        expiryDate.setHours(23, 59, 59, 999);
        const expiryTimestamp = expiryDate.getTime() / 1000;

        console.log(expiryTimestamp);
        payload.redeem_by = Math.trunc(expiryTimestamp);
      }
      if (values.duration === "repeating") {
        payload.duration_in_months = values.duration_in_months;
      }
      try {
        let response: any = await axios.post("/api/coupons", payload);
        if (response?.data.success) {
          console.log(response.data.result);
        }
      } catch (err) {
        console.log(err);
      } finally {
        getCoupons();
        action.resetForm();
        setPopUpModel(false);
      }
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
        className={`overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-[10000] justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full  ${!popUpModel ? "hidden " : "flex"
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
                {/* Name of the coupan */}
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Coupon Name
                  </label>
                  <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border-[1px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Coupon Code"
                  />
                  {formik.touched.name && formik.errors.name && (
                    <p className="text-red-600 pt-3">{formik.errors.name}</p>
                  )}
                </div>
                {/* Type Of Discount */}
                <div>
                  <label
                    htmlFor="discount_type"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Discount Type
                  </label>
                  <select
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.discount_type}
                    name="discount_type"
                    id="discount_type"
                    className="bg-gray-50 border-[1px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    <option value="amount_off">Amount Off</option>
                    <option value="percent_off">Percent Off</option>
                  </select>
                </div>
                {formik.values.discount_type === "amount_off" ? (
                  <div>
                    {/* ammount off amount */}
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
                      className="bg-gray-50 border-[1px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="0"
                      pattern="0.0"
                    />
                    {formik.touched.amount_off && formik.errors.amount_off && (
                      <p className="text-red-600 pt-3">
                        {formik.errors.amount_off}
                      </p>
                    )}
                  </div>
                ) : (
                  <div>
                    {/* percentage off percent */}
                    <label
                      htmlFor="percent_off"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Percent-Off
                    </label>
                    <input
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.percent_off}
                      type="number"
                      name="percent_off"
                      id="percent_off"
                      className="bg-gray-50 border-[1px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="0"
                    />
                    {formik.touched.percent_off &&
                      formik.errors.percent_off && (
                        <p className="text-red-600 pt-3">
                          {formik.errors.percent_off}
                        </p>
                      )}
                  </div>
                )}
                {/*  valid : yes or no  */}
                <div>
                  <label
                    htmlFor="valid"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Valid
                  </label>
                  <select
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.valid}
                    id="valid"
                    name="valid"
                    className="bg-gray-50 border-[1px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-4 mb-4 sm:grid-cols-2">
                {/* duration  once | repeating | forever */}
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
                    className="bg-gray-50 border-[1px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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

                {/* duration in months */}
                {formik.values.duration === "repeating" && (
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
                      className="bg-gray-50 border-[1px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="0"
                    />
                    {formik.touched.duration_in_months &&
                      formik.errors.duration_in_months && (
                        <p className="text-red-600 pt-3">
                          {formik.errors.duration_in_months}
                        </p>
                      )}
                  </div>
                )}

                {formik.values.discount_type === "amount_off" && (
                  <div>
                    {/* currency */}
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
                      className="bg-gray-50 border-[1px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                )}
              </div>

              <div className="grid gap-4 mb-4 sm:grid-cols-2">
                <div>
                  {/* Expirable Coupon*/}
                  <label
                    htmlFor="expirable"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Is this coupan expiring soon?
                  </label>
                  <select
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.expirable}
                    id="expirable"
                    name="expirable"
                    className="bg-gray-50 border-[1px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
                {formik.values.expirable === "true" && (
                  <div>
                    {/* redeem by date i.e expiration data*/}
                    <label
                      htmlFor="redeem_by"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Expiry Date (DD/MM/YYYY)
                    </label>
                    <input
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.redeem_by}
                      type="date"
                      name="redeem_by"
                      id="redeem_by"
                      className="bg-gray-50 border-[1px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="DD/MM/YYYY"
                    />
                    {formik.touched.redeem_by && formik.errors.redeem_by && (
                      <p className="text-red-600 pt-3">
                        {formik.errors.redeem_by}
                      </p>
                    )}
                  </div>
                )}
              </div>

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
