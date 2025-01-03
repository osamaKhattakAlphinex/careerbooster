"use client";
import DataTable, { TableAction } from "@/components/admin/DataTable";
import { useAppContext } from "@/context/AppContext";
import { getFormattedDate } from "@/helpers/getFormattedDateTime";
import { exterLinkIconSmall } from "@/helpers/iconsProvider";
import { createColumnHelper } from "@tanstack/react-table";
import axios from "axios";
import Link from "next/link";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { abortController, setAbortController } = useAppContext();

  const columnHelper = createColumnHelper<Lead>();

  const actions: TableAction[] = [];

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
            <span className="inline-flex px-2 text-xs font-semibold leading-5 text-yellow-800 bg-yellow-100 rounded-full">
              Pending
            </span>
          );
        } else if (status === "reviewed") {
          return (
            <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
              Reviewed
            </span>
          );
        } else if (status === "trained") {
          return (
            <span className="inline-flex px-2 text-xs font-semibold leading-5 text-blue-800 bg-blue-100 rounded-full">
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


  const fetchRecords = async (startIndex: number, endIndex: number) => {
    setLoading(true);
    try {
      const response = await axios.get("/api/leads", {
        params: {
          startIndex: startIndex,
          endIndex: endIndex,
        },
        signal: abortController?.signal,
      });
      if (response.data.success) {
        setNumberOfRecords(response.data.totalRecords);
        setRecords(response.data.result);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

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
    fetchRecords(startIndex, endIndex);

    router.replace(pathname + `?r=${limitOfRecords}&p=${currentPage}`);

    return () => {
      abortController?.abort();
      setAbortController(new AbortController());
    };
  }, [currentPage, limitOfRecords]);

  return (
    <div className="flex flex-col items-start justify-start">
      <h2 className="text-xl uppercase dark:text-white/70 text-black/70">
        Leads
      </h2>
      <span className="text-base dark:text-white/70 text-black/70">
        All the leads from linkedin
      </span>
      <div className="w-full mt-4 overflow-x-auto">
        <DataTable
          loading={loading}
          columns={columns}
          data={records}
          actions={actions}
          source="leads"
        />
      </div>
      <div className="flex flex-row items-center justify-between w-full ">
        <div className="flex flex-row items-center gap-2">
          <label htmlFor="userPerPage" className="text-sm font-medium">
            Number of records per page:
          </label>
          <select
            name="userPerPage"
            id="userPerPage"
            className="rounded-md px-2 py-1 border-[1px] border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
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
        <div className="flex justify-end mt-4 ">
          <nav aria-label="Page navigation example">
            <ul className="inline-flex -space-x-px">
              <li>
                <button
                  className="px-3 py-2 ml-0 leading-tight text-gray-500 border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
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
                  className="px-3 py-2 leading-tight text-gray-500 border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
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
