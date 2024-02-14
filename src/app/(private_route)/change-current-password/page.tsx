"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

 

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
    <div className="h-full pb-20 ml-0 lg:ml-[234px]  flex my-4 justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-5/12 gap-4 justify-center"
      >
        <div className="">
          <label
            htmlFor="name"
            className="dark:text-gray-100  text-gray-950 xs:text-sm md:text-lg"
          >
            {" "}
            Current Password *{" "}
          </label>
          <div className="flex group dark:focus-within:border-[#e6f85e] focus-within:border-[#6a4dff] px-4 gap-3 mt-4 bg-white border dark:bg-[#11121c] border-[#2e2f45] rounded-lg items-center py-3">
            <input
              type="password"
              id="password"
              name="password"
              value={currentPassword}
              onChange={(event) => {
                setCurrentPassword(event.target.value);
              }}
              className="rounded-md md:text-lg xs:text-sm text-gray-900 dark:text-gray-100 bg-transparent outline-none w-full"
              placeholder=""
              required
            />
          </div>
        </div>
        <div className="">
          <label
            htmlFor="name"
            className="dark:text-gray-100  text-gray-950 xs:text-sm md:text-lg"
          >
            {" "}
            New Password *{" "}
          </label>
          <div className="flex group dark:focus-within:border-[#e6f85e] focus-within:border-[#6a4dff] px-4 gap-3 mt-4 bg-white border dark:bg-[#11121c] border-[#2e2f45] rounded-lg items-center py-3">
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="rounded-md md:text-lg xs:text-sm text-gray-900 dark:text-gray-100 bg-transparent outline-none w-full"
              placeholder=""
              required
            />
          </div>
        </div>
        <div className="">
          <label
            htmlFor="name"
            className="dark:text-gray-100  text-gray-950 xs:text-sm md:text-lg"
          >
            {" "}
            Confirm Password *{" "}
          </label>
          <div className="flex group dark:focus-within:border-[#e6f85e] focus-within:border-[#6a4dff] px-4 gap-3 mt-4 bg-white border dark:bg-[#11121c] border-[#2e2f45] rounded-lg items-center py-3">
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              className="rounded-md md:text-lg xs:text-sm text-gray-900 dark:text-gray-100 bg-transparent outline-none w-full"
              placeholder=""
              required
            />
          </div>
        </div>
        {error && <p className="text-danger">{error}</p>}
        <div className="flex ">
          <button
            type="submit"
            className="py-3 md:mb-3 px-6 font-medium xs:scale-75 md:scale-100 text-base rounded-lg  text-gray-900 !bg-[#e6f85e] float-right"
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
