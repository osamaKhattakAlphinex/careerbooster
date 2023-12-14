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
      <span className="text-[11px] md:text-sm text-red-500 ">
        Credit Limit Reached
      </span>
    );
  } else {
    return (
      <div className="">
        <div className="w-full flex mb-1">
          <span className="text-[11px] md:text-sm card-h2 uppercase font-bold">
            {title}
          </span>
          {!isNaN(limit) && !isNaN(used) && (
            <span className="text-[11px] md:text-sm uppercase font-bold text-[#B324D7] ml-1 ">
              {Number(limit) - Number(used)} out of {Number(limit)}
            </span>
          )}
        </div>
      </div>
    );
  }
};
export default LimitCard;
