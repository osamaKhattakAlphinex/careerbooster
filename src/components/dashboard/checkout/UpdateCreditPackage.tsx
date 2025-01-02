"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "@/store/userDataSlice";

const UpdateCreditPackage = ({ customer }: any) => {
  const router = useRouter();
  const [updating, setUpdating] = useState(false);

  // redux
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.userData);

  const updatePackage = async () => {
    if (!updating) {
      setUpdating(true);
      const response = await fetch(
        `/api/users/getCreditLimits/?email=${userData.email}`
      );
      const data = await response.json();
      const userCurrentCredits = data.result.userCredits;
      const userCurrentTotalCredits = data.result.totalCredits;

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

        return axios
          .post("/api/users/updateUserData", {
            data: obj,
          })
          .then(async (resp) => {
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
          }).catch(err => {});
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
      .then(async (resp) => {
        router.push("/dashboard");
      }).catch((err) => {});
  };
  useEffect(() => {
    if (customer && customer.email) {
      // TODO: update the user package in the database
      updatePackage();
    }
  }, [customer]);

  const getCreditPackageDetails = async (packageId: string) => {
    // get user package details
    try {
      const response = await axios.get(
        `/api/users/getCreditPackageDetails?id=${packageId}`
      );
      if (response.data.success) {
        const creditPackage = response.data.result;
        return creditPackage;
        // set user package details to redux
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  if (!customer) return null;
  return (
    <div className="text-gray-700">
      {updating && <p>Please wait while we activate your Package...</p>}
    </div>
  );
};

export default UpdateCreditPackage;
