"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { useSelector } from "react-redux";
import { showErrorToast, showSuccessToast } from "@/helpers/toast";
const ChangePasswordPage = () => {
  const router = useRouter();
  const [password, setPassword] = useState<string>("");
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);
  const userData = useSelector((state: any) => state.userData);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);
    try {
      await changeCurrentPassword(userData.email, currentPassword, password);
    } catch (error: any) {
      setError(error);
    }
  };

  const changeCurrentPassword = async (
    email: string,
    password: string,
    newPass: string
  ) => {
    fetch("/api/change-current-password", {
      method: "POST",
      body: JSON.stringify({
        userEmail: email,
        currentPassword: password,
        newPassword: newPass,
      }),
    })
      .then(async (resp: any) => {
        const response = await resp.json();
        if (response.success) {
          showSuccessToast("Password Change Successfully");
          setLoading(false);
          setPassword("");
          setCurrentPassword("");
          setConfirmPassword("");
        }
      })
      .catch((error) => {
        showErrorToast("Error Occurred");
        setPassword("");
        setCurrentPassword("");
        setConfirmPassword("");
      });
  };

  return (
    <div className="h-full pb-20 ml-0 lg:ml-[234px]  flex my-4 justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center w-full gap-2 px-4 sm:w-6/12"
      >
        <div className="w-full">
          <label
            htmlFor="current_password"
            className="text-xs dark:text-gray-100 text-gray-950 md:text-sm"
          >
            Current Password *
          </label>
          <div className="flex group mt-1 dark:focus-within:border-[#e6f85e] focus-within:border-[#6a4dff] px-4 gap-3 bg-white border dark:bg-[#11121c] border-[#2e2f45] rounded-lg items-center py-3">
            <input
              type="password"
              id="current_password"
              name="password"
              value={currentPassword}
              onChange={(event) => {
                setCurrentPassword(event.target.value);
              }}
              className="w-full text-xs text-gray-900 bg-transparent rounded-md outline-none md:text-sm dark:text-gray-100"
              placeholder=""
              required
            />
          </div>
        </div>
        <div className="w-full">
          <label
            htmlFor="new_password"
            className="text-xs dark:text-gray-100 text-gray-950 md:text-sm"
          >
            New Password *
          </label>
          <div className="flex mt-1 group dark:focus-within:border-[#e6f85e] focus-within:border-[#6a4dff] px-4 gap-3  bg-white border dark:bg-[#11121c] border-[#2e2f45] rounded-lg items-center py-3">
            <input
              type="password"
              id="new_password"
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full text-xs text-gray-900 bg-transparent rounded-md outline-none md:text-sm dark:text-gray-100"
              placeholder=""
              required
            />
          </div>
        </div>
        <div className="w-full">
          <label
            htmlFor="confirm_password"
            className="text-xs dark:text-gray-100 text-gray-950 md:text-sm"
          >
            Confirm Password *
          </label>
          <div className="flex group mt-1 dark:focus-within:border-[#e6f85e] focus-within:border-[#6a4dff] px-4 gap-3 bg-white border dark:bg-[#11121c] border-[#2e2f45] rounded-lg items-center py-3">
            <input
              type="password"
              id="confirm_password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              className="w-full text-xs text-gray-900 bg-transparent rounded-md outline-none md:text-sm dark:text-gray-100"
              placeholder=""
              required
            />
          </div>
        </div>
        {error && <p className="text-danger">{error}</p>}

        <div className="flex mt-4">
          <button
            type="submit"
            className="py-3 px-6 font-medium text-xs md:text-smnpm  rounded-lg  text-gray-900 !cursor-pointer  hover:opacity-70 !bg-[#e6f85e]"
            disabled={password !== confirmPassword || !password || loading}
          >
            {loading ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-7 h-7 animate-spin"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
            ) : (
              "Change Password"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePasswordPage;
