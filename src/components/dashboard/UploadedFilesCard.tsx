"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import FileCard from "./FileCard";

const UploadedFilesCard = () => {
  // local state
  const [files, setFiles] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { data: session, status } = useSession();

  const getFiles = async () => {
    if (session?.user?.email) {
      setIsLoading(true);
      axios
        .get(`/api/users/getOneByEmail?email=${session.user.email}`)
        .then((resp: any) => {
          if (resp?.data?.user?.files) {
            setFiles(resp?.data?.user?.files);
          }
          setIsLoading(false);
        });
    }
  };
  useEffect(() => {
    getFiles();
  }, [session?.user?.email]);

  return (
    <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
      <h5 className="mb-3 text-base font-semibold text-gray-900 md:text-xl dark:text-white">
        Uploaded Files{" "}
        <button
          type="button"
          className={`float-right`}
          title="Reload the files"
          onClick={() => getFiles()}
        >
          <div className="flex flex-row gap-2">
            <span className="text-sm">Reload</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className={`w-6 h-6 ${isLoading ? "animate-spin" : ""}`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
          </div>
        </button>
      </h5>
      <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
        Recently uploaded Files
      </p>
      <div className="flex flex-col gap-4 pt-10">
        {files &&
          files.map((file: string, i: number) => (
            <FileCard key={i} file={file} />
          ))}
        {!isLoading && files.length === 0 && <p>There are no files</p>}
      </div>
    </div>
  );
};

export default UploadedFilesCard;
