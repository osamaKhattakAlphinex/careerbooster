import Link from "next/link";

const AdminDashboard = () => {
  return (
    <section className="bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100    mx-auto md:h-screen p-10">
      <div className="w-full backdrop-blur-xl bg-white/70 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 mt-10">
        <div className="w-full flex flex-col gap-4 p-6 space-y-4 md:space-y-6 sm:p-8  ">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white ">
            Welcome ADMIN!!
          </h1>
          <Link href="/linkedin-prompts-configuration">
            <button className="bg-gray-900 text-white rounded-lg px-6 py-4 hover:bg-gray-800">
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
                <span>Configure LinkedIn Prompts</span>
              </div>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
