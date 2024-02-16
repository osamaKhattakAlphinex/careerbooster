"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setField, setUserData } from "@/store/userDataSlice";
import { getUserCreditsByEmail } from "@/helpers/getUserCreditsByEmail";

const UpdateCreditPackage = ({ customer }: any) => {
  const router = useRouter();
  const [updating, setUpdating] = useState(false);

  // redux
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.userData);

  const updatePackage = async () => {
    if (!updating) {
      setUpdating(true);
      const res = await fetch(
        `/api/users/getCreditLimits/?email=${userData.email}`
      );
      const response = await res.json();
      const userCurrentCredits = response.result.userCredits;
      const userCurrentTotalCredits = response.result.totalCredits;

      const creditPackage = await getCreditPackageDetails(customer.packageId);

      if (creditPackage) {
        const obj = {
          email: customer.email,
          creditPackage: creditPackage._id,
          userCredits:
            (userCurrentCredits ? userCurrentCredits : 0) +
            creditPackage.totalCredits,
          totalCredits:
            (userCurrentTotalCredits ? userCurrentTotalCredits : 0) +
            creditPackage.totalCredits,
            
        };

        // TODO!! move this code to backeND
        return axios
          .post("/api/users/updateUserData", {
            data: obj,
          })
          .then(async (resp: any) => {
            dispatch(
              setUserData({
                ...userData,
                creditPackage: obj.creditPackage,
                userCredits: obj.userCredits,
              })
            );

            makePaymentEntry(creditPackage);

            // TODO!!! Add new user subsription to db
            // TODO!! invalidate session on stripe
          });
      }
    }
  };

  const makePaymentEntry = async (creditPackage: any) => {
    axios
      .post("/api/payment", {
        data: {
          userEmail: userData.email,
          amountPaid: creditPackage.amount,
          PackageId: creditPackage._id,
        },
      })
      .then(async (resp: any) => {
        router.push("/dashboard");
      });
  };
  useEffect(() => {
    if (customer && customer.email) {
      // TODO: update the user package in the database
      updatePackage();
    }
  }, [customer]);

  const getCreditPackageDetails = async (packageId: string) => {
    // get user package details
    const res2 = await fetch(
      `/api/users/getCreditPackageDetails?id=${packageId}`
    );
    const data = await res2.json();

    if (data.success) {
      const creditPackage = data.result;
      return creditPackage;
      // set user package details to redux
    }

    return null;
  };
  if (!customer) return null;
  return (
    <div className="text-gray-700">
      {updating && <p>Please wait while we activate your Package...</p>}
    </div>
  );
};

export default UpdateCreditPackage;
