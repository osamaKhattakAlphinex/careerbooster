"use client";
import Script from "next/script";
import { features } from "process";
import { useState } from "react";

interface IUserPackage {
  _id?: string;
  type: "monthly" | "yearly";
  title: string;
  amount: number;
  status: "active" | "inactive";
  features: string[];
  featuresToolTips: string[];
  category: "basic" | "standard" | "premium";
  limit: {
    resumes_generation: number;
    can_edit_resume: boolean;
    keywords_generation: number;
    headline_generation: number;
    about_generation: number;
    job_desc_generation: number;
    cover_letter_generation: number;
    email_generation: number;
    pdf_files_upload: number;
    review_resume: number;
    consulting_bids_generation: number;
  };
}

type Props = {
  userPackage: IUserPackage;
};

const ReadPackage = ({ userPackage }: Props) => {
  const [previewPopUpModel, setPreviewPopUpModel] = useState(false);
  return (
    <>
      <Script type="text/javascript">
        {`
          (function(c,l,a,r,i,t,y){
          c[a]=c[a]function(){(c[a].q=c[a].q[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "jum6bniqm4");
        `}
      </Script>
      {/* Google tag (gtag.js) --> */}
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-NDN7TY5F2W"
      />
      <Script>
        {`

        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-NDN7TY5F2W');
        `}
      </Script>
      <button
        type="button"
        onClick={() => {
          setPreviewPopUpModel(true);
        }}
        data-modal-target="readProductModal"
        data-modal-toggle="readProductModal"
        className="flex w-full items-center py-2 pr-2 hover:text-[#e6f85e]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-4 h-4 mx-3"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        Preview
      </button>
      <div
        id="readProductModal"
        tabIndex={-1}
        aria-hidden="true"
        className={` z-50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full ${
          !previewPopUpModel ? "hidden" : "flex"
        }`}
      >
        <div className="relative p-4 w-full max-h-full max-w-2xl">
          {/* <!-- Modal content --> */}
          <div className="relative p-8 rounded-lg shadow bg-gray-100  dark:bg-gray-800 light:bg-white sm:p-5">
            {/* <!-- Modal header --> */}
            <div className="flex flex-row items-start justify-between mb-4 rounded-t sm:mb-5">
              <div className="flex-1 text-sm md:text-xl">
                <span className="capitalize">{userPackage.category}</span>
                <h3 className="font-semibold text-xl ">{userPackage.title}</h3>
                <p className="">
                  <strong>{userPackage.amount}</strong> / {userPackage.type}
                </p>
                <div className="">
                  <span>{userPackage.status}</span>
                </div>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => {
                    setPreviewPopUpModel(false);
                  }}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-toggle="readProductModal"
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex-1 bg-gray-200 dark:bg-gray-700 p-3 rounded-md">
                <h3 className="text-base font-bold  dark:text-gray-300  pb-4 mb-4 rounded-t border-b  border-gray-300 dark:border-gray-600">
                  Features Included
                </h3>
                <ul className="flex flex-column gap-1 text-sm my-2 pl-0">
                  {userPackage.features.map(
                    (feature: string, index: number) => {
                      return (
                        <li
                          key={`feature-${index}`}
                          className="flex flex-row justify-between  items-start"
                        >
                          <span className="block cursor-pointer  relative group">
                            {feature}
                          </span>
                          <span className="block cursor-pointer relative group">
                            <svg
                              className="inline-block w-3 h-3 mr-2"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 20 20"
                            >
                              <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M7.529 7.988a2.502 2.502 0 0 1 5 .191A2.441 2.441 0 0 1 10 10.582V12m-.01 3.008H10M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                              ></path>
                            </svg>
                            <div
                              role="tooltip"
                              className="hidden absolute bg-gray-600 text-gray-100 p-2 rounded-md text-xs -top-9 -left-16 transform -translate-x-1/2 w-32 group-hover:block"
                            >
                              <div
                                className="tooltip-arrow"
                                data-popper-arrow="true"
                              >
                                {userPackage.featuresToolTips[index]}
                              </div>
                            </div>
                          </span>
                        </li>
                      );
                    }
                  )}
                </ul>
              </div>
              <div className="flex-1  bg-gray-200 dark:bg-gray-700 p-3 rounded-md">
                <h3 className="text-base font-bold  dark:text-gray-300  pb-4 mb-4 rounded-t border-b  border-gray-300 dark:border-gray-600">
                  What you will get
                </h3>
                <ul className="flex flex-column gap-1 text-sm my-2 pl-0">
                  <li
                    key={`limitaions-1`}
                    className="flex flex-row justify-between  items-center"
                  >
                    <span className="block">Resume Generation</span>
                    <span className="block">
                      {userPackage.limit.resumes_generation}
                    </span>
                  </li>

                  <li
                    key={`limitaions-2`}
                    className="flex flex-row justify-between  items-center"
                  >
                    <span className="block">Keywords Generation</span>
                    <span className="block">
                      {userPackage.limit.keywords_generation}
                    </span>
                  </li>

                  <li
                    key={`limitaions-3`}
                    className="flex flex-row justify-between  items-center"
                  >
                    <span className="block">Headlines Generation</span>
                    <span className="block">
                      {userPackage.limit.headline_generation}
                    </span>
                  </li>

                  <li
                    key={`limitaions-4`}
                    className="flex flex-row justify-between items-center"
                  >
                    <span className="block">Job Descriptions</span>
                    <span className="block">
                      {userPackage.limit.job_desc_generation}
                    </span>
                  </li>

                  <li
                    key={`limitaions-5`}
                    className="flex flex-row justify-between  items-center"
                  >
                    <span className="block">About Generation</span>
                    <span className="block">
                      {userPackage.limit.about_generation}
                    </span>
                  </li>

                  <li
                    key={`limitaions-6`}
                    className="flex flex-row justify-between items-center"
                  >
                    <span className="block">Cover Letter</span>
                    <span className="block">
                      {userPackage.limit.cover_letter_generation}
                    </span>
                  </li>

                  <li
                    key={`limitaions-7`}
                    className="flex flex-row justify-between items-center"
                  >
                    <span className="block">Email Generation</span>
                    <span className="block">
                      {userPackage.limit.email_generation}
                    </span>
                  </li>

                  <li
                    key={`limitaions-8`}
                    className="flex flex-row justify-between  items-center"
                  >
                    <span className="block">Keyword Generation</span>
                    <span className="block">
                      {userPackage.limit.pdf_files_upload}
                    </span>
                  </li>

                  <li
                    key={`limitaions-9`}
                    className="flex flex-row justify-between  items-center"
                  >
                    <span className="block">Review Resume</span>
                    <span className="block">
                      {userPackage.limit.review_resume}
                    </span>
                  </li>

                  <li
                    key={`limitaions-10`}
                    className="flex flex-row justify-between  items-center"
                  >
                    <span className="block">Consulting Bids</span>
                    <span className="block">
                      {userPackage.limit.consulting_bids_generation}
                    </span>
                  </li>

                  <li
                    key={`limitaions-11`}
                    className="flex flex-row justify-between  items-center"
                  >
                    <span className="block">Can Edit Resume</span>
                    <span className="block">
                      {userPackage.limit.can_edit_resume ? "Yes" : "No"}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex flex-row justify-center items-center mt-4">
              <button
                onClick={() => setPreviewPopUpModel(!previewPopUpModel)}
                type="button"
                className="inline-flex items-center text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReadPackage;
