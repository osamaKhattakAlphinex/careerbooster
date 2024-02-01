"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { changePassword } from "@/lib/api";
import axios from "axios";
import "@/app/plugins.css";

const ChangePasswordPage = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [tokenError, setTokenError] = useState("");
  const [decodedEmail, setDecodedEmail] = useState("");
  const params = useSearchParams();
  const token = params?.get("token");
  const [verifyingToken, setVerifyingToken] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (decodedEmail === "") {
      setError("Invalid token");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await changePassword({
        email: decodedEmail,
        password,
      });
      router.replace("/login");
    } catch (error: any) {
      setError(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!token) {
      setError("Invalid token");
    }
    // if token is provided check if the token is valid and not expired
    if (token) {
      axios
        .post(`/api/verifyToken`, {
          token,
        })
        .then((resp) => {
          console.log(resp);
          if (resp.data.success) {
            setDecodedEmail(resp?.data?.result?.email);
            setVerifyingToken(false);
          }
        })
        .catch((err) => {
          setTokenError(
            "This link has been expired please generate a new password reset link"
          );
          setVerifyingToken(false);
        });
    }
  }, [token]);
  return (
    <>
      <main className="flex-grow-1 pb-20 ">
        <section className="py-16 lg:pt-40 dark:bg-gray-950 bg-gray-100">
          <div className="container">
            <div className="flex justify-center">
              <div className="flex-col lg:w-8/12 xl:w-6/12 ">
                {verifyingToken ? (
                  <p className="dark:text-gray-100 text-gray-950 font-bold text-[1rem]">
                    Verifying token...
                  </p>
                ) : (
                  <>
                    {tokenError ? (
                      <div className="alert alert-danger" role="alert">
                        {tokenError}
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                          <label
                            htmlFor="password"
                            className="form-label dark:text-gray-100 text-gray-950 font-bold"
                          >
                            New Password
                          </label>
                          <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(event) =>
                              setPassword(event.target.value)
                            }
                            className="my-4 block outline-none focus:border-blue-400 dark:bg-transparent rounded-lg pr-[1.5rem] py-3 pl-4 text-base w-full border-[1px] border-[#bdbfd4] bg-transparent bg-clip"
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="confirmPassword"
                            className="form-label dark:text-gray-100 text-gray-950 font-bold"
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
                            className="my-4 block outline-none focus:border-blue-400 dark:bg-transparent rounded-lg pr-[1.5rem] py-3 pl-4 text-base w-full border-[1px] border-[#bdbfd4] bg-transparent bg-clip"
                            required
                          />
                        </div>
                        {error && <p className="text-danger">{error}</p>}
                        <button
                          type="submit"
                          className="dark:bg-[#e6f85e] dark:text-gray-950  text-[16px] font-[500] px-[1.5rem] py-[.85rem] bg-[#6a4dff] text-gray-100 rounded-md disabled:opacity-[.65] mt-6"
                          disabled={
                            password !== confirmPassword || !password || loading
                          }
                        >
                          Reset Password
                        </button>
                      </form>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default ChangePasswordPage;
