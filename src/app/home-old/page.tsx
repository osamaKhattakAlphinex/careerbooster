"use client";
import { useState } from "react";
import UploadPDFResume from "@/components/UploadPDFResume";
import DocumentPreview from "@/components/DocumentPreview";
import ChatWithPDF from "@/components/ChatWithPDF";
import Script from "next/script";
export default function Home() {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [uploadedFileName, setUploadedFileName] = useState<string>(
    "1691752044062_Resume-M-Suleman-Ibrahim.pdf"
  );
  const [resumeContent, setResumeContent] = useState<string>("");

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
      <div className="pt-12 ">
        <h1 className="text-center text-4xl font-extrabold text-gray-900 dark:text-white">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            AI
          </span>{" "}
          Resume Bot
        </h1>
      </div>
      <div className="p-14 font-sans ">
        <div className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
          {/* {activeStep === 1 && (
            <UploadPDFResume setUploadedFileName={setUploadedFileName} />
          )} */}
          {activeStep === 2 && (
            <>
              <DocumentPreview
                uploadedFileName={uploadedFileName}
                setResumeContent={setResumeContent}
              />
            </>
          )}
          {activeStep === 3 && (
            <>
              <ChatWithPDF uploadedFileName={uploadedFileName} />
            </>
          )}
          <hr className="mt-12" />
          <div className="grid grid-cols-6 gap-4 mt-4">
            <div className="col-start-1 col-end-3">
              <button
                type="button"
                disabled={activeStep === 1}
                className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 disabled:bg-gray-300"
                onClick={(e) => setActiveStep((p) => p - 1)}
              >
                Previous
              </button>
            </div>
            <div className="col-end-10 col-span-2">
              <button
                type="button"
                disabled={uploadedFileName === ""}
                className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 disabled:bg-gray-300"
                onClick={(e) => setActiveStep((p) => p + 1)}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
