import { eyeIcon } from "@/helpers/iconsProvider";
import Link from "next/link";
type Props = {
  jobTitle: string;
  location: string;
  employer: string;
  jobDescription: string;
  viewjoblink?: any;
  applyJobLink: any;
  jobId: string;
  category: string;
};
export default function SinglejobCard({
  category,
  jobTitle,
  location,
  employer,
  jobDescription,
  viewjoblink,
  applyJobLink,
  jobId,
}: Props) {
  return (
    <div className="card md:flex md:flex-row xs:flex-col  dark:border dark:border-gray-100 dark:bg-black bg-gray-100  md:mx-14 md:px-8 py-10 rounded-md mt-4 shadow-lg xs:mx-4 xs:px-2">
      <div className="flex flex-col gap-6">
        <div className="md:flex md:flex-row xs:flex-col gap-6 items-center">
          {/* {category} */}
          <h2 className="dark:text-gray-100 text-gray-950 text-xl font-bold xs:mb-3">
            {jobTitle}
          </h2>
          {/* <div className="flex gap-4 items-center">
            <div className="remote flex items-center dark:bg-gray-100 bg-gray-950 px-2 py-1 rounded-md dark:text-gray-950 text-gray-100 text-sm font-bold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                />
              </svg>
              Remote
            </div>
            <div className="full_time dark:bg-gray-100 bg-gray-950 dark:text-gray-950 text-gray-100 px-2 py-1 rounded-md text-sm font-bold">
              Full Time
            </div>
          </div> */}
        </div>
        <div className="md:flex md:flex-row xs:flex-col dark:text-gray-100 text-gray-950 md:gap-3 xs:gap-4 items-center">
          <span className="country flex flex-row md:items-center xs:items-start dark:text-gray-100 text-gray-950 font-medium text-base xs:gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
              />
            </svg>
            {location}
          </span>
          <span className="text-gray-100 md:block xs:hidden">|</span>

          <span className="flex gap-2 md:items-center xs:items-start dark:text-gray-100 text-gray-950 font-medium text-base">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z"
              />
            </svg>

            {employer}
          </span>
        </div>
        <div className="description flex flex-wrap">
          <p className="dark:text-gray-100 text-gray-950 text-sm">
            {jobDescription
              .replace(/(<([^>]+)>)/gi, "")
              .replaceAll("&nbsp;", "")
              .replaceAll("&amp;", "")
              .replaceAll("&hellip;", "")
              .slice(0, 250) + (jobDescription.length > 350 ? " ... " : "")}
            <br />
          </p>
        </div>
        <div className="buttons flex items-center gap-2 md:ml-auto xs:mx-auto md:mx-0 xs:justify-center md:justify-end ">
          <Link
            href={`/test-job-board/${jobId}`}
            className="flex border-2 items-center gap-2 w-fit rounded-md dark:bg-gray-100 dark:text-gray-950 bg-gray-950 text-gray-100 font-semibold px-3 md:text-base xs:text-sm py-1 hover:bg-gray-100 hover:text-gray-950 dark:hover:bg-transparent dark:hover:text-gray-100  "
          >
            {eyeIcon}
            View Job
          </Link>
          <Link
            href={applyJobLink}
            target="_blank"
            className="flex border-2 items-center gap-2 w-fit rounded-md dark:bg-gray-100 dark:text-gray-950 bg-gray-950 text-gray-100 font-semibold px-3 md:text-base xs:text-sm py-1 hover:bg-gray-100 hover:text-gray-950 dark:hover:bg-transparent dark:hover:text-gray-100 "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
              />
            </svg>
            Apply Now
          </Link>
        </div>
      </div>
    </div>
  );
}
