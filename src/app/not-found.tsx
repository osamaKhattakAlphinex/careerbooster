import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex-grow-1 ">
      <section className="py-10 py-lg-26">
        <div className="container">
          <div className="row justify-center">
            <div className="col-lg-6">
              <div className="text-center">
                <Image
                  width={530}
                  height={335}
                  src="assets/images/illustrations/error-yellow.svg"
                  alt=""
                  className="img-fluid mb-10"
                />
                <h2 className="text-white mb-4">Oops! Page Not Found.</h2>
                <p className="mb-8">
                  The page you are looking for is not available or has been
                  moved. Try a different page or go to homepage with the button
                  below.
                </p>
                <Link href="/" className="btn btn-primary-dark">
                  Go to home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
