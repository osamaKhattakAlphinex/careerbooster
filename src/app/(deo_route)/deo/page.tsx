"use client";

import DataTable, { TableAction } from "@/components/admin/DataTable";
import MessageViewer from "@/components/admin/messageViewer";
import JobForm from "@/components/deo/JobForm";
import { formatDate, getFormattedDate } from "@/helpers/getFormattedDateTime";
import {
  EditIcon,
  eyeIcon,
  pencilIcon,
  trashIcon,
} from "@/helpers/iconsProvider";

import { createColumnHelper } from "@tanstack/react-table";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

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
  createdAt: string;
};

const Jobs = () => {
  const [records, setRecords] = useState<[] | any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [currentRecord, setCurrentRecord] = useState<any>(null);
  const [deo, setDeo] = useState<any>({});
  const router = useRouter()
  const { data: session } = useSession();

  const getUserDataIfNotExists = async () => {
    try {
      // Fetch userdata if not exists in Redux
      const res = await fetch(
        `/api/users/getOneByEmail?email=${session?.user?.email}`
      );
      const response = await res.json();
      const user = response.result;
      setDeo(user);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchRecords = async () => {
    setLoading(true);
    if (!loading) {
      axios
        .get(`/api/deo?deoId=${deo._id}`)
        .then((res: any) => {
          if (res.data.success) {
            setRecords(res.data.data);
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

  const editJobHandler = (rec: any) => {
    setCurrentRecord(rec);
    setOpen(true);
  };
  const statusHandler = (rec: any, newStatus: string) => {
    const c = window.confirm(
      "Do you want to change the status to " + newStatus
    );

    if (c) {
      axios
        .put(`/api/deo?jobId=${rec._id}`, {
          status: newStatus,
        })
        .then((res: any) => {
          if (res.data.success) {
            fetchRecords();
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
  const featuredHandler = (featured: boolean, rec: any) => {
    const c = window.confirm(
      "Do you want to change the featured status to " +
        (featured ? "Yes" : "No")
    );

    if (c) {
      axios
        .put(`/api/deo?jobId=${rec._id}`, {
          featured: featured ? 1 : 0,
        })
        .then((res: any) => {
          if (res.data.success) {
            fetchRecords();
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

  const deleteJobHandler = (rec: any) => {
    if (window.confirm("Are you sure to Delete this job ?")) {
      axios
        .delete(`/api/deo?jobId=${rec._id}`)
        .then((res: any) => {
          if (res.data.success) {
            console.log("deleted");
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          fetchRecords();
        });
    }
  };
  const columnHelper = createColumnHelper<Job>();

  const columns = [
    columnHelper.accessor("jobTitle", {
      id: "jobTitle",
      header: () => "jobTitle",
      cell: (info: any) => info.renderValue(),
    }),
    columnHelper.accessor("location", {
      id: "location",
      header: () => "location",
      cell: (info: any) => info.renderValue(),
    }),
    columnHelper.accessor("employer", {
      id: "employer",
      header: () => "employer",
      cell: (info: any) => info.renderValue(),
    }),

    columnHelper.accessor("link", {
      id: "link",
      header: () => "link",
      cell: (info: any) => {
        if (info.renderValue()) {
          return (
            <Link
              href={info.renderValue()}
              className="text-blue-400"
              target="_blank"
            >
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

    columnHelper.accessor("status", {
      id: "status",
      header: () => "status",
      cell: (info) => {
        return (
          <select
            className="p-1 bg-transparent border rounded-md"
            value={info.getValue()}
            onChange={(e) => {
              e.preventDefault();
              statusHandler(info.cell.row.original, e.target.value);
            }}
          >
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="started">Started</option>
            <option value="rejected">Rejected</option>
            <option value="completed">Completed</option>
          </select>
        );
      },
    }),

    columnHelper.accessor("featured", {
      id: "featured",
      header: () => "featured",
      cell: (info) => {
        return (
          <input
            type="checkbox"
            onChange={(e) =>
              featuredHandler(e.target.checked, info.cell.row.original)
            }
            checked={info.getValue() === 1}
          />
        );
      },
    }),

    columnHelper.accessor("createdAt", {
      id: "createdAt",
      header: () => "Created At",
      cell: (info) => getFormattedDate(info.renderValue()),
    }),
  ];

  const actions: TableAction[] = [
    {
      name: "Edit",
      type: "handler",
      element: (rec: any) => editJobHandler(rec),
      styles:
        "whitespace-nowrap px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 no-underline",
      icon: EditIcon,
    },
    {
      name: "Preview",
      type: "handler",
      element: (rec:any) => {router.push(`/find-jobs/${rec._id}`)},
      styles:
        "whitespace-nowrap px-3 py-2 text-xs font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 no-underline",
      icon: eyeIcon,
    },
    {
      name: "Delete",
      type: "handler",
      element: (rec: any) => deleteJobHandler(rec),
      styles:
        "whitespace-nowrap px-3 py-2 text-xs font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 no-underline",
      icon: trashIcon,
    },
  ];

  useEffect(() => {
    if (session?.user?.email) {
      getUserDataIfNotExists();
    }
  }, [session]);
  useEffect(() => {
    fetchRecords();
  }, [deo, open]);

  return (
    <>
      <div className="flex flex-col items-start justify-start">
        <div className="flex flex-row items-end justify-between w-full">
          <div className="flex-1">
            <h2 className="text-xl uppercase dark:text-white/70 text-black/70">
              {`${deo.firstName} ${deo.lastName}`}
            </h2>
            <span className="text-base dark:text-white/70 text-black/70">
              List of jobs created by {`${deo.firstName} ${deo.lastName}`}.
            </span>
          </div>
          <div>
            <button
              onClick={() => {
                setCurrentRecord(null);
                setOpen(true);
              }}
              className="px-4 py-2 text-sm font-semibold text-gray-500 border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Add New Job
            </button>
          </div>
        </div>
        {open ? (
          <JobForm
            setOpen={setOpen}
            deoId={deo._id}
            singleRec={currentRecord}
          />
        ) : null}
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
