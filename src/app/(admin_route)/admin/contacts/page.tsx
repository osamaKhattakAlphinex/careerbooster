"use client";

import MessageViewer from "@/components/admin/messageViewer";
import { leftArrowIcon } from "@/helpers/iconsProvider";
import axios from "axios";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const Contacts = () => {
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

  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <>
      <MessageViewer ref={messageViewerRef} message={message} />
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
                      <th scope="col" className="px-6 py-3">
                        Sender Name
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        Sender email
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        Sender phone
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        Sender message
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
                          <td className="px-6 py-4 whitespace-nowrap">
                            {rec.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {rec.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {rec.phone}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap max-w-md">
                            <span className="block w-full truncate">
                              {rec.message}
                            </span>
                          </td>
                          <td className="flex gap-2 mt-2  items-center ">
                            <button
                              className="whitespace-nowrap px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 no-underline "
                              onClick={() => {
                                if (messageViewerRef.current) {
                                  setMessage(rec.message);
                                  messageViewerRef.current.openModal(true);
                                }
                              }}
                            >
                              View Message
                            </button>
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

export default Contacts;
