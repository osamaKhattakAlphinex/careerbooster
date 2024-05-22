"use client";
import DataTable, { TableAction } from "@/components/admin/DataTable";
import PaymentsDecryptionModal from "@/components/admin/payments/paymentsDecryptionModal";
import { useAppContext } from "@/context/AppContext";
import { getFormattedDate } from "@/helpers/getFormattedDateTime";
import { createColumnHelper } from "@tanstack/react-table";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

type Sale = {
  fullname: string;
  amount: string;
  service: string;
  status: string;
  phone: string;
  createdAt: string;
};

const Sales = () => {
  const [sales, setSales] = useState<[] | any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const columnHelper = createColumnHelper<Sale>();

  const columns = [
    columnHelper.accessor("fullname", {
      id: "fullname",
      header: () => "Fullname",
    }),
    columnHelper.accessor("amount", {
      id: "amount",
      header: () => "Amount",
      cell: (info) => info.renderValue()+ " $",
    }),
    columnHelper.accessor("service", {
      id: "service",
      header: () => "Service",
      cell: (info) => {
        const services:any = info.renderValue()
        const labels = services.map((service:any) => service.label) 
        return labels.join(", ")
      },
    }),
    columnHelper.accessor("phone", {
      id: "phone",
      header: () => "Phone",
    }),
    columnHelper.accessor("status", {
      id: "status",
      header: () => "Status",
      cell: (info) => (
        <span
          className={` text-gray-200 text-center text-sm font-semibold uppercase p-1 rounded-sm  ${
            info.renderValue() === "pending" ? "bg-rose-500" : "bg-green-600"
          }`}
        >
          {" "}
          {info.renderValue()}
        </span>
      ),
    }),
    columnHelper.accessor("createdAt", {
      id: "createdAt",
      header: () => "Date",
      cell: (info) => getFormattedDate(info.renderValue()),
    }),
  ];

  // const actions: TableAction[] = [
  // {
  //   name: "update",
  //   type: "handler",
  //   element: (credit: any) => handleCreditUpdate(credit),
  //   styles:
  //     "whitespace-nowrap px-3 py-2 text-xs font-medium text-center text-white bg-green-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 no-underline",
  //   icon: EditIcon,
  // },
  // {
  //   name: "delete",
  //   type: "handler",
  //   element: (credit: Credit) => handleOpenConfirmationModal(credit),
  //   styles:
  //     "whitespace-nowrap px-3 py-2 text-xs font-medium text-center text-white bg-rose-700 rounded-lg hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-rose-300 dark:bg-rose-600 dark:hover:bg-rose-700 dark:focus:ring-rose-800 no-underline",
  //   icon: deleteIcon,
  // },
  // ];

  const fetchSales = async () => {
    setLoading(true);

    if (!loading) {
      axios
        .get("/api/sales")
        .then((res: any) => {
          if (res.data.success) {
            const sales = res.data.result;

            console.log(sales);
            setSales(sales);
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

  return (
    <>
      <div className="flex flex-col items-start justify-end">
        <h2 className="text-xl uppercase dark:text-white/70 text-black/70">
          Sales
        </h2>
        <span className="text-base dark:text-white/70 text-black/70">
          List of sales you made across by providing the services.
        </span>

        <div className="w-full mt-4 overflow-x-auto">
          <DataTable
            loading={loading}
            columns={columns}
            data={sales}
            source="sales"
            actions={[]}
            conditionalTableAction={[]}
          />
        </div>
      </div>
    </>
  );
};

export default Sales;
