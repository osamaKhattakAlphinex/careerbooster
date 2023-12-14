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

const activeCSS =
  "inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500";
const inactiveCSS =
  "inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300";

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
  const [dataType, setDataType] = useState<string>("registrationWizard"); // registrationWizard, aiTools
  const [showRecordsType, setShowRecordsType] = useState<string>(
    "register.wizard.basicInfo"
  ); // register.wizard.basicInfo, register.wizard.listEducation etc
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [downloading, setDownloading] = useState<boolean>(false);

  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [dataSelection, setDataSelection] = useState<string[]>([]);

  const settingModelRef: React.MutableRefObject<any> = useRef(null);

  const fetchRecords = async () => {
    setLoading(true);

    // if(!loading){
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
    // }
  };

  const columnHelper = createColumnHelper<TrainBotEntryType>();

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
      type: "component",
      element: (rec: any) => <Review rec={rec} />,
      styles: "",
      icon: "",
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

  const isChecked = (id: string) => {
    if (selectAll) {
      if (dataSelection.length === records.length) return true;
    } else {
      if (dataSelection.includes(id)) return true;
      else return false;
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
      <FineTuningSettingModel ref={settingModelRef} />
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
          <div className="flex md:flex-row flex-col gap-2 mx-auto sm:w-full px-12">
            <Link href="/admin/fine-tuning">
              <button className="bg-gray-900 text-white rounded-lg px-6 py-4 hover:bg-gray-800">
                <div className="flex flex-row gap-2">
                  <span>Training Models</span>
                </div>
              </button>
            </Link>
            <button
              onClick={() => {
                if (settingModelRef.current) {
                  settingModelRef.current.openModal(true);
                }
              }}
              className="bg-gray-900 text-white rounded-lg px-6 py-4 hover:bg-gray-800"
            >
              <div className="flex flex-row gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>

                <span>Setting</span>
              </div>
            </button>
          </div>

          <div className=" p-8 flex flex-col gap-2 border w-11/12">
            <div className="flex justify-between">
              <h2 className="text-xl ">Datasets for Training Models</h2>

              {/* Dropdown */}
              <div className="flex flex-row gap-2 items-center float-right">
                <label htmlFor="status" className="text-sm font-medium">
                  Show records:
                </label>
                <select
                  name="status"
                  id="status"
                  className="rounded-md px-2 py-1 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
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
                      <option value="resume.writeProfessionalSkills">
                        Resume {">"} Write Professional Skills
                      </option>
                      <option value="resume.writeSecondarySkills">
                        Resume {">"} Write Secondary Skills
                      </option>
                      <option value="coverLetter.write">
                        Write Cover Letter
                      </option>
                      <option value="email.followupSequence">
                        Email {"> "} Followup Sequence
                      </option>
                      <option value="linkedin.generateKeywords">
                        LinkedIn {"> "} Generate Keywords
                      </option>
                      <option value="linkedin.generateHeadling">
                        LinkedIn {"> "} Generate Headline
                      </option>
                      <option value="linkedin.generateAbout">
                        LinkedIn {"> "} Generate About
                      </option>
                      <option value="linkedin.generateJD">
                        LinkedIn {"> "} Generate Job Description
                      </option>
                      <option value="linkedin.genearteConsultingBid">
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
            </div>
            {/* Data type radio buttons */}
            <div>
              <div
                className="flex"
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
                    Registration Wizard Data sets
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
              <div className="flex" onClick={() => setDataType("aiTools")}>
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
                    AI Tools Data sets
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
              <div className="flex" onClick={() => setDataType("linkedinTool")}>
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
                    Linkedin Tool Data sets
                  </label>
                  <p
                    id="helper-radio-text"
                    className="text-xs font-normal text-gray-500 dark:text-gray-300"
                  >
                    Data for Prompts running on Linkedin Tool
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-2 items-center ml-auto  pr-5">
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
            {/* Tabs */}

            <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 m-0">
              <li className="mr-2">
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
              <li className="mr-2">
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
              <li className="mr-2">
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

            {/* Pagination Controls */}
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
                            className={`border-gray-300  leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400  text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white focus:bg-gray-100 focus:text-gray-700 dark:focus:bg-gray-700 dark:focus:text-white hover:text-gray-700 first-letter
                      ${currentPage === number} `}
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
      </div>
    </>
  );
};

export default TrainRegistrationBotAdminPage;
