"use client";

import DataTable, { TableAction } from "@/components/admin/DataTable";
import MessageViewer from "@/components/admin/messageViewer";
import {
  EditIcon,
  eyeIcon,
  pencilIcon,
  trashIcon,
} from "@/helpers/iconsProvider";
import { createColumnHelper } from "@tanstack/react-table";
import axios from "axios";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Job = {
  _id: string;
  jobTitle: string;
  location: string;
  employer: string;
  category: string;
  jobDescription: string;
  addedByUserId: string;
  link: string;
  skills: string[];
  rejectMsg: string;
  noOfProposals: number;
  status: string;
  featured: number;
};

const Jobs = () => {
  const [records, setRecords] = useState<[] | any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchRecords = async () => {
    setLoading(true);

    if (!loading) {
      axios
        .get("/api/deo")
        .then((res: any) => {
          if (res.data.success) {
            setRecords(res.data.job);
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

  const viewMessageHandler = (rec: any) => {};

  const columnHelper = createColumnHelper<Job>();

  const columns = [
    columnHelper.accessor("jobTitle", {
      id: "jobTitle",
      header: () => "jobTitle",
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("location", {
      id: "location",
      header: () => "location",
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("employer", {
      id: "employer",
      header: () => "employer",
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("category", {
      id: "category",
      header: () => "category",
      cell: (info) => (
        <span className="inline-block max-w-sm truncate">
          {info.renderValue()}
        </span>
      ),
    }),
    columnHelper.accessor("jobDescription", {
      id: "jobDescription",
      header: () => "jobDescription",
    }),

    columnHelper.accessor("link", {
      id: "link",
      header: () => "link",
      cell: (info) => {
        if (info.renderValue()) {
          return (
            <Link href={info.renderValue()} className="text-blue-400 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                />
              </svg>
            </Link>
          );
        } else {
          ("No link");
        }
      },
    }),
    columnHelper.accessor("skills", {
      id: "skills",
      header: () => "skills",
    }),
    columnHelper.accessor("rejectMsg", {
      id: "rejectMsg",
      header: () => "rejectMsg",
    }),
    columnHelper.accessor("noOfProposals", {
      id: "noOfProposals",
      header: () => "noOfProposals",
    }),
    columnHelper.accessor("status", {
      id: "status",
      header: () => "status",
    }),
    columnHelper.accessor("featured", {
      id: "featured",
      header: () => "featured",
    }),
  ];

  const actions: TableAction[] = [
    {
      name: "Edit",
      type: "handler",
      element: (rec: any) => viewMessageHandler(rec),
      styles:
        "whitespace-nowrap px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 no-underline",
      icon: EditIcon,
    },
    {
      name: "Preview",
      type: "handler",
      element: (rec: any) => viewMessageHandler(rec),
      styles:
        "whitespace-nowrap px-3 py-2 text-xs font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 no-underline",
      icon: eyeIcon,
    },
    {
      name: "Delete",
      type: "handler",
      element: (rec: any) => viewMessageHandler(rec),
      styles:
        "whitespace-nowrap px-3 py-2 text-xs font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 no-underline",
      icon: trashIcon,
    },
  ];

  useEffect(() => {
    fetchRecords();
  }, []);

  console.log(records);

  return (
    <>
      <div className="flex flex-col items-start justify-start">
        <h2 className="text-xl uppercase dark:text-white/70 text-black/70">
          Deo Name Here
        </h2>
        <span className="text-base dark:text-white/70 text-black/70">
          List of emails you recieved in in your email.
        </span>
        <div className="w-full mt-4 overflow-x-auto">
          {records?.length > 0 ? (
            <DataTable
              columns={columns}
              data={records}
              source="deo"
              actions={actions}
              loading={loading}
            />
          ) : (
            "No records found"
          )}
        </div>
      </div>
    </>
  );
};

export default Jobs;
