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
    <>
      <main className="flex-grow-1 pb-20  lg:ml-[234px] ">
        <section className="py-15 pt-lg-30">
          <div className="container">
            <div className="row justify-center">
              <div className="col-lg-8 col-xl-6">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label
                      htmlFor="password"
                      className="dark:text-gray-100 text-gray-950 pb-3"
                    >
                      Current Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={currentPassword}
                      onChange={(event) => {
                        setCurrentPassword(event.target.value);
                      }}
                      className="dark:bg-gray-100 bg-gray-950 form-control"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="password"
                      className="dark:text-gray-100 text-gray-950 pb-3"
                    >
                      New Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      className="dark:bg-gray-100 bg-gray-950 form-control"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="confirmPassword"
                      className="dark:text-gray-100 text-gray-950 pb-3"
                    >
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={(event) =>
                        setConfirmPassword(event.target.value)
                      }
                      className="dark:bg-gray-100 bg-gray-950 form-control"
                      required
                    />
                  </div>
                  {error && <p className="text-danger">{error}</p>}
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={
                      password !== confirmPassword || !password || loading
                    }
                  >
                    Change Password
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default ChangePasswordPage;
