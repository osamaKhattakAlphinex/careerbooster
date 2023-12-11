import { getFormattedDate } from "@/helpers/getFormattedDateTime";
import Image from "next/image";
import React from "react";

type NotificationType = {
  sender: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
};

const data = [
  {
    sender: "Ai Resume Booster",
    id: 1,
    title: "New Message",
    message: "You have a new message from Career Booster AI.",
    timestamp: "2023-12-11T08:30:00Z",
    read: true,
  },
  {
    sender: "Muhammad Usama ",
    id: 2,
    title: "Reminder",
    message: "Don't forget to attend the meeting at 10 AM.",
    timestamp: "2023-12-12T09:45:00Z",
    read: false,
  },
  {
    sender: "Rehmant Ullah Khan",
    id: 3,
    title: "Task Completed",
    message: "Task #123 is completed.",
    timestamp: "2023-12-13T15:20:00Z",
    read: false,
  },
];

const Notification = ({
  read,
  sender,
  title,
  timestamp,
  message,
}: NotificationType) => {
  return (
    <div
      className={`p-2 rounded-md flex-col flex ${
        read ? "bg-[#2a2a2c]" : "bg-[#16161a]"
      }`}
    >
      <div className="flex flex-row justify-start items-center gap-4">
        <div className="h-12 w-12 rounded-full grid place-content-center bg-white/5">
          <Image width={24} height={24} src={"/logo.svg"} alt="sender" />
        </div>
        <div className="text-xs text-slate-500">
          <h3 className="text-slate-300 text-sm">{sender}</h3>
          <p className="text-[#e194f4] text-xs">{title}</p>
          {getFormattedDate(timestamp)}
        </div>
      </div>
    </div>
  );
};

const Notifications = () => {
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
        {/* {data.map((item) => (
          <Notification key={item.id} {...item} />
        ))} */}
        <span className="text-white">Nothing here </span>
      </div>
      {/* </div> */}
    </>
  );
};

export default Notifications;
