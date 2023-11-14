"use client";
import { leftArrowIcon, refreshIconRotating } from "@/helpers/iconsProvider";
import axios from "axios";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const UsersPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [records, setRecords] = useState([]);
  const [loadingId, setLoadingId] = useState("");
  const [limitOfUser, setLimitOfUser] = useState<number>(10);
  const [showTableLoader, setshowTableLoader] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageStart, setPageStart] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

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
    } else {
      router.push("/admin/users");
    }
  };

  const getUserDeatils = () => {
    setshowTableLoader(true);

    fetch(`/api/users?limit=${limitOfUser}&page=${currentPage}`)
      .then(async (resp) => {
        const res = await resp.json();
        setLoadingId("");

        if (res.success) {
          setRecords(res.result);
          setTotalPages(Math.ceil(res.total / limitOfUser));
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

  const selectUsersLimit = (e: any) => {
    setLimitOfUser(e.target.value);
  };
  useEffect(() => {
    getUserDeatils();
    const startIndex = (currentPage - 1) * limitOfUser;

    setPageStart(startIndex);
    router.replace(pathname + `?r=${limitOfUser}&p=${currentPage}`);
  }, [limitOfUser, currentPage]);
  useEffect(() => {
    const existingNumberOfRecords = searchParams?.get("r");
    const existingPage = searchParams?.get("p");
    if (existingNumberOfRecords) {
      setLimitOfUser(parseInt(existingNumberOfRecords, 10));
    }
    if (existingPage) {
      setCurrentPage(parseInt(existingPage, 10));
    }
  }, [searchParams?.get("r"), searchParams?.get("p")]);

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
            <div className="relative mt-1 ml-auto pl-5 pb-3 flex justify-between">
              {/* <input
                type="text"
                id="table-search"
                className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Users By First Name"
              /> */}
              <div className="flex flex-row gap-2 items-center ml-auto  pr-5">
                <label htmlFor="userPerPage" className="text-sm font-medium">
                  Number of records per page:
                </label>
                <select
                  name="userPerPage"
                  id="userPerPage"
                  className="rounded-md px-2 py-1 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
                  onChange={selectUsersLimit}
                  value={limitOfUser}
                >
                  <>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={30}>30</option>
                    <option value={40}>40</option>
                  </>
                </select>
              </div>
            </div>
          </div>

          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  S.N0
                </th>
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
              {!showTableLoader && records && records.length === 0 && (
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
                records.map((item: any, index: number) => {
                  return (
                    <>
                      <tr className=" border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {pageStart + index + 1}
                        </th>
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
        {/* Pagination Controls */}
        <div className=" flex justify-end mt-4">
          <nav aria-label="Page navigation example">
            <ul className="inline-flex -space-x-px">
              <li>
                <button
                  className={` border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 ml-0 rounded-l-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                  onClick={() => {
                    setCurrentPage(currentPage - 1);
                  }}
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
                      onClick={(e) => setCurrentPage(number)}
                      className={`border-gray-300  leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400  text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white focus:bg-gray-100 focus:text-gray-700 dark:focus:bg-gray-700 dark:focus:text-white hover:text-gray-700 first-letter
                      ${
                        currentPage === number
                          ? "bg-gray-400  dark:!bg-white dark:text-black"
                          : ""
                      } `}
                    >
                      {number}
                    </button>
                  </li>
                );
              })}

              <li>
                <button
                  className="border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-r-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  onClick={() => {
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
    </>
  );
};

export default UsersPage;
