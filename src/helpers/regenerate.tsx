"use client";
import React, { ReactNode } from "react";

type RegenerateType = {
  children: ReactNode;
  handler: (args: any) => void;
};

const Regenerate = ({ children, handler }: any) => {
  return (
    <div className="relative group">
      {children}
      <div className=" group-hover:grid hidden absolute right-1 top-1 h-10 w-10 bg-rose-700 rounded  place-content-center ">
        <button className=" text-white" onClick={() => handler()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Regenerate;
