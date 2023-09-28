"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setField, setUserData } from "@/store/userDataSlice";

const UpdateUserPackage = ({ customer }: any) => {
  if (!customer) return null;

  const router = useRouter();
  const [updating, setUpdating] = useState(false);

  // redux
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.userData);

  const updatePackage = async () => {
    if (!updating) {
      setUpdating(true);
      const userPackage = await getUserPackageDetails(customer.packageId);
      if (userPackage) {
        let expirationDate;
        if (userPackage.type === "monthly") {
          console.log("here");
          expirationDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
        } else if (userPackage.type === "yearly") {
          expirationDate = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
        }

        const obj = {
          email: customer.email,
          userPackage: userPackage._id,
          userPackageExpirationDate: expirationDate,
          userPackageUsed: {
            resumes_generation: 0,
            keywords_generation: 0,
            headline_generation: 0,
            about_generation: 0,
            job_desc_generation: 0,
            cover_letter_generation: 0,
            email_generation: 0,
            pdf_files_upload: 0,
            review_resume: 0,
            consulting_bids_generation: 0,
          },
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
                userPackage: obj.userPackage,
                userPackageExpirationDate: obj.userPackageExpirationDate,
                userPackageUsed: obj.userPackageUsed,
              })
            );
            dispatch(setField({ name: "userPackageData", value: userPackage }));
            // TODO!!! Add new user subsription to db
            // TODO!! invalidate session on stripe
            router.push("/dashboard");
          });
      }
    }
  };
  useEffect(() => {
    if (customer && customer.email) {
      // TODO: update the user package in the database
      updatePackage();
    }
  }, [customer]);

  const getUserPackageDetails = async (packageId: string) => {
    // get user package details
    const res2 = await fetch(
      `/api/users/getUserPackageDetails?id=${packageId}`
    );
    const data = await res2.json();

    if (data.success) {
      const { userPackage } = data;
      return userPackage;
      // set user package details to redux
    }

    return null;
  };

  return (
    <div>
      {updating && <p>Please wait while we activate your Package...</p>}
    </div>
  );
};

export default UpdateUserPackage;
