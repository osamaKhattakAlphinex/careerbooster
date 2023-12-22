"use client";
import { getFormattedDate } from "@/helpers/getFormattedDateTime";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Notification = (item: any) => {
  return (
    <div
      className={`p-2 rounded-md flex-col flex ${
        item.read ? "bg-[#2a2a2c]" : "bg-[#16161a]"
      }`}
    >
      <div className="flex flex-row justify-start items-center gap-4">
        <div className="h-12 w-12 rounded-full grid place-content-center bg-white/5">
          <Image width={24} height={24} src={"/logo.svg"} alt="sender" />
        </div>
        <div className="text-xs text-slate-500">
          <h3 className="text-slate-300 text-sm">{item.sender}</h3>
          <p className="text-[#e194f4] text-xs">{item.title}</p>
          <p className="text-[#e194f4] text-xs">{item.message}</p>
          {/* {getFormattedDate(timestamp)} */}
        </div>
      </div>
    </div>
  );
};

const Notifications = () => {
  const [data, setData] = useState([]);
  // console.log("data", data);

  useEffect(() => {
    // Function to fetch data from an API
    const fetchData = async () => {
      try {
        const response = await fetch("/api/notifications"); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result.result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      {/* <div className="flex flex-col items-start"> */}
      <div className="flex flex-row  justify-between items-center">
        <div>
          <h3 className="text-sm text-white font-bold inline">
            Notifications/Updates
          </h3>
          {/* <span className="ml-3 px-2 py-1 rounded bg-[#B324D7] text-xs text-white inline">
            7
          </span> */}
        </div>
        <div>
          <button className="text-[#E1E562] text-xs">Mark all as read</button>
        </div>
      </div>
      {/* list */}
      <div className="flex flex-col gap-1 mt-3">
        {data.length >= 0 ? (
          data.map((item: any) => <Notification key={item._id} {...item} />)
        ) : (
          <span className="text-white">Nothing here</span>
        )}
        {/* {data.map((item: any) => {
          return <Notification key={item._id} {...item} />;
        })} */}
      </div>
      {/* </div> */}
    </>
  );
};

export default Notifications;
