"use client";

import { leftArrowIcon } from "@/helpers/iconsProvider";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import AddCoupon from "./AddCoupon";

import ReadCoupon from "./ReadCoupon";
// import { Link } from 'react-router-dom'; // Import Link from React Router if you're using it
// import AddProduct from './AddProduct'; // Import the AddProduct component
import axios from "axios";
// import UpdateCoupon from "./UpdateCoupon";
import ConfirmationModal from "@/components/utilities/form-elements/ConfirmationModal";

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

const ViewCoupons = ({}) => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const confirmationModalRef: React.MutableRefObject<any> = useRef(null);
  const handleOpenConfirmationModal = (record: Coupon) => {
    if (confirmationModalRef.current) {
      confirmationModalRef.current.openModal(true, record._id);
    }
  };
  const getCoupons = async () => {
    try {
      let response: any = await axios.get("/api/coupons");
      if (response?.data.success) {
        setCoupons(response.data.result);
      }
    } catch {}
  };
  useEffect(() => {
    getCoupons();
  }, []);
  return (
    <>
      <ConfirmationModal
        id={"deletion-confirmation-modal-user-packages"}
        title={"Deletion Modal"}
        message={"Are you sure you want to delete this record"}
        ref={confirmationModalRef}
        api="/api/packages"
        refresh={getCoupons}
      />
      <div className="pt-30">
        <div className="my-5 ml-10">
          <Link
            href="/admin"
            className="flex flex-row gap-2 items-center hover:font-semibold transition-all"
          >
            {leftArrowIcon}
            Dashboard
          </Link>
        </div>
        <div className="flex flex-col gap-2 items-center justify-center">
          <div className=" p-8 flex flex-col gap-2 border w-11/12">
            <div className="w-100 flex flex-row justify-between">
              <h2 className="text-xl ">Coupons Management</h2>
              {/* Add Button*/}
              <AddCoupon getCoupons={getCoupons} />
            </div>
            {/* Table */}
            <div className="">
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="pt-10 border-collapse w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-[16px] text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-4 py-4">
                        Code
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Used for Category
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Amount-Off
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Status
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Duration
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Expiry Date
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Times Radeemed
                      </th>
                      <th scope="col" className="px-4 py-3 text-center">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {coupons?.map((coupon: Coupon, index: number) => {
                      return (
                        <tr
                          key={index}
                          className=" bg-gray-100 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                          <th
                            scope="row"
                            className="px-4 py-3 font-medium whitespace-nowrap"
                          >
                            {coupon?.name}
                          </th>
                          <td className="px-4 py-3">
                            {coupon?.forUserPackageCategory}
                          </td>
                          <td className="px-4 py-3">{coupon?.amount_off}</td>
                          <td className="px-4 py-3 ">{coupon?.status}</td>
                          <td className="px-4 py-3">{coupon?.duration}</td>
                          <td className="px-4 py-3">
                            {coupon?.expiresAt
                              ? new Date(coupon.expiresAt).toLocaleDateString()
                              : "No expiry date"}
                          </td>
                          <td className="px-4 py-3">
                            {coupon?.times_redeemed}
                          </td>
                          <td className="px-4 py-3 flex items-center justify-end">
                            <ul
                              className="py-1 text-sm flex"
                              aria-labelledby="apple-imac-27-dropdown-button"
                            >
                              <li>
                                {/* <UpdatePackage
                                  userPackage={pckg}
                                  getPackages={getPackages}
                                /> */}
                              </li>
                              <li>
                                <ReadCoupon userCoupon={coupon} />
                              </li>
                              <li>
                                <button
                                  onClick={() =>
                                    handleOpenConfirmationModal(coupon)
                                  }
                                  type="button"
                                  data-modal-target="deleteModal"
                                  data-modal-toggle="deleteModal"
                                  className="flex w-full items-center py-2 pr-2 hover:text-[#e6f85e]"
                                >
                                  <svg
                                    className="w-4 h-4 mr-2"
                                    viewBox="0 0 14 15"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    aria-hidden="true"
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
                                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                      />
                                    </svg>
                                  </svg>
                                  Delete
                                </button>
                              </li>
                            </ul>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewCoupons;
