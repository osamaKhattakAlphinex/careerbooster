"use client";
import { getFormattedDate } from "@/helpers/getFormattedDateTime";
import {
  downloadIcon,
  leftArrowIcon,
  refreshIconRotating,
} from "@/helpers/iconsProvider";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const activeCSS =
  "inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500";
const inactiveCSS =
  "inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300";

const TrainRegistrationBotAdminPage = () => {
  const [activeTab, setActiveTab] = useState("pending");
  const [dataType, setDataType] = useState<string>("registrationWizard"); // registrationWizard, aiTools
  const [showRecordsType, setShowRecordsType] = useState<string>(
    "register.wizard.basicInfo"
  ); // register.wizard.basicInfo, register.wizard.listEducation etc
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [downloading, setDownloading] = useState<boolean>(false);

  const fetchRecords = async () => {
    setLoading(true);
    if (!loading) {
      axios
        .get("/api/trainBot", {
          params: {
            status: activeTab,
            type: showRecordsType,
            dataType: dataType,
          },
        })
        .then((res: any) => {
          if (res.data.success) {
            const result = res.data;
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

  const handleDelete = async (id: string) => {
    const c = confirm("Are you sure you want to delete this Record?");
    if (c) {
      try {
        let result = await fetch("http://localhost:3001/api/trainBot/" + id, {
          method: "DELETE",
        });
        const res = await result.json();
        console.log(result);
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

          {/* Tabs */}

          <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 m-0">
            <li className="mr-2">
              <button
                disabled={loading}
                onClick={() => setActiveTab("pending")}
                className={activeTab === "pending" ? activeCSS : inactiveCSS}
              >
                Pending Review
              </button>
            </li>
            <li className="mr-2">
              <button
                disabled={loading}
                onClick={() => setActiveTab("reviewed")}
                className={activeTab === "reviewed" ? activeCSS : inactiveCSS}
              >
                Reviewed
              </button>
            </li>
            <li className="mr-2">
              <button
                disabled={loading}
                onClick={() => setActiveTab("trained")}
                className={activeTab === "trained" ? activeCSS : inactiveCSS}
              >
                Trained
              </button>
            </li>
          </ul>

          {activeTab === "reviewed" && (
            <div className="flex justify-end">
              <button
                onClick={handleDownload}
                className=" flex gap-2 items-center rounded-full border-2 border-primary px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out hover:border-primary-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-primary-600 focus:border-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:border-primary-700 active:text-primary-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
              >
                {downloading ? (
                  <>{refreshIconRotating} Downloading...</>
                ) : (
                  <>{downloadIcon} Download All</>
                )}
              </button>
            </div>
          )}

          {/* Table */}
          <div className="">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      S.No
                    </th>
                    {dataType !== "linkedinTool" && (
                      <th scope="col" className="px-6 py-3">
                        Email
                      </th>
                    )}
                    <th scope="col" className="px-6 py-3">
                      Type
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Date Time
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
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
                  {!loading && records && records.length === 0 && (
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
                    records.map((rec: any, index: number) => (
                      <tr
                        key={rec._id}
                        className="bg-gray-100 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      >
                        <td className="px-6 py-4">{index + 1}</td>
                        {dataType !== "linkedinTool" && (
                          <td className="px-6 py-4">{rec?.userEmail}</td>
                        )}
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-xs"
                        >
                          {rec.type.replaceAll(".", " -> ")}
                        </th>
                        <td className="px-6 py-4">
                          {rec.status === "pending" && (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                              Pending
                            </span>
                          )}
                          {rec.status === "reviewed" && (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Reviewed
                            </span>
                          )}
                          {rec.status === "trained" && (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                              Trained
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          {getFormattedDate(rec.createdAt)}
                        </td>
                        <td className="flex gap-2 mt-2  items-center ">
                          <Link
                            href={`/admin/train-bot/${rec._id}`}
                            className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 no-underline"
                          >
                            Review
                          </Link>

                          <button
                            className="px-3 py-2 text-xs font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 no-underline"
                            onClick={() => handleDelete(rec._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainRegistrationBotAdminPage;
