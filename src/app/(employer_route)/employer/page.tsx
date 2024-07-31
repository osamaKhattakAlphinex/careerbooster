"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/admin/card";
import { RootState } from "@/store/store";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Page = () => {
  const [countJobs, setCountJobs] = useState<number>(0);
  const [countActiveJob, setCountActiveJob] = useState<number>(0);
  const [totalProposals, setTotalProposals] = useState<number>(0);
  const userData = useSelector((state: RootState) => state.userData);

  useEffect(() => {
    if (userData._id) {
      fetch(`/api/deo/count?id=${userData._id}`, {
        method: "GET",
      })
        .then(async (response) => {
          const res = await response.json();
          setCountJobs(res.total);
          setCountActiveJob(res.activeJobs);
          setTotalProposals(res.totalProposals);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [userData]);
  return (
    <div className="flex flex-col justify-start items-start gap-4">
      <h1 className="text-2xl font-bold mb-4">Job Details</h1>
      <div
        key="1"
        className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium mb-0">
                Total Jobs Posted
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-3xl font-bold">
              {countJobs}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-1">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium mb-0">
                Active Jobs
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-3xl font-bold">
              {countActiveJob}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-1">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium mb-0">
                {/* Registered This Week */}
                Candidates Applied
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-3xl font-bold">{totalProposals}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Page;
