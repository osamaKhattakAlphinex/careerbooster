"use client";
import DataTable, { TableAction } from "@/components/admin/DataTable";
import { getFormattedDate } from "@/helpers/getFormattedDateTime";
import { boltIcon, deleteIcon } from "@/helpers/iconsProvider";
import { createColumnHelper } from "@tanstack/react-table";
import axios from "axios";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

type Sale = {
  fullname: string;
  amount: string;
  service: string;
  status: string;
  phone: string;
  createdAt: string;
};

const ChangeStatus = ({ sale, refetch }: any) => {
  const [status, setStatus] = useState<boolean>(false);
  

  useEffect(() => {
    if (sale.status === "pending") {
      setStatus(false);
    } else {
      setStatus(true);
    }
  }, []);

  return (
    <label
      htmlFor="status"
      className={`${status ? "line-through " : " "} flex flex-row gap-2 `}
    >
      <input
        id="status"
        type="checkbox"
        checked={status}
        className=""
        onChange={(e) => {
          const newStatus = e.target.checked ? "completed" : "pending";
          const updatedSale = { ...sale, status: newStatus };

          axios
            .put(`/api/sales/${sale._id}`, updatedSale)
            .then((res: any) => {
              if (res.data.success) {
                refetch();
              }
            })
            .catch((err) => {
              console.log(err);
            })
            .finally(() => {});
        }}
      />{" "}
      Completed
    </label>
  );
};
const DeleteSale = ({ sale, refetch }: any) => {
  return (
    <button
      className="whitespace-nowrap p-2 text-xs font-medium text-center text-white bg-rose-700 rounded-lg hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-rose-300 dark:bg-rose-600 dark:hover:bg-rose-700 dark:focus:ring-rose-800 no-underline"
      title="Delete"
      onClick={(e) => {
        axios
          .delete(`/api/sales/${sale._id}`)
          .then((res: any) => {
            if (res.data.success) {
              refetch();
            }
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {});
      }}
    >
      {deleteIcon}
    </button>
  );
};

const Sales = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [records, setRecords] = useState([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [limitOfUser, setLimitOfUser] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const columnHelper = createColumnHelper<Sale>();

  const columns = [
    columnHelper.accessor("fullname", {
      id: "fullname",
      header: () => "Fullname",
    }),
    columnHelper.accessor("amount", {
      id: "amount",
      header: () => "Paid Amount",
      cell: (info) => info.renderValue() + " $",
    }),
    columnHelper.accessor("service", {
      id: "service",
      header: () => "Service",
      cell: (info) => {
        const services: any = info.renderValue();
        const labels = services.map((service: any) => service.label);
        return labels.join(", ");
      },
    }),
    columnHelper.accessor("phone", {
      id: "phone",
      header: () => "Phone",
    }),
    columnHelper.accessor("status", {
      id: "status",
      header: () => "Status",
      cell: (info) => (
        <span
          className={` text-gray-200 text-center text-sm font-semibold uppercase p-1 rounded-md  ${
            info.renderValue() === "pending" ? "bg-yellow-600" : "bg-green-600"
          }`}
        >
          {" "}
          {info.renderValue()}
        </span>
      ),
    }),
    columnHelper.accessor("createdAt", {
      id: "createdAt",
      header: () => "Date",
      cell: (info) => getFormattedDate(info.renderValue()),
    }),
  ];

  const actions: TableAction[] = [
    {
      name: "Change Status",
      type: "component",
      element: (sale: any) => <ChangeStatus sale={sale} refetch={fetchSales} />,
      styles: "",
      icon: boltIcon,
    },
    {
      name: "Delete",
      type: "component",
      element: (sale: any) => <DeleteSale sale={sale} refetch={fetchSales} />,
      styles: "",
      icon: deleteIcon,
    },
  ];

  const fetchSales = async () => {
    setLoading(true);

    if (!loading) {
      axios
        .get(`/api/sales?limit=${limitOfUser}&page=${currentPage}`)
        .then((res: any) => {
          if (res.data.success) {
            const sales = res.data.result;
            setRecords(sales);
            setTotalPages(Math.ceil(res.data.total / limitOfUser));
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
  const selectUsersLimit = (e: any) => {
    setCurrentPage(1);
    setLimitOfUser(e.target.value);
  };

  useEffect(() => {
    fetchSales();
  }, []);

  useEffect(() => {
    setRecords([]);
    fetchSales();
    const startIndex = (currentPage - 1) * limitOfUser;

    // setPageStart(startIndex);
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
      <div className="flex flex-col items-start justify-end">
        <h2 className="text-xl uppercase dark:text-white/70 text-black/70">
          Sales
        </h2>
        <span className="text-base dark:text-white/70 text-black/70">
          List of sales you made across by providing the services.
        </span>

        <div className="w-full mt-4 overflow-x-auto">
          <DataTable
            loading={loading}
            columns={columns}
            data={records}
            source="sales"
            actions={actions}
          />
        </div>
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
            onChange={selectUsersLimit}
            value={limitOfUser}
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
                  className={` border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 ml-0 rounded-l-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                  onClick={() => {
                    setRecords([]);
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
                  className="px-3 py-2 leading-tight text-gray-500 border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
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
    </>
  );
};

export default Sales;
