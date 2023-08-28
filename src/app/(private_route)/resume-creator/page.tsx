"use client";
import { useEffect, useState, useRef } from "react";
import { useSession } from "next-auth/react";
import ResumeTemplate1 from "@/components/dashboard/resume-templates/template-1";
import DownloadDocx from "@/components/dashboard/resume-templates/template-1/DownloadDocx";
import { useDispatch, useSelector } from "react-redux";
import ReactToPrint from "react-to-print";

import {
  setBasicInfo,
  setSummary,
  setWorkExperience,
  setPrimarySkills,
  setSecondarySkills,
  setProfessionalSkills,
  // setLoadingState,
} from "@/store/resumeSlice";

const ResumeCreator = () => {
  const componentRef = useRef<any>(null);
  const { data: session, status } = useSession();
  const [jobPosition, setJobPosition] = useState<string>("ReactJS Developer");
  const [msgLoading, setMsgLoading] = useState<boolean>(false); // msg loading

  // streamed data
  const [streamedSummaryData, setStreamedSummaryData] = useState("");

  // Redux
  const dispatch = useDispatch();
  const resumeData = useSelector((state: any) => state.resume);

  const handleGenerate = async () => {
    if (jobPosition !== "") {
      if (jobPosition !== "" && session?.user?.email) {
        setMsgLoading(true);
        getBasicInfo(jobPosition);
        getSummary(jobPosition);
        getWorkExperience(jobPosition);
        getPrimarySkills(jobPosition);
        getProfessionalSkills(jobPosition);
        getSecondarySkills(jobPosition);
      }
    }
  };

  const getBasicInfo = async (jobPosition: string) => {
    // dispatch(setLoadingState("basicInfo"));
    return fetch("/api/resumeBots/getBasicInfo", {
      method: "POST",
      body: JSON.stringify({
        type: "basicInfo",
        email: session?.user?.email,
        jobPosition: jobPosition,
      }),
    }).then(async (resp: any) => {
      const res = await resp.json();
      if (res.success) {
        if (res?.data?.text) {
          const tSon = JSON.stringify(res?.data?.text);
          const myJSON = JSON.parse(tSon);
          dispatch(setBasicInfo(myJSON));
        } else if (res?.data) {
          const myJSON = JSON.parse(res.data);
          dispatch(setBasicInfo(myJSON));
        }
      }
    });
  };

  const getSummary = async (jobPosition: string) => {
    // dispatch(setLoadingState("summary"));
    return fetch("/api/resumeBots/getBasicInfo", {
      method: "POST",
      body: JSON.stringify({
        type: "summary",
        email: session?.user?.email,
        jobPosition: jobPosition,
      }),
    }).then(async (resp: any) => {
      if (resp.ok) {
        const reader = resp.body.getReader();
        while (true) {
          const { done, value } = await reader.read();

          if (done) {
            break;
          }

          const text = new TextDecoder().decode(value);
          setStreamedSummaryData((prev) => prev + text);
        }
        dispatch(setSummary(streamedSummaryData));
      } else {
        setStreamedSummaryData("Error! Something went wrong");
      }
    });
  };

  const getWorkExperience = async (jobPosition: string) => {
    // dispatch(setLoadingState("workExperience"));
    return fetch("/api/resumeBots/getBasicInfo", {
      method: "POST",
      body: JSON.stringify({
        type: "workExperience",
        email: session?.user?.email,
        jobPosition: jobPosition,
      }),
    }).then(async (resp: any) => {
      const res = await resp.json();
      if (res.success) {
        if (res?.data?.text) {
          const tSon = JSON.stringify(res?.data?.text);
          const myJSON = JSON.parse(tSon);
          dispatch(setWorkExperience(myJSON));
        } else if (res?.data) {
          const myJSON = JSON.parse(res.data);
          dispatch(setWorkExperience(myJSON));
        }
      }
    });
  };

  const getPrimarySkills = async (jobPosition: string) => {
    // dispatch(setLoadingState("primarySkills"));
    return fetch("/api/resumeBots/getBasicInfo", {
      method: "POST",
      body: JSON.stringify({
        type: "primarySkills",
        email: session?.user?.email,
        jobPosition: jobPosition,
      }),
    }).then(async (resp: any) => {
      const res = await resp.json();
      if (res.success) {
        if (res?.data?.text) {
          const tSon = JSON.stringify(res?.data?.text);
          const myJSON = JSON.parse(tSon);
          dispatch(setPrimarySkills(myJSON));
        } else if (res?.data) {
          const myJSON = JSON.parse(res.data);
          dispatch(setPrimarySkills(myJSON));
        }
      }
    });
  };

  const getProfessionalSkills = async (jobPosition: string) => {
    // dispatch(setLoadingState("professionalSkills"));
    return fetch("/api/resumeBots/getBasicInfo", {
      method: "POST",
      body: JSON.stringify({
        type: "professionalSkills",
        email: session?.user?.email,
        jobPosition: jobPosition,
      }),
    }).then(async (resp: any) => {
      const res = await resp.json();
      if (res.success) {
        if (res?.data?.text) {
          const tSon = JSON.stringify(res?.data?.text);
          const myJSON = JSON.parse(tSon);
          dispatch(setProfessionalSkills(myJSON));
        } else if (res?.data) {
          const myJSON = JSON.parse(res.data);
          dispatch(setProfessionalSkills(myJSON));
        }
      }
    });
  };

  const getSecondarySkills = async (jobPosition: string) => {
    // dispatch(setLoadingState("secondarySkills"));
    return fetch("/api/resumeBots/getBasicInfo", {
      method: "POST",
      body: JSON.stringify({
        type: "secondarySkills",
        email: session?.user?.email,
        jobPosition: jobPosition,
      }),
    })
      .then(async (resp: any) => {
        const res = await resp.json();
        if (res.success) {
          if (res?.data?.text) {
            const tSon = JSON.stringify(res?.data?.text);
            const myJSON = JSON.parse(tSon);
            dispatch(setSecondarySkills(myJSON));
          } else if (res?.data) {
            const myJSON = JSON.parse(res.data);
            dispatch(setSecondarySkills(myJSON));
          }
        }
      })
      .finally(() => {
        setMsgLoading(false);
        // dispatch(setLoadingState(""));
      });
  };

  return (
    <>
      <div className="m-10 w-[95%]  p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
        <div className="w-full card">
          <div className="space-y-4 md:space-y-6">
            <div>
              <label
                htmlFor="targetedJobPosition"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Targeted Job position
              </label>
              <input
                type="targetedJobPosition"
                name="targetedJobPosition"
                id="targetedJobPosition"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="The Job position for which you are creating a new Resume e.g. ReactJS Developer, SEO specialist etc"
                value={jobPosition}
                onChange={(e) => setJobPosition(e.target.value)}
              />
            </div>
            <div className="flex flex-row gap-4">
              <div>
                <button
                  disabled={
                    jobPosition === "" || msgLoading || !session?.user?.email
                  }
                  onClick={handleGenerate}
                  className="bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:bg-emerald-300"
                >
                  <div className="flex flex-row gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className={`w-4 h-4 ${msgLoading ? "animate-spin" : ""}`}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                      />
                    </svg>
                    <span>
                      {msgLoading ? "Please wait..." : "Generate Resume"}
                    </span>
                  </div>
                </button>
              </div>

              {resumeData && (
                <DownloadDocx
                  basicInfo={resumeData}
                  disabled={
                    jobPosition === "" || msgLoading || !session?.user?.email
                  }
                />
              )}
              {resumeData && (
                <>
                  <ReactToPrint
                    trigger={() => (
                      <button
                        disabled={
                          jobPosition === "" ||
                          msgLoading ||
                          !session?.user?.email ||
                          !resumeData?.name
                        }
                        className="bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:bg-emerald-300"
                      >
                        <div className="flex flex-row gap-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                            />
                          </svg>
                          <span>Print / Download Resume in PDF</span>
                          {/* <span>
                            To download choose destination "save as PDF"
                          </span> */}
                        </div>
                      </button>
                    )}
                    content={() => componentRef.current}
                  />
                </>
              )}
            </div>
            {/* {resumeData?.loadingState !== "" && (
              <h3>
                AI is Writing...
                {resumeData?.loadingState === "basicInfo" && "Basic Info"}
                {resumeData?.loadingState === "summary" && "Summary"}
                {resumeData?.loadingState === "workExperience" &&
                  "Work Experience"}
                {resumeData?.loadingState === "primarySkills" &&
                  "Primary Skills"}
                {resumeData?.loadingState === "professionalSkills" &&
                  "Professional Skills"}
                {resumeData?.loadingState === "secondarySkills" &&
                  "Secondary Skills"}
              </h3>
            )} */}
          </div>
        </div>
      </div>

      {resumeData &&
        (resumeData?.name ||
          resumeData?.contact?.email ||
          resumeData?.summary) && (
          <div className="m-10  w-[95%]  p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
            <div className="w-full card" ref={componentRef}>
              <ResumeTemplate1 streamedSummaryData={streamedSummaryData} />
            </div>
          </div>
        )}
    </>
  );
};
export default ResumeCreator;
