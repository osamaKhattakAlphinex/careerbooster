"use client";
import { RootState } from "@/store/store";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Page = ({ params }: { params: { id: string } }) => {
  const userDetails= useSelector((state:RootState)=>state.userData)
  const [userData, setUserData] = useState(userDetails);
  useEffect(() => {
    if (params.id && !userDetails._id && userDetails._id !== params.id) {
      fetch(`/api/users/${params.id}`, {
        method: "GET",
      }).then(async (response) => {
        const res = await response.json();
        if (res.success) {
          setUserData(res.user);
        }
      });
    }
  },[params]);
  return <div>page</div>;
};

export default Page;
