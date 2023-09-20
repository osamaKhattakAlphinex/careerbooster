import Link from "next/link";
import LoginForm from "@/components/LoginForm";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "CareerBooster.Ai-Login",
};

const Login = () => {
  return (
    <main className="flex-grow-1">
      <section className="account-section login-page py-6 h-full">
        <div className="container-fluid h-full">
          <div className="row h-full">
            <div
              className="col-lg-6 d-none d-lg-block"
              data-aos="fade-up-sm"
              data-aos-delay="50"
            >
              <div className="bg-dark-blue-4 border rounded-4 h-full p-6 p-md-20 text-center d-flex flex-column justify-center">
                <h2 className="text-white mb-12">
                  Unlock the Power of <br className="d-none d-xl-block" />
                  <span className="text-primary-dark">CareerBooster</span> Cover
                  Letters Tool
                </h2>
                <img
                  src="assets/images/screens/screen-5.png"
                  alt=""
                  className="img-fluid w-full"
                />
              </div>
            </div>
            <div
              className="col-lg-6"
              data-aos="fade-up-sm"
              data-aos-delay="100"
            >
              <div className="close-btn">
                <Link
                  href="/"
                  className="icon bg-gradient-3 text-white w-12 h-12 rounded p-3 border border-white border-opacity-10 d-flex align-center justify-center ms-auto"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <g
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    >
                      <path d="M18 6 6 18M6 6l12 12" />
                    </g>
                  </svg>
                </Link>
              </div>
              <div className="account-wrapper h-full d-flex flex-column justify-center">
                <div className="text-center">
                  <Link href="/">
                    <img
                      src="assets/images/logo.svg"
                      alt=""
                      className="img-fluid"
                      width="165"
                    />
                  </Link>
                  <div className="vstack gap-4 mt-10">
                    <button type="button" className="btn account-btn py-4">
                      <img
                        src="assets/images/icons/google.svg"
                        alt=""
                        width="24"
                        className="img-fluid icon"
                      />
                      <span>Continue With Google</span>
                    </button>
                    <button type="button" className="btn account-btn py-4">
                      <img
                        src="assets/images/icons/apple.svg"
                        alt=""
                        width="24"
                        className="img-fluid icon"
                      />
                      <span>Continue With Apple</span>
                    </button>
                  </div>

                  <div className="divider-with-text my-10">
                    <span>Or sign in with email</span>
                  </div>

                  <LoginForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;
