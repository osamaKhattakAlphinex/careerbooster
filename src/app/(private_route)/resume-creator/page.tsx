"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import ResumeTemplate1 from "@/components/dashboard/resume-templates/template-1";
import DownloadDocx from "@/components/dashboard/resume-templates/template-1/DownloadDocx";

const ResumeCreator = () => {
  const { data: session, status } = useSession();
  const [jobPosition, setJobPosition] = useState<string>(
    "Chief Privacy Officer"
  );
  const [msgLoading, setMsgLoading] = useState<boolean>(false); // msg loading
  const [basicInfo, setBasicInfo] = useState<any>(null);

  const handleGenerate = () => {
    if (jobPosition !== "") {
      if (jobPosition !== "" && session?.user?.email) {
        setMsgLoading(true);
        const formData = {
          type: "basicInfo",
          email: session?.user?.email,
          jobPosition,
        };
        console.clear();
        fetch("/api/resumeBots/getBasicInfo", {
          method: "POST",
          body: JSON.stringify(formData),
        })
          .then(async (resp: any) => {
            const res = await resp.json();
            if (res.success) {
              if (res?.data?.text) {
                const myJSON = JSON.parse(res?.data?.text);
                console.log("RESPONSE1: ", myJSON);
                setBasicInfo(myJSON);
              } else if (res?.data) {
                const myJSON = JSON.parse(res.data);
                console.log("RESPONSE2: ", myJSON);
                setBasicInfo(myJSON);
              }
            }
          })
          .catch((error) => {
            console.log("Error encountered");
          })
          .finally(() => {
            setMsgLoading(false);
          });
      }
    }
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
              <DownloadDocx basicInfo={basicInfo} />
            </div>
          </div>
        </div>
      </div>

      {basicInfo &&
        (basicInfo?.name ||
          basicInfo?.contact?.email ||
          basicInfo?.summary) && (
          <div className="m-10  w-[95%]  p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
            <div className="w-full card">
              <ResumeTemplate1 basicInfo={basicInfo} />
            </div>
          </div>
        )}
    </>
  );
};
export default ResumeCreator;
