"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";

interface LimitCardProps {
  setAvailablePercentage: React.Dispatch<React.SetStateAction<number>>;
  setPercentageCalculated: React.Dispatch<React.SetStateAction<boolean>>;
  availablePercentage: number;
}
const LimitCard: React.FC<LimitCardProps> = ({
  setAvailablePercentage,
  setPercentageCalculated,
  availablePercentage,
}) => {
  // Redux
  const userData = useSelector((state: any) => state.userData);

  // set availalbe percentage when userdata changes
  useEffect(() => {
    if (userData?.userPackage && userData?.userPackageUsed) {
      const availableLimit =
        userData?.userPackage?.limit?.resumes_generation -
        userData?.userPackageUsed?.resumes_generation;
      const percentage =
        (availableLimit / userData?.userPackage?.limit?.resumes_generation) *
        100;

      setAvailablePercentage(percentage);
      setPercentageCalculated(true);
    }
  }, [userData]);

  return (
    <div className="w-1/3">
      <div className="w-full flex justify-between mb-1">
        <span className="text-base font-medium ">Generations Available</span>
        {!isNaN(userData?.userPackage?.limit?.resumes_generation) &&
          !isNaN(userData?.userPackageUsed?.resumes_generation) && (
            <span className="text-sm font-medium ">
              {Number(userData?.userPackage?.limit?.resumes_generation) -
                Number(userData?.userPackageUsed?.resumes_generation)}{" "}
              out of {Number(userData?.userPackage?.limit?.resumes_generation)}
            </span>
          )}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div
          className={`bg-${
            availablePercentage > 30 ? "green" : "red"
          }-600 h-2.5 rounded-full`}
          style={{
            width: `${availablePercentage}%`,
          }}
        ></div>
      </div>
    </div>
  );
};
export default LimitCard;
