"use client";

import { useEffect, useState } from "react";
import MonthlySubscriptionCard from "./MonthlySubscriptionCard";
import { useSelector } from "react-redux";
import axios from "axios";
import { UserPackageData } from "@/db/schemas/UserPackage";
import { useSession } from "next-auth/react";

interface Props {
  viewOnly?: boolean;
}

const Packages = ({ viewOnly }: Props) => {
  const { data: session, status } = useSession();
  const [packages, setPackages] = useState<UserPackageData[]>([]);

  const userData = useSelector((state: any) => state.userData);

  // TODO STORE PACKAGES IN REDUX AND DONOT REREQUEST THEM IF ALREADY AVAILABLE

  const getAllPackages = () => {
    axios.get("/api/checkout/getActivePackages").then((resp) => {
      setPackages(resp.data.packages);
    });
  };
  useEffect(() => {
    getAllPackages();
  }, []);

  return (
    <>
      {packages &&
        packages.map((pkg: UserPackageData) => (
          <MonthlySubscriptionCard
            key={pkg._id}
            userPackage={pkg}
            viewOnly={viewOnly ?? false}
            customer={{
              metadata: {
                packageId: pkg._id,
                email: userData.email,
                phone: userData.phone,
                name: userData.firstName + " " + userData.lastName,
              },
            }}
          />
        ))}
    </>
  );
};
export default Packages;
