"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import ResumeTemplate1 from "@/components/dashboard/resume-templates/template-1";

const ResumeCreator = () => {
  const { data: session, status } = useSession();
  const [jobPosition, setJobPosition] = useState<string>("ReactJS Developer");
  const [streamedData, setStreamedData] = useState("");
  const [msgLoading, setMsgLoading] = useState<boolean>(false); // msg loading
  const [basicInfo, setBasicInfo] = useState<any>({});

  const handleGenerate = () => {
    if (jobPosition !== "") {
      setStreamedData("");
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
            const myJSON = JSON.parse(res.data.text);
            setBasicInfo(myJSON);
          })
          .catch((error) => {
            console.log("Error encountered2222");
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
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
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
            <div>
              <button
                disabled={jobPosition === "" || msgLoading}
                onClick={handleGenerate}
                className="bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:bg-emerald-300">
                Generate Resume
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="m-10  w-[95%]  p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
        <div className="w-full card">
          <ResumeTemplate1 basicInfo={basicInfo} />
        </div>
      </div>
    </>
  );
};
export default ResumeCreator;
