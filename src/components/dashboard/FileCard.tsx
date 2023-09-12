"use client";
import Link from "next/link";
const FileCard = ({
  file,
  email,
}: {
  file: string;
  email?: string | null | undefined;
}) => {
  const url = `/files/${email}/${file}`;
  return (
    <div className="">
      <div className="w-full   ">
        <p className="text-gray-400">
          {file.substring(file.lastIndexOf("/") + 1)}
        </p>

        <div className="">
          <Link
            href={`${url.replace(/^\/public/, "")}`}
            target="_blank"
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-xs px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 no-underline"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
};
export default FileCard;
