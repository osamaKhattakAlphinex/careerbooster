"use client";

import { EditIcon, deleteIcon, pencilIcon } from "@/helpers/iconsProvider";
import React, { useEffect, useRef, useState } from "react";

import axios from "axios";
import { createColumnHelper } from "@tanstack/react-table";
import DataTable, { TableAction } from "@/components/admin/DataTable";
import CreditsModal from "@/components/admin/creditsModal";
import { useAppContext } from "@/context/AppContext";

export type Credit = {
  _id?: string;
  title: string;
  amount: number;
  status: "active" | "inactive";
  features: string[];
  featuresToolTips: string[];
  category: "basic" | "standard" | "premium";
  totalCredits: number;
};

const ViewPackage = ({}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [credits, setCredits] = useState<Credit[]>([]);
  const creditModalRef: React.MutableRefObject<any> = useRef(null);
  // const { abortController } = useAppContext();

  const handleOpenConfirmationModal = (credit: Credit) => {
    if (creditModalRef.current) {
      creditModalRef.current.openModal(true, credit, "delete");
    }
  };

  const columnHelper = createColumnHelper<Credit>();

  const handleCreditUpdate = (credit: Credit) => {
    if (creditModalRef.current) {
      creditModalRef.current.openModal(true, credit, "update");
    }
  };
  const handleCreditAdd = () => {
    if (creditModalRef.current) {
      creditModalRef.current.openModal(true, null, "new");
    }
  };

  const actions: TableAction[] = [
    {
      name: "update",
      type: "handler",
      element: (credit: any) => handleCreditUpdate(credit),
      styles:
        "whitespace-nowrap px-3 py-2 text-xs font-medium text-center text-white bg-green-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 no-underline",
      icon: EditIcon,
    },

    {
      name: "delete",
      type: "handler",
      element: (credit: Credit) => handleOpenConfirmationModal(credit),
      styles:
        "whitespace-nowrap px-3 py-2 text-xs font-medium text-center text-white bg-rose-700 rounded-lg hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-rose-300 dark:bg-rose-600 dark:hover:bg-rose-700 dark:focus:ring-rose-800 no-underline",
      icon: deleteIcon,
    },
  ];

  const columns = [
    columnHelper.accessor("title", {
      id: "title",
      header: () => "Title",
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("amount", {
      id: "amount",
      header: () => "Amount",
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("status", {
      id: "status",
      header: () => "Status",
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("category", {
      id: "category",
      header: () => "Category",
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("totalCredits", {
      id: "totalCreadits",
      header: () => "Total Creadits",
      cell: (info) => info.renderValue(),
    }),
  ];

  const getCredits = async () => {
    setLoading(true);
    // const signal = abortController.signal;

    if (!loading) {
      try {
        let response: any = await axios.get(
          "/api/checkout/getActiveCreditPackages"
          // { signal: signal }
        );
        if (response?.data.success) {
          setCredits(response.data.result);
        }
      } catch {
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    getCredits();
    return () => {
      // abortController.abort();
    };
  }, []);

  return (
    <>
      <CreditsModal ref={creditModalRef} refresh={getCredits} />

      <div className="flex flex-col items-start justify-start">
        <h2 className="text-xl uppercase dark:text-white/70 text-black/70">
          Credits
        </h2>
        <span className="text-base dark:text-white/70 text-black/70">
          Credits
        </span>

        <button
          onClick={handleCreditAdd}
          className="self-end px-3 py-2 text-xs font-medium text-center text-white no-underline bg-green-700 rounded-lg whitespace-nowrap hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Add New Credits
        </button>

        <div className="w-full mt-4 overflow-x-auto">
          <DataTable
            loading={loading}
            columns={columns}
            data={credits}
            actions={actions}
            source="packages"
          />
        </div>
      </div>
    </>
  );
};

export default ViewPackage;
