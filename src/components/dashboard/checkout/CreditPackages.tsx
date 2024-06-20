"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CreditSubscriptionCard from "./CreditSubscriptionCard";
import { CreditsPackageData } from "@/db/schemas/CreditsPackage";
import axios from "axios";

interface Props {
  viewOnly?: boolean;
}

const CreditPackages = ({ viewOnly }: Props) => {
  const [packages, setPackages] = useState<CreditsPackageData[]>([]);

  const userData = useSelector((state: any) => state.userData);
  // TODO STORE PACKAGES IN REDUX AND DONOT REREQUEST THEM IF ALREADY AVAILABLE

  const getAllPackages =async () => {
   try {
    
     const response = await axios.get("/api/getActivePackages")
     if(response.data.success){
      let data
      if (typeof response.data.result === "string") {
        data = await JSON.parse(response.data.result);
      } else {
        data = response.data.result;
      }
      setPackages(data);
     }
   } catch (error) {
    
   }
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
