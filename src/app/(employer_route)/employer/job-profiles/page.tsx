"use client";
import { formatStringWithCommas } from "@/helpers/DateRangeFilter";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const JobProfiles = () => {
  type JobProfile = {
    _id: string;
    firstName: string;
    lastName: string;
    desiredJobTitle: string;
    expectedSalary: string;
    locationPreference: string;
    jobTitle: string;
  };
  const [jobProfiles, setJobProfiles] = useState<JobProfile[] | []>([]);

  const fetchJobProfiles = async () => {
    const response = await axios.get("/api/deo/jobProfiles");
    if (response.data.success) {
      setJobProfiles(response.data.result);
    } else {
      console.error("Failed to fetch job profiles");
    }
  };
  useEffect(() => {
    fetchJobProfiles();
  }, []);
  return (
    <div className="p-2">
      <h1 className="text-2xl font-bold mb-4">Job Profiles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {jobProfiles.length
          ? jobProfiles.map((profile: JobProfile) => (
              <div
                key={profile._id}
                className="bg-white text-gray-950 shadow-md rounded-lg p-6"
              >
                <h2 className="text-xl font-bold mb-2">
                  {profile.firstName} {profile.lastName}
                </h2>
                <p className="text-gray-600">
                  <strong>{profile.jobTitle}</strong>
                </p>
                <br />
                <p className="text-gray-600 mb-1">
                  <strong>Desired Job Title:</strong> {profile.desiredJobTitle}
                </p>
                <p className="text-gray-600 mb-1">
                  <strong>Expected Salary:</strong> $
                  {formatStringWithCommas(profile.expectedSalary)}
                </p>
                <p className="text-gray-600 mb-1">
                  <strong>Location Preference:</strong>{" "}
                  {profile.locationPreference}
                </p>
                <Link
                  href={`/profile/${profile._id}`}
                  target="_blank"
                  className="text-xs bg-blue-600 rounded hover:bg-blue-800 px-2 py-1.5 mt-2 text-gray-100"
                >
                  View Profile
                </Link>
              </div>
            ))
          : "No Profiles to Show"}
      </div>
    </div>
  );
};

export default JobProfiles;
