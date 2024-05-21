"use client";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

type Coupon = {
  coupon_type: "stripe" | "paypal" | "reward";

  name?: string;
  amount_off?: number;
  currency?: string;
  duration: "once" | "repeating" | "forever";
  duration_in_months: number;
  percent_off?: number;
  redeem_by: string; // timestamp - expiration
  valid?: "true" | "false";
  plan?: "all" | "standard" | "premium";
  // these are not specific to the coupan itself.
  discount_type: "amount_off" | "percent_off";
  expirable: "true" | "false";

  // these are specific to coupon type : reward

  credits?: number;
};

type Props = {
  getCoupons: () => void;
};
const AddCoupon = ({ getCoupons }: Props) => {
  const initailsValues: Coupon = {
    coupon_type: "reward",

    name: "",

    amount_off: 0,
    currency: "usd",
    duration: "once",
    duration_in_months: 0,
    percent_off: 0,
    redeem_by: new Date().toDateString(),
    valid: "true",
    plan:"all",
    discount_type: "amount_off",
    expirable: "false",

    credits: 0,
  };

  const [popUpModel, setPopUpModel] = useState(false);
  const formik = useFormik({
    initialValues: initailsValues,
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Name for coupon is required"),
      plan: Yup.string().required("Plan Required"),
      percent_off: Yup.number().when(["coupon_type", "discount_type"], {
        is: (discount_type: string, coupon_type: string) =>
          discount_type === "percent_off" && coupon_type === "stripe",
        then: () =>
          Yup.number()
            .required("Please Enter Your percent_off percent")
            .min(0, "Minimum Value is 0"),
      }),

      amount_off: Yup.number().when(["coupon_type", "discount_type"], {
        is: (discount_type: string, coupon_type: string) =>
          discount_type === "amount_off" &&
          (coupon_type === "stripe" || coupon_type === "paypal"),
        then: () =>
          Yup.number()
            .required("Please Enter Your amount_off amount")
            .min(0, "Minimum Value is 0"),
      }),

      duration_in_months: Yup.number().when(["coupon_type", "duration"], {
        is: (duration: string, coupon_type: string) =>
          duration === "repeating" && coupon_type === "stripe",
        then: () =>
          Yup.number()
            .required("Please Enter repeating month in numbers")
            .min(1, "Minimum Value is 1"),
      }),

      duration: Yup.string().when("coupon_type", {
        is: "reward",
        then: () => Yup.string().required("Please Select duration"),
      }),

      credits: Yup.number().when("coupon_type", {
        is: "reward",
        then: () =>
          Yup.number()
            .required("Please enter the credits")
            .min(1, "Minimum Value is 1"),
      }),

      currency: Yup.string().when(["coupon_type", "discount_type"], {
        is: (discount_type: string, coupon_type: string) =>
          discount_type === "amount_off" && coupon_type === "stripe",
        then: () => Yup.string().required("Please select currency"),
      }),
      redeem_by: Yup.date().when(["coupon_type", "expirable"], {
        is: (expirable: boolean, coupon_type: string) =>
          expirable === true && coupon_type === "stripe",
        then: () =>
          Yup.date().min(new Date(), "Please choose future expiry date"),
      }),
    }),
    onSubmit: async (values, action) => {
      let payload: any = {
        name: values.name,
        coupon_type: values.coupon_type,
        // valid: values.valid,
      };

      if (values.coupon_type === "reward") {
        payload = {
          ...payload,
          valid: values.valid,
          credits: values.credits,
        };
      } else if (values.coupon_type === "stripe") {
        payload = {
          ...payload,
          [values.discount_type]: values[values.discount_type],
          duration: values.duration,
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
      } else {
        payload = {
          ...payload,
          valid: values.valid,
          amount_off: values.amount_off,
          plan: values.plan
        };
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
      <div className="flex flex-col items-stretch justify-end flex-shrink-0 space-y-2 md:w-auto md:flex-row md:space-y-0 md:items-center md:space-x-3">
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
        <div className="relative w-full max-w-2xl max-h-full p-4 ">
          <div className="relative border-2 dark:!border-gray-900 border-white py-4 rounded-lg shadow  dark:!bg-gray-800 bg-white px-10 sm:p-5">
            <div className="flex items-center justify-between pb-4 mb-4 border-b rounded-t sm:mb-5 dark:border-gray-600">
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
                {/* Type of the coupan */}
                <div className="col-span-2">
                  <label
                    htmlFor="coupon_type"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Coupon Type
                  </label>
                  <select
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.coupon_type}
                    name="coupon_type"
                    id="coupon_type"
                    className="bg-gray-50 border-[1px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    <option value="reward">Reward</option>
                    <option value="stripe">Stripe</option>
                    <option value="paypal">Paypal</option>
                  </select>
                </div>
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
                    <p className="pt-3 text-red-600">{formik.errors.name}</p>
                  )}
                </div>
                {/* Type Of Discount */}
                {formik.values.coupon_type === "stripe" && (
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
                )}
                {formik.values.coupon_type === "stripe" &&
                  (formik.values.discount_type === "amount_off" ? (
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
                      {formik.touched.amount_off &&
                        formik.errors.amount_off && (
                          <p className="pt-3 text-red-600">
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
                          <p className="pt-3 text-red-600">
                            {formik.errors.percent_off}
                          </p>
                        )}
                    </div>
                  ))}

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
                {formik.values.coupon_type == "reward" && (
                  <div>
                    <label
                      htmlFor="credits"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Rewarded Credits
                    </label>
                    <input
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.credits}
                      type="number"
                      name="credits"
                      id="credits"
                      className="bg-gray-50 border-[1px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Rewarded Credits"
                    />
                    {formik.touched.credits && formik.errors.credits && (
                      <p className="pt-3 text-red-600">
                        {formik.errors.credits}
                      </p>
                    )}
                  </div>
                )}
                {formik.values.coupon_type == "paypal" && (
                  <>
                  <div>
                    <label
                      htmlFor="credits"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Amount Off (in $)
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
                      <p className="pt-3 text-red-600">
                        {formik.errors.amount_off}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="plan"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Coupon For
                    </label>
                    <select
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.plan}
                      name="plan"
                      id="plan"
                      className="bg-gray-50 border-[1px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    >
                      <option value="all">All</option>
                      <option value="standard">Standard ($ 99)</option>
                      <option value="premium">Premium ($ 494)</option>
                    </select>
                    
                    {formik.touched.plan && formik.errors.plan && (
                      <p className="pt-3 text-red-600">
                        {formik.errors.plan}
                      </p>
                    )}
                  </div>
                  </>
                )}
              </div>
              {formik.values.coupon_type === "stripe" && (
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
                      <p className="pt-3 text-red-600">
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
                          <p className="pt-3 text-red-600">
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
                        <p className="pt-3 text-red-600">
                          {formik.errors.currency}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}

              {formik.values.coupon_type === "stripe" && (
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
                        <p className="pt-3 text-red-600">
                          {formik.errors.redeem_by}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}

              <button
                type="submit"
                className="btn theme-outline-btn "
                style={{ display: "flex" }}
              >
                <svg
                  className="w-6 h-6 mr-1 -ml-1"
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
