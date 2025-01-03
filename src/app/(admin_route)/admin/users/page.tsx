"use client";
import { getFormattedDate } from "@/helpers/getFormattedDateTime";
import {
  EditIcon,
  deleteIcon,
  refreshIconRotating,
} from "@/helpers/iconsProvider";
import axios from "axios";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import DataTable, {
  BulkDataOperation,
  TableAction,
} from "@/components/admin/DataTable";
import CreditsUpdationModal from "@/components/creditsUpdationModal";

type User = {
  alertConsent: any;
  contact: any;
  createdAt: any;
  email: any;
  firstName: any;
  lastName: any;
  phone: any;
  role: any;
  status: any;
  updatedAt: any;
  uploadedResume: any;
  userPackage: any;
  userPackageExpirationDate: any;
  userPackageUsed: any;
  usedPackage: any;
  totalCredits: any;
  _id: any;
  OpenAiTokensUsed: any;
};

const UsersPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [records, setRecords] = useState([]);
  const [loadingId, setLoadingId] = useState("");
  const [limitOfUser, setLimitOfUser] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [dataSelection, setDataSelection] = useState<string[]>([]);
  const columnHelper = createColumnHelper<User>();

  const creditsUpdationModelRef: React.MutableRefObject<any> = useRef(null);

  const columns = [
    columnHelper.accessor((row) => row, {
      id: "fullname",
      header: () => "Fullname",
      cell: (info: any) =>
        `${info.row.original["firstName"]} ${info.row.original["lastName"]}`,
    }),
    columnHelper.accessor("email", {
      id: "email",
      header: () => "Email",
      cell: (info) => info.renderValue(),
    }),

    columnHelper.accessor("OpenAiTokensUsed", {
      id: "OpenAiTokensUsed",
      header: () => "Open AI Tokens Used",
      cell: (info) => info.renderValue(),
    }),

    columnHelper.accessor("contact.country", {
      id: "contact_country",
      header: () => "Country",
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("role", {
      id: "role",
      header: () => "Role",
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("createdAt", {
      id: "createdAt",
      header: () => "Created At",
      cell: (info) => getFormattedDate(info.renderValue()),
    }),
    columnHelper.accessor((row) => row, {
      id: "status",
      header: () => "Status",
      cell: (info) => {
        const { _id, status } = info.getValue();
        return loadingId === _id ? (
          refreshIconRotating
        ) : (
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={status}
              value=""
              className="sr-only peer"
              onChange={(e) => {
                handleChange(_id, e.target.checked);
                if (loadingId === "") {
                  e.target.checked = false;
                }
              }}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              {status === true ? "Active" : "InActive"}
            </span>
          </label>
        );
      },
    }),

    columnHelper.accessor((row) => row, {
      id: "totalCredits",

      header: () => "Total Credits",
      cell: (info) => {
        const { totalCredits } = info.getValue();
        return (
          <div className="flex items-center justify-between gap-2">
            <span>{totalCredits}</span>
            <div className="flex items-center justify-center bg-orange-600 rounded-sm">
              <button
                type="button"
                className="p-1 text-white"
                onClick={() => handleCreditChange(info.row.original)}
              >
                {EditIcon}
              </button>
            </div>
          </div>
        );
      },
    }),
  ];

  const handleCreditChange = (user: any) => {
    if (creditsUpdationModelRef.current) {
      creditsUpdationModelRef.current.openModal(true);
      creditsUpdationModelRef.current.setUser(user);
    }
  };

  const actions: TableAction[] = [
    {
      name: "delete",
      type: "handler",
      element: (rec: any) => handleDelete(rec),
      styles:
        "whitespace-nowrap px-3 py-2 text-xs font-medium text-center text-white bg-rose-700 rounded-lg hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-rose-300 dark:bg-rose-600 dark:hover:bg-rose-700 dark:focus:ring-rose-800 no-underline",
      icon: deleteIcon,
    },
  ];

  const bulkDataOperations: BulkDataOperation = {
    operations: [
      {
        name: "Delete All",
        type: "handler",
        element: (ids:string[]|[]) => handleDeleteAll(ids),
        styles:
          "whitespace-nowrap px-3 py-2 text-xs font-medium text-center text-white bg-rose-700 rounded-lg hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-rose-300 dark:bg-rose-600 dark:hover:bg-rose-700 dark:focus:ring-rose-800 no-underline",
        icon: deleteIcon,
      },
    ],
  };

  const handleDelete = async (id: string) => {
    const c = confirm("Are you sure you want to delete this Record?");
    if (c) {
      try {
        let result = await fetch("/api/users/" + id, {
          method: "DELETE",
        });
        const res = await result.json();
        if (res.success) {
          setRecords([]);
          return getUserDetails();
        } else {
          return alert("User Not Found");
        }
      } catch (error) {
        console.log("error ===> ", error);
      }
    }
  };
  const handleDeleteAll = async (ids: string[] | [] = []) => {
    setLoading(true);

    axios
      .post("/api/users/bulkDelete", { dataSelection: ids })
      .then((res: any) => {
        if (res.data.success) {
          setDataSelection([]);
          getUserDetails();
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  };
  const handleChange = async (id: string, status: boolean) => {
    const c = confirm("Are you sure to Change the status ?");
    if (!c) return;

    setLoadingId(id);
    await axios.put(`/api/users/${id}`, {
      status: status,
    });

    getUserDetails();
  };

  const selectUsersLimit = (e: any) => {
    setCurrentPage(1);
    setLimitOfUser(e.target.value);
  };
  const getUserDetails = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        `/api/users?limit=${limitOfUser}&page=${currentPage}`
      );
      if (response.data.success) {
        setLoadingId("");
        setRecords(response.data.result);
        setTotalPages(Math.ceil(response.data.total / limitOfUser));
      }
    } catch (error) {
      setRecords([]);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  useEffect(() => {
    setRecords([]);
    getUserDetails();
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
    <div className="flex flex-col items-start justify-start">
      <CreditsUpdationModal
        ref={creditsUpdationModelRef}
        callback={getUserDetails}
      />

      <h2 className="text-xl uppercase dark:text-white/70 text-black/70">
        Users
      </h2>
      <span className="text-base dark:text-white/70 text-black/70">
        List of all the users
      </span>
      <div className="w-full mt-4 overflow-x-auto">
        <DataTable
          loading={loading}
          data={records}
          columns={columns}
          actions={actions}
          source="user"
          enableRowSelection={true}
          bulkDataOperations={bulkDataOperations}
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
    </div>
  );
};

export default UsersPage;
