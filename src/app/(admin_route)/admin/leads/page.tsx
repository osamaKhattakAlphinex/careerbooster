"use client";
import DataTable, { TableAction } from "@/components/DataTable";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getFormattedDate } from "@/helpers/getFormattedDateTime";
import {
  downloadIcon,
  exterLinkIconSmall,
  leftArrowIcon,
  refreshIconRotating,
} from "@/helpers/iconsProvider";
import { createColumnHelper } from "@tanstack/react-table";
import axios from "axios";
import Link from "next/link";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { string } from "yup";

type Lead = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  recentJob: string;
  status: string;
  created: string;
  file: string;
};

const LeadsAdminPage = () => {
  const [limitOfRecords, setLimitOfRecords] = useState<number>(10);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [numberOfRecords, setNumberOfRecords] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageStart, setPageStart] = useState<number>(0);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const columnHelper = createColumnHelper<Lead>();

  const FileViewer = (rec: any) => {
    return (
      <Link
        href={`/files/linkedin-temp/${rec?.file}`}
        target="_blank"
        // href={`/admin/train-bot/${rec._id}`}
        className="flex flex-row gap-1 px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 no-underline"
      >
        Preview {exterLinkIconSmall}
      </Link>
    );
  };

  const actions: TableAction[] = [
    {
      name: "view file",
      type: "component",
      element: (rec: any) => FileViewer(rec),
      styles:
        "px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 no-underline",
      icon: "",
    },
  ];

  const columns = [
    columnHelper.accessor("name", {
      id: "name",
      header: () => "Name",
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("email", {
      id: "email",
      header: () => "Email",
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("phone", {
      id: "phone",
      header: () => "Phone",
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("location", {
      id: "location",
      header: () => "location",
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("recentJob", {
      id: "recentJob",
      header: () => "Recent Job",
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("status", {
      id: "status",
      header: () => "status",
      cell: (info) => {
        let status = info.renderValue();

        if (status === "pending") {
          return (
            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
              Pending
            </span>
          );
        } else if (status === "reviewed") {
          return (
            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
              Reviewed
            </span>
          );
        } else if (status === "trained") {
          return (
            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
              Trained
            </span>
          );
        }
      },
    }),
    columnHelper.accessor("created", {
      id: "created",
      header: () => "Created On",
      cell: (info: any) => getFormattedDate(info.renderValue()),
    }),
  ];

  const [counts, setCounts] = useState<any>(0);
  const [countLabel, setCountLabel] = useState<string>("total");

  const fetchRecords = async (startIndex: number, endIndex: number) => {
    setLoading(true);
    if (!loading) {
      axios
        .get("/api/leads", {
          params: {
            startIndex: startIndex,
            endIndex: endIndex,
          },
        })
        .then(async (res: any) => {
          if (res.data.success) {
            const result = res.data;
            setNumberOfRecords(result.totalRecords);
            setRecords(result.data);
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

  const getlinkedInToolUsersCount = async () => {
    axios.get("/api/leads/getLinkedInToolUserCount").then((res) => {
      if (res.data.success) {
        setCounts(res.data);
      }
    });
  };

  useEffect(() => {
    getlinkedInToolUsersCount();
  }, []);

  useEffect(() => {
    const existingNumberOfRecords = searchParams?.get("r");
    const existingPage = searchParams?.get("p");

    if (existingNumberOfRecords) {
      setLimitOfRecords(parseInt(existingNumberOfRecords));
    }
    if (existingPage) {
      setCurrentPage(parseInt(existingPage));
    }
  }, [searchParams?.get("r"), searchParams?.get("p")]);

  useEffect(() => {
    setRecords([]);

    const startIndex = (currentPage - 1) * limitOfRecords;
    const endIndex = startIndex + limitOfRecords;
    setPageStart(startIndex);
    fetchRecords(startIndex, endIndex);

    router.replace(pathname + `?r=${limitOfRecords}&p=${currentPage}`);
  }, [currentPage, limitOfRecords]);

  return (
    <div className="flex flex-col justify-start items-start">
      <h2 className=" text-xl dark:text-white/70 text-black/70 uppercase">
        Leads
      </h2>
      <span className="dark:text-white/70 text-black/70 text-base">
        All the leads from linkedin
      </span>
      <div className="w-full overflow-x-auto mt-4">
        <DataTable
          loading={loading}
          columns={columns}
          data={records}
          actions={actions}
          source="leads"
        />
      </div>
      <div className=" flex flex-row justify-between items-center w-full ">
        <div className="flex flex-row gap-2 items-center">
          <label htmlFor="userPerPage" className="text-sm font-medium">
            Number of records per page:
          </label>
          <select
            name="userPerPage"
            id="userPerPage"
            className="rounded-md px-2 py-1 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
            onChange={(e) => setLimitOfRecords(parseInt(e.target.value))}
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
        <div className=" flex justify-end mt-4">
          <nav aria-label="Page navigation example">
            <ul className="inline-flex -space-x-px">
              <li>
                <button
                  className="border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 ml-0 rounded-l-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage && currentPage > 1) {
                      setCurrentPage(currentPage - 1);
                    }
                  }}
                >
                  Previous
                </button>
              </li>
              {Array.from({ length: 3 }).map((_, index) => {
                if (currentPage && limitOfRecords) {
                  const pageNumber = currentPage - 1 + index;
                  if (
                    pageNumber >= 1 &&
                    pageNumber <= Math.ceil(numberOfRecords / limitOfRecords)
                  ) {
                    return (
                      <li key={pageNumber}>
                        <button
                          className={`border-gray-300 text-gray-500 leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 ${
                            currentPage === pageNumber
                              ? "bg-gray-100 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white focus:bg-gray-100 focus:text-gray-700 dark:focus:bg-gray-700 dark:focus:text-white"
                              : "hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-white"
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage(pageNumber);
                          }}
                        >
                          {pageNumber}
                        </button>
                      </li>
                    );
                  } else {
                    return null;
                  }
                }
              })}

              <li>
                <button
                  className="border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-r-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  onClick={(e) => {
                    if (currentPage) {
                      e.preventDefault();
                      setCurrentPage(currentPage + 1);
                    }
                  }}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default LeadsAdminPage;
