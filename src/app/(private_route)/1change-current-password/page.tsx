"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { changePassword } from "@/lib/api";
import axios from "axios";
import "@/app/plugins.css";
import "@/app/style.css";
import { useSelector } from "react-redux";
const ChangePasswordPage = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const [verifyingToken, setVerifyingToken] = useState(true);
  const [loading, setLoading] = useState(false);
  const userData = useSelector((state: any) => state.userData);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await verifyPassword(userData.email, currentPassword);

    //   if (password !== confirmPassword) {
    //     setError("Passwords do not match");
    //     return;
    //   }

    //   setLoading(true);
    //   try {
    //     await changePassword({
    //       email,
    //       password,
    //     });
    //     router.replace("/login");
    //   } catch (error: any) {
    //     setError(error.message);
    //   }
    //   setLoading(false);
  };

  const verifyPassword = async (email: any, password: any) => {
    console.log(email);
    fetch("/api/verifyPassword", {
      method: "POST",
      body: JSON.stringify({
        userEmail: email,
        currentPassword: password,
      }),
    }).then((response) => {
      console.log(response);
    });
  };
  // useEffect(() => {
  //   if (!token) {
  //     setError("Invalid token");
  //   }
  //   // if token is provided check if the token is valid and not expired
  //   if (token) {
  //     console.log(token);
  //     axios
  //       .post(`/api/verifyToken`, {
  //         token,
  //       })
  //       .then((resp) => {
  //         if (resp.data.success) {
  //           setDecodedEmail(resp?.data?.decoded?.email);
  //           setVerifyingToken(false);
  //         }
  //       })
  //       .catch((err) => {
  //         setTokenError(
  //           "This link has been expired please generate a new password reset link"
  //         );
  //         setVerifyingToken(false);
  //       });
  //   }
  // }, [token]);
  return (
    <>
      <main className="flex-grow-1 mb-20  lg:ml-[234px] ">
        <section className="py-15 pt-lg-30">
          <div className="container">
            <div className="row justify-center">
              <div className="col-lg-8 col-xl-6">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
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
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      New Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">
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
