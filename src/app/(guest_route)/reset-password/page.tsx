"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { resetPassword } from "@/lib/api";
import ReCAPTCHA from "react-google-recaptcha";
import { verifyCaptcha } from "@/ServerActions";
import { useTheme } from "next-themes";

const ResetPasswordPage = () => {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [isVerified, setIsverified] = useState<boolean>(false);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isVerified) {
      setIsLoading(true);
      setError("");

      try {
        await resetPassword(email);
        router.replace("/reset-password-success");
      } catch (error: any) {
        setError("There is no user with this email");
      } finally {
        setIsLoading(false);
      }
    }
  };

  async function handleCaptchaSubmission(token: string | null) {
    // Server function to verify captcha
    await verifyCaptcha(token)
      .then(() => setIsverified(true))
      .catch(() => setIsverified(false));
  }

  return (
    <>
      <main className="flex-grow-1 pb-20">
        <section className="md:py-16 lg:pt-40 xs:py-20 dark:bg-gray-950 bg-gray-100">
          <div className="container">
            <div className="flex justify-center">
              <div className="flex flex-col gap-4 lg:w-8/12 xl:w-6/12 ">
                <h1 className="dark:text-gray-100 text-gray-950 font-semibold md:text-[2rem] xs:text-[18px] xs:text-center ">
                  Resest Your Password
                </h1>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      className="my-4 block outline-none focus:border-blue-400 dark:bg-transparent rounded-lg pr-[1.5rem] py-3 pl-4 text-base w-full border-[1px] border-[#bdbfd4] bg-transparent bg-clip"
                      required
                    />
                  </div>
                  <div className="mb-6 dark:block hidden">
                    <ReCAPTCHA
                      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
                      ref={recaptchaRef}
                      onChange={handleCaptchaSubmission}
                      theme="dark"
                    />
                  </div>
                  <div className="mb-6 dark:hidden block">
                    <ReCAPTCHA
                      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
                      ref={recaptchaRef}
                      onChange={handleCaptchaSubmission}
                      theme="light"
                    />
                  </div>
                  {error && <p className="text-danger">{error}</p>}
                  <button
                    type="submit"
                    className="no-underline px-[1rem] font-[500] text-[1rem] py-[.85rem] rounded-md text-[#6a4dff] dark:text-[#e6f85e] border-[1px] border-[#6a4dff] hover:border-[#6a4dff] hover:bg-[#6a4dff] hover:border-none hover:text-gray-100 dark:bg-[#11121c] dark:border-[#e6f85e]  dark:hover:bg-[#e6f85e] dark:hover:border-none dark:hover:text-[#11121c] disabled:opacity-[.65] xs:mx-auto"
                    disabled={isLoading || !isVerified}
                  >
                    {isLoading ? "Loading..." : "Send Reset Link"}
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

export default ResetPasswordPage;
