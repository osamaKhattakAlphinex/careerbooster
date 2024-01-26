"use client";

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
        .parent .child {
            display: none;
        }
        .parent:hover .child {
            display: block; 
        }</style>
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
      <div>
        <a className="hidden" href="#" ref={docRef} target="_blank"></a>

        <button
          onClick={templateCall}
          type="button"
          disabled={loading}
          className={`xs:flex-1 lg:text-sm text-xs lg:px-6 px-3 py-2 rounded-full dark:bg-[#18181b]  text-gray-300 border-[1px]  ${
            loading ? "cursor-not-allowed opacity-50" : ""
          }`}
        >
          <div>{icon}</div>
          {preview ? "Preview " : loading ? "Downloading..." : "Download"}
        </button>
      </div>
    </>
  );
};

export default DownloadService;
