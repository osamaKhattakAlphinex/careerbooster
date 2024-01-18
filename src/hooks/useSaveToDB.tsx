"use client";
import React from "react";
import { makeid } from "../helpers/makeid";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { setField, setUserData } from "@/store/userDataSlice";
import { setId } from "@/store/resumeSlice";

const useSaveResumeToDB = () => {
  const resumeData = useSelector((state: any) => state.resume);

  const { data: session } = useSession();
  const dispatch = useDispatch();

  const saveResumeToDB = async (data: any = "") => {
    // return makeAPICallWithRetry(async () => {
    const source = data === "" ? resumeData : data;
    let obj = source;
    if (!source.id || source.id === "") {
      obj = { ...source, id: makeid(), dateTime: new Date() };
    }

    axios
      .post("/api/resumeBots/saveResumeToDB", {
        email: session?.user?.email,
        resumeData: obj,
      })
      .then(async (resp) => {
        dispatch(setId(obj.id));
        // update user in redux
        const res = await fetch(
          `/api/users/getOneByEmail?email=${session?.user?.email}`
        );

        const response = await res.json();
        const user = response.result;
        dispatch(setUserData(user));
        // get user package details
        const res2 = await fetch(
          `/api/users/getCreditPackageDetails?id=${user?.creditPackage}`
        );
        const data = await res2.json();
        if (data.success) {
          const userPackage = data.result;
          // set user package details to redux
          dispatch(setField({ name: "userPackageData", value: userPackage }));
        }

        // show alert for 2 seconds using setTimeout
        // setShowAlert(true);
        setTimeout(() => {
          // setShowAlert(false);
        }, 1000);
      });
    // });
  };

  return { saveResumeToDB };
};

export default useSaveResumeToDB;
