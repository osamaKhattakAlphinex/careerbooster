"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { changePassword } from "@/lib/api";
import axios from "axios";
import "@/app/plugins.css";
import "@/app/style.css";

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
      <main className="flex-grow-1 mb-20 ">
        <section className="py-15 pt-lg-30">
          <div className="container">
            <div className="row justify-center">
              <div className="col-lg-8 col-xl-6">
                {verifyingToken ? (
                  <p>Verifying token...</p>
                ) : (
                  <>
                    {tokenError ? (
                      <div className="alert alert-danger" role="alert">
                        {tokenError}
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                          <label htmlFor="password" className="form-label">
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
                            className="form-control"
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="confirmPassword"
                            className="form-label"
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
                            className="form-control"
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
