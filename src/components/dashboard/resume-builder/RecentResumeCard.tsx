"use client";
import SingleRecentResumeCard from "./SingleRecentResumeCard";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import SwiperCore from "swiper/core";
import { emptyStateIcon, infoSmallIcon } from "@/helpers/iconsProvider";
import { useState } from "react";
import { useTourContext } from "@/context/TourContext";
SwiperCore.use([Pagination]);

const RecentResumeCard = ({
  source = "",
  componentRef,
  setFinished,
  templateId,
}: {
  source?: string;
  componentRef?: any;
  setFinished?: any;
  templateId?: number;
}) => {
  // redux
  const userData = useSelector((state: any) => state.userData);
  const [showDrop, setShowDrop] = useState(true);
  const { resumes } = userData;
  const { historyCardRef } = useTourContext();

  return (
    <>
      <div
        ref={(ref: any) => (historyCardRef.current = ref)}
        className="dark:bg-[#17151b] dark:text-white bg-[#00000015] text-gray-950 rounded-lg  mb-4 px-4 md:px-[24px] pt-[20px] pb-[20px] "
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <h1 className=" flex gap-2 font-semibold text-[16px] md:text-sm">
              YOUR RESUMES{" "}
            </h1>
            <div className="relative inset-0 cursor-pointer group">
              {infoSmallIcon}
              <div className="w-36 md:w-40 z-50 bg-gradient-to-r  from-[#B324D7] to-[#615DFF] font-medium xs:text-[10px] md:text-[12px] px-2 absolute xs:left-1 md:left-[0.895rem] xs:-top-12  md:-top-[54px]  hidden group-hover:block md:rounded-bl-none xs:rounded-bl-none  text-gray-100  mb-6 shadow-xl rounded-xl py-2  transition-all">
                The different resumes you create will be saved here.
              </div>
            </div>
          </div>

          {/* <div className="relative lg:w-[213px] w-[120px]">
            <input
              className="w-full pl-4 lg:h-[38px] lg:py-[8px] py-[6px] placeholder:text-[#5B5B5B] rounded-full border-[1px] border-[#312E37] placeholder-gray-400 text-white lg:text-[14px] text-[10px] focus:outline-none focus:border-zinc-600 bg-transparent"
              type="text"
              placeholder="Search here"
            />
            <div className="absolute inset-y-0 items-center hidden right-3 lg:flex">
              {searchIcon}
            </div>
          </div> */}
          <span
            className="cursor-pointer"
            onClick={() => setShowDrop(!showDrop)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className={`${
                showDrop
                  ? "w-5 h-5 transform rotate-180 transition-transform duration-300 ease-in-out"
                  : "w-5 h-5 transform transition-transform duration-300 ease-in-out "
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </span>
        </div>
        {!resumes && <p>Loading Resumes...</p>}
        {/* <div className="flex flex-col flex-wrap gap-4 lg:flex-row"> */}
        <div
          className={`flex gap-2 flex-row ${
            showDrop ? "block" : "hidden"
          } transition-transform duration-500 transform ${
            showDrop ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          {resumes.length > 0 ? (
            <Swiper
              slidesPerView={3}
              spaceBetween={15}
              navigation={true}
              modules={[Navigation]}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },
                640: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 3,
                },
                1080: {
                  slidesPerView: 3,
                },
                1280: {
                  slidesPerView: 3,
                },
              }}
              className="mySwiper"
            >
              {resumes &&
                resumes.map((resume: any) => (
                  <SwiperSlide key={resume.id}>
                    <SingleRecentResumeCard
                      key={resume.id}
                      resume={resume}
                      source={source}
                      componentRef={componentRef}
                      setFinished={setFinished}
                      templateId={templateId}
                    />
                  </SwiperSlide>
                ))}
            </Swiper>
          ) : (
            <div className="flex flex-col items-center justify-center w-full p-5 mt-1 space-y-2 text-gray-100/50">
              {emptyStateIcon}
              <p className="mt-4 text-sm font-semibold uppercase">
                No Resumes found
              </p>
              <p className="text-xs">
                You do not have any resumes yet. Your generated resumes will
                list here.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default RecentResumeCard;
