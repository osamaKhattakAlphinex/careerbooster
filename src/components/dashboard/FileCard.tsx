"use client";
import Link from "next/link";
const FileCard = ({ file }: { file: string }) => {
  const url = file;
  return (
    <div className="">
      <div className="w-full bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
        <h2 className="">{file.substring(file.lastIndexOf("/") + 1)}</h2>

        <div className="pt-2">
          <Link
            href={`${url.replace(/^\/public/, "")}`}
            target="_blank"
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
};
export default FileCard;
