"use client";
import DataTable, { TableAction } from "@/components/admin/DataTable";
import AddNotification from "@/components/admin/notifications/AddNotification";
import DeleteNotification from "@/components/admin/notifications/DeleteNotification";
import ReadNotification from "@/components/admin/notifications/ReadNotification";
import UpdateNotification from "@/components/admin/notifications/UpdateNotification";
import { getFormattedDate } from "@/helpers/getFormattedDateTime";
import { leftArrowIcon } from "@/helpers/iconsProvider";
import { createColumnHelper } from "@tanstack/react-table";
import { fetchData } from "next-auth/client/_utils";
import Link from "next/link";
import { title } from "process";
import { useEffect, useState } from "react";

type Notification = {
  _id: string;
  sender: string;
  title: string;
  message: string;
  createdAt: string;
};

export default function NotificationsPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [selectedNotificationId, setSelectedNotificationId] = useState<string|null>(null);
  const [data, setData] = useState([]);

  const [formData, setFormData] = useState({
    sender: "",
    title: "",
    message: "",
  });

  // Function to fetch data from an API
  const fetchData = () => {
    setLoading(true);

    if (!loading) {
      let response;
      fetch("/api/notifications") // Replace with your API endpoint
        .then((res) => {
          response = res;
          if (!response.ok) {
            console.error("Network response was not ok");
          } else {
            return response.json();
          }
        })
        .then((result) => {
          if (result) {
            setData(result.result);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  // const columnHelper = createColumnHelper<Notification>();

  // const columns = [
  //   columnHelper.accessor("sender", {
  //     id: "sender",
  //     header: () => "Sender Name",
  //     cell: (info) => info.renderValue(),
  //   }),
  //   columnHelper.accessor("title", {
  //     id: "title",
  //     header: () => "Message Subject",
  //     cell: (info) => info.renderValue(),
  //   }),
  //   columnHelper.accessor("message", {
  //     id: "message",
  //     header: () => "Message",
  //     cell: (info) => info.renderValue(),
  //   }),
  // ];

  // const actions: TableAction[] = [
  //   {
  //     name: "view",
  //     type: "component",
  //     element: (notificationid: string) => (
  //       <UpdateNotification notificationid={notificationid} />
  //     ),
  //     styles:
  //       "whitespace-nowrap px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 no-underline",
  //     icon: "",
  //     props: {
  //       onClick: () => {
  //         setSelectedNotificationId(null);
  //       },

  //       setSelectedNotificationId,
  //       fetchData,
  //     },
  //   },
  // ];

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <section className=" mb-10">
        {/* <DataTable
          actions={actions}
          data={data}
          source="notifications"
          loading={loading}
          columns={columns}
        /> */}

        <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
          {/* <!-- Start coding here --> */}
          <div className="flex flex-row ml-auto">
            <button
              onClick={() => setAddModalVisible(true)}
              type="button"
              className="mb-4 flex dark:bg-[#11121c] dark:border-[#e6f85e] border-2 dark:text-[#e6f85e] border-[#6a4dff] text-[#6a4dff]  rounded-2 py-3 px-4 ml-auto"
            >
              <svg
                className="h-3.5 w-3.5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                />
              </svg>
              Add New Notification
            </button>
            {addModalVisible && (
              <AddNotification
                fetchData={fetchData}
                setAddModalVisible={setAddModalVisible}
                onClick={() => setAddModalVisible(false)}
              />
            )}
          </div>
          <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-4 py-4">
                      Sender
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Message
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Title
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Created Date and Time
                    </th>
                    <th scope="col" className="py-3 text-center">
                      Actions
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
                  {!loading && data && data.length === 0 && (
                    <tr>
                      <td
                        className="text-center p-6 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                        colSpan={10}
                      >
                        No records found
                      </td>
                    </tr>
                  )}
                  {data.map((item: Notification, i: number) => {
                    return (
                      <>
                        <tr key={i} className="border-b dark:border-gray-700">
                          <th
                            scope="row"
                            className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            {item.sender}
                          </th>
                          <td className="px-4 py-3">{item.message}</td>
                          <td className="px-4 py-3">{item.title}</td>
                          <td className="px-4 py-3 max-w-[12rem] truncate">
                            {getFormattedDate(item.createdAt)}
                          </td>
                          <td className="px-4 py-3 flex items-center justify-center">
                            <ul
                              className="py-1 text-sm flex"
                              aria-labelledby="apple-imac-27-dropdown-button"
                            >
                              <li>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedNotificationId(item._id);
                                  }}
                                  className="flex w-full items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-gray-700 dark:text-gray-200"
                                >
                                  <svg
                                    className="w-4 h-4 mr-2"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                  >
                                    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                    <path
                                      fill-rule="evenodd"
                                      clip-rule="evenodd"
                                      d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                                    />
                                  </svg>
                                  Edit
                                </button>
                                {selectedNotificationId === item._id && (
                                  <UpdateNotification
                                    fetchData={fetchData}
                                    // message={item.message}
                                    // title={item.title}
                                    // sender={item.sender}

                                    setSelectedNotificationId={
                                      setSelectedNotificationId
                                    }
                                    notificationid={item._id}
                                    onClick={() => {
                                      setSelectedNotificationId(null);
                                    }}
                                  />
                                )}
                              </li>

                              <li>
                                <DeleteNotification
                                  fetchData={fetchData}
                                  notificationid={item._id}
                                />
                                {/* <button
                                  onClick={() => {
                                    deleteNotification(item._id);
                                  }}
                                >
                                  Delete
                                </button> */}
                              </li>
                            </ul>
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Start block --> */}

      {/* <!-- End block --> */}
    </>
  );
}
