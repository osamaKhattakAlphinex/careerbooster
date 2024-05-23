"use client";
import DataTable, { TableAction } from "@/components/admin/DataTable";
import { getFormattedDate } from "@/helpers/getFormattedDateTime";
import { boltIcon, deleteIcon } from "@/helpers/iconsProvider";
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

const ChangeStatus = ({ sale, refetch }: any) => {
  const [status, setStatus] = useState<boolean>(false);

  useEffect(() => {
    if (sale.status === "pending") {
      setStatus(false);
    } else {
      setStatus(true);
    }
  }, []);

  return (
    <label
      htmlFor="status"
      className={`${status ? "line-through " : " "} flex flex-row gap-2 `}
    >
      <input
        id="status"
        type="checkbox"
        checked={status}
        className=""
        onChange={(e) => {
          const newStatus = e.target.checked ? "completed" : "pending";
          const updatedSale = { ...sale, status: newStatus };

          axios
            .put(`/api/sales/${sale._id}`, updatedSale)
            .then((res: any) => {
              if (res.data.success) {
                refetch();
              }
            })
            .catch((err) => {
              console.log(err);
            })
            .finally(() => {});
        }}
      />{" "}
      Completed
    </label>
  );
};
const DeleteSale = ({ sale, refetch }: any) => {
  return (
    <button
      className="whitespace-nowrap p-2 text-xs font-medium text-center text-white bg-rose-700 rounded-lg hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-rose-300 dark:bg-rose-600 dark:hover:bg-rose-700 dark:focus:ring-rose-800 no-underline"
      title="Delete"
      onClick={(e) => {
        axios
          .delete(`/api/sales/${sale._id}`)
          .then((res: any) => {
            if (res.data.success) {
              refetch();
            }
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {});
      }}
    >
      {deleteIcon}
    </button>
  );
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
      header: () => "Paid Amount",
      cell: (info) => info.renderValue() + " $",
    }),
    columnHelper.accessor("service", {
      id: "service",
      header: () => "Service",
      cell: (info) => {
        const services: any = info.renderValue();
        const labels = services.map((service: any) => service.label);
        return labels.join(", ");
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
          className={` text-gray-200 text-center text-sm font-semibold uppercase p-1 rounded-md  ${
            info.renderValue() === "pending" ? "bg-yellow-600" : "bg-green-600"
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

  const actions: TableAction[] = [
    {
      name: "Change Status",
      type: "component",
      element: (sale: any) => <ChangeStatus sale={sale} refetch={fetchSales} />,
      styles: "",
      icon: boltIcon,
    },
    {
      name: "Delete",
      type: "component",
      element: (sale: any) => <DeleteSale sale={sale} refetch={fetchSales} />,
      styles: "",
      icon: deleteIcon,
    },
  ];

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
            actions={actions}
          />
        </div>
      </div>
    </>
  );
};

export default Sales;
