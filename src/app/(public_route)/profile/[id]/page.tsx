"use client";
import React, { useEffect, useState } from "react";

const Page = ({ params }: { params: { id: string } }) => {
  const [userData, setUserData] = useState({});
  useEffect(() => {
    if (params.id) {
      fetch(`/api/users/${params.id}`, {
        method: "GET",
      }).then(async (response) => {
        const res = await response.json();
        if (res.success) {
          setUserData(res.user);
        }
      });
    }
  }, [params]);
  return <div>page</div>;
};

export default Page;
