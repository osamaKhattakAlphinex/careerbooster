"use client";
import DataTable from "@/components/admin/DataTable";
import { createColumnHelper } from "@tanstack/react-table";
import axios from "axios";
import React, { useEffect, useState } from "react";

type ToolUsage = {
  toolName: String;
  creditsUsed: Number;
};

const Page = () => {
  const [usages, setUsages] = useState<[] | any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const columnHelper = createColumnHelper<ToolUsage>();

  const columns = [
    columnHelper.accessor("toolName", {
      id: "toolName",
      header: () => "Tool Name",
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("creditsUsed", {
      id: "creditsUsed",
      header: () => "Credit Used",
      cell: (info) => info.renderValue(),
    }),
  ];

  const fetchUsages = async () => {
    setLoading(true);
    if (!loading) {
      axios
        .get("/api/usages", {})
        .then((res: any) => {
          if (res.data.success) {
            const usages = res.data.usages;
            setUsages(usages);
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    fetchUsages();
  }, []);

  return (
    <div className="flex flex-col justify-end items-start">
      <h2 className=" text-xl dark:text-white/70 text-black/70 uppercase">
        Tools Usage
      </h2>
      <span className="dark:text-white/70 text-black/70 text-base">
        Tools Usage Details
      </span>

      <div className="w-full overflow-x-auto mt-4">
        <DataTable
          loading={loading}
          columns={columns}
          data={usages}
          source="usages"
          actions={[]}
          conditionalTableAction={[]}
        />
      </div>
    </div>
  );
};

export default Page;
