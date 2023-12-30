"use client";

import UpgradeModal from "@/components/upgradeModal";
import { ALL_TEMPLATES } from "@/helpers/templateProvider";
import { setUpgradeModal } from "@/store/appSlice";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPackageID } from "@/ServerActions";

const DownloadService = ({
  componentRef,
  view,
  card,
  type,
  fileName,
  templateId,
}: // setOpenUpgradModal,
  any) => {
  const docRef = useRef<any>(null);

  let htmlToDoc: string;
  const userData = useSelector((state: any) => state.userData);
  const dispatch = useDispatch();
  const [openUpgradeModal, setOpenUpgradModal] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const templateCall = async () => {
    setLoading(true);
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
      // let category;
      // if (templateId) {
      //   category = ALL_TEMPLATES[templateId - 1].category;
      // }
      // if (
      //   category === "premium" &&
      //   userData.userPackage === await getPackageID()
      // ) {
      //   dispatch(setUpgradeModal(true));
      // } else {
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
      const formData = new FormData();
      formData.append("htmlToDoc", htmlToDoc);
      setLoading(true);
      await fetch(`/api/template`, {
        method: "POST",
        body: formData,
      }).then(async (response: any) => {
        const res = await response.json();
        const arrayBufferView = new Uint8Array(res.result.data);
        const blob = new Blob([arrayBufferView], {
          type: "application/pdf",
        });
        const url = URL.createObjectURL(blob);
        docRef.current.href = url;
        docRef.current.download = fileName;
        docRef.current.click();
        setLoading(false);
      });
      // }
    }
  };

  return (
    <>
      <UpgradeModal
        openUpgradationModal={openUpgradeModal}
        setOpenUpgradationModal={setOpenUpgradModal}
      />
      <div>
        <a className="hidden" href="#" ref={docRef} target="_blank"></a>
        <button
          onClick={templateCall}
          type="button"
          disabled={loading}
          className={`lg:text-[14px] text-[12px] lg:px-8 px-5 py-2 rounded-full dark:bg-[#18181b] bg-transparent text-green-500 border border-green-500 ${loading ? "cursor-not-allowed opacity-50" : ""
            }`}
        >
          {loading ? "Downloading..." : "Download"}
        </button>
      </div>
    </>
  );
};

export default DownloadService;
