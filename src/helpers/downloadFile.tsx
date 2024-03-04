"use client";
//v1.0
import { useRef, useState } from "react";

const DownloadService = ({
  icon,
  className,
  componentRef,
  view,
  card,
  type,
  fileName,
  preview,
}: // setOpenUpgradModal,
any) => {
  const docRef = useRef<any>(null);
  let htmlToDoc: string;
  const [loading, setLoading] = useState(false);

  const templateCall = async () => {
    setLoading(true);
    if (card && type) {
      if (type === "coverLetter") {
        htmlToDoc = `
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
        body {
          padding: 24px;
        }</style>
        ${card.coverLetterText}
        `;
      } else if (type === "email") {
        htmlToDoc = `
        <script src="https://cdn.tailwindcss.com"></script>
         <style>
        body {
          padding: 24px;
        }</style>
        ${card.emailText}
        `;
      } else if (type === "consultingBid") {
        htmlToDoc = `
        <script src="https://cdn.tailwindcss.com"></script>\
         <style>
        body {
          padding: 24px;
        }</style>
        ${card.consultingBidText}
        `;
      }
    } else if (type === "onPage") {
      const html = componentRef.current.outerHTML;
      htmlToDoc = `
      <script src="https://cdn.tailwindcss.com"></script>
       <style>
        body {
          padding: 24px;
        }</style>      
      ${html}`;
    } else {
      if (view) {
        await view();
      }
      const html = componentRef.current.outerHTML;
      htmlToDoc = `
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
       
        [data-name="phone"]::before {
          content: "\\260E";
          font-family: "YourIconFontFamily", sans-serif;
          font-size: var(--text);
          color: #333;
          position: relative;
          top: 2px;
          margin-right: 10px;
        }
        [data-name="email"]::before {
          content: "\\2709";
          font-family: "YourIconFontFamily", sans-serif;
          font-size: var(--text);
          color: #333;
          position: relative;
          top: 2px;
          margin-right: 10px;
        }
        
       
        </style>
        ${html}`;
    }
    setLoading(true);
    await fetch(`/api/template`, {
      method: "POST",
      body: JSON.stringify({
        htmlToDoc,
      }),
    }).then(async (response: any) => {
      const res = await response.json();
      const arrayBufferView = new Uint8Array(res.result.data);
      const blob = new Blob([arrayBufferView], {
        type: "application/pdf",
      });
      const url = URL.createObjectURL(blob);
      docRef.current.href = url;
      if (!preview) {
        docRef.current.download = fileName;
      }
      // docRef.current.download = fileName;
      docRef.current.click();
      setLoading(false);
    });
  };

  return (
    <>
      <div className="hidden xs:block md:block">
        <a className="hidden" href="#" ref={docRef} target="_blank"></a>

        <button
          onClick={templateCall}
          type="button"
          disabled={loading}
          className={`flex flex-row gap-2 items-center xs:flex-1 lg:text-sm text-xs lg:px-6 px-3 py-2 rounded-full  bg-[#e4e9f7]  dark:bg-[#18181b] text-gray-900  dark:text-gray-300 border-[1px] border-[#f0f0f0]  ${
            loading ? "cursor-not-allowed opacity-50" : ""
          }`}
          style={{
            borderColor: "white",
          }}
        >
          <div>
            {preview ? (
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
                  d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            ) : (
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
                  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>
            )}
          </div>
          {preview ? "Print Preview " : loading ? "Downloading..." : "Download"}
        </button>
      </div>
    </>
  );
};

export default DownloadService;
