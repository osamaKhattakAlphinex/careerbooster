"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CreditSubscriptionCard from "./CreditSubscriptionCard";
import { CreditsPackageData } from "@/db/schemas/CreditsPackage";

interface Props {
  viewOnly?: boolean;
}

const CreditPackages = ({ viewOnly }: Props) => {
  const [packages, setPackages] = useState<CreditsPackageData[]>([]);

  const userData = useSelector((state: any) => state.userData);
  // TODO STORE PACKAGES IN REDUX AND DONOT REREQUEST THEM IF ALREADY AVAILABLE

  const getAllPackages = () => {
    fetch("/api/getActivePackages", {
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
      {userData.creditPackage && packages ? (
        <>
          {packages?.slice(1).map((pkg: CreditsPackageData) => (
            <CreditSubscriptionCard
              key={pkg._id}
              creditPackage={pkg}
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
      ) : (
        packages &&
        packages?.map((pkg: CreditsPackageData) => (
          <CreditSubscriptionCard
            key={pkg._id}
            creditPackage={pkg}
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
        ))
      )}
    </>
  );
};
export default CreditPackages;
