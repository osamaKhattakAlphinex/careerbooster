"use client";
import { ALL_TEMPLATES } from "@/helpers/templateProvider";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import RecentResumeCard from "@/components/dashboard/resume-builder/RecentResumeCard";
import { useDispatch, useSelector } from "react-redux";
import TemplateSlider from "@/components/dashboard/resume-templates/templateSlider";
import { useSession } from "next-auth/react";
import { setUserData } from "@/store/userDataSlice";
import { setResume } from "@/store/resumeSlice";
import DownloadService from "@/helpers/downloadFile";
import Link from "next/link";

const Template = () => {
  const params = useSearchParams();
  const { resume } = useSelector((state: any) => state);
  const { data: session } = useSession();
  const [refTop, setRefTop] = useState<number | null>(null);
  const [refLeft, setRefLeft] = useState<number | null>(null);
  const [scaleHeight, setScaleHeight] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);

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

  useLayoutEffect(() => {
    if (componentRef.current && isMobile) {
      const height = Math.floor(componentRef.current.offsetHeight * 0.5 + 90);
      setScaleHeight(height);
      const refTop = Math.floor(
        (540 / 2275) * componentRef.current.offsetHeight
      );
      setRefTop(refTop);
      const width = Math.floor((175 / 390) * window.innerWidth);
      setRefLeft(width);
    }
  }, [componentRef.current, templateId]);

  useLayoutEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="lg:ml-[234px] ml-0 px-[15px]">
      <RecentResumeCard componentRef={componentRef} templateId={templateId} />
      <div>
        <div className="flex justify-between items-center">
          <h2 className="text-sm font-bold text-gray-900 uppercase dark:text-white">
            Templates Designs
          </h2>
          <Link
            href="/resume-builder/templates"
            className="overflow-hidden text-white no-underline rounded-lg"
          >
            <div
              className={` font-bold bg-gradient-to-r w-fit from-[#b324d7] to-[#615dff] dark:border-none dark:border-0 border-[1px] dark:border-gray-950 bg-transparent grid gap-2 text-center py-1 px-2`}
            >
              All Templates1111
            </div>
          </Link>
        </div>
        <TemplateSlider
          templates={ALL_TEMPLATES.filter((template) => template.active)}
        />
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
              <div className="flex items-center justify-end md:justify-end gap-3 xs:pb-0 md:pb-4 sticky top-4 z-[35]">
                {/* <Link
                  className="no-underline"
                  href={`/resume-builder/preview-resume?templateId=${templateId}&resumeId=${resume.id}`}
                  >
                  
                  <div
                    className={`flex flex-row gap-2 items-center xs:flex-1 lg:text-sm text-xs lg:px-6 px-3 py-2 rounded-full  bg-[#e4e9f7]  dark:bg-[#18181b] text-gray-900  dark:text-gray-300 border-[1px] border-[#f0f0f0] `}
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
                  d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
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

              <div
                className="xs:relative"
                style={{
                  top: isMobile ? "-" + refTop + "px" : undefined,
                  left: isMobile ? "-" + refLeft + "px" : undefined,
                }}
              >
                <div
                  ref={componentRef}
                  className={` bg-white xs:scale-50 xs:w-[200%] xs:absolute md:relative  md:w-[100%]  w-[100%] md:top-[0px] md:left-[0px] md:scale-100 scale-100`}
                >
                  {ALL_TEMPLATES[templateId - 1].active ? (
                    ALL_TEMPLATES[templateId - 1].template({})
                  ) : (
                    <div className="grid w-full text-gray-700 place-content-center h-28">
                      <span className="block p-4 font-semibold uppercase border">
                        Template is In-Active
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className="xs:hidden md:flex justify-end py-3">
                <Link
                  href="/resume-builder/templates"
                  className="overflow-hidden text-white no-underline rounded-lg"
                >
                  <div
                    className={` font-bold bg-gradient-to-r w-fit from-[#b324d7] to-[#615dff] dark:border-none dark:border-0 border-[1px] dark:border-gray-950 bg-transparent grid gap-2 text-center py-1 px-2`}
                  >
                    All Templates
                  </div>
                </Link>
              </div>
            </>
          )}
      </div>
    </div>
  );
};

export default Template;
