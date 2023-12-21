import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AddNotification({
  onClick,
  setAddModalVisible,
  fetchData,
}: any) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    sender: "",
    title: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState({
    sender: "Select Sender",
    title: "Select The Tittle",
    message: "Select The Message",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (formData.sender && formData.title && formData.message !== "") {
      try {
        const response = await fetch("/api/notifications", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        console.log(response);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        console.log("Notification added successfully");
        setAddModalVisible(false);
        fetchData();
        // You might want to perform additional actions upon successful addition
      } catch (error) {
        console.error("Error adding notification:", error);
      }
    } else {
      alert("Pleease Fill the form First");
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  return (
    <>
      {/* <!-- Create modal --> */}
      <div
        id="createProductModal"
        tabIndex={-1}
        aria-hidden="true"
        className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-[9999999] justify-center items-center w-full"
      >
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          {/* <!-- Modal content --> */}
          <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            {/* <!-- Modal header --> */}
            <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Add Notification
              </h3>
              <button
                type="button"
                onClick={onClick}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-target="createProductModal"
                data-modal-toggle="createProductModal"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* <!-- Modal body --> */}
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 mb-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Sender Of Notification
                  </label>
                  <input
                    type="text"
                    name="sender"
                    id="sender"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    value={formData.sender}
                    onChange={handleChange}
                  />
                  {formData.sender === "" ? (
                    <>
                      <p className="text-red-800">{formErrors.sender}</p>
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <div>
                  <label
                    htmlFor="brand"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Title Of Notification
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    value={formData.title}
                    onChange={handleChange}
                  />
                  {formData.title === "" ? (
                    <>
                      <p className="text-red-800">{formErrors.title}</p>
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <div>
                  <label
                    htmlFor="price"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Message Of Notification
                  </label>
                  <input
                    type="text"
                    name="message"
                    id="message"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Message"
                    value={formData.message}
                    onChange={handleChange}
                  />
                  {formData.message === "" ? (
                    <>
                      <p className="text-red-800">{formErrors.message}</p>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={
                  (formData.sender && formData.title && formData.message) === ""
                }
                className={`border border-gray-300 inline-flex items-center hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 
                ${
                  (formData.sender && formData.title && formData.message) === ""
                    ? "bg-gray-300"
                    : "bg-primary-700 "
                }`}
              >
                <svg
                  className="mr-1 -ml-1 w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clip-rule="evenodd"
                  />
                </svg>
                Add new Notification
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
