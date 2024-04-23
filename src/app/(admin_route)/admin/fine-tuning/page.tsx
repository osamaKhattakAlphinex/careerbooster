"use client";
import DataTable, {
  ConditionalTableAction,
  TableAction,
} from "@/components/admin/DataTable";
import FineTuningSettingModel from "@/components/admin/fineTuning/fineTuningSettingModels";
import StatusIndicator from "@/components/admin/fineTuning/statusIndicator";
import { useAppContext } from "@/context/AppContext";
import { getFormattedDate } from "@/helpers/getFormattedDateTime";

import {
  cancelIcon,
  deleteIcon,
  leftArrowIcon,
  settingIcon,
  startIcon,
  statusIcon,
} from "@/helpers/iconsProvider";
import { createColumnHelper } from "@tanstack/react-table";
import axios from "axios";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import useSWR from "swr";

type FineTuningModelsType = {
  _id: string;
  fileId: string;
  datasetType: string;
  status: string;
  fineTunedModel: string;
  fineTuningJobId: string;
};

const FineTuningModels = () => {
  const [records, setRecords] = useState<[] | any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const settingModelRef: React.MutableRefObject<any> = useRef(null);

  const columnHelper = createColumnHelper<FineTuningModelsType>();

  const columns = [
    columnHelper.accessor("fileId", {
      id: "fileId",
      header: () => "File Id",
      cell: (info) => {
        return info.getValue();
      },
    }),
    columnHelper.accessor("datasetType", {
      id: "datasetType",
      header: () => "Dataset",
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("status", {
      id: "status",
      header: () => "Status",
      cell: (info: any) => <StatusIndicator status={info.renderValue()} />,
    }),
    columnHelper.accessor("fineTuningJobId", {
      id: "fineTuningJobId",
      header: () => "Fine Tuning Job Id",
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("fineTunedModel", {
      id: "fineTunedModel",
      header: () => "Trained Model",
      cell: (info) => info.renderValue(),
    }),
  ];

  const rulesForActions: ConditionalTableAction[] = [
    {
      conditionKey: "status",
      conditionValue: "not-started",
      actions: [
        {
          name: "create",
          type: "handler",
          element: (rec: any) => createFineTuningJob(rec),
          styles:
            "whitespace-nowrap px-3 py-2 text-xs font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 no-underline",
          icon: startIcon,
        },
        {
          name: "delete",
          type: "handler",
          element: (rec: any) => deleteFileFromOpenAI(rec),
          styles:
            "whitespace-nowrap px-3 py-2 text-xs font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-green-800 no-underline",
          icon: deleteIcon,
        },
      ],
    },
    {
      conditionKey: "status",
      conditionValue: "in-progress",
      actions: [
        {
          name: "cancel",
          type: "handler",
          element: (rec: any) => cancelFineTuningJob(rec),
          styles:
            "whitespace-nowrap px-3 py-2 text-xs font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 no-underline",
          icon: cancelIcon,
        },
        {
          name: "status",
          type: "handler",
          element: (rec: any) => getTuningJobStatus(rec),
          styles:
            "whitespace-nowrap px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 no-underline",
          icon: statusIcon,
        },
      ],
    },
  ];

  const { data, error } = useSWR(
    "/api/trainBot/tuneModel/tuningJobsStatus",
    async function (url) {
      const inprogressJobs: any = records.filter(
        (rec: any) =>
          rec.status === "in-progress" ||
          rec.status === "validating_files" ||
          rec.status === "queued" ||
          rec.status === "running"
      );

      const responseData = await axios.get(url).then((res) => res.data);

      return inprogressJobs.filter((inprogressJob: any) => {
        return responseData.jobs.some((job: any) => {
          job.id === inprogressJob.fineTuningJobId;
          // inprogressJob.status = job.status;
          axios
            .get(`/api/trainBot/tuneModel/tuningJobsStatus/${job.id}`)
            .then((res: any) => {
              if (res.data.success) {
              }
            })
            .catch((err) => {
              console.log(err);
            })
            .finally(() => {
              fetchRecords();
              setLoading(false);
            });
        });
      });
    }
  );

  const fetchRecords = async () => {
    setLoading(true);
    if (!loading) {
      axios
        .get("/api/trainBot/tuneModel", {})
        .then((res: any) => {
          if (res.data.success) {
            const result = res.data;
            setRecords(result.data);
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
    fetchRecords();
  }, []);

  const createFineTuningJob = async (rec: any) => {
    const { fileId: fileId, datasetType: dataset } = rec;

    axios
      .post(`/api/trainBot/tuneModel/${fileId}`, {
        status: "in-progress",
        dataset,
      })
      .then((res: any) => {
        if (res.data.success) {
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        fetchRecords();
        setLoading(false);
      });
  };

  const getTuningJobStatus = async (rec: any) => {
    const { fineTuningJobId: jobId } = rec;

    axios
      .get(`/api/trainBot/tuneModel/tuningJobsStatus/${jobId}`)
      .then((res: any) => {
        if (res.data.success) {
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        fetchRecords();
        setLoading(false);
      });
  };

  const cancelFineTuningJob = async (rec: any) => {
    const { fineTuningJobId: jobId } = rec;
    axios
      .post(`/api/trainBot/tuneModel/tuningJobs/${jobId}`, {
        status: "not-started",
      })
      .then((res: any) => {
        if (res.data.success) {
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        fetchRecords();
        setLoading(false);
      });
  };

  const deleteFileFromOpenAI = async (rec: any) => {
    const { fileId } = rec;
    axios
      .delete(`/api/trainBot/tuneModel/${fileId}`)
      .then((res: any) => {
        if (res.data.success) {
          console.log(res.data.content);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        fetchRecords();
        setLoading(false);
      });
  };

  return (
    <>
      <FineTuningSettingModel ref={settingModelRef} />
      <div className="flex flex-col items-start justify-start">
        <div className="flex flex-row items-start justify-between w-full">
          <div>
            <h2 className="text-xl uppercase dark:text-white/70 text-black/70">
              Fine Tuning
            </h2>
            <span className="text-base dark:text-white/70 text-black/70">
              List of all the modle that are tuning.
            </span>
          </div>
          <button
            onClick={() => {
              if (settingModelRef) {
                settingModelRef.current.openModal(true);
              }
            }}
            className="flex flex-row items-center justify-between gap-2 px-4 py-2 text-xs font-semibold text-white uppercase bg-orange-500 rounded-lg shadow-lg "
          >
            {settingIcon} Default Model For Tunning
          </button>
        </div>

        <div className="w-full mt-4 overflow-x-auto">
          <DataTable
            loading={loading}
            columns={columns}
            data={records}
            source="finetuning"
            actions={[]}
            conditionalTableAction={rulesForActions}
          />
        </div>
      </div>
    </>
  );
};

export default FineTuningModels;
