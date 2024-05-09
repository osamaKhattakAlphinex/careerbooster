"use client";
import { eyeIcon, refreshBigIconRotating } from "@/helpers/iconsProvider";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import SinglejobCard from "./SingleJobCard";

export default function JobCard({ query }: { query: string }) {
  console.log(query);
  const [loading, setLoading] = useState(false);

  const [records, setRecords] = useState<[] | any>([]);
  const fetchRecords = async (query: string) => {
    setLoading(true);
    if (!loading) {
      axios
        .get(`/api/deo?jobs=featured&query=${query}`)
        .then((res: any) => {
          console.log(res);
          if (res.data.success) {
            setRecords(res.data.data);
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
    fetchRecords(query);
  }, []);

  return (
    <>
      {loading && (
        <div className="text-gary-100 text-lg flex justify-center items-center">
          {refreshBigIconRotating}
        </div>
      )}
      {records.length > 0 &&
        records.map((items: any) => {
          return (
            <SinglejobCard
              jobTitle={items.jobTitle}
              location={items.location}
              employer={items.employer}
              jobDescription={items.jobDescription}
              applyJobLink={items.link}
            />
          );
        })}
    </>
  );
}
