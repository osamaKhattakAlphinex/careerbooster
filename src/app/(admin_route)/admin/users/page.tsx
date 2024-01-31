"use client";
import { getFormattedDate } from "@/helpers/getFormattedDateTime";
import { deleteIcon, refreshIconRotating } from "@/helpers/iconsProvider";
import axios from "axios";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import DataTable, {
  BulkDataOperation,
  TableAction,
} from "@/components/admin/DataTable";

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
  const [showTableLoader, setshowTableLoader] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageStart, setPageStart] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [subscriptionId, setSubscriptionId] = useState("");
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [dataSelection, setDataSelection] = useState<string[]>([]);
  const [pkg, setPkg] = useState<any>([]);
  const [counts, setCounts] = useState<any>(null);
  const [userStats, setUserStats] = useState<any>("total");

  const columnHelper = createColumnHelper<User>();

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
      id: "subscription",
      header: () => "Subscription",
      cell: (info) => {
        const { _id, userPackage, userPackageExpirationDate } = info.getValue();
        return subscriptionId === _id ? (
          refreshIconRotating
        ) : (
          <div className="flex justify-center items-center gap-2">
            <select
              className="rounded"
              value={userPackage}
              onChange={(e) => {
                onSubscriptionChange(_id, e.target.value);
              }}
            >
              {pkg.map((p: any, i: any) => {
                return (
                  <option
                    key={i}
                    value={p._id}
                    selected={userPackage === p._id}
                  >
                    {p.title}
                  </option>
                );
              })}
            </select>
            <div className="flex justify-center items-center">
              <input
                type="checkbox"
                checked={checkingSubscription(userPackageExpirationDate)}
                onChange={(e) => {
                  onSubscriptionChange(_id, userPackage);
                  if (subscriptionId === "") {
                    e.target.checked = false;
                  }
                }}
              />
              <span className=" text-sm font-medium text-gray-900 dark:text-gray-300">
                {new Date(userPackageExpirationDate).getTime() < Date.now() ||
                userPackageExpirationDate === undefined
                  ? "Off"
                  : "On"}
              </span>
            </div>
          </div>
        );
      },
    }),
  ];

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
        element: () => handleDeleteAll(),
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
          return getUserDeatils();
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
          getUserDeatils();
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  };
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
      // router.push("/admin/users");
    }
  };
  const checkingSubscription = (expirationDate: any) => {
    if (new Date(expirationDate).getTime() > Date.now()) {
      return true;
    } else {
      return false;
    }
  };
  const onSubscriptionChange = async (id: string, pckg: string) => {
    if (window.confirm("Are you sure to Change the subscription status")) {
      setSubscriptionId(id);

      const record: any = await axios
        .put(`/api/users/${id}`, {
          userPackage: pckg,
          userPackageUsed: {
            resumes_generation: 0,
            keywords_generation: 0,
            headline_generation: 0,
            about_generation: 0,
            job_desc_generation: 0,
            cover_letter_generation: 0,
            email_generation: 0,
            pdf_files_upload: 0,
            review_resume: 0,
            consulting_bids_generation: 0,
          },
        })
        .finally(() => {
          setSubscriptionId("");
          getUserDeatils();
        });
    }
  };

  const isChecked = (id: string) => {
    if (selectAll) {
      if (dataSelection.length === records.length) return true;
    } else {
      if (dataSelection.includes(id)) return true;
      else return false;
    }
  };
  const showDeleteAllButton = () => {
    if (selectAll) {
      return true;
    }
    if (dataSelection.length > 1) {
      return true;
    } else {
      return false;
    }
  };
  const onSelectAll = (e: any) => {
    setSelectAll(e.target.checked);
    if (e.target.checked) {
      if (records.length >= 1) {
        let _ids: string[] = [];
        records.map((rec: any) => _ids.push(rec._id));
        setDataSelection(_ids);
      }
    } else {
      setDataSelection([]);
    }
  };
  const onSelecting = (checked: boolean, id: string) => {
    if (selectAll)
      if (checked) {
        setDataSelection((prevSelection) => [...prevSelection, id]);
      } else {
        let newSelection = dataSelection.filter(
          (selectedId) => selectedId !== id
        );
        setDataSelection(newSelection);
        setSelectAll(false);
      }
    else {
      if (checked) {
        setDataSelection((prevSelection) => [...prevSelection, id]);
      } else {
        let newSelection = dataSelection.filter(
          (selectedId) => selectedId !== id
        );
        setDataSelection(newSelection);
      }
    }
  };
  const selectUsersLimit = (e: any) => {
    setCurrentPage(1);
    setLimitOfUser(e.target.value);
  };

  const getUserDeatils = () => {
    setshowTableLoader(true);
    setLoading(true);
    if (!loading) {
      fetch(`/api/users?limit=${limitOfUser}&page=${currentPage}`)
        .then(async (resp) => {
          const res = await resp.json();
          setLoadingId("");

          if (res.success) {
            setRecords(res.result);
            setTotalPages(Math.ceil(res.total / limitOfUser));
            setshowTableLoader(false);
            setLoading(false);
          } else {
            setRecords([]);
          }
        })
        .finally(() => {
          setLoading(false);
          setshowTableLoader(false);
        });
    }
  };
  const getUsersCount = async () => {
    axios.get("/api/users/getCount").then((res) => {
      if (res.data.success) {
        setCounts(res.data);
      }
    });
  };
  const getAllPackages = () => {
    fetch("/api/checkout/getActivePackages", {
      method: "GET",
    }).then(async (resp: any) => {
      const res = await resp.json();
      let result;
      if (typeof res.result === "string") {
        result = await JSON.parse(res.result);
      } else {
        result = res.result;
      }
      setPkg(result);
    });
  };
  useEffect(() => {
    getAllPackages();
    getUserDeatils();
    getUsersCount();
  }, []);

  useEffect(() => {
    setRecords([]);
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
    <div className="flex flex-col justify-start items-start">
      <h2 className=" text-xl dark:text-white/70 text-black/70 uppercase">
        Users
      </h2>
      <span className="dark:text-white/70 text-black/70 text-base">
        List of all the users
      </span>
      <div className="w-full overflow-x-auto mt-4">
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
      <div className=" flex flex-row justify-between items-center w-full ">
        <div className="flex flex-row gap-2 items-center">
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
        <div className=" flex justify-end mt-4">
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
                  className="border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-r-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
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
