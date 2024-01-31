import React, { ReactNode } from "react";
interface ToolUsageProps {
  icon: any;
  title: string;
  description: string;
  linkText: string;
  link: string;
}

const ToolUsage: React.FC<ToolUsageProps> = ({
  icon,
  title,
  description,
  linkText,
  link,
}) => {
  return (
    <div className="w-3/12 xs:w-full  sm:w-full md:w-4/12 lg:w-3/12 xl:w-3/12 px-4 py-3 h-full">
      <div className=" w-[3.9rem] h-[3.9rem] my-5  flex-shrink-0 align-center justify-center rounded-xl border-[1px] p-2  dark:text-[#e6f85e] text-[#6a4dff] dark:border-gray-600 border-gray-700 border-opacity-10 bg-[#464f6f] bg-opacity-[0.1] dark:bg-opacity-[0.2] ">
        {icon}
      </div>
      <div className="">
        <h5 className="mb-4 text-gray-950 font-bold dark:text-gray-100 text-[1.40rem]">
          {title}
        </h5>
        <p className="mb-0 text-gray-950 dark:text-gray-400 text-[18px] ">
          {description}
        </p>
      </div>
      <div className="flex-shrink-0 my-5">
        <a
          href={link}
          className="inline-flex no-underline justify-center group items-center relative  text-[#6a4dff] dark:text-[#e6f85e] gap-3 dark:after:bg-[#e6f85e] after:bg-[#0000ff9c] hover:text-[#6a4dff] after:content[''] after:absolute after:-bottom-[2px] after:left-0 after:w-0 after:h-[1px] after:ease-in-out after:duration-300  hover:after:w-[100%]"
        >
          <span className="group-hover:text-[#6a4dff] text-[16px]">
            {linkText}
          </span>
          <svg
            className="w-[1rem] h-[1rem] group-hover:text-[#6a4dff]"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 12.6667L12.6667 4M12.6667 4V12.32M12.6667 4H4.34667"
              stroke="currentColor"
              strokeWidth="1.21"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default ToolUsage;
