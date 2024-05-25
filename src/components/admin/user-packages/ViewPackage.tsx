"use client";

import { deleteIcon } from "@/helpers/iconsProvider";
import React, { useEffect, useRef, useState } from "react";
import AddPackage from "./AddPackage";

import ReadPackage from "./ReadPackage";
import axios from "axios";
import UpdatePackage from "./UpdatePackage";
import ConfirmationModal from "@/components/admin/ConfirmationModal";
import { createColumnHelper } from "@tanstack/react-table";
import DataTable, { TableAction } from "@/components/admin/DataTable";

type Package = {
  _id?: string;
  title: string;
  amount: number;
  totalCredits: number;
  status: "active" | "inactive";
  features: string[];
  featuresToolTips: string[];
  category: "basic" | "standard" | "premium";
};

const ViewPackage = ({}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [packages, setPackages] = useState<Package[]>([]);
  const confirmationModalRef: React.MutableRefObject<any> = useRef(null);

  const handleOpenConfirmationModal = (record: Package) => {
    if (confirmationModalRef.current) {
      confirmationModalRef.current.openModal(true, record._id);
    }
  };

  const columnHelper = createColumnHelper<Package>();

  const actions: TableAction[] = [
    {
      name: "update",
      type: "component",
      element: (pckg: any) => (
        <UpdatePackage userPackage={pckg} getPackages={getPackages} />
      ),
      styles:
        "whitespace-nowrap px-3 py-2 text-xs font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 no-underline",
      icon: "",
      props: { getPackages: () => getPackages() },
    },

    {
      name: "preview",
      type: "component",
      element: (pckg: any) => <ReadPackage userPackage={pckg} />,
      styles:
        "px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 no-underline",
      icon: "",
    },

    {
      name: "delete",
      type: "handler",
      element: (pckg: any) => handleOpenConfirmationModal(pckg),
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
    columnHelper.accessor("totalCredits", {
      id: "totalCredits",
      header: () => "Total Credits",
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("amount", {
      id: "amount",
      header: () => "Amount (in $)",
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
  ];

  const getPackages = async () => {
    setLoading(true);
    if (!loading) {
      try {
        let response: any = await axios.get("/api/packages");
        if (response?.data.success) {
          console.log(response.data.result)
          setPackages(response.data.result);
        }
      } catch {
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    getPackages();
  }, []);

  return (
    <>
      <ConfirmationModal
        id={"deletion-confirmation-modal-user-packages"}
        title={"Deletion Modal"}
        message={"Are you sure you want to delete this record"}
        ref={confirmationModalRef}
        api="/api/packages"
        refresh={getPackages}
      />

      <div className="flex flex-col items-start justify-start">
        <h2 className="text-xl uppercase  dark:text-white/70 text-black/70">
          Packages
        </h2>
        <span className="text-base dark:text-white/70 text-black/70">
          List of all the packages a user can choose from.
        </span>
        <div className="flex flex-row items-center justify-end w-full mt-4">
          <AddPackage getPackages={getPackages} />
        </div>
        <div className="w-full mt-4 overflow-x-auto">
          <DataTable
            loading={loading}
            columns={columns}
            data={packages}
            actions={actions}
            source="packages"
          />
        </div>
      </div>
      </>
  );
};

export default ViewPackage;

