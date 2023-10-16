import Link from "next/link";

const ResetPasswordSuccess = () => {
  return (
    <main className="flex-grow-1 mb-20">
      <section className="py-15 pt-lg-30">
        <div className="container">
          <div className="row justify-center">
            <div className="col-lg-8 col-xl-6">
              <div className="card shadow-sm">
                <div className="card-body text-center">
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
                  <h2 className="text-xl font-bold mb-3">
                    Please check your Inbox
                  </h2>
                  <p className="text-gray-500 mb-5">
                    A password reset link has been sent to your email address.
                  </p>
                  <Link href="/" className="btn theme-outline-btn">
                    Homepage
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ResetPasswordSuccess;
