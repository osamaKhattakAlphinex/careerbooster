"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";

interface LimitCardProps {
  title: string;
  limit: number;
  used: number;
  setAvailablePercentage: React.Dispatch<React.SetStateAction<number>>;
  setPercentageCalculated: React.Dispatch<React.SetStateAction<boolean>>;
  availablePercentage: number;
}
const LimitCard: React.FC<LimitCardProps> = ({
  title,
  limit,
  used,
  setAvailablePercentage,
  setPercentageCalculated,
  availablePercentage,
}) => {
  // Redux
  const userData = useSelector((state: any) => state.userData);

  // set availalbe percentage when userdata changes
  useEffect(() => {
    const availableLimit = limit - used;
    const percentage = (availableLimit / limit) * 100;

    setAvailablePercentage(percentage);
    setPercentageCalculated(true);
  }, [userData, limit, used]);

  if (used >= limit) {
    return (
      // <div className="bg-red-500 px-3 py-1 rounded-3xl border-gray-950">
      <span className="text-sm text-red-500 ">Credit Limit Reached</span>
      // </div>
    );
  } else {
    return (
      <div className="">
        <div className="w-full flex mb-1">
          <span className="text-sm text-white uppercase font-bold">
            {title}
          </span>
          {!isNaN(limit) && !isNaN(used) && (
            <span className="text-sm uppercase font-bold text-[#B324D7] ml-1 ">
              {Number(limit) - Number(used)} out of {Number(limit)}
            </span>
          )}
        </div>
        {/* <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div
            className={`bg-${
              availablePercentage > 30 ? "green" : "red"
            }-600 h-2.5 rounded-full`}
            style={{
              width: `${availablePercentage}%`,
            }}
          ></div>
        </div> */}
      </div>
    );
  }
};
export default LimitCard;
