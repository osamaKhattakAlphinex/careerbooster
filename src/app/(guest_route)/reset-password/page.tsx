"use client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { resetPassword } from "@/lib/api";
import ReCAPTCHA from "react-google-recaptcha";
import { verifyCaptcha } from "@/ServerActions";

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
    <main className="flex-grow-1 mb-20">
      <section className="py-15 pt-lg-30">
        <div className="container">
          <div className="row justify-center">
            <div className="col-lg-8 col-xl-6">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-6">
                  <ReCAPTCHA
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
                    ref={recaptchaRef}
                    onChange={handleCaptchaSubmission}
                    theme="dark"
                  />
                </div>
                {error && <p className="text-danger">{error}</p>}
                <button
                  type="submit"
                  className="btn theme-outline-btn"
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
  );
};

export default ResetPasswordPage;
