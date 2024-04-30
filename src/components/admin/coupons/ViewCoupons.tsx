"use client";

import { deleteIcon } from "@/helpers/iconsProvider";
import React, { useEffect, useRef, useState } from "react";
import AddCoupon from "./AddCoupon";
import axios from "axios";
import ConfirmationModal from "@/components/admin/ConfirmationModal";
import { createColumnHelper } from "@tanstack/react-table";
import DataTable, { TableAction } from "@/components/admin/DataTable";

type Coupon = {
  coupon_code: string;
  coupon_type: string;
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
  credits?: number;
};

const ViewCoupons = ({}) => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const confirmationModalRef: React.MutableRefObject<any> = useRef(null);

  const columnHelper = createColumnHelper<Coupon>();

  const columns = [
    columnHelper.accessor("coupon_code", {
      id: "coupon_code",
      header: () => "Coupon Code / Id",
      cell: (info) => info.renderValue(),
      // footer: (info) => info.column.id,
    }),
    columnHelper.accessor("coupon_type", {
      id: "coupon_type",
      header: () => "Coupon Type",
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
    columnHelper.accessor("credits", {
      id: "credits",
      header: () => " Free Credits",
      cell: (info) => info.renderValue(),
      // footer: (info) => info.column.id,
    }),
  ];

  const actions: TableAction[] = [
    {
      name: "delete",
      type: "handler",
      element: (coupon: any) => handleDelete(coupon.coupon_code),
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

      <div className="flex flex-col items-start justify-start">
        <h2 className="text-xl uppercase dark:text-white/70 text-black/70">
          Packages
        </h2>
        <span className="text-base dark:text-white/70 text-black/70">
          List of all the packages a user can choose from.
        </span>
        <div className="flex flex-row items-center justify-end w-full mt-4">
          <AddCoupon getCoupons={getCoupons} />
        </div>
        <div className="w-full mt-4 overflow-x-auto">
          <DataTable
            loading={loading}
            columns={columns}
            data={coupons}
            actions={actions}
            source="coupons"
          />
        </div>
      </div>
    </>
  );
};

export default ViewCoupons;
