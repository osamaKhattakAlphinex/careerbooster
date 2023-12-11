import { antIcon } from "@/helpers/iconsProvider";
import Link from "next/link";

const AdminDashboard = () => {
  return (
    <>
      <section className=" p-10 mb-40 pt-40">
        <div className="w-full rounded-lg shadow  md:mt-0  xl:p-0 ">
          <div className="w-full  flex flex-col gap-4 p-6 space-y-4 md:space-y-6 sm:p-8  ">
            <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl flex gap-2">
              {antIcon} Train AI Models
            </h1>
            <div className="flex md:flex-row flex-col gap-2 mx-auto sm:w-full ">
              <Link href="/admin/train-bot">
                <button className="bg-gray-900 text-white rounded-lg px-6 py-4 hover:bg-gray-800">
                  <div className="flex flex-row gap-2">
                    <span>Start Training Models</span>
                  </div>
                </button>
              </Link>
              <Link href="/admin/trained-models">
                <button className="bg-gray-900 text-white rounded-lg px-6 py-4 hover:bg-gray-800">
                  <div className="flex flex-row gap-2">
                    <span>Trained Models</span>
                  </div>
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="w-full   rounded-lg shadow  md:mt-0  xl:p-0 ">
          <div className="w-full  flex flex-col gap-4 p-6 space-y-4 md:space-y-6 sm:p-8  ">
            <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl">
              Prompts configuration
            </h1>
            <div className="flex md:flex-row flex-col gap-2 mx-auto sm:w-full ">
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
              <Link href="/resume-prompts-configuration">
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
                    <span>Configure Resume Prompts</span>
                  </div>
                </button>
              </Link>
              <Link href="/biography-prompts-configuration">
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
                    <span>Configure Biography Prompt</span>
                  </div>
                </button>
              </Link>
              <Link href="/consulting-bid-prompt-configuration">
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
                    <span>Consulting Bid Prompt</span>
                  </div>
                </button>
              </Link>
            </div>
            <div className="flex md:flex-row flex-col gap-2 mx-auto sm:w-full ">
              <Link href="/cover-letter-prompt-configuration">
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
                    <span>Configure Cover Letter Prompt</span>
                  </div>
                </button>
              </Link>
              <Link href="/email-prompt-configuration">
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
                    <span>Personalized Email Prompt</span>
                  </div>
                </button>
              </Link>
              <Link href="/review-resume-configuration">
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
                    <span>Review Resume Prompt</span>
                  </div>
                </button>
              </Link>
              <Link href="/linkedin-tools-prompts-configuration">
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
                    <span>LinkedIn Tools Prompts</span>
                  </div>
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="w-full  rounded-lg shadow  md:mt-0  xl:p-0 ">
          <div className="w-full flex flex-col gap-4 p-6 space-y-4 md:space-y-6 sm:p-8  ">
            <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl  ">
              Manage CRUDS
            </h1>
            <div className="flex gap-2">
              <Link href="/admin/user-packages">
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
                    <span>User Packages</span>
                  </div>
                </button>
              </Link>
              <Link href="/admin/coupons">
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
                    <span>Coupons</span>
                  </div>
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full  rounded-lg shadow  md:mt-0  xl:p-0 ">
          <div className="w-full flex flex-col gap-4 p-6 space-y-4 md:space-y-6 sm:p-8  ">
            <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl  ">
              Manage USERS
            </h1>
            <div className="flex gap-2">
              <Link href="/admin/users">
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
                    <span>View Users </span>
                  </div>
                </button>
              </Link>
              <Link href="/admin/leads">
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
                    <span>Linkedin Tool Users</span>
                  </div>
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full  rounded-lg shadow  md:mt-0  xl:p-0 ">
          <div className="w-full flex flex-col gap-4 p-6 space-y-4 md:space-y-6 sm:p-8  ">
            <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl  ">
              View Details
            </h1>
            <div className="flex gap-2">
              <Link href="/admin/payments">
                <button className="bg-gray-900 text-white rounded-lg px-6 py-4 hover:bg-gray-800">
                  <div className="flex flex-row gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>

                    <span>Payments </span>
                  </div>
                </button>
              </Link>
              <Link href="/admin/contacts">
                <button className="bg-gray-900 text-white rounded-lg px-6 py-4 hover:bg-gray-800">
                  <div className="flex flex-row gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>

                    <span>Contact (emails) </span>
                  </div>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminDashboard;
