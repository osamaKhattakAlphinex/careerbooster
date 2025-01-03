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
      header: () => "Total Credits Used",
      cell: (info) => info.renderValue(),
    }),
  ];

  const fetchUsages = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/usages");
      if (response.data.success) {
        setUsages(response.data.usages);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsages();
  }, []);

  return (
    <div className="flex flex-col items-start justify-end">
      <h2 className="text-xl uppercase dark:text-white/70 text-black/70">
        Tools Usage
      </h2>
      <span className="text-base dark:text-white/70 text-black/70">
        Tools Usage Details
      </span>

      <div className="w-full mt-4 overflow-x-auto">
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
