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
  const [currentRecord, setCurrentRecord] = useState<any>(null)
  const [deo, setDeo] = useState<any>({});
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

  const viewMessageHandler = (rec: any) => {};
  const editJobHandler = (rec: any) => {
    setCurrentRecord(rec)
    setOpen(true)
  };
<<<<<<< HEAD
  const feturedHandler = (e: any, rec: any) => {
    debugger;
    console.log(e);
=======
  const statusHandler = (rec: any, newStatus: string) => {
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
  };
  const featuredHandler = (featured: boolean, rec: any) => {
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
>>>>>>> e1f1bada11ca1a9404a6f2a9874434c105f0b4b3
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
<<<<<<< HEAD
      header: () => "Job Title",
      // cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("location", {
      id: "location",
      header: () => "Location",
      // cell: (info) => info.renderValue(),
=======
      header: () => "jobTitle",
      cell: (info: any) => info.renderValue(),
    }),
    columnHelper.accessor("location", {
      id: "location",
      header: () => "location",
      cell: (info: any) => info.renderValue(),
>>>>>>> e1f1bada11ca1a9404a6f2a9874434c105f0b4b3
    }),
    columnHelper.accessor("employer", {
      id: "employer",
      header: () => "employer",
<<<<<<< HEAD
      // cell: (info) => info.renderValue(),
=======
      cell: (info: any) => info.renderValue(),
>>>>>>> e1f1bada11ca1a9404a6f2a9874434c105f0b4b3
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
<<<<<<< HEAD
          <label
            htmlFor="featured-job"
            className="grid p-1 bg-white place-content-center"
          >
            {info.renderValue() === 1 ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#FFD700"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="white"
                className="w-6 h-6 pointer-events-none"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#FFD700"
                className="w-6 h-6 pointer-events-none"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                />
              </svg>
            )}
            <input
              className="sr-only"
              type="radio"
              id="featured-job"
              onChange={(e) => feturedHandler(e, info)}
              checked={info.renderValue() === 1 ? true : false}
            />
          </label>
=======
          <input
            type="checkbox"
            onChange={(e) =>
              featuredHandler(e.target.checked, info.cell.row.original)
            }
            checked={info.getValue() === 1}
          />
>>>>>>> e1f1bada11ca1a9404a6f2a9874434c105f0b4b3
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
      element: (rec: any) => viewMessageHandler(rec),
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
<<<<<<< HEAD
  }, [deo]);
=======
  }, [deo, open]);
>>>>>>> e1f1bada11ca1a9404a6f2a9874434c105f0b4b3

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
                setOpen(true)
              }}
              className="px-4 py-2 text-sm font-semibold text-gray-500 border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Add New Job
            </button>
          </div>
        </div>
        {open ? <JobForm setOpen={setOpen} deoId={deo._id} singleRec={currentRecord} /> : null}
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
