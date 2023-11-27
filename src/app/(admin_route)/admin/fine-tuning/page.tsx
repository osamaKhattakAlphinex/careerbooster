"use client";
import { getFormattedDate } from "@/helpers/getFormattedDateTime";

import { leftArrowIcon } from "@/helpers/iconsProvider";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

import startDB from "@/lib/db";
import FineTuneModel from "@/db/schemas/FineTuningModel";

const FineTuningModels = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchRecords = async () => {
    setLoading(true);
    if (!loading) {
      axios
        .get("/api/trainBot/tuneModel", {})
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
    fetchRecords();
  }, []);

  const createFineTuningJob = async (fileId: string) => {
    axios
      .post(`/api/trainBot/tuneModel/${fileId}`, { status: "in-progress" })
      .then((res: any) => {
        if (res.data.success) {
          console.log(res.data.content);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        fetchRecords();
        setLoading(false);
      });
  };

  const getTuningJobStatus = async (jobId: string) => {
    axios
      .get(`/api/trainBot/tuneModel/tuningJobsStatus/${jobId}`)
      .then((res: any) => {
        if (res.data.success) {
          console.log(res.data.content);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        fetchRecords();
        setLoading(false);
      });
  };

  const cancelFineTuningJob = async (jobId: string) => {
    axios
      .post(`/api/trainBot/tuneModel/tuningJobs/${jobId}`, {
        status: "processed",
      })
      .then((res: any) => {
        if (res.data.success) {
          console.log(res.data.content);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        fetchRecords();
        setLoading(false);
      });
  };

  return (
    <>
      <Script type="text/javascript">
        {`
          (function(c,l,a,r,i,t,y){
          c[a]=c[a]function(){(c[a].q=c[a].q[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "jum6bniqm4");
        `}
      </Script>
      {/* Google tag (gtag.js) --> */}
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-NDN7TY5F2W"
      ></Script>
      <Script>
        {`

        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-NDN7TY5F2W');
        `}
      </Script>
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
            {/* Table */}
            <div className="">
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        S.No
                      </th>
                      {/* <th scope="col" className="px-6 py-3">
                        file Name
                      </th> */}
                      <th scope="col" className="px-6 py-3">
                        file Id
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        tuning Type
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        tuning Base Model
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        fine tuning status
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        tuning job id
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        fine Tuned Model
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
                          <td className="px-6 py-4 whitespace-nowrap">
                            {index + 1}
                          </td>
                          {/* <td className="px-6 py-4 whitespace-nowrap">
                            {rec.fileName}
                          </td> */}
                          <td className="px-6 py-4 whitespace-nowrap">
                            {rec.fileId}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {rec.tuningType}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {rec.tuningBaseModel}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {rec.status}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {rec.fineTuningJobId}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {rec.fineTunedModel}
                          </td>
                          <td className="flex gap-2 mt-2  items-center ">
                            {rec.status === "not-started" ? (
                              <button
                                className="whitespace-nowrap px-3 py-2 text-xs font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 no-underline"
                                onClick={() => createFineTuningJob(rec.fileId)}
                              >
                                {/* Start Tuning */}
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="w-6 h-6"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
                                  />
                                </svg>
                              </button>
                            ) : rec.status === "in-progress" ? (
                              <>
                                {/* <button
                                  className="whitespace-nowrap px-3 py-2 text-xs font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 no-underline"
                                  onClick={() =>
                                    cancelFineTuningJob(rec.fineTuningJobId)
                                  }
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M6 18L18 6M6 6l12 12"
                                    />
                                  </svg>
                                </button> */}

                                <button
                                  className="whitespace-nowrap px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 no-underline "
                                  onClick={() =>
                                    getTuningJobStatus(rec.fineTuningJobId)
                                  }
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                                    />
                                  </svg>
                                </button>
                              </>
                            ) : (
                              ""
                            )}
                            {/* <button
                              className="px-3 py-2 text-xs font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 no-underline"
                              onClick={() => {}}
                            >
                              Delete
                            </button> */}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FineTuningModels;
