"use client";
import { getFormattedDate } from "@/helpers/getFormattedDateTime";
import {
  downloadIcon,
  leftArrowIcon,
  refreshIconRotating,
} from "@/helpers/iconsProvider";
import axios from "axios";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";

const LeadsAdminPage = () => {
  const [limitOfRecords, setLimitOfRecords] = useState<number>(10);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageStart, setPageStart] = useState<number>(0);
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
        .then((res: any) => {
          if (res.data.success) {
            const result = res.data;
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

  useEffect(() => {
    setRecords([]);
    const startIndex = (currentPage - 1) * limitOfRecords;
    const endIndex = startIndex + limitOfRecords;
    setPageStart(startIndex);
    fetchRecords(startIndex, endIndex);
  }, [currentPage, limitOfRecords]);

  return (
    <div className="pt-30">
      <div className="my-5 ml-10">
        <Link
          href="/admin"
          className="flex flex-row gap-2 items-center hover:font-semibold transition-all"
        >
          {leftArrowIcon}
          Dashboard
        </Link>
      </div>
      <div className="flex flex-col gap-2 items-center justify-center">
        <div className=" p-8 flex flex-col gap-2 border w-11/12">
          <div className="flex justify-between">
            <h2 className="text-xl ">Leads</h2>

            {/* Dropdown */}
            <div className="flex flex-row gap-2 items-center float-right">
              <label htmlFor="status" className="text-sm font-medium">
                Number of records per page:
              </label>
              <select
                name="status"
                id="status"
                className="rounded-md px-2 py-1 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
                onChange={(e) =>
                  setLimitOfRecords(parseInt(e.target.value, 10))
                }
                value={limitOfRecords}
              >
                <>
                  <option value={10}>10</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                  <option value={500}>500</option>
                </>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      S.No
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Phone
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Location
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Recent Job
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>
                    {/* <th scope="col" className="px-6 py-3">
                      Send to CRM
                    </th> */}
                    <th scope="col" className="px-6 py-3">
                      Creation Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading && (
                    <tr>
                      <td
                        className="text-center p-6 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                        colSpan={10}
                      >
                        Loading ...
                      </td>
                    </tr>
                  )}
                  {!loading && records && records.length === 0 && (
                    <tr>
                      <td
                        className="text-center p-6 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                        colSpan={10}
                      >
                        No records found
                      </td>
                    </tr>
                  )}
                  {records &&
                    records.map((rec: any, index: number) => (
                      <tr
                        key={rec._id}
                        className="bg-gray-100 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      >
                        <td className="px-6 py-4">{pageStart + index + 1}</td>
                        <td className="px-6 py-4">{rec?.name}</td>
                        <td className="px-6 py-4">{rec?.email}</td>
                        <td className="px-6 py-4">{rec?.phone}</td>
                        <td className="px-6 py-4">{rec?.location}</td>
                        <td className="px-6 py-4">{rec?.recentJob}</td>
                        <td className="px-6 py-4">
                          {rec?.status === "pending" && (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                              Pending
                            </span>
                          )}
                          {rec?.status === "reviewed" && (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Reviewed
                            </span>
                          )}
                          {rec?.status === "trained" && (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                              Trained
                            </span>
                          )}
                        </td>
                        {/* <td className="px-6 py-4">{rec?.sendtoCRM}</td> */}
                        <td className="px-6 py-4">
                          {getFormattedDate(rec?.createdAt)}
                        </td>
                        <td className="flex gap-2 mt-2  items-center ">
                          <Link
                            href={`/files/linkedin-temp/${rec?.file}`}
                            target="_blank"
                            // href={`/admin/train-bot/${rec._id}`}
                            className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 no-underline"
                          >
                            Preview
                          </Link>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className=" flex justify-end mt-4">
              <nav aria-label="Page navigation example">
                <ul className="inline-flex -space-x-px">
                  <li>
                    <button
                      className="border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 ml-0 rounded-l-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage > 1) {
                          setCurrentPage(currentPage - 1);
                        }
                      }}
                    >
                      Previous
                    </button>
                  </li>
                  {Array.from({ length: 3 }).map((_, index) => {
                    const pageNumber = currentPage - 1 + index;
                    if (pageNumber >= 1) {
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
                  })}

                  <li>
                    <button
                      className="border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-r-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(currentPage + 1);
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
      </div>
    </div>
  );
};

export default LeadsAdminPage;
