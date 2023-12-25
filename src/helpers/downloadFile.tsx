"use client";

import { useRef } from "react";

const DownloadService = ({ componentRef, view, card, type, fileName }: any) => {
  const docRef = useRef<any>(null);
  let htmlToDoc: string;

  const templateCall = async () => {
    if (card && type) {
      if (type === "coverLetter") {
        htmlToDoc = `
        <script src="https://cdn.tailwindcss.com"></script>
        ${card.coverLetterText}
        `;
      } else if (type === "email") {
        htmlToDoc = `
        <script src="https://cdn.tailwindcss.com"></script>
        ${card.emailText}
        `;
      } else if (type === "consultingBid") {
        htmlToDoc = `
        <script src="https://cdn.tailwindcss.com"></script>
        ${card.consultingBidText}
        `;
      }
    } else if (type === "onPage") {
      const html = componentRef.current.outerHTML;
      htmlToDoc = `
      <script src="https://cdn.tailwindcss.com"></script>
      
      ${html}`;
    } else {
      await view();
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

    const formData = new FormData();
    formData.append("htmlToDoc", htmlToDoc);
    await fetch(`/api/template`, {
      method: "POST",
      body: formData,
    }).then(async (response: any) => {
      const res = await response.json();
      const arrayBufferView = new Uint8Array(res.result.data);
      const blob = new Blob([arrayBufferView], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      docRef.current.href = url;
      docRef.current.download = fileName;
      docRef.current.click();
    });
  };

  return (
    <div>
      <a className="" href="#" ref={docRef} target="_blank"></a>
      <button
        onClick={templateCall}
        type="button"
        className="lg:text-[14px] text-[12px]  lg:px-8 px-5 py-2 rounded-full dark:bg-[#18181b] bg-transparent text-green-500 border border-green-500"
      >
        Download
      </button>
    </div>
  );
};

export default DownloadService;
