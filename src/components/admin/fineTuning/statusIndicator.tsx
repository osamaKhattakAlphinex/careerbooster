"use client";

import React from "react";

const StatusIndicator = ({ status }: { status: string| null }) => {
  let statusColorClass = "";

  switch (status) {
    case "validating_files":
      statusColorClass = "bg-blue-500";
      break;
    case "queued":
      statusColorClass = "bg-yellow-500";
      break;
    case "running":
      statusColorClass = "bg-teal-500";
      break;
    case "succeeded":
      statusColorClass = "bg-green-500"; // You can choose appropriate color class
      break;
    case "failed":
      statusColorClass = "bg-red-500";
      break;
    case "cancelled":
      statusColorClass = "bg-orange-800";
      break;
    default:
      statusColorClass = "bg-indigo-500";
  }

  return (
    <div
      className={`text-xs rounded-md p-1 text-center font-bold text-white uppercase ${statusColorClass}`}
    >
      {status}
    </div>
  );
};

export default StatusIndicator;
