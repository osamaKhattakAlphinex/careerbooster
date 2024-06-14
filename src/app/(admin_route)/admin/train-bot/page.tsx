"use client";
import { getFormattedDate } from "@/helpers/getFormattedDateTime";
import {
  deleteIcon,
  downloadIcon,
  eyeIcon,
  settingIcon,
} from "@/helpers/iconsProvider";
import axios from "axios";
import Link from "next/link";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { TrainBotEntryType } from "@/helpers/makeTrainBotEntry";
import { createColumnHelper } from "@tanstack/react-table";
import DataTable, {
  BulkDataOperation,
  TableAction,
} from "@/components/admin/DataTable";
import SlidingPanel from "@/components/admin/slidingPanel";

const activeCSS =
  "p-2 text-blue-600 bg-gray-100  active dark:bg-gray-800 dark:text-blue-500";
const inactiveCSS =
  "p-2 hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300";


const TrainRegistrationBotAdminPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [totalPages, setTotalPages] = useState(0);

  const [limitOfRecords, setLimitOfRecords] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("pending");
  const [dataType, setDataType] = useState<string>("aiTools");
  const [showRecordsType, setShowRecordsType] = useState<string>(
    "register.wizard.basicInfo"
  );
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);

  const slidingPanelRef: React.MutableRefObject<any> = useRef(null);
  const refreshRef = useRef<any>();

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `/api/trainBot?limit=${limitOfRecords}&page=${currentPage}`,
        {
          params: {
            status: activeTab,
            type: showRecordsType,
            dataType: dataType,
          },
        }
      );

      if (response.data.success) {
        setTotalPages(Math.ceil(response.data.totalRecs / limitOfRecords));
        setRecords(response.data.result);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
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
            <span className="inline-flex px-2 text-xs font-semibold leading-5 text-yellow-800 bg-yellow-100 rounded-full">
              Pending
            </span>
          );
        } else if (status === "reviewed") {
          return (
            <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
              Reviewed
            </span>
          );
        } else if (status === "trained") {
          return (
            <span className="inline-flex px-2 text-xs font-semibold leading-5 text-blue-800 bg-blue-100 rounded-full">
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
  const bulkDataOperationsTrained: BulkDataOperation = {
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
        name: "Change Status To Pending",
        type: "handler",
        element: (ids: string[] | []) => handleChangeStatus(ids, "pending"),
        styles:
          "whitespace-nowrap px-3 py-2 text-xs font-medium text-center text-white bg-yellow-700 rounded-lg hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800 no-underline",
        icon: "",
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
        element: (ids: string[] | []) => handleChangeStatus(ids, "trained"),
        styles:
          "whitespace-nowrap px-3 py-2 text-xs font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 no-underline",
        icon: "",
      },

      {
        name: "Change Status To Pending",
        type: "handler",
        element: (ids: string[] | []) => handleChangeStatus(ids, "pending"),
        styles:
          "whitespace-nowrap px-3 py-2 text-xs font-medium text-center text-white bg-yellow-700 rounded-lg hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800 no-underline",
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
          // handleChangeStatus(ids);
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

  const handleChangeStatus = async (dataIds: string[] = [], status: string) => {
    setLoading(true);

    axios
      .put("/api/trainBot/bulkStatusUpdate", {
        ids: dataIds,
        newStatus: status,
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

      try {
        axios
          .post("/api/trainBot/bulkDelete", { dataSelection: ids })
          .then((res: any) => {
            if (res.data.success) {
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
    }
  };

  const handleDelete = async (rec: any) => {
    const { _id: id } = rec;
    const c = confirm("Are you sure you want to delete this Record?");
    if (c) {
      try {
        const response = await axios.delete("/api/trainBot/" + id)
        if (response.data.success) {
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

  return (
    <>
      <SlidingPanel ref={slidingPanelRef} refresh={fetchRecords} />

      <div className="flex flex-col items-start justify-start">
        <h2 className="text-xl uppercase dark:text-white/70 text-black/70">
          Train Bots
        </h2>
        <span className="text-base dark:text-white/70 text-black/70 ">
          List of all the models you have trained.
        </span>

        <div className="flex flex-col gap-2">
          {/* Show Recrod */}
          <div className="flex flex-row items-center self-end float-right gap-2 ">
            <label
              htmlFor="status"
              className="text-base font-medium dark:text-white/70 text-black/70"
            >
              Show records:
            </label>
            <select
              name="status"
              id="status"
              className="rounded-sm text-sm px-2 py-1 border-[1px] border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
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
                  {/* <option value="register.wizard.listProjects">
                    Projects List
                  </option>
                  <option value="register.wizard.listCertifications">
                    Certifications List
                  </option>
                  <option value="register.wizard.listAwards">
                    Awards List
                  </option>
                  <option value="register.wizard.listTrainings">
                    Trainings List
                  </option>
                  <option value="register.wizard.listPublications">
                    Publications List
                  </option>
                  <option value="register.wizard.listLanguages">
                    Languages List
                  </option>
                  <option value="register.wizard.listInterests">
                    Interests & Hobbies List
                  </option>
                  <option value="register.wizard.listReferences">
                    References List
                  </option> */}
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
                  <option value="email.firstFollowUpSequence">
                    Email {"> "} First Followup Sequence
                  </option>
                  <option value="email.secondFollowUpSequence">
                    Email {"> "} Second Followup Sequence
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
                  <option value="resumeScan.job.getPotentialKeywords">
                    Job {"> "} Get Potential Skills
                  </option>
                  <option value="resumeScan.job.getMatchingKeywords">
                    Resume {"> "} Matching Keywords
                  </option>
                  <option value="write.genearteConsultingBid">
                    Write Consulting Bid
                  </option>
                  <option value="deo.rewriteJob">
                    Rewrite Job Desc and Skills
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
              className="flex border-[1px] rounded-sm p-2"
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
              className="flex border-[1px] rounded-sm  p-2"
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
              className="flex border-[1px] rounded-sm p-2"
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
            <ul className="flex flex-wrap items-start justify-start gap-2 p-0 m-0 text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
              <li className="">
                <button
                  disabled={loading}
                  onClick={() => {
                    setActiveTab("pending");
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
                  }}
                  className={activeTab === "trained" ? activeCSS : inactiveCSS}
                >
                  Trained
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="w-full mt-4 overflow-x-auto">
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
                : activeTab === "trained"
                ? bulkDataOperationsTrained
                : bulkDataOperations
            }
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
                  }
                )}

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
    </>
  );
};

export default TrainRegistrationBotAdminPage;
