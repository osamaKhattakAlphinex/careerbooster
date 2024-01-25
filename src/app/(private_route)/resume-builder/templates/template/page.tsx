"use client";
import { ALL_TEMPLATES } from "@/helpers/templateProvider";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import RecentResumeCard from "@/components/dashboard/resume-builder/RecentResumeCard";
import { useDispatch, useSelector } from "react-redux";
import { crownIcon } from "@/helpers/iconsProvider";
import TemplateSlider from "@/components/dashboard/resume-templates/templateSlider";
import { useSession } from "next-auth/react";
import { setUserData } from "@/store/userDataSlice";
import { setResume } from "@/store/resumeSlice";
import Link from "next/link";
import DownloadService from "@/helpers/downloadFile";

const Template = () => {
  const params = useSearchParams();
  const { resume } = useSelector((state: any) => state);
  const { data: session } = useSession();
  const [refTop, setRefTop] = useState<number | null>(null);
  const [refLeft, setRefLeft] = useState<number | null>(null);
  const [scaleHeight, setScaleHeight] = useState<number | null>(null);
  const templateId: number = parseInt(params.get("templateId") || "0");
  const componentRef = useRef<any>(null);
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

  useEffect(() => {
    if (componentRef.current) {
      const height = Math.floor(componentRef.current.offsetHeight * 0.5 + 90);
      setScaleHeight(height);
      const refTop = Math.floor(
        (516 / 2275) * componentRef.current.offsetHeight
      );
      setRefTop(refTop);
      const width = Math.floor((175 / 390) * window.innerWidth);
      setRefLeft(width);
    }
  }, [componentRef.current, templateId]);
  let isMobile = window.innerWidth <= 480;

  return (
    <div className="lg:ml-[234px] ml-0 px-[15px]">
      <RecentResumeCard componentRef={componentRef} templateId={templateId} />
      <div>
        <h2 className=" text-gray-900 dark:text-white font-bold uppercase text-sm">
          Templates Designs
        </h2>
        <TemplateSlider templates={ALL_TEMPLATES} />
      </div>

      <div
        id="outerScaleDiv"
        className="my-10"
        style={{
          height: isMobile ? scaleHeight + "px" : undefined,
        }}
      >
        {resume &&
          (resume?.name || resume?.contact?.email || resume?.summary) && (
            <>
              <div className="flex items-center justify-end xs:justify-center md:justify-end gap-3 xs:pb-0 md:pb-4 sticky top-3 z-[10555555555]">
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

              <div className="xs:relative">
                <div
                  ref={componentRef}
                  className={` bg-white xs:scale-50  xs:w-[200%] xs:absolute md:relative  md:w-[100%]  w-[100%] md:top-[0px] md:left-[0px] md:scale-100 scale-100`}
                  style={{
                    top: isMobile ? "-" + refTop + "px" : undefined,
                    left: isMobile ? "-" + refLeft + "px" : undefined,
                  }}
                >
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
