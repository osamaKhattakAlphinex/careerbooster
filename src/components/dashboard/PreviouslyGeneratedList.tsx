"use client";
import {
  infoSmallIcon,
  searchIcon,
  emptyStateIcon,
} from "@/helpers/iconsProvider";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useTourContext } from "@/context/TourContext";

type Props = {
  dataSource: string;
  Component: any;
};

const PreviouslyGeneratedList = ({ dataSource, Component }: Props) => {
  const userData = useSelector((state: any) => state.userData);
  const { historyCardRef } = useTourContext();

  const getDataSourceText = (dataSource: string) => {
    switch (dataSource) {
      case "linkedInHeadlines":
        return "linkedin headlines";
      case "linkedInAbouts":
        return "linkedin abouts";
      case "linkedInJobDescriptions":
        return "linkedin job descriptions";
      case "linkedInKeywords":
        return "linkedin keywords";
      case "resume":
        return "resume";
      case "consultingBids":
        return "consulting bids";
      case "emails":
        return "emails";
      case "coverLetters":
        return "cover letters";
      case "resumes":
        return "resumes";
      default:
        return dataSource;
    }
  };

  const [showDrop, setShowDrop] = useState(true);
  const sourceText = getDataSourceText(dataSource);

  if (!userData) return;
  const pagination = {
    clickable: true,
    renderBullet: function (index: any, className: any) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  };

  return (
    <div
      ref={(ref: HTMLDivElement) => (historyCardRef.current = ref)}
      className="dark:bg-[#17151b] dark:text-white  bg-[#00000015] text-gray-950  rounded-lg  mb-7 px-4 lg:px-[24px] pt-[20px] pb-[20px] z-0"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <h1 className=" flex justify-center uppercase text-[14px] md:text-sm font-semibold lg:pr-0 pr-4">
            RECENT {sourceText}
          </h1>
          {dataSource === "coverLetters" && (
            <div className="relative inset-0 flex cursor-pointer group md:ml-1">
              {infoSmallIcon}
              <div className="w-40 md:w-44 bg-gradient-to-r  from-[#B324D7] to-[#615DFF] font-medium xs:text-[10px] md:text-[12px] px-2 absolute xs:-left-[9.75rem] md:left-[14px] xs:-top-[64px]  z-[2000]  md:-top-[4.5rem]  hidden group-hover:block md:rounded-bl-none xs:rounded-br-none md:rounded-br-xl text-gray-100  mb-6 shadow-xl rounded-xl py-2  transition-all">
                Every cover letter you generate is stored here for easy future
                access.
              </div>
            </div>
          )}
          {dataSource === "emails" && (
            <div className="relative inset-0 flex cursor-pointer group md:ml-1">
              {infoSmallIcon}
              <div className="w-40 md:w-44 bg-gradient-to-r  from-[#B324D7] to-[#615DFF] font-medium xs:text-[10px] md:text-[12px] px-2 absolute xs:-left-[9.75rem] md:left-[14px] xs:-top-[64px]  z-[2000]  md:-top-[4.5rem]  hidden group-hover:block md:rounded-bl-none xs:rounded-br-none md:rounded-br-xl text-gray-100  mb-6 shadow-xl rounded-xl py-2  transition-all">
                Every Email you generate is stored here for easy future access.
              </div>
            </div>
          )}
        </div>

        <span className="cursor-pointer" onClick={() => setShowDrop(!showDrop)}>
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
      <div
        className={`flex gap-2 flex-row ${
          showDrop ? "block" : "hidden"
        } transition-transform duration-500 transform ${
          showDrop ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {userData?.[dataSource]?.length > 0 ? (
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
            {userData &&
              userData?.[dataSource]?.map((item: any, key: number) => {
                return (
                  <SwiperSlide
                    key={key}
                    className="xs:w-[100%] sm:w-[100%] md:w-[48%] lg:w-[30%] "
                  >
                    <Component {...item} />
                  </SwiperSlide>
                );
              })}
          </Swiper>
        ) : (
          <div className="flex flex-col items-center justify-center w-full p-5 mt-1 space-y-2 text-gray-100/50">
            {emptyStateIcon}
            <p className="mt-4 text-sm font-semibold uppercase">
              No {sourceText} found
            </p>
            <p className="text-xs">
              You do not have any {sourceText} yet. Your generated {sourceText}{" "}
              will list here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviouslyGeneratedList;
