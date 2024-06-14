"use client";
import DataTable from "@/components/admin/DataTable";
import { getFormattedDate } from "@/helpers/getFormattedDateTime";
import { createColumnHelper } from "@tanstack/react-table";
import axios from "axios";
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
    try {
      const response = await axios.get("/api/trainBot/trainedModel");
      if (response.data.success) {
        setModels(response.data.result);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchmodels();
  }, []);

  return (
    <div className="flex flex-col items-start justify-start">
      <h2 className="text-xl uppercase dark:text-white/70 text-black/70">
        Trained Models
      </h2>
      <span className="text-base dark:text-white/70 text-black/70">
        List of all the models you have trained.
      </span>
      <div className="w-full mt-4 overflow-x-auto">
        <DataTable
          loading={loading}
          columns={columns}
          data={models}
          source="trained_models"
        />
      </div>
    </div>
  );
};

export default TrainedModel;
