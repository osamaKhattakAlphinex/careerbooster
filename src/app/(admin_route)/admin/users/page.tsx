"use client";
import { leftArrowIcon, refreshIconRotating } from "@/helpers/iconsProvider";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const UsersPage = () => {
  const [records, setRecords] = useState([]);
  const [loadingId, setLoadingId] = useState("");
  const [showTableLoader, setshowTableLoader] = useState(false);
  const handleChange = async (id: string, status: boolean) => {
    if (window.confirm("Are you sure to Change the status")) {
      setLoadingId(id);
      const record: any = await axios
        .put(`/api/users/${id}`, {
          status: status,
        })
        .finally(() => {
          getUserDeatils();
        });
    }
  };

  const getUserDeatils = () => {
    setshowTableLoader(true);
    fetch("/api/users")
      .then(async (resp) => {
        const res = await resp.json();
        setLoadingId("");

        if (res.success) {
          setRecords(res.result);
          setshowTableLoader(false);
        } else {
          setRecords([]);
        }
      })
      .finally(() => {
        setshowTableLoader(false);
      });
  };

  useEffect(() => {
    getUserDeatils();
  }, []);

  return (
    <>
      <div className="mx-10 pt-40">
        <div className="my-5 ml-10">
          <Link
            href="/admin"
            className="flex flex-row gap-2 items-center hover:font-semibold transition-all"
          >
            {leftArrowIcon}
            Dashboard
          </Link>
        </div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
          <div className="pb-4  dark:bg-gray-900 pt-10">
            <div className="relative mt-1 ml-auto pl-5 pb-3">
              {/* <div className="absolute inset-y-0 left-0 flex items-center ml-auto pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div> */}
              <input
                type="text"
                id="table-search"
                className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Users By First Name"
              />
            </div>
          </div>
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                {/* <th scope="col" className="px-6 py-3">
                  User ID
                </th> */}
                <th scope="col" className="px-6 py-3">
                  User Name
                </th>
                <th scope="col" className="px-6 py-3">
                  User Email
                </th>
                <th scope="col" className="px-6 py-3">
                  User Phone
                </th>
                <th scope="col" className="px-6 py-3">
                  User Country
                </th>
                <th scope="col" className="px-6 py-3">
                  User City State
                </th>
                <th scope="col" className="px-6 py-3">
                  User Role
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {showTableLoader && (
                <tr>
                  <td
                    className="text-center p-6 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                    colSpan={10}
                  >
                    Loading ...
                  </td>
                </tr>
              )}
              {records &&
                records.map((item: any) => {
                  return (
                    <>
                      <tr className=" border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        {/* <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            {item._id}
                          </th> */}
                        <td className="px-6 py-4">
                          {item.firstName + " " + item.lastName}
                        </td>
                        <td className="px-6 py-4"> {item.email} </td>
                        <td className="px-6 py-4">{item?.phone}</td>
                        <td className="px-6 py-4">{item.contact?.country}</td>
                        <td className="px-6 py-4">
                          {" "}
                          {item.contact?.cityState}{" "}
                        </td>
                        <td className="px-6 py-4">{item.role}</td>
                        <td className="px-6 py-4">
                          {loadingId === item._id ? (
                            refreshIconRotating
                          ) : (
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={item.status}
                                value=""
                                className="sr-only peer"
                                onChange={(e) =>
                                  handleChange(item._id, e.target.checked)
                                }
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                              <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                                {item?.status === true ? "Active" : "InActive"}
                              </span>
                            </label>
                          )}
                        </td>
                      </tr>
                    </>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default UsersPage;
