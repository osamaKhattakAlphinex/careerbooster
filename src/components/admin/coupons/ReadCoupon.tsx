"use client";

import { features } from "process";
import { useState } from "react";

type ICoupon = {
  _id?: string;
  name: string;
  code: string;
  amount_off: number;
  currency: string;
  duration: "once" | "repeating" | "forever";
  duration_in_months: number;
  livemode: boolean;
  percent_off: number;
  forUserPackageCategory: string;
  expiresAt: Date;
  valid: boolean;
  times_redeemed: number;
  status: "active" | "inactive";
};

type Props = {
  userCoupon: ICoupon;
};
function formatDate(isoDate: any) {
  const date = new Date(isoDate);
  const day = date.getUTCDate().toString().padStart(2, "0");
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const year = date.getUTCFullYear();

  return `${day}/${month}/${year}`;
}
const ReadCoupon = ({ userCoupon }: Props) => {
  const expiryDate = new Date(userCoupon.expiresAt); // Convert string to Date object
  const isoExpiryDate = formatDate(expiryDate.toISOString());
  const [previewPopUpModel, setPreviewPopUpModel] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => {
          setPreviewPopUpModel(true);
        }}
        data-modal-target="readProductModal"
        data-modal-toggle="readProductModal"
        className="flex w-full items-center py-2 pr-2 hover:text-[#e6f85e]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-4 h-4 mx-3"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        Preview
      </button>
      <div
        id="readProductModal"
        tabIndex={-1}
        aria-hidden="true"
        className={` z-50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full ${
          !previewPopUpModel ? "hidden" : "flex"
        }`}
      >
        <div className="relative p-4 w-full max-h-full max-w-2xl">
          {/* <!-- Modal content --> */}
          <div className="relative p-8 rounded-lg shadow bg-gray-100  dark:bg-gray-800 light:bg-white sm:p-5">
            {/* <!-- Modal header --> */}
            <div className="flex flex-row items-start justify-between mb-4 rounded-t sm:mb-5">
              <div className="flex-1 text-sm md:text-xl">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Preview Coupon
                </h3>
                <div className="grid gap-4 mb-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Coupon Code
                    </label>
                    <input
                      disabled
                      value={userCoupon.name}
                      type="text"
                      name="name"
                      id="name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Coupon Code"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="type"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Select For Category
                    </label>
                    <select
                      disabled
                      value={userCoupon.forUserPackageCategory}
                      id="category"
                      name="category"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option value="standard" selected>
                        Standard
                      </option>
                      <option value="premium">Premium</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="amount"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Amount-Off
                    </label>
                    <input
                      disabled
                      value={userCoupon.amount_off}
                      type="number"
                      name="amount_off"
                      id="amount_off"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="0"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="category"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Status
                    </label>
                    <select
                      disabled
                      value={userCoupon.status}
                      id="category"
                      name="status"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    >
                      <option value="active" selected>
                        Active
                      </option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="type"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Duration
                    </label>
                    <select
                      disabled
                      value={userCoupon.duration}
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
                  </div>
                  <div>
                    <label
                      htmlFor="amount"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Duration In Months
                    </label>
                    <input
                      disabled
                      value={userCoupon.duration_in_months}
                      type="number"
                      name="duration_in_months"
                      id="duration_in_months"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="type"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Currency
                    </label>
                    <select
                      disabled
                      value={userCoupon.currency}
                      id="currency"
                      name="currency"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option value="usd" selected>
                        USD
                      </option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="expiryDate"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Expiry Date (DD/MM/YYYY)
                    </label>
                    <input
                      disabled
                      value={isoExpiryDate}
                      type="text"
                      name="expiryDate"
                      id="expiryDate"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="DD/MM/YYYY"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-row justify-center items-center mt-4">
              <button
                onClick={() => setPreviewPopUpModel(!previewPopUpModel)}
                type="button"
                className="inline-flex items-center text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReadCoupon;
