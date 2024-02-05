import Link from "next/link";

const ResetPasswordSuccess = () => {
  return (
    <>
      <main className="flex-grow-1 pb-20">
        <section className="py-16 lg:pt-40 dark:bg-gray-950 bg-gray-100">
          <div className="container">
            <div className="flex justify-center">
              <div className="flex-col gap-4 lg:w-8/12 xl:w-6/12">
                <div className="shadow-sm">
                  <div className="text-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mx-auto mb-5 h-16 w-16 text-green-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zm4.293 7.293a1 1 0 00-1.414-1.414L9 10.586 6.707 8.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l5-5z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <h2 className="text-xl dark:text-gray-100 text-gray-950 font-bold mb-3">
                      Please check your Inbox
                    </h2>
                    <p className="dark:text-gray-100 text-gray-950 mb-5">
                      A password reset link has been sent to your email address.
                    </p>
                    <Link
                      href="/"
                      className="mt-8 no-underline px-[1rem] font-[500] text-[1rem] py-[.85rem] rounded-md text-[#6a4dff] dark:text-[#e6f85e] border-[1px] border-[#6a4dff] hover:border-[#6a4dff] hover:bg-[#6a4dff] hover:border-none hover:text-gray-100 dark:bg-[#11121c] dark:border-[#e6f85e]  dark:hover:bg-[#e6f85e] dark:hover:border-none dark:hover:text-[#11121c]"
                    >
                      Homepage
                    </Link>
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

export default ResetPasswordSuccess;
