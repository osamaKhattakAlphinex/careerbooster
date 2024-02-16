"use client";
import React from "react";
import { makeid } from "../helpers/makeid";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { setField, setUserData } from "@/store/userDataSlice";
import { setId, setResume } from "@/store/resumeSlice";
import { useAppContext } from "@/context/AppContext";
import useGetUserData from "./useGetUserData";

const useSaveResumeToDB = () => {
  const {resume:resumeData, userData} = useSelector((state: any) => state);
  const {setAvailableCredits} = useAppContext()
  const { data: session } = useSession();
  const dispatch = useDispatch();

  const saveResumeToDB = async (data: any = "") => {
    // return makeAPICallWithRetry(async () => {
    const source = data === "" ? resumeData : data;
    let obj = source;

    if (!source.id || source.id === "") {
      obj = { ...source, id: makeid(), dateTime: new Date() };
    }
    dispatch(setResume(obj));

    axios
      .post("/api/resumeBots/saveResumeToDB", {
        email: userData.email,
        resumeData: obj,
      })
      .then(async (resp) => {
        if(userData.trialResume === false){
          dispatch(setUserData({trialResume: true}));
          axios.post("/api/users/updateUserData", {
            data: {
              email: userData.email,
              trialResume: true
            },
          }
          ).then(()=>{
           setAvailableCredits(true)

          })

        } else{
          setAvailableCredits(true)
        }
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
