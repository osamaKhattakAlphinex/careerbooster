"use client";

import DataTable, {
  BulkDataOperation,
  TableAction,
} from "@/components/admin/DataTable";
import JobForm from "@/components/deo/JobForm";
import { getFormattedDate } from "@/helpers/getFormattedDateTime";
import {
  EditIcon,
  deleteIcon,
  eyeIcon,
  trashIcon,
  userGroup,
} from "@/helpers/iconsProvider";
import { RootState } from "@/store/store";

import { createColumnHelper } from "@tanstack/react-table";
import axios from "axios";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ApplicantProfiles from "./ApplicantProfiles";

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

const JobPortal = () => {
  const userData = useSelector((state: RootState) => state.userData);
  const [records, setRecords] = useState<[] | any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [currentRecord, setCurrentRecord] = useState<any>(null);
  const [limitOfRecords, setLimitOfRecords] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [applicantProfiles, setApplicantProfiles] = useState([]);
  const [showProfiles, setShowProfiles] = useState<boolean>(false);
  const [deo, setDeo] = useState<any>({});
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (userData.isFetched) {
      setDeo(userData);
    }
  }, [userData]);
  const fetchRecords = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `/api/deo?deoId=${deo._id}&limit=${limitOfRecords}&page=${currentPage}`
      );
      if (res.data.success) {
        setRecords(res.data.data);

        setTotalPages(Math.ceil(res.data.total / limitOfRecords));
        setLoading(false);
      } else {
        setRecords([]);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
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

    columnHelper.accessor("noOfProposals", {
      id: "noOfProposals",

      header: () => "No of Proposals",
      cell: (info) => info.renderValue(),
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
      element: (rec: any) => {
        router.push(`/ai-job-board/${rec._id}`);
      },
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
    {
      name: "Show Profiles",
      type: "handler",
      element: (rec: any) => showApplicantProfiles(rec.applicationProfiles),
      styles: `whitespace-nowrap px-3 py-2 text-xs font-medium text-center text-white bg-yellow-700 rounded-lg hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800 no-underline ${
        deo.role === "employer" ? "" : "hidden"
      }`,
      icon: userGroup,
    },
  ];
  const selectUsersLimit = (e: any) => {
    setCurrentPage(1);
    setLimitOfRecords(e.target.value);
  };

  const showApplicantProfiles = (records) => {
    setShowProfiles(true);
    setApplicantProfiles(records);
  };

  useEffect(() => {
    if (deo._id) {
      fetchRecords();
    }
  }, [deo, open]);

  useEffect(() => {
    setRecords([]);
    if (deo._id) {
      fetchRecords();
    }
    router.replace(pathname + `?r=${limitOfRecords}&p=${currentPage}`);
  }, [limitOfRecords, currentPage]);
  useEffect(() => {
    const existingNumberOfRecords = searchParams?.get("r");
    const existingPage = searchParams?.get("p");
    if (existingNumberOfRecords) {
      setLimitOfRecords(parseInt(existingNumberOfRecords, 10));
    }
    if (existingPage) {
      setCurrentPage(parseInt(existingPage, 10));
    }
  }, [searchParams?.get("r"), searchParams?.get("p")]);

  const bulkDataOperations: BulkDataOperation = {
    operations: [
      {
        name: "Delete All",
        type: "handler",
        element: (ids: string[] | []) => handleDeleteAll(ids),
        styles:
          "whitespace-nowrap px-3 py-2 text-xs font-medium text-center text-white bg-rose-700 rounded-lg hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-rose-300 dark:bg-rose-600 dark:hover:bg-rose-700 dark:focus:ring-rose-800 no-underline",
        icon: deleteIcon,
      },
    ],
  };

  const handleDeleteAll = async (ids: string[] | [] = []) => {
    setLoading(true);

    axios
      .post("/api/deo/bulkDelete", { dataSelection: ids })
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
          <div className="flex flex-col justify-end gap-6">
            <button
              onClick={() => {
                setCurrentRecord(null);
                setOpen(true);
              }}
              className="px-4 py-2 ml-auto text-sm font-semibold text-gray-500 border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white w-fit"
            >
              Add New Job
            </button>
            <div className="flex flex-row items-center gap-2">
              <label htmlFor="userPerPage" className="text-sm font-medium">
                Number of records per page:
              </label>
              <select
                name="userPerPage"
                id="userPerPage"
                className="rounded-md px-2 py-1 border-[1px] border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
                onChange={selectUsersLimit}
                value={limitOfRecords}
              >
                <>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={30}>30</option>
                  <option value={40}>40</option>
                  <option value={100}>100</option>
                  <option value={500}>500</option>
                </>
              </select>
            </div>
          </div>
        </div>
        {showProfiles && <ApplicantProfiles profiles={applicantProfiles} setShowProfiles={setShowProfiles} />}
        {open ? (
          <JobForm
            setOpen={setOpen}
            deoId={deo._id}
            role={deo.role}
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
              enableRowSelection={true}
              bulkDataOperations={bulkDataOperations}
            />
          ) : (
            "No records found"
          )}
        </div>
        <div className="flex flex-row items-center justify-end w-full ">
          <div className="flex justify-end mt-4 ">
            <nav aria-label="Page navigation example">
              <ul className="inline-flex -space-x-px">
                <li>
                  <button
                    className={` border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 ml-0 rounded-l-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:hover:text-gray-500 disabled:hover:dark:bg-gray-800 disabled:hover:dark:text-gray-400`}
                    onClick={() => {
                      setRecords([]);
                      setCurrentPage(currentPage - 1);
                    }}
                    disabled={currentPage == 1 ? true : false}
                  >
                    Previous
                  </button>
                </li>
                {[currentPage - 1, currentPage, currentPage + 1].map(
                  (number) => {
                    if (number < 1 || number > totalPages) return null;
                    return (
                      <li key={number}>
                        <button
                          onClick={(e) => {
                            setRecords([]);
                            setCurrentPage(number);
                          }}
                          className={`border-gray-300 text-gray-500 leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 ${
                            currentPage === number
                              ? "bg-gray-100 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white focus:bg-gray-100 focus:text-gray-700 dark:focus:bg-gray-700 dark:focus:text-white"
                              : "hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-white"
                          }`}
                        >
                          {number}
                        </button>
                      </li>
                    );
                  }
                )}

                <li>
                  <button
                    onClick={() => {
                      setRecords([]);
                      setCurrentPage(currentPage + 1);
                    }}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-2 leading-tight text-gray-500 border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:hover:text-gray-500 disabled:hover:dark:bg-gray-800 disabled:hover:dark:text-gray-400`}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobPortal;
