"use client";
import { searchIcon } from "@/helpers/iconsProvider";
import React from "react";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, FreeMode } from "swiper/modules";
// import './styles.css';

type Props = {
  dataSource: string;
  Component: any;
};

const PreviouslyGeneratedList = ({ dataSource, Component }: Props) => {
  const userData = useSelector((state: any) => state.userData);

  if (!userData) return;
  const pagination = {
    clickable: true,
    renderBullet: function (index: any, className: any) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  };

  return (
    <div className="single-service-bg  rounded-[20px]  mb-7 px-4 lg:px-[24px] pt-[35px] pb-[20px] z-0">
      <div className="flex justify-between items-center ">
        <h1 className="uppercase text-[14px] md:text-sm font-semibold lg:pr-0 pr-4">
          {dataSource === "coverLetters" && "Your AI Generated Cover Letters"}
          {dataSource === "emails" && "Your AI Generated Emails"}
          {dataSource === "consultingBids" && "Your AI Generated Bids"}
          {dataSource === "resume" && "Your AI Generated Resume"}
        </h1>
        <div className="relative lg:w-[213px] w-[120px] flex">
          <input
            className="w-full pl-4 lg:h-[38px] lg:py-[8px] py-[6px] placeholder:text-[#5B5B5B] rounded-full border border-[#312E37] placeholder-gray-400 text-white lg:text-[14px] text-[10px] focus:outline-none focus:border-zinc-600 bg-transparent"
            type="text"
            placeholder="Search here"
          />
          <div className="absolute inset-y-0 right-3   items-center lg:flex hidden">
            {searchIcon}
          </div>
        </div>
      </div>

      <div className="flex gap-2 flex-row  ">
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

      {/* <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        <SwiperSlide className="border-2">Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      </Swiper> */}
    </div>
  );
};

export default PreviouslyGeneratedList;
