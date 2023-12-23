"use client";
import { trashIcon } from "@/helpers/iconsProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DeleteNotification({ notificationid, fetchData }: any) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [data, setData] = useState([]);
  const [showPopUp, setShowPopUp] = useState(false);

  const deleteNotification = async () => {
    const c = confirm("Are you sure you want to delete this Record?");
    if (c) {
      try {
        const response = await fetch(`/api/notifications/${notificationid}`, {
          method: "DELETE",
        });
        if (response.ok) {
          setShowPopUp(true);
        }
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        // Handle success: e.g., show success message, update state, refetch data, etc.
        console.log("Notification deleted successfully");

        // Refetch data after successful deletion to get the updated list
        fetchData();
      } catch (error) {
        // Handle error: e.g., show error message, log the error, etc.
        console.error("Error deleting notification:", error);
        setError("Error deleting notification. Please try again.");
      }
    } else {
      router.push("/admin/notifications");
    }
  };

  // console.log(data);

  return (
    <>
      {/* <!-- Delete modal --> */}
      <button
        className="flex w-full items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-gray-700 dark:text-gray-200"
        onClick={deleteNotification}
      >
        {trashIcon}
        Delete
      </button>
      {/* {showPopUp && <p className="text-red">Data Delete SuccessFully</p>} */}
    </>
  );
}
