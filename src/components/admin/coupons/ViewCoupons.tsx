"use client";

import { leftArrowIcon, deleteIcon } from "@/helpers/iconsProvider";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import AddCoupon from "./AddCoupon";

import ReadCoupon from "./ReadCoupon";
// import { Link } from 'react-router-dom'; // Import Link from React Router if you're using it
// import AddProduct from './AddProduct'; // Import the AddProduct component
import axios from "axios";
import UpdateCoupon from "./UpdateCoupon";
import ConfirmationModal from "@/components/utilities/form-elements/ConfirmationModal";
import { createColumnHelper } from "@tanstack/react-table";
import DataTable, { TableAction } from "@/components/DataTable";

type Coupon = {
  id: string;
  name?: string;
  amount_off?: number;
  currency?: string;
  duration: "once" | "repeating" | "forever";
  duration_in_months?: number;
  livemode: boolean;
  percent_off?: number;
  redeem_by?: number;
  valid?: boolean;
  times_redeemed?: number;
  max_redemptions?: number;
  object?: string;
  created: number;
  metadata: {};
};

const ViewCoupons = ({}) => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const confirmationModalRef: React.MutableRefObject<any> = useRef(null);
  const handleOpenConfirmationModal = (record: Coupon) => {
    if (confirmationModalRef.current) {
      confirmationModalRef.current.openModal(true, record.id);
    }
  };

  const columnHelper = createColumnHelper<Coupon>();

  const columns = [
    columnHelper.accessor("id", {
      id: "id",
      header: () => "coupon code / id",
      cell: (info) => info.renderValue(),
      // footer: (info) => info.column.id,
    }),
    columnHelper.accessor("name", {
      id: "name",
      header: () => "name",
      cell: (info) => info.renderValue(),
      // footer: (info) => info.column.id,
    }),
    columnHelper.accessor("amount_off", {
      id: "amount_off",
      header: () => "Disc Amount",
      cell: (info: any) => info.renderValue() / 100,
      // footer: (info) => info.column.id,
    }),
    columnHelper.accessor("percent_off", {
      id: "percent_off",
      header: () => "Disc Percentage",
      cell: (info) => info.renderValue(),
      // footer: (info) => info.column.id,
    }),
    columnHelper.accessor("duration", {
      id: "duration",
      header: () => "duration",
      cell: (info) => info.renderValue(),
      // footer: (info) => info.column.id,
    }),
    columnHelper.accessor("valid", {
      id: "valid",
      header: () => "is Valid",
      cell: (info) => (info.renderValue() ? "Yes" : "No"),
      // footer: (info) => info.column.id,
    }),
    columnHelper.accessor("created", {
      id: "created",
      header: () => "Created On",
      cell: (info: any) => toDateAndTime(info.renderValue()),
      // footer: (info) => info.column.id,
    }),

    columnHelper.accessor("redeem_by", {
      id: "redeem_by",
      header: () => "expires on",
      cell: (info: any) => toDateAndTime(info.renderValue()),
      // footer: (info) => info.column.id,
    }),
    columnHelper.accessor("times_redeemed", {
      id: "times_redeemed",
      header: () => "Times Redeemed ",
      cell: (info) => info.renderValue(),
      // footer: (info) => info.column.id,
    }),
  ];

  const actions: TableAction[] = [
    {
      name: "delete",
      type: "handler",
      element: (coupon: any) => handleDelete(coupon.id),
      styles:
        "whitespace-nowrap px-3 py-2 text-xs font-medium text-center text-white bg-rose-700 rounded-lg hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-rose-300 dark:bg-rose-600 dark:hover:bg-rose-700 dark:focus:ring-rose-800 no-underline",
      icon: deleteIcon,
    },
  ];

  const toDateAndTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    const formattedDate = date.toLocaleString();
    return formattedDate;
  };

  const handleDelete = async (couponCode: string) => {
    const consent = confirm("Are you sure you want to delete this coupan?");
    if (!consent) return;
    try {
      let response: any = await axios.delete(`/api/coupons/${couponCode}`);
      if (response?.data.success) {
        console.log("coupan deleted");
      }
    } catch (error) {
      console.log(error);
    } finally {
      getCoupons();
    }
  };

  const getCoupons = async () => {
    setLoading(true);
    if (!loading) {
      try {
        let response: any = await axios.get("/api/coupons");
        if (response?.data.success) {
          setCoupons(response.data.result);
        }
      } catch {
      } finally {
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    getCoupons();
  }, []);
  return (
    <>
      <ConfirmationModal
        id={"deletion-confirmation-modal-user-coupons"}
        title={"Deletion Modal"}
        message={"Are you sure you want to delete this record"}
        ref={confirmationModalRef}
        api="/api/coupons"
        refresh={getCoupons}
      />

      <div className="flex flex-col justify-start items-start">
        <h2 className=" text-xl dark:text-white/70 text-black/70 uppercase">
          Packages
        </h2>
        <span className="dark:text-white/70 text-black/70 text-base">
          List of all the packages a user can choose from.
        </span>
        <div className="mt-4 flex flex-row justify-end items-center w-full">
          <AddCoupon getCoupons={getCoupons} />
        </div>
        <div className="w-full overflow-x-auto mt-4">
          <DataTable
            loading={loading}
            columns={columns}
            data={coupons}
            actions={actions}
            source="coupons"
          />
        </div>
      </div>
      {/* <div className="pt-30">
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
              <AddCoupon getCoupons={getCoupons} />
            </div>

            <DataTable
              loading={loading}
              columns={columns}
              data={coupons}
              actions={actions}
              source="coupons"
            />
          </div>
        </div>
      </div> */}
    </>
  );
};

export default ViewCoupons;

{
  /* <div className="">
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="pt-10 border-collapse w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-[16px] text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-4 py-4">
                        Coupon ID / CODE
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Name
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Amount-Off
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Percent-Off
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Valid
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Duration
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Creation Date
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
                            {coupon?.id}
                          </th>
                          <td className="px-4 py-3">{coupon?.name}</td>
                          <td className="px-4 py-3">
                            {coupon.amount_off &&
                              `${coupon?.amount_off / 100} $`}
                          </td>
                          <td className="px-4 py-3">
                            {coupon?.percent_off && `${coupon?.percent_off} %`}
                          </td>
                          <td className="px-4 py-3">
                            {coupon?.valid ? "Yes" : "No"}
                          </td>
                          <td className="px-4 py-3">{coupon?.duration}</td>
                          <td className="px-4 py-3">
                            {coupon?.created
                              ? toDateAndTime(coupon.created)
                              : "---"}
                          </td>
                          <td className="px-4 py-3 italic">
                            {coupon?.redeem_by
                              ? toDateAndTime(coupon.redeem_by)
                              : "Null"}
                          </td>
                          <td className="px-4 py-3">
                            {coupon?.times_redeemed}
                          </td>
                          <td className="px-4 py-3 flex items-center justify-end">
                            <button
                              onClick={() => handleDelete(coupon.id)}
                              type="button"
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
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div> */
}
