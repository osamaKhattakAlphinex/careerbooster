import { leftArrowIcon } from "@/helpers/iconsProvider";
import Link from "next/link";

const AdminUserPacakges = () => {
  return (
    <div className="mb-40">
      <div className="my-5 ml-10">
        <Link
          href="/admin"
          className="flex flex-row gap-2 items-center hover:font-semibold transition-all"
        >
          {leftArrowIcon}
          Dashboard
        </Link>
      </div>
      <div className="flex m-10 gap-4">
        <div className="w-full flex p-4  border border-gray-200 rounded-lg shadow sm:p-6  ">
          <h2 className="text-2xl">
            <div className="flex flex-row gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
                />
              </svg>

              <span className="text-semibold">User Pacakges Management</span>
            </div>
          </h2>
        </div>
      </div>
      <div className="flex m-10 gap-4 ">asdfasdf</div>
    </div>
  );
};

export default AdminUserPacakges;
