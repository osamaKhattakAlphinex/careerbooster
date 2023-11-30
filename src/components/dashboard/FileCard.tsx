"use client";
import Link from "next/link";

const FileCard = ({
  file,
  email,
}: {
  file: string;
  email?: string | null | undefined;
}) => {
  const url = `/files/userResumes/${email}/${file}`;
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
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-xs px-5 py-2.5 mr-2 mb-2 "
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
};
export default FileCard;
