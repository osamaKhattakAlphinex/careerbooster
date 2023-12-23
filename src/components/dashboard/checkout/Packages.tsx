"use client";

import { useEffect, useState } from "react";
import MonthlySubscriptionCard from "./MonthlySubscriptionCard";
import { useSelector } from "react-redux";
import axios from "axios";
import { UserPackageData } from "@/db/schemas/UserPackage";

interface Props {
  viewOnly?: boolean;
}

const Packages = ({ viewOnly }: Props) => {
  const [packages, setPackages] = useState<UserPackageData[]>([]);

  const userData = useSelector((state: any) => state.userData);
  // TODO STORE PACKAGES IN REDUX AND DONOT REREQUEST THEM IF ALREADY AVAILABLE

  const getAllPackages = () => {
    fetch("/api/checkout/getActivePackages", {
      method: "GET",
    }).then(async (resp: any) => {
      const res = await resp.json();
      let result;
      if (typeof res.result === "string") {
        result = await JSON.parse(res.result);
      } else {
        result = res.result;
      }
      setPackages(result);
    });
  };
  useEffect(() => {
    getAllPackages();
  }, []);

  return (
    <>
      {console.log(packages)}
      {packages &&
        packages?.map((pkg: UserPackageData) => (
          <MonthlySubscriptionCard
            key={pkg._id}
            userPackage={pkg}
            viewOnly={viewOnly ?? false}
            customer={{
              metadata: {
                packageId: pkg._id,
                email: userData?.email,
                phone: userData?.phone,
                name: userData?.firstName + " " + userData?.lastName,
              },
            }}
          />
        ))}
    </>
  );
};
export default Packages;
