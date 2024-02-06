"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import "@/app/plugins.css";

import { useSelector } from "react-redux";
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
      router.replace("/login");
    } catch (error: any) {
      setError(error);
    }
    setLoading(false);
  };

  const changeCurrentPassword = async (
    email: string,
    password: string,
    newPass: string
  ) => {
    console.log(confirmPassword);
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
        if (response.data.success) {
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log("error occurred", error);
      });
  };

  return (
    <div className="flex flex-row items-center justify-between w-full h-full pb-20">
      <form onSubmit={handleSubmit} className="">
        <div className="grid items-center justify-start grid-cols-3 gap-2 space-y-4">
          <label
            htmlFor="password"
            className="col-span-1 text-sm dark:text-gray-100 text-gray-950"
          >
            Current Password
            <sup>*</sup>
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={currentPassword}
            onChange={(event) => {
              setCurrentPassword(event.target.value);
            }}
            className="col-span-2 text-gray-900 rounded-sm outline-none xs:text-sm md:text-lg dark:text-gray-100"
            required
          />
        </div>
        <div className="grid items-center justify-start grid-cols-3 gap-3 space-y-4">
          <label
            htmlFor="password"
            className="col-span-1 text-sm dark:text-gray-100 text-gray-950 "
          >
            New Password
            <sup>*</sup>
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="col-span-2 text-gray-900 rounded-sm outline-none xs:text-sm md:text-lg dark:text-gray-100"
            required
          />
        </div>
        <div className="grid items-center justify-start grid-cols-3 gap-3 space-y-4">
          <label
            htmlFor="confirmPassword"
            className="col-span-1 text-sm dark:text-gray-100 text-gray-950"
          >
            Confirm Password
            <sup>*</sup>
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            className="col-span-2 text-gray-900 rounded-sm outline-none xs:text-sm md:text-lg dark:text-gray-100"
            required
          />
        </div>
        {error && <p className="text-danger">{error}</p>}
        <div className="grid grid-cols-2">
          <div className="col-span-1" />
          <button
            type="submit"
            className="`w-full   py-1 px-6 rounded-sm !bg-[#6a4dff]  dark:!bg-[#e6f85e] text-gray-100 dark:text-gray-950 disabled:opacity-[.65]"
            disabled={password !== confirmPassword || !password || loading}
          >
            Change Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePasswordPage;
