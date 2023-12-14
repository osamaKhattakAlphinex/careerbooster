"use client";
import DataTable from "@/components/DataTable";
import StatusIndicator from "@/components/admin/fineTuning/statusIndicator";
import { getFormattedDate } from "@/helpers/getFormattedDateTime";
import { leftArrowIcon } from "@/helpers/iconsProvider";
import { createColumnHelper } from "@tanstack/react-table";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

type TrainedModelType = {
  _id: string;
  dataset: string;
  model: string;
  updatedAt: string;
};

const TrainedModel = () => {
  const [models, setModels] = useState<[] | any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const columnHelper = createColumnHelper<TrainedModelType>();

  const columns = [
    columnHelper.accessor("dataset", {
      id: "dataset",
      header: () => "Dataset",
      cell: (info) => {
        return info.getValue();
      },
    }),
    columnHelper.accessor("model", {
      id: "model",
      header: () => "Model",
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("updatedAt", {
      id: "updatedAt",
      header: () => "Trained On",
      cell: (info: any) => getFormattedDate(info.renderValue()),
    }),
  ];

  const fetchmodels = async () => {
    setLoading(true);
    if (!loading) {
      axios
        .get("/api/trainBot/trainedModel", {})
        .then((res: any) => {
          if (res.data.success) {
            const result = res.data;
            setModels(result.data);
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
    fetchmodels();
  }, []);

  return (
    <>
      <div className="pt-30">
        <div className="my-5 ml-10">
          <Link
            href="/admin"
            className="flex flex-row gap-2 items-center hover:font-semibold transition-all"
          >
            {leftArrowIcon}
            Dashboard
          </Link>
        </div>

        <div className="flex flex-col gap-2 items-center justify-center">
          <div className=" p-8 flex flex-col gap-2 border w-11/12">
            {/* Table */}
            <DataTable
              loading={loading}
              columns={columns}
              data={models}
              source="trained_models"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default TrainedModel;
