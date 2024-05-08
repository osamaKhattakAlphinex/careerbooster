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
  const messageViewerRef: React.MutableRefObject<any> = useRef(null);
  const [message, setMessage] = useState<string>("");

  const fetchRecords = async () => {
    setLoading(true);

    if (!loading) {
      axios
        .get("/api/contacts")
        .then((res: any) => {
          if (res.data.success) {
            setRecords(res.data.emails);
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

  const viewMessageHandler = (rec: any) => {
    if (messageViewerRef.current) {
      setMessage(rec.message);
      messageViewerRef.current.openModal(true);
    }
  };

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
    columnHelper.accessor("addedByUserId", {
      id: "addedByUserId",
      header: () => "addedByUserId",
    }),
    columnHelper.accessor("link", {
      id: "link",
      header: () => "link",
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

  return (
    <>
      <MessageViewer ref={messageViewerRef} message={message} />
      <div className="flex flex-col items-start justify-start">
        <h2 className="text-xl uppercase dark:text-white/70 text-black/70">
          Emails
        </h2>
        <span className="text-base dark:text-white/70 text-black/70">
          List of emails you recieved in in your email.
        </span>
        <div className="w-full mt-4 overflow-x-auto">
          <DataTable
            columns={columns}
            data={records}
            source="contacts"
            actions={actions}
            loading={loading}
          />
        </div>
      </div>
    </>
  );
};

export default Jobs;
