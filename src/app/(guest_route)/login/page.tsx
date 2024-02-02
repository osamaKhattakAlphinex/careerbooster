import Link from "next/link";

import { Metadata } from "next";
import LoginForm from "@/components/LoginForm";

export const metadata: Metadata = {
  title: "CareerBooster.AI-Login",
};

const Login = () => {
  return (
    <>
      <main className="flex-grow-1">
        <section className=" pb-10 pt-[140px] h-full dark:bg-gray-950 bg-gray-100 ">
          <div className=" container h-full">
            <div className="flex h-full">
              <div className="flex  w-5/12 mx-auto">
                <div className=" hidden">
                  <Link
                    href="/"
                    className="icon bg-gradient-3 text-white w-12 h-12 rounded p-3 border-[1px] border-white border-opacity-10 d-flex align-center justify-center ms-auto"
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
                <div className="flex flex-col justify-center mx-auto">
                  <div className="text-center">
                    <LoginForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Login;
