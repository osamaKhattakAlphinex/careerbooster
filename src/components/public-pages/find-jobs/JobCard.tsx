"use client";
import { eyeIcon, refreshBigIconRotating } from "@/helpers/iconsProvider";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import SinglejobCard from "./SingleJobCard";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function JobCard({
  query,
  locationQuery,
}: {
  query: string;
  locationQuery: any;
}) {
  console.log(locationQuery);
  const [loading, setLoading] = useState(false);
  const [limitOfRecords, setLimitOfRecords] = useState(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [records, setRecords] = useState<[] | any>([]);
  const [showTableLoader, setshowTableLoader] = useState(false);
  const [loadingId, setLoadingId] = useState("");
  const [pageStart, setPageStart] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const fetchRecords = async (query?: string, locationQuery?: any) => {
    setLoading(true);
    setshowTableLoader(true);
    if (!loading) {
      axios
        .get(
          `/api/deo?jobs=featured&query=${query}&location=${locationQuery}&limit=${limitOfRecords}&page=${currentPage}`
        )
        .then((res: any) => {
          setLoadingId("");
          if (res.data.success) {
            setRecords(res.data.data);
            setTotalPages(Math.ceil(res.data.total / limitOfRecords));
            setshowTableLoader(false);
            setLoading(false);
          } else {
            setRecords([]);
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
          setshowTableLoader(false);
        });
    }
  };
  useEffect(() => {
    fetchRecords(query, locationQuery);
  }, []);

  useEffect(() => {
    setRecords([]);
    fetchRecords(query, locationQuery);
    const startIndex = (currentPage - 1) * limitOfRecords;

    setPageStart(startIndex);
    router.replace(pathname + `?r=${limitOfRecords}&p=${currentPage}`);
  }, [limitOfRecords, currentPage, query, locationQuery]);
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

  const handleChange = (e: any) => {
    setLimitOfRecords(e.target.value);
    setCurrentPage(1);
  };

  return (
    <>
      {records.length > 0 && (
        <div className="md:flex md:flex-row xs:flex-col items-center justify-between   md:mx-14 xs:mx-4">
          <div className="md:flex md:flex-row xs:flex-col items-center gap-2">
            <label htmlFor="userPerPage" className="text-sm font-medium">
              Number of records per page:
            </label>
            <select
              name="userPerPage"
              id="userPerPage"
              className="rounded-md px-2 py-1 border-[1px] border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
              onChange={handleChange}
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
          <div className="md:flex xs:hidden md:justify-end mt-4 ">
            <nav aria-label="Page navigation example">
              <ul className="inline-flex -space-x-px">
                <li>
                  <button
                    className={` border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 ml-0 rounded-l-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:hover:text-gray-500 disabled:hover:dark:bg-gray-800 disabled:hover:dark:text-gray-400`}
                    onClick={() => {
                      setRecords([]);
                      setCurrentPage(currentPage - 1);
                    }}
                    defaultValue={searchParams.get("r")?.toString()}
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
                    className="px-3 py-2 leading-tight text-gray-500 border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:hover:text-gray-500 disabled:hover:dark:bg-gray-800 disabled:hover:dark:text-gray-400"
                    onClick={() => {
                      setRecords([]);
                      setCurrentPage(currentPage + 1);
                    }}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
      {loading && (
        <div className="text-gary-100 text-lg flex justify-center items-center">
          {refreshBigIconRotating}
        </div>
      )}

      {records.length > 0
        ? records.map((items: any) => {
            return (
              <SinglejobCard
                jobTitle={items.jobTitle}
                location={items.location}
                employer={items.employer}
                jobDescription={items.jobDescription}
                applyJobLink={items.link}
                jobId={items._id}
                key={items._id}
              />
            );
          })
        : ""}
      {records.length > 0 && (
        <div className="flex justify-end mt-4 md:mx-14 xs:mx-4">
          <nav aria-label="Page navigation example">
            <ul className="inline-flex -space-x-px">
              <li>
                <button
                  className={` border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 ml-0 rounded-l-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:hover:text-gray-500 disabled:hover:dark:bg-gray-800 disabled:hover:dark:text-gray-400`}
                  onClick={() => {
                    setRecords([]);
                    setCurrentPage(currentPage - 1);
                  }}
                  defaultValue={searchParams.get("r")?.toString()}
                  disabled={currentPage == 1 ? true : false}
                >
                  Previous
                </button>
              </li>
              {[currentPage - 1, currentPage, currentPage + 1].map((number) => {
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
              })}

              <li>
                <button
                  className="px-3 py-2 leading-tight text-gray-500 border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:hover:text-gray-500 disabled:hover:dark:bg-gray-800 disabled:hover:dark:text-gray-400"
                  onClick={() => {
                    setRecords([]);
                    setCurrentPage(currentPage + 1);
                  }}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}
