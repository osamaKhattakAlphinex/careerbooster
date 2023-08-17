"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface Props {
  setHeadline: React.Dispatch<React.SetStateAction<string>>;
}
const HeadlineGenerator = ({ setHeadline }: Props) => {
  const [msgLoading, setMsgLoading] = useState<boolean>(false); // msg loading
  const { data: session, status } = useSession();
  const [streamedData, setStreamedData] = useState("");

  useEffect(() => {
    setHeadline(streamedData);
  }, [streamedData]);

  const handleGenerate = () => {
    setStreamedData("");
    if (session?.user?.email) {
      setMsgLoading(true);
      const formData = {
        email: session?.user?.email,
      };
      fetch("/api/linkedInBots/headlineGenerator", {
        method: "POST",
        body: JSON.stringify(formData),
      })
        .then(async (resp: any) => {
          if (resp.ok) {
            // const res = await resp.json();
            // setStreamedData(res.result.output_text);
            const reader = resp.body.getReader();
            while (true) {
              const { done, value } = await reader.read();

              if (done) {
                break;
              }

              const text = new TextDecoder().decode(value);
              setStreamedData((prev) => prev + text);
            }
          } else {
            setStreamedData("Error! Something went wrong");
          }
          setMsgLoading(false);
        })
        .catch((error) => {
          console.log("Error encountered");
        })
        .finally(() => {
          setMsgLoading(false);
        });
    }
  };

  return (
    <div className="w-full card">
      <div className="space-y-4 md:space-y-6">
        <h2 className="text-2xl">Headline Generator</h2>
        <div className="flex flex-row gap-4">
          <div>
            <button
              disabled={msgLoading || !session?.user?.email}
              onClick={() => handleGenerate()}
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
                  {msgLoading ? "Please wait..." : "Generate Headline"}
                </span>
              </div>
            </button>
          </div>
        </div>
        {streamedData && (
          <div className="m-4 bg-gray-200 rounded border p-4">
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                AI Response{" "}
              </span>
            </h1>
            <div
              className="font-sans whitespace-pre-wrap break-words"
              // style={{ textW: "auto" }}
            >
              {streamedData}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default HeadlineGenerator;
