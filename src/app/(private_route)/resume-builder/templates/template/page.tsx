"use client";
import { ALL_TEMPLATES } from "@/helpers/templateProvider";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import RecentResumeCard from "@/components/dashboard/resume-builder/RecentResumeCard";
import { useDispatch, useSelector } from "react-redux";
import { crownIcon } from "@/helpers/newIconsProviders";
import TemplateSlider from "@/components/dashboard/resume-templates/templateSlider";
import { useSession } from "next-auth/react";
import { setUserData } from "@/store/userDataSlice";
import { setResume } from "@/store/resumeSlice";
import Link from "next/link";
import DownloadService from "@/helpers/downloadFile";

const Template = () => {
  const params = useSearchParams();
  const { resume } = useSelector((state: any) => state);
  const [openUpgradeModal, setOpenUpgradModal] = useState<boolean>(false);
  const { data: session } = useSession();
  const templateId: number = parseInt(params.get("templateId") || "0");
  const componentRef = useRef(null);
  const dispatch = useDispatch();

  const fetchDefaultResume = async () => {
    const res = await fetch(
      `/api/users/getOneByEmail?email=${session?.user?.email}`
    );

    const { result, success } = await res.json();

    if (success) {
      dispatch(setUserData(result));
      dispatch(setResume(result.resumes[0]));
    }
  };

  useEffect(() => {
    if (!resume.id) {
      fetchDefaultResume();
    }
  }, []);

  return (
    <div className="lg:ml-[234px] ml-0 px-[15px]">
      {/* <UpgradeModal
        openUpgradationModal={openUpgradeModal}
        setOpenUpgradationModal={setOpenUpgradModal}
      /> */}
      <RecentResumeCard componentRef={componentRef} templateId={templateId} />
      <div>
        <h2 className=" text-gray-900 dark:text-white font-bold uppercase text-sm">
          Templates Designs
        </h2>
        <TemplateSlider templates={ALL_TEMPLATES} />
      </div>
      <div className="my-10">
        {resume &&
          (resume?.name || resume?.contact?.email || resume?.summary) && (
            <>
              <div className="flex items-center justify-end gap-3 pb-4">
                {/* <Link
                  className="no-underline"
                  href={`/resume-edit?templateId=${templateId}&resumeId=${resume.id}`}
                  target="_blank"
                >
                  <div
                    className={`lg:text-[14px] text-[12px] lg:px-8 px-5 py-2 rounded-full dark:bg-[#18181b] bg-transparent text-green-500 border-[1px] border-green-500`}
                  >
                    Preview Resume
                  </div>
                </Link> */}
                <DownloadService
                  componentRef={componentRef}
                  fileName="ai-resume"
                  preview={true}
                />
                <DownloadService
                  componentRef={componentRef}
                  fileName="ai-resume"
                  preview={false}
                />
              </div>

              <div className="relative">
                {ALL_TEMPLATES[templateId - 1].category === "premium" && (
                  <div className="absolute rounded-full right-1 top-1 h-10 w-10 grid place-content-center bg-yellow-600">
                    {crownIcon}
                  </div>
                )}

                <div ref={componentRef} className=" bg-white">
                  {ALL_TEMPLATES[templateId - 1].template({})}
                </div>
              </div>
            </>
          )}
      </div>
    </div>
  );
};

export default Template;
