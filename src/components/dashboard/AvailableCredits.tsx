import { useAppContext } from "@/context/AppContext";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const AvailableCredits = () => {
  const userData = useSelector((state: any) => state.userData);
  const [userCurrentCredits, setUserCurrentCredits] = useState<number>(0);
  const [userCurrentTotalCredits, setUserCurrentTotalCredits] =
    useState<number>(0);
  const [creditPercentage, setCreditPercentage] = useState<number>(0);
  const getCredits = async () => {
    if (availableCredits || userCurrentCredits === 0) {
      const res = await fetch(
        `/api/users/getCreditLimits/?email=${userData.email}`
      );

      const response = await res.json();
      setUserCurrentCredits(response.result.userCredits);
      setUserCurrentTotalCredits(response.result.totalCredits);
      setCreditPercentage(
        Math.round(
          (response.result.userCredits / response.result.totalCredits) * 100
        )
      );
      setAvailableCredits(false);
    }
  };
  const { availableCredits, setAvailableCredits } = useAppContext();
  useEffect(() => {
    getCredits();
  }, [availableCredits]);

  const getBgColor = (creditPercentage: number) => {
    if (creditPercentage > 50 && creditPercentage <= 100) {
      return "bg-blue-600";
    } else if (creditPercentage > 25 && creditPercentage <= 50) {
      return "bg-yellow-600";
    } else if (creditPercentage >= 0 && creditPercentage <= 25) {
      return "bg-red-600";
    }
  };
  return (
    <div className="flex flex-col ">
      <div className=" flex justify-between items-center text-gray-950 dark:text-gray-100 mb-2">
        <h2 className=" text-sm font-semibold">Available Credits:</h2>
        <h3 className=" text-xs italic ml-2">
          {userCurrentCredits}/{userCurrentTotalCredits}
        </h3>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700 mb-6">
        <div
          className={`${getBgColor(creditPercentage)} h-1.5 rounded-full`}
          style={{ width: `${creditPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default AvailableCredits;
