"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IconCalendarclock, antIcon } from "@/helpers/iconsProvider";
import axios from "axios";

import { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [counts, setCounts] = useState<any>(null);
  const [countsLinkedIn, setCountsLinkedIn] = useState<any>(0);
  const [countLabel, setCountLabel] = useState<string>("total");
  const [userStats, setUserStats] = useState<any>("total");

  const getUsersCount = async () => {
    axios.get("/api/users/getCount").then((res) => {
      if (res.data.success) {
        setCounts(res.data);
      }
    });
  };

  const getlinkedInToolUsersCount = async () => {
    axios.get("/api/leads/getLinkedInToolUserCount").then((res) => {
      if (res.data.success) {
        setCountsLinkedIn(res.data);
      }
    });
  };

  useEffect(() => {
    getUsersCount();
    getlinkedInToolUsersCount();
  }, []);

  return (
    <>
      <div className="flex flex-col justify-start items-start gap-4">
        <h1 className=" text-lg">Users</h1>
        <div
          key="1"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <Card>
            <CardHeader className="pb-2">
              {/* <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium mb-0">
                  Total Users
                </CardTitle>
                <IconUsersicon className="w-54 h-54 text-zinc-500 dark:text-zinc-400" />
              </div> */}
              <select
                onChange={(e) => setUserStats(e.target.value)}
                className="p-2"
              >
                <option value="total">Total Users</option>
                <option value="thisWeek">Registered This Week</option>
                <option value="thisMonth">Registered This Month</option>
                <option value="thisYear">Registered This Year</option>
              </select>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-3xl font-bold">
                {/* {counts ? counts.total : 0} */}
                {counts ? counts[userStats] : 0}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-1">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium mb-0">
                  {/* Registered This Week */}
                  Free Users
                </CardTitle>
                <IconCalendarclock className="w-54 h-54 text-zinc-500 dark:text-zinc-400" />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-3xl font-bold">
                {counts ? counts.freeUser : 0}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium mb-0">
                  {/* Registered This Month */}
                  Paid Users
                </CardTitle>
                <IconCalendarclock className="w-54 h-54 text-zinc-500 dark:text-zinc-400" />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-3xl font-bold">
                {counts ? counts.paidUser : 0}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-0">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium mb-0">
                  {/* Registered This Year */}
                  Active Users
                </CardTitle>
                <IconCalendarclock className="w-54 h-54 text-zinc-500 dark:text-zinc-400" />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-3xl font-bold">
                {counts ? counts.activeUser : 0}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="my-4"></div>

      <div className="flex flex-col justify-start items-start gap-4">
        <h1 className=" text-lg">LinkedIn Users</h1>
        <div
          key="1"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <Card>
            <CardHeader className="pb-2">
              <select
                onChange={(e) => setCountLabel(e.target.value)}
                className="p-2"
              >
                <option value="total">Total Users</option>
                <option value="thisWeek">Used This Week</option>
                <option value="thisMonth">Used This Month</option>
                <option value="thisYear">Used This Year</option>
              </select>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-3xl font-bold">
                {/* {counts ? counts.total : 0} */}
                {countsLinkedIn ? countsLinkedIn[countLabel] : 0}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
