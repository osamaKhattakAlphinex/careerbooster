"use client";
import { getFormattedDate } from "@/helpers/getFormattedDateTime";
import {
  deleteIcon,
  downloadIcon,
  eyeIcon,
  leftArrowIcon,
  settingIcon,
} from "@/helpers/iconsProvider";
import axios from "axios";
import Link from "next/link";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import FineTuningSettingModel from "@/components/admin/fineTuning/fineTuningSettingModels";
import { TrainBotEntryType } from "@/helpers/makeTrainBotEntry";
import { createColumnHelper } from "@tanstack/react-table";
import DataTable, {
  BulkDataOperation,
  TableAction,
} from "@/components/DataTable";
import SlidingPanel from "@/components/slidingPanel";
import useSWR from "swr";
import { url } from "inspector";

const activeCSS =
  "p-2 text-blue-600 bg-gray-100  active dark:bg-gray-800 dark:text-blue-500";
const inactiveCSS =
  "p-2 hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300";

const Review = ({ rec }: any) => {
  return (
    <Link
      href={`/admin/train-bot/${rec._id}`}
      className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 no-underline"
    >
      {eyeIcon}
    </Link>
  );
};

const TrainRegistrationBotAdminPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [totalPages, setTotalPages] = useState(0);
  const [startingPage, setStartingPage] = useState(1);

  const [limitOfRecords, setLimitOfRecords] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("pending");
  const [dataType, setDataType] = useState<string>("aiTools"); // registrationWizard, aiTools
  const [showRecordsType, setShowRecordsType] = useState<string>(
    "register.wizard.basicInfo"
  ); // register.wizard.basicInfo, register.wizard.listEducation etc
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [downloading, setDownloading] = useState<boolean>(false);

  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [dataSelection, setDataSelection] = useState<string[]>([]);

  const slidingPanelRef: React.MutableRefObject<any> = useRef(null);
  const refreshRef = useRef<any>();

  const fetchRecords = async () => {
    setLoading(true);

    if (!loading) {
      axios
        .get(`/api/trainBot?limit=${limitOfRecords}&page=${currentPage}`, {
          params: {
            status: activeTab,
            type: showRecordsType,
            dataType: dataType,
          },
        })
        .then((res: any) => {
          if (res.data.success) {
            const result = res.data;
            setTotalPages(Math.ceil(result.totalRecs / limitOfRecords));
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

  const columnHelper = createColumnHelper<TrainBotEntryType>();

  refreshRef.current = fetchRecords;

  const columns = [
    columnHelper.accessor("userEmail", {
      id: "userEmail",
      header: () => "Email",
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("status", {
      id: "status",
      header: () => "Status",
      cell: (info) => {
        let status = info.renderValue();

        if (status === "pending") {
          return (
            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
              Pending
            </span>
          );
        } else if (status === "reviewed") {
          return (
            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
              Reviewed
            </span>
          );
        } else if (status === "trained") {
          return (
            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
              Trained
            </span>
          );
        }
      },
    }),
    columnHelper.accessor("createdAt", {
      id: "createdAt",
      header: () => "Created At",
      cell: (info) => getFormattedDate(info.renderValue()),
    }),
    columnHelper.accessor("type", {
      id: "type",
      header: () => "Type",
      cell: (info) => info.renderValue()?.replaceAll(".", " -> "),
    }),
  ];

  const actions: TableAction[] = [
    {
      name: "review",
      type: "handler",
      // element: (rec: any) => <Review rec={rec} />,
      element: (rec: any) => handleViewClick(rec),
      styles:
        "whitespace-nowrap px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 no-underline",
      icon: eyeIcon,
    },

    {
      name: "",
      type: "handler",
      element: (rec: any) => handleDelete(rec),
      styles:
        "whitespace-nowrap px-3 py-2 text-xs font-medium text-center text-white bg-rose-700 rounded-lg hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-rose-300 dark:bg-rose-600 dark:hover:bg-rose-700 dark:focus:ring-rose-800 no-underline",
      icon: deleteIcon,
    },
  ];
  // this is for tab 1 (pending) and 3 (trained)
  const bulkDataOperations: BulkDataOperation = {
    operations: [
      {
        name: "Delete All",
        type: "handler",
        element: (ids: string[] | []) => handleDeleteAll(ids),
        styles:
          "whitespace-nowrap px-3 py-2 text-xs font-medium text-center text-white bg-rose-700 rounded-lg hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-rose-300 dark:bg-rose-600 dark:hover:bg-rose-700 dark:focus:ring-rose-800 no-underline",
        icon: deleteIcon,
      },
    ],
  };
  const bulkDataOperationsReviewd: BulkDataOperation = {
    operations: [
      {
        name: "Delete All",
        type: "handler",
        element: (ids: string[] | []) => handleDeleteAll(ids),
        styles:
          "whitespace-nowrap px-3 py-2 text-xs font-medium text-center text-white bg-rose-700 rounded-lg hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-rose-300 dark:bg-rose-600 dark:hover:bg-rose-700 dark:focus:ring-rose-800 no-underline",
        icon: deleteIcon,
      },
      {
        name: "Download",
        type: "handler",
        element: () => handleDownload(),
        styles:
          "whitespace-nowrap px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 no-underline",
        icon: downloadIcon,
      },
      {
        name: "Change Status To Trained",
        type: "handler",
        element: (ids: string[] | []) => handleChangeStatus(ids),
        styles:
          "whitespace-nowrap px-3 py-2 text-xs font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 no-underline",
        icon: "",
      },
      {
        name: "Send For Training",
        type: "handler",
        element: (ids: string[] | []) => handleTuneModel(ids),
        styles:
          "whitespace-nowrap px-3 py-2 text-xs font-medium text-center text-white bg-indigo-700 rounded-lg hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800 no-underline",
        icon: settingIcon,
      },
    ],
  };

  const selectUsersLimit = (e: any) => {
    setCurrentPage(1);
    setLimitOfRecords(e.target.value);
  };
  const handleTuneModel = async (ids: string[] | []) => {
    if (ids.length === 0) return;

    const consent = confirm(
      "Are you sure you want to send this data for training?"
    );

    if (!consent) return;

    try {
      setLoading(true);
      const {
        data: { success, reviewedData },
      } = await axios.post(`/api/trainBot/getAllDataForTraining`, {
        status: activeTab,
        type: showRecordsType,
        ids,
      });

      if (success) {
        const formattedData = reviewedData.map((rec: any) => ({
          messages: [
            { role: "user", content: rec.input },
            { role: "assistant", content: rec.idealOutput },
          ],
        }));

        const jsonl = formattedData
          .map((obj: any) => JSON.stringify(obj, null, 0))
          .join("\n");

        const blob = new Blob([jsonl], { type: "application/json" });

        const formData = new FormData();
        formData.append("traing-file", blob);
        formData.append("record-type", showRecordsType);

        const trainingResponse = await axios.post(
          "/api/trainBot/tuneModel",
          formData
        );

        if (trainingResponse.data.success) {
          handleChangeStatus(ids);
          fetchRecords();
        } else {
          console.log("Something went wrong");
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeStatus = async (dataIds: string[] = []) => {
    setLoading(true);

    axios
      .put("/api/trainBot/bulkStatusUpdate", {
        ids: dataIds,
        newStatus: "trained",
      })
      .then((res: any) => {
        if (res.data.success) {
          console.log("Status Change Successfully");
        }
        fetchRecords();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDeleteAll = async (ids: string[] | []) => {
    const c = confirm("Are you sure you want to delete these Records?");
    if (c) {
      setLoading(true);
      console.log("train-bot ids ", ids);
      try {
        // console.log("all data deleted");
        axios
          .post("/api/trainBot/bulkDelete", { dataSelection: ids })
          .then((res: any) => {
            if (res.data.success) {
              // setDataSelection([]);
              fetchRecords();
            }
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            setLoading(false);
          });
      } catch (error) {
        console.log("error ===> ", error);
      }
    }
  };

  const handleDownload = async () => {
    if (activeTab !== "reviewed") return;

    setDownloading(true);

    if (records) {
      const data = records.map((rec: any) => {
        return {
          messages: [
            { role: "user", content: rec.input },
            { role: "assistant", content: rec.idealOutput },
          ],
        };
      });

      const jsonl = data
        .map((obj) => JSON.stringify(obj, (key, value) => value, 0))
        .join("\n");

      const blob = new Blob([jsonl], {
        type: "application/json",
      });

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "trainBot.jsonl";
      link.click();
      setDownloading(false);
    }
  };

  const handleDelete = async (rec: any) => {
    const { _id: id } = rec;
    const c = confirm("Are you sure you want to delete this Record?");
    if (c) {
      try {
        let result = await fetch("/api/trainBot/" + id, {
          method: "DELETE",
        });
        const res = await result.json();
        if (res.success) {
          return fetchRecords();
        } else {
          return alert("User Not Found");
        }
      } catch (error) {
        console.log("error ===> ", error);
      }
    }
  };

  const handleViewClick = (rec: any) => {
    if (slidingPanelRef.current) {
      slidingPanelRef.current.openModal(true, rec);
    }
  };

  // when tab changes fetch records for that tab
  //
  useEffect(() => {
    if (
      activeTab &&
      activeTab !== "" &&
      showRecordsType &&
      showRecordsType !== "" &&
      dataType &&
      dataType !== ""
    ) {
      setRecords([]);
      fetchRecords();
    }
  }, [activeTab, showRecordsType]);

  useEffect(() => {
    if (dataType && dataType === "aiTools") {
      setShowRecordsType("resume.getBasicInfo");
    } else if (dataType && dataType === "linkedinTool") {
      setShowRecordsType("linkedinAiTool.headline");
    } else {
      setShowRecordsType("register.wizard.basicInfo");
    }
  }, [dataType]);

  useEffect(() => {
    setRecords([]);

    fetchRecords();
    const startIndex = Number((currentPage - 1) * limitOfRecords);
    setStartingPage(startIndex);
    router.replace(pathname + `?r=${limitOfRecords}&p=${currentPage}`);
  }, [limitOfRecords, currentPage]);

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

  // useEffect(() => {
  //   const startIndex = (currentPage - 1) * limitOfRecords;
  //   setStartingPage(startIndex);
  //   const endIndex = startIndex + limitOfRecords;

  //   setRecords([]); // Clear existing records before fetching new ones
  //   fetchRecords();
  //   router.replace(`${pathname}?r=${limitOfRecords}&p=${currentPage}`);
  // }, [limitOfRecords, currentPage]);

  return (
    <>
      <SlidingPanel ref={slidingPanelRef} refresh={fetchRecords} />

      <div className="flex flex-col justify-start items-start">
        <h2 className=" text-xl dark:text-white/70 text-black/70 uppercase">
          Train Bots
        </h2>
        <span className="dark:text-white/70 text-black/70 text-base ">
          List of all the models you have trained.
        </span>

        <div className="flex flex-col gap-2">
          {/* Show Recrod */}
          <div className=" self-end flex flex-row gap-2 items-center float-right">
            <label
              htmlFor="status"
              className="text-base dark:text-white/70 text-black/70 font-medium"
            >
              Show records:
            </label>
            <select
              name="status"
              id="status"
              className="rounded-sm text-sm px-2 py-1 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
              onChange={(e) => setShowRecordsType(e.target.value)}
              value={showRecordsType}
            >
              {dataType === "registrationWizard" && (
                <>
                  <option value="register.wizard.basicInfo">
                    Basic Information
                  </option>
                  <option value="register.wizard.listEducation">
                    Education List
                  </option>
                  <option value="register.wizard.listExperiences">
                    Experiences List
                  </option>
                  <option value="register.wizard.individualExperience">
                    Individual Experience
                  </option>
                  <option value="register.wizard.listSkills">
                    Skills List
                  </option>
                </>
              )}
              {dataType === "aiTools" && (
                <>
                  <option value="resume.getBasicInfo">
                    Resume {">"} Get Basic info
                  </option>
                  <option value="resume.writeSummary">
                    Resume {">"} Write Summary
                  </option>
                  <option value="resume.writeJDSingle">
                    Resume {">"} Write JD Single
                  </option>
                  <option value="resume.writePrimarySkills">
                    Resume {">"} Write Primary Skills
                  </option>
                  {/* <option value="resume.writeProfessionalSkills">
                    Resume {">"} Write Professional Skills
                  </option>
                  <option value="resume.writeSecondarySkills">
                    Resume {">"} Write Secondary Skills
                  </option> */}
                  <option value="coverLetter.write">Write Cover Letter</option>
                  <option value="email.followupSequence">
                    Email {"> "} Followup Sequence
                  </option>
                  <option value="linkedin.keywords">
                    LinkedIn {"> "} Generate Keywords
                  </option>
                  <option value="linkedin.headlines">
                    LinkedIn {"> "} Generate Headline
                  </option>
                  <option value="linkedin.abouts">
                    LinkedIn {"> "} Generate About
                  </option>
                  <option value="linkedin.jobDescription">
                    LinkedIn {"> "} Generate Job Description
                  </option>
                  <option value="write.genearteConsultingBid">
                    Write Consulting Bid
                  </option>
                </>
              )}
              {dataType === "linkedinTool" && (
                <>
                  <option value="linkedinAiTool.headline">
                    Linkedin {">"} Headline
                  </option>
                  <option value="linkedinAiTool.about">
                    Linkedin {">"} About/Summary
                  </option>
                </>
              )}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div
              className="flex border rounded-sm p-2"
              onClick={() => setDataType("aiTools")}
            >
              <div className="flex items-center h-5">
                <input
                  name="dataType"
                  type="radio"
                  value="aiTools"
                  checked={dataType === "aiTools"}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div className="ml-2 text-sm">
                <label
                  htmlFor="helper-radio"
                  className="font-medium text-gray-900 dark:text-gray-300"
                >
                  AI Tools
                </label>
                <p
                  id="helper-radio-text"
                  className="text-xs font-normal text-gray-500 dark:text-gray-300"
                >
                  Data for Prompts running on all tools like resume builder,
                  linkedin, etc
                </p>
              </div>
            </div>
            <div
              className="flex border rounded-sm  p-2"
              onClick={() => setDataType("registrationWizard")}
            >
              <div className="flex items-center h-5">
                <input
                  name="dataType"
                  type="radio"
                  value="registrationWizard"
                  checked={dataType === "registrationWizard"}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div className="ml-2 text-sm">
                <label
                  htmlFor="helper-radio"
                  className="font-medium text-gray-900 dark:text-gray-300"
                >
                  Registration Wizard
                </label>
                <p
                  id="helper-radio-text"
                  className="text-xs font-normal text-gray-500 dark:text-gray-300"
                >
                  Data for Prompts fetching basic information, educations,
                  experiences skills etc
                </p>
              </div>
            </div>

            {/* <div
              className="flex border rounded-sm p-2"
              onClick={() => setDataType("linkedinTool")}
            >
              <div className="flex items-center h-5">
                <input
                  name="dataType"
                  type="radio"
                  value="linkedinTool"
                  checked={dataType === "linkedinTool"}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div className="ml-2 text-sm">
                <label
                  htmlFor="helper-radio"
                  className="font-medium text-gray-900 dark:text-gray-300"
                >
                  Linkedin Tool
                </label>
                <p
                  id="helper-radio-text"
                  className="text-xs font-normal text-gray-500 dark:text-gray-300"
                >
                  Data for Prompts running on Linkedin Tool
                </p>
              </div>
            </div> */}
          </div>
          {/* Tabs */}
          <div>
            <ul className="gap-2 m-0  flex justify-start items-start flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 p-0">
              <li className="">
                <button
                  disabled={loading}
                  onClick={() => {
                    setActiveTab("pending");
                    setDataSelection([]);
                    setSelectAll(false);
                  }}
                  className={activeTab === "pending" ? activeCSS : inactiveCSS}
                >
                  Pending Review
                </button>
              </li>
              <li className="">
                <button
                  disabled={loading}
                  onClick={() => {
                    setActiveTab("reviewed");
                    setDataSelection([]);
                    setSelectAll(false);
                  }}
                  className={activeTab === "reviewed" ? activeCSS : inactiveCSS}
                >
                  Reviewed
                </button>
              </li>
              <li className="">
                <button
                  disabled={loading}
                  onClick={() => {
                    setActiveTab("trained");
                    setDataSelection([]);
                    setSelectAll(false);
                  }}
                  className={activeTab === "trained" ? activeCSS : inactiveCSS}
                >
                  Trained
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="w-full overflow-x-auto mt-4">
          <DataTable
            loading={loading}
            data={records}
            columns={columns}
            source="trainbots"
            actions={actions}
            enableRowSelection={true}
            bulkDataOperations={
              activeTab === "reviewed"
                ? bulkDataOperationsReviewd
                : bulkDataOperations
            }
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
              className="rounded-md px-2 py-1 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
              onChange={selectUsersLimit}
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
                          className={`border-gray-300 text-gray-500 leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 ${currentPage === number
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
    </>
  );
};

export default TrainRegistrationBotAdminPage;
