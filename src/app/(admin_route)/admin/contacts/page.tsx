"use client";

import DataTable, { TableAction } from "@/components/admin/DataTable";
import MessageViewer from "@/components/admin/messageViewer";
import { eyeIcon, leftArrowIcon } from "@/helpers/iconsProvider";
import { createColumnHelper } from "@tanstack/react-table";
import axios from "axios";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Contact = {
  name: string;
  email: string;
  phone: string;
  message: string;
  _id: string;
};

const Contacts = () => {
  const [records, setRecords] = useState<[] | any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const messageViewerRef: React.MutableRefObject<any> = useRef(null);
  const [message, setMessage] = useState<string>("");

  const fetchRecords = async () => {
    setLoading(true);
    if (!loading) {
      axios
        .get("/api/contacts")
        .then((res: any) => {
          if (res.data.success) {
            setRecords(res.data.emails);
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

  const viewMessageHandler = (rec: any) => {
    if (messageViewerRef.current) {
      setMessage(rec.message);
      messageViewerRef.current.openModal(true);
    }
  };

  const columnHelper = createColumnHelper<Contact>();

  const columns = [
    columnHelper.accessor("name", {
      id: "name",
      header: () => "Sender name",
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("email", {
      id: "email",
      header: () => "Email",
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("phone", {
      id: "phone",
      header: () => "Phone",
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("message", {
      id: "message",
      header: () => "Message",
      cell: (info) => (
        <span className="max-w-sm truncate inline-block">
          {info.renderValue()}
        </span>
      ),
    }),
  ];

  const actions: TableAction[] = [
    {
      name: "view",
      type: "handler",
      element: (rec: any) => viewMessageHandler(rec),
      styles:
        "whitespace-nowrap px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 no-underline",
      icon: eyeIcon,
    },
  ];

  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <>
      <MessageViewer ref={messageViewerRef} message={message} />
      <div className="flex flex-col justify-start items-start">
        <h2 className=" text-xl dark:text-white/70 text-black/70 uppercase">
          Emails
        </h2>
        <span className="dark:text-white/70 text-black/70 text-base">
          List of emails you recieved in in your email.
        </span>
        <div className="w-full overflow-x-auto mt-4">
          <DataTable
            columns={columns}
            data={records}
            source="contacts"
            actions={actions}
            loading={loading}
          />
        </div>
      </div>
    </>
  );
};

export default Contacts;
