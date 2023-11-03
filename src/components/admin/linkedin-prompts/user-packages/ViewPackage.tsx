"use client";

import { leftArrowIcon } from "@/helpers/iconsProvider";
import Link from "next/link";
import React from "react";
import AddPackage from "./AddPackage";
import UpdatePackage from "./UpdatePackage";
import ReadPackage from "./ReadPackage";
// import { Link } from 'react-router-dom'; // Import Link from React Router if you're using it
// import AddProduct from './AddProduct'; // Import the AddProduct component

const ViewPackage = ({}) => {
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
          <div className="w-100 flex flex-row justify-between">
            <h2 className="text-xl ">User Packages Management</h2>
            {/* Add Button*/}
            <AddPackage />
          </div>

          {/* Table */}
          <div className="">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="pt-10 border-collapse w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-[16px] text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-4 py-4">
                      Title
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Package Name
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Category
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Resume Generation
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-4 py-3 text-center">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className=" bg-gray-100 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th
                      scope="row"
                      className="px-4 py-3 font-medium whitespace-nowrap"
                    >
                      Apple iMac 27&#34;
                    </th>
                    <td className="px-4 py-3">PC</td>
                    <td className="px-4 py-3">Apple</td>
                    <td className="px-4 py-3 max-w-[12rem] truncate">
                      What is a product description? A product description
                      describes a product.
                    </td>
                    <td className="px-4 py-3">$2999</td>
                    <td className="px-4 py-3 flex items-center justify-end">
                      <ul
                        className="py-1 text-sm flex"
                        aria-labelledby="apple-imac-27-dropdown-button"
                      >
                        <li>
                          <UpdatePackage />
                        </li>
                        <li>
                          <ReadPackage />
                        </li>
                        <li>
                          <button
                            type="button"
                            data-modal-target="deleteModal"
                            data-modal-toggle="deleteModal"
                            className="flex w-full items-center py-2 pr-2 hover:text-[#e6f85e]"
                          >
                            <svg
                              className="w-4 h-4 mr-2"
                              viewBox="0 0 14 15"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              aria-hidden="true"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-4 h-4 mx-3"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                />
                              </svg>
                            </svg>
                            Delete
                          </button>
                        </li>
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    // <div>
    //   <div className="my-5 ml-10">
    //     <Link
    //       href="/admin"
    //       className="flex flex-row gap-2 items-center hover:font-semibold transition-all"
    //     >
    //       {leftArrowIcon}
    //       Dashboard
    //     </Link>
    //   </div>
    //   <div className="flex m-10 gap-4">
    //     <div className="w-full flex p-4 border border-gray-200 rounded-lg shadow sm:p-6">
    //       <h2 className="text-2xl">
    //         <div className="flex flex-row gap-2">
    //           <svg
    //             xmlns="http://www.w3.org/2000/svg"
    //             fill="none"
    //             viewBox="0 0 24 24"
    //             strokeWidth="1.5"
    //             stroke="currentColor"
    //             className="w-6 h-6"
    //           >
    //             {/* Your icon SVG path */}
    //           </svg>

    //           <span className="text-semibold">User Packages Management</span>

    //         </div>
    //       </h2>
    //          <AddPackage />
    //     </div>
    //   </div>

    //   {/* <!-- Start block --> */}
    //   <section className="dark:bg-gray-900 p-3 sm:p-5 antialiased">
    //     <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
    //       <div className="dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
    //         <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
    //           {/*  <AddPackage />*/}
    //         </div>
    //         <div className="overflow-x-auto">
    // <table className="pt-10 border-collapse w-full text-sm text-left text-gray-500 dark:text-gray-400">
    //   <thead className="text-[16px] text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
    //     <tr>
    //       <th scope="col" className="px-4 py-4">
    //         Title
    //       </th>
    //       <th scope="col" className="px-4 py-3">
    //         Package Name
    //       </th>
    //       <th scope="col" className="px-4 py-3">
    //         Category
    //       </th>
    //       <th scope="col" className="px-4 py-3">
    //         Resume Generation
    //       </th>
    //       <th scope="col" className="px-4 py-3">
    //         Price
    //       </th>
    //       <th scope="col" className="px-4 py-3 text-center">
    //         Actions
    //       </th>
    //     </tr>
    //   </thead>
    //   <tbody>
    //     <tr className=" bg-gray-100 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
    //       <th
    //         scope="row"
    //         className="px-4 py-3 font-medium whitespace-nowrap"
    //       >
    //         Apple iMac 27&#34;
    //       </th>
    //       <td className="px-4 py-3">PC</td>
    //       <td className="px-4 py-3">Apple</td>
    //       <td className="px-4 py-3 max-w-[12rem] truncate">
    //         What is a product description? A product description
    //         describes a product.
    //       </td>
    //       <td className="px-4 py-3">$2999</td>
    //       <td className="px-4 py-3 flex items-center justify-end">
    //         <ul
    //           className="py-1 text-sm flex"
    //           aria-labelledby="apple-imac-27-dropdown-button"
    //         >
    //           <li>
    //             <UpdatePackage />
    //           </li>
    //           <li>
    //             <ReadPackage />
    //           </li>
    //           <li>
    //             <button
    //               type="button"
    //               data-modal-target="deleteModal"
    //               data-modal-toggle="deleteModal"
    //               className="flex w-full items-center py-2 pr-2 hover:text-[#e6f85e]"
    //             >
    //               <svg
    //                 className="w-4 h-4 mr-2"
    //                 viewBox="0 0 14 15"
    //                 fill="none"
    //                 xmlns="http://www.w3.org/2000/svg"
    //                 aria-hidden="true"
    //               >
    //                 <svg
    //                   xmlns="http://www.w3.org/2000/svg"
    //                   fill="none"
    //                   viewBox="0 0 24 24"
    //                   strokeWidth="1.5"
    //                   stroke="currentColor"
    //                   className="w-4 h-4 mx-3"
    //                 >
    //                   <path
    //                     strokeLinecap="round"
    //                     strokeLinejoin="round"
    //                     d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
    //                   />
    //                 </svg>
    //               </svg>
    //               Delete
    //             </button>
    //           </li>
    //         </ul>
    //       </td>
    //     </tr>
    //   </tbody>
    // </table>
    //         </div>
    //         {/* Pagination */}
    //         {/* <nav
    //           className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
    //           aria-label="Table navigation"
    //         >
    //           <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
    //             Showing
    //             <span className="font-semibold text-gray-900 dark:text-white">
    //               1-10
    //             </span>
    //             of
    //             <span className="font-semibold text-gray-900 dark:text-white">
    //               1000
    //             </span>
    //           </span>
    //           <ul className="inline-flex items-stretch -space-x-px">
    //             <li>
    //               <a
    //                 href="#"
    //                 className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
    //               >
    //                 <span className="sr-only">Previous</span>
    //                 <svg
    //                   className="w-5 h-5"
    //                   aria-hidden="true"
    //                   fill="currentColor"
    //                   viewBox="0 0 20 20"
    //                   xmlns="http://www.w3.org/2000/svg"
    //                 >
    //                   <path
    //                     fill-rule="evenodd"
    //                     d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
    //                     clip-rule="evenodd"
    //                   />
    //                 </svg>
    //               </a>
    //             </li>
    //             <li>
    //               <a
    //                 href="#"
    //                 className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
    //               >
    //                 1
    //               </a>
    //             </li>
    //             <li>
    //               <a
    //                 href="#"
    //                 className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
    //               >
    //                 2
    //               </a>
    //             </li>
    //             <li>
    //               <a
    //                 href="#"
    //                 aria-current="page"
    //                 className="flex items-center justify-center text-sm z-10 py-2 px-3 leading-tight text-primary-600 bg-primary-50 border border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
    //               >
    //                 3
    //               </a>
    //             </li>
    //             <li>
    //               <a
    //                 href="#"
    //                 className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
    //               >
    //                 ...
    //               </a>
    //             </li>
    //             <li>
    //               <a
    //                 href="#"
    //                 className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
    //               >
    //                 100
    //               </a>
    //             </li>
    //             <li>
    //               <a
    //                 href="#"
    //                 className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
    //               >
    //                 <span className="sr-only">Next</span>
    //                 <svg
    //                   className="w-5 h-5"
    //                   aria-hidden="true"
    //                   fill="currentColor"
    //                   viewBox="0 0 20 20"
    //                   xmlns="http://www.w3.org/2000/svg"
    //                 >
    //                   <path
    //                     fill-rule="evenodd"
    //                     d="M7.293 14.707a1 1 0 010 1.414L10.586 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
    //                     clip-rule="evenodd"
    //                   />
    //                 </svg>
    //               </a>
    //             </li>
    //           </ul>
    //         </nav> */}
    //       </div>
    //     </div>
    //   </section>
    // </div>
  );
};

export default ViewPackage;
