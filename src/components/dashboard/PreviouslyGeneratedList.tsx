"use client";
import { infoSmallIcon, searchIcon } from "@/helpers/iconsProvider";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

type Props = {
  dataSource: string;
  Component: any;
};

const PreviouslyGeneratedList = ({ dataSource, Component }: Props) => {
  const userData = useSelector((state: any) => state.userData);
  const [showDrop, setShowDrop] = useState(true);
  if (!userData) return;
  const pagination = {
    clickable: true,
    renderBullet: function (index: any, className: any) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  };

  return (
    <div className="dark:bg-[#17151b] dark:text-white  bg-[#00000015] text-gray-950  rounded-[20px]  mb-7 px-4 lg:px-[24px] pt-[20px] pb-[20px] z-0">
      <div className="flex gap-3 items-center justify-between">
        <div className="flex gap-2 items-center">
          <h1 className=" flex justify-center text-[14px] md:text-sm font-semibold lg:pr-0 pr-4">
            {dataSource === "coverLetters" && "RECENT COVER LETTERS"}
            {dataSource === "emails" && "RECENT EMAILS"}
            {dataSource === "consultingBids" && "RECENT BIDS"}
            {dataSource === "resume" && "RECENT RESUME"}
            {dataSource === "linkedInHeadlines" && "RECENT HEADLINES"}
            {dataSource === "linkedInAbouts" && "RECENT ABOUTS"}
            {dataSource === "linkedInJobDescriptions" && "RECENT DESCRIPTIONS"}
            {dataSource === "linkedInKeywords" && "RECENT KEYWORDS"}
          </h1>
          {dataSource === "coverLetters" && (
            <div className="group flex md:ml-1 cursor-pointer relative inset-0">
              {infoSmallIcon}
              <div className="w-40 md:w-44 bg-gradient-to-r  from-[#B324D7] to-[#615DFF] font-medium xs:text-[10px] md:text-[12px] px-2 absolute xs:-left-[9.75rem] md:left-[14px] xs:-top-[64px]  z-[2000]  md:-top-[4.5rem]  hidden group-hover:block md:rounded-bl-none xs:rounded-br-none md:rounded-br-xl text-gray-100  mb-6 shadow-xl rounded-xl py-2  transition-all">
                Every cover letter you generate is stored here for easy future
                access.
              </div>
            </div>
          )}
          {dataSource === "emails" && (
            <div className="group flex md:ml-1 cursor-pointer relative inset-0">
              {infoSmallIcon}
              <div className="w-40 md:w-44 bg-gradient-to-r  from-[#B324D7] to-[#615DFF] font-medium xs:text-[10px] md:text-[12px] px-2 absolute xs:-left-[9.75rem] md:left-[14px] xs:-top-[64px]  z-[2000]  md:-top-[4.5rem]  hidden group-hover:block md:rounded-bl-none xs:rounded-br-none md:rounded-br-xl text-gray-100  mb-6 shadow-xl rounded-xl py-2  transition-all">
                Every Email you generate is stored here for easy future access.
              </div>
            </div>
          )}
        </div>

        {/* <div className="relative lg:w-[213px] w-[120px] flex">
          <input
            className="w-full pl-4 lg:h-[38px] lg:py-[8px] py-[6px]
            placeholder:text-[#5B5B5B] rounded-full border-[1px] border-[#312E37] placeholder-gray-400 text-white lg:text-[14px] text-[10px] focus:outline-none focus:border-zinc-600 bg-transparent"
            type="text"
            placeholder="Search here"
          />
          <div className="absolute inset-y-0 right-3   items-center lg:flex hidden">
            {searchIcon}
          </div>
        </div> */}
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
      </div>
    </div>
  );
};

export default PreviouslyGeneratedList;
